import Link from "next/link";
import { PageHero } from "./PageHero";
import { JsonLd } from "./JsonLd";
import { FaqList } from "./FaqList";
import { ServiceTile } from "./blocks";
import { FinalCta } from "@/components/home/FinalCta";
import { getService } from "@/lib/site";
import { audiencePages, type Audience } from "@/lib/content/audiences";
import { faqNode, pageGraph } from "@/lib/schema";

export function AudiencePage({ page }: { page: Audience }) {
  const path = `/industries/${page.slug}/`;
  const crumbs = [{ name: "Home", path: "/" }, { name: "Industries", path: "/industries/" }, { name: page.sector, path: `/industries/${page.sector.toLowerCase()}/` }, { name: page.name, path }];
  const faqs = [
    { q: `What information is needed for a ${page.name.toLowerCase()} project?`, a: page.brief },
    { q: "How will the work fit around the building's use?", a: page.delivery },
    { q: "What should the quotation and handover include?", a: "Ask for measured areas, preparation, products, access, excluded work, testing and reinstatement to be itemised. Agree any changes to cost or programme before additional work. Warranty coverage and maintenance requirements should be set out for the selected system." },
  ];
  const services = page.services.map(getService).filter((s): s is NonNullable<typeof s> => Boolean(s));
  return (
    <>
      <JsonLd data={pageGraph({ path, name: page.title, description: page.description, crumbs, nodes: [faqNode(path, faqs)] })} />
      <main id="main" className="bg-membrane text-ink">
        <PageHero crumbs={crumbs} eyebrow={`${page.sector} · Dubai`} title={page.title} lede={page.overview} image={page.image} imageAlt={`${page.sector} property protection by Halo Shield`} chips={["Site assessment", "Defined scope", "Planned delivery"]} whatsapp={`Hi Halo Shield, I'd like to discuss waterproofing and protection for ${page.name.toLowerCase()}.`} />
        <section className="py-16 md:py-24" aria-labelledby="audience-scope">
          <div className="container-x">
            <p className="text-eyebrow text-ink/60">Project scope</p>
            <h2 id="audience-scope" className="text-display type-h2 mt-4">Protection for the way your property is used</h2>
            <div className="mt-10 grid gap-3 md:grid-cols-3">{page.applications.map((a) => <div key={a.title} className="rounded-[22px] bg-bone p-6 md:p-8"><h3 className="type-h3">{a.title}</h3><p className="mt-4 leading-relaxed text-ink/70">{a.description}</p></div>)}</div>
            <div className="mt-10 grid gap-8 md:grid-cols-2">
              <div><h3 className="text-[1.125rem] font-medium">Planning the work</h3><p className="mt-3 leading-relaxed text-ink/70">{page.delivery}</p></div>
              <div><h3 className="text-[1.125rem] font-medium">Preparing your brief</h3><p className="mt-3 leading-relaxed text-ink/70">{page.brief}</p></div>
            </div>
          </div>
        </section>
        <section className="bg-bone py-16 md:py-24" aria-labelledby="audience-services"><div className="container-x"><h2 id="audience-services" className="text-display type-h2">Services to discuss for your project</h2><ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{services.map((s) => <li key={s.slug}><ServiceTile s={s} /></li>)}</ul><p className="mt-6 text-[0.9375rem] text-ink/70">Select materials for the actual exposure and intended use. Repairing moisture entry and maintaining the selected system can help avoid repeat damage; energy or performance targets need project-specific evidence.</p></div></section>
        <section className="py-16 md:py-24" aria-labelledby="audience-faq"><div className="container-x grid gap-8 lg:grid-cols-2"><h2 id="audience-faq" className="text-display type-h2">Questions before you appoint a contractor</h2><FaqList items={faqs} name={`audience-${page.slug}`} /></div></section>
        <nav aria-label="Related industries" className="container-x pb-16"><h2 className="text-[1.125rem] font-medium">More {page.sector.toLowerCase()} project types</h2><ul className="mt-5 flex flex-wrap gap-3">{audiencePages.filter((a) => a.sector === page.sector && a.slug !== page.slug).map((a) => <li key={a.slug}><Link className="inline-block rounded-full border border-ink/15 px-4 py-3 text-[0.875rem] hover:bg-bone" href={`/industries/${a.slug}/`}>{a.name}</Link></li>)}</ul></nav>
        <FinalCta context={`${page.name} project`} />
      </main>
    </>
  );
}
