import type { ImageName } from "../images.generated";
import { restoredServiceDetails } from "./restored-services";

/**
 * Long-form copy for each /services/[slug]/ page. Keyed by the slug in `services` (site.ts).
 * Every page has unique copy — no templated "{service} in {city}" filler — because thin,
 * near-duplicate service pages are exactly what local search filters out.
 */

export type ServiceDetail = {
  /** <title> without the brand suffix. */
  title: string;
  /** Meta description, ≤ 155 characters. */
  description: string;
  h1: string;
  lede: string;
  overview: [string, string];
  signs: string[];
  applications: { t: string; d: string }[];
  spec: { k: string; v: string }[];
  faqs: { q: string; a: string }[];
  related: string[];
  gallery: [ImageName, ImageName];
  /** Hero override when the service's own image is too small to run full-bleed. */
  hero?: ImageName;
};

export const serviceDetails: Record<string, ServiceDetail> = {
  ...restoredServiceDetails,
  "roof-waterproofing-dubai": {
    title: "Roof Waterproofing & Roof Leak Repair in Dubai",
    description:
      "Roof waterproofing and roof leak repair in Dubai for villas, towers and podiums. Discuss preparation, drainage details, testing and an itemised quotation.",
    h1: "Roof waterproofing in Dubai",
    lede: "A roof in Dubai moves every day — and most membranes can't. We engineer seamless, joint-free roof systems that stretch with the slab, reflect the sun and never rely on an overlap.",
    overview: [
      "Flat concrete roofs in the UAE live through a brutal daily cycle: 70°C surface temperatures at noon, rapid cooling at night, and long stretches of dust and UV before a sudden storm. Bitumen sheets and layered combo systems crack at their laps and debond at upstands within a few summers — which is why so many Dubai roofs are on their second or third waterproofing.",
      "Our roof systems start with an inspection of the slab, screed falls, drains, parapets and every penetration. We then specify a monolithic LuxGuard™ build-up — primer, hot-spray polyurea and a UV-stable aliphatic topcoat — detailed around upstands, outlets, AC plinths and solar mounts so there's no seam for water to find.",
    ],
    signs: [
      "Ceiling stains or bubbling paint on the top floor",
      "Water ponding on the roof more than 48 hours after rain",
      "Cracked, blistered or chalky membrane at parapets and upstands",
      "Leaks that appear only in heavy rain or when AC units drain",
      "A previous roof that's been 'patched' more than once",
    ],
    applications: [
      { t: "Villa roofs", d: "Flat and stepped roofs, parapets, domes and roof terraces across Dubai communities." },
      { t: "Towers & podiums", d: "Podium decks, planters and pool decks above occupied car parks and retail." },
      { t: "Plant & solar roofs", d: "Detailing around AC plinths, ducts and solar racking without breaking the membrane." },
      { t: "Re-roofing", d: "Strip-out or overlay of failed bitumen, with substrate repair before anything is sprayed." },
    ],
    spec: [
      { k: "System", v: "LuxGuard™ 360° — primer, hot-spray polyurea, aliphatic topcoat" },
      { k: "Joints & laps", v: "None — one continuous membrane" },
      { k: "Elongation", v: "Up to 300%" },
      { k: "Cure", v: "Walkable within hours" },
      { k: "Assurance", v: "Up to 25 years" },
    ],
    faqs: [
      {
        q: "How long does roof waterproofing take on a Dubai villa?",
        a: "Most villa roofs are inspected in a day and completed in two to four days, depending on area, substrate repairs and access. Polyurea is walkable within hours, so disruption is minimal.",
      },
      {
        q: "Can you waterproof over my existing roof membrane?",
        a: "Sometimes. If the existing system is well bonded we can prepare and overlay it; if it's blistered, debonded or trapping water we remove it first. The inspection decides — never the price.",
      },
      {
        q: "Does a waterproofed roof also reduce cooling costs?",
        a: "Yes. The heat-reflective layer in LuxGuard™ reflects up to 85% of solar heat and can drop roof surface temperatures by up to 25°C, easing the load on the floors below.",
      },
    ],
    related: ["terrace-balcony-waterproofing-dubai", "polyurea-coating-dubai", "thermal-insulation-heat-reflective-coating-dubai"],
    gallery: ["villa-flat-roof-before-after-polyurea", "penthouse-rooftop-membrane-dubai"],
  },

  "villa-waterproofing-dubai": {
    title: "Villa Waterproofing in Dubai — 360° Envelope Protection",
    description:
      "Complete villa waterproofing in Dubai: roofs, walls, terraces, basements, pools and wet areas engineered as one 360° envelope. Book a free assessment.",
    h1: "Villa waterproofing in Dubai",
    lede: "Water doesn't respect the line between 'roof' and 'wall'. We treat your villa as one envelope — roof to basement — so the leak you fix today isn't replaced by the next one along.",
    overview: [
      "Most villa leaks in Dubai happen at interfaces: where a roof meets a parapet, a terrace meets a door threshold, or a precast panel meets the next. Roof-only waterproofing ignores those junctions, so water simply moves to the next weak point. Newer villas are not immune — precast joints, rushed curing and generic membranes mean many leak within their first few years.",
      "A Halo Shield villa project begins with a 300+ point structural and envelope inspection, including thermal imaging and moisture mapping. From that we design one continuous protection strategy across roof, façade, terraces, wet areas, pool and basement, delivered by our own crews and backed by up to 25-year assurance.",
    ],
    signs: [
      "Damp patches on internal walls after rain or irrigation",
      "Cracks at window corners, parapets or between precast panels",
      "Musty smells or mold in wardrobes and bedrooms",
      "Efflorescence (white salt stains) on external walls",
      "Recurring leaks after previous waterproofing",
    ],
    applications: [
      { t: "Roof & terraces", d: "Seamless polyurea roofs and trafficable terraces, detailed at every upstand." },
      { t: "Façades & joints", d: "Breathable, elastomeric wall protection and sealed precast and expansion joints." },
      { t: "Pools & wet areas", d: "Pool shells, balancing tanks, bathrooms and kitchens sealed at the source." },
      { t: "Basements", d: "Below-grade tanking against irrigation water and a rising water table." },
    ],
    spec: [
      { k: "Scope", v: "Full 360° envelope, roof to basement" },
      { k: "Survey", v: "300+ point inspection with thermal imaging" },
      { k: "Crews", v: "In-house, supervised by engineers" },
      { k: "Disruption", v: "Planned around occupied homes" },
      { k: "Assurance", v: "Up to 25 years" },
    ],
    faqs: [
      {
        q: "Do you work on occupied villas?",
        a: "Yes — almost all of our villa projects are occupied. We phase works area by area, protect interiors and landscaping, and use fast-curing systems so rooms and roofs are back in use quickly.",
      },
      {
        q: "Is villa waterproofing covered by the developer's warranty?",
        a: "Structural defect liability and waterproofing warranties vary by developer and usually cover the product, not your interiors. We can inspect, document findings for a claim and design permanent protection either way.",
      },
      {
        q: "Which Dubai communities do you cover?",
        a: "All of them — including Palm Jumeirah, Emirates Hills, Al Barari, District One, Arabian Ranches, Dubai Hills Estate, The Meadows, The Springs and Jumeirah Golf Estates.",
      },
    ],
    related: ["roof-waterproofing-dubai", "basement-waterproofing-dubai", "leak-detection-thermal-inspection-dubai"],
    gallery: ["facade-membrane-torch-application", "luxury-villa-terrace-waterproofing-dubai"],
  },

  "basement-waterproofing-dubai": {
    title: "Basement & Foundation Waterproofing in Dubai",
    description:
      "Basement and foundation waterproofing in Dubai: tanking, crack injection and podium systems that stop rising damp and hydrostatic water ingress for good.",
    h1: "Basement & foundation waterproofing in Dubai",
    lede: "Below ground, water arrives with pressure behind it. We design basement and foundation systems for hydrostatic load, salt-laden groundwater and irrigation run-off — not just damp.",
    overview: [
      "Dubai's coastal communities sit on a high, saline water table, and inland villas are surrounded by daily irrigation. Both push water against foundations and basement walls under pressure. The result is rising damp, salt crystallisation, corroding reinforcement and finishes that never stay dry — problems a surface coat of paint-on membrane can't hold back.",
      "We map moisture and pressure, then specify the right combination of crystalline treatment, crack and joint injection, and a bonded polyurea or cementitious tanking system. For podiums over car parks we detail drains, planters and expansion joints so the deck above and the basement below are protected as one system.",
    ],
    signs: [
      "Damp, darkened walls or floors at basement level",
      "White crystalline salts on walls or slab edges",
      "Water seeping through construction joints or tie holes",
      "Rusting or staining that suggests corroding reinforcement",
      "Leaks into car parks below podium decks or planters",
    ],
    applications: [
      { t: "Villa basements", d: "Cinemas, gyms and staff quarters kept dry and mold-free." },
      { t: "Car parks & podiums", d: "Deck membranes and joint systems over occupied parking." },
      { t: "Foundations & retaining walls", d: "Below-grade protection against saline groundwater." },
      { t: "Lift pits & plant rooms", d: "Pressure-rated tanking for pits, sumps and service rooms." },
    ],
    spec: [
      { k: "Approach", v: "Pressure-rated tanking + joint injection" },
      { k: "Groundwater", v: "Designed for saline, high water tables" },
      { k: "Joints", v: "Injected and sealed construction joints" },
      { k: "Survey", v: "Moisture mapping before specification" },
      { k: "Assurance", v: "Up to 25 years" },
    ],
    faqs: [
      {
        q: "Can a basement be waterproofed from the inside?",
        a: "Yes. When external excavation isn't practical we use negative-side systems — crystalline treatments, injection and bonded tanking — designed to resist water pressure from the outside.",
      },
      {
        q: "What causes rising damp in Dubai villas?",
        a: "Usually a combination of a high water table, irrigation saturating the soil around the villa and a missing or failed damp-proof course. We identify which before specifying a fix.",
      },
      {
        q: "Will basement waterproofing stop the salt stains?",
        a: "Stopping the water stops new salts forming. Existing efflorescence is cleaned and the substrate treated before the protection system goes on.",
      },
    ],
    related: ["villa-waterproofing-dubai", "leak-detection-thermal-inspection-dubai", "mold-remediation-indoor-air-quality-dubai"],
    gallery: ["mold-moisture-inspection", "moisture-meter-wall-inspection"],
  },

  "swimming-pool-water-tank-waterproofing-dubai": {
    title: "Swimming Pool & Water Tank Waterproofing in Dubai",
    description:
      "Pool, balancing tank and water tank waterproofing in Dubai. Potable-safe, chemical-resistant linings for villas, hotels and towers. Free inspection.",
    h1: "Swimming pool & water tank waterproofing in Dubai",
    lede: "A pool or tank is a structure under constant water load and chemical attack. We line it so the water stays in — and stays clean — for decades, not seasons.",
    overview: [
      "Leaking pools in Dubai often show up somewhere else entirely: damp in a basement plant room, cracks in surrounding paving or a water bill that won't come down. Rooftop pools and podium pools add movement and heat to the problem, and chlorinated or saline water attacks ordinary cementitious linings.",
      "We pressure-test and inspect the shell, balancing tank and pipe penetrations, repair the substrate, then apply a seamless, chemical-resistant lining under the finish. For potable water tanks we use linings suitable for drinking water, so tanks stay clean and compliant.",
    ],
    signs: [
      "Pool level dropping faster than evaporation explains",
      "Damp in plant rooms or rooms beneath the pool",
      "Cracked or hollow-sounding tiles around the waterline",
      "Rust staining or discoloured water in storage tanks",
      "Algae or biofilm that keeps coming back in tanks",
    ],
    applications: [
      { t: "Villa pools", d: "In-ground and rooftop pools, infinity edges and balancing tanks." },
      { t: "Hotel & podium pools", d: "Pools over occupied floors, detailed for structural movement." },
      { t: "Potable water tanks", d: "Clean, potable-safe linings for underground and roof tanks." },
      { t: "Water features", d: "Fountains, ponds and reflecting pools that hold water reliably." },
    ],
    spec: [
      { k: "Lining", v: "Seamless, chemical-resistant membrane" },
      { k: "Potable tanks", v: "Drinking-water-safe linings" },
      { k: "Testing", v: "Pressure / flood test before and after" },
      { k: "Penetrations", v: "Sealed inlets, outlets and lights" },
      { k: "Assurance", v: "Up to 25 years" },
    ],
    faqs: [
      {
        q: "Can you fix a leaking pool without removing all the tiles?",
        a: "Sometimes the leak is at a fitting or a single joint and can be repaired locally. Where the shell itself is failing, the finish has to come off so a continuous lining can go on. Leak detection tells us which.",
      },
      {
        q: "Is the lining safe for drinking-water tanks?",
        a: "Yes — for potable tanks we specify linings suitable for contact with drinking water and disinfect the tank before it's returned to service.",
      },
      {
        q: "How long is a pool out of use?",
        a: "A typical villa pool is drained, lined, cured and refilled within one to two weeks, depending on substrate repairs and the finish being reinstated.",
      },
    ],
    related: ["basement-waterproofing-dubai", "leak-detection-thermal-inspection-dubai", "villa-waterproofing-dubai"],
    gallery: ["modern-dubai-villa", "luxury-villa-terrace-waterproofing-dubai"],
  },

  "terrace-balcony-waterproofing-dubai": {
    title: "Terrace & Balcony Waterproofing in Dubai",
    description:
      "Terrace, balcony and roof-garden waterproofing in Dubai. Trafficable, UV-stable membranes that stop leaks into the rooms and units below.",
    h1: "Terrace & balcony waterproofing in Dubai",
    lede: "Terraces are roofs people walk on, dine on and plant gardens on. We give them a membrane that takes the traffic, the planters and the sun — and keeps the room below dry.",
    overview: [
      "Balconies and terraces fail at the details: door thresholds set too low, drains without a proper collar, tiles laid over a membrane with no protection, planters sitting directly on the slab. In apartment towers, a single failed balcony becomes the downstairs neighbour's ceiling problem.",
      "We strip back to the substrate where needed, correct falls and drainage, and install a trafficable, UV-stable membrane that's turned up behind thresholds, sealed around balustrade posts and lapped into every outlet. Finishes can be reinstated tiles, a decorative coating or a hard-wearing walkable topcoat.",
    ],
    signs: [
      "Ceiling stains in the room or apartment below",
      "Water tracking inside under sliding door thresholds",
      "Loose, hollow or cracked terrace tiles",
      "Planters or green walls with damp walls behind them",
      "Rust at balustrade post bases",
    ],
    applications: [
      { t: "Villa terraces", d: "Roof terraces, majlis terraces and outdoor kitchens." },
      { t: "Apartment balconies", d: "Tower balconies and penthouse terraces exposed to wind-driven rain." },
      { t: "Roof gardens & planters", d: "Root-resistant membranes beneath soil and planters." },
      { t: "Pool decks", d: "Slip-resistant, trafficable systems around pools." },
    ],
    spec: [
      { k: "Membrane", v: "Trafficable, UV-stable, seamless" },
      { k: "Finish", v: "Tiles, decorative coating or walkable topcoat" },
      { k: "Drainage", v: "Falls and outlets corrected first" },
      { k: "Planters", v: "Root-resistant detailing" },
      { k: "Assurance", v: "Up to 25 years" },
    ],
    faqs: [
      {
        q: "Do you need to remove the tiles?",
        a: "If water is already travelling under the tiles, yes — the membrane has to go beneath the finish. For sound substrates we can apply a clear or coloured walkable system directly over prepared tiles.",
      },
      {
        q: "Can you waterproof a balcony in an occupied apartment?",
        a: "Yes. Balcony works are contained to the balcony itself, use low-odour fast-cure systems and are usually complete within a few days.",
      },
      {
        q: "What about planters on my terrace?",
        a: "Planters need a root-resistant membrane and a drainage layer. We detail them so irrigation water drains away rather than sitting against your walls.",
      },
    ],
    related: ["roof-waterproofing-dubai", "villa-waterproofing-dubai", "bathroom-wet-area-waterproofing-dubai"],
    gallery: ["luxury-villa-terrace-waterproofing-dubai", "golf-estate-parapet-waterproofing"],
  },

  "bathroom-wet-area-waterproofing-dubai": {
    title: "Bathroom & Wet Area Waterproofing in Dubai",
    description:
      "Leaking shower or bathroom in Dubai? We find the source and waterproof bathrooms, kitchens and wet rooms properly — under the tiles, not on top.",
    h1: "Bathroom & wet area waterproofing in Dubai",
    lede: "A leaking shower is rarely about grout. We find where water is really escaping — the tray, the drain, the wall junction — and rebuild the waterproofing under the finish.",
    overview: [
      "Wet-area leaks are among the most common calls we get from Dubai apartments and villas, and among the most misdiagnosed. Re-grouting and silicone hide the symptom for a few weeks while water keeps soaking the screed, the wall behind and the ceiling below — where mold quietly takes hold.",
      "We use moisture mapping and thermal imaging to locate the escape path, remove only what's necessary, and install a continuous liquid membrane with reinforced corners, sealed drains and upstands at every wall — before tiles go back on. Kitchens, laundries and plant rooms get the same treatment.",
    ],
    signs: [
      "Stains or bubbling paint on the ceiling below a bathroom",
      "Swollen door frames, skirting or vanity units",
      "Persistent musty smell or black mold at the base of walls",
      "Grout that keeps cracking or darkening near the drain",
      "Complaints from the apartment below",
    ],
    applications: [
      { t: "Bathrooms & showers", d: "Walk-in showers, wet rooms and bath surrounds." },
      { t: "Kitchens & laundries", d: "Protection under floors where water and appliances meet." },
      { t: "Plant & service rooms", d: "Water heater, pump and AHU rooms with floor drains." },
      { t: "Hotels & residences", d: "Repeatable, inspected details across multiple units." },
    ],
    spec: [
      { k: "Diagnosis", v: "Moisture mapping + thermal imaging" },
      { k: "Membrane", v: "Continuous liquid membrane under tiles" },
      { k: "Details", v: "Reinforced corners, sealed drains, upstands" },
      { k: "Testing", v: "Flood test before tiling" },
      { k: "Mold", v: "Antimicrobial treatment where needed" },
    ],
    faqs: [
      {
        q: "Can a shower leak be fixed without retiling?",
        a: "Occasionally — if the leak is a failed drain seal or a single penetration. If water is passing through the tray or walls, the membrane beneath the tiles has failed and the area needs to be rebuilt properly.",
      },
      {
        q: "How long will my bathroom be out of use?",
        a: "Typically three to five days for a standard bathroom, including the flood test before tiles are reinstated.",
      },
      {
        q: "Is the mold behind the tiles dangerous?",
        a: "Hidden mold affects indoor air quality and can aggravate allergies and asthma. We treat it as part of the repair and can test air quality afterwards.",
      },
    ],
    related: ["mold-remediation-indoor-air-quality-dubai", "leak-detection-thermal-inspection-dubai", "terrace-balcony-waterproofing-dubai"],
    gallery: ["moisture-meter-wall-inspection", "mold-moisture-inspection"],
  },

  "polyurea-coating-dubai": {
    title: "Polyurea Coating in Dubai — Hot-Spray Polyurea Specialists",
    description:
      "Hot-spray polyurea coating in Dubai for roofs, podiums, tanks and industrial surfaces. 100% solids, cures in seconds, stretches up to 300%.",
    h1: "Polyurea coating in Dubai",
    lede: "Polyurea is sprayed hot, cures in seconds and forms one continuous skin with no seams. Applied properly, it's the most resilient waterproofing and protective coating available in the UAE.",
    overview: [
      "Pure polyurea is a 100% solids elastomer sprayed through heated, high-pressure plural-component equipment at around 85°C. It gels in seconds, so it can be applied to vertical faces, domes and complex roofscapes without sagging, and areas are back in service within hours rather than days.",
      "The result is only as good as the preparation and the applicator. Our crews profile and prime the substrate, control film thickness with wet-film checks and finish with an aliphatic topcoat so the membrane stays UV-stable in Dubai sun. We apply polyurea for waterproofing, abrasion and impact resistance, and chemical containment.",
    ],
    signs: [
      "Roofs or decks that need to be back in use within a day",
      "Complex shapes — domes, gutters, plant bases — where sheets fail",
      "Surfaces exposed to traffic, abrasion or impact",
      "Secondary containment and chemical exposure",
      "Previous coatings that cracked as the structure moved",
    ],
    applications: [
      { t: "Roofs & domes", d: "Seamless membranes over concrete, metal and existing systems." },
      { t: "Podiums & car parks", d: "Trafficable deck coatings with fast return to service." },
      { t: "Tanks & containment", d: "Water tanks, bunds and secondary containment." },
      { t: "Industrial & marine", d: "Abrasion, impact and corrosion protection." },
    ],
    spec: [
      { k: "Material", v: "100% solids pure polyurea" },
      { k: "Application", v: "Hot-spray, plural-component, ~85°C" },
      { k: "Gel time", v: "Seconds — walkable within hours" },
      { k: "Elongation", v: "Up to 300%" },
      { k: "UV", v: "Aliphatic topcoat for colour and gloss stability" },
    ],
    faqs: [
      {
        q: "What is the difference between polyurea and polyurethane?",
        a: "Polyurethane coatings cure slowly and are sensitive to humidity during application. Pure polyurea cures in seconds, is far less moisture-sensitive and gives higher elongation and abrasion resistance — ideal for Dubai's conditions.",
      },
      {
        q: "Does polyurea fade in the sun?",
        a: "Aromatic polyurea can darken under UV, which is why we finish with an aliphatic topcoat that keeps colour and protects the membrane beneath.",
      },
      {
        q: "Can polyurea be applied over an existing roof?",
        a: "Often, yes — over sound, well-bonded substrates after preparation and priming. Failing or blistered systems are removed first.",
      },
    ],
    related: ["roof-waterproofing-dubai", "epoxy-industrial-flooring-dubai", "swimming-pool-water-tank-waterproofing-dubai"],
    gallery: ["arabian-ranches-dome-roof-protection", "downtown-dubai-rooftop-polyurea-coating"],
  },

  "epoxy-industrial-flooring-dubai": {
    title: "Epoxy Flooring Contractors in Dubai — Installation & Repairs",
    description:
      "Epoxy flooring installation in Dubai for warehouses, car parks and commercial floors. Compare preparation, resin systems, finishes and quotation scope.",
    h1: "Epoxy & industrial flooring in Dubai",
    lede: "Floors in warehouses, car parks and kitchens take forklifts, chemicals, hot water and constant cleaning. We specify and install systems built for that — not showroom finishes that peel in a year.",
    overview: [
      "Most floor coating failures in the UAE come down to the slab, not the resin: moisture rising through the concrete, laitance left on the surface or a coating chosen for appearance rather than load. The result is blistering, delamination and dusting within months.",
      "We test slab moisture, mechanically prepare the surface and select the right system for the use — epoxy for chemical and abrasion resistance, polyurethane-cement for thermal shock in kitchens, and textured or broadcast finishes where slip resistance matters. Car parks get trafficable, waterproof deck systems that protect the structure as well as the surface.",
    ],
    signs: [
      "Dusting, cracked or peeling floor coatings",
      "Floors that are slippery when wet",
      "Chemical spills staining or etching the slab",
      "Car park decks leaking into the level below",
      "Hygiene audits flagging joints and porous surfaces",
    ],
    applications: [
      { t: "Warehouses & logistics", d: "Forklift-rated, line-marked, dust-free floors." },
      { t: "Car parks", d: "Waterproof, trafficable deck and ramp systems." },
      { t: "Commercial kitchens", d: "Hygienic, thermal-shock-resistant seamless floors." },
      { t: "Clinics & labs", d: "Easy-clean, chemical-resistant hygienic finishes." },
    ],
    spec: [
      { k: "Systems", v: "Epoxy, PU-cement, polyurea deck coatings" },
      { k: "Preparation", v: "Moisture testing + mechanical profiling" },
      { k: "Finish", v: "Smooth, textured or broadcast anti-slip" },
      { k: "Resistance", v: "Chemicals, abrasion, thermal shock" },
      { k: "Downtime", v: "Phased to keep operations running" },
    ],
    faqs: [
      {
        q: "Can you coat our warehouse floor without shutting down?",
        a: "Yes — we phase works zone by zone and can work nights and weekends. Fast-cure systems return areas to light traffic quickly.",
      },
      {
        q: "Why did our previous epoxy floor peel?",
        a: "Usually moisture vapour from the slab or poor surface preparation. We test both before specifying, and use moisture-tolerant primers where needed.",
      },
      {
        q: "Do you do car park waterproofing as well as coatings?",
        a: "Yes. Car park decks above occupied levels need a waterproof, trafficable system — not just a floor paint — and we detail joints and drains as part of it.",
      },
    ],
    related: ["polyurea-coating-dubai", "basement-waterproofing-dubai", "fire-protection-coatings-dubai"],
    gallery: ["epoxy-floor-coating-application", "under-roof-spray-foam-insulation"],
  },

  "thermal-insulation-heat-reflective-coating-dubai": {
    title: "Thermal Insulation & Heat-Reflective Roof Coatings in Dubai",
    description:
      "Cool-roof coatings and spray-foam insulation in Dubai. Cut roof surface temperatures by up to 25°C and reduce cooling load. Free roof assessment.",
    h1: "Thermal insulation & heat-reflective coatings in Dubai",
    lede: "In Dubai, the roof is the biggest heater in the building. We turn it into a shield — reflecting the sun, insulating the slab and cutting the cooling load in the rooms below.",
    overview: [
      "A dark or uninsulated roof can exceed 70°C in summer, radiating heat into the top floor long after sunset and forcing AC systems to run harder. Heat also accelerates the ageing of every membrane and sealant on the roof.",
      "We combine spray-applied polyurethane foam insulation — seamless, fully adhered and free of the joints that let board insulation trap water — with a heat-reflective topcoat that reflects up to 85% of solar heat. The system can be integrated with LuxGuard™ waterproofing so one application protects against both water and heat.",
    ],
    signs: [
      "Top-floor rooms that stay hot in the evening",
      "High cooling bills relative to building size",
      "Roof surfaces too hot to touch by mid-morning",
      "Condensation on ceilings beneath AC ducts",
      "Membranes ageing, chalking or cracking early",
    ],
    applications: [
      { t: "Villa roofs", d: "Cooler upper floors and lower bills." },
      { t: "Warehouses & factories", d: "Metal roof insulation and reflective coatings." },
      { t: "Commercial buildings", d: "Reduced peak cooling demand across large roofs." },
      { t: "Solar roofs", d: "Coatings detailed around existing racking." },
    ],
    spec: [
      { k: "Insulation", v: "Spray polyurethane foam, seamless" },
      { k: "Reflectance", v: "Reflects up to 85% of solar heat" },
      { k: "Surface temp", v: "Up to −25°C at the roof surface" },
      { k: "Integration", v: "Combines with LuxGuard™ waterproofing" },
      { k: "Substrates", v: "Concrete, metal deck, existing membranes" },
    ],
    faqs: [
      {
        q: "How much can a cool roof reduce cooling costs?",
        a: "It depends on the building, insulation and AC system, but reflective coatings can reduce roof surface temperatures by up to 25°C, which directly reduces the heat load on the floors below. We'll model the effect for your roof during the assessment.",
      },
      {
        q: "Does a reflective coating stay white in Dubai dust?",
        a: "Our topcoats are designed to resist dirt pick-up and are largely self-cleaning in rain; an occasional wash restores full reflectance.",
      },
      {
        q: "Can you insulate a metal warehouse roof?",
        a: "Yes. Spray foam bonds directly to metal decks, seals laps and fixings, and is then protected with a reflective, waterproof topcoat.",
      },
    ],
    related: ["roof-waterproofing-dubai", "polyurea-coating-dubai", "leak-detection-thermal-inspection-dubai"],
    gallery: ["roof-coating-under-solar-panels", "under-roof-spray-foam-insulation"],
  },

  "mold-remediation-indoor-air-quality-dubai": {
    title: "Mould Removal & Remediation Services in Dubai",
    description:
      "Mould removal and remediation in Dubai for villas, apartments and workplaces. Discuss damp sources, treatment areas, testing and an itemised quotation.",
    h1: "Mould removal & remediation in Dubai",
    lede: "Mould, also spelled mold, often returns when the moisture source remains unresolved. We assess damp, leaks and ventilation concerns before defining the treatment and follow-up scope.",
    overview: [
      "In Dubai's climate, mold usually starts where cold, air-conditioned surfaces meet humid air — behind wardrobes, around AC ducts and diffusers, on ceilings under roofs and in bathrooms. Painting over it, or wiping it with bleach, leaves the cause in place and the spores in the air.",
      "We start with moisture mapping, thermal imaging and airflow checks to investigate a leak, condensation, ventilation or AC issue. The proposal identifies affected areas, treatment, any moisture repairs and the follow-up checks included. Laboratory testing, duct cleaning and reinstatement should be listed separately where required.",
    ],
    signs: [
      "Black or green spots on ceilings, walls or around AC vents",
      "A persistent musty smell, especially when the AC starts",
      "Recurring growth after cleaning or repainting",
      "Peeling paint or swollen plaster with no obvious leak",
      "Condensation dripping from ducts or diffusers",
    ],
    applications: [
      { t: "Homes & villas", d: "Bedrooms, wardrobes, bathrooms and ceiling voids." },
      { t: "Apartments", d: "AC-related condensation and balcony-related damp." },
      { t: "Offices & clinics", d: "Indoor air quality for occupied workplaces." },
      { t: "Hotels", d: "Guest-room mold and odour complaints resolved at the source." },
    ],
    spec: [
      { k: "Diagnosis", v: "Moisture mapping, thermal imaging, airflow" },
      { k: "Remediation", v: "Containment + antimicrobial treatment" },
      { k: "Root cause", v: "Leak, condensation or ventilation fixed" },
      { k: "Verification", v: "Follow-up checks agreed in the proposal" },
      { k: "Prevention", v: "Anti-fungal coatings where appropriate" },
    ],
    faqs: [
      {
        q: "Why does mold keep coming back after cleaning?",
        a: "Because the moisture that feeds it is still there. Unless the leak, condensation or ventilation problem is fixed, mold returns within weeks.",
      },
      {
        q: "Is mold caused by my AC?",
        a: "Often it's involved. Cold ducts and diffusers in humid air create condensation, and poorly balanced systems leave rooms damp. We check airflow as part of the diagnosis.",
      },
      {
        q: "Can we stay at home during mold remediation?",
        a: "Usually yes — affected rooms are contained and treated while the rest of the home stays in use. We'll advise if a room needs to be vacated temporarily.",
      },
    ],
    related: ["indoor-air-quality-dubai", "leak-detection-thermal-inspection-dubai", "villa-waterproofing-dubai"],
    gallery: ["airflow-hvac-diagnostics", "indoor-air-quality-monitor"],
  },

  "fire-protection-coatings-dubai": {
    title: "Fire Protection Coatings in Dubai — Intumescent & Fire-Retardant",
    description:
      "Intumescent and fire-retardant coatings in Dubai for structural steel, timber and building elements. Specified, applied and documented for compliance.",
    h1: "Fire protection coatings in Dubai",
    lede: "When a fire starts, structural steel has minutes before it loses strength. Intumescent and fire-retardant coatings buy that time — if they're specified to the right rating and applied to the right thickness.",
    overview: [
      "Passive fire protection is invisible until the day it matters. Intumescent coatings expand into an insulating char when heated, slowing the temperature rise in steel so the structure stays standing long enough for safe evacuation and firefighting.",
      "We work from the project's required fire-resistance period and steel sections to specify the right product and dry-film thickness, prepare and prime the steel, apply in controlled coats and record thickness readings so the installation can be inspected and approved. Fire-retardant coatings are also available for timber and other combustible elements.",
    ],
    signs: [
      "New steel structures needing a fire-resistance rating",
      "Fit-outs or change-of-use requiring upgraded protection",
      "Damaged or incomplete existing intumescent coatings",
      "Exposed timber or combustible finishes in public areas",
      "Inspection findings on passive fire protection",
    ],
    applications: [
      { t: "Structural steel", d: "Beams, columns and connections in commercial and industrial buildings." },
      { t: "Warehouses", d: "Portal frames and mezzanines." },
      { t: "Offices & retail", d: "Exposed-steel architectural finishes with a decorative topcoat." },
      { t: "Timber elements", d: "Fire-retardant treatment for timber and combustible linings." },
    ],
    spec: [
      { k: "Systems", v: "Intumescent and fire-retardant coatings" },
      { k: "Specification", v: "To required fire-resistance period" },
      { k: "QA", v: "Dry-film thickness recorded per member" },
      { k: "Finish", v: "Decorative topcoat available" },
      { k: "Documentation", v: "Handover pack for inspection" },
    ],
    faqs: [
      {
        q: "How thick does an intumescent coating need to be?",
        a: "It depends on the steel section, the fire-resistance period required and the specific product. We calculate the dry-film thickness per member and record it during application.",
      },
      {
        q: "Can intumescent paint be applied to existing steel?",
        a: "Yes, after surface preparation and a compatible primer. Existing coatings are assessed for compatibility first.",
      },
      {
        q: "Do you provide documentation for approvals?",
        a: "Yes — product data, thickness records and a handover pack so the installation can be inspected.",
      },
    ],
    related: ["epoxy-industrial-flooring-dubai", "polyurea-coating-dubai", "thermal-insulation-heat-reflective-coating-dubai"],
    gallery: ["fire-protection-coatings-office", "under-roof-spray-foam-insulation"],
    hero: "polyurea-spray-under-roof-structure",
  },

  "leak-detection-thermal-inspection-dubai": {
    title: "Leak Detection & Thermal Imaging Inspection in Dubai",
    description:
      "Non-destructive leak detection in Dubai: thermal imaging, moisture mapping and endoscopy to find the source of leaks, damp and mold — with a clear report.",
    h1: "Leak detection & thermal inspection in Dubai",
    lede: "The stain is where water ends up, not where it gets in. We find the real entry point without breaking anything open — then show you exactly what we found.",
    overview: [
      "Water can travel metres through screeds, walls and ceiling voids before it appears. That's why so many leaks in Dubai are 'fixed' in the wrong place, and why repeat call-outs are so common. Guesswork costs more than diagnosis.",
      "Our engineers combine thermal imaging, calibrated moisture meters, endoscope cameras and airflow measurement to trace the path water takes through your building. Every finding is photographed, located on a plan and delivered as a clear, prioritised report — whether you then use Halo Shield or not.",
    ],
    signs: [
      "A leak that's been repaired before and came back",
      "Damp or stains with no obvious source",
      "Unexplained rises in your water bill",
      "Mold or musty smells in specific rooms",
      "Buying, selling or handing over a property",
    ],
    applications: [
      { t: "Leak tracing", d: "Roofs, terraces, bathrooms, pools and pipework." },
      { t: "Pre-purchase surveys", d: "Know what you're buying before you sign." },
      { t: "Handover & snagging", d: "Envelope checks for new-build villas and apartments." },
      { t: "Energy & comfort", d: "Insulation gaps, thermal bridges and air leakage." },
    ],
    spec: [
      { k: "Thermal imaging", v: "Hidden moisture and insulation gaps" },
      { k: "Moisture mapping", v: "Calibrated readings through finishes" },
      { k: "Endoscopy", v: "Inspection inside cavities, no demolition" },
      { k: "Airflow", v: "Ventilation and condensation risk" },
      { k: "Report", v: "Photographed, located, prioritised" },
    ],
    faqs: [
      {
        q: "Will you need to break walls or tiles to find a leak?",
        a: "Not to find it. Our methods are non-destructive; opening up is only needed for the repair itself, and then only where the evidence points.",
      },
      {
        q: "Can thermal imaging find leaks behind tiles?",
        a: "Yes. Wet materials cool and heat differently from dry ones, so moisture behind tiles, plaster and ceilings shows up clearly — we confirm every reading with a moisture meter.",
      },
      {
        q: "Do I get a written report?",
        a: "Yes. You receive a photographed, plan-referenced report with findings, causes and recommended fixes, in priority order.",
      },
    ],
    related: ["villa-waterproofing-dubai", "bathroom-wet-area-waterproofing-dubai", "mold-remediation-indoor-air-quality-dubai"],
    gallery: ["thermal-imaging-villa-envelope", "moisture-meter-wall-inspection"],
    hero: "modern-dubai-villa",
  },
};
