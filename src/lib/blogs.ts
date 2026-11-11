import type { BlogImageData } from "./blog-images.generated";

export type BlogGuideCard = {
  slug: string;
  title: string;
  description: string;
  image: BlogImageData;
  publishedAt?: string;
};

export type BlogSearchEntry = BlogGuideCard & { topics: string };

export const BLOG_PAGE_SIZE = 6;

export function blogArchivePath(page: number) {
  return page === 1 ? "/blogs/" : `/blogs/page/${page}/`;
}

export function blogPostPath(slug: string) {
  return `/blogs/${slug}/`;
}

const blogDate = new Intl.DateTimeFormat("en-GB", { dateStyle: "medium", timeZone: "UTC" });
const blogDateTime = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
  timeZone: "Asia/Dubai",
  timeZoneName: "short",
});

export function formatBlogDate(date: string) {
  return (date.length === 10 ? blogDate : blogDateTime).format(new Date(date));
}
