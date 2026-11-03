"use client";

import { useEffect, useRef } from "react";
import { Img } from "@/components/ui/Img";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { inspectionPoints, processSteps } from "@/lib/site";

export function Process() {
  const runwayRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLOListElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const runway = runwayRef.current;
    const track = trackRef.current;
    if (!runway || !track) return;
    const mq = window.matchMedia("(min-width: 1024px)");
    let raf = 0;

    const size = () => {
      if (!mq.matches) {
        runway.style.height = "";
        track.style.transform = "";
        return;
      }
      const dist = track.scrollWidth - window.innerWidth;
      runway.style.height = `${dist + window.innerHeight}px`;
      update();
    };
    const update = () => {
      raf = 0;
      if (!mq.matches) return;
      const r = runway.getBoundingClientRect();
      const dist = track.scrollWidth - window.innerWidth;
      const p = Math.min(1, Math.max(0, -r.top / dist));
      track.style.transform = `translate3d(${-p * dist}px,0,0)`;
      if (barRef.current) barRef.current.style.transform = `scaleX(${p})`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    size();
    const ro = new ResizeObserver(size);
    ro.observe(track);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", size);
    mq.addEventListener("change", size);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", size);
      mq.removeEventListener("change", size);
    };
  }, []);

  return (
    <section id="process" aria-labelledby="process-title" className="relative bg-bone text-ink">
      <div ref={runwayRef} className="relative">
        <div className="lg:sticky lg:top-0 lg:flex lg:h-svh lg:items-center lg:overflow-hidden">
          <ol
            ref={trackRef}
            className="flex flex-col gap-6 px-[var(--gutter)] py-24 will-change-transform md:py-32 lg:w-max lg:flex-row lg:items-stretch lg:gap-8 lg:py-0"
          >
            {/* Intro */}
            <li className="flex flex-col justify-center lg:w-[34vw] lg:pr-10">
              <SectionLabel index="05" label="Our process" tone="dark" />
              <h2 id="process-title" className="text-display mt-8 type-h2">
                How Halo Shield{" "}
                <span className="text-halo-deep">works</span>
              </h2>
              <p className="mt-6 max-w-[40ch] leading-relaxed text-ink/65">
                Every project starts with a detailed structural and envelope inspection by DM-approved engineers. Then we
                design a bespoke, permanent system — not a patch.
              </p>
              <p className="text-eyebrow mt-10 hidden items-center gap-3 text-ink/65 lg:flex">
                Keep scrolling
                <span aria-hidden className="inline-block h-px w-16 bg-ink/30" />→
              </p>
            </li>

            {processSteps.map((s, i) => (
              <li
                key={s.title}
                className="group relative grid overflow-hidden rounded-[28px] bg-membrane shadow-[0_30px_60px_-40px_rgb(12_12_13/0.5)] md:grid-cols-2 lg:h-[72svh] lg:w-[62vw] xl:w-[54vw]"
              >
                <div className="relative min-h-[16rem] overflow-hidden">
                  <Img
                    name={s.image}
                    alt={`Step ${i + 1}: ${s.title} — Halo Shield Dubai`}
                    sizes="(min-width: 1024px) 30vw, 100vw"
                    className="absolute inset-0 size-full object-cover transition-transform duration-[1.6s] ease-out-expo group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-col justify-center p-7 md:p-10">
                  {/* Same numbering treatment as the LuxGuard layers: solid figure + mono total. */}
                  <p aria-hidden className="flex items-baseline gap-3 font-mono text-xs uppercase tracking-[0.16em] text-ink/65">
                    <span className="text-display text-[2rem] leading-none tracking-tight text-ink">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    /{String(processSteps.length).padStart(2, "0")}
                  </p>
                  <h3 className="mt-6 type-h3 font-semibold leading-tight tracking-tight">
                    <span className="sr-only">Step {i + 1}: </span>
                    {s.title}
                  </h3>
                  <p className="mt-4 max-w-[36ch] leading-relaxed text-ink/65">{s.body}</p>
                </div>
              </li>
            ))}

            {/* 300-point inspection */}
            <li className="flex flex-col justify-center rounded-[28px] bg-ink p-8 text-membrane md:p-12 lg:h-[72svh] lg:w-[46vw]">
              <p className="text-eyebrow text-halo">Comprehensive assessment</p>
              <h3 className="text-display mt-4 type-h2">300+ point structural inspection</h3>
              <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-8">
                {Object.entries(inspectionPoints).map(([cat, items]) => (
                  <div key={cat}>
                    <h4 className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-membrane/60">{cat}</h4>
                    <ul className="mt-3 space-y-1.5 text-[0.92rem] text-membrane/85">
                      {items.map((it) => (
                        <li key={it} className="flex items-center gap-2">
                          <span className="size-1 rounded-full bg-halo" />
                          {it}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </li>
            <li aria-hidden className="hidden w-[10vw] lg:block" />
          </ol>

          <div className="pointer-events-none absolute inset-x-[var(--gutter)] bottom-8 hidden h-px bg-ink/10 lg:block">
            <span ref={barRef} className="block h-full origin-left scale-x-0 bg-halo" />
          </div>
        </div>
      </div>
    </section>
  );
}
