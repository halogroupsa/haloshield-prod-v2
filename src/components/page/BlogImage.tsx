import type { BlogImageData } from "@/lib/blog-images.generated";

export function BlogImage({ image, sizes, priority = false, className = "" }: { image: BlogImageData; sizes: string; priority?: boolean; className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={image.src}
      srcSet={image.srcSet}
      sizes={sizes}
      width={image.width}
      height={image.height}
      alt={image.alt}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={priority ? "high" : undefined}
      className={className}
    />
  );
}
