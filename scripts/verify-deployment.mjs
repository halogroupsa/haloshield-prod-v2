import assert from "node:assert/strict";
import { readFileSync, existsSync, readdirSync } from "node:fs";
import { resolve, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { runInNewContext } from "node:vm";
import nextEnv from "@next/env";

const root = fileURLToPath(new URL("../", import.meta.url));
nextEnv.loadEnvConfig(root, false);
const canonical = "https://haloshield.ae";
const siteUrl = new URL(process.env.NEXT_PUBLIC_SITE_URL?.trim() || canonical).origin;
const production = siteUrl === canonical && process.env.NEXT_PUBLIC_NOINDEX !== "true" && process.env.NEXT_PUBLIC_ALLOW_INDEXING !== "false";
const out = resolve(root, "out");
const read = (path) => readFileSync(join(out, path), "utf8");

assert.ok(existsSync(join(out, "index.html")), "Build first: npm run build");
const home = read("index.html");
const bootstrap = home.match(/<script id="gtm-init">([\s\S]*?)<\/script>/)?.[1];
assert.ok(bootstrap, "GTM bootstrap must be present in exported HTML");
assert.ok(home.indexOf('id="gtm-init"') < home.indexOf("</head>"), "GTM must be in the head");
assert.ok(bootstrap.includes("GTM-P865Z5BZ"), "Wrong GTM container");

// Execute the actual exported bootstrap with browser stubs; no real analytics
// requests are sent by this verification.
for (const [hostname, protocol, expectedLoads] of [
  ["haloshield.ae", "https:", 1],
  ["haloshield.ae", "http:", 0],
  ["www.haloshield.ae", "https:", 0],
  ["halo-shield-df-v2-stag.pages.dev", "https:", 0],
  ["preview.halo-shield-df-v2-stag.pages.dev", "https:", 0],
  ["staging.haloshield.ae", "https:", 0],
  ["haloshield.ae.example.com", "https:", 0],
  ["localhost", "http:", 0],
]) {
  const requests = [];
  const firstScript = { parentNode: { insertBefore: (script) => requests.push(script) } };
  const context = {
    location: { hostname, protocol },
    window: {},
    document: {
      getElementsByTagName: () => [firstScript],
      createElement: () => ({}),
    },
  };
  runInNewContext(bootstrap, context);
  runInNewContext(bootstrap, context);
  assert.equal(requests.length, expectedLoads, `Unexpected GTM loads on ${protocol}//${hostname}`);
  if (expectedLoads) {
    assert.equal(requests[0].src, "https://www.googletagmanager.com/gtm.js?id=GTM-P865Z5BZ");
    assert.equal(requests[0].async, true);
    assert.equal(context.window.dataLayer.length, 1, "GTM initialized more than once");
    assert.equal(context.window.dataLayer[0].event, "gtm.js");
  } else {
    assert.equal(context.window.dataLayer, undefined, "Preview must not initialize analytics");
  }
}

function* htmlFiles(directory) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) yield* htmlFiles(path);
    else if (entry.name.endsWith(".html")) yield path;
  }
}

let pages = 0;
for (const file of htmlFiles(out)) {
  const html = readFileSync(file, "utf8");
  const path = relative(out, file);
  const internal = /(^|\/)(404|_not-found)(\.html|\/)/.test(path);
  const robots = [...html.matchAll(/<meta name="robots" content="([^"]+)"/g)].map((match) => match[1]);
  assert.ok(robots.length > 0, `Missing robots metadata: ${path}`);
  if (!production || internal) {
    assert.ok(robots.some((value) => value.includes("noindex")), `Must be noindex: ${path}`);
  } else {
    assert.ok(robots.every((value) => !value.includes("noindex")), `Production page is noindex: ${path}`);
  }
  if (!internal) {
    const canonicalUrl = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
    const pathname = path === "index.html" ? "/" : `/${path.endsWith("/index.html") ? path.slice(0, -10) : path.replace(/\.html$/, "")}`;
    assert.ok(canonicalUrl, `Missing canonical URL: ${path}`);
    assert.equal(new URL(canonicalUrl).href, new URL(pathname, siteUrl).href, `Wrong canonical URL: ${path}`);
  }
  assert.equal((html.match(/<script id="gtm-init">/g) || []).length, 1, `Duplicate/missing GTM: ${path}`);
  pages++;
}

const robots = read("robots.txt");
const sitemap = read("sitemap.xml");
if (production) {
  assert.match(robots, /^Allow: \/$/m);
  assert.doesNotMatch(robots, /^Disallow: \/$/m);
  assert.ok(robots.includes(`Sitemap: ${canonical}/sitemap.xml`));
  const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
  assert.ok(urls.length > 0, "Production sitemap is empty");
  for (const url of urls) {
    assert.equal(new URL(url).origin, canonical, `Noncanonical sitemap URL: ${url}`);
    const pathname = new URL(url).pathname;
    assert.ok(existsSync(join(out, pathname === "/" ? "index.html" : `${pathname.slice(1)}.html`)) || existsSync(join(out, pathname.slice(1), "index.html")), `Missing sitemap page: ${url}`);
  }
} else {
  assert.match(robots, /^Allow: \/$/m);
  assert.doesNotMatch(robots, /^Sitemap:/m);
  assert.doesNotMatch(sitemap, /<loc>/, "Preview sitemap must not advertise URLs");
}

const headers = read("_headers");
assert.match(headers, /\/\*\n\s+X-Robots-Tag: noindex, nofollow/);
assert.ok(headers.includes(`${canonical}/*\n  ! X-Robots-Tag`), "Missing production header exception");
console.log(`Deployment checks passed: ${pages} HTML files, ${production ? "production indexing" : "preview noindex"}, GTM host restrictions and Cloudflare rules.`);
