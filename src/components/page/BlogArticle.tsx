import Link from "next/link";
import { PageHero } from "@/components/page/PageHero";
import { JsonLd } from "@/components/page/JsonLd";
import { FinalCta } from "@/components/home/FinalCta";
import { BlogImage } from "@/components/page/BlogImage";
import { resources, type Resource } from "@/lib/content/resources";
import { blogArchivePath, blogPostPath, formatBlogDate } from "@/lib/blogs";
import { getService, site } from "@/lib/site";
import { pageGraph } from "@/lib/schema";

export function BlogArticle({ guide }: { guide: Resource }) {
  const { slug, title, description, publishedAt, image } = guide;
  const path = blogPostPath(slug);
  const candidates = resources.filter((resource) => resource.slug !== slug);
  const related = [
    ...candidates.filter((resource) => resource.service === guide.service),
    ...candidates.filter((resource) => resource.service !== guide.service),
  ].slice(0, 3);
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Blogs", path: blogArchivePath(1) },
    { name: title, path },
  ];
  const service = getService(guide.service);
  const url = `${site.url}${path}`;

  return (
    <>
      <JsonLd data={pageGraph({
        path,
        name: title,
        description,
        crumbs,
        nodes: [{
          "@type": "Article",
          "@id": `${url}#article`,
          headline: title,
          description,
          ...(publishedAt ? { datePublished: publishedAt } : {}),
          mainEntityOfPage: { "@id": `${url}#webpage` },
          author: { "@id": `${site.url}/#organization` },
          publisher: { "@id": `${site.url}/#organization` },
          inLanguage: "en-AE",
          image: {
            "@type": "ImageObject",
            url: `${site.url}${image.src}`,
            width: image.width,
            height: image.height,
            caption: image.alt,
          },
        }],
      })} />
      <main id="main" className="bg-membrane text-ink">
        <PageHero crumbs={crumbs} title={title} lede={description} size="sm" eyebrow="Property protection guide" />
        <div className="container-x mt-8 md:mt-12">
          {publishedAt && (
            <time dateTime={publishedAt} className="mb-4 block text-sm text-ink/65">
              Published {formatBlogDate(publishedAt)}
            </time>
          )}
          <figure>
            <BlogImage image={image} sizes="(min-width: 1440px) 1320px, 92vw" priority className="aspect-[3/2] w-full rounded-[22px] object-cover md:rounded-[32px]" />
            {guide.imageCaption && <figcaption className="mt-3 text-[0.75rem] text-ink/55">{guide.imageCaption}</figcaption>}
          </figure>
        </div>
        <div className="container-x grid gap-10 py-16 md:py-24 lg:grid-cols-12">
          <article className="space-y-10 lg:col-span-8">
            {guide.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-display type-h3">{section.heading}</h2>
                {(typeof section.body === "string" ? [section.body] : section.body).map((paragraph, index) => (
                  <p key={index} className="mt-4 max-w-[70ch] text-[1.0625rem] leading-relaxed text-ink/75">
                    {typeof paragraph === "string" ? paragraph : paragraph.map((part) => (
                      typeof part === "string" ? part : (
                        <Link key={part.href} href={part.href} className="font-medium text-ink underline decoration-ink/40 underline-offset-4 hover:decoration-ink">
                          {part.label}
                        </Link>
                      )
                    ))}
                  </p>
                ))}
              </section>
            ))}
          </article>
          <aside className="self-start rounded-[22px] bg-bone p-6 lg:sticky lg:top-28 lg:col-span-4">
            <h2 className="type-h3">Discuss your property</h2>
            <p className="mt-4 leading-relaxed text-ink/70">Send photographs, location and a description of the problem so we can discuss the right next step.</p>
            {service && (
              <Link href={`/services/${service.slug}/`} className="mt-6 inline-block py-2 font-medium underline underline-offset-4">
                {service.name}: scope and quotations
              </Link>
            )}
            {guide.relatedLinks?.map((link) => (
              <Link key={link.href} href={link.href} className="mt-3 block py-2 underline underline-offset-4">{link.label}</Link>
            ))}
            <Link href="/contact/" className="mt-3 block py-2 underline underline-offset-4">Contact Halo Shield</Link>
          </aside>
        </div>
        <nav aria-label="More guides" className="container-x pb-16">
          {related.length > 0 && (
            <>
              <h2 className="type-h3">More planning guides</h2>
              <ul className="mt-5 space-y-3">
                {related.map((resource) => (
                  <li key={resource.slug}>
                    <Link className="inline-block py-2 underline underline-offset-4" href={blogPostPath(resource.slug)}>{resource.title}</Link>
                  </li>
                ))}
              </ul>
            </>
          )}
          <Link href={`${blogArchivePath(1)}#blog-archive`} className="mt-4 inline-block py-2 font-medium underline underline-offset-4">Browse all guides</Link>
        </nav>
        <FinalCta context={title} />
      </main>
    </>
  );
}
