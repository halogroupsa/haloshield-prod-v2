import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/page/PageHero";
import { SectionHead } from "@/components/page/SectionHead";
import { JsonLd } from "@/components/page/JsonLd";
import { FaqList } from "@/components/page/FaqList";
import { FaqAside } from "@/components/page/FaqAside";
import { ProcessStrip, ProjectRail, ServiceTile } from "@/components/page/blocks";
import { FinalCta } from "@/components/home/FinalCta";
import { ArrowIcon } from "@/components/ui/Button";
import { getService, industries } from "@/lib/site";
import { getIndustry, industryPages } from "@/lib/content/industries";
import { faqNode, pageGraph, type Crumb } from "@/lib/schema";
import { imageSrc } from "@/lib/image-src";
import { pageMeta } from "@/lib/seo";
import { audiencePages, getAudience } from "@/lib/content/audiences";
import { AudiencePage } from "@/components/page/AudiencePage";

export const dynamicParams = false;

export function generateStaticParams() {
  return [...industryPages, ...audiencePages].map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: PageProps<"/industries/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const audience = getAudience(slug);
  if (audience) return pageMeta({ title: audience.title, description: audience.description, path: `/industries/${slug}/`, image: imageSrc(audience.image, 1600), imageAlt: audience.title });
  const ind = getIndustry(slug);
  if (!ind) return {};
  return pageMeta({ title: ind.title, description: ind.description, path: `/industries/${slug}/`, image: imageSrc(ind.image, 1600), imageAlt: ind.imageAlt });
}

export default async function IndustryPage({ params }: PageProps<"/industries/[slug]">) {
  const { slug } = await params;
  const audience = getAudience(slug);
  if (audience) return <AudiencePage page={audience} />;
  const ind = getIndustry(slug);
  if (!ind) notFound();

  const path = `/industries/${slug}/`;
  const crumbs: Crumb[] = [
    { name: "Home", path: "/" },
    { name: "Industries", path: "/industries/" },
    { name: ind.name, path },
  ];
  const list = ind.services.map(getService).filter((x): x is NonNullable<typeof x> => Boolean(x));
  const others = industryPages.filter((i) => i.slug !== slug);

  return (
    <>
      <JsonLd data={pageGraph({ path, name: ind.title, description: ind.description, crumbs, nodes: [faqNode(path, ind.faqs)] })} />
      <main id="main" className="bg-membrane text-ink">
        <PageHero
          crumbs={crumbs}
          eyebrow={`${ind.name} · Dubai & UAE`}
          title={ind.h1}
          lede={ind.lede}
          image={ind.image}
          imageAlt={ind.imageAlt}
          chips={[...industries[ind.name]].slice(0, 3)}
          whatsapp={`Hi Halo Shield, I'd like to discuss a ${ind.name.toLowerCase()} project.`}
        />

        <section aria-labelledby="challenges" className="py-16 md:py-24">
          <div className="container-x">
            <SectionHead id="challenges" eyebrow="The brief" title={`What ${ind.name.toLowerCase()} clients need from us`} />
            <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {ind.challenges.map((c, i) => (
                <li key={c.t} className="rounded-[22px] bg-bone p-6" data-reveal style={{ ["--reveal-delay" as string]: `${i * 70}ms` }}>
                  <span className="font-mono text-[0.75rem] text-halo-ink">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-10 text-[1.0625rem] font-medium tracking-tight">{c.t}</h3>
                  <p className="mt-2 text-[0.875rem] leading-relaxed text-ink/65">{c.d}</p>
                </li>
              ))}
            </ul>
            <div className="mt-10 border-t border-ink/12 pt-6">
              <h3 className="text-eyebrow text-ink/60">Who we work with</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {industries[ind.name].map((x) => (
                  <li key={x} className="rounded-full bg-ink/[0.05] px-3.5 py-1.5 text-[0.8125rem] text-ink/75">
                    {x}
                  </li>
                ))}
              </ul>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {audiencePages.filter((a) => a.sector === ind.name).map((a) => <li key={a.slug}><Link href={`/industries/${a.slug}/`} className="inline-block py-2 text-[0.9375rem] underline underline-offset-4">{a.name}: project scope and planning</Link></li>)}
              </ul>
            </div>
          </div>
        </section>

        <section aria-labelledby="ind-services" className="bg-bone py-16 md:py-24">
          <div className="container-x">
            <SectionHead id="ind-services" eyebrow="Services" title={`Specified for ${ind.name.toLowerCase()} buildings`} />
            <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {list.map((s) => (
                <li key={s.slug} data-reveal>
                  <ServiceTile s={s} />
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section aria-labelledby="ind-method" className="py-16 md:py-24">
          <div className="container-x">
            <SectionHead id="ind-method" eyebrow="Method" title="How a project runs" />
            <div className="mt-10">
              <ProcessStrip />
            </div>
          </div>
        </section>

        <section aria-label="Projects" className="bg-bone py-16 md:py-24">
          <div className="container-x">
            <ProjectRail title={<h2 className="text-display type-h2">Recent projects</h2>} />
          </div>
        </section>

        <section aria-labelledby="ind-faq" className="py-16 md:py-24">
          <div className="container-x grid gap-10 lg:grid-cols-12">
            <div className="flex flex-col lg:col-span-4">
              <h2 id="ind-faq" className="text-display type-h2">
                Questions
              </h2>
              <ul className="mt-6 space-y-2 text-[0.875rem]">
                {others.map((o) => (
                  <li key={o.slug}>
                    <Link href={`/industries/${o.slug}/`} className="inline-flex items-center gap-2 font-semibold">
                      {o.name} <ArrowIcon size={11} />
                    </Link>
                  </li>
                ))}
              </ul>
              <FaqAside image="halo-shield-team-burj-khalifa-rooftop" alt="Halo Shield engineers on a Dubai rooftop" />
            </div>
            <div className="lg:col-span-8">
              <FaqList items={ind.faqs} name={`faq-${slug}`} />
            </div>
          </div>
        </section>

        <FinalCta context={`${ind.name} project`} />
      </main>
    </>
  );
}
