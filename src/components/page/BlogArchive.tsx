import { Suspense } from "react";
import { PageHero } from "@/components/page/PageHero";
import { JsonLd } from "@/components/page/JsonLd";
import { FinalCta } from "@/components/home/FinalCta";
import { BlogGuideGrid } from "@/components/page/BlogGuideGrid";
import { BlogPagination } from "@/components/page/BlogPagination";
import { BlogSearch, BlogSearchForm } from "@/components/page/BlogSearch";
import { blogArchivePath, blogPostPath, BLOG_PAGE_SIZE } from "@/lib/blogs";
import { blogPageCount, getBlogArchivePage, resources } from "@/lib/content/resources";
import { pageMeta } from "@/lib/seo";
import { pageGraph } from "@/lib/schema";
import { site } from "@/lib/site";

function archiveCopy(page: number) {
  return {
    path: blogArchivePath(page),
    title: `Waterproofing & Property Protection Guides Dubai${page > 1 ? ` | Page ${page}` : ""}`,
    description: page === 1
      ? "Plan waterproofing, compare contractor quotations and understand inspection, mould treatment and coating specifications with Halo Shield's practical guides."
      : `Browse page ${page} of Halo Shield’s property protection guides, with practical advice on inspecting, planning and specifying work in Dubai.`,
  };
}

export function blogArchiveMetadata(page: number) {
  return pageMeta(archiveCopy(page));
}

export function BlogArchive({ page }: { page: number }) {
  const { title, description, path } = archiveCopy(page);
  const guides = getBlogArchivePage(page);
  const offset = (page - 1) * BLOG_PAGE_SIZE;
  const crumbs = [{ name: "Home", path: "/" }, { name: "Blogs", path: blogArchivePath(1) }];
  if (page > 1) crumbs.push({ name: `Page ${page}`, path });
  const listId = `${site.url}${path}#guides`;
  const archive = (
    <>
      {guides.length ? (
        <p className="mt-6 text-sm text-ink/65">
          {blogPageCount > 1
            ? `Showing ${offset + 1}–${offset + guides.length} of ${resources.length} guides`
            : `${guides.length} ${guides.length === 1 ? "guide" : "guides"}`}
        </p>
      ) : <p className="mt-6 text-ink/70">No guides have been published yet.</p>}
      <BlogGuideGrid guides={guides} />
      <BlogPagination
        page={page}
        totalPages={blogPageCount}
        hrefFor={(number) => `${blogArchivePath(number)}#blog-archive`}
        label="Blog archive pages"
      />
    </>
  );

  return (
    <>
      <JsonLd data={pageGraph({
        path,
        name: title,
        description,
        crumbs,
        page: { "@type": "CollectionPage", mainEntity: { "@id": listId } },
        nodes: [{
          "@type": "ItemList",
          "@id": listId,
          itemListElement: guides.map((guide, index) => ({
            "@type": "ListItem",
            position: offset + index + 1,
            name: guide.title,
            url: `${site.url}${blogPostPath(guide.slug)}`,
          })),
        }],
      })} />
      <main id="main" className="bg-membrane text-ink">
        <PageHero
          crumbs={crumbs}
          title={page === 1 ? "Plan your property protection" : `Property protection guides, page ${page}`}
          lede={page === 1
            ? "Practical guides for Dubai owners and facilities teams: understand the investigation, define the scope and compare proposals with confidence."
            : undefined}
          size="sm"
          eyebrow="Blogs & guides"
        />
        <section id="blog-archive" aria-labelledby="blog-archive-title" className="scroll-mt-16 py-14 md:py-20">
          <div className="container-x">
            <h2 id="blog-archive-title" className="text-display type-h2">Find a guide</h2>
            <Suspense fallback={<><BlogSearchForm path={path} />{archive}</>}>
              <BlogSearch path={path}>{archive}</BlogSearch>
            </Suspense>
          </div>
        </section>
        <FinalCta context="Property protection advice" />
      </main>
    </>
  );
}
