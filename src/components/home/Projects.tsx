"use client";

import { useEffect, useRef, useState } from "react";
import { Img } from "@/components/ui/Img";
import { CountUp } from "@/components/ui/CountUp";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { projects, stats } from "@/lib/site";

const N = projects.length;
const STEP = 24; // degrees between cards
const wrap = (u: number) => ((((u + N / 2) % N) + N) % N) - N / 2;

/**
 * Concave 3D arc (inspired by a camera-in-the-middle gallery): side cards swing toward the viewer.
 * Drag with inertia + snap, arrow keys, and slow autoplay when idle and on-screen.
 */
export function Projects() {
  const stageRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLLIElement | null)[]>([]);
  const [focus, setFocus] = useState(0);
  const api = useRef<{ go: (d: number) => void } | null>(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let offset = 0;
    let target = 0;
    let vel = 0;
    let dragging = false;
    let lastX = 0;
    let lastT = 0;
    let idleAt = performance.now();
    let visible = false;
    let raf = 0;
    let cardW = 240;
    let R = 620;

    const measure = () => {
      cardW = Math.max(150, Math.min(270, window.innerWidth * 0.18));
      R = cardW * 2.7;
      stage.style.setProperty("--cw", `${cardW}px`);
      stage.style.perspective = `${R * 2.1}px`;
    };

    const render = () => {
      for (let i = 0; i < N; i++) {
        const el = cardsRef.current[i];
        if (!el) continue;
        const u = wrap(i - offset);
        const a = u * STEP;
        const rad = (a * Math.PI) / 180;
        const x = R * Math.sin(rad);
        const z = R - R * Math.cos(rad);
        const vis = Math.abs(a) <= 80;
        el.style.transform = `translate3d(${x}px,0,${z}px) rotateY(${-a}deg)`;
        el.style.opacity = vis ? String(1 - Math.max(0, Math.abs(a) - 60) / 20) : "0";
        el.style.zIndex = String(100 - Math.round(Math.abs(u) * 10));
        el.style.pointerEvents = vis ? "auto" : "none";
        (el.firstElementChild as HTMLElement | null)?.style.setProperty("--dim", String(Math.min(0.6, Math.abs(u) * 0.18)));
      }
      const f = ((Math.round(offset) % N) + N) % N;
      setFocus((p) => (p === f ? p : f));
    };

    const loop = (t: number) => {
      if (!dragging) {
        if (!reduce && visible && t - idleAt > 3600) {
          target = Math.round(target) + 1;
          idleAt = t;
        }
        // momentum then spring to target
        if (Math.abs(vel) > 0.0005) {
          target += vel * 16;
          vel *= 0.92;
          if (Math.abs(vel) < 0.002) {
            target = Math.round(target);
            vel = 0;
          }
        }
        offset += (target - offset) * (reduce ? 1 : 0.085);
      }
      render();
      raf = visible ? requestAnimationFrame(loop) : 0;
    };

    const kick = () => {
      if (!raf) raf = requestAnimationFrame(loop);
    };

    const down = (e: PointerEvent) => {
      dragging = true;
      vel = 0;
      lastX = e.clientX;
      lastT = performance.now();
      stage.setPointerCapture(e.pointerId);
      stage.dataset.drag = "1";
    };
    const moveP = (e: PointerEvent) => {
      if (!dragging) return;
      const now = performance.now();
      const dx = e.clientX - lastX;
      const d = -dx / (cardW * 1.15);
      offset += d;
      target = offset;
      vel = d / Math.max(1, now - lastT);
      lastX = e.clientX;
      lastT = now;
      idleAt = now;
      kick();
    };
    const up = () => {
      if (!dragging) return;
      dragging = false;
      idleAt = performance.now();
      delete stage.dataset.drag;
      if (Math.abs(vel) < 0.002) target = Math.round(offset);
      kick();
    };

    api.current = {
      go: (d) => {
        target = Math.round(target) + d;
        vel = 0;
        idleAt = performance.now();
        kick();
      },
    };

    measure();
    render();
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) {
        idleAt = performance.now();
        kick();
      }
    });
    io.observe(stage);
    stage.addEventListener("pointerdown", down);
    window.addEventListener("pointermove", moveP);
    window.addEventListener("pointerup", up);
    window.addEventListener("pointercancel", up);
    const onResize = () => {
      measure();
      render();
    };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      stage.removeEventListener("pointerdown", down);
      window.removeEventListener("pointermove", moveP);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", up);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const p = projects[focus];

  return (
    <section id="projects" aria-labelledby="projects-title" className="relative overflow-hidden bg-bone pt-24 text-ink md:pt-36">
      <div className="container-x text-center">
        <SectionLabel index="07" label="Selected work" tone="dark" className="justify-center" />
        <h2 id="projects-title" className="text-display mx-auto mt-8 max-w-[18ch] type-h2" data-reveal>
          Protecting Dubai&apos;s{" "}
          <span className="text-halo-deep">finest</span> addresses
        </h2>
        <p className="mx-auto mt-6 max-w-[52ch] leading-relaxed text-ink/60" data-reveal>
          From Palm Jumeirah villas to Downtown podiums in the shadow of the Burj — real projects, real crews, real
          membranes.
        </p>
      </div>

      <div
        ref={stageRef}
        role="region"
        aria-roledescription="carousel"
        aria-label="Project gallery — drag or use the arrow buttons"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") api.current?.go(1);
          if (e.key === "ArrowLeft") api.current?.go(-1);
        }}
        className="relative mx-auto mt-10 h-[calc(var(--cw,240px)*1.45)] cursor-grab touch-pan-y select-none outline-none data-drag:cursor-grabbing md:mt-16"
        style={{ perspectiveOrigin: "50% 45%" }}
      >
        <ul className="absolute left-1/2 top-0 h-full w-[var(--cw,240px)] -translate-x-1/2 transform-3d">
          {projects.map((pr, i) => (
            <li
              key={pr.title + pr.location}
              ref={(el) => {
                cardsRef.current[i] = el;
              }}
              className="absolute inset-0 will-change-transform backface-hidden"
              aria-hidden={i !== focus}
            >
              <figure className="relative size-full overflow-hidden rounded-[22px] bg-ink-3 shadow-[0_30px_60px_-30px_rgb(12_12_13/0.55)]">
                <Img
                  name={pr.image}
                  alt={`${pr.title} — ${pr.location}, Dubai`}
                  sizes="270px"
                  className="pointer-events-none absolute inset-0 size-full object-cover"
                  draggable={false}
                />
                <div className="absolute inset-0 bg-ink [opacity:var(--dim,0)] transition-opacity" />
                <figcaption className="absolute inset-x-0 bottom-0 bg-linear-to-t from-ink/85 to-transparent p-4 pt-16 text-left text-membrane">
                  <span className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-halo">{pr.location}</span>
                  <span className="mt-1 block text-[0.95rem] font-semibold leading-tight">{pr.title}</span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>

      {/* Focus readout + controls */}
      <div className="container-x mt-10 flex flex-col items-center gap-6 md:mt-14">
        <div className="flex items-center gap-5">
          <button
            type="button"
            onClick={() => api.current?.go(-1)}
            aria-label="Previous project"
            className="grid size-12 place-items-center rounded-full border border-ink/20 transition-colors hover:bg-ink hover:text-membrane"
          >
            ←
          </button>
          <div className="min-w-[16rem] text-center" aria-live="polite">
            <p className="text-lg font-semibold">{p.title}</p>
            <p className="mt-1 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-ink/65">
              {p.location} · {p.spec}
            </p>
          </div>
          <button
            type="button"
            onClick={() => api.current?.go(1)}
            aria-label="Next project"
            className="grid size-12 place-items-center rounded-full border border-ink/20 transition-colors hover:bg-ink hover:text-membrane"
          >
            →
          </button>
        </div>
        <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 font-mono text-[0.68rem] uppercase tracking-[0.14em]">
          {[...new Set(projects.map((x) => x.location))].map((loc, i, arr) => (
            <li key={loc} className="flex items-center gap-5">
              <span className={`transition-colors ${loc === p.location ? "text-ink" : "text-ink/65"}`}>{loc}</span>
              {i < arr.length - 1 && <span aria-hidden className="size-1 rounded-full bg-ink/25" />}
            </li>
          ))}
        </ul>
      </div>

      {/* Stats */}
      <div className="container-x mt-20 md:mt-28">
        <dl className="grid grid-cols-2 border-t border-ink/15 lg:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`flex flex-col-reverse justify-end py-10 pr-6 ${i > 0 ? "lg:border-l lg:border-ink/15 lg:pl-8" : ""} ${i % 2 ? "border-l border-ink/15 pl-6 lg:pl-8" : ""}`}
            >
              <dt className="mt-2 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-ink/65">{s.label}</dt>
              <dd className="text-display type-stat">
                <CountUp value={s.value} decimals={"decimals" in s ? s.decimals : 0} suffix={s.suffix} />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
