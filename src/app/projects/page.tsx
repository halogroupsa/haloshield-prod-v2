import type { Metadata } from "next";
import { PageHero } from "@/components/page/PageHero";
import { JsonLd } from "@/components/page/JsonLd";
import { ProjectGrid } from "@/components/page/ProjectGrid";
import { StatsBand } from "@/components/page/blocks";
import { TrustMarquee } from "@/components/home/TrustMarquee";
import { FinalCta } from "@/components/home/FinalCta";
import { projects, site } from "@/lib/site";
import { imageSrc } from "@/lib/image-src";
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

        <section aria-label="Project gallery" className="py-12 md:py-16">
          <div className="container-x">
            <ProjectGrid />
          </div>
        </section>

        <section aria-label="Track record" className="pb-16 md:pb-24">
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
