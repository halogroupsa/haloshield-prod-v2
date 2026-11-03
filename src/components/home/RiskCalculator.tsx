"use client";

import { useMemo, useState } from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { whatsappHref } from "@/lib/site";

const aed = (v: number) =>
  v >= 1_000_000 ? `AED ${(v / 1_000_000).toFixed(v >= 10_000_000 ? 0 : 1)}M` : `AED ${Math.round(v / 1000).toLocaleString("en-US")}K`;
const aedFull = (v: number) => `AED ${Math.round(v).toLocaleString("en-US")}`;

/** Same model as the previous site, now live-updating. Indicative only. */
function model(value: number, age: number, leaks: boolean) {
  const years = Math.min(age, 10);
  const items = [
    { k: "Structural damage", v: value * 0.02 * years },
    { k: "Value depreciation", v: value * (leaks ? 0.05 : 0.03) * years },
    { k: "Emergency repairs", v: leaks ? 150_000 : 50_000 },
    { k: "Mold remediation", v: leaks ? 75_000 : 25_000 },
  ];
  const total = items.reduce((a, b) => a + b.v, 0);
  const protection = value * 0.015;
  return { items, total, protection, roi: ((total - protection) / protection) * 100 };
}

export function RiskCalculator() {
  const [value, setValue] = useState(8_000_000);
  const [age, setAge] = useState(6);
  const [leaks, setLeaks] = useState(false);
  const r = useMemo(() => model(value, age, leaks), [value, age, leaks]);
  const max = r.total;

  return (
    <section id="risk" aria-labelledby="risk-title" className="grain relative overflow-hidden bg-ink py-20 text-membrane md:py-28">
      <div aria-hidden className="absolute -right-40 top-0 size-[40rem] rounded-full bg-halo/10 blur-[120px]" />
      <div className="container-x relative">
        <SectionLabel index="08" label="Risk calculator" />
        <h2 id="risk-title" className="text-display mt-8 max-w-[16ch] type-h2" data-reveal>
          What a leak <span className="text-halo">really</span> costs
        </h2>

        <div className="mt-14 grid items-start gap-6 lg:grid-cols-12">
          {/* Inputs */}
          <form className="rounded-[28px] border border-membrane/10 bg-ink-2 p-7 md:p-10 lg:col-span-5" onSubmit={(e) => e.preventDefault()}>
            <fieldset>
              <legend className="text-eyebrow text-membrane/60">Your property</legend>

              <label className="mt-8 block">
                <span className="flex items-baseline justify-between">
                  <span className="text-sm text-membrane/70">Property value</span>
                  <span className="text-display text-2xl tracking-tight tabular-nums">{aed(value)}</span>
                </span>
                <input
                  type="range"
                  className="range mt-3 text-membrane"
                  min={1_000_000}
                  max={50_000_000}
                  step={500_000}
                  value={value}
                  onChange={(e) => setValue(Number(e.target.value))}
                  aria-valuetext={aedFull(value)}
                  style={{ ["--fill" as string]: `${((value - 1e6) / 49e6) * 100}%` }}
                />
              </label>

              <label className="mt-8 block">
                <span className="flex items-baseline justify-between">
                  <span className="text-sm text-membrane/70">Property age</span>
                  <span className="text-display text-2xl tracking-tight tabular-nums">
                    {age} <span className="text-base text-membrane/60">yrs</span>
                  </span>
                </span>
                <input
                  type="range"
                  className="range mt-3 text-membrane"
                  min={1}
                  max={20}
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                  aria-valuetext={`${age} years`}
                  style={{ ["--fill" as string]: `${((age - 1) / 19) * 100}%` }}
                />
              </label>

              <label className="mt-8 flex cursor-pointer items-center justify-between gap-4 rounded-2xl border border-membrane/10 p-4">
                <span className="text-sm text-membrane/80">It has leaked before</span>
                <input type="checkbox" className="peer sr-only" checked={leaks} onChange={(e) => setLeaks(e.target.checked)} />
                <span
                  aria-hidden
                  className="relative h-7 w-12 rounded-full bg-membrane/15 transition-colors after:absolute after:left-1 after:top-1 after:size-5 after:rounded-full after:bg-membrane after:transition-transform peer-checked:bg-halo peer-checked:after:translate-x-5 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-halo"
                />
              </label>
            </fieldset>
          </form>

          {/* Output */}
          <div className="rounded-[28px] bg-membrane p-7 text-ink md:p-10 lg:col-span-7" aria-live="polite">
            <p className="text-eyebrow text-ink/65">Potential loss without protection · over {Math.min(age, 10)} yrs</p>
            <p className="text-display mt-4 type-stat tabular-nums text-halo-deep">{aed(r.total)}</p>

            <ul className="mt-8 space-y-4">
              {r.items.map((it) => (
                <li key={it.k}>
                  <div className="flex justify-between text-sm">
                    <span className="text-ink/70">{it.k}</span>
                    <span className="font-mono tabular-nums">{aedFull(it.v)}</span>
                  </div>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-ink/8">
                    <div
                      className="h-full origin-left rounded-full bg-ink transition-transform duration-700 ease-out-expo"
                      style={{ transform: `scaleX(${Math.max(0.01, it.v / max)})` }}
                    />
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-10 grid gap-6 border-t border-ink/10 pt-8 sm:grid-cols-3">
              <div>
                <p className="text-eyebrow text-ink/65">Halo Shield protection</p>
                <p className="mt-2 text-2xl font-semibold tabular-nums">{aed(r.protection)}</p>
              </div>
              <div>
                <p className="text-eyebrow text-ink/65">Loss avoided</p>
                <p className="mt-2 text-2xl font-semibold tabular-nums">{aed(r.total - r.protection)}</p>
              </div>
              <div>
                <p className="text-eyebrow text-ink/65">Return</p>
                <p className="mt-2 text-2xl font-semibold tabular-nums text-halo-deep">{Math.round(r.roi).toLocaleString("en-US")}%</p>
              </div>
            </div>

            <div className="mt-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
              <p className="max-w-[38ch] text-xs leading-relaxed text-ink/65">
                Indicative estimate based on UAE industry averages. Your real exposure is confirmed by a 360° assessment.
              </p>
              <a
                href={whatsappHref(
                  `Hi Halo Shield — I ran your risk calculator (${aed(value)} property, ${age} years old${leaks ? ", has leaked before" : ""}). I'd like a 360° assessment.`,
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="whatsapp-btn shrink-0 rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-membrane transition-colors hover:bg-halo hover:text-ink"
              >
                Confirm my real risk →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
