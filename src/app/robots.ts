import type { MetadataRoute } from "next";
import { allowIndexing, site } from "@/lib/site";

export const dynamic = "force-static";

/**
 * Staging/preview: crawling stays allowed so search engines can SEE the noindex
 * meta tag + X-Robots-Tag header — a Disallow would hide them and let bare URLs
 * still appear in results. No sitemap is advertised.
 */
export default function robots(): MetadataRoute.Robots {
  if (!allowIndexing) return { rules: [{ userAgent: "*", allow: "/" }] };
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
