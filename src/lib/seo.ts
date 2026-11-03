import type { Metadata } from "next";
import { site } from "./site";

type PageMetaInput = {
  /** Page title without the brand — the root layout's template appends " | Halo Shield". */
  title: string;
  description: string;
  /** Path with leading and trailing slash, e.g. "/services/". */
  path: string;
  image?: string;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
};

/**
 * Per-page metadata. Child `openGraph`/`twitter` objects replace the parent's rather than merge,
 * so every field the cards need is set here — and each page gets its own canonical.
 */
export function pageMeta({ title, description, path, image = "/og.jpg", imageAlt, imageWidth = 1200, imageHeight = 630 }: PageMetaInput): Metadata {
  const full = `${title} | ${site.name}`;
  return {
    title,
    description,
    alternates: { canonical: path, languages: { "en-AE": path, "x-default": path } },
    openGraph: {
      type: "website",
      locale: "en_AE",
      siteName: site.name,
      url: path,
      title: full,
      description,
      images: [{ url: image, width: imageWidth, height: imageHeight, alt: imageAlt ?? full }],
    },
    twitter: { card: "summary_large_image", site: "@HaloShieldUAE", title: full, description, images: [image] },
  };
}
