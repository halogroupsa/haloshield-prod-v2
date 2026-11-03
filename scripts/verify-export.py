#!/usr/bin/env python3
"""Validate the exported site and the complete known legacy route inventory.

Run after a production build: python3 scripts/verify-export.py
Does not submit forms or contact external services.
"""
import csv
import json
import os
from collections import Counter
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "out"
ORIGIN = (os.environ.get("NEXT_PUBLIC_SITE_URL") or "https://haloshield.ae").strip().rstrip("/")
PRODUCTION = ORIGIN == "https://haloshield.ae" and os.environ.get("NEXT_PUBLIC_NOINDEX") != "true" and os.environ.get("NEXT_PUBLIC_ALLOW_INDEXING") != "false"


class Page(HTMLParser):
    def __init__(self, file):
        super().__init__(convert_charrefs=True)
        self.h1 = 0
        self.title = ""
        self.description = ""
        self.canonical = ""
        self.robots = ""
        self.links = []
        self.assets = []
        self.ids = []
        self.schemas = []
        self.visible = []
        self.in_title = False
        self.in_script = False
        self.json_script = False
        self.script_text = ""
        self.feed(file.read_text())

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == "h1": self.h1 += 1
        if tag == "title": self.in_title = True
        if a.get("id"): self.ids.append(a["id"])
        if tag == "meta" and a.get("name") == "description": self.description = a.get("content", "")
        if tag == "meta" and a.get("name") == "robots": self.robots = a.get("content", "")
        if tag == "link" and a.get("rel") == "canonical": self.canonical = a.get("href", "")
        if tag == "a" and a.get("href"): self.links.append(a["href"])
        if tag in ("img", "source", "script") and a.get("src"): self.assets.append(a["src"])
        if tag == "link" and a.get("rel") == "stylesheet": self.assets.append(a.get("href", ""))
        if tag == "script":
            self.in_script = True
            self.json_script = a.get("type") == "application/ld+json"
            self.script_text = ""

    def handle_endtag(self, tag):
        if tag == "title": self.in_title = False
        if tag == "script":
            if self.json_script: self.schemas.append(json.loads(self.script_text))
            self.in_script = False
            self.json_script = False

    def handle_data(self, text):
        if self.in_title: self.title += text
        if self.in_script:
            if self.json_script: self.script_text += text
        else: self.visible.append(text)


def route_file(path):
    raw = OUT / unquote(path).lstrip("/")
    return raw if raw.is_file() else raw / "index.html"


def main():
    errors, warnings = [], []
    pages = {}
    for file in OUT.rglob("index.html"):
        if "_not-found" in file.parts or "404" in file.parts: continue
        path = "/" + str(file.parent.relative_to(OUT)).strip(".")
        if path != "/": path += "/"
        pages[path] = Page(file)

    titles = Counter(p.title for p in pages.values())
    descriptions = Counter(p.description for p in pages.values())
    for path, p in pages.items():
        if p.h1 != 1: errors.append(f"{path}: {p.h1} H1 elements")
        if not p.title or titles[p.title] != 1: errors.append(f"{path}: missing/duplicate title")
        if not p.description or descriptions[p.description] != 1: errors.append(f"{path}: missing/duplicate description")
        if len(p.description) > 160: warnings.append(f"{path}: description {len(p.description)} characters")
        if p.canonical != ORIGIN + path: errors.append(f"{path}: incorrect canonical {p.canonical}")
        if PRODUCTION and "noindex" in p.robots: errors.append(f"{path}: production page is noindex")
        if not PRODUCTION and "noindex" not in p.robots: errors.append(f"{path}: preview noindex missing")
        if not p.schemas: errors.append(f"{path}: JSON-LD missing")
        visible = " ".join(" ".join(p.visible).split())
        for graph in p.schemas:
            for node in graph.get("@graph", []):
                if node.get("@type") == "FAQPage":
                    for item in node["mainEntity"]:
                        for text in [item["name"], item["acceptedAnswer"]["text"]]:
                            if " ".join(text.split()) not in visible: errors.append(f"{path}: FAQ schema not in rendered content")
        for href in p.links + p.assets:
            url = urlsplit(href)
            if url.scheme or url.netloc or not url.path.startswith("/"): continue
            dest = route_file(url.path)
            if not dest.exists(): errors.append(f"{path}: missing destination {href}")
            elif url.fragment and url.path in pages and unquote(url.fragment) not in pages[url.path].ids:
                errors.append(f"{path}: missing anchor {href}")
        for href in p.links:
            if href.startswith("#") and len(href) > 1 and unquote(href[1:]) not in p.ids:
                errors.append(f"{path}: missing anchor {href}")

    rules = []
    for line in (ROOT / "public/_redirects").read_text().splitlines():
        fields = line.split()
        if len(fields) != 3 or not fields[0].startswith("/"): continue
        source, target, status = fields
        rules.append((source, target, status))
        if not route_file(target).exists(): errors.append(f"redirect target missing: {line}")
        if "*" not in source and route_file(source).exists(): errors.append(f"redirect shadows static page: {line}")
    rule_map = {source: target for source, target, _ in rules}
    inventory = list(csv.DictReader((ROOT / "docs/migration-pages.csv").open()))
    for row in inventory:
        path = row["old_path"]
        destination = row["destination"]
        if not route_file(destination).exists(): errors.append(f"legacy destination missing: {path}")
        if not route_file(path).exists() and rule_map.get(path) != destination:
            errors.append(f"legacy route not explicitly covered: {path}")
    for row in csv.DictReader((ROOT / "docs/legacy-guide-links.csv").open()):
        if rule_map.get(row["old_path"]) != row["destination"]: errors.append(f"legacy guide link not covered: {row['old_path']}")

    sitemap = ET.parse(OUT / "sitemap.xml")
    locations = {e.text for e in sitemap.findall(".//{http://www.sitemaps.org/schemas/sitemap/0.9}loc")}
    expected = {ORIGIN + p for p in pages} if PRODUCTION else set()
    if locations != expected: errors.append(f"sitemap mismatch: {locations ^ expected}")
    report = {"exported_pages": len(pages), "known_old_static_pages": len(inventory), "redirect_rules": len(rules), "errors": sorted(set(errors)), "warnings": sorted(set(warnings)), "limits": ["Original dynamic CMS articles cannot be inventoried without the old CMS export/access.", "Static redirect rules validated; deployed HTTP 301 behaviour requires a host check.", "No real enquiry sent."]}
    print(json.dumps(report, indent=2))
    (ROOT / "docs/export-verification.json").write_text(json.dumps(report, indent=2) + "\n")
    return bool(errors)


if __name__ == "__main__":
    raise SystemExit(main())
