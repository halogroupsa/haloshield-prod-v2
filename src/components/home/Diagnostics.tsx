"use client";

import { useEffect, useRef, useState } from "react";
import { Img } from "@/components/ui/Img";
import { SectionLabel } from "@/components/ui/SectionLabel";

const tech = [
  { t: "Thermal imaging", d: "Finds hidden water, insulation gaps and thermal bridges behind finished surfaces." },
  { t: "Moisture mapping", d: "Calibrated meters measure moisture content through walls, floors and ceilings." },
  { t: "Endoscope cameras", d: "We look inside cavities and behind fixtures — without opening them up." },
  { t: "Airflow analysis", d: "Anemometers quantify ventilation and HVAC performance that drive condensation." },
  { t: "Electrical testing", d: "Safety and compliance checks wherever water and services meet." },
  { t: "AI-assisted reports", d: "Every finding photographed, located and delivered as a clear, prioritised report." },
];

const IMG = "modern-dubai-villa" as const;

/** Drag-to-inspect thermal lens. The lens shows the photo through an SVG thermal-palette filter. */
export function Diagnostics() {
  const stageRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0.62, y: 0.42 });
  const [temp, setTemp] = useState<number | null>(null);
  const [touched, setTouched] = useState(false);
  const sampler = useRef<CanvasRenderingContext2D | null>(null);

  // Sample luminance from a small offscreen copy to drive the temperature readout.
  useEffect(() => {
    const img = new Image();
    img.src = `/images/${IMG}-480.webp`;
    img.onload = () => {
      const c = document.createElement("canvas");
      c.width = 96;
      c.height = 96;
      const ctx = c.getContext("2d", { willReadFrequently: true });
      if (!ctx) return;
      ctx.drawImage(img, 0, 0, 96, 96);
      sampler.current = ctx;
      setTemp(readTemp(ctx, 0.62, 0.42));
    };
  }, []);

  // Idle drift until the visitor takes over.
  useEffect(() => {
    if (touched || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    let visible = false;
    const t0 = performance.now();
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) raf = requestAnimationFrame(loop);
    });
    const loop = (now: number) => {
      const t = (now - t0) / 1000;
      const x = 0.5 + Math.sin(t * 0.45) * 0.26;
      const y = 0.45 + Math.sin(t * 0.7) * 0.18;
      setPos({ x, y });
      if (sampler.current) setTemp(readTemp(sampler.current, x, y));
      if (visible) raf = requestAnimationFrame(loop);
    };
    if (stageRef.current) io.observe(stageRef.current);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [touched]);

  const move = (clientX: number, clientY: number) => {
    const r = stageRef.current?.getBoundingClientRect();
    if (!r) return;
    const x = Math.min(1, Math.max(0, (clientX - r.left) / r.width));
    const y = Math.min(1, Math.max(0, (clientY - r.top) / r.height));
    setTouched(true);
    setPos({ x, y });
    if (sampler.current) setTemp(readTemp(sampler.current, x, y));
  };

  const onKey = (e: React.KeyboardEvent) => {
    const step = 0.04;
    const d = { ArrowLeft: [-step, 0], ArrowRight: [step, 0], ArrowUp: [0, -step], ArrowDown: [0, step] }[e.key];
    if (!d) return;
    e.preventDefault();
    setTouched(true);
    const x = Math.min(1, Math.max(0, pos.x + d[0]));
    const y = Math.min(1, Math.max(0, pos.y + d[1]));
    setPos({ x, y });
    if (sampler.current) setTemp(readTemp(sampler.current, x, y));
  };

  const lens = "clamp(110px, 16vw, 190px)";

  return (
    <section id="diagnostics" aria-labelledby="diagnostics-title" className="relative bg-ink py-20 text-membrane md:py-28">
      <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <SectionLabel index="06" label="Precision diagnostics" />
          <h2 id="diagnostics-title" className="text-display mt-8 type-h2" data-reveal>
            We see what{" "}
            <span className="text-halo">others miss</span>
          </h2>
          <p className="mt-6 max-w-[42ch] leading-relaxed text-membrane/60" data-reveal>
            Leaks rarely appear where water enters. Our diagnostic kit traces moisture back to its source before a
            single square metre is coated.
          </p>
          <dl className="mt-10 grid gap-px overflow-hidden rounded-2xl bg-membrane/10 sm:grid-cols-2">
            {tech.map((x, i) => (
              <div key={x.t} className="bg-ink p-5" data-reveal style={{ ["--reveal-delay" as string]: `${i * 50}ms` }}>
                <dt className="flex items-center gap-2 text-[0.95rem] font-semibold">
                  <span className="font-mono text-[0.65rem] text-halo">{String(i + 1).padStart(2, "0")}</span>
                  {x.t}
                </dt>
                <dd className="mt-2 text-[0.86rem] leading-relaxed text-membrane/55">{x.d}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="lg:col-span-7">
          <div
            ref={stageRef}
            role="slider"
            tabIndex={0}
            aria-label="Thermal lens position — use arrow keys to move"
            aria-valuetext={temp !== null ? `Surface reading ${temp} degrees Celsius` : undefined}
            aria-valuenow={Math.round(pos.x * 100)}
            aria-valuemin={0}
            aria-valuemax={100}
            onPointerMove={(e) => (e.pointerType === "mouse" || e.buttons) && move(e.clientX, e.clientY)}
            onPointerDown={(e) => {
              (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
              move(e.clientX, e.clientY);
            }}
            onKeyDown={onKey}
            className="relative aspect-square cursor-none touch-none overflow-hidden rounded-[28px] bg-ink-3 select-none md:aspect-[4/3.4] lg:sticky lg:top-24"
            style={{ ["--lx" as string]: `${pos.x * 100}%`, ["--ly" as string]: `${pos.y * 100}%`, ["--r" as string]: lens }}
          >
            <Img
              name={IMG}
              alt="Modern Dubai villa façade inspected with thermal imaging by Halo Shield"
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="absolute inset-0 size-full object-cover"
              draggable={false}
            />
            <div className="absolute inset-0 bg-ink/25" />
            {/* thermal layer, revealed only inside the lens */}
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                clipPath: "circle(calc(var(--r) / 2) at var(--lx) var(--ly))",
                filter: "url(#thermal) contrast(1.15)",
              }}
            >
              <Img name={IMG} alt="" sizes="(min-width: 1024px) 55vw, 100vw" placeholder={false} className="absolute inset-0 size-full object-cover" draggable={false} />
            </div>
            {/* reticle */}
            <div
              aria-hidden
              className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: "var(--lx)", top: "var(--ly)", width: "var(--r)", height: "var(--r)" }}
            >
              <div className="absolute inset-0 rounded-full border border-membrane/70 shadow-[0_0_0_1px_rgb(0_0_0/0.3),0_0_40px_rgb(0_0_0/0.4)]" />
              <div className="absolute left-1/2 top-1/2 h-4 w-px -translate-x-1/2 -translate-y-1/2 bg-membrane" />
              <div className="absolute left-1/2 top-1/2 h-px w-4 -translate-x-1/2 -translate-y-1/2 bg-membrane" />
              <div className="absolute left-[calc(100%+10px)] top-1/2 -translate-y-1/2 whitespace-nowrap rounded-md bg-ink/80 px-2.5 py-1.5 font-mono text-[0.7rem] tracking-[0.08em] text-halo-soft backdrop-blur">
                {temp !== null ? `${temp.toFixed(1)}°C` : "—"}
              </div>
            </div>
            {/* HUD */}
            <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between p-5 font-mono text-[0.66rem] uppercase tracking-[0.16em] text-membrane/70">
              <span className="flex items-center gap-2">
                <span className="size-1.5 animate-pulse rounded-full bg-halo" /> Thermal · live
              </span>
              <span>{touched ? "Inspecting" : "Drag to inspect"}</span>
            </div>
            <div aria-hidden className="pointer-events-none absolute inset-x-5 bottom-5 flex items-center gap-3 font-mono text-[0.62rem] text-membrane/70">
              <span>24°</span>
              <span className="h-1.5 flex-1 rounded-full bg-[linear-gradient(90deg,#101d3d,#193f70,#256894,#4b96ba,#80bdcf,#b7dce5,#f2fafc)]" />
              <span>58°</span>
            </div>
          </div>
          <p className="mt-3 font-mono text-[0.66rem] uppercase tracking-[0.14em] text-membrane/60">
            Illustrative diagnostic view · readings simulated from image luminance
          </p>
        </div>
      </div>
    </section>
  );
}

function readTemp(ctx: CanvasRenderingContext2D, x: number, y: number) {
  const px = Math.min(95, Math.max(0, Math.round(x * 95)));
  const py = Math.min(95, Math.max(0, Math.round(y * 95)));
  const d = ctx.getImageData(px, py, 1, 1).data;
  const l = (0.3 * d[0] + 0.59 * d[1] + 0.11 * d[2]) / 255;
  return Math.round((24 + l * 34) * 10) / 10;
}
