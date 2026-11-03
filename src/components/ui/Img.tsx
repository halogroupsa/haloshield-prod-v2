import { images, type ImageName } from "@/lib/images.generated";

type Props = {
  name: ImageName;
  alt: string;
  sizes?: string;
  className?: string;
  priority?: boolean;
  /** Blur-up placeholder from the generated manifest. */
  placeholder?: boolean;
  style?: React.CSSProperties;
  draggable?: boolean;
};

/**
 * Responsive <img> backed by the pre-generated WebP set in /public/images.
 * Static-export friendly (no image server) and keeps explicit dimensions for zero CLS.
 */
export function Img({ name, alt, sizes = "100vw", className, priority, placeholder = true, style, draggable }: Props) {
  const meta = images[name];
  const widths = meta.widths as readonly number[];
  const largest = widths[widths.length - 1];
  const srcSet = widths.length ? widths.map((w) => `/images/${name}-${w}.webp ${w}w`).join(", ") : undefined;
  const src = widths.length ? `/images/${name}-${largest}.webp` : `/images/${name}.webp`;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      srcSet={srcSet}
      sizes={srcSet ? sizes : undefined}
      width={meta.w}
      height={meta.h}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      decoding={priority ? "sync" : "async"}
      fetchPriority={priority ? "high" : undefined}
      draggable={draggable}
      className={className}
      style={{
        ...(placeholder && meta.lqip
          ? { backgroundImage: `url(${meta.lqip})`, backgroundSize: "cover", backgroundPosition: "center" }
          : null),
        ...style,
      }}
    />
  );
}
