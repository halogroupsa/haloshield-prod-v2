import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page/PageHero";
import { SectionHead } from "@/components/page/SectionHead";
import { JsonLd } from "@/components/page/JsonLd";
import { FaqList } from "@/components/page/FaqList";
import { FaqAside } from "@/components/page/FaqAside";
import { LuxGuardTeaser, ProcessStrip, ServiceTile } from "@/components/page/blocks";
import { FinalCta } from "@/components/home/FinalCta";
import { ArrowIcon } from "@/components/ui/Button";
import { faqs, services, site } from "@/lib/site";
import { pageGraph, type Crumb } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";

const title = "Waterproofing Services in Dubai";
const description =
  "Roof, villa, basement, pool, terrace and bathroom waterproofing in Dubai — plus polyurea, epoxy floors, insulation, mold remediation and leak detection.";
const path = "/services/";

export const metadata: Metadata = pageMeta({ title, description, path });

const crumbs: Crumb[] = [
  { name: "Home", path: "/" },
  { name: "Services", path },
];

const groups = [
  {
    id: "waterproofing",
    title: "Waterproofing",
    note: "High-intent fixes for leaks and water ingress — roof to basement.",
    list: services.filter((s) => s.group === "waterproofing"),
  },
  {
    id: "systems",
    title: "Protection systems",
    note: "Coatings, floors, insulation and diagnostics that protect the whole asset.",
    list: services.filter((s) => s.group === "systems"),
  },
];

export default function ServicesHub() {
  return (
    <>
      <JsonLd
        data={pageGraph({
          path,
          name: title,
          description,
          crumbs,
          page: { "@type": ["WebPage", "CollectionPage"] },
          nodes: [
            {
              "@type": "ItemList",
              "@id": `${site.url}${path}#list`,
              itemListElement: services.map((s, i) => ({
                "@type": "ListItem",
                position: i + 1,
                url: `${site.url}/services/${s.slug}/`,
                name: s.name,
              })),
            },
          ],
        })}
      />
      <main id="main" className="bg-membrane text-ink">
        <PageHero
          size="md"
          crumbs={crumbs}
          eyebrow={`${services.length} services · one system`}
          title="Waterproofing & property protection services in Dubai"
          lede="Every service starts with the same thing: an engineer's inspection. What we specify afterwards depends on your structure — never on what we happen to have in the van."
          image="dubai-skyline-roof-coating"
          imageAlt="Halo Shield crew applying a roof coating with the Dubai skyline behind"
          chips={["DM-approved engineers", "Own crews", "Up to 25-yr assurance"]}
        />

        <nav aria-label="Service groups" className="container-x mt-8 flex flex-wrap gap-2">
          {groups.map((g) => (
            <a key={g.id} href={`#${g.id}`} className="inline-flex min-h-10 items-center gap-2 rounded-full border border-ink/15 px-4 text-[0.8125rem] transition-colors hover:border-ink hover:bg-ink hover:text-membrane">
              {g.title}
              <span className="text-ink/45">{String(g.list.length).padStart(2, "0")}</span>
            </a>
          ))}
        </nav>

        {groups.map((g, gi) => (
          <section key={g.id} id={g.id} aria-labelledby={`${g.id}-title`} className={gi === 0 ? "pb-12 pt-12 md:pb-16 md:pt-16" : "pb-16 md:pb-24"}>
            <div className="container-x">
              <SectionHead id={`${g.id}-title`} eyebrow={`0${gi + 1}`} title={g.title} aside={<p className="max-w-[36ch]">{g.note}</p>} />
              <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {g.list.map((s) => (
                  <li key={s.slug} data-reveal>
                    <ServiceTile s={s} index={services.indexOf(s)} />
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ))}

        <section aria-labelledby="unsure" className="pb-16 md:pb-24">
          <div className="container-x">
            <Link
              href="/services/leak-detection-thermal-inspection-dubai/"
              className="group grid gap-6 rounded-[22px] bg-bone p-6 md:grid-cols-12 md:items-center md:p-10"
            >
              <h2 id="unsure" className="text-display type-h3 md:col-span-7">
                Not sure which service you need? Start with the diagnosis.
              </h2>
              <p className="text-[0.9375rem] leading-relaxed text-ink/65 md:col-span-4">
                Thermal imaging and moisture mapping find the real source — so you only pay to fix what&apos;s actually wrong.
              </p>
              <span className="grid size-12 place-items-center justify-self-start rounded-full bg-ink text-membrane transition-transform duration-500 group-hover:-rotate-45 md:col-span-1 md:justify-self-end">
                <ArrowIcon />
              </span>
            </Link>
          </div>
        </section>

        <section aria-labelledby="method" className="bg-bone py-16 md:py-24">
          <div className="container-x">
            <SectionHead id="method" eyebrow="Method" title="Four steps, whatever the service" aside={<p className="max-w-[36ch]">The same engineering process sits behind a single bathroom and a 3,000 m² podium.</p>} />
            <div className="mt-10">
              <ProcessStrip />
            </div>
          </div>
        </section>

        <div className="pt-2 md:pt-3">
          <LuxGuardTeaser />
        </div>

        <section aria-labelledby="services-faq" className="py-16 md:py-24">
          <div className="container-x grid gap-10 lg:grid-cols-12">
            <div className="flex flex-col lg:col-span-4">
              <h2 id="services-faq" className="text-display type-h2">
                Before you book
              </h2>
              <Link href="/faq/" className="mt-5 inline-flex items-center gap-2 self-start text-[0.875rem] font-semibold">
                All questions <ArrowIcon size={12} />
              </Link>
              <FaqAside image="dubai-skyline-engineer-view" alt="A Halo Shield engineer assessing a Dubai rooftop" />
            </div>
            <div className="lg:col-span-8">
              <FaqList items={[faqs[5], faqs[7], faqs[6], faqs[10]]} name="faq-services" />
            </div>
          </div>
        </section>

        <FinalCta />
      </main>
    </>
  );
}
