import { PageHero } from "@/components/page/PageHero";
import { JsonLd } from "@/components/page/JsonLd";
import { site } from "@/lib/site";
import { pageGraph } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";

const title = "Careers at Halo Shield in Dubai";
const description = "Discuss career opportunities in waterproofing, site supervision, estimating and operations with Halo Shield in Dubai. Contact the team about current vacancies.";
const path = "/careers/";
const crumbs = [{ name: "Home", path: "/" }, { name: "Careers", path }];
export const metadata = pageMeta({ title, description, path });

export default function CareersPage() {
  return <><JsonLd data={pageGraph({ path, name: title, description, crumbs })} /><main id="main" className="bg-membrane text-ink"><PageHero crumbs={crumbs} title="Build your career in property protection" lede="Interested in practical site work, engineering, estimating or operations? Contact Halo Shield to ask about current opportunities." size="sm" eyebrow="Careers · Dubai" actions={false} />
    <section className="py-16 md:py-24" aria-labelledby="career-areas"><div className="container-x"><h2 id="career-areas" className="text-display type-h2">Where your skills could fit</h2><ul className="mt-8 grid gap-3 md:grid-cols-3">{[{ t: "Technical & site teams", d: "Waterproofing application, site supervision, quality inspection and project engineering." }, { t: "Estimating & client support", d: "Site information, measured quantities, quotations and coordination with property owners and contractors." }, { t: "Operations & delivery", d: "Project planning, procurement, logistics, administration and site coordination." }].map((r) => <li className="rounded-[22px] bg-bone p-6" key={r.t}><h3 className="type-h3">{r.t}</h3><p className="mt-4 leading-relaxed text-ink/70">{r.d}</p></li>)}</ul><div className="mt-10 max-w-[65ch]"><h2 className="type-h3">Ask about current vacancies</h2><p className="mt-4 leading-relaxed text-ink/70">Email the team with the type of role you are interested in and a short summary of your relevant experience. Current openings, requirements, location and application steps will be confirmed directly by Halo Shield.</p><a className="mt-6 inline-block py-3 font-medium underline underline-offset-4" href={`mailto:${site.email}?subject=Career%20enquiry`}>{site.email}</a></div></div></section>
  </main></>;
}
