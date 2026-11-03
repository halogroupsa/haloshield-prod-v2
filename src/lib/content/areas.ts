import type { ImageName } from "../images.generated";
import { communities, emirates } from "../site";

/**
 * Local landing pages (/[slug]/). Each one describes the actual building stock and
 * exposure of that community — what fails there and why — so the page earns its place
 * rather than swapping a place name into a template.
 */

export type AreaDetail = {
  slug: string;
  name: string;
  kind: "community" | "emirate";
  image: ImageName;
  /** One line describing the typical property stock. */
  stock: string;
  intro: string;
  risks: { t: string; d: string }[];
  services: string[];
};

type AreaCopy = Omit<AreaDetail, "slug" | "name" | "kind">;

const copy: Record<string, AreaCopy> = {
  "palm-jumeirah": {
    image: "palm-jumeirah-aerial-dubai",
    stock: "Frond villas, beachfront apartments and hotel residences",
    intro:
      "On Palm Jumeirah, every property lives at the water's edge. Salt spray, high humidity and a shallow, saline water table attack roofs, façades, pools and basements from all sides — so protection here has to be specified for a marine environment, not a generic Dubai roof.",
    risks: [
      { t: "Salt & chlorides", d: "Airborne salt accelerates concrete and reinforcement corrosion at parapets, balconies and façades." },
      { t: "High water table", d: "Basements, pools and plant rooms sit close to saline groundwater under constant pressure." },
      { t: "Wind-driven rain", d: "Sea-facing elevations take storms horizontally — through joints, thresholds and window perimeters." },
    ],
    services: ["villa-waterproofing-dubai", "swimming-pool-water-tank-waterproofing-dubai", "basement-waterproofing-dubai", "roof-waterproofing-dubai"],
  },
  "emirates-hills": {
    image: "private-villa-dome-seamless-membrane",
    stock: "Custom-built mansions with domes, large basements and pools",
    intro:
      "Emirates Hills mansions are one-offs: domes, stepped roofs, cantilevers, big basements and pool terraces, often built by different contractors to different standards. Complex geometry means more interfaces — and more places for water to get in — so we survey every junction before we specify anything.",
    risks: [
      { t: "Complex roofscapes", d: "Domes, valleys and multiple roof levels create interfaces that sheet membranes can't follow." },
      { t: "Irrigated landscaping", d: "Lush gardens keep soil saturated against basement walls and façades year-round." },
      { t: "Large basements", d: "Cinemas, gyms and staff areas below grade need pressure-rated protection." },
    ],
    services: ["roof-waterproofing-dubai", "villa-waterproofing-dubai", "basement-waterproofing-dubai", "polyurea-coating-dubai"],
  },
  "al-barari": {
    image: "al-barari-terrace-waterproofing",
    stock: "Villas set in dense planting, water features and terraces",
    intro:
      "Al Barari's greenery is its signature — and its biggest moisture load. Constant irrigation, water features, planters and roof gardens surround villas with water, and humidity under the canopy is higher than almost anywhere else in Dubai.",
    risks: [
      { t: "Planters & roof gardens", d: "Roots and constantly wet soil attack membranes beneath planters and green roofs." },
      { t: "Humidity & mold", d: "Shaded, humid façades and AC condensation make mold a recurring problem." },
      { t: "Terraces", d: "Extensive outdoor living areas over habitable rooms need trafficable, root-resistant systems." },
    ],
    services: ["terrace-balcony-waterproofing-dubai", "mold-remediation-indoor-air-quality-dubai", "villa-waterproofing-dubai", "basement-waterproofing-dubai"],
  },
  "district-one-mbr-city": {
    image: "luxury-villa-terrace-waterproofing-dubai",
    stock: "Contemporary lagoon-side villas with flat roofs and large glazing",
    intro:
      "District One's contemporary villas favour flat roofs, deep terraces, frameless glazing and basements beside the Crystal Lagoon. Clean architecture leaves little margin for poor detailing at thresholds and upstands — the most common entry points we find here.",
    risks: [
      { t: "Flat roofs & terraces", d: "Minimal falls and flush thresholds make drainage and upstand detailing critical." },
      { t: "Lagoon proximity", d: "Elevated groundwater and humidity load basements and lower floors." },
      { t: "Newer-build defects", d: "Precast joints and rushed curing show up as leaks within the first few years." },
    ],
    services: ["terrace-balcony-waterproofing-dubai", "roof-waterproofing-dubai", "basement-waterproofing-dubai", "leak-detection-thermal-inspection-dubai"],
  },
  "jumeirah-bay": {
    image: "modern-dubai-villa",
    stock: "Ultra-prime island villas and branded residences",
    intro:
      "Jumeirah Bay is an island built for privacy, surrounded by sea on every side. Properties here combine a fully marine exposure with exacting finishes — so protection has to be durable, discreet and delivered with the least possible disruption.",
    risks: [
      { t: "Marine exposure", d: "Salt-laden air and spray attack roofs, façades and metalwork continuously." },
      { t: "Premium finishes", d: "Stone, timber and glass details demand precise, invisible waterproofing." },
      { t: "Pools & terraces", d: "Infinity pools and sea-view terraces sit above habitable space." },
    ],
    services: ["villa-waterproofing-dubai", "swimming-pool-water-tank-waterproofing-dubai", "terrace-balcony-waterproofing-dubai", "polyurea-coating-dubai"],
  },
  "jumeirah-golf-estates": {
    image: "golf-estate-parapet-waterproofing",
    stock: "Golf-course villas with parapets, ledges and terraces",
    intro:
      "Villas around Jumeirah Golf Estates' courses share two exposures: daily irrigation overspray and long, open elevations to sun and wind. Parapets, ledges and terrace edges are where we most often find cracking and water ingress here.",
    risks: [
      { t: "Parapets & ledges", d: "Thermal movement cracks coping and render, letting water into the wall core." },
      { t: "Irrigation overspray", d: "Sprinklers wet façades and foundations every day of the year." },
      { t: "Open exposure", d: "Unshaded roofs run hot, ageing membranes and sealants faster." },
    ],
    services: ["roof-waterproofing-dubai", "villa-waterproofing-dubai", "thermal-insulation-heat-reflective-coating-dubai", "terrace-balcony-waterproofing-dubai"],
  },
  "arabian-ranches": {
    image: "arabian-ranches-dome-roof-protection",
    stock: "Established villas with pitched tile roofs, domes and flat roofs",
    intro:
      "Many Arabian Ranches villas are now two decades old — and so is their original waterproofing. Bitumen under tiles and on flat roofs has reached the end of its life, and the domes and mixed roof types typical of the community make piecemeal repairs fail quickly.",
    risks: [
      { t: "End-of-life membranes", d: "Original bitumen systems are brittle, debonded and cracking at laps." },
      { t: "Domes & mixed roofs", d: "Curved and stepped roofs need a seamless, spray-applied system." },
      { t: "Extensions", d: "Later additions often meet the original structure with an unsealed joint." },
    ],
    services: ["roof-waterproofing-dubai", "polyurea-coating-dubai", "villa-waterproofing-dubai", "leak-detection-thermal-inspection-dubai"],
  },
  "dubai-hills-estate": {
    image: "villa-facade-waterproofing-dubai",
    stock: "Recently handed-over villas, townhouses and apartments",
    intro:
      "In Dubai Hills Estate, most of our calls come from owners of newer homes who are surprised to find leaks so early. Precast joints that move, flat roofs with minimal falls and generic membranes applied during construction are the usual causes.",
    risks: [
      { t: "Precast joints", d: "Panel joints move with heat and open up within a few summers." },
      { t: "Handover defects", d: "Membranes damaged during fit-out or never properly detailed." },
      { t: "Roof terraces", d: "Popular roof terraces sit directly over bedrooms." },
    ],
    services: ["leak-detection-thermal-inspection-dubai", "villa-waterproofing-dubai", "roof-waterproofing-dubai", "terrace-balcony-waterproofing-dubai"],
  },
  "the-meadows": {
    image: "meadows-villa-roof-membrane",
    stock: "Established lakeside villas with flat and pitched roofs",
    intro:
      "The Meadows' generous villas around the lakes are mature properties, many on their original or second roof system. We see aged membranes, damp ground floors near the water and air-conditioning condensation in roof voids.",
    risks: [
      { t: "Ageing roofs", d: "Membranes approaching end of life crack and blister in summer heat." },
      { t: "Lakeside damp", d: "Raised groundwater and irrigation drive damp into ground floors." },
      { t: "Roof-void condensation", d: "Cold ducts in hot voids cause dripping ceilings and mold." },
    ],
    services: ["roof-waterproofing-dubai", "mold-remediation-indoor-air-quality-dubai", "thermal-insulation-heat-reflective-coating-dubai", "basement-waterproofing-dubai"],
  },
  "the-springs": {
    image: "villa-flat-roof-before-after-polyurea",
    stock: "Townhouses and villas with compact flat roofs and extensions",
    intro:
      "Springs townhouses have compact flat roofs, shared party walls and — very often — extensions added over the years. The junction between original and new structure is the classic leak point, along with original roof membranes that have long outlived their warranty.",
    risks: [
      { t: "Extension junctions", d: "Unsealed joints between original walls and later additions." },
      { t: "Original flat roofs", d: "Aged bitumen that's been patched repeatedly." },
      { t: "Party walls", d: "Water travelling between neighbouring units along shared walls." },
    ],
    services: ["roof-waterproofing-dubai", "villa-waterproofing-dubai", "leak-detection-thermal-inspection-dubai", "thermal-insulation-heat-reflective-coating-dubai"],
  },
  "downtown-dubai": {
    image: "burj-khalifa-view-podium-polyurea-spray",
    stock: "Towers, podium decks, car parks and retail",
    intro:
      "Downtown Dubai is built in layers: pools, gardens and plazas on podium decks above car parks, retail and plant rooms. When a podium leaks, it leaks into a space that's in use — so systems here must be trafficable, fast-curing and detailed around every joint and drain.",
    risks: [
      { t: "Podium decks", d: "Planters, pools and landscaping above occupied car parks." },
      { t: "Movement joints", d: "Structural joints between tower and podium open and close daily." },
      { t: "Downtime cost", d: "Works must be phased around residents, retail and traffic." },
    ],
    services: ["polyurea-coating-dubai", "basement-waterproofing-dubai", "epoxy-industrial-flooring-dubai", "roof-waterproofing-dubai"],
  },
  "dubai-marina": {
    image: "dubai-marina-aerial",
    stock: "High-rise apartments, penthouses and waterfront podiums",
    intro:
      "In Dubai Marina, leaks travel downwards through towers: a failed balcony or penthouse terrace becomes the ceiling stain in the apartment below. Wind at height drives rain sideways into thresholds and window perimeters, and the marina's humidity keeps everything damp.",
    risks: [
      { t: "Balconies", d: "Thresholds and drains that leak into the unit below." },
      { t: "Penthouse roofs", d: "Wind uplift and heat on exposed roof terraces." },
      { t: "Humidity", d: "AC condensation and mold in sealed apartments." },
    ],
    services: ["terrace-balcony-waterproofing-dubai", "roof-waterproofing-dubai", "bathroom-wet-area-waterproofing-dubai", "mold-remediation-indoor-air-quality-dubai"],
  },
  "business-bay": {
    image: "dubai-skyline-roof-coating",
    stock: "Office and mixed-use towers along the Dubai Water Canal",
    intro:
      "Business Bay's towers sit beside the canal on deep basements, with podium amenities and large plant roofs above. Below-grade water pressure and heavily serviced roofs are where we focus — with works planned around operating offices and hotels.",
    risks: [
      { t: "Canal-side basements", d: "Hydrostatic pressure against basements and lift pits." },
      { t: "Plant roofs", d: "Dense AC plant, ducts and penetrations break up the membrane." },
      { t: "Occupied buildings", d: "Fast, low-odour systems that keep tenants operating." },
    ],
    services: ["basement-waterproofing-dubai", "roof-waterproofing-dubai", "thermal-insulation-heat-reflective-coating-dubai", "fire-protection-coatings-dubai"],
  },
  jumeirah: {
    image: "roof-coating-roller-application",
    stock: "Established and rebuilt villas from Jumeirah 1 to Umm Suqeim",
    intro:
      "Jumeirah's villas span decades — from original concrete homes to full rebuilds. Older roof slabs crack, coastal air works on the reinforcement, and renovations often leave new and old waterproofing meeting with nothing joining them.",
    risks: [
      { t: "Older slabs", d: "Cracked roof slabs and screeds that hold water." },
      { t: "Coastal air", d: "Salt and humidity accelerate corrosion and spalling." },
      { t: "Renovations", d: "New work tied into old waterproofing without a continuous detail." },
    ],
    services: ["roof-waterproofing-dubai", "villa-waterproofing-dubai", "leak-detection-thermal-inspection-dubai", "mold-remediation-indoor-air-quality-dubai"],
  },
  "al-barsha": {
    image: "rooftop-heat-reflective-coating-dubai",
    stock: "Villas, apartment buildings, schools and hotels",
    intro:
      "Al Barsha mixes villas, mid-rise apartments, schools and hotels, many with large, unshaded flat roofs. Heat is as big a problem as water here, which makes combined waterproofing and cool-roof systems the most effective upgrade.",
    risks: [
      { t: "Hot flat roofs", d: "Uninsulated roofs drive up cooling loads on top floors." },
      { t: "Ageing membranes", d: "UV and heat have embrittled original roof systems." },
      { t: "Mixed use", d: "Schools and hotels need works planned around occupancy." },
    ],
    services: ["thermal-insulation-heat-reflective-coating-dubai", "roof-waterproofing-dubai", "epoxy-industrial-flooring-dubai", "bathroom-wet-area-waterproofing-dubai"],
  },
  "tilal-al-ghaf": {
    image: "roof-coating-under-solar-panels",
    stock: "Newly handed-over lagoon villas and townhouses",
    intro:
      "Tilal Al Ghaf's new villas around the lagoon are the right age for protection that prevents problems rather than repairs them. We inspect handed-over homes for envelope defects and upgrade roofs, terraces and wet areas before the first summers take their toll.",
    risks: [
      { t: "Handover defects", d: "Membranes damaged during construction or fit-out." },
      { t: "Solar & roof plant", d: "Fixings and racking that puncture the roof membrane." },
      { t: "Lagoon humidity", d: "Damp-prone lower floors and AC condensation." },
    ],
    services: ["leak-detection-thermal-inspection-dubai", "roof-waterproofing-dubai", "terrace-balcony-waterproofing-dubai", "villa-waterproofing-dubai"],
  },

  /* ----------------------------- Emirates ----------------------------- */

  "abu-dhabi": {
    image: "abu-dhabi-skyline",
    stock: "Island villas, towers and commercial buildings",
    intro:
      "From Saadiyat and Yas to Al Reem and the city centre, Abu Dhabi's properties face the same heat, humidity and storm exposure as Dubai's — with even more coastline. Our Dubai-based engineers and crews deliver the same inspection-led LuxGuard™ approach across the capital.",
    risks: [
      { t: "Island & coastal exposure", d: "Salt air and groundwater on Saadiyat, Yas and Al Reem." },
      { t: "Large roofs", d: "Commercial and villa roofs that need heat and water protection." },
      { t: "Storm events", d: "Heavy rainfall overwhelming drains and detailing." },
    ],
    services: ["villa-waterproofing-dubai", "roof-waterproofing-dubai", "polyurea-coating-dubai", "thermal-insulation-heat-reflective-coating-dubai"],
  },
  sharjah: {
    image: "sharjah-waterfront",
    stock: "Residential towers, villas and industrial warehouses",
    intro:
      "Sharjah combines older residential stock, waterfront towers and one of the UAE's largest industrial areas. We waterproof villa and apartment roofs, insulate and coat warehouse roofs, and install industrial floors for operating facilities.",
    risks: [
      { t: "Older buildings", d: "Aged roofs and cracked slabs on established residential stock." },
      { t: "Warehouse roofs", d: "Metal roofs with leaking laps and fixings, and intense heat gain." },
      { t: "Industrial floors", d: "Chemical and traffic wear in operating facilities." },
    ],
    services: ["roof-waterproofing-dubai", "thermal-insulation-heat-reflective-coating-dubai", "epoxy-industrial-flooring-dubai", "polyurea-coating-dubai"],
  },
  ajman: {
    image: "facade-membrane-torch-application",
    stock: "Residential towers, villas and light-industrial facilities",
    intro:
      "Ajman's coastal towers and growing villa communities face salt air and heat, while its industrial zones need durable floors and roofs. We bring the same engineering-led inspection and seamless systems we use across Dubai.",
    risks: [
      { t: "Coastal towers", d: "Balconies and roofs exposed to salt and wind." },
      { t: "Façades", d: "Cracked render and joints letting water into walls." },
      { t: "Industrial units", d: "Roof and floor protection for working facilities." },
    ],
    services: ["roof-waterproofing-dubai", "terrace-balcony-waterproofing-dubai", "villa-waterproofing-dubai", "epoxy-industrial-flooring-dubai"],
  },
  "ras-al-khaimah": {
    image: "dubai-skyline-engineer-view",
    stock: "Resorts, coastal villas and industrial facilities",
    intro:
      "Ras Al Khaimah runs from mountains to sea: beachfront resorts and villas at Al Hamra and Al Marjan, and industrial facilities inland. Heavier rainfall near the Hajar mountains and coastal exposure make robust roof and envelope protection essential.",
    risks: [
      { t: "Heavier rainfall", d: "More frequent storms than the rest of the coast." },
      { t: "Resort roofs & pools", d: "Hospitality assets that can't afford downtime." },
      { t: "Industrial plants", d: "Roofs, floors and coatings exposed to heavy use." },
    ],
    services: ["roof-waterproofing-dubai", "swimming-pool-water-tank-waterproofing-dubai", "polyurea-coating-dubai", "epoxy-industrial-flooring-dubai"],
  },
  "umm-al-quwain": {
    image: "polyurea-spray-under-roof-structure",
    stock: "Coastal villas, low-rise residential and industrial units",
    intro:
      "Umm Al Quwain's low-rise coastal homes and industrial areas share a salt-laden, humid environment. Roof waterproofing, basement protection and durable coatings are what we're most often asked for here.",
    risks: [
      { t: "Salt air", d: "Corrosion and spalling on roofs and façades." },
      { t: "Older roofs", d: "Membranes at the end of their life." },
      { t: "Industrial wear", d: "Floors and roofs in working facilities." },
    ],
    services: ["roof-waterproofing-dubai", "villa-waterproofing-dubai", "polyurea-coating-dubai", "epoxy-industrial-flooring-dubai"],
  },
  fujairah: {
    image: "epoxy-floor-coating-application",
    stock: "East-coast villas, resorts, port and industrial facilities",
    intro:
      "Fujairah receives more rain than anywhere else in the UAE, and its port and industrial facilities work in a marine environment. Roofs, tanks and industrial surfaces here need systems designed for water and corrosion, not just heat.",
    risks: [
      { t: "Highest rainfall", d: "Roofs and drainage tested far more often than in Dubai." },
      { t: "Marine industry", d: "Corrosion and chemical exposure around the port." },
      { t: "Tanks & containment", d: "Water storage and secondary containment linings." },
    ],
    services: ["roof-waterproofing-dubai", "polyurea-coating-dubai", "swimming-pool-water-tank-waterproofing-dubai", "epoxy-industrial-flooring-dubai"],
  },
};

export const areas: AreaDetail[] = [
  {
    slug: "dubai",
    name: "Dubai",
    kind: "emirate",
    image: "dubai-skyline-engineer-view",
    stock: "Villas, residential towers, offices, hotels and industrial properties",
    intro: "Halo Shield is based in Al Quoz and serves properties across Dubai. Roof leaks, facade joints, podium decks, pools and damp interiors need a scope matched to the building and its use. Share the location, affected areas and available drawings so we can discuss the assessment and access requirements.",
    risks: [
      { t: "Roofs & exposed details", d: "Assess roof coverings, outlets, parapets and penetrations alongside the leak history." },
      { t: "Connected interfaces", d: "Check how facades, windows, terraces and roof-to-wall junctions connect." },
      { t: "Occupied buildings", d: "Coordinate access, work zones and handover with owners, tenants and facilities teams." },
    ],
    services: ["roof-waterproofing-dubai", "villa-waterproofing-dubai", "basement-waterproofing-dubai", "building-envelope-waterproofing-dubai", "polyurea-coating-dubai", "epoxy-industrial-flooring-dubai", "indoor-air-quality-dubai", "building-energy-assessment-dubai"],
  },
  ...communities.map((c) => ({ slug: c.slug, name: c.name, kind: "community" as const, ...copy[c.slug] })),
  ...emirates.map((e) => ({ slug: e.slug, name: e.name, kind: "emirate" as const, ...copy[e.slug] })),
];

export const getArea = (slug: string) => areas.find((a) => a.slug === slug);
