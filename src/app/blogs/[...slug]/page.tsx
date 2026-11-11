import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogArchive, blogArchiveMetadata } from "@/components/page/BlogArchive";
import { BlogArticle } from "@/components/page/BlogArticle";
import { blogPostPath } from "@/lib/blogs";
import { blogArchivePages, blogPageCount, getResource, resources } from "@/lib/content/resources";
import { pageMeta } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return [
    ...resources.map(({ slug }) => ({ slug: [slug] })),
    ...blogArchivePages.slice(1).map((page) => ({ slug: ["page", String(page)] })),
  ];
}

function getBlogRoute(slug: string[]) {
  if (slug.length === 2 && slug[0] === "page" && /^[1-9]\d*$/.test(slug[1])) {
    const page = Number(slug[1]);
    if (page >= 2 && page <= blogPageCount) return { kind: "archive", page } as const;
  }
  if (slug.length === 1) {
    const guide = getResource(slug[0]);
    if (guide) return { kind: "article", guide } as const;
  }
  notFound();
}

export async function generateMetadata({ params }: PageProps<"/blogs/[...slug]">): Promise<Metadata> {
  const route = getBlogRoute((await params).slug);
  if (route.kind === "archive") return blogArchiveMetadata(route.page);
  const { title, description, slug, image } = route.guide;
  return pageMeta({
    title,
    description,
    path: blogPostPath(slug),
    image: image.src,
    imageAlt: image.alt,
    imageWidth: image.width,
    imageHeight: image.height,
  });
}

export default async function BlogPage({ params }: PageProps<"/blogs/[...slug]">) {
  const route = getBlogRoute((await params).slug);
  return route.kind === "archive" ? <BlogArchive page={route.page} /> : <BlogArticle guide={route.guide} />;
}
