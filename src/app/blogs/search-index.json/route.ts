import type { BlogSearchEntry } from "@/lib/blogs";
import { resources } from "@/lib/content/resources";
import { getService } from "@/lib/site";

export const dynamic = "force-static";

export function GET() {
  return Response.json(resources.map((guide): BlogSearchEntry => ({
    slug: guide.slug,
    title: guide.title,
    description: guide.description,
    image: guide.image,
    publishedAt: guide.publishedAt,
    topics: [
      guide.slug.replaceAll("-", " "),
      getService(guide.service)?.name,
      ...guide.sections.map(({ heading }) => heading),
      ...(guide.keywords ?? []),
    ].filter(Boolean).join(" "),
  })));
}
