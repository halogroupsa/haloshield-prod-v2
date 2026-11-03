import type { ServiceDetail } from "./services";

/** Restores distinct services from the previous site's solution pages. */
export const restoredServiceDetails: Record<string, ServiceDetail> = {
  "building-envelope-waterproofing-dubai": {
    title: "Building Envelope Waterproofing & Facade Sealing Dubai",
    description: "Building envelope waterproofing in Dubai: facade leaks, window interfaces, joints and roof-to-wall details. Request an assessment and scoped quotation.",
    h1: "Building envelope waterproofing in Dubai",
    lede: "Water can travel through a facade, window joint or roof junction before it appears inside. We assess the connected building envelope to identify which details need repair.",
    overview: [
      "The building envelope includes external walls, roofs, windows, doors and the junctions between them. Treating only the visible stain can leave the original entry route open. Halo Shield assesses those interfaces alongside drainage, movement and the condition of previous repairs.",
      "For new construction, towers and building rehabilitation, we survey the affected elevations, identify compatible coatings and joint treatments, and set out access, surface preparation and reinstatement before work starts. Glazing replacement and structural repairs must be listed separately where required.",
    ],
    signs: ["Internal damp after wind-driven rain", "Cracked sealant around windows or precast panels", "Staining at roof-to-wall junctions", "Peeling facade coatings or recurring damp patches", "Water entering around skylights and external doors"],
    applications: [
      { t: "Facades & external walls", d: "Assess coatings, surface defects and water entry routes across the affected elevations." },
      { t: "Windows & skylights", d: "Inspect perimeter seals, thresholds and interfaces with the surrounding waterproofing." },
      { t: "Joints & junctions", d: "Specify preparation and compatible treatments for movement joints and changes of material." },
      { t: "New build & rehabilitation", d: "Coordinate envelope details with construction or refurbishment before finishes conceal them." },
    ],
    spec: [{ k: "Survey", v: "Walls, roof junctions, windows, doors and skylights" }, { k: "System", v: "Selected for substrate, movement and exposure" }, { k: "Access", v: "Scaffolding or specialist access identified in the quote" }, { k: "Verification", v: "Testing method agreed for the affected details" }],
    faqs: [
      { q: "Can a wall or window leak look like a roof leak?", a: "Yes. Water can travel through cavities and along slabs before becoming visible. Inspection helps distinguish roof, facade and window-interface defects before selecting the repair." },
      { q: "Does facade sealing include replacing windows?", a: "Only if replacement is expressly included. Perimeter sealing, glazing replacement, frame repairs and internal decoration are different items and should be separated in the quotation." },
      { q: "Can you assess a building before renovation?", a: "Yes. Share elevations, available drawings, leak photographs and the refurbishment programme so the envelope work can be coordinated with the main contractor." },
    ],
    related: ["roof-waterproofing-dubai", "villa-waterproofing-dubai", "leak-detection-thermal-inspection-dubai"],
    gallery: ["villa-facade-waterproofing-dubai", "thermal-imaging-villa-envelope"],
  },
  "indoor-air-quality-dubai": {
    title: "Indoor Air Quality Assessment Services in Dubai",
    description: "Indoor air quality assessment in Dubai for villas, offices and facilities. Discuss moisture, humidity, ventilation, testing and treatment requirements.",
    h1: "Indoor air quality services in Dubai",
    lede: "Persistent odours, damp rooms and poor ventilation need an investigation of the source. Start with an assessment of moisture, airflow and the tests your property needs.",
    overview: [
      "Indoor air quality covers more than visible mould: humidity, ventilation, air-conditioning hygiene and indoor contaminant sources can all need attention. We discuss the building's use, affected rooms and recent leaks or refurbishment before proposing the assessment.",
      "The proposal should identify any air sampling, laboratory analysis, HVAC cleaning, surface treatment and follow-up checks included. A thermal image or moisture reading alone is not a laboratory air-quality test. Any specialist testing, parameters and reporting arrangements are agreed for the project rather than assumed to be part of every visit.",
    ],
    signs: ["Persistent musty odours", "Condensation around grilles or cold surfaces", "Damp rooms despite air conditioning", "Recurring visible mould after cleaning", "Ventilation concerns after fit-out or changes in occupancy"],
    applications: [
      { t: "Homes", d: "Investigate moisture and ventilation concerns in villas, apartments and occupied bedrooms." },
      { t: "Offices", d: "Review affected zones, occupancy and ventilation concerns with the facilities team." },
      { t: "Schools", d: "Plan inspection and any treatment around classrooms, access restrictions and the school calendar." },
      { t: "Healthcare facilities", d: "Agree testing and treatment with the facility's own hygiene and operational requirements." },
    ],
    spec: [{ k: "Initial review", v: "Moisture, humidity, ventilation and reported concerns" }, { k: "Testing", v: "Parameters and laboratory scope agreed before booking" }, { k: "Treatment", v: "Quoted separately where investigation identifies a need" }, { k: "Follow-up", v: "Verification requirements stated in the proposal" }],
    faqs: [
      { q: "Does an inspection include indoor air quality testing?", a: "Not automatically. Ask for the sampling locations, parameters, laboratory arrangements and written report to be stated in the quotation if testing is required." },
      { q: "Is mould removal the same as improving air quality?", a: "Mould remediation addresses a contamination and moisture problem. Indoor air quality can also involve ventilation, humidity and other sources. The assessment determines which services are relevant." },
      { q: "Is HVAC duct cleaning included?", a: "Only when specified. Share the AC system type, number of units, access details and maintenance history so cleaning or treatment can be priced as an identified scope." },
    ],
    related: ["mold-remediation-indoor-air-quality-dubai", "leak-detection-thermal-inspection-dubai", "building-envelope-waterproofing-dubai"],
    gallery: ["villa-indoor-air-quality-treatment", "apartment-mold-remediation-dubai"],
  },
  "building-energy-assessment-dubai": {
    title: "Building Energy & Thermal Performance Assessment Dubai",
    description: "Building energy assessment in Dubai: review insulation, roof heat gain, air leakage and HVAC concerns. Discuss a measured improvement plan for your property.",
    h1: "Building energy assessment in Dubai",
    lede: "Understand where a building gains heat before choosing an upgrade. We review envelope condition and thermal concerns to help define a practical improvement scope.",
    overview: [
      "Building energy improvements can involve insulation, cooling performance and wider operational changes. A roof coating is only one possible measure. Start by reviewing the envelope, glazing interfaces, occupancy, cooling operation and available utility records to identify the priorities for your building.",
      "Discuss thermal surveys, roof insulation and heat-reflective coatings alongside any HVAC or controls concerns. Lighting, automation, equipment replacement and renewable-energy work require a separately agreed specialist scope. Any savings target needs a baseline and a measurement plan; a percentage saving cannot be assumed for every property.",
    ],
    signs: ["Uneven temperatures between occupied rooms", "High cooling demand with an uninsulated roof", "Hot upper floors or warehouse workspaces", "Visible insulation gaps or damaged roof coatings", "A refurbishment that changes occupancy or cooling needs"],
    applications: [
      { t: "Villas", d: "Review roof heat gain, insulation and envelope gaps before committing to finishes." },
      { t: "Commercial buildings", d: "Discuss thermal performance alongside operating hours and available utility information." },
      { t: "Warehouses", d: "Assess metal-roof heat gain and insulation options alongside the building's ventilation needs." },
      { t: "Renovation projects", d: "Coordinate improvement priorities with roof repairs, facade work and the wider contractor programme." },
    ],
    spec: [{ k: "Inputs", v: "Plans, utility records and operating information where available" }, { k: "Review", v: "Envelope condition and thermal performance concerns" }, { k: "Improvements", v: "Project-specific priorities with separate work scopes" }, { k: "Savings", v: "Baseline and verification method needed for any target" }],
    faqs: [
      { q: "Will insulation guarantee a lower electricity bill?", a: "Actual consumption also depends on equipment efficiency, operating hours, occupancy and thermostat settings. Agree a baseline and verification method before relying on a savings figure." },
      { q: "Is an energy assessment the same as roof insulation?", a: "No. The assessment identifies the concerns and priorities. Roof insulation is one potential installation scope, priced and specified separately." },
      { q: "What should I send before an assessment?", a: "Share building plans, roof details, recent utility records if available, AC information, operating hours and a description of the rooms or areas affected." },
    ],
    related: ["thermal-insulation-heat-reflective-coating-dubai", "building-envelope-waterproofing-dubai", "indoor-air-quality-dubai"],
    gallery: ["under-roof-spray-foam-insulation", "thermal-imaging-villa-envelope"],
  },
};
