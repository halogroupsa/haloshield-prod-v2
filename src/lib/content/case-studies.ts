import type { caseStudyImages } from "@/lib/case-study-images.generated";
import type { VillaRenovationReferralCopy } from "@/components/page/VillaRenovationReferral";

export const projectLocations = {
  "downtown-dubai": {
    name: "Downtown Dubai",
    areaSlug: "downtown-dubai",
    description: "See how Halo Shield waterproofed the tiled Boulevard Point podium in Downtown Dubai, with before, during and after photos of the deck and its edges.",
  },
  "jumeirah-dubai": {
    name: "Jumeirah",
    areaSlug: "jumeirah",
    description: "Explore Halo Shield’s Jumeirah projects, from villa metal and flat roof coatings to waterproofing around balconies and terraces.",
  },
  "emirates-hills-dubai": {
    name: "Emirates Hills",
    areaSlug: "emirates-hills",
    description: "See Halo Shield’s work on a private villa dome and arched façade in Emirates Hills, including scaffold access and the coated exterior.",
  },
  "dubai-hills-dubai": {
    name: "Dubai Hills Estate",
    areaSlug: "dubai-hills-estate",
    description: "Explore Halo Shield case studies in Dubai Hills Estate covering flat roof preparation, roof and balcony waterproofing, and interior surface treatment.",
  },
  "al-barari-dubai": {
    name: "Al Barari",
    areaSlug: "al-barari",
    description: "See aerial views, roof channel details and spray application from Halo Shield’s Black Rock villa roof waterproofing project in Al Barari.",
  },
  dubai: {
    name: "Dubai",
    areaSlug: "dubai",
    description: "See Halo Shield’s interior project case studies in Dubai, including indoor floor application and an inspection of concealed bathtub pipework.",
  },
  "dubai-south-dubai": {
    name: "Dubai South",
    areaSlug: "dubai",
    description: "Explore Halo Shield’s Dubai South roof project, with site photos of the flat deck, air-conditioning units, pipework and perimeter walls.",
  },
  "jumeirah-park-dubai": {
    name: "Jumeirah Park",
    areaSlug: "dubai",
    description: "See Halo Shield’s Jumeirah Park villa projects, including flat roof waterproofing beside pitched tiles and treatment inside a low attic.",
  },
  "jumeirah-1-dubai": {
    name: "Jumeirah 1",
    areaSlug: "jumeirah",
    description: "See Halo Shield’s Jumeirah 1 roof coating project, with views of the roof against the Dubai skyline and the crew working at the perimeter.",
  },
  "jebel-ali-dubai": {
    name: "Jebel Ali",
    areaSlug: "dubai",
    description: "Explore roof work at Mar Thoma Church in Jebel Ali, with photos of the crew lifting and positioning ribbed metal panels.",
  },
  "nad-al-sheba-dubai": {
    name: "Nad Al Sheba",
    areaSlug: "dubai",
    description: "See the villa walkthrough and roof waterproofing at Halo Shield’s Nad Al Sheba project, including application at the parapet and corners.",
  },
  "palm-jumeirah-dubai": {
    name: "Palm Jumeirah",
    areaSlug: "palm-jumeirah",
    description: "Explore Halo Shield’s Palm Jumeirah villa roof work, with spray application across flat sections, along parapets and beneath an overhang.",
  },
  "jumeirah-islands": {
    name: "Jumeirah Islands",
    areaSlug: "dubai",
    description: "See roof preparation at a Jumeirah Islands villa where a recessed flat roof section meets pitched tiles on all sides.",
  },
} as const;

export type ProjectLocationSlug = keyof typeof projectLocations;

type ProjectPhoto = {
  image: keyof typeof caseStudyImages;
  caption: string;
  phase?: {
    label: "Before" | "During" | "After";
    title: string;
    body: string;
  };
};

export type CaseStudy = {
  location: ProjectLocationSlug;
  slug: string;
  title: string;
  description: string;
  scope: string;
  overview: {
    summary: string;
    highlights: readonly string[];
    surface: string;
    stage: string;
    image?: ProjectPhoto["image"];
  };
  service?: string;
  sections: readonly { title: string; body: string }[];
  renovationReferral?: VillaRenovationReferralCopy;
  photos: readonly [ProjectPhoto, ...ProjectPhoto[]];
};

export const caseStudies: readonly CaseStudy[] = [
  {
    location: "downtown-dubai",
    slug: "boulevard-point-podium-waterproofing",
    title: "How We Waterproofed Boulevard Point’s Tiled Podium",
    description: "See how Halo Shield waterproofed a tiled podium around pipes and parapets in Downtown Dubai, with photos before, during and after spray coating.",
    scope: "High-rise podium",
    overview: {
      summary: "Where does a tiled podium need the closest attention? At Boulevard Point, the open deck meets low parapet walls, and service pipes rise through the tiles. Follow the coating work across the podium, then use those fixed points to compare the exposed tiles with the coated deck.",
      highlights: [
        "The tile grid, drain and pipes give you reference points in the before photo.",
        "The crew’s spray passes show how the coating progressed across the tiles.",
        "The parapet base and pipes help you trace where the finished coating meets the surrounding surfaces.",
      ],
      surface: "Tiled podium",
      stage: "Before, during and after coating",
      image: "case-studies/bp-boulvard-point/07-coated-and-uncoated-sections",
    },
    service: "roof-waterproofing-dubai",
    sections: [
      {
        title: "What to look for on a tiled podium",
        body: "When you review a podium waterproofing proposal, ask how the system will continue where the deck turns up against a wall and where pipes pass through it. A wide photo shows coverage across the open deck. Close views at those junctions show how the surface changes where the coating has to meet a wall or a pipe.",
      },
    ],
    photos: [
      {
        image: "case-studies/bp-boulvard-point/01-cover-coated-roof-and-skyline",
        caption: "Light-coloured coating across the Boulevard Point podium with the Burj Khalifa beyond",
        phase: {
          label: "After",
          title: "Check the coated deck against the original layout",
          body: "The light-coloured coating extends across the main deck. The pipes and parapet walls are still visible, so you can use them to compare the coated area with the original tiled surface.",
        },
      },
      {
        image: "case-studies/bp-boulvard-point/02-roof-before-coating",
        caption: "Exposed podium tiles, a drain and a service pipe before coating",
        phase: {
          label: "Before",
          title: "Find where the deck changes",
          body: "The exposed tile grid makes the layout easy to read. Follow it to the base of the parapet and look for the drain and service pipe. Each interrupts the flat deck and needs to be accounted for when planning the work.",
        },
      },
      {
        image: "case-studies/bp-boulvard-point/03-crew-applying-coating",
        caption: "Crew spray-applying coating across the tile grid beside the parapet",
        phase: {
          label: "During",
          title: "Follow the spray passes",
          body: "The crew worked across the podium in sections. The grey coating and exposed tiles are visible in the same frame, so you can see the line between the area already coated and the next part of the deck.",
        },
      },
      { image: "case-studies/bp-boulvard-point/04-roof-application-with-burj-khalifa", caption: "Podium coating in progress with the Burj Khalifa behind the crew" },
      { image: "case-studies/bp-boulvard-point/05-spray-application-detail", caption: "Applicator spraying across the tiled surface" },
      { image: "case-studies/bp-boulvard-point/06-coated-surface-texture", caption: "Close-up of the coated texture across intersecting tile joints" },
      { image: "case-studies/bp-boulvard-point/07-coated-and-uncoated-sections", caption: "Coated and uncoated sections meet at the same parapet wall" },
    ],
  },
  {
    location: "jumeirah-dubai",
    slug: "villa-metal-and-flat-roof-waterproofing",
    title: "Metal & Flat Roof Waterproofing in Jumeirah",
    description: "Follow the waterproofing work on a Jumeirah villa, from the corrugated metal roof to the narrow flat roof around a service unit.",
    scope: "Villa roofs",
    overview: {
      summary: "This Jumeirah villa had two very different roofs to protect. On the corrugated metal roof, the crew worked across the long ribs in the open. On the flat roof, the work ran through a narrow passage between walls and around a masked service unit. The photographs follow both surfaces from preparation through application.",
      highlights: [
        "Preparation and coating across the ribs of the metal roof.",
        "Spray application around the masked service unit on the flat roof.",
        "Views of both surfaces after coating, including the flat roof’s wall junctions.",
      ],
      surface: "Corrugated metal and flat deck",
      stage: "Before, during and after coating",
    },
    service: "roof-waterproofing-dubai",
    sections: [
      {
        title: "Two roof surfaces",
        body: "The Jumeirah villa had a broad corrugated metal roof and a separate flat roof area between tall walls. The metal roof presented long ribs and open working space. On the flat roof, the equipment and narrow approach limited access.",
      },
      {
        title: "Work on the metal roof",
        body: "Photos show the crew preparing the ribbed surface and working across it in sections. A wide view after application shows the white coating following the profile of the metal sheets.",
      },
      {
        title: "Around the roof unit",
        body: "A separate sequence follows the flat roof from its exposed surface through spray application around a masked service unit. The same narrow run is visible after coating, including the junction between the floor and side walls.",
      },
      {
        title: "Two surfaces, two sets of details",
        body: "The metal roof’s ribs and sheet junctions define where the coating has to follow changes in profile. The flat roof has a different constraint. The service unit and surrounding walls leave less room to approach edges and corners. The two sequences show why each roof area is assessed on its own geometry.",
      },
    ],
    photos: [
      { image: "case-studies/villa-15-jumeirah/01-cover-metal-roof-application", caption: "Crew applying coating on the corrugated metal roof of a Jumeirah villa" },
      { image: "case-studies/villa-15-jumeirah/02-metal-roof-preparation", caption: "Crew preparing the existing corrugated roof surface" },
      { image: "case-studies/villa-15-jumeirah/03-crew-on-partially-coated-metal-roof", caption: "Crew working where coated and exposed metal roof sections meet" },
      { image: "case-studies/villa-15-jumeirah/04-coated-metal-roof", caption: "Wide view of the white coating following the roof ribs" },
      { image: "case-studies/villa-15-jumeirah/05-flat-roof-before-application", caption: "Exposed flat roof surface and masked service unit before spraying" },
      { image: "case-studies/villa-15-jumeirah/06-spray-application-around-roof-unit", caption: "Spray application around the roof service unit" },
      { image: "case-studies/villa-15-jumeirah/07-flat-roof-after-application", caption: "Coated flat roof corridor after application" },
    ],
  },
  {
    location: "emirates-hills-dubai",
    slug: "villa-dome-and-facade-waterproofing",
    title: "Villa Dome & Façade Waterproofing in Emirates Hills",
    description: "See the roof dome, arched façade and scaffolded application work at a private villa in Emirates Hills.",
    scope: "Villa dome and façade",
    overview: {
      summary: "The Emirates Hills villa has a curved roof dome above an arched façade. Halo Shield worked on both surfaces, with crew access from the dome and from scaffolding along the wall. Site photographs record the exposed exterior, work at height and the light finish visible across the dome and façade after application.",
      highlights: [
        "Direct access to the curved dome surface.",
        "Scaffolded wall application above the arched openings.",
        "Front and corner views of the exterior after coating.",
      ],
      surface: "Curved dome and arched wall",
      stage: "Before, during and after coating",
    },
    service: "building-envelope-waterproofing-dubai",
    sections: [
      {
        title: "Dome and wall surfaces",
        body: "The dome sits above a façade with a row of arched openings. Early photos show the original exterior with scaffolding in place, as well as a crew member working directly on the curved roof.",
      },
      {
        title: "Application from the scaffold",
        body: "The wall photos record work at height along the upper edge of the façade. The elevated position provided access to the section beneath the dome and to the wall surfaces above the arches.",
      },
      {
        title: "Exterior after application",
        body: "Later photos show the dome and walls in a consistent light finish. Views from the front and the corner show the shape of the roof and the façade while adjacent roof work is still visible.",
      },
      {
        title: "Where the dome meets the wall",
        body: "The curved roof, upper wall and arched openings create distinct changes in surface and working angle. A front elevation gives the overall shape, while the scaffold photograph shows the narrow upper band where the crew needed access beneath the dome. Both views help explain the extent of the exterior work.",
      },
    ],
    photos: [
      { image: "case-studies/ht-17-emirates-hills/01-cover-coated-dome-and-facade", caption: "Coated dome and arched façade at an Emirates Hills villa" },
      { image: "case-studies/ht-17-emirates-hills/02-dome-and-facade-before", caption: "Dome and exterior wall before the light-coloured finish" },
      { image: "case-studies/ht-17-emirates-hills/03-dome-surface-work", caption: "Crew member working on the curved dome surface" },
      { image: "case-studies/ht-17-emirates-hills/04-wall-application-from-scaffold", caption: "Applicator treating the upper wall from scaffolding" },
      { image: "case-studies/ht-17-emirates-hills/05-front-elevation-and-roof-work", caption: "Front elevation of the coated façade with adjacent roof work" },
      { image: "case-studies/ht-17-emirates-hills/06-ceiling-duct-detail", caption: "Exposed ceiling duct shown in the site documentation" },
    ],
  },
  {
    location: "dubai-hills-dubai",
    slug: "villa-roof-and-balcony-waterproofing",
    title: "Roof & Balcony Waterproofing in Dubai Hills",
    description: "See spray application on a Dubai Hills Estate villa roof and the coated balcony surfaces, including the narrow runs beside doors and railings.",
    scope: "Roof and balconies",
    overview: {
      summary: "The Dubai Hills Estate site record covers a flat villa roof, narrow balconies and an exterior ledge. The crew applied coating across the main roof and worked at the base of the parapet. On the balconies, the photos show the coated floor where it meets doors and railings, with a separate roller application along the ledge.",
      highlights: [
        "Spray application on the flat roof and along the parapet base.",
        "Coated balcony floors at doorways, walls and railing posts.",
        "Roller application on a narrow exterior ledge.",
      ],
      surface: "Flat roof and balcony decks",
      stage: "Application and coated surfaces",
    },
    service: "terrace-balcony-waterproofing-dubai",
    sections: [
      {
        title: "Roof and parapet work",
        body: "The roof photos follow the crew across a broad flat surface, with close views of application at the parapet base. Later views show the light-coloured finish around upstands and roof penetrations.",
      },
      {
        title: "Balcony and ledge details",
        body: "The balcony photos show coated floor surfaces where they meet the wall, doorway and railing posts. A separate close view shows a roller being used along the exposed edge of a narrow ledge.",
      },
      {
        title: "Small details around the open deck",
        body: "The roof photographs show upstands and pipe penetrations interrupting the main surface. The balcony photos show a different set of junctions at the door, wall and rail line. In both spaces, those points define the edges of the work and are worth documenting separately from the wide view.",
      },
    ],
    renovationReferral: {
      text: "If your own villa remodel includes new balcony doors or flooring, agree on the threshold height and drainage before ordering finishes. For help coordinating those decisions with the rest of the remodel, explore",
      linkText: "Halo Interiors’ turnkey villa renovation service",
    },
    photos: [
      { image: "case-studies/dh-161-dubai-hills/01-cover-coated-roof", caption: "Light-coloured roof coating around upstands on a Dubai Hills Estate villa" },
      { image: "case-studies/dh-161-dubai-hills/02-roof-spray-crew", caption: "Two crew members spray-applying coating across the flat roof" },
      { image: "case-studies/dh-161-dubai-hills/03-parapet-spray-detail", caption: "Spray application at the base of the roof parapet" },
      { image: "case-studies/dh-161-dubai-hills/04-coated-narrow-balcony", caption: "Coated narrow balcony between a doorway and railing" },
      { image: "case-studies/dh-161-dubai-hills/05-coated-corner-balcony", caption: "Coated corner balcony viewed from the doorway" },
      { image: "case-studies/dh-161-dubai-hills/06-ledge-roller-application", caption: "Roller application along a narrow exterior ledge" },
    ],
  },
  {
    location: "al-barari-dubai",
    slug: "black-rock-villa-roof-waterproofing",
    title: "Black Rock Villa Roof Waterproofing in Al Barari",
    description: "Aerial and ground-level photos show roof channels, parapets and spray application at the Black Rock project in Al Barari.",
    scope: "Villa roof",
    overview: {
      summary: "The Black Rock roof in Al Barari is split into several levels, including a recessed channel between raised sections. Aerial photographs show how those levels fit together. At roof level, Halo Shield’s crew can be seen applying coating alongside the parapet and working close to its base.",
      highlights: [
        "Aerial views of the stepped roof layout.",
        "Ground-level view of the recessed channel between roof sections.",
        "Wide and close views of spray application beside the parapet.",
      ],
      surface: "Stepped roof and recessed channel",
      stage: "Roof survey and application",
    },
    service: "roof-waterproofing-dubai",
    sections: [
      {
        title: "Roof layout",
        body: "The aerial views show how roof sections and raised walls meet at the villa. A closer roof-level view follows the recessed channel between adjoining sections and gives a sense of the narrow working space.",
      },
      {
        title: "Spray work beside the parapet",
        body: "The application photos move from a wide view along the roof edge to a close view of the spray reaching the base of the parapet. Together they show the relationship between the horizontal roof deck and the vertical wall.",
      },
      {
        title: "Working at changes in level",
        body: "In the aerial view, raised walls divide the roof into distinct areas. The roof-level photos show how that arrangement affects access beside the parapet. The spray close-up puts the wall base in context so that the application can be read alongside the wider roof layout.",
      },
    ],
    photos: [
      { image: "case-studies/black-rock-al-barari/01-cover-aerial-roof", caption: "Aerial view of the Black Rock villa roof and adjoining sections in Al Barari" },
      { image: "case-studies/black-rock-al-barari/02-roof-channel-overview", caption: "Recessed roof channel between adjoining raised sections" },
      { image: "case-studies/black-rock-al-barari/03-roof-spray-wide", caption: "Halo Shield crew applying roof coating beside the parapet" },
      { image: "case-studies/black-rock-al-barari/04-spray-application-detail", caption: "Close-up of spray application at the parapet base" },
    ],
  },
  {
    location: "dubai-hills-dubai",
    slug: "flat-roof-surface-preparation",
    title: "Flat Roof Preparation in Dubai Hills",
    description: "An in-progress look at roof waterproofing preparation in Dubai Hills Estate, from the existing surface to work at the parapet and walls.",
    scope: "Villa roof preparation",
    overview: {
      summary: "Before the coating stage, the Dubai Hills Estate crew worked on a weathered flat roof with patches and changes in level. The site photos show the floor machine used across the open deck and separate preparation along the parapet, wall base and around service fittings.",
      highlights: [
        "Existing roof survey showing uneven and weathered areas.",
        "Mechanical preparation across the main deck.",
        "Hand work at wall bases and around service penetrations.",
      ],
      surface: "Weathered flat roof",
      stage: "Preparation in progress",
    },
    service: "roof-waterproofing-dubai",
    sections: [
      {
        title: "Existing roof condition",
        body: "The roof photos show a weathered flat surface with uneven patches and debris. The deck meets a raised wall and parapet, so preparation extends beyond the open area in the centre.",
      },
      {
        title: "Preparing the deck and edges",
        body: "Crew photos show a floor machine in use on the deck and hand tools being used at wall bases and around fittings. These views record the preparation stage and show where broad surface work gives way to closer detail work.",
      },
      {
        title: "Why preparation extends up the wall",
        body: "A flat deck usually offers a clear run for a floor machine. Parapet bases and fittings interrupt that run, and the photographs show those areas being addressed separately. The preparation record is particularly useful here because the wider view alone cannot show the condition around each penetration.",
      },
    ],
    photos: [
      { image: "case-studies/dh-129-site-images/01-cover-roof-surface-preparation", caption: "Crew preparing the flat roof surface in Dubai Hills Estate" },
      { image: "case-studies/dh-129-site-images/02-existing-roof-surface", caption: "Weathered roof surface before preparation" },
      { image: "case-studies/dh-129-site-images/03-parapet-base-work", caption: "Crew member working at the roof-to-parapet junction" },
      { image: "case-studies/dh-129-site-images/04-wall-surface-preparation", caption: "Crew member preparing the wall around service penetrations" },
    ],
  },
  {
    location: "dubai",
    slug: "indoor-floor-surface-application",
    title: "Indoor Floor Surface Application in Dubai",
    description: "See indoor floor application in a Dubai property, with protective sheeting around adjacent surfaces and the room in use as a work area.",
    scope: "Interior floor",
    overview: {
      summary: "A furnished interior in Dubai was set up for floor application beside glazed doors. Protective sheeting was placed over adjacent surfaces, leaving an open working area for the applicator and hose. The photograph shows the floor while the application was underway.",
      highlights: [
        "Protective sheeting around the work area.",
        "An open route for the applicator and hose.",
        "Floor application beside glazed doors.",
      ],
      surface: "Interior floor",
      stage: "Application in progress",
    },
    sections: [
      {
        title: "Preparing the work area",
        body: "The site photo shows a furnished room set up for floor work. Protective sheeting covers the adjacent surfaces, and the route across the exposed floor is clear for the applicator and hose.",
      },
      {
        title: "Floor application in progress",
        body: "The crew member is working across the open part of the room near the glazed doors. The image captures the application stage, including the wet sheen on the floor and the sheeting beside it.",
      },
      {
        title: "Working inside a furnished room",
        body: "The room layout defines where equipment can move. The sheeting outlines the work area, and the reflected light from the doors makes the wet surface visible in the photograph. Together those details show the setup the crew was working within.",
      },
    ],
    photos: [
      { image: "case-studies/dh01/01-indoor-application", caption: "Applicator working across a floor beside protective sheeting in a Dubai property" },
    ],
  },
  {
    location: "dubai-hills-dubai",
    slug: "villa-interior-surface-treatment",
    title: "Villa Interior Treatment in Dubai Hills",
    description: "A room-by-room look at interior surface treatment in a Dubai Hills Estate villa, with photos from the living room, bedroom, bathroom and gym.",
    scope: "Villa interiors",
    overview: {
      summary: "Halo Shield worked room by room inside a furnished Dubai Hills Estate villa. The site photographs show portable equipment set up beside built-in finishes and then used in the living room, bedroom, bathroom and home gym. A separate photo shows a handheld surface check on a feature wall.",
      highlights: [
        "Portable equipment set up inside the villa.",
        "Application beside joinery, glazing and bathroom fixtures.",
        "A handheld check of the interior feature wall.",
      ],
      surface: "Furnished villa interiors",
      stage: "Setup, application and surface check",
    },
    service: "indoor-air-quality-dubai",
    sections: [
      {
        title: "Setting up inside the villa",
        body: "The team brought portable equipment into a furnished villa and set up work areas room by room. Protective coverings are visible in the bedrooms, and the setup photos show the crew handling equipment before application.",
      },
      {
        title: "Application across different rooms",
        body: "The crew used handheld equipment around living room joinery, beside bedroom finishes, around the bathroom vanity and in the home gym. The photos show how the team positioned the equipment around furniture and fixtures in each room.",
      },
      {
        title: "Surface checks",
        body: "A later view shows a technician examining a feature wall with a handheld instrument. It records an additional inspection step alongside the application photos.",
      },
      {
        title: "How access changed by room",
        body: "The living room offered an open approach beside the joinery. In the bathroom, the crew worked next to the vanity and glazed partition, while the gym equipment occupied much of the available floor space. The room-by-room views show how the placement of the application equipment changed with each layout.",
      },
    ],
    photos: [
      { image: "case-studies/dh139-dubai-hills/01-cover-living-room-application", caption: "Interior application beside living room joinery at a Dubai Hills Estate villa" },
      { image: "case-studies/dh139-dubai-hills/02-villa-exterior", caption: "Exterior of the Dubai Hills Estate villa" },
      { image: "case-studies/dh139-dubai-hills/03-onsite-equipment-setup", caption: "Technician preparing portable equipment inside the villa" },
      { image: "case-studies/dh139-dubai-hills/04-bathroom-application", caption: "Application beside a bathroom vanity and glazed partition" },
      { image: "case-studies/dh139-dubai-hills/05-bedroom-application", caption: "Crew member applying treatment beside a bedroom window" },
      { image: "case-studies/dh139-dubai-hills/06-gym-application", caption: "Crew member using portable application equipment in the home gym" },
      { image: "case-studies/dh139-dubai-hills/07-interior-surface-check", caption: "Technician checking an interior feature wall with a handheld instrument" },
    ],
  },
  {
    location: "dubai-south-dubai",
    slug: "flat-roof-around-mechanical-equipment",
    title: "Flat Roof Protection in Dubai South",
    description: "Explore a Dubai South flat roof and its light-coloured surface around air-conditioning units, pipes and perimeter walls.",
    scope: "Roof and mechanical services",
    overview: {
      summary: "This Dubai South roof has open deck areas around clusters of air-conditioning units and fixed pipework. The photographs show the light-coloured surface continuing around raised equipment bases and along the perimeter, with a close view of the pipes and their supports.",
      highlights: [
        "Wide roof views showing the open deck and its boundaries.",
        "Air-conditioning units and raised bases within the roof area.",
        "Close view of pipework and supports over the deck.",
      ],
      surface: "Flat deck with fixed equipment",
      stage: "Roof and equipment details",
    },
    service: "roof-waterproofing-dubai",
    sections: [
      {
        title: "A roof with building services",
        body: "The roof has open stretches of deck interrupted by air-conditioning units, pipes, raised bases and low walls. The wide photos show how much of the area is accessible and where the route through the roof narrows.",
      },
      {
        title: "Roof details around fixed equipment",
        body: "The close view brings the exposed pipework and supports into focus. These details matter when assessing an existing roof because access to the deck changes around fixed equipment and at the edge of each plinth.",
      },
      {
        title: "Access around permanent services",
        body: "An open roof view can make the deck look straightforward. Around fixed equipment, working clearance changes between plinths, supports and walls. The close photographs show where these features sit in relation to the roof surface and what needs to be considered when inspecting the deck.",
      },
    ],
    photos: [
      { image: "case-studies/dubai-south/01-cover-roof-overview", caption: "Wide view of the light-coloured flat roof in Dubai South" },
      { image: "case-studies/dubai-south/02-mechanical-roof-section", caption: "Roof section with air-conditioning units and raised bases" },
      { image: "case-studies/dubai-south/03-rooftop-pipework-detail", caption: "Fixed pipework and supports above the flat roof surface" },
    ],
  },
  {
    location: "jumeirah-park-dubai",
    slug: "villa-attic-and-ceiling-treatment",
    title: "Attic & Ceiling Treatment in Jumeirah Park",
    description: "See application inside a low Jumeirah Park attic and the work around an exposed ceiling grid below the roof.",
    scope: "Villa attic and ceiling",
    overview: {
      summary: "At this Jumeirah Park villa, the work took place beneath the tiled roof and above an exposed ceiling grid. One set of photographs follows spray application inside the shallow attic. A second set shows the crew working from below, around the open framing and building services.",
      highlights: [
        "Application within the low space below the roof tiles.",
        "Access between timber trusses in the attic.",
        "Work above the open ceiling grid and exposed services.",
      ],
      surface: "Attic and ceiling void",
      stage: "Application in progress",
    },
    sections: [
      {
        title: "Access beneath the tiled roof",
        body: "The attic has a shallow working height below pitched tiles and timber framing. A wide view records the exposed floor and shows where the trusses limit movement across the space.",
      },
      {
        title: "Work in the attic and above the ceiling",
        body: "The crew photos show application inside the attic, with equipment carried between roof members. A separate set documents work above an open ceiling grid, where the crew reached the space around the exposed framing and services.",
      },
      {
        title: "Reaching the roof from inside",
        body: "The attic photographs give a view across the floor beneath the sloping timber trusses. From below, the open ceiling grid provides a different route to the space around the structure and services. Seeing both access points explains why the work looks different between the two sets of photographs.",
      },
    ],
    photos: [
      { image: "case-studies/jpl-46-jumeira-park/01-cover-attic-application", caption: "Crew applying treatment beneath a low tiled roof in Jumeirah Park" },
      { image: "case-studies/jpl-46-jumeira-park/02-attic-surface-overview", caption: "Exposed attic floor and timber roof trusses" },
      { image: "case-studies/jpl-46-jumeira-park/03-attic-spray-detail", caption: "Spray application in the shallow attic" },
      { image: "case-studies/jpl-46-jumeira-park/04-open-ceiling-grid", caption: "Open ceiling grid and exposed framing below the roof" },
      { image: "case-studies/jpl-46-jumeira-park/05-work-above-ceiling-grid", caption: "Technician working above the open ceiling grid" },
    ],
  },
  {
    location: "jumeirah-park-dubai",
    slug: "villa-roof-waterproofing-beside-tiles",
    title: "Villa Roof Waterproofing in Jumeirah Park",
    description: "Follow spray coating on a Jumeirah Park villa roof, including the narrow flat area where it meets pitched roof tiles.",
    scope: "Villa roof",
    overview: {
      summary: "Halo Shield coated a narrow flat roof section at a Jumeirah Park villa, where it meets pitched roof tiles and low upstands. The sequence starts with the existing surface and rooftop equipment, then follows spray application across the deck and beside the tile junction.",
      highlights: [
        "Existing flat section documented between pitched roof areas.",
        "Spray application across the deck.",
        "Close view at the edge of the tiles and beside an upstand.",
      ],
      surface: "Flat deck beside pitched tiles",
      stage: "Existing surface and application",
    },
    service: "roof-waterproofing-dubai",
    sections: [
      {
        title: "The flat section beside the tiles",
        body: "The villa has a narrow flat roof area between low walls and pitched tiled sections. The early photo shows the existing surface, tile edges and rooftop equipment that shaped access for the crew.",
      },
      {
        title: "Application at the roof junction",
        body: "The crew applied coating across the flat section and worked close to the edges where it meets the surrounding roof. The detail photo shows the spray reaching the surface beside the tiled section while the wider view gives context for the working area.",
      },
      {
        title: "The junction between roof types",
        body: "The flat roof and pitched tile sections meet in a confined area. Low upstands, equipment and tile edges leave less room to move than on a continuous flat roof. The detail photograph places the spray pattern next to those features and shows the geometry the crew was working around.",
      },
    ],
    photos: [
      { image: "case-studies/jpl-jumeira-park/01-cover-roof-crew", caption: "Halo Shield crew coating the flat roof section of a Jumeirah Park villa" },
      { image: "case-studies/jpl-jumeira-park/02-existing-roof-and-tile-edges", caption: "Existing flat roof surface between pitched tile edges" },
      { image: "case-studies/jpl-jumeira-park/03-roof-spray-detail", caption: "Spray application beside pitched tiles and a roof upstand" },
    ],
  },
  {
    location: "jumeirah-1-dubai",
    slug: "roof-coating-and-edge-work",
    title: "Roof Coating in Jumeirah 1",
    description: "Two site views from Jumeirah 1 show the broad coated roof against the Dubai skyline and the crew working at the roof edge.",
    scope: "Roof deck and perimeter",
    overview: {
      summary: "The Jumeirah 1 site photographs show two views of a roof coating project. From a distance, the light-coloured deck can be seen against the Dubai skyline. At the perimeter, the crew is shown handling the spray hose and holding a board where the roof surfaces meet.",
      highlights: [
        "Wide view across the coated roof.",
        "Crew access at the roof perimeter.",
        "Site detail where two roof surfaces meet.",
      ],
      surface: "Open roof deck and perimeter",
      stage: "Coated deck and edge work",
    },
    service: "roof-waterproofing-dubai",
    sections: [
      {
        title: "The roof in context",
        body: "A wide view captures the light-coloured roof surface with the Dubai skyline beyond. The angle makes the scale of the open span and the change in level at the perimeter visible.",
      },
      {
        title: "Working at the edge",
        body: "A second photo shows the crew handling the spray hose and using a board at the boundary of the working area. This close view records how the team worked around the transition between adjacent roof surfaces.",
      },
      {
        title: "Reading the roof edge",
        body: "The wide view gives a sense of the deck’s span and the change in level along its boundary. The crew photograph focuses on the same kind of transition at working distance. It shows why perimeter details often need their own record alongside an overall roof photograph.",
      },
    ],
    photos: [
      { image: "case-studies/jumeira-1/01-cover-roof-and-skyline", caption: "Light-coloured roof surface in Jumeirah 1 with the Dubai skyline beyond" },
      { image: "case-studies/jumeira-1/02-rooftop-crew-at-work", caption: "Crew handling spray equipment at a roof edge in Jumeirah 1" },
    ],
  },
  {
    location: "jumeirah-dubai",
    slug: "terrace-and-balcony-waterproofing",
    title: "Terrace & Balcony Waterproofing in Jumeirah",
    description: "See a Jumeirah terrace during spray application, with views of the exposed balcony surface and the protected edges around the work area.",
    scope: "Terrace and balcony",
    overview: {
      summary: "The Jumeirah site record shows a narrow balcony beside glazing and a wider terrace enclosed by walls. On the terrace, the crew set up protective sheeting around the perimeter and worked across the open surface, bringing the spray close to the wall base.",
      highlights: [
        "Exposed balcony floor between glazing and the railing.",
        "Protected wall faces along the terrace perimeter.",
        "Spray application across the terrace and at the wall base.",
      ],
      surface: "Terrace and balcony floors",
      stage: "Existing surfaces and application",
    },
    service: "terrace-balcony-waterproofing-dubai",
    sections: [
      {
        title: "Balcony and terrace surfaces",
        body: "The site photos record an exposed narrow balcony between glazing and the railing, as well as a wider terrace bounded by walls. These two layouts show the difference between an open application area and a constrained run beside glazing.",
      },
      {
        title: "Protecting the perimeter during application",
        body: "On the terrace, the crew worked with sheeting along the perimeter and fed the hose across the open surface. The photos show the application underway at the wall base and across part of the terrace floor.",
      },
      {
        title: "Open terraces and narrow balconies",
        body: "The terrace allows the crew to approach the floor and perimeter from the open centre. On the balcony, the glazing and railing define a narrow run with fewer access points. The two views show why each floor area needs to be considered with its adjoining walls and fixtures.",
      },
    ],
    photos: [
      { image: "case-studies/jumeira-24/01-cover-terrace-application", caption: "Crew spray-applying coating across a masked Jumeirah terrace" },
      { image: "case-studies/jumeira-24/02-balcony-surface", caption: "Exposed balcony floor beside glazing and a glass railing" },
      { image: "case-studies/jumeira-24/03-terrace-application-with-skyline", caption: "Terrace application at the perimeter with nearby towers in view" },
    ],
  },
  {
    location: "jebel-ali-dubai",
    slug: "mar-thoma-church-metal-roof-works",
    title: "Mar Thoma Church Metal Roof Works",
    description: "See metal roof works at Mar Thoma Church in Jebel Ali, from hoisting ribbed panels to positioning them on the roof.",
    scope: "Church metal roof",
    overview: {
      summary: "The roof work at Mar Thoma Church in Jebel Ali involved moving ribbed metal panels onto a broad roof span. Site photos show the crane lift, the crew positioning panels and the meeting edges between them. A wide view records the roof profile on both sides of the ridge.",
      highlights: [
        "Crane lift to bring ribbed panels to roof level.",
        "Crew positioning panels across the roof.",
        "Close views of panel edges and the roof ridgeline.",
      ],
      surface: "Ribbed metal roof panels",
      stage: "Lifting and placement",
    },
    service: "roof-waterproofing-dubai",
    sections: [
      {
        title: "Handling ribbed panels",
        body: "The work at Mar Thoma Church involved ribbed metal roof panels on a large roof span. The photos show panels lifted to roof level by crane while the crew guided them into the working area.",
      },
      {
        title: "Placing panels across the roof",
        body: "The crew positioned the panels on the roof and worked close to the meeting edges. A wider view shows the roof ridgeline and the repeated panel profile across both slopes.",
      },
      {
        title: "From the lift to the roof surface",
        body: "Hoisting gets the panels to roof level, where they still have to be guided into position relative to the existing roof and the adjacent sheets. The wider and closer photographs show this change in scale, from the overall roof span to the edges where the panels meet.",
      },
    ],
    photos: [
      { image: "case-studies/marthoma-church/01-cover-metal-roof-overview", caption: "Wide view along the ribbed metal roof at Mar Thoma Church in Jebel Ali" },
      { image: "case-studies/marthoma-church/02-roof-crew-wide", caption: "Crew working across the church roof" },
      { image: "case-studies/marthoma-church/03-roof-panel-hoist", caption: "Roof panels lifted into position by crane" },
      { image: "case-studies/marthoma-church/04-roof-panel-placement", caption: "Crew positioning metal roof panels across the existing roof" },
      { image: "case-studies/marthoma-church/05-roof-panel-detail", caption: "Close view of the crew working at the meeting edge of a panel" },
    ],
  },
  {
    location: "dubai",
    slug: "bathtub-and-pipework-inspection",
    title: "Bathtub & Pipework Inspection in Dubai",
    description: "See how a Dubai bathroom inspection reached the concealed space beneath a bathtub, with photos of the access opening and exposed pipework.",
    scope: "Bathroom and pipework",
    overview: {
      summary: "A tiled surround enclosed the underside of this bathtub in Dubai. The technician worked through an access opening beside the bath, where concealed pipework and fittings came into view. The photographs show the position of the opening and what could be reached through it.",
      highlights: [
        "Inspection through the access opening beside the bath.",
        "Close views of concealed pipework and fittings.",
        "Wider view of the space behind the tiled surround.",
      ],
      surface: "Bathtub surround and pipework",
      stage: "Inspection",
    },
    service: "leak-detection-thermal-inspection-dubai",
    sections: [
      {
        title: "Access below the bathtub",
        body: "The bathtub is boxed in by a tiled surround. The photos show a technician working at the access opening and give context for its position relative to the tub and bathroom floor.",
      },
      {
        title: "What the opening exposed",
        body: "Close views show pipework, fittings and the void behind the tiled face. They document the parts of the installation that become visible through the opening during a targeted wet-area inspection.",
      },
      {
        title: "What access reveals",
        body: "From the bathroom, the visible surfaces are the tub and its tiled surround. The opening gives a line of sight to fittings and the space beneath the bath. This distinction is useful when investigating a wet-area issue because the visible finish tells only part of the story.",
      },
    ],
    photos: [
      { image: "case-studies/mpr/01-cover-bathtub-overview", caption: "Bathtub and tiled surround with an inspection opening" },
      { image: "case-studies/mpr/02-bathtub-inspection", caption: "Technician inspecting the space below the bathtub" },
      { image: "case-studies/mpr/03-access-opening-detail", caption: "View into the access opening showing concealed pipework" },
      { image: "case-studies/mpr/04-under-bathtub-overview", caption: "Wider view of the space and fittings beneath the bathtub" },
    ],
  },
  {
    location: "nad-al-sheba-dubai",
    slug: "villa-roof-waterproofing-and-inspection",
    title: "Villa Roof Waterproofing in Nad Al Sheba",
    description: "Follow a Nad Al Sheba villa from the roof and interior walkthrough to spray application at the roof deck, parapets and corners.",
    scope: "Villa roof and inspection",
    overview: {
      summary: "Halo Shield’s Nad Al Sheba project records a villa walkthrough followed by spray application on the flat roof. The walkthrough documented the exterior, roof perimeter and selected interior surfaces. During roof work the crew protected the surrounding walls and applied coating across the deck and into the corners.",
      highlights: [
        "Roof and interior walkthrough before the application photographs.",
        "Protective sheeting along the roof perimeter.",
        "Spray application on the open deck, at corners and at the parapet base.",
      ],
      surface: "Flat villa roof and parapets",
      stage: "Inspection and application",
    },
    service: "roof-waterproofing-dubai",
    sections: [
      {
        title: "Walkthrough of the property",
        body: "Early photos document the flat roof, the villa exterior and selected interior areas. The inspection views include the roof perimeter and interior surfaces checked with a handheld instrument.",
      },
      {
        title: "Spray application at the roof perimeter",
        body: "During application, sheeting protected the walls around the roof deck. The crew worked across the open surface and changed position to reach the corners and the base of the parapet, where the deck meets the wall.",
      },
      {
        title: "From walkthrough to application",
        body: "The walkthrough gives the roof perimeter and adjacent spaces context before the work photos move closer to the deck. The spray sequence then shows the crew changing position to reach the wall base and corners. Those views tie the general inspection to the specific area being coated.",
      },
    ],
    photos: [
      { image: "case-studies/nad-al-sheba/01-cover-roof-spray-crew", caption: "Halo Shield crew spray-coating a flat villa roof in Nad Al Sheba" },
      { image: "case-studies/nad-al-sheba/02-villa-front-elevation", caption: "Front elevation of the Nad Al Sheba villa" },
      { image: "case-studies/nad-al-sheba/03-roof-corner-spray-detail", caption: "Crew applying coating at a roof corner and parapet base" },
      { image: "case-studies/nad-al-sheba/04-roof-walkthrough", caption: "Walkthrough view along the flat roof and parapet" },
      { image: "case-studies/nad-al-sheba/05-interior-with-protective-wrap", caption: "Protected furniture in the villa interior during the site walkthrough" },
      { image: "case-studies/nad-al-sheba/06-interior-inspection", caption: "Technician inspecting an interior surface" },
      { image: "case-studies/nad-al-sheba/07-courtyard-and-pool", caption: "Villa courtyard and pool shown during the property walkthrough" },
    ],
  },
  {
    location: "palm-jumeirah-dubai",
    slug: "villa-roof-parapet-waterproofing",
    title: "Villa Roof & Parapet Waterproofing on Palm Jumeirah",
    description: "See how the crew applied roof coating on Palm Jumeirah at parapet bases, across flat sections and beneath an overhang.",
    scope: "Villa roof and parapet",
    overview: {
      summary: "The Palm Jumeirah villa roof combines flat sections with low parapets, shallow upstands and an overhang. The crew sprayed across the open roof and moved in close to work along the parapet base. Below the overhang, the photographs show the tighter access around the same kind of roof junction.",
      highlights: [
        "Spray application along the roof parapet.",
        "Coverage across flat sections beside raised details.",
        "Application under the low overhang.",
      ],
      surface: "Flat deck, parapets and upstands",
      stage: "Application in progress",
    },
    service: "roof-waterproofing-dubai",
    sections: [
      {
        title: "Roof sections with changes in access",
        body: "The villa roof combines shallow upstands, low parapets and an overhang. The wide view shows the applicator working between these raised details and the exposed parts of the flat roof.",
      },
      {
        title: "Working along edges and under cover",
        body: "The crew moved the spray across the surface and brought it in close at the parapet base. The photos from beneath the overhang show how the team adjusted its working position where overhead space was limited.",
      },
      {
        title: "Coating where the roof changes shape",
        body: "Low walls and upstands split the roof into shorter working runs. The exposed deck has room to approach each detail from several directions, while the overhang limits where the applicator can stand. The close views show how the crew reached the junctions in each area.",
      },
    ],
    photos: [
      { image: "case-studies/p22-palm-jumeirah/01-cover-roof-parapet-application", caption: "Spray application along a villa roof parapet on Palm Jumeirah" },
      { image: "case-studies/p22-palm-jumeirah/02-spray-across-roof-section", caption: "Applicator spraying across a flat roof section beside an upstand" },
      { image: "case-studies/p22-palm-jumeirah/03-application-under-overhang", caption: "Roof coating being applied beneath a low overhang" },
    ],
  },
  {
    location: "jumeirah-islands",
    slug: "villa-roof-preparation",
    title: "Villa Roof Preparation in Jumeirah Islands",
    description: "See the roof layout and on-site preparation at a Jumeirah Islands villa with a recessed flat section surrounded by pitched tiles.",
    scope: "Pitched and flat villa roof",
    overview: {
      summary: "At this Jumeirah Islands villa, a small flat roof section sits below the surrounding pitched tiles. The exterior photograph gives the full roof form and the higher views show the crew inside the recess. The documented work focuses on the existing roof layout and on-site preparation.",
      highlights: [
        "Exterior survey showing the pitched roof.",
        "Recessed flat section documented from above.",
        "Crew working beside the pitched tiles within the recess.",
      ],
      surface: "Recessed flat deck and pitched tiles",
      stage: "Preparation in progress",
    },
    service: "roof-waterproofing-dubai",
    sections: [
      {
        title: "A recessed section within the roof",
        body: "The villa exterior shows the pitched roof form. From above, a small flat section sits within the tiled roof and is bounded by low walls on each side.",
      },
      {
        title: "Crew access to the flat section",
        body: "The site photos show the crew working within the recess beside the pitched tiles. The elevated view shows the limited working area and the way the flat section meets the surrounding roof.",
      },
      {
        title: "The recessed section",
        body: "The flat area has a small footprint but several short walls where it meets the pitched roof around it. The high view shows the position of those transitions. The crew photo shows how much of the available space they occupy while working within the recess.",
      },
    ],
    photos: [
      { image: "case-studies/villa-07-jumeira/01-cover-villa-exterior", caption: "Exterior of the villa in Jumeirah Islands" },
      { image: "case-studies/villa-07-jumeira/02-roof-and-skyline", caption: "Recessed flat roof section surrounded by pitched tiles" },
      { image: "case-studies/villa-07-jumeira/03-roof-crew-at-work", caption: "Crew working in the recessed roof section beside the tiles" },
    ],
  },
];

export const projectLocationSlugs = Object.keys(projectLocations) as ProjectLocationSlug[];

export function getProjectLocation(slug: string) {
  return projectLocationSlugs.find((location) => location === slug);
}

export function projectLocationPath(location: ProjectLocationSlug) {
  return `/projects/${location}/`;
}

export function caseStudyPath(project: CaseStudy) {
  return `${projectLocationPath(project.location)}${project.slug}/`;
}

export const projectPhotoId = (index: number) => `project-photo-${index + 1}`;

export function caseStudyTimeline(project: CaseStudy) {
  return (["Before", "During", "After"] as const).flatMap((label) => {
    const index = project.photos.findIndex((photo) => photo.phase?.label === label);
    const photo = project.photos[index];
    return photo?.phase ? [{ photo, id: projectPhotoId(index), ...photo.phase }] : [];
  });
}

export function caseStudiesInLocation(location: ProjectLocationSlug) {
  return caseStudies.filter((project) => project.location === location);
}

export function caseStudiesForArea(areaSlug: string) {
  return caseStudies.filter((project) => projectLocations[project.location].areaSlug === areaSlug);
}
