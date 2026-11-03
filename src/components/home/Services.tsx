import Link from "next/link";
import { Img } from "@/components/ui/Img";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { services, type Service } from "@/lib/site";

export function Services() {
  const waterproofing = services.filter((s) => s.group === "waterproofing");
  const systems = services.filter((s) => s.group === "systems");

  return (
    <section
      id="services"
      aria-labelledby="services-title"
      className="relative bg-ink py-20 text-membrane md:py-28"
    >
      <div className="container-x">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <SectionLabel index="02" label="Services" />
            <h2 id="services-title" className="text-display mt-8 type-h2" data-reveal>
              Waterproofing services{" "}
              <span className="text-halo">across Dubai</span>
            </h2>
          </div>
          <p className="max-w-[44ch] leading-relaxed text-membrane/60 lg:col-span-4" data-reveal>
            From a single leaking bathroom in Dubai Marina to a 3,000 m² podium in Business Bay — every service starts
            with an engineer&apos;s inspection and ends with a seamless, warrantied system.
          </p>
        </div>

        <ServiceGroup
          id="home-waterproofing"
          title="Waterproofing"
          description="Protection for every part of your property, from roof to foundation."
          items={waterproofing}
          offset={0}
        />
        <ServiceGroup
          id="home-protection-systems"
          title="Protection systems"
          description="Specialist coatings, insulation and diagnostics for a better-protected building."
          items={systems}
          offset={waterproofing.length}
        />
      </div>
    </section>
  );
}

function ServiceGroup({
  id,
  title,
  description,
  items,
  offset,
}: {
  id: string;
  title: string;
  description: string;
  items: Service[];
  offset: number;
}) {
  // Finish desktop collections with complete pairs: 7 → 3 + 2 + 2; 8 → 3 + 3 + 2.
  const remainder = items.length % 3;
  const pairedCount = remainder === 1 && items.length >= 4 ? 4 : remainder;

  return (
    <div className="mt-12 md:mt-16" role="group" aria-labelledby={`${id}-title`}>
      <div className="mb-6 flex items-start justify-between gap-6 border-t border-membrane/15 pt-6" data-reveal>
        <div>
          <h3 id={`${id}-title`} className="text-display type-h3">{title}</h3>
          <p className="mt-2 max-w-[54ch] text-sm leading-relaxed text-membrane/60">{description}</p>
        </div>
        <span className="shrink-0 rounded-full border border-membrane/15 px-3 py-2 font-mono text-xs text-membrane/60">
          {String(items.length).padStart(2, "0")} services
        </span>
      </div>

      <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-6 lg:gap-6">
        {items.map((s, i) => {
          const paired = pairedCount > 0 && i >= items.length - pairedCount;
          // An odd collection starts with a landscape card on tablet, followed by complete pairs.
          const tabletLead = items.length % 2 === 1 && i === 0;
          return (
            <li
              key={s.slug}
              className={`min-w-0 ${tabletLead ? "sm:col-span-2" : ""} ${paired ? "lg:col-span-3" : "lg:col-span-2"}`}
              data-reveal
              style={{ ["--reveal-delay" as string]: `${(i % 3) * 60}ms` }}
            >
              <Link
                href={`/services/${s.slug}/`}
                aria-labelledby={`${id}-${s.slug}`}
                className={`group flex h-full flex-col overflow-hidden rounded-[20px] border border-membrane/12 bg-ink-2 transition-colors duration-300 hover:border-halo/60 hover:bg-ink-3 focus-visible:border-halo ${tabletLead ? "sm:flex-row" : ""} ${paired ? "lg:flex-row" : "lg:flex-col"}`}
              >
                <div className={`relative aspect-[16/9] shrink-0 overflow-hidden bg-ink-3 ${tabletLead ? "sm:aspect-auto sm:w-2/5 lg:aspect-[16/9] lg:w-full" : ""} ${paired ? "lg:aspect-auto lg:w-[38%]" : ""}`}>
                  <Img
                    name={s.image}
                    alt=""
                    sizes={paired
                      ? "(min-width: 1440px) 248px, (min-width: 1024px) 18vw, (min-width: 640px) 46vw, 92vw"
                      : tabletLead
                        ? "(min-width: 1440px) 427px, (min-width: 1024px) 30vw, (min-width: 640px) 38vw, 92vw"
                        : "(min-width: 1440px) 427px, (min-width: 1024px) 30vw, (min-width: 640px) 46vw, 92vw"}
                    className="absolute inset-0 size-full object-cover motion-safe:transition-transform motion-safe:duration-700 motion-safe:ease-out-expo motion-safe:group-hover:scale-105"
                  />
                  <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-ink/25 via-transparent to-ink/15" />
                  <span aria-hidden className="absolute left-4 top-4 grid size-9 place-items-center rounded-full border border-membrane/20 bg-ink/80 font-mono text-xs text-membrane">
                    {String(offset + i + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className={`flex min-w-0 flex-1 flex-col p-5 md:p-6 ${paired ? "lg:min-h-[18rem]" : ""} ${tabletLead ? "sm:min-h-[18rem] lg:min-h-0" : ""}`}>
                  <h4 id={`${id}-${s.slug}`} className="text-display text-[1.25rem] leading-tight tracking-[-0.02em] text-membrane transition-colors duration-300 group-hover:text-halo-soft group-focus-visible:text-halo-soft">
                    {s.name}
                  </h4>
                  <p className="mb-6 mt-3 text-[0.9375rem] leading-relaxed text-membrane/65">{s.short}</p>
                  <div className="mt-auto flex items-center justify-between gap-4 border-t border-membrane/10 pt-4">
                    <span className="text-sm font-medium text-membrane/80">Explore service</span>
                    <span aria-hidden className="grid size-10 shrink-0 place-items-center rounded-full border border-membrane/20 text-membrane transition-colors duration-300 group-hover:border-halo group-hover:bg-halo group-hover:text-ink group-focus-visible:border-halo group-focus-visible:bg-halo group-focus-visible:text-ink">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M3 13 13 3M3 3h10v10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
