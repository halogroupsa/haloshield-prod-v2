import type { ImageName } from "../images.generated";
import { industries as audienceLists } from "../site";

export type Industry = {
  slug: string;
  name: keyof typeof audienceLists;
  title: string;
  description: string;
  h1: string;
  lede: string;
  image: ImageName;
  imageAlt: string;
  challenges: { t: string; d: string }[];
  services: string[];
  faqs: { q: string; a: string }[];
};

export const industryPages: Industry[] = [
  {
    slug: "residential",
    name: "Residential",
    title: "Residential Waterproofing for Villas & Apartments in Dubai",
    description:
      "Waterproofing and property protection for Dubai homeowners, landlords, developers and property managers — villas, apartments and residential towers.",
    h1: "Residential waterproofing in Dubai",
    lede: "For homeowners, landlords and developers — protection that keeps families dry, interiors intact and property values where they should be.",
    image: "palm-jumeirah-villa-rooftop-waterproofing",
    imageAlt: "Halo Shield crew waterproofing a villa rooftop on Palm Jumeirah",
    challenges: [
      { t: "Leaks in new homes", d: "Precast joints and generic membranes mean many new villas leak within a few years of handover." },
      { t: "Repeat repairs", d: "Patch repairs move the leak rather than stop it — and each visit costs more than the last." },
      { t: "Mold & air quality", d: "Hidden damp behind finishes affects health long before it's visible." },
      { t: "Disruption", d: "Works have to fit around family life, tenants and neighbours." },
    ],
    services: [
      "villa-waterproofing-dubai",
      "roof-waterproofing-dubai",
      "terrace-balcony-waterproofing-dubai",
      "bathroom-wet-area-waterproofing-dubai",
      "swimming-pool-water-tank-waterproofing-dubai",
      "mold-remediation-indoor-air-quality-dubai",
    ],
    faqs: [
      {
        q: "Do you work with landlords and property managers?",
        a: "Yes. We inspect, report and repair across portfolios, coordinate access with tenants and provide documentation for owners and owners' associations.",
      },
      {
        q: "Can you help developers before handover?",
        a: "Yes — we inspect envelopes before handover, remediate defects during the liability period and specify LuxGuard™ systems for new phases.",
      },
    ],
  },
  {
    slug: "commercial",
    name: "Commercial",
    title: "Commercial Waterproofing for Offices, Hotels & Malls in Dubai",
    description:
      "Commercial waterproofing in Dubai for offices, hotels, malls, clinics, schools and restaurants. Fast-cure systems planned around operating buildings.",
    h1: "Commercial waterproofing in Dubai",
    lede: "For hotels, offices, malls, clinics and schools — protection delivered around the business, not instead of it.",
    image: "halo-shield-team-burj-khalifa-rooftop",
    imageAlt: "Halo Shield engineers on a Downtown Dubai rooftop beside the Burj Khalifa",
    challenges: [
      { t: "Downtime", d: "Every closed room, floor or car park level costs revenue." },
      { t: "Podiums & plant roofs", d: "Complex decks and serviced roofs above occupied space." },
      { t: "Guest & tenant impact", d: "Leaks, odours and noise reach customers and reviews." },
      { t: "Compliance", d: "Fire protection, hygiene and safety requirements to document." },
    ],
    services: [
      "roof-waterproofing-dubai",
      "polyurea-coating-dubai",
      "basement-waterproofing-dubai",
      "epoxy-industrial-flooring-dubai",
      "fire-protection-coatings-dubai",
      "mold-remediation-indoor-air-quality-dubai",
    ],
    faqs: [
      {
        q: "Can you work at night or around trading hours?",
        a: "Yes. We phase works by zone and schedule noisy or odorous activities outside trading or guest hours where needed.",
      },
      {
        q: "Do you provide method statements and documentation?",
        a: "Yes — method statements, risk assessments, product data and handover documentation for facilities teams and consultants.",
      },
    ],
  },
  {
    slug: "industrial",
    name: "Industrial",
    title: "Industrial Coatings, Flooring & Roofing in Dubai & the UAE",
    description:
      "Industrial waterproofing, polyurea, epoxy flooring, insulation and fire protection for UAE warehouses, plants, marine and public facilities.",
    h1: "Industrial protection in Dubai & the UAE",
    lede: "For warehouses, plants, marine and public facilities — coatings, floors and roofs built for heavy use and harsh environments.",
    image: "under-roof-spray-foam-insulation",
    imageAlt: "Spray-foam insulation and coating inside a Dubai industrial roof structure",
    challenges: [
      { t: "Metal roofs", d: "Leaking laps and fixings, and extreme heat gain under the sheet." },
      { t: "Heavy traffic", d: "Forklifts, impact and abrasion on floors and loading areas." },
      { t: "Chemicals & corrosion", d: "Spills, containment and marine environments." },
      { t: "Continuous operation", d: "Facilities that can't stop for maintenance." },
    ],
    services: [
      "polyurea-coating-dubai",
      "epoxy-industrial-flooring-dubai",
      "thermal-insulation-heat-reflective-coating-dubai",
      "fire-protection-coatings-dubai",
      "roof-waterproofing-dubai",
      "swimming-pool-water-tank-waterproofing-dubai",
    ],
    faqs: [
      {
        q: "Do you work outside Dubai?",
        a: "Yes — across all seven emirates, including industrial areas in Sharjah, Ajman, Ras Al Khaimah, Umm Al Quwain and Fujairah.",
      },
      {
        q: "Can you insulate and waterproof a warehouse roof in one system?",
        a: "Yes. Spray foam insulation with a reflective, waterproof topcoat seals laps and fixings and cuts heat gain in a single application.",
      },
    ],
  },
];

export const getIndustry = (slug: string) => industryPages.find((i) => i.slug === slug);
