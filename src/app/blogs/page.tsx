import Link from "next/link";
import { PageHero } from "@/components/page/PageHero";
import { JsonLd } from "@/components/page/JsonLd";
import { FinalCta } from "@/components/home/FinalCta";
import { BlogImage } from "@/components/page/BlogImage";
import { resources } from "@/lib/content/resources";
import { pageMeta } from "@/lib/seo";
import { pageGraph } from "@/lib/schema";

const title = "Waterproofing & Property Protection Guides Dubai";
const description = "Plan waterproofing, compare contractor quotations and understand inspection, mould treatment and coating specifications with Halo Shield's practical guides.";
const path = "/blogs/";
const crumbs = [{ name: "Home", path: "/" }, { name: "Blogs", path }];
export const metadata = pageMeta({ title, description, path });

export default function BlogsPage() {
  return <><JsonLd data={pageGraph({ path, name: title, description, crumbs, page: { "@type": ["WebPage", "CollectionPage"] } })} /><main id="main" className="bg-membrane text-ink">
    <PageHero crumbs={crumbs} title="Plan your property protection" lede="Practical guides for Dubai owners and facilities teams: understand the investigation, define the scope and compare proposals with confidence." size="sm" eyebrow="Blogs & guides" />
    <section aria-label="Property protection guides" className="py-16 md:py-24">
      <div className="container-x grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {resources.map((r, i) => (
          <article key={r.slug} className="group flex flex-col overflow-hidden rounded-[22px] bg-bone">
            <Link href={`/blogs/${r.slug}/`} tabIndex={-1} aria-hidden="true" className="block overflow-hidden">
              <BlogImage image={r.image} sizes="(min-width: 1024px) 31vw, (min-width: 768px) 46vw, 92vw" className="aspect-[3/2] w-full object-cover transition-transform duration-700 motion-safe:group-hover:scale-[1.03]" />
            </Link>
            <div className="flex grow flex-col p-6 md:p-8">
              <span className="font-mono text-[0.75rem] text-ink/50">{String(i + 1).padStart(2, "0")} · Planning guide</span>
              <h2 className="type-h3 mt-5"><Link href={`/blogs/${r.slug}/`} className="hover:underline">{r.title}</Link></h2>
              <p className="mt-4 grow text-[0.9375rem] leading-relaxed text-ink/70">{r.description}</p>
              <Link href={`/blogs/${r.slug}/`} className="mt-8 inline-block py-2 font-medium underline underline-offset-4">Read guide</Link>
            </div>
          </article>
        ))}
      </div>
    </section>
    <FinalCta context="Property protection advice" />
  </main></>;
}
