"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { BLOG_PAGE_SIZE, type BlogSearchEntry } from "@/lib/blogs";
import { BlogGuideGrid } from "./BlogGuideGrid";
import { BlogPagination } from "./BlogPagination";

const queryLimit = 120;
const normalise = (value: string) => value.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, " ").trim();

export function BlogSearchForm({ path, query = "", onSearch }: {
  path: string;
  query?: string;
  onSearch?: (query: string) => void;
}) {
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (input.current) input.current.value = query;
  }, [query]);

  function submit(event: FormEvent<HTMLFormElement>) {
    if (!onSearch) return;
    event.preventDefault();
    onSearch(input.current?.value.trim() ?? "");
  }

  return (
    <form action={path} role="search" aria-label="Search guides" onSubmit={submit} className="mt-5 max-w-[42rem]">
      <label htmlFor="blog-search" className="sr-only">Search guides</label>
      <div className="flex flex-wrap items-center gap-2">
        <input
          ref={input}
          id="blog-search"
          name="q"
          type="search"
          defaultValue={query}
          maxLength={queryLimit}
          placeholder="Search by topic, e.g. roof leak"
          className="min-h-12 min-w-0 flex-1 rounded-full border border-ink/20 bg-membrane px-4 text-base placeholder:text-ink/55"
        />
        <button type="submit" className="min-h-12 rounded-full bg-ink px-5 text-sm font-semibold text-membrane transition-colors hover:bg-halo hover:text-ink">
          Search
        </button>
        {query && (
          <button type="button" onClick={() => { onSearch?.(""); input.current?.focus(); }} className="min-h-12 px-2 text-sm font-medium underline underline-offset-4">
            Clear search
          </button>
        )}
      </div>
    </form>
  );
}

export function BlogSearch({ path, children }: { path: string; children: ReactNode }) {
  const params = useSearchParams();
  const query = params.get("q")?.trim().slice(0, queryLimit) ?? "";
  const requestedPage = Number(params.get("resultPage")) || 1;

  function searchHref(term: string, page = 1) {
    const next = new URLSearchParams(params.toString());
    if (term) next.set("q", term);
    else next.delete("q");
    if (page > 1) next.set("resultPage", String(page));
    else next.delete("resultPage");
    const search = next.toString();
    return search ? `${path}?${search}` : path;
  }

  return (
    <>
      <BlogSearchForm path={path} query={query} onSearch={(term) => window.history.pushState(null, "", searchHref(term))} />
      {query ? (
        <SearchResults query={query} requestedPage={requestedPage} hrefFor={(page) => `${searchHref(query, page)}#blog-archive`} />
      ) : children}
    </>
  );
}

function SearchResults({ query, requestedPage, hrefFor }: {
  query: string;
  requestedPage: number;
  hrefFor: (page: number) => string;
}) {
  const [entries, setEntries] = useState<BlogSearchEntry[]>();
  const [attempt, setAttempt] = useState(0);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    fetch("/blogs/search-index.json", { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error("Search index is unavailable");
        return response.json() as Promise<BlogSearchEntry[]>;
      })
      .then((results) => {
        if (!controller.signal.aborted) setEntries(results);
      })
      .catch(() => {
        if (!controller.signal.aborted) setFailed(true);
      });
    return () => controller.abort();
  }, [attempt]);

  const words = normalise(query).split(" ").filter(Boolean);
  const matches = words.length ? entries?.filter((entry) => {
    const text = normalise(`${entry.title} ${entry.description} ${entry.topics}`);
    return words.every((word) => text.includes(word));
  }) ?? [] : [];
  const totalPages = Math.max(1, Math.ceil(matches.length / BLOG_PAGE_SIZE));
  const page = Number.isSafeInteger(requestedPage) ? Math.min(totalPages, Math.max(1, requestedPage)) : 1;
  const start = (page - 1) * BLOG_PAGE_SIZE;
  const status = failed
    ? "Search is temporarily unavailable."
    : !entries
      ? "Searching guides…"
      : matches.length === 0
        ? `No guides found for “${query}”. Try another topic.`
        : matches.length === 1
          ? `1 guide found for “${query}”.`
          : `Showing ${start + 1}–${Math.min(start + BLOG_PAGE_SIZE, matches.length)} of ${matches.length} guides for “${query}”.`;

  return (
    <div className="mt-6">
      <p role="status" className="break-words text-sm leading-relaxed text-ink/70">{status}</p>
      {failed && (
        <button type="button" className="mt-3 py-2 font-medium underline underline-offset-4" onClick={() => { setFailed(false); setAttempt((value) => value + 1); }}>
          Try again
        </button>
      )}
      {matches.length > 0 && (
        <>
          <BlogGuideGrid guides={matches.slice(start, start + BLOG_PAGE_SIZE)} />
          <BlogPagination page={page} totalPages={totalPages} hrefFor={hrefFor} label="Search result pages" />
        </>
      )}
    </div>
  );
}
