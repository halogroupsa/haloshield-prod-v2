import { BlogArchive, blogArchiveMetadata } from "@/components/page/BlogArchive";

export const metadata = blogArchiveMetadata(1);

export default function BlogsPage() {
  return <BlogArchive page={1} />;
}
