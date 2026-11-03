import type { Metadata } from "next";
import { PageHero } from "@/components/page/PageHero";
import { SectionHead } from "@/components/page/SectionHead";
import { JsonLd } from "@/components/page/JsonLd";
import { FaqList } from "@/components/page/FaqList";
import { FaqAside } from "@/components/page/FaqAside";
import { LuxGuard } from "@/components/home/LuxGuard";
import { Difference } from "@/components/home/Difference";
import { FinalCta } from "@/components/home/FinalCta";
import { Img } from "@/components/ui/Img";
import { faqs, luxguardLayers } from "@/lib/site";
import type { ImageName } from "@/lib/images.generated";
import { faqNode, pageGraph, type Crumb } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";

const title = "LuxGuard™ 360° — Seven-Layer Seamless Waterproofing System";
const description =
  "LuxGuard™ 360°: a seven-layer, joint-free protection system for Dubai — bonded, elastic to 300%, UV-stable, heat-reflective, backed for up to 25 years.";
const path = "/luxguard-360/";

export const metadata: Metadata = pageMeta({ title, description, path });

const crumbs: Crumb[] = [
  { name: "Home", path: "/" },
  { name: "LuxGuard™ 360°", path },
];

const layerImages: ImageName[] = [
  "luxguard-primer-bond-layer",
  "luxguard-moisture-barrier",
  "luxguard-flex-layer",
  "luxguard-uv-shield",
  "luxguard-heat-reflective-coating",
  "luxguard-anti-fungal-layer",
  "luxguard-top-seal-finish",
];

const lgFaqs = [faqs[4], faqs[6], faqs[7], faqs[3]];

export default function LuxGuardPage() {
  return (
    <>
      <JsonLd data={pageGraph({ path, name: title, description, crumbs, nodes: [faqNode(path, lgFaqs)] })} />
      <main id="main" className="bg-membrane text-ink">
        <PageHero
          crumbs={crumbs}
          eyebrow="The system"
          title={
            <>
              LuxGuard™ 360°. Seven layers, one seamless shield.
            </>
          }
          lede="Most waterproofing is a single product. LuxGuard™ is an engineered stack — bonded into the structure, built to move with it, and finished to take 50°C summers and foot traffic for decades."
          image="penthouse-rooftop-membrane-dubai"
          imageAlt="Seamless LuxGuard™ membrane on a Dubai Marina penthouse rooftop"
          chips={["Zero joints", "Up to 300% elongation", "Up to 25-yr assurance"]}
          whatsapp="Hi Halo Shield, I'd like a LuxGuard™ 360° consultation."
        />

        <div className="mt-2 md:mt-3">
          <LuxGuard />
        </div>

        <section aria-labelledby="layers" className="py-16 md:py-24">
          <div className="container-x">
            <SectionHead
              id="layers"
              eyebrow="Layer by layer"
              title="What each layer does"
              aside={<p className="max-w-[38ch]">Bottom to top. Each layer solves one failure mode — together they leave water nowhere to go.</p>}
            />
            <ol className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {luxguardLayers.map((l, i) => (
                <li key={l.name} className={`group flex flex-col overflow-hidden rounded-[22px] bg-bone ${i === 0 ? "lg:col-span-2 lg:row-span-2" : ""}`} data-reveal style={{ ["--reveal-delay" as string]: `${(i % 4) * 70}ms` }}>
                  <div className={`relative overflow-hidden bg-ink-3 ${i === 0 ? "aspect-[4/3] lg:aspect-auto lg:min-h-0 lg:flex-1" : "aspect-[4/3]"}`}>
                    <Img
                      name={layerImages[i]}
                      alt={`LuxGuard™ ${l.name} — ${l.tagline}`}
                      sizes={i === 0 ? "(min-width: 1024px) 46vw, 92vw" : "(min-width: 1024px) 23vw, (min-width: 640px) 46vw, 92vw"}
                      className="absolute inset-0 size-full object-cover transition-transform duration-[1.4s] ease-out-expo group-hover:scale-[1.04]"
                    />
                    <span className="absolute left-4 top-4 rounded-full bg-membrane/90 px-3 py-1 font-mono text-[0.6875rem] text-ink">
                      {String(i + 1).padStart(2, "0")} / 07
                    </span>
                  </div>
                  <div className="p-5 md:p-6">
                    <p className="text-[0.75rem] text-ink/55">{l.tagline}</p>
                    <h3 className="mt-1 text-[1.125rem] font-medium tracking-tight">{l.name}</h3>
                    <p className="mt-2 text-[0.875rem] leading-relaxed text-ink/65">{l.body}</p>
                    <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-ink px-3 py-1.5 text-[0.75rem] text-membrane">
                      <span className="size-1.5 rounded-full bg-halo" />
                      {l.stat}
                    </p>
                  </div>
                </li>
              ))}
              <li className="relative isolate flex min-h-[360px] flex-col justify-between gap-16 overflow-hidden rounded-[22px] bg-ink p-6 text-membrane sm:col-span-2 sm:min-h-[400px] md:p-8" data-reveal>
                <Img
                  name="rooftop-heat-reflective-coating-dubai"
                  alt="Finished seamless roof coating around upstands and service plinths"
                  sizes="(min-width: 640px) 46vw, 92vw"
                  className="absolute inset-0 -z-10 size-full object-cover"
                />
                <span aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-t from-ink via-ink/55 to-ink/15" />
                <p className="text-eyebrow self-start rounded-full bg-ink/65 px-3 py-2 text-membrane/90">The result</p>
                <p className="text-display type-statement max-w-[24ch]">
                  One continuous membrane — no seams, no laps, no weak point. Backed for up to 25 years.
                </p>
              </li>
            </ol>
          </div>
        </section>

        <Difference />

        <section aria-labelledby="lg-faq" className="py-16 md:py-24">
          <div className="container-x grid gap-10 lg:grid-cols-12">
            <div className="flex flex-col lg:col-span-4">
              <h2 id="lg-faq" className="text-display type-h2">
                About LuxGuard™
              </h2>
              <FaqAside image="private-villa-dome-seamless-membrane" alt="Seamless LuxGuard™ membrane on a private villa dome" />
            </div>
            <div className="lg:col-span-8">
              <FaqList items={lgFaqs} name="faq-luxguard" />
            </div>
          </div>
        </section>

        <FinalCta context="LuxGuard™ 360° consultation" />
      </main>
    </>
  );
}
