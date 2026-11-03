import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/page/PageHero";
import { JsonLd } from "@/components/page/JsonLd";
import { FinalCta } from "@/components/home/FinalCta";
import { BlogImage } from "@/components/page/BlogImage";
import { resources, getResource } from "@/lib/content/resources";
import { getService, site } from "@/lib/site";
import { pageMeta } from "@/lib/seo";
import { pageGraph } from "@/lib/schema";

export const dynamicParams = false;
export function generateStaticParams() { return resources.map((r) => ({ slug: r.slug })); }
export async function generateMetadata({ params }: PageProps<"/blogs/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const r = getResource(slug);
  return r ? pageMeta({ title: r.title, description: r.description, path: `/blogs/${slug}/`, image: r.image.src, imageAlt: r.image.alt, imageWidth: r.image.width, imageHeight: r.image.height }) : {};
}
export default async function BlogPage({ params }: PageProps<"/blogs/[slug]">) {
  const { slug } = await params;
  const r = getResource(slug);
  if (!r) notFound();
  const path = `/blogs/${slug}/`;
  const crumbs = [{ name: "Home", path: "/" }, { name: "Blogs", path: "/blogs/" }, { name: r.title, path }];
  const service = getService(r.service);
  return <><JsonLd data={pageGraph({ path, name: r.title, description: r.description, crumbs, nodes: [{ "@type": "Article", "@id": `${site.url}${path}#article`, headline: r.title, description: r.description, mainEntityOfPage: { "@id": `${site.url}${path}#webpage` }, author: { "@id": `${site.url}/#organization` }, publisher: { "@id": `${site.url}/#organization` }, inLanguage: "en-AE", image: { "@type": "ImageObject", url: `${site.url}${r.image.src}`, width: r.image.width, height: r.image.height, caption: r.image.alt } }] })} /><main id="main" className="bg-membrane text-ink">
    <PageHero crumbs={crumbs} title={r.title} lede={r.description} size="sm" eyebrow="Property protection guide" />
    <figure className="container-x mt-8 md:mt-12">
      <BlogImage image={r.image} sizes="(min-width: 1440px) 1320px, 92vw" priority className="aspect-[3/2] w-full rounded-[22px] object-cover md:rounded-[32px]" />
      <figcaption className="mt-3 text-[0.75rem] text-ink/55">AI-generated illustration based on website photo references.</figcaption>
    </figure>
    <div className="container-x grid gap-10 py-16 md:py-24 lg:grid-cols-12">
      <article className="space-y-10 lg:col-span-8">{r.sections.map((s) => <section key={s.heading}><h2 className="text-display type-h3">{s.heading}</h2><p className="mt-4 max-w-[70ch] text-[1.0625rem] leading-relaxed text-ink/75">{s.body}</p></section>)}</article>
      <aside className="self-start rounded-[22px] bg-bone p-6 lg:sticky lg:top-28 lg:col-span-4"><h2 className="type-h3">Discuss your property</h2><p className="mt-4 leading-relaxed text-ink/70">Send photographs, location and a description of the problem so we can discuss the right next step.</p>{service && <Link href={`/services/${service.slug}/`} className="mt-6 inline-block py-2 font-medium underline underline-offset-4">{service.name}: scope and quotations</Link>}<Link href="/contact/" className="mt-3 block py-2 underline underline-offset-4">Contact Halo Shield</Link></aside>
    </div>
    <nav aria-label="More guides" className="container-x pb-16"><h2 className="type-h3">More planning guides</h2><ul className="mt-5 space-y-3">{resources.filter((x) => x.slug !== slug).map((x) => <li key={x.slug}><Link className="inline-block py-2 underline underline-offset-4" href={`/blogs/${x.slug}/`}>{x.title}</Link></li>)}</ul></nav>
    <FinalCta context={r.title} />
  </main></>;
}
