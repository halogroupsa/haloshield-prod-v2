"use client";

import { useEffect, useRef } from "react";
import { RainCanvas } from "./RainCanvas";
import { Magnetic } from "@/components/ui/Magnetic";
import { site, telHref, whatsappHref } from "@/lib/site";

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

const callouts = [
  { k: "01", t: "Seamless · zero joints", pos: "left-[-6%] top-[14%]", line: "right" },
  { k: "02", t: "Up to 300% elongation", pos: "right-[-5%] top-[30%]", line: "left" },
  { k: "03", t: "Hot-spray polyurea · 85°C", pos: "left-[-14%] top-[58%]", line: "right" },
  { k: "04", t: "UV-stable aliphatic topcoat", pos: "right-[-3%] top-[72%]", line: "left" },
] as const;

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const shieldRef = useRef<HTMLDivElement>(null);
  const haloRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Scroll-linked shield expansion
  useEffect(() => {
    const section = sectionRef.current;
    const shield = shieldRef.current;
    if (!section || !shield) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let base = { dx: 0, dy: 0, S: 1 };
    const measure = () => {
      const prev = shield.style.transform;
      shield.style.transform = "none";
      const r = shield.getBoundingClientRect();
      shield.style.transform = prev;
      const W = window.innerWidth;
      const H = window.innerHeight;
      const ox = r.left + r.width * 0.5;
      const oy = r.top + r.height * 0.32;
      base = {
        dx: W / 2 - ox,
        dy: H / 2 - oy,
        S: Math.max((1.08 * W) / r.width, (1.18 * H) / (0.52 * r.height)),
      };
    };

    let raf = 0;
    const update = () => {
      raf = 0;
      // The mobile hero flows naturally, with the shield above the copy.
      // Expanding it there would cover the headline as the visitor scrolls.
      if (!window.matchMedia("(min-width: 1024px)").matches) {
        section.style.setProperty("--p", "0");
        section.style.setProperty("--e", "0");
        shield.style.transform = "none";
        return;
      }
      const rect = section.getBoundingClientRect();
      const runway = section.offsetHeight - window.innerHeight;
      const p = clamp(-rect.top / runway);
      const e = reduce ? (p > 0.5 ? 1 : 0) : easeInOut(clamp((p - 0.04) / 0.7));
      section.style.setProperty("--p", p.toFixed(4));
      section.style.setProperty("--e", e.toFixed(4));
      shield.style.transform = `translate3d(${base.dx * e}px, ${base.dy * e}px, 0) scale(${1 + (base.S - 1) * e})`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    const onResize = () => {
      measure();
      update();
    };
    measure();
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  // Defer the video until the page is idle so the poster wins LCP.
  useEffect(() => {
    const v = videoRef.current;
    if (!v || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const go = () => {
      v.preload = "auto";
      v.load();
      v.play().catch(() => {});
    };
    const ric = (window as unknown as { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number })
      .requestIdleCallback;
    const schedule = () => {
      if (ric) ric(go, { timeout: 2500 });
      else setTimeout(go, 800);
    };
    if (document.readyState === "complete") schedule();
    else window.addEventListener("load", schedule, { once: true });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="top"
      aria-labelledby="hero-title"
      className="relative min-h-svh lg:h-[240svh]"
      style={{ ["--p" as string]: 0, ["--e" as string]: 0 }}
    >
      <div className="grain relative min-h-svh overflow-hidden bg-ink lg:sticky lg:top-0 lg:h-svh">
        {/* atmosphere */}
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(60%_50%_at_72%_40%,rgb(159_183_201/0.16),transparent_70%),radial-gradient(40%_40%_at_10%_90%,rgb(120_140_170/0.12),transparent_70%)]"
        />
        <div aria-hidden className="blueprint absolute inset-0 text-membrane opacity-40 [mask-image:radial-gradient(70%_60%_at_70%_40%,#000,transparent)]" />

        <RainCanvas
          shieldRef={shieldRef}
          haloRef={haloRef}
          className="pointer-events-none absolute inset-0 z-[1] size-full [opacity:calc(1-var(--e)*1.4)]"
        />

        {/* the visitor's own halo */}
        <div
          ref={haloRef}
          aria-hidden
          className="pointer-events-none absolute left-0 top-0 z-[2] h-[44px] w-[148px] rounded-[50%] border-[1.5px] border-halo opacity-0 shadow-[0_0_24px_rgb(159_183_201/0.45),inset_0_0_14px_rgb(159_183_201/0.35)] transition-opacity duration-300"
        />

        <div className="container-x relative z-[3] grid min-h-svh grid-cols-12 content-center items-center gap-x-6 gap-y-8 pb-24 pt-24 lg:h-full lg:min-h-0 lg:gap-y-0 lg:py-0">
          {/* Copy */}
          <div
            className="order-2 col-span-12 flex flex-col lg:order-1 lg:col-span-7 lg:h-full lg:justify-center lg:pb-10 lg:pt-28"
            style={{ opacity: "calc(1 - var(--p) * 3.4)", transform: "translate3d(0, calc(var(--p) * -140px), 0)" }}
          >
            <h1 id="hero-title" className="text-membrane">
              <span className="text-eyebrow mb-5 flex items-center gap-3 text-membrane/90">
                <span className="h-px w-8 bg-halo" />
                Waterproofing company in Dubai
              </span>
              <span className="text-display block type-hero">
                <span className="line-mask is-in" style={{ ["--i" as string]: 0 }}>
                  <span>Water finds</span>
                </span>
                <span className="line-mask is-in" style={{ ["--i" as string]: 1 }}>
                  <span>the weakest</span>
                </span>
                <span className="line-mask is-in" style={{ ["--i" as string]: 2 }}>
                  <span>
                    point<span className="text-halo">.</span>
                  </span>
                </span>
                <span className="line-mask is-in" style={{ ["--i" as string]: 3 }}>
                  <span>We engineer it out.</span>
                </span>
              </span>
            </h1>

            <p className="mt-5 max-w-[34rem] text-[0.92rem] leading-relaxed text-membrane/85 sm:mt-6 sm:text-[0.98rem] md:text-[1.05rem]">
              Seamless, joint-free <strong className="font-semibold text-membrane">LuxGuard™ 360°</strong> protection for
              villas, towers and podiums — designed by DM-approved engineers for 50°C summers, coastal humidity and the
              next April-2024 storm.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Magnetic
                href={whatsappHref("Hi Halo Shield, I'd like to book a 360° assessment.")}
                target="_blank"
                rel="noopener noreferrer"
                className="whatsapp-btn group rounded-full bg-halo py-4 pl-6 pr-4 text-[0.92rem] font-semibold text-ink"
              >
                Book a 360° assessment
                <span className="grid size-8 place-items-center rounded-full bg-ink text-membrane transition-transform duration-500 group-hover:-rotate-45">
                  <Arrow />
                </span>
              </Magnetic>
              <a
                href={telHref}
                className="phone-btn hidden rounded-full border border-membrane/20 px-6 py-4 sm:inline-flex text-[0.92rem] text-membrane/85 backdrop-blur transition-colors hover:border-membrane/50 hover:text-membrane"
              >
                Talk to an engineer
              </a>
            </div>

            <ul className="mt-8 hidden flex-wrap items-center gap-x-7 gap-y-3 font-mono min-[380px]:flex text-[0.7rem] uppercase tracking-[0.14em] text-membrane/75">
              <li className="flex items-center gap-2.5">
                {/* SVG stars sized to the caps — text glyphs sit on the baseline and drift off-centre */}
                <span className="flex gap-0.5 text-halo" aria-hidden>
                  {Array.from({ length: 5 }, (_, i) => (
                    <svg key={i} viewBox="2 2 20 19.02" className="h-[0.8em] w-auto fill-current">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z" />
                    </svg>
                  ))}
                </span>
                <span className="[text-box:trim-both_cap_alphabetic]">
                  {site.ratings.google} Google rating
                </span>
              </li>
              <li className="hidden sm:block [text-box:trim-both_cap_alphabetic]">650+ properties protected</li>
              <li className="hidden sm:block [text-box:trim-both_cap_alphabetic]">Up to 25-yr assurance</li>
            </ul>
          </div>

          {/* Shield stage */}
          <div className="pointer-events-none relative order-1 col-span-12 w-[min(44vw,20svh,200px)] justify-self-center lg:order-2 lg:col-span-5 lg:w-auto">
            <div className="relative w-[min(100%,34rem)] lg:w-[min(36vw,64svh)]">
              {/* back arc of the halo ring */}
              <HaloRing half="back" />
              <div
                ref={shieldRef}
                className="shield-clip relative z-[1] aspect-[521/541] origin-[50%_32%] bg-ink-3 will-change-transform"
              >
                {/* The poster is a real <img> so it is the LCP element; the video fades in over it
                    at identical size once it's actually playing (never re-triggers LCP). */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/video/hero-poster.jpg"
                  srcSet="/video/hero-poster-800.jpg 800w, /video/hero-poster.jpg 1600w"
                  sizes="(min-width: 1024px) 36vw, 52vw"
                  alt=""
                  width={1600}
                  height={900}
                  fetchPriority="high"
                  decoding="sync"
                  className="absolute inset-0 size-full object-cover"
                />
                <video
                  ref={videoRef}
                  className="absolute inset-0 size-full object-cover opacity-0 transition-opacity duration-1000"
                  onPlaying={(e) => (e.currentTarget.style.opacity = "1")}
                  muted
                  loop
                  playsInline
                  autoPlay
                  preload="none"
                  aria-label="Halo Shield crew spraying a seamless polyurea membrane on a Dubai rooftop"
                >
                  <source src="/video/hero-loop.webm" type="video/webm" />
                  <source src="/video/hero-loop.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-linear-to-b from-ink/10 via-transparent to-ink/50" />
                <div className="absolute inset-0 bg-ink [opacity:calc(var(--e)*0.55)]" />
              </div>
              {/* front arc of the halo ring */}
              <HaloRing half="front" />

              {/* engineering callouts */}
              <div className="hidden lg:block" style={{ opacity: "calc(1 - var(--e) * 4)" }}>
                {callouts.map((c, i) => (
                  <div
                    key={c.k}
                    className={`absolute z-[2] flex items-center gap-3 ${c.pos} ${c.line === "left" ? "flex-row-reverse" : ""}`}
                    style={{ animation: `fade-in 1s ${0.9 + i * 0.15}s both` }}
                  >
                    <span className="whitespace-nowrap rounded-full border border-membrane/30 bg-ink/80 px-3 py-1.5 font-mono text-[0.66rem] uppercase tracking-[0.12em] text-membrane/95 backdrop-blur">
                      <span className="mr-2 text-halo">{c.k}</span>
                      {c.t}
                    </span>
                    <span className="h-px w-10 bg-linear-to-r from-membrane/50 to-transparent" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Manifesto — appears when the shield fills the screen */}
        <div
          className="pointer-events-none absolute inset-0 z-[4] grid place-items-center px-6 text-center"
          style={{
            opacity: "clamp(0, (var(--p) - 0.62) * 4, 1)",
            transform: "translate3d(0, calc((1 - clamp(0, (var(--p) - 0.6) * 3, 1)) * 40px), 0)",
          }}
        >
          <div>
            <p className="type-statement font-medium tracking-tight text-membrane/90">This is not a coating.</p>
            <p className="text-display mx-auto mt-3 max-w-[16ch] type-hero text-membrane">
              It&apos;s a seven-layer <span className="text-halo">defence</span> system.
            </p>
          </div>
        </div>

        {/* footer row */}
        <div
          className="container-x absolute inset-x-0 bottom-5 z-[3] hidden items-end justify-end font-mono text-[0.66rem] uppercase tracking-[0.18em] text-membrane/60 md:flex"
          style={{ opacity: "calc(1 - var(--p) * 5)" }}
        >
          {/* <span className="hidden pr-20 pointer-fine:inline">Move your cursor · you are the shield</span> */}
        </div>
      </div>

      <style>{`
        @keyframes fade-in { from { opacity: 0; transform: translateY(8px) } to { opacity: 1; transform: none } }
        @keyframes orbit { to { stroke-dashoffset: -1000 } }
      `}</style>
    </section>
  );
}

/** The logo's halo ring, split into back/front halves so it orbits *through* the shield. */
function HaloRing({ half }: { half: "back" | "front" }) {
  const front = half === "front";
  return (
    <svg
      aria-hidden
      viewBox="0 0 600 140"
      className={`absolute left-1/2 top-[22%] w-[128%] -translate-x-1/2 overflow-visible ${front ? "z-[2]" : "z-0"}`}
      style={{ opacity: "calc(1 - var(--e) * 3)" }}
    >
      <defs>
        <clipPath id={`ring-${half}`}>
          <rect x="-20" y={front ? 70 : -20} width="640" height="90" />
        </clipPath>
        <linearGradient id={`ring-grad-${half}`} x1="0" x2="1">
          <stop offset="0" stopColor="var(--color-halo)" stopOpacity="0.1" />
          <stop offset="0.5" stopColor="var(--color-halo)" stopOpacity={front ? 1 : 0.45} />
          <stop offset="1" stopColor="var(--color-halo)" stopOpacity="0.1" />
        </linearGradient>
      </defs>
      <g clipPath={`url(#ring-${half})`}>
        <ellipse cx="300" cy="70" rx="290" ry="56" fill="none" stroke={`url(#ring-grad-${half})`} strokeWidth={front ? 2.2 : 1.4} />
        <ellipse
          cx="300"
          cy="70"
          rx="290"
          ry="56"
          fill="none"
          stroke="var(--color-membrane)"
          strokeOpacity={front ? 0.9 : 0.35}
          strokeWidth="2.4"
          strokeDasharray="6 994"
          style={{ animation: "orbit 9s linear infinite" }}
          pathLength={1000}
        />
      </g>
    </svg>
  );
}

function Arrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}
