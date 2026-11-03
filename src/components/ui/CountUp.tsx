"use client";

import { useEffect, useRef } from "react";

type Props = { value: number; decimals?: number; suffix?: string; prefix?: string; duration?: number; className?: string };

const fmt = (n: number, d: number) => n.toLocaleString("en-US", { minimumFractionDigits: d, maximumFractionDigits: d });

/**
 * Counts up once when scrolled into view. The final value is server-rendered (SEO / no-JS);
 * on the client it is zeroed while still off-screen, then animated by writing textContent
 * directly — no React re-renders per frame.
 */
export function CountUp({ value, decimals = 0, suffix = "", prefix = "", duration = 1600, className }: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight) return; // already visible — leave the real number alone
    el.textContent = `${prefix}${fmt(0, decimals)}${suffix}`;
    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const tick = (t: number) => {
          const k = Math.min(1, (t - t0) / duration);
          const eased = 1 - Math.pow(1 - k, 4);
          el.textContent = `${prefix}${fmt(value * eased, decimals)}${suffix}`;
          if (k < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value, decimals, suffix, prefix, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {fmt(value, decimals)}
      {suffix}
    </span>
  );
}
