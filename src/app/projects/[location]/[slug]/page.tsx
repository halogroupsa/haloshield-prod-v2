import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FinalCta } from "@/components/home/FinalCta";
import { CaseStudyFeature } from "@/components/page/CaseStudyFeature";
import { CaseStudyGrid } from "@/components/page/CaseStudyGrid";
import { JsonLd } from "@/components/page/JsonLd";
import { PageHero } from "@/components/page/PageHero";
import { SectionHead } from "@/components/page/SectionHead";
import { Img } from "@/components/ui/Img";
import { caseStudies, caseStudiesInLocation, caseStudyPath, projectLocationPath, projectLocations } from "@/lib/content/case-studies";
import { imageSrc } from "@/lib/image-src";
import { images } from "@/lib/images";
import { pageGraph, type Crumb } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map(({ location, slug }) => ({ location, slug }));
}

function getProject(location: string, slug: string) {
  const project = caseStudies.find((entry) => entry.location === location && entry.slug === slug);
  if (!project) notFound();
  return project;
}

export async function generateMetadata({ params }: PageProps<"/projects/[location]/[slug]">): Promise<Metadata> {
  const { location, slug } = await params;
  const project = getProject(location, slug);
  const cover = project.photos[0];
  return pageMeta({
    title: project.title,
    description: project.description,
    path: caseStudyPath(project),
    image: imageSrc(cover.image),
    imageAlt: cover.caption,
    imageWidth: images[cover.image].w,
    imageHeight: images[cover.image].h,
  });
}

export default async function CaseStudyPage({ params }: PageProps<"/projects/[location]/[slug]">) {
  const { location, slug } = await params;
  const project = getProject(location, slug);
  const { title, description, sections } = project;
  const place = projectLocations[project.location];
  const path = caseStudyPath(project);
  const locationPath = projectLocationPath(project.location);
  const [cover, ...gallery] = project.photos;
  const related = caseStudiesInLocation(project.location).filter((entry) => entry !== project);
  const crumbs: Crumb[] = [
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects/" },
    { name: place.name, path: locationPath },
    { name: title, path },
  ];
  const url = `${site.url}${path}`;
  const articleId = `${url}#case-study`;

  return (
    <>
      <JsonLd data={pageGraph({
        path,
        name: title,
        description,
        crumbs,
        page: {
          mainEntity: { "@id": articleId },
          primaryImageOfPage: `${site.url}${imageSrc(cover.image)}`,
        },
        nodes: [{
          "@type": "Article",
          "@id": articleId,
          headline: title,
          description,
          image: project.photos.map((photo) => ({
            "@type": "ImageObject",
            contentUrl: `${site.url}${imageSrc(photo.image)}`,
            caption: photo.caption,
          })),
          author: { "@id": `${site.url}/#organization` },
          publisher: { "@id": `${site.url}/#organization` },
          mainEntityOfPage: { "@id": `${url}#webpage` },
          contentLocation: { "@type": "Place", name: place.name },
          inLanguage: "en-AE",
        }],
      })} />
      <main id="main" className="bg-membrane text-ink">
        <article aria-label={title}>
          <PageHero
            size="sm"
            crumbs={crumbs}
            eyebrow="Case study"
            title={title}
            lede={description}
            whatsapp={`Hi Halo Shield, I'd like to discuss similar work for a property in ${place.name}.`}
          />

          <section aria-labelledby="project-overview" className="py-16 md:py-24">
            <div className="container-x">
              <CaseStudyFeature project={project} detail />
            </div>
          </section>

          <section aria-labelledby="work-in-detail" className="pb-16 md:pb-24">
            <div className="container-x">
              <SectionHead id="work-in-detail" title="Work in detail" />
              <div className="mt-8 grid gap-x-10 gap-y-6 md:grid-cols-2">
                {sections.map((section) => (
                  <div key={section.title} className="border-t border-ink/12 pt-4">
                    <h3 className="text-display type-h4">{section.title}</h3>
                    <p className="mt-2 max-w-[66ch] text-[0.9375rem] leading-relaxed text-ink/75">{section.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {gallery.length > 0 && (
            <section aria-labelledby="project-photos" className="bg-bone py-16 md:py-24">
              <div className="container-x">
                <SectionHead id="project-photos" title="Project photos" />
                <div className="mt-8 grid gap-x-4 gap-y-7 sm:grid-cols-2">
                  {gallery.map((photo, index) => (
                    <figure key={photo.image} id={`project-photo-${index + 2}`} className="scroll-mt-28">
                      <div className="overflow-hidden rounded-[22px] bg-bone-2">
                        <Img
                          name={photo.image}
                          alt={photo.caption}
                          sizes="(min-width: 640px) 47vw, 94vw"
                          className="aspect-[4/3] w-full object-contain"
                          placeholder={false}
                        />
                      </div>
                      <figcaption className="mt-3 text-sm leading-relaxed text-ink/75">{photo.caption}</figcaption>
                    </figure>
                  ))}
                </div>
              </div>
            </section>
          )}
        </article>

        {related.length > 0 && (
          <section aria-labelledby="related-projects" className="py-16 md:py-24">
            <div className="container-x">
              <SectionHead id="related-projects" title={`More projects in ${place.name}`} />
              <CaseStudyGrid projects={related} />
            </div>
          </section>
        )}

        <FinalCta context={title} community={place.name} />
      </main>
    </>
  );
}
