import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { allowIndexing, site } from "@/lib/site";
import { ShieldDefs } from "@/components/ui/ShieldDefs";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingContact } from "@/components/layout/FloatingContact";
import { GoogleTagManager } from "@/components/analytics/google-tag-manager";
import "./globals.css";

// Archivo variable, instanced to the ranges we use (wght 400–800, wdth 68–100) and subset to
// Latin + typographic punctuation: 90 KB → 53 KB. Regenerate with scripts/README notes.
const archivo = localFont({
  src: [{ path: "../fonts/archivo-trimmed.woff2", weight: "400 800", style: "normal" }],
  variable: "--font-archivo",
  display: "swap",
  declarations: [{ prop: "font-stretch", value: "68% 100%" }],
  fallback: ["system-ui", "Helvetica Neue", "Arial", "sans-serif"],
});

// Keep the existing Geist Mono Latin font local so offline builds are reproducible.
const mono = localFont({
  src: [{ path: "../fonts/geist-mono-latin.woff2", weight: "100 900", style: "normal" }],
  variable: "--font-geist-mono",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Waterproofing Company in Dubai | Halo Shield",
    template: "%s | Halo Shield",
  },
  description:
    "Engineering-led waterproofing in Dubai: roofs, villas, basements, pools and terraces. Seamless LuxGuard™ 360° systems, DM-approved engineers, 25-year assurance.",
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  category: "Construction",
  formatDetection: { telephone: true, email: true, address: true },
  // Canonical + hreflang are set per page (lib/seo.ts → pageMeta) — never inherit "/" site-wide.
  openGraph: {
    type: "website",
    locale: "en_AE",
    url: site.url,
    siteName: site.name,
    title: "Halo Shield — Dubai's engineering-led waterproofing company",
    description:
      "Seamless, joint-free LuxGuard™ 360° protection for Dubai villas, towers and podiums. DM-approved engineers. Up to 25-year assurance.",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Halo Shield engineers spraying a seamless polyurea roof membrane in Dubai" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@HaloShieldUAE",
    title: "Halo Shield — Waterproofing Company in Dubai",
    description: "Seamless LuxGuard™ 360° protection. DM-approved engineers. Up to 25-year assurance.",
    images: ["/og.jpg"],
  },
  robots: allowIndexing
    ? {
        index: true,
        follow: true,
        googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
      }
    : { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
  other: {
    "geo.region": "AE-DU",
    "geo.placename": "Dubai",
    "geo.position": `${site.geo.lat};${site.geo.lng}`,
    ICBM: `${site.geo.lat}, ${site.geo.lng}`,
  },
};

export const viewport: Viewport = {
  themeColor: "#0c0c0d",
  colorScheme: "dark light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en-AE"
      className={`${archivo.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <GoogleTagManager />
        {/* Flag JS before first paint so reveal animations never flash and no-JS users see everything. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-halo focus:px-5 focus:py-3 focus:text-ink"
        >
          Skip to content
        </a>
        <ShieldDefs />
        <SmoothScroll />
        <Header />
        {children}
        <Footer />
        <FloatingContact />
      </body>
    </html>
  );
}
