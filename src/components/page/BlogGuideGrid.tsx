import Link from "next/link";
import { blogPostPath, formatBlogDate, type BlogGuideCard } from "@/lib/blogs";
import { BlogImage } from "./BlogImage";

export function BlogGuideGrid({ guides }: { guides: readonly BlogGuideCard[] }) {
  return (
    <div className="mt-5 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {guides.map((guide) => {
        const href = blogPostPath(guide.slug);

        return (
          <article key={guide.slug} className="group flex flex-col overflow-hidden rounded-[22px] bg-bone">
            <Link href={href} tabIndex={-1} aria-hidden="true" className="block overflow-hidden" prefetch={false}>
              <BlogImage
                image={guide.image}
                sizes="(min-width: 1024px) 31vw, (min-width: 768px) 46vw, 92vw"
                className="aspect-[3/2] w-full object-cover transition-transform duration-700 motion-safe:group-hover:scale-[1.03]"
              />
            </Link>
            <div className="flex grow flex-col p-6 md:p-8">
              {guide.publishedAt && (
                <time dateTime={guide.publishedAt} className="mb-3 text-sm text-ink/65">
                  Published {formatBlogDate(guide.publishedAt)}
                </time>
              )}
              <h3 className="text-display type-h3">
                <Link href={href} className="hover:underline" prefetch={false}>{guide.title}</Link>
              </h3>
              <p className="mt-4 grow text-[0.9375rem] leading-relaxed text-ink/70">{guide.description}</p>
              <Link href={href} className="mt-6 self-start py-2 font-medium underline underline-offset-4" aria-label={`Read guide — ${guide.title}`} prefetch={false}>
                Read guide
              </Link>
            </div>
          </article>
        );
      })}
    </div>
  );
}
