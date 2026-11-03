"use client";

import { useState } from "react";
import { site } from "@/lib/site";

/**
 * Click-to-load Google Map. The iframe pulls ~500 KB and sets third-party cookies,
 * so it only loads when the visitor asks for it.
 */
export function MapEmbed({ className = "" }: { className?: string }) {
  const [on, setOn] = useState(false);
  const { lat, lng } = site.geo;
  const directions = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;

  return (
    <div className={`relative aspect-[4/3] overflow-hidden rounded-[22px] bg-ink text-membrane md:aspect-[16/10] ${className}`}>
      {on ? (
        <iframe
          title={`Map: ${site.name}, ${site.address.street}, ${site.address.locality}, Dubai`}
          src={`https://www.google.com/maps?q=${lat},${lng}&z=15&output=embed`}
          className="absolute inset-0 size-full border-0 grayscale-[0.4]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      ) : (
        <>
          <div aria-hidden className="blueprint absolute inset-0 text-membrane opacity-60" />
          <div aria-hidden className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <span className="absolute -inset-10 animate-ping rounded-full bg-halo/20" />
            <span className="relative block size-4 rounded-full border-2 border-membrane bg-halo" />
          </div>
          <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-center justify-between gap-4 p-5 md:p-6">
            <p className="text-eyebrow text-membrane/60">
              {lat.toFixed(4)}° N, {lng.toFixed(4)}° E
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setOn(true)}
                className="inline-flex min-h-11 items-center rounded-full border border-membrane/25 px-4 text-[0.8125rem] font-semibold transition-colors hover:border-membrane"
              >
                Load map
              </button>
              <a
                href={directions}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center rounded-full bg-halo px-4 text-[0.8125rem] font-semibold text-ink transition-colors hover:bg-membrane"
              >
                Directions
              </a>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
