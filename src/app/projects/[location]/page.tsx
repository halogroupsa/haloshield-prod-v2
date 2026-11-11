import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FinalCta } from "@/components/home/FinalCta";
import { CaseStudyFeatures } from "@/components/page/CaseStudyFeature";
import { JsonLd } from "@/components/page/JsonLd";
import { PageHero } from "@/components/page/PageHero";
import { SectionHead } from "@/components/page/SectionHead";
import { ArrowIcon } from "@/components/ui/Button";
import { getArea } from "@/lib/content/areas";
import {
  caseStudiesInLocation,
  caseStudyPath,
  getProjectLocation,
  projectLocationPath,
  projectLocations,
  projectLocationSlugs,
} from "@/lib/content/case-studies";
import { imageSrc } from "@/lib/image-src";
import { images } from "@/lib/images";
import { pageGraph, type Crumb } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return projectLocationSlugs.map((location) => ({ location }));
}

function locationPage(slug: string) {
  const location = getProjectLocation(slug);
  if (!location) notFound();

  const { name, areaSlug, description } = projectLocations[location];
  const projects = caseStudiesInLocation(location);
  const cover = projects[0].photos[0];
  const path = projectLocationPath(location);
  const title = `Property Protection Projects in ${name}`;

  return { name, areaSlug, description, projects, cover, path, title };
}

export async function generateMetadata({ params }: PageProps<"/projects/[location]">): Promise<Metadata> {
  const { location } = await params;
  const { title, description, path, cover } = locationPage(location);
  return pageMeta({
    title,
    description,
    path,
    image: imageSrc(cover.image),
    imageAlt: cover.caption,
    imageWidth: images[cover.image].w,
    imageHeight: images[cover.image].h,
  });
}

export default async function ProjectLocationPage({ params }: PageProps<"/projects/[location]">) {
  const { location } = await params;
  const { title, description, path, name, areaSlug, projects, cover } = locationPage(location);
  const area = getArea(areaSlug);
  const crumbs: Crumb[] = [
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects/" },
    { name, path },
  ];
  const listId = `${site.url}${path}#case-studies`;

  return (
    <>
      <JsonLd data={pageGraph({
        path,
        name: title,
        description,
        crumbs,
        page: {
          "@type": "CollectionPage",
          primaryImageOfPage: `${site.url}${imageSrc(cover.image)}`,
          mainEntity: { "@id": listId },
        },
        nodes: [{
          "@type": "ItemList",
          "@id": listId,
          itemListElement: projects.map((project, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: project.title,
            url: `${site.url}${caseStudyPath(project)}`,
          })),
        }],
      })} />
      <main id="main" className="bg-membrane text-ink">
        <PageHero
          size="sm"
          crumbs={crumbs}
          title={`Projects in ${name}`}
          lede={description}
          whatsapp={`Hi Halo Shield, I'd like an assessment for a property in ${name}.`}
        />

        <section aria-labelledby="case-studies" className="py-16 md:py-24">
          <div className="container-x">
            <SectionHead
              id="case-studies"
              className="[&_h2]:max-w-none"
              title={`Case studies in ${name}`}
              aside={area && (
                <Link href={`/${area.slug}/`} className="inline-flex items-center gap-2 font-semibold text-ink">
                  Waterproofing services in {area.name} <ArrowIcon size={12} />
                </Link>
              )}
            />
            <CaseStudyFeatures projects={projects} previewPhotos />
          </div>
        </section>

        <FinalCta context={`Projects in ${name}`} community={name} />
      </main>
    </>
  );
}
