import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/page/PageHero";
import { BuyerGuide } from "@/components/page/BuyerGuide";
import { SectionHead } from "@/components/page/SectionHead";
import { VillaRenovationReferral } from "@/components/page/VillaRenovationReferral";
import { FaqList } from "@/components/page/FaqList";
import { FaqAside } from "@/components/page/FaqAside";
import { ExpandingCards } from "@/components/page/ExpandingCards";
import { JsonLd } from "@/components/page/JsonLd";
import { AreaChips, ProjectRail } from "@/components/page/blocks";
import { Diagnostics } from "@/components/home/Diagnostics";
import { FinalCta } from "@/components/home/FinalCta";
import { Img } from "@/components/ui/Img";
import { Logo } from "@/components/ui/Logo";
import { ArrowIcon, Button } from "@/components/ui/Button";
import { getService, processSteps, services, site, telHref } from "@/lib/site";
import { serviceDetails } from "@/lib/content/services";
import { resources } from "@/lib/content/resources";
import { blogPostPath } from "@/lib/blogs";
import { faqNode, pageGraph, serviceNode, type Crumb } from "@/lib/schema";
import { imageSrc } from "@/lib/image-src";
import { pageMeta } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const s = getService(slug);
  const d = serviceDetails[slug];
  if (!s || !d) return {};
  return pageMeta({ title: d.title, description: d.description, path: `/services/${slug}/`, image: imageSrc(d.hero ?? s.image, 1600), imageAlt: d.h1 });
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const s = getService(slug);
  const d = serviceDetails[slug];
  if (!s || !d) notFound();

  const { renovationReferral } = d;
  const path = `/services/${slug}/`;
  const crumbs: Crumb[] = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services/" },
    { name: s.name, path },
  ];
  const chips = d.spec.map((x) => x.v).filter((v) => v.length <= 26).slice(0, 3);
  const related = d.related.map(getService).filter((x): x is NonNullable<typeof x> => Boolean(x));
  const lower = s.name.toLowerCase();
  const guides = resources.filter((guide) => guide.service === slug).slice(0, 3);
  const assessment = ["indoor-air-quality-dubai", "building-energy-assessment-dubai", "leak-detection-thermal-inspection-dubai"].includes(slug);
  const membrane = s.group === "waterproofing" || slug === "polyurea-coating-dubai";
  const deliverySteps = assessment ? [
    { title: "Define the assessment", body: "Discuss the building, concerns, available records and the information you need from the visit." },
    { title: "Agree access and investigation", body: "Confirm accessible areas, inspection methods and any specialist testing included." },
    { title: "Review the findings", body: "Identify the observed conditions, limitations and recommended next steps." },
    { title: "Plan any follow-up work", body: "Agree a separate scope for repairs, treatment, improvements or verification where required." },
  ] : processSteps;

  return (
    <>
      <JsonLd
        data={pageGraph({
          path,
          name: d.title,
          description: d.description,
          crumbs,
          nodes: [serviceNode(s, d.description), faqNode(path, d.faqs)],
        })}
      />
      <main id="main" className="bg-membrane text-ink">
        <PageHero
          crumbs={crumbs}
          eyebrow={s.group === "waterproofing" ? "Waterproofing · Dubai" : "Protection systems · Dubai"}
          title={d.h1}
          lede={d.lede}
          image={d.hero ?? s.image}
          imageAlt={`${s.name} by Halo Shield in Dubai`}
          chips={chips.length ? chips : ["Site assessment", "Defined scope", "Project-specific advice"]}
          whatsapp={`Hi Halo Shield, I'd like advice on ${lower} in Dubai.`}
        />

        {/* Overview — split layout from the reference */}
        <section aria-labelledby="overview" className="py-16 md:py-24">
          <div className="container-x grid gap-10 lg:grid-cols-12 lg:gap-12">
            <div className={renovationReferral ? "lg:col-span-6 lg:flex lg:flex-col" : "lg:col-span-6"}>
              <p className="text-eyebrow flex items-center gap-3 text-ink/60" data-reveal>
                <span className="h-px w-6 bg-halo" />
                Overview
              </p>
              <h2 id="overview" className="text-display type-h2 mt-4 max-w-[20ch]" data-reveal>
                {s.name}: scope, systems and delivery
              </h2>
              <div className={`mt-8 overflow-hidden rounded-[22px] bg-bone-2 ${renovationReferral ? "lg:relative lg:aspect-[4/3] lg:grow" : ""}`} data-reveal="clip">
                <Img
                  name={d.gallery[0]}
                  alt={`${s.name} project by Halo Shield, Dubai`}
                  sizes="(min-width: 1024px) 45vw, 92vw"
                  className={`aspect-[4/3] w-full object-cover ${renovationReferral ? "lg:absolute lg:inset-0 lg:h-full" : ""}`}
                />
              </div>
            </div>

            <div className="flex flex-col lg:col-span-6">
              <div className="grid grid-cols-2 gap-3">
                <div className="overflow-hidden rounded-[22px] bg-bone-2" data-reveal="clip">
                  <Img name={d.gallery[1]} alt={`${s.name} detail — Halo Shield Dubai`} sizes="(min-width: 1024px) 22vw, 46vw" className="aspect-[4/5] w-full object-cover" />
                </div>
                <Link
                  href={membrane ? "/luxguard-360/" : "/blogs/"}
                  className="group relative flex aspect-[4/5] flex-col justify-between overflow-hidden rounded-[22px] bg-ink p-5 text-membrane"
                  data-reveal
                >
                  <Img
                    name="luxguard-top-seal-finish"
                    alt=""
                    sizes="(min-width: 1024px) 22vw, 46vw"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/10" />
                  <Logo variant="mark" label="" className="relative w-10 text-halo" />
                  <span className="relative">
                    <span className="block text-[0.75rem] text-membrane/60">{membrane ? "Protection systems" : "Before you book"}</span>
                    <span className="mt-1 block text-[1.125rem] font-medium leading-tight tracking-tight">{membrane ? "Explore LuxGuard™ 360°" : "Practical property protection guides"}</span>
                    <span className="mt-4 inline-flex items-center gap-2 text-[0.8125rem] text-membrane/75 group-hover:text-halo">
                      {membrane ? "How it works" : "Read the guides"} <ArrowIcon size={11} />
                    </span>
                  </span>
                </Link>
              </div>
              <div className="mt-8 grid gap-6 text-[0.9375rem] leading-relaxed text-ink/70 sm:grid-cols-2">
                <p data-reveal>{d.overview[0]}</p>
                <p data-reveal>{d.overview[1]}</p>
              </div>
              {renovationReferral ? (
                <p className="mt-6 max-w-[66ch] text-[0.9375rem] leading-relaxed text-ink/75">
                  <VillaRenovationReferral {...renovationReferral} />
                </p>
              ) : (
                <p className="text-display type-statement mt-10 max-w-[28ch] lg:mt-auto lg:pt-10" data-reveal>
                  The right specification starts with the condition of your property and the work it needs.
                </p>
              )}
            </div>
          </div>
        </section>

        {slug === "leak-detection-thermal-inspection-dubai" && <Diagnostics />}

        {/* Warning signs */}
        <section aria-labelledby="signs" className="bg-bone py-16 md:py-24">
          <div className="container-x grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="text-eyebrow flex items-center gap-3 text-ink/60" data-reveal>
                <span className="h-px w-6 bg-halo" />
                Warning signs
              </p>
              <h2 id="signs" className="text-display type-h2 mt-4 max-w-[18ch]" data-reveal>
                When to call us about {lower}
              </h2>
              <p className="mt-5 max-w-[40ch] text-[0.9375rem] leading-relaxed text-ink/65" data-reveal>
                Share the signs you have noticed and when they occur. An assessment helps define the investigation and work required.
              </p>
              <div className="mt-7 flex flex-wrap gap-2.5">
                <Button href="#book" variant="dark" arrow>
                  Book an inspection
                </Button>
                <Button href={telHref} variant="outline-dark" className="phone-btn">
                  {site.phone}
                </Button>
              </div>
            </div>
            <ol className="border-t border-ink/12 lg:col-span-7">
              {d.signs.map((x, i) => (
                <li key={x} className="flex items-baseline gap-5 border-b border-ink/12 py-4 md:py-5" data-reveal style={{ ["--reveal-delay" as string]: `${i * 60}ms` }}>
                  <span className="font-mono text-[0.75rem] text-halo-ink">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-[1rem] leading-snug md:text-[1.125rem]">{x}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Applications + spec + method */}
        <section aria-labelledby="applications" className="py-16 md:py-24">
          <div className="container-x">
            <SectionHead
              id="applications"
              eyebrow="Applications"
              title="Where we apply it"
              aside={<p className="max-w-[38ch]">Residential, commercial and industrial — every system is detailed for the structure it protects.</p>}
            />
            <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {d.applications.map((a, i) => (
                <li key={a.t} className="rounded-[22px] bg-bone p-6" data-reveal style={{ ["--reveal-delay" as string]: `${i * 70}ms` }}>
                  <span className="font-mono text-[0.75rem] text-ink/50">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-10 text-[1.0625rem] font-medium tracking-tight">{a.t}</h3>
                  <p className="mt-2 text-[0.875rem] leading-relaxed text-ink/65">{a.d}</p>
                </li>
              ))}
            </ul>

            <div className="mt-3 grid gap-3 lg:grid-cols-12">
              <div className="rounded-[22px] bg-ink p-6 text-membrane md:p-8 lg:col-span-7">
                <h3 className="text-eyebrow text-membrane/60">Specification</h3>
                <dl className="mt-5 divide-y divide-membrane/10 border-y border-membrane/10">
                  {d.spec.map((row) => (
                    <div key={row.k} className="grid grid-cols-[7.5rem_1fr] gap-4 py-3.5 md:grid-cols-[10rem_1fr]">
                      <dt className="text-[0.8125rem] text-membrane/55">{row.k}</dt>
                      <dd className="text-[0.9375rem]">{row.v}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-5 text-[0.75rem] text-membrane/50">Final specification follows the site inspection.</p>
              </div>
              <div className="rounded-[22px] bg-bone p-6 md:p-8 lg:col-span-5">
                <h3 className="text-eyebrow text-ink/60">How it&apos;s delivered</h3>
                <ol className="mt-5 space-y-5">
                  {deliverySteps.map((p, i) => (
                    <li key={p.title} className="grid grid-cols-[2rem_1fr] gap-3">
                      <span className="font-mono text-[0.75rem] leading-6 text-halo-ink">{String(i + 1).padStart(2, "0")}</span>
                      <span>
                        <span className="block text-[0.9375rem] font-medium">{p.title}</span>
                        <span className="mt-1 block text-[0.8125rem] leading-relaxed text-ink/60">{p.body}</span>
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </section>

        <BuyerGuide slug={slug} />

        {guides.length > 0 && (
          <section aria-labelledby="related-guides" className="pb-16 md:pb-24">
            <div className="container-x">
              <SectionHead id="related-guides" title="Related guides" />
              <ul className="mt-8 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                {guides.map((guide) => (
                  <li key={guide.slug}>
                    <Link href={blogPostPath(guide.slug)} className="group flex h-full flex-col rounded-[22px] bg-bone p-6 hover:bg-bone-2 md:p-8">
                      <h3 className="text-display type-h4">{guide.title}</h3>
                      <p className="mt-3 grow text-[0.9375rem] leading-relaxed text-ink/70">{guide.description}</p>
                      <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold">
                        Read guide <ArrowIcon size={12} className="transition-transform group-hover:translate-x-1" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        <section aria-label="Recent projects" className="bg-bone py-16 md:py-24">
          <div className="container-x">
            <ProjectRail
              title={
                <>
                  <p className="text-eyebrow flex items-center gap-3 text-ink/60">
                    <span className="h-px w-6 bg-halo" />
                    Selected work
                  </p>
                  <h2 className="text-display type-h2 mt-4">Recent projects across Dubai</h2>
                </>
              }
            />
          </div>
        </section>

        {/* FAQ */}
        <section aria-labelledby="service-faq" className="py-16 md:py-24">
          <div className="container-x grid gap-10 lg:grid-cols-12">
            <div className="flex flex-col lg:col-span-4">
              <p className="text-eyebrow flex items-center gap-3 text-ink/60">
                <span className="h-px w-6 bg-halo" />
                FAQ
              </p>
              <h2 id="service-faq" className="text-display type-h2 mt-4">
                Questions about {lower}
              </h2>
              <p className="mt-5 max-w-[34ch] text-[0.9375rem] leading-relaxed text-ink/65">
                More answers on our <Link href="/faq/" className="underline underline-offset-4">FAQ page</Link>, or speak to an
                engineer directly.
              </p>
              <FaqAside image={d.hero ? s.image : d.gallery[1]} alt={`${s.name} by Halo Shield, Dubai`} />
            </div>
            <div className="lg:col-span-8">
              <FaqList items={d.faqs} name={`faq-${slug}`} />
            </div>
          </div>
        </section>

        {/* Related */}
        <section aria-labelledby="related" className="pb-16 md:pb-24">
          <div className="container-x">
            <SectionHead
              id="related"
              eyebrow="Related services"
              title="Often specified together"
              aside={
                <Link href="/services/" className="inline-flex items-center gap-2 font-semibold text-ink">
                  All {services.length} services <ArrowIcon size={12} />
                </Link>
              }
            />
            <div className="mt-10">
              <ExpandingCards
                initial={0}
                items={related.map((r) => ({
                  href: `/services/${r.slug}/`,
                  title: r.name,
                  sub: r.short,
                  image: r.image,
                  alt: `${r.name} in Dubai`,
                  chips: [r.group === "waterproofing" ? "Waterproofing" : "System", "Dubai"],
                }))}
              />
            </div>

            <div className="mt-16 border-t border-ink/12 pt-8 md:mt-20">
              <h2 className="text-[1rem] font-medium">{s.name} across Dubai &amp; the UAE</h2>
              <div className="mt-5">
                <AreaChips />
              </div>
            </div>
          </div>
        </section>

        <FinalCta context={s.name} />
      </main>
    </>
  );
}
