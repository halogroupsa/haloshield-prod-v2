"use client";

import { useEffect, useRef, useState } from "react";

const TMIN = 20;
const TMAX = 75;
const TEAR_AT = 46; // °C at which the conventional lap joint opens

/**
 * Interactive cross-section: two concrete slabs either side of a joint, heated from 20°C to 75°C.
 * Top: conventional lapped membrane — tears at the joint and leaks.
 * Bottom: LuxGuard™ seamless membrane — thins and stretches, never opens.
 */
export function MovementTest() {
  const [t, setT] = useState(38);
  const [auto, setAuto] = useState(true);
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!auto || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    let visible = false;
    const t0 = performance.now();
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) raf = requestAnimationFrame(loop);
    });
    const loop = (now: number) => {
      const k = (Math.sin(((now - t0) / 7000) * Math.PI * 2 - Math.PI / 2) + 1) / 2;
      setT(Math.round(TMIN + 4 + k * (TMAX - TMIN - 6)));
      if (visible) raf = requestAnimationFrame(loop);
    };
    if (wrap.current) io.observe(wrap.current);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [auto]);

  const k = (t - TMIN) / (TMAX - TMIN); // 0..1
  const gap = 6 + k * 26; // px in the drawing
  const mm = (k * 4.2).toFixed(1);
  const torn = t >= TEAR_AT;
  const tear = torn ? Math.min(1, (t - TEAR_AT) / 12) : 0;
  const fill = `${k * 100}%`;

  return (
    <div ref={wrap} className="relative overflow-hidden rounded-[28px] bg-ink p-5 text-membrane shadow-[0_40px_80px_-30px_rgb(12_12_13/0.6)] md:p-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-eyebrow text-membrane/60">Interactive · the movement test</p>
          <p className="mt-3 max-w-[22ch] text-sm leading-snug text-membrane/70">
            Drag the temperature. Watch what daily expansion does to each system.
          </p>
        </div>
        <div className="text-right">
          <p className="text-display type-stat tabular-nums" aria-live="polite">
            {t}
            <span className="align-top text-[0.45em] text-halo">°C</span>
          </p>
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-membrane/60">Joint opens {mm} mm</p>
        </div>
      </div>

      <svg viewBox="0 0 600 356" className="mt-4 w-full" role="img" aria-label={`At ${t}°C the joint opens ${mm} millimetres. The conventional membrane ${torn ? "has torn and is leaking" : "is still intact"}; the LuxGuard membrane stretches and stays sealed.`}>
        <defs>
          <pattern id="concrete" width="8" height="8" patternUnits="userSpaceOnUse">
            <rect width="8" height="8" fill="#2a2a2e" />
            <circle cx="2" cy="3" r="0.8" fill="#3a3a40" />
            <circle cx="6" cy="6" r="0.6" fill="#34343a" />
          </pattern>
          <linearGradient id="heat" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="var(--color-halo)" stopOpacity={0.05 + k * 0.35} />
            <stop offset="1" stopColor="var(--color-halo)" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* ---------- Conventional ---------- */}
        <g transform="translate(0,0)">
          <rect x="0" y="0" width="600" height="60" fill="url(#heat)" />
          <text x="0" y="16" className="fill-membrane/60 font-mono text-[11px] uppercase tracking-[0.12em]">
            Conventional · lapped membrane
          </text>
          <Slabs y={92} gap={gap} />
          {/* left sheet */}
          <path
            d={`M20 ${88} L${300 - gap / 2 + 14 - tear * 22} ${88}`}
            stroke="#7c8993"
            strokeWidth="6"
            strokeLinecap="round"
          />
          {/* right sheet (lapped over left) */}
          <path
            d={`M${300 + gap / 2 - 14 + tear * 22} ${torn ? 84 - tear * 6 : 84} L580 84`}
            stroke="#9daab5"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <Rain x0={40} x1={560} y={84} leakX={torn ? 300 : null} leakDepth={150} />
          {torn && (
            <g style={{ opacity: tear }}>
              <line x1="300" y1="96" x2="300" y2="164" stroke="#5ab4ff" strokeWidth="2" strokeDasharray="3 4" />
              <rect x="318" y="152" width="92" height="22" rx="11" fill="var(--color-halo)" />
              <text x="364" y="167" textAnchor="middle" className="fill-ink font-mono text-[10px] font-bold uppercase tracking-[0.12em]">
                Leak path
              </text>
            </g>
          )}
        </g>

        {/* ---------- LuxGuard ---------- */}
        <g transform="translate(0,176)">
          <text x="0" y="16" className="fill-membrane/60 font-mono text-[11px] uppercase tracking-[0.12em]">
            LuxGuard™ 360° · seamless
          </text>
          <Slabs y={92} gap={gap} />
          <path
            d={`M20 88 L${300 - gap / 2 - 10} 88 Q300 ${88 + gap * 0.28} ${300 + gap / 2 + 10} 88 L580 88`}
            stroke="var(--color-halo)"
            strokeWidth={8 - k * 3}
            strokeLinecap="round"
            fill="none"
          />
          <Rain x0={40} x1={560} y={82} leakX={null} leakDepth={0} />
          <rect x="300" y="152" width="158" height="22" rx="11" fill="none" stroke="var(--color-halo)" />
          <text x="379" y="167" textAnchor="middle" className="fill-halo font-mono text-[10px] uppercase tracking-[0.12em]">
            Stretches · sealed
          </text>
        </g>
      </svg>

      <label className="mt-2 block">
        <span className="sr-only">Surface temperature</span>
        <input
          type="range"
          className="range text-membrane"
          min={TMIN}
          max={TMAX}
          value={t}
          onChange={(e) => {
            setAuto(false);
            setT(Number(e.target.value));
          }}
          onPointerDown={() => setAuto(false)}
          style={{ ["--fill" as string]: fill }}
        />
      </label>
      <div className="mt-1 flex justify-between font-mono text-[0.66rem] uppercase tracking-[0.14em] text-membrane/60">
        <span>Winter night · 20°C</span>
        <span>July roof · 75°C</span>
      </div>
    </div>
  );
}

function Slabs({ y, gap }: { y: number; gap: number }) {
  return (
    <g>
      <rect x="20" y={y} width={280 - gap / 2} height="52" rx="3" fill="url(#concrete)" />
      <rect x={300 + gap / 2} y={y} width={280 - gap / 2} height="52" rx="3" fill="url(#concrete)" />
      <rect x={300 - gap / 2} y={y} width={gap} height="52" fill="#0c0c0d" />
    </g>
  );
}

/** A few looping drops. When `leakX` is set, one stream finds the gap and keeps falling. */
function Rain({ x0, x1, y, leakX, leakDepth }: { x0: number; x1: number; y: number; leakX: number | null; leakDepth: number }) {
  const xs = [0.08, 0.2, 0.33, 0.45, 0.62, 0.74, 0.86, 0.95].map((f) => x0 + f * (x1 - x0));
  return (
    <g>
      {xs.map((x, i) => (
        <circle key={i} cx={x} cy={y - 60} r="2.2" fill="#9fd2ff" style={{ animation: `drop-fall 1.4s ${i * 0.17}s linear infinite`, ["--d" as string]: "60px" }} />
      ))}
      {leakX !== null &&
        [0, 0.45, 0.9].map((d) => (
          <circle
            key={d}
            cx={leakX}
            cy={y - 60}
            r="2.4"
            fill="#5ab4ff"
            style={{ animation: `drop-fall 1.3s ${d}s linear infinite`, ["--d" as string]: `${60 + leakDepth * 0.4}px` }}
          />
        ))}
      <style>{`@keyframes drop-fall { 0% { transform: translateY(0); opacity: 0 } 10% { opacity: 1 } 85% { opacity: 1 } 100% { transform: translateY(var(--d)); opacity: 0 } }`}</style>
    </g>
  );
}
