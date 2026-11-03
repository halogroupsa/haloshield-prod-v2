import type { ImageName } from "./images.generated";
import { GTM_ID, IS_PRODUCTION_SITE, SITE_URL } from "./deployment";

/**
 * Single source of truth for business facts, navigation and home-page copy.
 * Everything rendered on the page AND everything emitted as JSON-LD reads from here,
 * so the visible content and the structured data can never drift apart.
 */

export const site = {
  name: "Halo Shield",
  legalName: "Halo Shield",
  url: SITE_URL,
  tagline: "Engineering-led waterproofing & property protection in Dubai",
  phone: "+971 55 969 3009",
  phoneE164: "+971559693009",
  email: "info@haloshield.ae",
  whatsapp: "971559693009",
  address: {
    street: "Warehouse 7, Al Marabea' St",
    locality: "Al Quoz",
    city: "Dubai",
    country: "AE",
    countryName: "United Arab Emirates",
  },
  // Decoded from the Plus Code on the old contact page (46MH+G9J, Al Quoz).
  geo: { lat: 25.1338, lng: 55.2285 },
  socials: {
    instagram: "https://www.instagram.com/halo_shield/",
    facebook: "https://www.facebook.com/haloshieldae",
  },
  gtmId: GTM_ID,
  // Shown in the hero. Carried over from the old site — confirm before launch.
  ratings: { google: "4.9", trustpilot: "4.8" },
} as const;

/** Index public pages only on the configured production origin. */
export const allowIndexing = IS_PRODUCTION_SITE;

export const whatsappHref = (text = "Hi, I'm interested in Halo Shield waterproofing services") =>
  `https://api.whatsapp.com/send?phone=${site.whatsapp}&text=${encodeURIComponent(text)}`;

export const telHref = `tel:${site.phoneE164}`;

/* ------------------------------------------------------------------ */
/* Services — split into high-intent waterproofing pages and systems. */
/* Slugs are keyword-first and Dubai-scoped for local search.         */
/* ------------------------------------------------------------------ */

export type Service = {
  slug: string;
  name: string;
  short: string;
  image: ImageName;
  group: "waterproofing" | "systems";
};

export const services: Service[] = [
  {
    slug: "building-envelope-waterproofing-dubai",
    name: "Building Envelope & Facade Waterproofing",
    short: "Facade leaks, window interfaces, movement joints and roof-to-wall details assessed as one envelope.",
    image: "villa-facade-waterproofing-dubai",
    group: "waterproofing",
  },
  {
    slug: "roof-waterproofing-dubai",
    name: "Roof Waterproofing",
    short: "Seamless polyurea and PU roof systems for villas, towers and podiums — no joints, no overlaps.",
    image: "palm-jumeirah-villa-rooftop-waterproofing",
    group: "waterproofing",
  },
  {
    slug: "villa-waterproofing-dubai",
    name: "Villa Waterproofing",
    short: "360° envelope protection for villas on Palm Jumeirah, Emirates Hills, Al Barari and beyond.",
    image: "villa-facade-waterproofing-dubai",
    group: "waterproofing",
  },
  {
    slug: "basement-waterproofing-dubai",
    name: "Basement & Foundation Waterproofing",
    short: "Below-grade tanking and podium systems that stop rising damp and hydrostatic ingress.",
    image: "polyurea-spray-under-roof-structure",
    group: "waterproofing",
  },
  {
    slug: "swimming-pool-water-tank-waterproofing-dubai",
    name: "Swimming Pool & Water Tank Waterproofing",
    short: "Potable-safe, chemical-resistant linings for pools, balancing tanks and water storage.",
    image: "private-villa-dome-seamless-membrane",
    group: "waterproofing",
  },
  {
    slug: "terrace-balcony-waterproofing-dubai",
    name: "Terrace & Balcony Waterproofing",
    short: "Trafficable, UV-stable membranes for terraces, balconies and roof gardens.",
    image: "al-barari-terrace-waterproofing",
    group: "waterproofing",
  },
  {
    slug: "bathroom-wet-area-waterproofing-dubai",
    name: "Bathroom & Wet Area Waterproofing",
    short: "Leak-proof showers, kitchens and wet rooms — fixed at the source, not the stain.",
    image: "apartment-mold-remediation-dubai",
    group: "waterproofing",
  },
  {
    slug: "polyurea-coating-dubai",
    name: "Polyurea Coatings",
    short: "Hot-spray, 100% solids polyurea that cures in seconds and stretches up to 300%.",
    image: "burj-khalifa-view-podium-polyurea-spray",
    group: "systems",
  },
  {
    slug: "epoxy-industrial-flooring-dubai",
    name: "Epoxy & Industrial Flooring",
    short: "Chemical-resistant, slip-rated floors for warehouses, car parks and kitchens.",
    image: "corridor-chemical-resistant-floor-coating",
    group: "systems",
  },
  {
    slug: "thermal-insulation-heat-reflective-coating-dubai",
    name: "Thermal Insulation & Heat-Reflective Coatings",
    short: "Spray-foam insulation and cool-roof coatings that cut surface heat and cooling load.",
    image: "rooftop-heat-reflective-coating-dubai",
    group: "systems",
  },
  {
    slug: "mold-remediation-indoor-air-quality-dubai",
    name: "Mould Removal & Remediation",
    short: "Moisture-source diagnosis, mould treatment and prevention for damp villas, apartments and commercial spaces.",
    image: "villa-indoor-air-quality-treatment",
    group: "systems",
  },
  {
    slug: "fire-protection-coatings-dubai",
    name: "Fire Protection Coatings",
    short: "Intumescent and fire-retardant systems for structural steel and building elements.",
    image: "fire-protection-coatings-office",
    group: "systems",
  },
  {
    slug: "leak-detection-thermal-inspection-dubai",
    name: "Leak Detection & Thermal Inspection",
    short: "Non-destructive thermal imaging, moisture mapping and endoscopy that find the source before anything is opened up.",
    image: "thermal-imaging-villa-envelope",
    group: "systems",
  },
  {
    slug: "indoor-air-quality-dubai",
    name: "Indoor Air Quality",
    short: "Assess moisture, humidity and ventilation concerns, with testing and treatment scopes agreed for your property.",
    image: "villa-indoor-air-quality-treatment",
    group: "systems",
  },
  {
    slug: "building-energy-assessment-dubai",
    name: "Building Energy Assessment",
    short: "Review envelope condition, insulation and thermal concerns before specifying energy improvements.",
    image: "under-roof-spray-foam-insulation",
    group: "systems",
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);

/* ------------------------------------------------------------------ */
/* Dubai communities — each becomes a local landing page.             */
/* ------------------------------------------------------------------ */

export const communities = [
  { slug: "palm-jumeirah", name: "Palm Jumeirah" },
  { slug: "emirates-hills", name: "Emirates Hills" },
  { slug: "al-barari", name: "Al Barari" },
  { slug: "district-one-mbr-city", name: "District One" },
  { slug: "jumeirah-bay", name: "Jumeirah Bay" },
  { slug: "jumeirah-golf-estates", name: "Jumeirah Golf Estates" },
  { slug: "arabian-ranches", name: "Arabian Ranches" },
  { slug: "dubai-hills-estate", name: "Dubai Hills Estate" },
  { slug: "the-meadows", name: "The Meadows" },
  { slug: "the-springs", name: "The Springs" },
  { slug: "downtown-dubai", name: "Downtown Dubai" },
  { slug: "dubai-marina", name: "Dubai Marina" },
  { slug: "business-bay", name: "Business Bay" },
  { slug: "jumeirah", name: "Jumeirah" },
  { slug: "al-barsha", name: "Al Barsha" },
  { slug: "tilal-al-ghaf", name: "Tilal Al Ghaf" },
] as const;

export const emirates = [
  { slug: "abu-dhabi", name: "Abu Dhabi" },
  { slug: "sharjah", name: "Sharjah" },
  { slug: "ajman", name: "Ajman" },
  { slug: "ras-al-khaimah", name: "Ras Al Khaimah" },
  { slug: "umm-al-quwain", name: "Umm Al Quwain" },
  { slug: "fujairah", name: "Fujairah" },
] as const;

/* ------------------------------------------------------------------ */
/* Navigation                                                          */
/* ------------------------------------------------------------------ */

export type NavLink = { label: string; href: string; note?: string };

/** Primary navigation. `menu` items open a disclosure panel on desktop and an accordion on mobile. */
export const primaryNav: ({ label: string; href: string; menu?: "services" | "areas" | "company" })[] = [
  { label: "Services", href: "/services/", menu: "services" },
  { label: "LuxGuard™ 360°", href: "/luxguard-360/" },
  { label: "Projects", href: "/projects/" },
  { label: "Areas", href: "/areas/", menu: "areas" },
  { label: "Company", href: "/about/", menu: "company" },
  { label: "Contact", href: "/contact/" },
];

export const companyNav: NavLink[] = [
  { label: "About Halo Shield", href: "/about/", note: "Engineering-led since day one" },
  { label: "Industries", href: "/industries/", note: "Residential, commercial, industrial" },
  { label: "Projects", href: "/projects/", note: "Recent work across Dubai" },
  { label: "FAQ", href: "/faq/", note: "Straight answers" },
  { label: "Blogs", href: "/blogs/", note: "Plan your waterproofing project" },
  { label: "Careers", href: "/careers/", note: "Work with Halo Shield" },
  { label: "Contact", href: "/contact/", note: "Al Quoz, Dubai" },
];

export const legalNav: NavLink[] = [
  { label: "Privacy policy", href: "/privacy-policy/" },
  { label: "Terms of service", href: "/terms-of-service/" },
];

export const industries = {
  Residential: ["Homeowners", "Luxury Residences", "Apartment Complexes", "Property Developers", "Property Managers", "Real Estate Investors"],
  Commercial: ["Office Buildings", "Hotels", "Shopping Malls", "Clinics & Hospitals", "Schools", "Restaurants", "Retail"],
  Industrial: ["Warehouses", "Manufacturing Plants", "Marine", "Government Facilities", "Public Facilities"],
} as const;

/* ------------------------------------------------------------------ */
/* LuxGuard™ 360° — seven layers, bottom to top                        */
/* ------------------------------------------------------------------ */

export const luxguardLayers = [
  {
    name: "Primer Bond Layer",
    tagline: "Deep substrate adhesion",
    body: "Penetrates concrete and masonry to lock the system to the structure itself — so it can never peel or delaminate.",
    stat: "Bonds into the substrate",
    tone: "#5d6872",
  },
  {
    name: "Moisture Barrier",
    tagline: "Complete water block",
    body: "A zero-porosity membrane that stops liquid water and vapour drive before they reach the slab.",
    stat: "Zero porosity",
    tone: "#7c8993",
  },
  {
    name: "Flex Layer",
    tagline: "Movement accommodation",
    body: "An elastomeric core that stretches up to 300% — absorbing the daily expansion of Dubai's 50°C summers without cracking.",
    stat: "Up to 300% elongation",
    tone: "#9daab5",
  },
  {
    name: "UV Shield",
    tagline: "Solar radiation defence",
    body: "Aliphatic UV blockers stop the chalking and embrittlement that destroy ordinary membranes in a few summers.",
    stat: "Blocks 99% of UV",
    tone: "#bbc8d2",
  },
  {
    name: "Heat-Reflective Coat",
    tagline: "Thermal management",
    body: "Reflects up to 85% of solar heat, dropping roof surface temperatures by up to 25°C and easing the cooling load below.",
    stat: "Up to −25°C at the surface",
    tone: "#d2dce3",
  },
  {
    name: "Anti-Fungal Layer",
    tagline: "Mold prevention",
    body: "Biocide-infused chemistry that keeps mold, mildew and algae from colonising in coastal humidity.",
    stat: "Built for coastal humidity",
    tone: "#e2eaf0",
  },
  {
    name: "Top Seal Finish",
    tagline: "The armour",
    body: "A self-cleaning, scratch-resistant topcoat that takes foot traffic and rooftop loads and stays bright for years.",
    stat: "Trafficable & self-cleaning",
    tone: "#f3f6f8",
  },
] as const;

/* ------------------------------------------------------------------ */
/* Process                                                             */
/* ------------------------------------------------------------------ */

export const processSteps = [
  {
    title: "Structural & envelope inspection",
    body: "DM-approved engineers map movement, joints, gaps and past workmanship across your entire envelope — roof to basement.",
    image: "halo-shield-team-burj-khalifa-rooftop",
  },
  {
    title: "Root-cause diagnosis",
    body: "Thermal imaging, moisture mapping and endoscopy tell us why water gets in — not just where the stain appears.",
    image: "thermal-imaging-villa-envelope",
  },
  {
    title: "Engineered protection design",
    body: "A bespoke specification built on LuxGuard™ 360°, detailed for your structure's movement, exposure and use.",
    image: "penthouse-rooftop-membrane-dubai",
  },
  {
    title: "Permanent protection, delivered",
    body: "Quality-controlled installation by our own crews, signed off and backed by up to 25 years of protection assurance.",
    image: "rooftop-heat-reflective-coating-dubai",
  },
] as const satisfies readonly { title: string; body: string; image: ImageName }[];

export const inspectionPoints = {
  Structural: ["Foundation integrity", "Load-bearing walls", "Concrete condition", "Steel reinforcement"],
  Envelope: ["Roof membranes", "External walls", "Window seals", "Expansion joints"],
  "Water systems": ["Drainage paths", "Pipe penetrations", "Tank linings", "Pool structures"],
  Environmental: ["Moisture levels", "Thermal performance", "Ventilation flow", "Condensation risk"],
} as const;

/* ------------------------------------------------------------------ */
/* Projects                                                            */
/* ------------------------------------------------------------------ */

export const projectTypes = ["Roofs", "Podiums & towers", "Domes", "Terraces", "Coatings"] as const;

export const projects = [
  { title: "Rooftop waterproofing", type: "Roofs", location: "Palm Jumeirah", spec: "Polyurea membrane with thermal barrier", image: "palm-jumeirah-villa-rooftop-waterproofing" },
  { title: "High-rise podium", type: "Podiums & towers", location: "Downtown Dubai", spec: "Hot-spray polyurea at 85°C, aliphatic topcoat", image: "burj-khalifa-view-podium-polyurea-spray" },
  { title: "Dome protection", type: "Domes", location: "Arabian Ranches", spec: "Curved-surface seamless membrane", image: "arabian-ranches-dome-roof-protection" },
  { title: "Terrace restoration", type: "Terraces", location: "Al Barari", spec: "Trafficable terrace system", image: "al-barari-terrace-waterproofing" },
  { title: "Private villa dome", type: "Domes", location: "Emirates Hills", spec: "Seamless membrane, UV-stable topcoat · 850 m²", image: "private-villa-dome-seamless-membrane" },
  { title: "Building rooftop", type: "Podiums & towers", location: "Downtown Dubai", spec: "Multi-layer coating system", image: "downtown-dubai-rooftop-polyurea-coating" },
  { title: "Villa complex", type: "Roofs", location: "The Meadows", spec: "Large-scale residential membrane", image: "meadows-villa-roof-membrane" },
  { title: "Penthouse rooftop", type: "Roofs", location: "Dubai Marina", spec: "Wind-rated membrane · 450 m²", image: "penthouse-rooftop-membrane-dubai" },
  { title: "Golf-course estate", type: "Terraces", location: "Jumeirah Golf Estates", spec: "Parapet & ledge detailing · 540 m²", image: "golf-estate-parapet-waterproofing" },
  { title: "Cool-roof retrofit", type: "Coatings", location: "Al Barsha", spec: "Heat-reflective coating · 420 m²", image: "rooftop-heat-reflective-coating-dubai" },
  { title: "Under-roof insulation", type: "Coatings", location: "Dubai", spec: "Spray-foam insulation application", image: "under-roof-spray-foam-insulation" },
  { title: "Corridor floor protection", type: "Coatings", location: "Dubai", spec: "Protective floor coating", image: "corridor-chemical-resistant-floor-coating" },
  { title: "Villa facade protection", type: "Coatings", location: "Dubai", spec: "External facade waterproofing", image: "villa-facade-waterproofing-dubai" },
  { title: "Villa terrace waterproofing", type: "Terraces", location: "Dubai", spec: "Terrace membrane and drainage detailing", image: "luxury-villa-terrace-waterproofing-dubai" },
] as const satisfies readonly { title: string; type: (typeof projectTypes)[number]; location: string; spec: string; image: ImageName }[];

export const stats = [
  { value: 650, suffix: "+", label: "Properties protected" },
  { value: 2.5, suffix: "M+", label: "Square metres sealed", decimals: 1 },
  { value: 98, suffix: "%", label: "First-time fix rate" },
  { value: 25, suffix: " yr", label: "Protection assurance" },
] as const;

/* ------------------------------------------------------------------ */
/* Comparison                                                          */
/* ------------------------------------------------------------------ */

export const comparison = [
  { label: "Starting point", them: "Product application", us: "Structural & envelope inspection" },
  { label: "Engineers involved", them: "Rarely", us: "DM-approved structural engineers" },
  { label: "Scope", them: "Roofs only", us: "360° property envelope" },
  { label: "System type", them: "Layered / combo membranes", us: "Seamless, proprietary system" },
  { label: "Joints & overlaps", them: "Yes — the failure points", us: "None" },
  { label: "Designed for movement", them: "Limited", us: "Engineered to move" },
  { label: "Heat & UV", them: "Degrades in a few summers", us: "Built for 50°C and coastal UV" },
  { label: "Warranty", them: "Covers the product", us: "Up to 25-year protection assurance" },
  { label: "Result", them: "Temporary relief", us: "Permanent protection" },
] as const;

/* ------------------------------------------------------------------ */
/* FAQ — also emitted as FAQPage JSON-LD                               */
/* ------------------------------------------------------------------ */

export const faqs = [
  {
    q: "Is Halo Shield a waterproofing company?",
    a: "Yes — and more. Halo Shield is an engineering-led waterproofing and property protection company in Dubai. Waterproofing is the core of what we do, but every project starts with structural and envelope engineering: movement, joints, heat, humidity and long-term asset protection, not just stopping a visible leak.",
  },
  {
    q: "Why does traditional waterproofing keep failing in Dubai?",
    a: "Conventional systems weren't designed for 50°C heat and intense UV, coastal humidity, constant thermal expansion and contraction, precast construction joints, or sudden heavy rainfall like the April 2024 storms. Layered and combo membranes rely on joints and overlaps — and those become the failure points. Water always finds the weakest point.",
  },
  {
    q: "My villa is new. Do I still need waterproofing?",
    a: "Often, yes. Many new villas in Dubai leak within their first few years because of construction detailing, precast joints that move, incomplete curing and generic membranes applied during the build. Being new doesn't mean being protected — early assessment prevents expensive structural damage later.",
  },
  {
    q: "I already waterproofed my roof. Why would I need Halo Shield?",
    a: "Most of our clients come to us after they've already waterproofed. Roof-only waterproofing ignores walls, joints and interfaces, doesn't address movement and leaves the rest of the envelope exposed. Halo Shield delivers 360° protection, not isolated fixes.",
  },
  {
    q: "What makes LuxGuard™ 360° different?",
    a: "LuxGuard™ 360° is a seven-layer, seamless and joint-free system engineered to move with the structure. It resists extreme heat, UV, humidity and rain, handles rooftop loads and foot traffic, cures rapidly with minimal disruption and is backed by up to 25 years of protection assurance.",
  },
  {
    q: "How much does waterproofing cost in Dubai?",
    a: "It depends on the area, substrate condition, access and the system specified — which is exactly why we start with an inspection rather than a per-square-metre guess. After a 360° assessment you receive a fixed, itemised proposal. Halo Shield is rarely the cheapest quote, but it's designed to be the last one you pay for.",
  },
  {
    q: "Is the 25-year protection assurance real? What does it cover?",
    a: "Yes. It isn't only a product warranty — it covers system performance, resistance to water ingress, accommodation of structural movement and durability under UAE climate conditions, backed by our own engineering, inspection and installation.",
  },
  {
    q: "How long does installation take? Will it disrupt my home or business?",
    a: "Most LuxGuard™ systems are rapid-curing and walkable within hours. We plan works around occupied villas, operating businesses and industrial facilities so disruption is minimal — far less than repeated repairs.",
  },
  {
    q: "Which areas of Dubai do you cover?",
    a: "All of Dubai — including Palm Jumeirah, Emirates Hills, Al Barari, District One, Jumeirah Bay, Jumeirah Golf Estates, Arabian Ranches, Dubai Hills Estate, The Meadows, The Springs, Downtown Dubai and Dubai Marina — plus Abu Dhabi, Sharjah, Ajman, Ras Al Khaimah, Umm Al Quwain and Fujairah.",
  },
  {
    q: "How do I know if my property is at risk?",
    a: "If you've had leaks before, see cracks, bubbling or peeling paint, notice damp smells or mold, have unusually high cooling bills, or your property has never had a structural envelope inspection, it's likely at risk. The only way to know for sure is a proper assessment.",
  },
  {
    q: "What is the first step?",
    a: "Book a 360° Structural Protection Assessment. You'll get clarity on risks, the root causes behind them and a long-term protection strategy — with no pressure and no guesswork.",
  },
] as const;
