"use client";

import { useEffect, useRef } from "react";
import { SHIELD_POLY } from "@/components/ui/ShieldDefs";

type Drop = { x: number; y: number; vy: number; len: number; a: number };
type Spark = { x: number; y: number; vx: number; vy: number; life: number; max: number };

type Props = {
  /** Element whose bounding box is the shield (its clip-path follows SHIELD_POLY). */
  shieldRef: React.RefObject<HTMLElement | null>;
  /** The halo ring that follows the cursor; positioned by this component. */
  haloRef: React.RefObject<HTMLElement | null>;
  className?: string;
};

const WIND = 0.16; // horizontal drift per unit of fall

function inPoly(px: number, py: number, poly: [number, number][]) {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i];
    const [xj, yj] = poly[j];
    if (yi > py !== yj > py && px < ((xj - xi) * (py - yi)) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
}

/**
 * The "rain test": streaks of rain fall across the hero and burst on contact with the shield
 * and with the visitor's own halo (the cursor). Pure canvas 2D, ~0.3 ms/frame; pauses offscreen,
 * on hidden tabs, and is skipped entirely for prefers-reduced-motion.
 */
export function RainCanvas({ shieldRef, haloRef, className }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const fine = window.matchMedia("(pointer: fine)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let W = 0;
    let H = 0;
    let drops: Drop[] = [];
    const sparks: Spark[] = [];
    let raf = 0;
    let running = false;
    let last = performance.now();

    const mouse = { x: -999, y: -999, tx: -999, ty: -999, active: false };
    const RX = 74;
    const RY = 22;

    const spawn = (d: Drop, top = false) => {
      d.x = Math.random() * (W + 200) - 100;
      d.y = top ? -Math.random() * 120 : Math.random() * H;
      d.vy = 900 + Math.random() * 700; // px/s
      d.len = 14 + Math.random() * 22;
      d.a = 0.12 + Math.random() * 0.3;
      return d;
    };

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      W = r.width;
      H = r.height;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(Math.min(260, (W * H) / (fine ? 5200 : 9000)));
      drops = Array.from({ length: count }, () => spawn({ x: 0, y: 0, vy: 0, len: 0, a: 0 }));
    };

    const splash = (x: number, y: number, nx: number, ny: number, n = 4) => {
      if (sparks.length > 420) return;
      for (let i = 0; i < n; i++) {
        const sp = 60 + Math.random() * 160;
        const ang = Math.atan2(ny, nx) + (Math.random() - 0.5) * 2.2;
        sparks.push({
          x,
          y,
          vx: Math.cos(ang) * sp,
          vy: Math.sin(ang) * sp - 40,
          life: 0,
          max: 0.28 + Math.random() * 0.25,
        });
      }
    };

    const frame = (now: number) => {
      const dt = Math.min(0.033, (now - last) / 1000);
      last = now;
      ctx.clearRect(0, 0, W, H);

      // shield rect relative to canvas
      const c = canvas.getBoundingClientRect();
      const s = shieldRef.current?.getBoundingClientRect();
      const poly: [number, number][] | null = s
        ? SHIELD_POLY.map(([px, py]) => [s.left - c.left + px * s.width, s.top - c.top + py * s.height])
        : null;
      const sl = s ? s.left - c.left : 0;
      const sr = s ? sl + s.width : 0;
      const st = s ? s.top - c.top : 0;
      const sb = s ? st + s.height : 0;

      // halo follows cursor with easing
      mouse.x += (mouse.tx - mouse.x) * Math.min(1, dt * 14);
      mouse.y += (mouse.ty - mouse.y) * Math.min(1, dt * 14);
      if (haloRef.current) {
        haloRef.current.style.transform = `translate3d(${mouse.x - RX}px, ${mouse.y - RY}px, 0)`;
        haloRef.current.style.opacity = mouse.active ? "1" : "0";
      }

      ctx.lineCap = "round";
      ctx.lineWidth = 1;
      for (const d of drops) {
        const dy = d.vy * dt;
        d.y += dy;
        d.x += dy * WIND;

        let hit = false;
        if (poly && d.x > sl && d.x < sr && d.y > st && d.y < sb && inPoly(d.x, d.y, poly)) {
          // normal: outward from shield centre, biased upward (rain lands on the crown/shoulders)
          const cx = (sl + sr) / 2;
          const nx = (d.x - cx) / (sr - sl);
          splash(d.x, d.y, nx * 1.2, -1, 3);
          hit = true;
        } else if (mouse.active) {
          const ex = (d.x - mouse.x) / RX;
          const ey = (d.y - mouse.y) / RY;
          if (ex * ex + ey * ey < 1 && d.y < mouse.y + 4) {
            splash(d.x, d.y, ex, -1, 4);
            hit = true;
          }
        }
        if (hit || d.y - d.len > H) {
          spawn(d, true);
          continue;
        }
        ctx.strokeStyle = `rgba(214,226,238,${d.a})`;
        ctx.beginPath();
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(d.x - d.len * WIND, d.y - d.len);
        ctx.stroke();
      }

      // sparks
      ctx.fillStyle = "rgba(255,255,255,0.75)";
      for (let i = sparks.length - 1; i >= 0; i--) {
        const p = sparks[i];
        p.life += dt;
        if (p.life > p.max) {
          sparks.splice(i, 1);
          continue;
        }
        p.vy += 980 * dt;
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        const k = 1 - p.life / p.max;
        ctx.globalAlpha = k * 0.85;
        ctx.fillRect(p.x, p.y, 1.6, 1.6);
      }
      ctx.globalAlpha = 1;

      if (running) raf = requestAnimationFrame(frame);
    };

    const start = () => {
      if (running) return;
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const r = canvas.getBoundingClientRect();
      mouse.tx = e.clientX - r.left;
      mouse.ty = e.clientY - r.top;
      if (!mouse.active) {
        mouse.x = mouse.tx;
        mouse.y = mouse.ty;
      }
      mouse.active = mouse.ty > 0 && mouse.ty < r.height;
    };
    const onLeave = () => (mouse.active = false);

    // Boot only once the page is loaded and idle — the rain is decoration, never a cost to LCP.
    const ro = new ResizeObserver(resize);
    const io = new IntersectionObserver(([e]) => (e.isIntersecting && !document.hidden ? start() : stop()));
    const onVis = () => (document.hidden ? stop() : start());
    let booted = false;
    let idleId = 0;
    const boot = () => {
      if (booted) return;
      booted = true;
      resize();
      ro.observe(canvas);
      io.observe(canvas);
      document.addEventListener("visibilitychange", onVis);
      if (fine) {
        window.addEventListener("pointermove", onMove, { passive: true });
        document.documentElement.addEventListener("pointerleave", onLeave);
      }
    };
    const w = window as unknown as { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number; cancelIdleCallback?: (id: number) => void };
    const schedule = () => {
      if (w.requestIdleCallback) idleId = w.requestIdleCallback(boot, { timeout: 2000 });
      else idleId = window.setTimeout(boot, 600);
    };
    if (document.readyState === "complete") schedule();
    else window.addEventListener("load", schedule, { once: true });

    return () => {
      window.removeEventListener("load", schedule);
      if (w.cancelIdleCallback) w.cancelIdleCallback(idleId);
      clearTimeout(idleId);
      stop();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [shieldRef, haloRef]);

  return <canvas ref={canvasRef} aria-hidden="true" className={className} />;
}
