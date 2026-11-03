import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page/PageHero";
import { SectionHead } from "@/components/page/SectionHead";
import { JsonLd } from "@/components/page/JsonLd";
import { StatsBand } from "@/components/page/blocks";
import { FinalCta } from "@/components/home/FinalCta";
import { Img } from "@/components/ui/Img";
import { industries } from "@/lib/site";
import { industryPages } from "@/lib/content/industries";
import { pageGraph, type Crumb } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";
import { audiencePages } from "@/lib/content/audiences";

const title = "Industries — Residential, Commercial & Industrial Protection";
const description =
  "Waterproofing and protective coatings for Dubai homeowners, developers, hotels, offices, malls, warehouses, plants and marine facilities.";
const path = "/industries/";

export const metadata: Metadata = pageMeta({ title, description, path });

const crumbs: Crumb[] = [
  { name: "Home", path: "/" },
  { name: "Industries", path },
];

export default function IndustriesHub() {
  return (
    <>
      <JsonLd data={pageGraph({ path, name: title, description, crumbs, page: { "@type": ["WebPage", "CollectionPage"] } })} />
      <main id="main" className="bg-membrane text-ink">
        <PageHero
          size="md"
          crumbs={crumbs}
          eyebrow="Who we protect"
          title="Built for people with a lot to protect"
          lede="Villa owners, developers, facilities managers and plant operators all have different constraints. The engineering doesn't change — how we deliver it does."
          image="halo-shield-team-burj-khalifa-rooftop"
          imageAlt="Halo Shield engineers on a Downtown Dubai rooftop beside the Burj Khalifa"
        />

        <section aria-labelledby="sectors" className="py-16 md:py-24">
          <div className="container-x">
            <SectionHead id="sectors" eyebrow="Sectors" title="Three sectors, one standard" />
            <ul className="mt-10 grid gap-3 md:grid-cols-3">
              {industryPages.map((ind, i) => (
                <li key={ind.slug} data-reveal style={{ ["--reveal-delay" as string]: `${i * 90}ms` }}>
                  <Link href={`/industries/${ind.slug}/`} className="group block">
                    <div className="relative aspect-[4/5] overflow-hidden rounded-[22px] bg-ink-3">
                      <Img
                        name={ind.image}
                        alt={ind.imageAlt}
                        sizes="(min-width: 768px) 31vw, 92vw"
                        className="absolute inset-0 size-full object-cover transition-transform duration-[1.4s] ease-out-expo group-hover:scale-[1.05]"
                      />
                      <span aria-hidden className="absolute inset-0 bg-linear-to-t from-ink/80 to-transparent" />
                      <span className="absolute inset-x-0 bottom-0 p-6 text-membrane">
                        <span className="text-display type-h3 block">{ind.name}</span>
                        <span className="mt-2 block text-[0.8125rem] text-membrane/75">{industries[ind.name].slice(0, 4).join(" · ")}</span>
                      </span>
                    </div>
                    <p className="mt-4 max-w-[40ch] text-[0.9375rem] leading-relaxed text-ink/65">{ind.lede}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section aria-labelledby="all-industries" className="bg-bone py-16 md:py-24">
          <div className="container-x">
            <h2 id="all-industries" className="text-display type-h2">Find your property or project type</h2>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{audiencePages.map((a) => <li key={a.slug}><Link href={`/industries/${a.slug}/`} className="block rounded-2xl bg-membrane p-5 hover:underline"><span className="text-eyebrow text-ink/55">{a.sector}</span><span className="mt-2 block font-medium">{a.name}</span></Link></li>)}</ul>
          </div>
        </section>

        <section aria-label="Track record" className="bg-bone py-14 md:py-20">
          <div className="container-x">
            <StatsBand />
          </div>
        </section>

        <FinalCta />
      </main>
    </>
  );
}
