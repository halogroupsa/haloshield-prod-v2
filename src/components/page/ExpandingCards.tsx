"use client";

import Link from "next/link";
import { useState } from "react";
import { Img } from "@/components/ui/Img";
import { ArrowIcon } from "@/components/ui/Button";
import type { ImageName } from "@/lib/images.generated";

export type ExpandingCard = {
  href: string;
  title: string;
  sub?: string;
  image: ImageName;
  alt: string;
  chips?: string[];
};

/**
 * The reference's listing row: on desktop the hovered/focused card widens and reveals its chips
 * and copy; on touch screens it's a snap-scrolling rail with everything visible.
 */
export function ExpandingCards({ items, initial = 1 }: { items: ExpandingCard[]; initial?: number }) {
  const [active, setActive] = useState(Math.min(initial, items.length - 1));

  return (
    <ul className="no-scrollbar -mx-[var(--gutter)] flex snap-x snap-mandatory scroll-px-[var(--gutter)] gap-3 overflow-x-auto px-[var(--gutter)] md:mx-0 md:h-[min(30rem,62svh)] md:snap-none md:overflow-visible md:px-0">
      {items.map((c, i) => {
        const on = i === active;
        return (
          <li
            key={c.href}
            onPointerEnter={(e) => e.pointerType === "mouse" && setActive(i)}
            className={`relative aspect-[4/5] w-[78%] shrink-0 snap-start overflow-hidden rounded-[22px] bg-ink-3 transition-[flex-grow] duration-700 ease-out-expo sm:w-[46%] md:aspect-auto md:w-auto md:min-w-0 md:flex-1 ${
              on ? "md:grow-[2.4]" : "md:grow"
            }`}
          >
            <Link href={c.href} onFocus={() => setActive(i)} className="group absolute inset-0 block text-membrane">
              <Img
                name={c.image}
                alt={c.alt}
                sizes="(min-width: 768px) 45vw, 80vw"
                className="absolute inset-0 size-full object-cover transition-transform duration-[1.4s] ease-out-expo group-hover:scale-[1.04]"
              />
              <span aria-hidden className="absolute inset-0 bg-linear-to-t from-ink/85 via-ink/15 to-ink/10" />

              {c.chips && (
                <span
                  className={`absolute left-4 top-4 flex flex-wrap gap-1.5 transition-opacity duration-500 md:left-5 md:top-5 ${
                    on ? "opacity-100" : "md:opacity-0"
                  }`}
                >
                  {c.chips.map((chip) => (
                    <span key={chip} className="rounded-full bg-membrane/90 px-3 py-1 text-[0.75rem] font-medium text-ink backdrop-blur">
                      {chip}
                    </span>
                  ))}
                </span>
              )}

              <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 md:p-6">
                <span className="min-w-0">
                  <span className="block text-[1.125rem] font-medium leading-snug tracking-tight md:text-[1.25rem]">{c.title}</span>
                  {c.sub && (
                    <span
                      className={`mt-1.5 block max-w-[40ch] text-[0.8125rem] leading-relaxed text-membrane/75 transition-opacity duration-500 ${
                        on ? "opacity-100" : "md:line-clamp-1 md:opacity-0"
                      }`}
                    >
                      {c.sub}
                    </span>
                  )}
                </span>
                <span
                  aria-hidden
                  className={`grid size-10 shrink-0 place-items-center rounded-full transition-all duration-500 ${
                    on ? "bg-halo text-ink md:-rotate-45" : "bg-membrane/15 text-membrane backdrop-blur"
                  }`}
                >
                  <ArrowIcon />
                </span>
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
