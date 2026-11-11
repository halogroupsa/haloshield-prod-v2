import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CaseStudyFeatures } from "@/components/page/CaseStudyFeature";
import { PageHero } from "@/components/page/PageHero";
import { SectionHead } from "@/components/page/SectionHead";
import { ExpandingCards } from "@/components/page/ExpandingCards";
import { JsonLd } from "@/components/page/JsonLd";
import { FaqList } from "@/components/page/FaqList";
import { FaqAside } from "@/components/page/FaqAside";
import { AreaChips, LuxGuardTeaser, ProjectRail } from "@/components/page/blocks";
import { FinalCta } from "@/components/home/FinalCta";
import { Img } from "@/components/ui/Img";
import { ArrowIcon } from "@/components/ui/Button";
import { getService, projects, services, site } from "@/lib/site";
import { areas, getArea } from "@/lib/content/areas";
import { caseStudiesForArea, projectLocationPath } from "@/lib/content/case-studies";
import { faqNode, pageGraph, serviceNode, type Crumb } from "@/lib/schema";
import { imageSrc } from "@/lib/image-src";
import { pageMeta } from "@/lib/seo";

export const dynamicParams = false;

const listJoin = (xs: string[]) => (xs.length < 2 ? xs.join("") : `${xs.slice(0, -1).join(", ")} and ${xs[xs.length - 1]}`);

export function generateStaticParams() {
  return areas.map((a) => ({ slug: a.slug }));
}

const copyFor = (a: NonNullable<ReturnType<typeof getArea>>) => {
  const where = a.kind === "community" ? `${a.name}, Dubai` : a.name;
  return {
    title: `Waterproofing in ${where} — Roofs, Villas & Pools`,
    description: `Waterproofing and property protection in ${where}: ${a.stock.toLowerCase()}. Engineer-led inspection, seamless LuxGuard™ systems, up to 25-year assurance.`.slice(0, 158),
  };
};

export async function generateMetadata({ params }: PageProps<"/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const a = getArea(slug);
  if (!a) return {};
  const { title, description } = copyFor(a);
  return pageMeta({ title, description, path: `/${slug}/`, image: imageSrc(a.image, 1600), imageAlt: `Waterproofing in ${a.name}` });
}

export default async function AreaPage({ params }: PageProps<"/[slug]">) {
  const { slug } = await params;
  const a = getArea(slug);
  if (!a) notFound();

  const path = `/${slug}/`;
  const { title, description } = copyFor(a);
  const crumbs: Crumb[] = [
    { name: "Home", path: "/" },
    { name: a.name, path },
  ];
  const focus = a.services.map(getService).filter((x): x is NonNullable<typeof x> => Boolean(x));
  const local = projects.filter((p) => p.location === a.name);
  const localCaseStudies = caseStudiesForArea(slug);
  const projectLocations = [...new Set(localCaseStudies.map((project) => project.location))];
  const projectIndex = projectLocations.length === 1 ? projectLocationPath(projectLocations[0]) : "/projects/";
  const where = a.kind === "community" ? `${a.name}, Dubai` : a.name;
  const place =
    a.kind === "community"
      ? { "@type": "Place", name: where, containedInPlace: { "@type": "City", name: "Dubai" } }
      : { "@type": "AdministrativeArea", name: a.name, containedInPlace: { "@type": "Country", name: "United Arab Emirates" } };
  const localFaqs = [
    {
      q: `Do you cover ${a.name}?`,
      a: `Yes. Our engineers and in-house crews work throughout ${a.name} from our base in Al Quoz, Dubai — with the same 360° inspection and LuxGuard™ systems on every project.`,
    },
    {
      q: `What does waterproofing cost in ${a.name}?`,
      a: "It depends on the area, the condition of the substrate, access and the system specified — which is why we inspect first. After the assessment you receive a fixed, itemised proposal with no surprises.",
    },
    {
      q: `What are the most common problems you find in ${a.name}?`,
      a: `Most often ${listJoin(a.risks.map((r) => r.t.charAt(0).toLowerCase() + r.t.slice(1)))}. ${a.risks.map((r) => r.d).join(" ")}`,
    },
  ];

  return (
    <>
      <JsonLd
        data={pageGraph({
          path,
          name: title,
          description,
          crumbs,
          nodes: [
            ...focus.map((s) => ({ ...serviceNode(s, s.short, place), "@id": `${site.url}${path}#${s.slug}` })),
            faqNode(path, localFaqs),
          ],
        })}
      />
      <main id="main" className="bg-membrane text-ink">
        <PageHero
          crumbs={crumbs}
          eyebrow={a.kind === "community" ? "Dubai community" : "United Arab Emirates"}
          title={
            <>
              Waterproofing in {a.name}
            </>
          }
          lede={a.intro}
          image={a.image}
          imageAlt={`Halo Shield property protection in ${where}`}
          chips={[a.stock]}
          whatsapp={`Hi Halo Shield, I'd like an assessment for my property in ${a.name}.`}
        />

        {/* What fails here */}
        <section aria-labelledby="risks" className="py-16 md:py-24">
          <div className="container-x grid gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-5">
              <p className="text-eyebrow flex items-center gap-3 text-ink/60" data-reveal>
                <span className="h-px w-6 bg-halo" />
                Local exposure
              </p>
              <h2 id="risks" className="text-display type-h2 mt-4 max-w-[18ch]" data-reveal>
                What we find on {a.name} properties
              </h2>
              <p className="mt-5 max-w-[42ch] text-[0.9375rem] leading-relaxed text-ink/65" data-reveal>
                Typical stock: {a.stock.toLowerCase()}. These are the failure points our engineers check first.
              </p>
              <div className="mt-8 overflow-hidden rounded-[22px] bg-bone-2" data-reveal="clip">
                <Img name={focus[0]?.image ?? a.image} alt={`${focus[0]?.name ?? "Waterproofing"} near ${a.name}`} sizes="(min-width: 1024px) 38vw, 92vw" className="aspect-[4/3] w-full object-cover" />
              </div>
            </div>
            <ol className="grid content-start gap-3 lg:col-span-7">
              {a.risks.map((r, i) => (
                <li key={r.t} className="grid gap-4 rounded-[22px] bg-bone p-6 sm:grid-cols-[3.5rem_1fr] md:p-8" data-reveal style={{ ["--reveal-delay" as string]: `${i * 80}ms` }}>
                  <span className="text-display type-h3 text-halo-deep">{String(i + 1).padStart(2, "0")}</span>
                  <span>
                    <h3 className="text-[1.125rem] font-medium tracking-tight">{r.t}</h3>
                    <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink/65">{r.d}</p>
                  </span>
                </li>
              ))}
              <li className="rounded-[22px] bg-ink p-6 text-membrane md:p-8" data-reveal>
                <p className="type-statement text-display">
                  We inspect the whole envelope — so the fix lasts longer than the next storm.
                </p>
              </li>
            </ol>
          </div>
        </section>

        {/* Services for this area */}
        <section aria-labelledby="area-services" className="pb-16 md:pb-24">
          <div className="container-x">
            <SectionHead
              id="area-services"
              eyebrow="Most requested"
              title={`Services in ${a.name}`}
              aside={
                <Link href="/services/" className="inline-flex items-center gap-2 font-semibold text-ink">
                  All {services.length} services <ArrowIcon size={12} />
                </Link>
              }
            />
            <div className="mt-10">
              <ExpandingCards
                items={focus.map((s) => ({
                  href: `/services/${s.slug}/`,
                  title: s.name,
                  sub: s.short,
                  image: s.image,
                  alt: `${s.name} in ${a.name}`,
                  chips: [a.name],
                }))}
              />
            </div>
          </div>
        </section>

        {localCaseStudies.length > 0 ? (
          <section aria-labelledby="local-projects" className="bg-bone py-16 md:py-24">
            <div className="container-x">
              <SectionHead
                id="local-projects"
                className="[&_h2]:max-w-none"
                title={`Case studies in ${a.name}`}
                aside={
                  <Link href={projectIndex} className="inline-flex items-center gap-2 font-semibold text-ink">
                    {projectLocations.length === 1 ? `All ${a.name} projects` : "Browse projects by location"}
                    <ArrowIcon size={12} />
                  </Link>
                }
              />
              <CaseStudyFeatures projects={localCaseStudies} />
            </div>
          </section>
        ) : (
          <section aria-label="Projects" className="bg-bone py-16 md:py-24">
            <div className="container-x">
              <ProjectRail
                list={local.length ? [...local, ...projects.filter((p) => p.location !== a.name)] : projects}
                title={
                  <>
                    <p className="text-eyebrow flex items-center gap-3 text-ink/60">
                      <span className="h-px w-6 bg-halo" />
                      {local.length ? `Including ${local.length} in ${a.name}` : "Selected work"}
                    </p>
                    <h2 className="text-display type-h2 mt-4">Recent projects</h2>
                  </>
                }
              />
            </div>
          </section>
        )}

        <div className="pt-2 md:pt-3">
          <LuxGuardTeaser />
        </div>

        <section aria-labelledby="area-faq" className="py-16 md:py-24">
          <div className="container-x grid gap-10 lg:grid-cols-12">
            <div className="flex flex-col lg:col-span-4">
              <h2 id="area-faq" className="text-display type-h2">
                {a.name} FAQ
              </h2>
              <FaqAside image={focus[1]?.image ?? a.image} alt={`${focus[1]?.name ?? "Waterproofing"} near ${a.name}`} />
            </div>
            <div className="lg:col-span-8">
              <FaqList items={localFaqs} name={`faq-${slug}`} />
            </div>
          </div>
          <div className="container-x mt-16 border-t border-ink/12 pt-8 md:mt-20">
            <h2 className="text-[1rem] font-medium">Other areas we cover</h2>
            <div className="mt-5">
              <AreaChips exclude={slug} />
            </div>
          </div>
        </section>

        <FinalCta context={`Property in ${a.name}`} community={a.kind === "community" ? a.name : undefined} />
      </main>
    </>
  );
}
