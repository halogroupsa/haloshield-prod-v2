import type { BlogImageData } from "@/lib/blog-images.generated";
import { imageSrc } from "@/lib/image-src";
import { images, type ImageName } from "@/lib/images";
import type { Resource } from "./resources";

const editorialDate = "2026-11-11T13:05:00+04:00";

function guideImage(name: ImageName, alt: string): BlogImageData {
  const { w, h, widths } = images[name];
  return {
    src: imageSrc(name),
    srcSet: widths.map((width) => `${imageSrc(name, width)} ${width}w`).join(", "),
    width: w,
    height: h,
    alt,
  };
}

export const waterproofingGuides: readonly Resource[] = [
  {
    slug: "villa-roof-leak-repair-dubai-patch-or-replace",
    title: "Villa roof leak repair in Dubai: patch or replace?",
    description: "A recurring roof leak does not always mean replacing the whole roof. Learn when a patch makes sense and what a Dubai contractor should put in writing.",
    service: "roof-waterproofing-dubai",
    publishedAt: editorialDate,
    keywords: ["local roof patch", "roof membrane replacement", "roof leak repair quote", "villa roof waterproofing cost"],
    image: guideImage(
      "case-studies/villa-15-jumeirah/01-cover-metal-roof-application",
      "Halo Shield crew applying coating to a corrugated villa roof in Jumeirah",
    ),
    imageCaption: "Halo Shield applying a coating to the metal roof of a Jumeirah villa. The project also included a separate flat roof section.",
    sections: [
      {
        heading: "When the ceiling stain comes back",
        body: [
          "The ceiling has been painted twice. Then it rains and the same brown patch appears again. If you own a villa in Dubai, the next decision is whether to pay for another local repair or replace the waterproofing across a larger section of roof.",
          "A patch makes sense when the entry point can be isolated and the surrounding waterproofing is still sound. Re-waterproofing a wider section makes more sense when faults are scattered, previous repairs keep failing, or the underlying layers are wet. Before choosing either, ask the contractor to show you what led to that conclusion.",
        ],
      },
      {
        heading: "Ask the contractor to show where the water got in",
        body: [
          "The stain gives the inspector a starting point. Water can move under a roof finish or along a slab before it appears indoors. Ask for photos of the relevant roof area, including outlets, wall junctions, pipe penetrations and old repair patches. Mention whether the stain follows rain or appears on dry days when the AC runs.",
          [
            "When the route is unclear, a ",
            { href: "/services/leak-detection-thermal-inspection-dubai/", label: "leak detection and thermal inspection" },
            " can help narrow the search. Ask which areas the inspector can reach and whether the quotation includes any opening-up needed to confirm the condition beneath the surface.",
          ],
        ],
      },
      {
        heading: "When a patch can save you money",
        body: [
          "Imagine the inspection finds one failed detail around a roof pipe, with the adjacent membrane well bonded and the rest of the area in good condition. A local repair can keep the work and disruption small. The proposal should show the location, how far the repair extends, and how it will connect to the existing system.",
          "If several previous patches are lifting, the membrane has separated in multiple places, or moisture is trapped underneath, ask the contractor to price the affected roof section. That gives you something to compare with the patch price. Ask where the wider repair stops, especially when a flat slab meets metal roofing or a raised equipment base.",
        ],
      },
      {
        heading: "Compare the price by scope",
        body: [
          [
            "Ask for separate lines for access, removal, substrate repairs, waterproofing, details around drains and pipes, testing, and reinstatement. A lower total may cover a smaller area or exclude work that the other contractor has included. Our ",
            { href: "/blogs/waterproofing-quotation-dubai/", label: "guide to comparing waterproofing quotes" },
            " gives you a checklist to use when both proposals arrive.",
          ],
          [
            "The ",
            { href: "/projects/jumeirah-dubai/villa-metal-and-flat-roof-waterproofing/", label: "Jumeirah villa roof case study" },
            " shows why this matters. The crew had space to work across the corrugated roof, while the flat section required application around a service unit in a narrow passage. Both were roof work, but they presented different access and detailing requirements.",
          ],
        ],
      },
      {
        heading: "Get a scope you can sign off",
        body: [
          "Ask the contractor to mark the repair boundary on a photo or plan. Then ask what will be checked at handover and what the written warranty covers if water appears at the same spot again. Keep the marked-up photo with your quote so everyone is working from the same scope.",
          [
            "If your villa has a recurring ceiling stain, use Halo Shield’s ",
            { href: "/services/roof-waterproofing-dubai/", label: "Dubai roof waterproofing and leak repair service" },
            " to discuss the roof with an engineer. Share a photo of the stain, the date it last appeared, and any previous repair records.",
          ],
        ],
      },
    ],
  },
  {
    slug: "balcony-leak-repair-dubai-keep-or-remove-tiles",
    title: "Balcony leak repair in Dubai: can you keep the tiles?",
    description: "Find out when a Dubai balcony repair can retain existing tiles, when they need lifting, and what to ask about drains, thresholds and reinstatement.",
    service: "terrace-balcony-waterproofing-dubai",
    publishedAt: editorialDate,
    keywords: ["balcony waterproofing without removing tiles", "terrace waterproofing over tiles", "balcony repair quotation", "leaking balcony door threshold"],
    image: guideImage(
      "case-studies/jumeira-24/01-cover-terrace-application",
      "Halo Shield crew applying waterproofing on a Jumeirah terrace beside a protected wall",
    ),
    imageCaption: "Waterproofing application on a Jumeirah terrace, with the wall protected during the work.",
    sections: [
      {
        heading: "You might be able to keep the tiles",
        body: [
          "The neighbour downstairs sends a photo of a ceiling stain. You step onto the balcony and the tiles look fine. Before agreeing to a full strip-out, ask the contractor to explain how they will identify where the water enters and which parts of the floor they need to reach.",
          "Retaining tiles may be practical if they are well bonded and a compatible system can connect to the drain, the wall edges and the sliding door threshold. Lifting some or all of the tiles may be necessary if the floor is loose, water is sitting underneath, the falls need rebuilding or the existing membrane needs replacement.",
        ],
      },
      {
        heading: "Check the drain, the door and the edges",
        body: [
          "A clean-looking tile field tells you little about what happens at its edges. Look from inside the doorway for water tracks, and tell the contractor where puddles remain after rain. If you can see the underside of the balcony or the room below, send photos that show where the stain sits in relation to the door and the outlet.",
          [
            "Ask whoever quotes the work to mark the proposed details for the outlet, the base of the walls and any railing fixings that penetrate the deck. Halo Shield’s ",
            { href: "/services/terrace-balcony-waterproofing-dubai/", label: "terrace and balcony waterproofing service" },
            " explains the scope to discuss for apartment balconies, villa terraces and roof gardens.",
          ],
        ],
      },
      {
        heading: "What an over-tile proposal should explain",
        body: [
          "Ask how the contractor will check whether the existing tiles are suitable for the proposed system. Then look at the finished floor level. A new layer can reduce the clearance below the door and change how the floor meets the outlet. The quote should explain how the new surface will drain and how you will use and maintain the finished balcony.",
          [
            "The ",
            { href: "/projects/jumeirah-dubai/terrace-and-balcony-waterproofing/", label: "Jumeirah terrace and balcony case study" },
            " shows the difference between working on an open terrace and working in a narrow run alongside glazing. Use those photos to ask how your contractor will reach and protect the edges on your property.",
          ],
        ],
      },
      {
        heading: "If the tiles come up, who puts everything back?",
        body: [
          "Ask whether the quote includes lifting and disposal, repairs to the substrate, any corrections to falls, waterproofing, agreed testing, replacement tiles and reinstatement at the doorway. If a close tile match is important, agree the replacement finish before the existing floor comes out.",
          "For an apartment, ask building management about contractor access and whether the unit below can be inspected. Confirm who will arrange any agreed water testing and when the balcony can reopen. Those arrangements can affect the programme just as much as the area of the floor.",
        ],
      },
      {
        heading: "If the leak is only at the sliding door",
        body: [
          [
            "Water at the door might be entering at the threshold or frame, or it may be tracking there from the balcony. If the cause is unclear, start with ",
            { href: "/services/leak-detection-thermal-inspection-dubai/", label: "leak detection and inspection" },
            " before signing off on the floor work. Ask the inspector to show which parts of the deck, outlet and door junction they assessed and what they found.",
          ],
          "For a useful quote, send photos of the whole balcony, the drain, the sliding door threshold and the stain below. Add the approximate area, the building or community and when you first noticed the leak.",
        ],
      },
    ],
  },
  {
    slug: "basement-leak-repair-dubai-when-is-injection-enough",
    title: "Basement leak repair in Dubai: when is injection enough?",
    description: "Compare crack injection and wider basement waterproofing in Dubai. Learn what the contractor should inspect, quote and verify after repair.",
    service: "basement-waterproofing-dubai",
    publishedAt: editorialDate,
    keywords: ["basement crack injection Dubai", "basement wall leak repair", "basement tanking quote", "water through basement wall floor joint"],
    image: guideImage(
      "moisture-meter-wall-inspection",
      "Halo property inspector taking a moisture reading on an interior wall",
    ),
    imageCaption: "An interior moisture check. Readings help map affected areas alongside observations from the site inspection.",
    sections: [
      {
        heading: "Start by asking what the injection is meant to stop",
        body: [
          "A wet line appears where the basement wall meets the floor. One contractor proposes injecting the joint. Another prices waterproofing across the whole wall and floor. Those quotes may address different problems, even though they started with the same photo.",
          "Injection can suit a defined crack, joint or other local entry point. A wider solution may be needed when seepage shows up along several joints, the wall stays damp over a broad area, or water returns beside a previous repair. Ask the contractor to show where the water is entering and which area their proposal covers.",
        ],
      },
      {
        heading: "A wet basement does not always mean groundwater",
        body: [
          "Make a simple record before the visit. Note whether the water appears after rain, after irrigation, or even when both have been off. In a basement car park, tell the inspector if the wet area is under a planter, a podium deck or an exposed ramp. Also share any plumbing and drainage history.",
          [
            "The pattern helps the engineer decide which possibilities to check. An ",
            { href: "/services/leak-detection-thermal-inspection-dubai/", label: "investigation of the leak and moisture pattern" },
            " can help focus the inspection. Ask what is known about the entry route, which areas could not be accessed, and what might need a separate plumbing or drainage check.",
          ],
        ],
      },
      {
        heading: "When to ask for a wider waterproofing option",
        body: [
          "If water is appearing at several places along the same wall or wall-to-floor joint, ask how the proposal handles the sections between the visible leaks. The quotation should say whether the contractor is treating a single entry point, a run of joints or a continuous wall and floor area.",
          [
            "Where the outside face of a wall is inaccessible, ask which approaches can be installed from inside and what they are designed to resist. Halo Shield’s ",
            { href: "/services/basement-waterproofing-dubai/", label: "basement and foundation waterproofing service" },
            " covers the options to discuss after inspection, including local injection and tanking, which creates a continuous waterproof barrier.",
          ],
        ],
      },
      {
        heading: "Ask what the price excludes",
        body: [
          [
            "For a villa basement, clarify who removes and reinstates skirting, joinery or finishes around the repair. For occupied parking, ask whether access, bay closures or drainage work are included. A local injection quote and a wall-and-floor waterproofing quote should each describe their scope clearly. Use the ",
            { href: "/blogs/waterproofing-quotation-dubai/", label: "waterproofing quotation checklist" },
            " to compare inclusions and exclusions.",
          ],
          "Ask what happens if the inspection exposes a longer affected joint or an area of damaged concrete. Agree how extra work would be quoted and approved before the contractor proceeds.",
        ],
      },
      {
        heading: "Decide how the repair will be checked",
        body: [
          "Ask the contractor to record where they worked and what can be verified at handover. If the seepage only appeared under certain conditions, agree when the area will be reviewed again and who to contact if water returns.",
          [
            "If your basement is already wet, share a wide photo, a close photo and a short video showing when and where water appears. Note the community and whether the area is in use. The ",
            { href: "/services/basement-waterproofing-dubai/#book", label: "basement assessment form" },
            " is a starting point for discussing the site before you compare repair options.",
          ],
        ],
      },
    ],
  },
];
