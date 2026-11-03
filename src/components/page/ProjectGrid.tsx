"use client";

import { useState } from "react";
import { ProjectCard } from "./blocks";
import { projects, projectTypes } from "@/lib/site";

type Filter = (typeof projectTypes)[number] | "All";

/** Filterable project grid. Every card is in the server HTML; filtering only toggles visibility. */
export function ProjectGrid() {
  const [filter, setFilter] = useState<Filter>("All");
  const count = (f: Filter) => (f === "All" ? projects.length : projects.filter((p) => p.type === f).length);

  return (
    <>
      <div role="toolbar" aria-label="Filter projects" className="no-scrollbar -mx-[var(--gutter)] flex gap-2 overflow-x-auto px-[var(--gutter)]">
        {(["All", ...projectTypes] as Filter[]).map((f) => (
          <button
            key={f}
            type="button"
            aria-pressed={filter === f}
            onClick={() => setFilter(f)}
            className={`inline-flex min-h-10 shrink-0 items-center gap-2 rounded-full border px-4 text-[0.8125rem] transition-colors ${
              filter === f ? "border-ink bg-ink text-membrane" : "border-ink/15 text-ink/75 hover:border-ink/40"
            }`}
          >
            {f}
            <span className={filter === f ? "text-membrane/55" : "text-ink/40"}>{count(f)}</span>
          </button>
        ))}
      </div>
      <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3" aria-live="polite">
        {projects.map((p) => {
          const show = filter === "All" || p.type === filter;
          return (
            <li key={p.title + p.location} hidden={!show} className="animate-[fade-up_.6s_var(--ease-out-expo)_both]">
              <ProjectCard p={p} aspect="aspect-[4/3] sm:aspect-[4/5]" sizes="(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 92vw" />
            </li>
          );
        })}
      </ul>
    </>
  );
}
