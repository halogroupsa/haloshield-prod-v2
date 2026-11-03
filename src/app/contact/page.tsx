import type { Metadata } from "next";
import { PageHero } from "@/components/page/PageHero";
import { JsonLd } from "@/components/page/JsonLd";
import { FaqList } from "@/components/page/FaqList";
import { MapEmbed } from "@/components/page/MapEmbed";
import { FinalCta } from "@/components/home/FinalCta";
import { ArrowIcon } from "@/components/ui/Button";
import { faqs, site, telHref, whatsappHref } from "@/lib/site";
import { pageGraph, type Crumb } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";

const title = "Contact Halo Shield — Waterproofing Engineers in Dubai";
const description = `Call ${site.phone}, WhatsApp or visit us in Al Quoz, Dubai. Book a free 360° structural protection assessment with a Halo Shield engineer.`;
const path = "/contact/";

export const metadata: Metadata = pageMeta({ title, description, path });

const crumbs: Crumb[] = [
  { name: "Home", path: "/" },
  { name: "Contact", path },
];

const channels = [
  { k: "Call an engineer", v: site.phone, href: telHref, cls: "phone-btn", note: "Speak to the people who inspect" },
  { k: "WhatsApp", v: "Message us", href: whatsappHref(), cls: "whatsapp-btn", note: "Photos of the problem help", external: true },
  { k: "Email", v: site.email, href: `mailto:${site.email}`, cls: "", note: "Tenders, drawings & specs" },
  {
    k: "Visit",
    v: `${site.address.locality}, Dubai`,
    href: `https://www.google.com/maps/dir/?api=1&destination=${site.geo.lat},${site.geo.lng}`,
    cls: "",
    note: site.address.street,
    external: true,
  },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd data={pageGraph({ path, name: title, description, crumbs, page: { "@type": ["WebPage", "ContactPage"] } })} />
      <main id="main" className="bg-membrane text-ink">
        <PageHero
          size="md"
          crumbs={crumbs}
          eyebrow="Contact"
          title="Talk to an engineer, not a salesperson"
          lede="Tell us what you're seeing — a stain, a crack, a smell, a quote you're not sure about. We'll tell you honestly what it is and what it needs."
          image="dubai-skyline-engineer-view"
          imageAlt="Halo Shield engineer overlooking the Dubai skyline from a rooftop"
          actions={false}
        />

        <section aria-label="Ways to reach us" className="py-12 md:py-16">
          <ul className="container-x grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {channels.map((c) => (
              <li key={c.k}>
                <a
                  href={c.href}
                  {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : null)}
                  className={`${c.cls} group flex h-full flex-col justify-between gap-10 rounded-[22px] bg-bone p-6 transition-colors hover:bg-ink hover:text-membrane`}
                >
                  <span className="flex items-center justify-between text-[0.8125rem] opacity-65">
                    {c.k}
                    <ArrowIcon size={12} className="transition-transform duration-500 group-hover:-rotate-45" />
                  </span>
                  <span>
                    <span className="block break-words text-[1.125rem] font-medium tracking-tight">{c.v}</span>
                    <span className="mt-1 block text-[0.8125rem] opacity-60">{c.note}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="find-us" className="pb-16 md:pb-24">
          <div className="container-x">
            <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-4">
              <h2 id="find-us" className="text-display type-h2">
                Find us in Al Quoz
              </h2>
              <address className="text-[0.9375rem] not-italic leading-relaxed text-ink/65">
                {site.address.street}, {site.address.locality}, {site.address.city}
              </address>
            </div>

            <div className="mt-8 grid gap-3 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <MapEmbed className="lg:aspect-auto lg:h-full lg:min-h-[460px]" />
              </div>
              <div className="flex flex-col rounded-[22px] bg-bone p-6 md:p-8 lg:col-span-5">
                <h3 className="text-display type-h3">Before you call</h3>
                <div className="mt-5">
                  <FaqList items={[faqs[10], faqs[5], faqs[8]]} name="faq-contact" />
                </div>
                <p className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-8 text-[0.8125rem] text-ink/60">
                  Still unsure?
                  <a href={telHref} className="phone-btn inline-flex items-center gap-2 font-mono tracking-wider text-ink hover:text-halo-deep">
                    <span className="size-2 rounded-full bg-halo" />
                    {site.phone}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </section>

        <FinalCta title={<>Book your free assessment.</>} />
      </main>
    </>
  );
}
