export type BuyerGuide = {
  heading: string;
  included: string[];
  extras: string[];
  inputs: string;
  compare: string;
  comparisonLink?: { intro: string; href: `https://halo.ae/services/${string}`; label: string };
};

export const buyerGuides: Record<string, BuyerGuide> = {
  "roof-waterproofing-dubai": {
    "heading": "Roof waterproofing and roof leak repair",
    "included": [
      "Roof area and surface condition, existing membrane, drains, upstands and penetrations",
      "Preparation, repair, membrane build-up, protection and agreed water testing"
    ],
    "extras": [
      "Removing failed membranes or wet insulation",
      "Correcting falls, replacing drains and moving roof equipment"
    ],
    "inputs": "Roof plan or measured area, photos after rain, previous repair details and roof-access arrangements.",
    "compare": "Ask whether a proposed overlay is compatible with the existing roof and how ponding, outlets and penetrations will be addressed."
  },
  "villa-waterproofing-dubai": {
    "heading": "Villa waterproofing contractor",
    "included": [
      "Affected roofs, walls, balconies, wet areas and external interfaces",
      "A coordinated repair scope identifying which parts of the villa are included"
    ],
    "extras": [
      "Opening and reinstating decorative finishes",
      "Separate pool, basement, landscaping or structural work"
    ],
    "inputs": "Community, villa layout, leak locations, dates, photographs and any previous waterproofing quotations.",
    "compare": "Compare the areas covered by each proposal. A roof-only quote cannot be compared directly with a full-envelope repair."
  },
  "basement-waterproofing-dubai": {
    "heading": "Basement leak repair and waterproofing",
    "included": [
      "Walls, floors, construction joints and accessible water entry points",
      "A repair approach selected for the source of ingress and available access"
    ],
    "extras": [
      "Excavation, dewatering and external access",
      "Structural repairs, drainage changes and finish reinstatement"
    ],
    "inputs": "Basement plans, leak videos, groundwater or drainage information if available, and details of occupied or stored areas.",
    "compare": "Ask whether the proposal treats a local defect or the wider below-ground structure, and how effectiveness will be checked."
  },
  "swimming-pool-water-tank-waterproofing-dubai": {
    "heading": "Swimming pool and water tank waterproofing",
    "included": [
      "Shell condition, joints, penetrations and the existing lining",
      "A lining system selected for the intended water use and agreed testing"
    ],
    "extras": [
      "Draining, refilling and temporary water arrangements",
      "Tile removal, shell repairs, pipework and finish replacement"
    ],
    "inputs": "Pool or tank dimensions, water use, leak history, drawings, existing lining details and shutdown constraints.",
    "compare": "For drinking-water tanks, request evidence that the exact proposed product is suitable for potable-water contact. For an existing pool, check whether the quote covers shell repairs and reinstating the finish.",
    "comparisonLink": {
      "intro": "If the pool renovation also includes a new deck, lighting or garden layout, explore",
      "href": "https://halo.ae/services/landscaping-pools-dubai",
      "label": "Halo’s pool renovation and landscaping services"
    }
  },
  "terrace-balcony-waterproofing-dubai": {
    "heading": "Balcony and terrace leak repair",
    "included": [
      "Door thresholds, outlets, upstands, joints and surface falls",
      "An exposed or under-finish waterproofing system agreed for the space"
    ],
    "extras": [
      "Lifting and replacing tiles or decking",
      "Drainage alterations, balustrade details and threshold adjustments"
    ],
    "inputs": "Area, photographs, existing floor finish, door-threshold details and access to the room below.",
    "compare": "Ask whether tiles will be lifted and whether drainage and door thresholds are included. Regrouting alone may leave a failed membrane untreated.",
    "comparisonLink": {
      "intro": "If you’re redesigning a ground-level villa terrace that opens onto a pool or garden, plan the finished levels and drainage with",
      "href": "https://halo.ae/services/landscaping-pools-dubai",
      "label": "Halo’s landscape and outdoor living team"
    }
  },
  "bathroom-wet-area-waterproofing-dubai": {
    "heading": "Bathroom waterproofing and shower leak repair",
    "included": [
      "Wet-area floor, wall junctions, shower details and pipe penetrations",
      "Preparation, compatible membrane and agreed testing before finishes"
    ],
    "extras": [
      "Tile removal and replacement",
      "Plumbing repairs, sanitaryware removal and ceiling decoration below"
    ],
    "inputs": "Bathroom layout, affected floor below, photos, pipework history and whether tiles can be removed.",
    "compare": "Confirm how the membrane around outlets and corners will be tested before tiles go back on, and check whether plumbing repairs are priced separately.",
    "comparisonLink": {
      "intro": "Once the membrane passes testing, you can arrange any tiling excluded from your quote through",
      "href": "https://halo.ae/services/tile-installation-dubai",
      "label": "Halo’s tile installation team"
    }
  },
  "polyurea-coating-dubai": {
    "heading": "Polyurea coating contractor",
    "included": [
      "Substrate preparation and repairs, primer and specified coating build-up",
      "Detailing and checks selected for exposure and the intended use"
    ],
    "extras": [
      "Removing contaminated coatings or moisture-damaged substrates",
      "Special access, containment and a UV-resistant finish where needed"
    ],
    "inputs": "Surface area, substrate type, exposure, intended service, chemicals where relevant and available shutdown time.",
    "compare": "Compare preparation, thickness, primer, UV finish and intended service conditions. Fast initial cure does not determine every return-to-service requirement."
  },
  "epoxy-industrial-flooring-dubai": {
    "heading": "Epoxy flooring contractor and installation cost",
    "included": [
      "Slab preparation, repair and the specified resin floor build-up",
      "Finish, slip resistance, coves and markings only where itemised"
    ],
    "extras": [
      "Removing old coatings, oil contamination and moisture treatment",
      "Deep slab repairs, line marking, coving and phased access"
    ],
    "inputs": "Floor area, use, traffic loads, cleaning regime, spills, current finish and allowed shutdown time.",
    "compare": "Compare the system thickness and preparation as well as price per square metre. Warehouse, car park and commercial kitchen floors have different requirements."
  },
  "thermal-insulation-heat-reflective-coating-dubai": {
    "heading": "Roof insulation and heat-reflective coating",
    "included": [
      "Roof condition, insulation requirements and specified coating layers",
      "Junction detailing, thickness and protection appropriate to the roof"
    ],
    "extras": [
      "Removing wet insulation or damaged coverings",
      "Equipment relocation, roof repairs and drainage corrections"
    ],
    "inputs": "Roof area, roof build-up, insulation details if known, current heat concerns and access.",
    "compare": "Check insulation thickness and thermal performance separately from the reflective finish. Agree the evidence needed for any energy-saving target."
  },
  "mold-remediation-indoor-air-quality-dubai": {
    "heading": "Mould removal and remediation",
    "included": [
      "Affected surfaces, moisture investigation and defined treatment zones",
      "Removal or treatment method, drying and agreed follow-up checks"
    ],
    "extras": [
      "Air sampling or laboratory tests where required",
      "Removing affected finishes, hidden contamination and leak repairs"
    ],
    "inputs": "Affected rooms, photographs, approximate extent, recurring damp or AC issues and access restrictions.",
    "compare": "Ask how the moisture source will be addressed and whether hidden affected materials, laboratory testing and reinstatement are included."
  },
  "fire-protection-coatings-dubai": {
    "heading": "Passive fire protection coating contractor",
    "included": [
      "Elements to be coated, required fire-resistance performance and product selection",
      "Preparation, application and agreed inspection records"
    ],
    "extras": [
      "Removing existing coatings and access equipment",
      "Third-party testing, authority submissions and unrelated alarm or sprinkler work"
    ],
    "inputs": "Drawings, steel or substrate details, required performance, approved specification where available and access.",
    "compare": "Compare the exact tested system, substrate and required performance. Passive coatings are a separate scope from alarms, sprinklers and active fire systems."
  },
  "leak-detection-thermal-inspection-dubai": {
    "heading": "Water leak detection and thermal inspection",
    "included": [
      "Affected areas, access and the agreed non-destructive investigation",
      "Findings, limitations and recommendations for the next repair stage"
    ],
    "extras": [
      "Opening inaccessible cavities or finishes",
      "Specialist plumbing tests, repairs and reinstatement"
    ],
    "inputs": "Leak timing, photos or video, floor plans, recent plumbing work and access to neighbouring areas if relevant.",
    "compare": "Confirm the report deliverable and limitations. A thermal anomaly is an investigation clue and needs to be interpreted with other site evidence.",
    "comparisonLink": {
      "intro": "If you’re buying a property or accepting handover and need a report that also covers finishes and building systems, see",
      "href": "https://halo.ae/services/property-inspection-dubai",
      "label": "Halo’s property inspection and snagging service"
    }
  },
  "building-envelope-waterproofing-dubai": {
    "heading": "Facade sealing and envelope waterproofing",
    "included": [
      "Affected elevations, window perimeters, movement joints and roof junctions",
      "Surface preparation, compatible treatments and agreed verification"
    ],
    "extras": [
      "Scaffolding, rope access or other specialist access",
      "Glazing replacement, structural repairs and internal decoration"
    ],
    "inputs": "Elevations, interface details, leak photos, access limitations and previous facade repair records.",
    "compare": "Check which elevations and junctions are included, and whether the quote addresses the entry route rather than only an internal stain.",
    "comparisonLink": {
      "intro": "If the inspection finds that the window assembly needs replacing, price that work separately with",
      "href": "https://halo.ae/services/window-glazing-dubai",
      "label": "Halo’s window glazing and replacement team"
    }
  },
  "indoor-air-quality-dubai": {
    "heading": "Indoor air quality assessment and testing scope",
    "included": [
      "Reported concerns, affected rooms, moisture and ventilation review",
      "Any sampling, laboratory analysis or treatment expressly listed in the proposal"
    ],
    "extras": [
      "Specialist laboratory tests and repeat sampling",
      "Duct cleaning, equipment changes and building repairs"
    ],
    "inputs": "Building use, affected rooms, AC system, maintenance history and recent leaks or refurbishment.",
    "compare": "Request the exact testing parameters, sampling locations, report and follow-up scope. Do not assume all pollutants are tested in one visit.",
    "comparisonLink": {
      "intro": "If the findings call for changes to ventilation, ductwork or AC equipment, discuss the installation scope with",
      "href": "https://halo.ae/services/mep-hvac-dubai",
      "label": "Halo’s MEP and HVAC team"
    }
  },
  "building-energy-assessment-dubai": {
    "heading": "Building energy and thermal assessment",
    "included": [
      "Agreed envelope and thermal review with available building information",
      "An improvement scope and any agreed measurement or reporting requirements"
    ],
    "extras": [
      "Specialist monitoring, detailed modelling or equipment testing",
      "HVAC replacement, controls, lighting and renewable-energy installations"
    ],
    "inputs": "Building plans, utility records, occupancy, operating hours, AC details and known comfort problems.",
    "compare": "Compare the assessment deliverables separately from installation quotations. Any proposed savings need a baseline and a verification method."
  }
};
