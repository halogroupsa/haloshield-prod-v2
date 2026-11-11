import type { Metadata } from "next";
import Link from "next/link";
import { CaseStudyFeatures } from "@/components/page/CaseStudyFeature";
import { PageHero } from "@/components/page/PageHero";
import { JsonLd } from "@/components/page/JsonLd";
import { ProjectGrid } from "@/components/page/ProjectGrid";
import { SectionHead } from "@/components/page/SectionHead";
import { StatsBand } from "@/components/page/blocks";
import { TrustMarquee } from "@/components/home/TrustMarquee";
import { FinalCta } from "@/components/home/FinalCta";
import { projects, site } from "@/lib/site";
import { imageSrc } from "@/lib/image-src";
import { caseStudies, projectLocationPath, projectLocations, projectLocationSlugs } from "@/lib/content/case-studies";
import { pageGraph, type Crumb } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";

const title = "Waterproofing Projects in Dubai";
const description =
  "Recent waterproofing projects across Dubai — Palm Jumeirah villa roofs, Downtown podiums, Emirates Hills domes, Al Barari terraces and cool-roof retrofits.";
const path = "/projects/";

export const metadata: Metadata = pageMeta({ title, description, path });

const crumbs: Crumb[] = [
  { name: "Home", path: "/" },
  { name: "Projects", path },
];

export default function ProjectsPage() {
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
              "@id": `${site.url}${path}#project-locations`,
              itemListElement: projectLocationSlugs.map((location, index) => ({
                "@type": "ListItem",
                position: index + 1,
                url: `${site.url}${projectLocationPath(location)}`,
                name: projectLocations[location].name,
              })),
            },
            {
              "@type": "ImageGallery",
              "@id": `${site.url}${path}#gallery`,
              name: "Halo Shield projects in Dubai",
              image: projects.map((p) => ({
                "@type": "ImageObject",
                contentUrl: `${site.url}${imageSrc(p.image, 1600)}`,
                caption: `${p.title}, ${p.location} — ${p.spec}`,
                contentLocation: { "@type": "Place", name: `${p.location}, Dubai` },
              })),
            },
          ],
        })}
      />
      <main id="main" className="bg-membrane text-ink">
        <PageHero
          size="md"
          crumbs={crumbs}
          eyebrow="Selected work"
          title="Protecting Dubai's finest addresses"
          lede="Real projects, real crews, real membranes — from Palm Jumeirah villa roofs to Downtown podiums in the shadow of the Burj."
          image="burj-khalifa-view-podium-polyurea-spray"
          imageAlt="Halo Shield crew spraying polyurea on a Downtown Dubai podium with the Burj Khalifa behind"
          chips={["Villas", "Podiums", "Domes", "Terraces"]}
        />

        <section aria-labelledby="project-locations" className="py-16 md:py-24">
          <div className="container-x">
            <SectionHead id="project-locations" title="Projects by location" />
            <ul className="mt-8 flex flex-wrap gap-2">
              {projectLocationSlugs.map((location) => (
                <li key={location}>
                  <Link
                    href={projectLocationPath(location)}
                    className="inline-flex min-h-10 items-center rounded-full border border-ink/15 px-4 text-[0.8125rem] text-ink/80 transition-colors hover:border-ink hover:bg-ink hover:text-membrane"
                  >
                    {projectLocations[location].name}
                  </Link>
                </li>
              ))}
            </ul>
            <h3 className="text-display type-h3 mt-12">Featured case studies</h3>
            <CaseStudyFeatures projects={caseStudies.slice(0, 3)} />
          </div>
        </section>

        <section aria-labelledby="project-gallery" className="bg-bone py-12 md:py-16">
          <div className="container-x">
            <SectionHead id="project-gallery" title="Project gallery" className="mb-8" />
            <ProjectGrid />
          </div>
        </section>

        <section aria-label="Track record" className="py-16 md:py-24">
          <div className="container-x">
            <StatsBand />
          </div>
        </section>

        <TrustMarquee />
        <FinalCta title={<>Your property could be next.</>} />
      </main>
    </>
  );
}
