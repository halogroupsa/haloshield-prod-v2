import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page/PageHero";
import { SectionHead } from "@/components/page/SectionHead";
import { JsonLd } from "@/components/page/JsonLd";
import { StatsBand } from "@/components/page/blocks";
import { Process } from "@/components/home/Process";
import { TrustMarquee } from "@/components/home/TrustMarquee";
import { FinalCta } from "@/components/home/FinalCta";
import { Img } from "@/components/ui/Img";
import { ArrowIcon } from "@/components/ui/Button";
import { industryPages } from "@/lib/content/industries";
import { pageGraph, type Crumb } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";

const title = "About Halo Shield — Engineering-Led Waterproofing in Dubai";
const description =
  "Halo Shield is a Dubai property protection company built around engineering: DM-approved engineers, in-house crews and the LuxGuard™ 360° system.";
const path = "/about/";

export const metadata: Metadata = pageMeta({ title, description, path });

const crumbs: Crumb[] = [
  { name: "Home", path: "/" },
  { name: "About", path },
];

const principles = [
  { t: "Engineering before product", d: "We don't arrive with a membrane and look for a roof to put it on. Every project starts with structure, movement and exposure." },
  { t: "The whole envelope", d: "Water moves to the next weak point. We protect roofs, walls, joints, wet areas and basements as one system." },
  { t: "Seamless by design", d: "Joints and overlaps are where waterproofing fails, so our systems don't have them." },
  { t: "Our own crews", d: "The people who apply your system are trained, supervised and accountable to our engineers — not subcontracted." },
  { t: "Assurance that means something", d: "Up to 25 years of protection assurance covering performance, not just the product data sheet." },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={pageGraph({ path, name: title, description, crumbs, page: { "@type": ["WebPage", "AboutPage"] } })} />
      <main id="main" className="bg-membrane text-ink">
        <PageHero
          crumbs={crumbs}
          eyebrow="About Halo Shield"
          title={
            <>
              Engineering first. Protection always.
            </>
          }
          lede="Halo Shield exists because waterproofing in Dubai kept failing — on new villas, on expensive roofs, on the second and third attempt. We set out to fix the cause, not the stain."
          image="halo-shield-team-burj-khalifa-rooftop"
          imageAlt="Halo Shield engineers on a Downtown Dubai rooftop beside the Burj Khalifa"
          chips={["Al Quoz, Dubai", "DM-approved engineers", "In-house crews"]}
        />

        {/* Split intro — reference layout */}
        <section aria-labelledby="story" className="py-16 md:py-24">
          <div className="container-x grid gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-6">
              <h2 id="story" className="text-display type-h2 max-w-[18ch]" data-reveal>
                Your trusted partner in property protection
              </h2>
              <div className="mt-8 overflow-hidden rounded-[22px] bg-bone-2" data-reveal="clip">
                <Img name="villa-flat-roof-before-after-polyurea" alt="Halo Shield engineer replacing failed bitumen with seamless polyurea on a Dubai villa roof" sizes="(min-width: 1024px) 45vw, 92vw" className="aspect-[4/3] w-full object-cover" />
              </div>
            </div>
            <div className="flex flex-col lg:col-span-6">
              <div className="grid grid-cols-2 gap-3">
                <div className="overflow-hidden rounded-[22px] bg-bone-2" data-reveal="clip">
                  <Img name="thermal-imaging-villa-envelope" alt="Thermal imaging survey of a villa envelope" sizes="(min-width: 1024px) 22vw, 46vw" className="aspect-[4/5] w-full object-cover" />
                </div>
                <div className="overflow-hidden rounded-[22px] bg-bone-2" data-reveal="clip">
                  <Img name="arabian-ranches-dome-roof-protection" alt="Seamless membrane on a villa dome in Arabian Ranches" sizes="(min-width: 1024px) 22vw, 46vw" className="aspect-[4/5] w-full object-cover" />
                </div>
              </div>
              <h3 className="mt-8 text-[0.9375rem] font-medium">About us</h3>
              <div className="mt-3 grid gap-6 text-[0.9375rem] leading-relaxed text-ink/70 sm:grid-cols-2">
                <p data-reveal>
                  Halo Shield is an engineering-led waterproofing and property protection company based in Al Quoz, Dubai.
                  Our DM-approved engineers inspect, diagnose and specify; our own crews install; and the same team stands
                  behind the result.
                </p>
                <p data-reveal>
                  We work for villa owners, developers, facilities managers and industrial operators across all seven
                  emirates — from a single leaking bathroom to podium decks above occupied car parks.
                </p>
              </div>
              <p className="text-display type-statement mt-10 max-w-[26ch] lg:mt-auto lg:pt-10" data-reveal>
                Waterproofing treats symptoms. Halo Shield eliminates the cause.
              </p>
            </div>
          </div>
        </section>

        <section aria-labelledby="principles" className="bg-ink py-16 text-membrane md:py-24">
          <div className="container-x">
            <SectionHead id="principles" tone="light" eyebrow="How we work" title="Five principles we don't compromise on" />
            <ol className="mt-10 border-t border-membrane/12">
              {principles.map((p, i) => (
                <li key={p.t} className="grid gap-2 border-b border-membrane/12 py-6 md:grid-cols-12 md:gap-6 md:py-7" data-reveal style={{ ["--reveal-delay" as string]: `${i * 60}ms` }}>
                  <span className="font-mono text-[0.75rem] text-halo md:col-span-1">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="text-display type-h3 md:col-span-5">{p.t}</h3>
                  <p className="max-w-[52ch] text-[0.9375rem] leading-relaxed text-membrane/65 md:col-span-6">{p.d}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section aria-label="Track record" className="py-14 md:py-20">
          <div className="container-x">
            <StatsBand />
          </div>
        </section>

        <Process />

        <TrustMarquee />

        <section aria-labelledby="sectors" className="py-16 md:py-24">
          <div className="container-x">
            <SectionHead id="sectors" eyebrow="Industries" title="Who we protect" />
            <ul className="mt-10 grid gap-3 md:grid-cols-3">
              {industryPages.map((ind) => (
                <li key={ind.slug}>
                  <Link href={`/industries/${ind.slug}/`} className="group flex h-full flex-col justify-between gap-10 rounded-[22px] bg-bone p-6 transition-colors hover:bg-ink hover:text-membrane md:p-8">
                    <span className="text-display type-h3">{ind.name}</span>
                    <span className="flex items-end justify-between gap-4">
                      <span className="max-w-[34ch] text-[0.875rem] leading-relaxed opacity-70">{ind.lede}</span>
                      <ArrowIcon className="shrink-0 transition-transform duration-500 group-hover:-rotate-45" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section aria-labelledby="mission" className="bg-bone py-16 md:py-24">
          <div className="container-x grid gap-10 md:grid-cols-2">
            <div><h2 id="mission" className="text-display type-h2">Our mission</h2><p className="mt-5 leading-relaxed text-ink/70">Protect the condition, performance and long-term value of properties through solutions tailored to the building and its owners. We connect investigation, specification and installation so each stage responds to the same project brief.</p><h3 className="mt-8 type-h3">Our vision</h3><p className="mt-4 leading-relaxed text-ink/70">Make informed property protection part of how buildings are maintained and improved, with practical advice, clear scopes and continued attention to performance.</p></div>
            <div className="rounded-[22px] bg-membrane p-6 md:p-8"><h2 className="type-h3">Work with us</h2><p className="mt-4 leading-relaxed text-ink/70">Explore career areas in technical delivery, estimating and operations, or read our guides before planning a property protection project.</p><ul className="mt-6 space-y-4"><li><Link className="inline-block py-2 underline underline-offset-4" href="/careers/">Careers at Halo Shield</Link></li><li><Link className="inline-block py-2 underline underline-offset-4" href="/blogs/">Waterproofing and property protection guides</Link></li></ul></div>
          </div>
        </section>

        <FinalCta />
      </main>
    </>
  );
}
