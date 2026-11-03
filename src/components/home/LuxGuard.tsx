"use client";

import { useEffect, useRef, useState } from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Magnetic } from "@/components/ui/Magnetic";
import { luxguardLayers, whatsappHref } from "@/lib/site";

const N = luxguardLayers.length;
const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));

const features = [
  "Seamless, joint-free membrane",
  "Engineered to move with the structure",
  "Resists 50°C heat, UV & humidity",
  "Takes rooftop loads & foot traffic",
  "Rapid curing — walkable in hours",
  "Up to 25-year protection assurance",
];

export function LuxGuard() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const stack = stackRef.current;
    const stage = stageRef.current;
    if (!section || !stack || !stage) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = section.getBoundingClientRect();
      const runway = section.offsetHeight - window.innerHeight;
      const p = clamp(-r.top / runway);
      const explode = clamp(p / 0.14);
      const idx = Math.min(N - 1, Math.floor(clamp((p - 0.1) / 0.86) * N));
      stage.style.setProperty("--x", explode.toFixed(3));
      stack.style.setProperty("--spin", `${(-38 + p * 16).toFixed(2)}deg`);
      setActive((a) => (a === idx ? a : idx));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const goTo = (i: number) => {
    const s = sectionRef.current;
    if (!s) return;
    const runway = s.offsetHeight - window.innerHeight;
    const p = 0.1 + ((i + 0.5) / N) * 0.86;
    const top = s.getBoundingClientRect().top + window.scrollY + runway * p;
    const lenis = (window as unknown as { __lenis?: { scrollTo: (y: number) => void } }).__lenis;
    if (lenis) lenis.scrollTo(top);
    else window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <section id="luxguard" aria-labelledby="luxguard-title" className="relative bg-bone text-ink">
      <div ref={sectionRef} className="relative h-[400svh] md:h-[520svh]">
        <div className="sticky top-0 flex h-svh items-center overflow-hidden">
          <div aria-hidden className="blueprint absolute inset-0 text-ink opacity-60 [mask-image:radial-gradient(60%_60%_at_30%_55%,#000,transparent)]" />
          <div className="container-x relative grid w-full items-center gap-4 pb-6 pt-24 lg:grid-cols-12 lg:gap-10 lg:pb-0 lg:pt-(--header-h)">
            {/* 3D stack */}
            <div className="relative order-1 h-[32svh] overflow-clip lg:col-span-6 lg:h-[78svh] lg:overflow-visible">
              {/* Exploding lifts the top layers ~260px towards the viewer, which reads as "up" on screen.
                  Drop the stack as it opens so the group stays centred below the fixed header. */}
              <div
                ref={stageRef}
                className="absolute inset-0 grid translate-y-[calc(var(--x)*2rem)] place-items-center [perspective:2000px] lg:translate-y-[calc(var(--x)*7.5rem)]"
                style={{ ["--x" as string]: 0 }}
              >
                <div
                  ref={stackRef}
                  className="relative aspect-square w-[min(62vw,44svh)] [--layer-scale:0.5] lg:w-[min(29vw,44svh)] lg:[--layer-scale:1]"
                  style={{
                    transformStyle: "preserve-3d",
                    transform: "scale(var(--layer-scale)) rotateX(58deg) rotateZ(var(--spin, -38deg))",
                  }}
                >
                  {/* substrate */}
                  <div
                    className="absolute inset-0 rounded-[6px] bg-[#3a3a3e] shadow-[10px_10px_0_-2px_#2a2a2e]"
                    style={{
                      transform: "translateZ(-30px)",
                      backgroundImage:
                        "radial-gradient(#4a4a50 1px, transparent 1.4px), radial-gradient(#2f2f33 1px, transparent 1.2px)",
                      backgroundSize: "9px 9px, 13px 13px",
                    }}
                  >
                    <span className="absolute bottom-2 left-3 font-mono text-[10px] uppercase tracking-[0.14em] text-membrane/60">
                      Concrete substrate
                    </span>
                  </div>
                  {luxguardLayers.map((layer, i) => {
                    const on = i === active;
                    const done = i < active;
                    return (
                      <div
                        key={layer.name}
                        className="absolute inset-0 rounded-[6px] transition-[transform,opacity,box-shadow] duration-700 ease-out-expo"
                        style={{
                          background: `linear-gradient(135deg, ${layer.tone}, color-mix(in oklab, ${layer.tone} 82%, #000))`,
                          transform: `translateZ(calc(${i * 10}px + var(--x) * ${i * 30 + 24}px + ${on ? 46 : 0}px))`,
                          opacity: i > active + 0 ? 0.28 : 1,
                          boxShadow: on
                            ? `0 0 0 2px var(--color-halo), 0 0 60px rgb(159 183 201 / .35), 8px 8px 0 -2px color-mix(in oklab, ${layer.tone} 60%, #000)`
                            : `8px 8px 0 -2px color-mix(in oklab, ${layer.tone} 60%, #000)`,
                          filter: done ? "saturate(.8)" : undefined,
                        }}
                      >
                        <span
                          className={`absolute left-3 top-3 font-mono text-[11px] tracking-[0.14em] ${
                            i < 3 ? "text-membrane/80" : "text-ink/60"
                          }`}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {on && (
                          <span className="absolute inset-0 rounded-[6px] bg-[repeating-linear-gradient(45deg,transparent_0_10px,rgb(159_183_201/0.12)_10px_11px)]" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Copy */}
            <div className="order-2 lg:col-span-6 lg:pl-6">
              <SectionLabel index="03" label="LuxGuard™ 360°" tone="dark" className="hidden lg:flex" />
              <h2 id="luxguard-title" className="text-display mt-0 type-h2 lg:mt-6">
                Seven layers.{" "}
                <span className="text-halo-deep">One seamless</span> shield.
              </h2>

              {/* All seven layers stay in the DOM (crawlable, and read in order by screen readers);
                  only the active one is shown. */}
              <div className="relative mt-6 grid md:mt-10">
                {luxguardLayers.map((layer, i) => (
                  <article
                    key={layer.name}
                    className={`col-start-1 row-start-1 transition-[opacity,transform,filter] duration-700 ease-out-expo ${
                      i === active ? "opacity-100" : "pointer-events-none translate-y-3 opacity-0 blur-[3px]"
                    }`}
                  >
                    <p className="flex items-baseline gap-3 font-mono text-xs uppercase tracking-[0.16em] text-ink/65">
                      <span className="text-display text-[2rem] leading-none tracking-tight text-ink">{String(i + 1).padStart(2, "0")}</span>/
                      {String(N).padStart(2, "0")} · {layer.tagline}
                    </p>
                    <h3 className="mt-3 type-h3 font-semibold tracking-tight">{layer.name}</h3>
                    <p className="mt-3 max-w-[48ch] leading-relaxed text-ink/65">{layer.body}</p>
                    <p className="mt-5 inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-membrane">
                      <span className="size-1.5 rounded-full bg-halo" />
                      {layer.stat}
                    </p>
                  </article>
                ))}
              </div>

              <ol className="mt-6 hidden grid-cols-7 gap-1.5 md:grid" aria-label="LuxGuard layers">
                {luxguardLayers.map((layer, i) => (
                  <li key={layer.name}>
                    <button
                      type="button"
                      onClick={() => goTo(i)}
                      className="group w-full text-left"
                      aria-current={i === active ? "step" : undefined}
                      aria-label={`Layer ${i + 1}: ${layer.name}`}
                    >
                      <span className="block h-[3px] overflow-hidden rounded-full bg-ink/12">
                        <span
                          className="block h-full origin-left bg-halo transition-transform duration-700 ease-out-expo"
                          style={{ transform: `scaleX(${i <= active ? 1 : 0})` }}
                        />
                      </span>
                      <span
                        className={`mt-2 block truncate font-mono text-[0.62rem] uppercase tracking-[0.1em] transition-colors ${
                          i === active ? "text-ink" : "text-ink/65 group-hover:text-ink/70"
                        }`}
                      >
                        {layer.name.split(" ")[0]}
                      </span>
                    </button>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>

      {/* Features + CTA */}
      <div className="container-x relative pb-20 md:pb-28">
        <div className="grid gap-10 rounded-[32px] bg-ink p-8 text-membrane md:p-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="type-statement font-medium leading-tight tracking-tight">
              Engineered for the UAE&apos;s harshest climate — and backed for up to 25 years.
            </p>
            <Magnetic
              href={whatsappHref("Hi Halo Shield, I'd like a LuxGuard™ 360° consultation.")}
              target="_blank"
              rel="noopener noreferrer"
              className="whatsapp-btn group mt-8 rounded-full bg-halo py-4 pl-6 pr-4 font-semibold text-ink"
            >
              Request a LuxGuard™ consultation
              <span className="grid size-8 place-items-center rounded-full bg-ink text-membrane transition-transform duration-500 group-hover:-rotate-45">
                →
              </span>
            </Magnetic>
          </div>
          <ul className="grid gap-px overflow-hidden rounded-2xl bg-membrane/10 sm:grid-cols-2 lg:col-span-7">
            {features.map((f, i) => (
              <li key={f} className="flex items-start gap-4 bg-ink p-6" data-reveal style={{ ["--reveal-delay" as string]: `${i * 60}ms` }}>
                <span className="mt-0.5 font-mono text-xs text-halo">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-[0.98rem] leading-snug text-membrane/85">{f}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

    </section>
  );
}
