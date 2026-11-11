import type { MetadataRoute } from "next";
import { allowIndexing, services, site } from "@/lib/site";
import { serviceDetails } from "@/lib/content/services";
import { areas } from "@/lib/content/areas";
import {
  caseStudies,
  caseStudiesInLocation,
  caseStudyPath,
  projectLocationPath,
  projectLocationSlugs,
} from "@/lib/content/case-studies";
import { industryPages } from "@/lib/content/industries";
import { audiencePages } from "@/lib/content/audiences";
import { blogArchivePages, resources } from "@/lib/content/resources";
import { blogArchivePath, blogPostPath } from "@/lib/blogs";
import { imageSrc } from "@/lib/image-src";

export const dynamic = "force-static";

const updated = new Date("2026-10-24");
const projectsUpdated = new Date("2026-11-11");

/** Every exported page, generated from the same data the routes use, so it can't drift. */
export default function sitemap(): MetadataRoute.Sitemap {
  if (!allowIndexing) return [];

  const u = (path: string, priority: number, images?: string[], lastModified: Date | string | null = updated): MetadataRoute.Sitemap[number] => ({
    url: `${site.url}${path}`,
    ...(lastModified ? { lastModified } : null),
    changeFrequency: priority >= 0.8 ? "weekly" : "monthly",
    priority,
    ...(images ? { images: images.map((i) => `${site.url}${i}`) } : null),
  });

  return [
    u("/", 1, ["/og.jpg"]),
    u("/services/", 0.9),
    ...services.map((s) => u(`/services/${s.slug}/`, 0.9, [imageSrc(serviceDetails[s.slug].hero ?? s.image, 1600)])),
    u("/luxguard-360/", 0.8),
    u("/areas/", 0.8),
    ...areas.map((a) => u(`/${a.slug}/`, a.kind === "community" ? 0.8 : 0.7, [imageSrc(a.image, 1600)])),
    u("/projects/", 0.7, undefined, projectsUpdated),
    ...projectLocationSlugs.map((location) =>
      u(projectLocationPath(location), 0.7, caseStudiesInLocation(location).map((project) => imageSrc(project.photos[0].image)), projectsUpdated),
    ),
    ...caseStudies.map((project) =>
      u(caseStudyPath(project), 0.6, project.photos.map((photo) => imageSrc(photo.image)), projectsUpdated),
    ),
    u("/industries/", 0.6),
    ...industryPages.map((i) => u(`/industries/${i.slug}/`, 0.6)),
    ...audiencePages.map((i) => u(`/industries/${i.slug}/`, 0.6)),
    ...blogArchivePages.map((page) => u(blogArchivePath(page), 0.6, undefined, resources[0]?.publishedAt ?? null)),
    ...resources.map((r) => u(blogPostPath(r.slug), 0.6, [r.image.src], r.publishedAt ?? null)),
    u("/careers/", 0.4),
    u("/about/", 0.6),
    u("/contact/", 0.7),
    u("/faq/", 0.6),
    u("/privacy-policy/", 0.2),
    u("/terms-of-service/", 0.2),
  ];
}
