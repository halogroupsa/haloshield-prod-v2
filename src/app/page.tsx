import type { Metadata } from "next";
import { preload } from "react-dom";
import { Hero } from "@/components/home/Hero";
import { TrustMarquee } from "@/components/home/TrustMarquee";
import { Problem } from "@/components/home/Problem";
import { Statement } from "@/components/home/Statement";
import { Services } from "@/components/home/Services";
import { LuxGuard } from "@/components/home/LuxGuard";
import { Difference } from "@/components/home/Difference";
import { Process } from "@/components/home/Process";
import { Diagnostics } from "@/components/home/Diagnostics";
import { Projects } from "@/components/home/Projects";
import { RiskCalculator } from "@/components/home/RiskCalculator";
import { Areas } from "@/components/home/Areas";
import { Audiences } from "@/components/home/Audiences";
import { Faq } from "@/components/home/Faq";
import { FinalCta } from "@/components/home/FinalCta";
import { JsonLd } from "@/components/page/JsonLd";
import { homeJsonLd } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";

const meta = pageMeta({
  title: "Waterproofing Company in Dubai",
  description:
    "Engineering-led waterproofing in Dubai: roofs, villas, basements, pools and terraces. Seamless LuxGuard™ 360° systems, DM-approved engineers, 25-year assurance.",
  path: "/",
});

export const metadata: Metadata = {
  ...meta,
  title: { absolute: "Waterproofing Company in Dubai | Halo Shield" },
};

export default function Home() {
  // The hero poster is the LCP element — preload it on the home page only.
  preload("/video/hero-poster.jpg", {
    as: "image",
    imageSrcSet: "/video/hero-poster-800.jpg 800w, /video/hero-poster.jpg 1600w",
    imageSizes: "(min-width: 1024px) 36vw, 52vw",
    fetchPriority: "high",
  });

  return (
    <>
      <JsonLd data={homeJsonLd()} />
      <main id="main">
        <Hero />
        <TrustMarquee />
        <Problem />
        <Statement />
        <Services />
        <LuxGuard />
        <Difference />
        <Process />
        <Diagnostics />
        <Projects />
        <RiskCalculator />
        <Areas />
        <Audiences />
        <Faq />
        <FinalCta />
      </main>
    </>
  );
}
