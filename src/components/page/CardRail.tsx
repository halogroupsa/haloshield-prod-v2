"use client";

import { Children, useCallback, useEffect, useRef, useState } from "react";
import { ArrowIcon } from "@/components/ui/Button";

type Props = {
  /** e.g. "Recent projects" → renders "(10) Recent projects" like the reference. */
  label: string;
  title?: React.ReactNode;
  tone?: "light" | "dark";
  children: React.ReactNode;
  itemClassName?: string;
};

/** Snap-scrolling rail with prev/next controls. Native scroll, so touch, trackpad and keyboard all work. */
export function CardRail({ label, title, tone = "dark", children, itemClassName = "" }: Props) {
  const ref = useRef<HTMLUListElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false });
  const items = Children.toArray(children);

  const sync = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    setEdge({ start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth > el.scrollWidth - 8 });
  }, []);

  useEffect(() => {
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, [sync]);

  const step = (dir: 1 | -1) => {
    const el = ref.current;
    const first = el?.firstElementChild as HTMLElement | null;
    if (!el || !first) return;
    el.scrollBy({ left: dir * (first.offsetWidth + 12), behavior: "smooth" });
  };

  const btn =
    tone === "dark"
      ? "border-ink/15 text-ink enabled:hover:bg-ink enabled:hover:text-membrane"
      : "border-membrane/20 text-membrane enabled:hover:bg-membrane enabled:hover:text-ink";

  return (
    <div>
      <div className="flex items-end justify-between gap-6">
        <div className="min-w-0">{title}</div>
        <div className="flex shrink-0 flex-col items-end gap-3">
          <p className={`text-[0.8125rem] ${tone === "dark" ? "text-ink/60" : "text-membrane/60"}`}>
            ({String(items.length).padStart(2, "0")}) {label}
          </p>
          <div className="flex gap-2">
            <button type="button" onClick={() => step(-1)} disabled={edge.start} aria-label="Previous" className={`grid size-11 place-items-center rounded-full border transition-colors disabled:opacity-35 ${btn}`}>
              <ArrowIcon className="rotate-180" />
            </button>
            <button type="button" onClick={() => step(1)} disabled={edge.end} aria-label="Next" className={`grid size-11 place-items-center rounded-full border transition-colors disabled:opacity-35 ${btn}`}>
              <ArrowIcon />
            </button>
          </div>
        </div>
      </div>
      <ul
        ref={ref}
        onScroll={sync}
        className="no-scrollbar -mx-[var(--gutter)] mt-8 flex snap-x snap-mandatory scroll-px-[var(--gutter)] gap-3 overflow-x-auto px-[var(--gutter)] md:mt-10"
      >
        {items.map((child, i) => (
          <li key={i} className={`w-[80%] shrink-0 snap-start sm:w-[46%] lg:w-[calc((100%-1.5rem)/3)] ${itemClassName}`}>
            {child}
          </li>
        ))}
      </ul>
    </div>
  );
}
