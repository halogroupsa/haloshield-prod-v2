import { blogImages, type BlogImageData } from "../blog-images.generated";
import { BLOG_PAGE_SIZE } from "../blogs";
import { waterproofingGuides } from "./waterproofing-guides";

type GuideLink = { href: `/${string}/${string}`; label: string };
type GuideParagraph = string | readonly (string | GuideLink)[];

export type Resource = {
  slug: string;
  title: string;
  description: string;
  service: string;
  image: BlogImageData;
  imageCaption?: string;
  publishedAt?: string;
  keywords?: readonly string[];
  relatedLinks?: readonly GuideLink[];
  sections: readonly { heading: string; body: string | readonly GuideParagraph[] }[];
};

const illustrationCaption = "AI-generated illustration based on website photo references.";
// Cloudflare Pages reported the first production deployment of these guides at 10:43:47 UTC.
const initialPublication = "2026-11-03T14:43:47+04:00";

/** New editorial guides; not presented as recovered CMS articles. */
const guides: Resource[] = [
  ...waterproofingGuides,
  {
    "slug": "waterproofing-quotation-dubai",
    "image": blogImages["waterproofing-quotation-dubai"],
    "imageCaption": illustrationCaption,
    "publishedAt": initialPublication,
    "title": "How to compare waterproofing quotations in Dubai",
    "description": "Compare waterproofing quotes by area, preparation, system, testing, exclusions and warranty. A practical checklist for Dubai property owners.",
    "service": "roof-waterproofing-dubai",
    "relatedLinks": [{ "href": "/dubai/", "label": "Waterproofing services across Dubai" }],
    "sections": [
      {
        "heading": "Start with the same scope",
        "body": "A low quotation may cover a smaller repair area, fewer details or less preparation. Give each contractor the same photographs, plans, leak history and access information. Ask each to identify the affected surfaces and explain whether the proposal treats a local defect or a larger waterproofing system."
      },
      {
        "heading": "Check what the price includes",
        "body": "Request measured quantities, substrate preparation, removal of failed materials, repairs, primer, membrane and protective finish where applicable. Include corners, upstands, penetrations, outlets and thresholds in the discussion. Ask whether access equipment, disposal, testing and reinstatement are included or separate."
      },
      {
        "heading": "Identify likely extras",
        "body": "Concealed damage, wet insulation, defective drainage and inaccessible areas can alter the work. Tile replacement, decorating the ceiling below, moving AC units and repairing plumbing may be separate items. Ask how additional work will be priced and approved, and how it affects the completion date."
      },
      {
        "heading": "Agree completion and aftercare",
        "body": "The proposal should explain verification, handover records, maintenance and written warranty terms. Compare the covered areas, exclusions and claim procedure. Before accepting a price per square metre, confirm that all quotations specify comparable preparation and system build-up."
      }
    ]
  },
  {
    "slug": "polyurea-waterproofing",
    "image": blogImages["polyurea-waterproofing"],
    "imageCaption": illustrationCaption,
    "publishedAt": initialPublication,
    "title": "Understanding polyurea waterproofing before you appoint a contractor",
    "description": "Questions to ask about polyurea waterproofing in Dubai: substrate preparation, application, UV exposure, testing and return to service.",
    "service": "polyurea-coating-dubai",
    "sections": [
      {
        "heading": "Choose the system for the use",
        "body": "Polyurea is used in waterproofing and protective coating systems, but a roof, tank, traffic deck and chemical containment area have different requirements. Share the substrate, exposure, operating conditions and intended use so the proposed specification can be checked for that application."
      },
      {
        "heading": "Preparation is part of the system",
        "body": "Ask how the surface will be cleaned, repaired and prepared, and what primer is proposed. Existing coatings, contamination and moisture can affect the approach. Corners, outlets and penetrations need defined details; a seamless field coating still needs careful treatment at its terminations."
      },
      {
        "heading": "Ask about thickness and exposure",
        "body": "Compare the specified build-up, application checks and any protective or UV-resistant finish. Request product information for the exact system proposed rather than relying on a general description of polyurea. Where tank contents or chemicals matter, check compatibility for those actual service conditions."
      },
      {
        "heading": "Plan testing and reopening",
        "body": "Initial cure and readiness for traffic, immersion or the next trade are separate questions. Agree the installation programme, inspection records and return-to-service conditions in the proposal. Ask for written warranty coverage and maintenance requirements for the installed system."
      }
    ]
  },
  {
    "slug": "mold-remediation",
    "image": blogImages["mold-remediation"],
    "imageCaption": illustrationCaption,
    "publishedAt": initialPublication,
    "title": "Planning mould remediation for a Dubai property",
    "description": "Prepare for mould remediation in Dubai: document damp, define treatment areas, address moisture and confirm what testing and reinstatement include.",
    "service": "mold-remediation-indoor-air-quality-dubai",
    "sections": [
      {
        "heading": "Record the moisture pattern",
        "body": "Note which rooms are affected, when odours or visible growth appear, and whether there has been rain ingress, a plumbing leak or condensation. Photographs and previous repair records help define the investigation. Cosmetic cleaning alone may leave the underlying moisture problem unresolved."
      },
      {
        "heading": "Define the treatment area",
        "body": "Ask which surfaces are included, how adjoining rooms and belongings will be protected and whether hidden affected finishes may need to be opened. Removal, treatment, drying and decoration are different stages. Request an explanation of what is included before comparing quotations."
      },
      {
        "heading": "Coordinate the source repair",
        "body": "The moisture source may involve waterproofing, plumbing or ventilation. Establish who will carry out each part of the work and how the sequence will be coordinated. A surface treatment proposal should not leave responsibility for the active leak unclear."
      },
      {
        "heading": "Confirm testing and follow-up",
        "body": "Laboratory sampling and repeat checks should be specified when required, with locations, parameters and reporting clearly identified. Discuss access restrictions and reinstatement with the project team. Contact Halo Shield with photographs and the history of the affected rooms to discuss the appropriate assessment."
      }
    ]
  },
  {
    "slug": "mold-testing",
    "image": blogImages["mold-testing"],
    "imageCaption": illustrationCaption,
    "publishedAt": initialPublication,
    "title": "Mould testing and indoor air quality: what to ask before booking",
    "description": "Understand the scope of mould testing and indoor air quality assessment in Dubai, including sampling, reports and follow-up requirements.",
    "service": "indoor-air-quality-dubai",
    "sections": [
      {
        "heading": "An inspection and a test have different scopes",
        "body": "A moisture inspection looks at building conditions and possible sources of damp. Air or surface sampling measures selected parameters using an agreed method. Ask the provider to explain which service is proposed and what the results can and cannot establish."
      },
      {
        "heading": "Specify the sampling plan",
        "body": "Ask which rooms or surfaces will be sampled, what will be analysed, who performs the analysis and what report you receive. Include any follow-up sampling or comparison requirements in the proposal. Different testing scopes cannot be compared only by headline price."
      },
      {
        "heading": "Share the building history",
        "body": "Provide information about recent leaks, refurbishment, AC maintenance, ventilation concerns and previous treatment. Identify areas that cannot be accessed. This context helps the assessment focus on the relevant building conditions and avoids treating a single result as a complete explanation."
      },
      {
        "heading": "Connect findings with the next action",
        "body": "Request clear next steps and responsibility for any moisture repair, HVAC work, treatment or reinstatement. Confirm what follow-up checks are included. Any specialist laboratory or accreditation requirement should be verified for the proposed provider and project."
      }
    ]
  },
  {
    "slug": "roof-leak-inspection-checklist-dubai",
    "image": blogImages["roof-leak-inspection-checklist-dubai"],
    "imageCaption": illustrationCaption,
    "publishedAt": initialPublication,
    "title": "What to send before a roof leak inspection in Dubai",
    "description": "Prepare for a Dubai roof leak inspection with photographs, plans, repair history, access details and questions about the proposed waterproofing scope.",
    "service": "leak-detection-thermal-inspection-dubai",
    "sections": [
      {
        "heading": "Photograph the pattern",
        "body": "Record affected ceilings and walls, the date, weather and whether the leak relates to AC operation or plumbing use. Include wider photographs that locate the stain within the room. Share existing observations; roof access should be arranged with the inspection team."
      },
      {
        "heading": "Collect plans and repair records",
        "body": "A roof plan, approximate area, membrane details and previous quotations help explain what has already been tried. Note roof equipment, terraces, drains and neighbouring areas that may affect access. If drawings are unavailable, say so when requesting the visit."
      },
      {
        "heading": "Agree the investigation scope",
        "body": "Ask whether the visit includes moisture readings, thermal imaging, accessible roof details and a written report. Clarify any limitations and whether opening finishes, specialist plumbing tests or repairs are separate. Agree access permissions before the appointment."
      },
      {
        "heading": "Review the repair proposal",
        "body": "Ask how the identified entry route will be treated, which areas are included and how the result will be checked. Request a breakdown of preparation, materials, details, testing and reinstatement, with the programme and warranty terms set out in writing."
      }
    ]
  }
];

const publishedTime = (guide: Resource) => Date.parse(guide.publishedAt ?? "") || 0;
// Keep editorial order for posts released together.
export const resources = guides.toSorted((a, b) => publishedTime(b) - publishedTime(a));
export const blogPageCount = Math.max(1, Math.ceil(resources.length / BLOG_PAGE_SIZE));
export const blogArchivePages = Array.from({ length: blogPageCount }, (_, index) => index + 1);

export function getBlogArchivePage(page: number) {
  return resources.slice((page - 1) * BLOG_PAGE_SIZE, page * BLOG_PAGE_SIZE);
}

export const getResource = (slug: string) => resources.find((r) => r.slug === slug);
