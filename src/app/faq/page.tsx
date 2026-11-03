import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page/PageHero";
import { JsonLd } from "@/components/page/JsonLd";
import { FaqList } from "@/components/page/FaqList";
import { FinalCta } from "@/components/home/FinalCta";
import { ArrowIcon } from "@/components/ui/Button";
import { faqs, services } from "@/lib/site";
import { serviceDetails } from "@/lib/content/services";
import { faqNode, pageGraph, type Crumb } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";

const title = "Waterproofing FAQ — Costs, Warranties & How It Works in Dubai";
const description =
  "Straight answers about waterproofing in Dubai: why it fails, what it costs, how long it takes, what the 25-year assurance covers and how to book an assessment.";
const path = "/faq/";

export const metadata: Metadata = pageMeta({ title, description, path });

const crumbs: Crumb[] = [
  { name: "Home", path: "/" },
  { name: "FAQ", path },
];

export default function FaqPage() {
  return (
    <>
      {/* Only the general questions are marked up here; service questions are marked up on their own pages. */}
      <JsonLd data={pageGraph({ path, name: title, description, crumbs, nodes: [faqNode(path, faqs)] })} />
      <main id="main" className="bg-membrane text-ink">
        <PageHero
          size="sm"
          crumbs={crumbs}
          eyebrow="FAQ"
          title="Straight answers"
          lede="For property owners who don't want risk. Can't find your question? Speak to an engineer directly."
        />

        <section aria-labelledby="general" className="py-16 md:py-24">
          <div className="container-x grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-28">
                <h2 id="general" className="text-display type-h2">
                  General
                </h2>
                <nav aria-label="FAQ by service" className="mt-8 hidden lg:block">
                  <p className="text-eyebrow text-ink/55">By service</p>
                  <ul className="mt-3 space-y-1 text-[0.875rem]">
                    {services.map((s) => (
                      <li key={s.slug}>
                        <a href={`#${s.slug}`} className="text-ink/70 hover:text-ink">
                          {s.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </div>
            <div className="lg:col-span-8">
              <FaqList items={faqs} name="faq-general" />

              {services.map((s) => (
                <div key={s.slug} id={s.slug} className="mt-16">
                  <div className="flex flex-wrap items-end justify-between gap-3">
                    <h2 className="text-display type-h3">{s.name}</h2>
                    <Link href={`/services/${s.slug}/`} className="inline-flex items-center gap-2 text-[0.8125rem] font-semibold">
                      Service details <ArrowIcon size={11} />
                    </Link>
                  </div>
                  <div className="mt-5">
                    <FaqList items={serviceDetails[s.slug].faqs} name={`faq-${s.slug}`} openFirst={false} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <FinalCta />
      </main>
    </>
  );
}
