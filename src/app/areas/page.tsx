import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page/PageHero";
import { SectionHead } from "@/components/page/SectionHead";
import { JsonLd } from "@/components/page/JsonLd";
import { FinalCta } from "@/components/home/FinalCta";
import { Img } from "@/components/ui/Img";
import { ArrowIcon } from "@/components/ui/Button";
import { site } from "@/lib/site";
import { areas } from "@/lib/content/areas";
import { pageGraph, type Crumb } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";

const title = "Areas We Cover — Waterproofing Across Dubai & the UAE";
const description =
  "Waterproofing across Dubai — Palm Jumeirah, Emirates Hills, Arabian Ranches, Dubai Hills, Downtown, Marina — plus Abu Dhabi, Sharjah and the Northern Emirates.";
const path = "/areas/";

export const metadata: Metadata = pageMeta({ title, description, path });

const crumbs: Crumb[] = [
  { name: "Home", path: "/" },
  { name: "Areas", path },
];

export default function AreasHub() {
  const dubai = areas.filter((a) => a.kind === "community");
  const uae = areas.filter((a) => a.kind === "emirate");
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
              itemListElement: areas.map((a, i) => ({ "@type": "ListItem", position: i + 1, url: `${site.url}/${a.slug}/`, name: a.name })),
            },
          ],
        })}
      />
      <main id="main" className="bg-membrane text-ink">
        <PageHero
          size="md"
          crumbs={crumbs}
          eyebrow={`${dubai.length} Dubai communities · ${uae.length} emirates`}
          title="Every Dubai community, covered"
          lede="Our engineers and in-house crews work from Al Quoz, Dubai. Each community has its own building stock and its own weak points — here's what we look for in yours."
          image="palm-jumeirah-aerial-dubai"
          imageAlt="Aerial view of Palm Jumeirah villas and the Dubai Marina skyline"
          chips={["Based in Al Quoz", "Own crews", "All seven emirates"]}
        />

        <section aria-labelledby="dubai" className="py-16 md:py-24">
          <div className="container-x">
            <SectionHead id="dubai" eyebrow="Dubai" title="Communities we protect" aside={<p className="max-w-[36ch]">Choose your community for local risks, services and projects.</p>} />
            <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {dubai.map((a, i) => (
                <li key={a.slug} data-reveal style={{ ["--reveal-delay" as string]: `${(i % 4) * 60}ms` }}>
                  <Link href={`/${a.slug}/`} className="group relative block aspect-[4/5] overflow-hidden rounded-[22px] bg-ink-3 text-membrane sm:aspect-[3/4]">
                    <Img
                      name={a.image}
                      alt={`Waterproofing in ${a.name}, Dubai`}
                      sizes="(min-width: 1024px) 23vw, (min-width: 640px) 46vw, 92vw"
                      className="absolute inset-0 size-full object-cover transition-transform duration-[1.4s] ease-out-expo group-hover:scale-[1.05]"
                    />
                    <span aria-hidden className="absolute inset-0 bg-linear-to-t from-ink/85 via-ink/10 to-transparent" />
                    <span className="absolute left-4 top-4 rounded-full bg-membrane/90 px-3 py-1 font-mono text-[0.6875rem] text-ink">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5">
                      <span>
                        <span className="block text-[1.125rem] font-medium tracking-tight">{a.name}</span>
                        <span className="mt-1 line-clamp-2 block text-[0.8125rem] text-membrane/70">{a.stock}</span>
                      </span>
                      <span aria-hidden className="grid size-9 shrink-0 place-items-center rounded-full bg-membrane/15 backdrop-blur transition-colors group-hover:bg-halo group-hover:text-ink">
                        <ArrowIcon size={12} />
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section aria-labelledby="uae" className="bg-bone py-16 md:py-24">
          <div className="container-x">
            <SectionHead id="uae" eyebrow="United Arab Emirates" title="Beyond Dubai" aside={<p className="max-w-[36ch]">The same inspection-led approach and LuxGuard™ systems in every emirate.</p>} />
            <ul className="mt-10 border-t border-ink/12">
              {uae.map((a) => (
                <li key={a.slug} className="border-b border-ink/12">
                  <Link href={`/${a.slug}/`} className="group grid items-center gap-2 py-5 md:grid-cols-12 md:gap-6 md:py-6">
                    <span className="text-display type-h3 transition-colors group-hover:text-halo-deep md:col-span-4">{a.name}</span>
                    <span className="text-[0.875rem] text-ink/60 md:col-span-7">{a.stock}</span>
                    <span aria-hidden className="hidden size-10 place-items-center justify-self-end rounded-full border border-ink/15 transition-all duration-500 group-hover:-rotate-45 group-hover:bg-ink group-hover:text-membrane md:grid">
                      <ArrowIcon size={12} />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <FinalCta />
      </main>
    </>
  );
}
