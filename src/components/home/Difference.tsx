"use client";

import { useState } from "react";
import { Img } from "@/components/ui/Img";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { comparison } from "@/lib/site";

const hotspots = [
  {
    x: "60%",
    y: "72%",
    title: "Failed bitumen",
    body: "Layered, brittle and debonded after a few Dubai summers — the overlaps let water in.",
  },
  {
    x: "78%",
    y: "34%",
    title: "LuxGuard™ polyurea",
    body: "Sprayed hot as one continuous skin. No seams, no laps, no weak point.",
  },
];

export function Difference() {
  const [view, setView] = useState<"them" | "us">("us");
  const [spot, setSpot] = useState<number | null>(1);

  return (
    <section id="difference" aria-labelledby="difference-title" className="grain relative overflow-hidden bg-ink py-20 text-membrane md:py-28">
      <div className="container-x relative">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <SectionLabel index="04" label="The difference" />
            <h2 id="difference-title" className="text-display mt-8 type-h2" data-reveal>
              Engineering-led. Proprietary.{" "}
              <span className="text-halo">Permanent.</span>
            </h2>
          </div>
          <p className="max-w-[40ch] leading-relaxed text-membrane/60 lg:col-span-4" data-reveal>
            Halo Shield isn&apos;t a contractor applying a product. We&apos;re a property protection authority —
            and the difference shows up on the roof.
          </p>
        </div>

        <div className="mt-14 grid gap-8 lg:mt-20 lg:grid-cols-12">
          {/* Annotated photo */}
          <div className="lg:col-span-6" data-reveal="clip">
          <figure className="relative overflow-hidden rounded-[28px]">
            <Img
              name="villa-flat-roof-before-after-polyurea"
              alt="Halo Shield engineer removing failed bitumen and spraying a seamless polyurea membrane on a Dubai villa flat roof"
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="aspect-[4/3] size-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-ink/70 via-transparent to-transparent" />
            {hotspots.map((h, i) => (
              <button
                key={h.title}
                type="button"
                onClick={() => setSpot(spot === i ? null : i)}
                aria-expanded={spot === i}
                aria-label={h.title}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: h.x, top: h.y }}
              >
                <span className="relative flex size-9 items-center justify-center">
                  <span className="absolute inset-0 animate-ping rounded-full bg-halo/50" />
                  <span className="relative size-3.5 rounded-full border-2 border-membrane bg-halo" />
                </span>
              </button>
            ))}
            <figcaption className="absolute inset-x-0 bottom-0 p-6 md:p-8">
              {hotspots.map((h, i) => (
                <div
                  key={h.title}
                  className={`transition-all duration-500 ${spot === i ? "translate-y-0 opacity-100" : "pointer-events-none absolute translate-y-3 opacity-0"}`}
                >
                  <p className="text-eyebrow text-halo">{i === 0 ? "Before" : "After"}</p>
                  <p className="mt-2 text-xl font-semibold">{h.title}</p>
                  <p className="mt-1 max-w-[40ch] text-sm text-membrane/70">{h.body}</p>
                </div>
              ))}
              {spot === null && <p className="text-eyebrow text-membrane/60">Tap the markers</p>}
            </figcaption>
          </figure>
          </div>

          {/* Spec sheet */}
          <div className="lg:col-span-6">
            <div className="mb-5 inline-flex rounded-full bg-membrane/8 p-1 md:hidden" role="tablist" aria-label="Compare">
              {(["them", "us"] as const).map((v) => (
                <button
                  key={v}
                  type="button"
                  role="tab"
                  aria-selected={view === v}
                  onClick={() => setView(v)}
                  className={`rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${
                    view === v ? "bg-membrane text-ink" : "text-membrane/60"
                  }`}
                >
                  {v === "them" ? "Traditional" : "Halo Shield"}
                </button>
              ))}
            </div>

            <table className="w-full border-collapse text-left">
              <caption className="sr-only">Traditional waterproofing compared with Halo Shield</caption>
              <thead>
                <tr className="text-eyebrow text-membrane/60">
                  <th scope="col" className="w-[30%] pb-4 font-normal">
                    &nbsp;
                  </th>
                  <th scope="col" className={`pb-4 font-normal ${view === "us" ? "hidden md:table-cell" : ""}`}>
                    Traditional
                  </th>
                  <th scope="col" className={`pb-4 font-normal text-halo ${view === "them" ? "hidden md:table-cell" : ""}`}>
                    Halo Shield
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row, i) => (
                  <tr
                    key={row.label}
                    className="group border-t border-membrane/10 transition-colors hover:bg-membrane/[0.03]"
                    data-reveal
                    style={{ ["--reveal-delay" as string]: `${i * 45}ms` }}
                  >
                    <th scope="row" className="py-4 pr-4 align-top font-mono text-[0.7rem] font-normal uppercase tracking-[0.12em] text-membrane/60">
                      {row.label}
                    </th>
                    <td className={`py-4 pr-4 align-top text-[0.95rem] text-membrane/60 ${view === "us" ? "hidden md:table-cell" : ""}`}>
                      <span className="mr-2 text-membrane/30" aria-hidden>
                        ✕
                      </span>
                      {row.them}
                    </td>
                    <td className={`py-4 align-top text-[0.95rem] font-medium text-membrane ${view === "them" ? "hidden md:table-cell" : ""}`}>
                      <span className="mr-2 text-halo" aria-hidden>
                        ✓
                      </span>
                      {row.us}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
