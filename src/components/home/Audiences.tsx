import Link from "next/link";
import { Img } from "@/components/ui/Img";
import { MARK_OUTLINE_PATH, MARK_VIEWBOX } from "@/components/ui/ShieldDefs";
import { industries } from "@/lib/site";
import type { ImageName } from "@/lib/images.generated";

const audiences: { title: string; body: string; image: ImageName; href: string; alt: string }[] = [
  {
    title: "Villa owners",
    body: "Palm Jumeirah, Emirates Hills, Al Barari, District One — discreet crews, minimal disruption.",
    image: "palm-jumeirah-villa-rooftop-waterproofing",
    href: "/industries/residential/",
    alt: "Halo Shield crew waterproofing a villa rooftop on Palm Jumeirah",
  },
  {
    title: "Developers & FMs",
    body: "Handover-ready envelopes, defect-liability remediation and planned maintenance for portfolios.",
    image: "halo-shield-team-burj-khalifa-rooftop",
    href: "/industries/commercial/",
    alt: "Halo Shield engineers on a Downtown Dubai rooftop beside the Burj Khalifa",
  },
  {
    title: "Commercial & industrial",
    body: "Warehouses, hotels, clinics and plants — fast-cure systems that keep you operating.",
    image: "under-roof-spray-foam-insulation",
    href: "/industries/industrial/",
    alt: "Spray-foam insulation and coating inside a Dubai industrial roof structure",
  },
];

export function Audiences() {
  return (
    <section aria-labelledby="audiences-title" className="relative bg-bone py-20 text-ink md:py-28">
      <div className="container-x">
        <h2 id="audiences-title" className="text-display mx-auto max-w-[18ch] text-center type-h2" data-reveal>
          Built for people with{" "}
          <span className="text-halo-deep">a lot</span> to protect
        </h2>

        <ul className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {audiences.map((a, i) => (
            <li key={a.title} data-reveal style={{ ["--reveal-delay" as string]: `${i * 120}ms` }} className={i === 1 ? "lg:translate-y-16" : ""}>
              <Link href={a.href} className="group block text-center">
                <div className="shield-mark-clip relative mx-auto aspect-[521/541] w-full max-w-[24rem] overflow-hidden bg-ink-3 transition-transform duration-700 ease-out-expo group-hover:-translate-y-2">
                  <Img
                    name={a.image}
                    alt={a.alt}
                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
                    className="absolute inset-0 size-full object-cover transition-transform duration-[1.4s] ease-out-expo group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-ink/45 transition-colors duration-500 group-hover:bg-ink/25" />
                  {/* Double border: centred strokes on the silhouette, clipped to their inner half,
                      stacked widest-first → outer line · gap · inner line, evenly offset all round. */}
                  <svg
                    viewBox={MARK_VIEWBOX}
                    aria-hidden="true"
                    fill="none"
                    className="pointer-events-none absolute inset-0 size-full text-ink transition-colors duration-500 group-hover:text-halo"
                  >
                    <path d={MARK_OUTLINE_PATH} stroke="currentColor" strokeWidth={14} vectorEffect="non-scaling-stroke" />
                    <path d={MARK_OUTLINE_PATH} stroke="var(--color-bone)" strokeWidth={10} vectorEffect="non-scaling-stroke" />
                    <path d={MARK_OUTLINE_PATH} stroke="currentColor" strokeWidth={4} vectorEffect="non-scaling-stroke" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center px-12 pb-[6%] text-membrane">
                    <h3 className="text-display type-h3">{a.title}</h3>
                    <span className="mt-5 rounded-full border border-membrane/70 px-4 py-2 font-mono text-[0.65rem] uppercase tracking-[0.16em] transition-colors group-hover:border-halo group-hover:bg-halo group-hover:text-ink">
                      Learn more
                    </span>
                  </div>
                </div>
                <p className="mx-auto mt-6 max-w-[32ch] text-[0.95rem] leading-relaxed text-ink/60">{a.body}</p>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-24 grid gap-8 border-t border-ink/15 pt-10 md:grid-cols-3 lg:mt-32">
          {Object.entries(industries).map(([group, list]) => (
            <div key={group}>
              <h3 className="text-eyebrow text-ink/65">{group}</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {list.map((x) => (
                  <li key={x} className="rounded-full bg-ink/[0.05] px-3.5 py-1.5 text-[0.85rem] text-ink/75">
                    {x}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
