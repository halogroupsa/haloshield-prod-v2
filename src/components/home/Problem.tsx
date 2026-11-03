import { MovementTest } from "./MovementTest";
import { SectionLabel } from "@/components/ui/SectionLabel";

const stressors = [
  { n: "50°C", t: "Heat & UV", d: "Roofs expand and contract every single day. Membranes that can't move, crack." },
  { n: "75yr", t: "Storms", d: "April 2024 brought the UAE's heaviest rainfall in 75 years. Conventional systems were overwhelmed." },
  { n: "∞", t: "Joints", d: "Precast joints and interfaces never stop moving — each one is a future entry point." },
  { n: "2+", t: "Layers", d: "Combo membranes rely on overlaps. Overlaps separate. Water finds them." },
];

const failures = [
  "Apply generic membranes without structural analysis",
  "Treat the roof and ignore walls, joints and interfaces",
  "Use cheap materials and unskilled labour",
  "Offer warranties that protect the product — not your property",
];

export function Problem() {
  return (
    <section id="problem" aria-labelledby="problem-title" className="relative bg-bone py-20 text-ink md:py-28">
      <div className="container-x">
        <SectionLabel index="01" label="The problem" tone="dark" />

        <h2 id="problem-title" className="text-display mt-8 max-w-[19ch] type-h2" data-reveal>
          Why waterproofing keeps{" "}
          <span className="text-halo-deep">failing</span> in Dubai
        </h2>

        <div className="mt-14 grid gap-12 lg:mt-20 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <p className="type-lead max-w-[40ch] text-ink/70" data-reveal>
              Dubai&apos;s climate exposes the limits of conventional waterproofing — even on brand-new villas. The
              problem isn&apos;t the rain. It&apos;s <em className="font-semibold not-italic text-ink">movement</em>, and systems that
              were never designed for it.
            </p>

            <ul className="mt-10 divide-y divide-ink/10 border-y border-ink/10">
              {stressors.map((s, i) => (
                <li
                  key={s.t}
                  className="grid grid-cols-[5.5rem_1fr] items-baseline gap-4 py-5"
                  data-reveal
                  style={{ ["--reveal-delay" as string]: `${i * 80}ms` }}
                >
                  <span className="text-display text-[1.75rem] leading-none tracking-tight text-halo-deep">{s.n}</span>
                  <span>
                    <span className="block text-[0.95rem] font-semibold">{s.t}</span>
                    <span className="mt-1 block text-[0.92rem] leading-relaxed text-ink/60">{s.d}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-7" data-reveal>
            <MovementTest />
          </div>
        </div>

        {/* Why others fail */}
        <div className="mt-20 grid gap-8 md:mt-28 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5" data-reveal>
            <p className="text-eyebrow flex items-center gap-4 text-ink/60">
              <span className="h-px w-14 bg-ink/25" />
              The industry shortcut
            </p>
            <h3 className="text-display mt-8 max-w-[16ch] type-h2">
              Why most waterproofing companies get it <span className="text-halo-deep">wrong</span>
            </h3>
          </div>
          <ol className="border-y border-ink/15 lg:col-span-7" data-reveal-group>
            {failures.map((f, i) => (
              <li
                key={f}
                className="grid grid-cols-[2.5rem_1fr] items-baseline gap-4 border-ink/10 py-5 not-first:border-t md:py-6"
              >
                <span className="font-mono text-xs text-ink/60">0{i + 1}</span>
                <span className="type-h4 font-medium text-ink/70 md:text-[1.1875rem]">
                  <span
                    className="strike"
                    style={{ ["--reveal-delay" as string]: `${300 + i * 180}ms` }}
                  >
                    {f}
                  </span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
