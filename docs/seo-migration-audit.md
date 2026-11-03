# Halo Shield: old-site comparison and SEO implementation

Reviewed and implemented on 23 October 2026. Changes are local; nothing was deployed.

## Coverage and outcome

Reviewed all **45 known static pages** defined by the previous site's router and page data: home, contact, privacy, terms, resources, eight solutions, 21 industry audiences and 11 company/location pages. Also inspected the shared templates, custom location/About sections, enquiry behavior, project galleries and embedded guide links.

`migration-pages.csv` records a destination and decision for every static page. `legacy-guide-links.csv` covers the three guide URLs embedded in the old About section. The finished staging export has **80 public content pages**.

| Gap | Implemented result |
| --- | --- |
| 21 industry pages redirected to three broad sectors | Restored every original audience URL with applications, a distinct project brief, delivery requirements, linked services and FAQs. The three sector pages remain as directories. |
| Building envelope redirected to villa waterproofing | Added a dedicated building envelope/facade service, covering walls, windows, skylights, joints and interfaces. |
| Indoor air quality combined with mould remediation | Added a separate indoor air quality service. Kept the existing mould URL, with a clearer mould removal/remediation title and scope. |
| Building energy reduced to roof insulation | Added an energy/thermal assessment page and linked it with insulation and envelope services. Equipment, controls and other specialist installation work require a separately agreed scope. |
| Dubai company page redirected to the general areas directory | Added `/areas/dubai/` and mapped the original Dubai URL directly to it. Existing six other emirate destinations remain available because they were part of the old site. Dubai remains the keyword research focus. |
| Careers redirected to About | Added a careers page with relevant role areas and a working email enquiry link. No old vacancy is presented as currently open. |
| Resources and every resource URL redirected to FAQ | Restored the listing at `/blogs/` and added five new planning guides. The former `/resources/` listing and five known article URLs redirect directly to `/blogs/`. Removed the blanket article-to-FAQ redirect. Original CMS articles remain an unresolved recovery item below. |
| Old About guide cards linked to unimplemented `/blog/*` routes | Added explicit redirects for polyurea, mould remediation and mould testing to new guides on those subjects. These are new articles, not a claim to recover the original text. |
| Mission, vision, careers and guide links missing from About | Restored these sections and navigation. |
| Some old gallery examples missing | Restored under-roof insulation, corridor flooring, facade protection and terrace examples using assets already present in the project. The gallery now contains 14 examples. |
| Email/message details absent from the enquiry form | Added optional email and project details, preserved them in the WhatsApp handoff and checked input validation. |

All **15 service pages** now explain quotation scope, possible extras, information to send, comparison points, changes to price/programme, testing, handover and warranty questions. Assessment pages use an investigation/reporting process instead of implying that every assessment includes membrane installation.

## Keyword research

`commercial-keyword-map.csv` maps **48 keyword candidates** to the homepage and service pages. P1/P2 reflects our assessment of relevance and buying intent, not a measured ranking or guaranteed lead value.

Research combines the supplied `keywords_planner` catalogues with current competitor search results and service pages. Queries containing contractor, company, installation, removal and repair indicate a likely enquiry; price searches support quotation research. This intent classification is an inference.

Priority themes include waterproofing contractors/company Dubai, roof waterproofing and roof leak repair, villa and basement waterproofing, pool/tank waterproofing, balcony/bathroom leaks, polyurea application, epoxy flooring contractors, mould removal and water leak detection. Envelope, insulation, air quality, energy assessment and passive fire coatings have supporting targets.

The existing exact-match Planner evidence includes:

| Keyword | Historical UAE average monthly searches | Snapshot |
| --- | ---: | --- |
| epoxy flooring Dubai | 590 | 11 September 2026 |
| epoxy flooring price in Dubai | 110 | 11 September 2026 |
| epoxy flooring companies in Dubai | 30 | 11 September 2026 |
| epoxy flooring contractors in Dubai | 10 | 11 September 2026 |
| indoor air quality testing | 30 | 9 July 2026 |

These are **historical UAE figures**, not current Dubai city volumes. The CSV keeps each source file and snapshot timestamp. Bid values retain the source's currency label; account currency has not been independently verified. Zero reported bids do not establish zero commercial value. Blank cells mean no exact-match metric was available, not zero demand.

Attempted the supplied Google Ads API research script with 20 waterproofing/protection seeds. Authentication could not reach `accounts.google.com` because hostname resolution is restricted in the execution environment. No Ads settings or spend were changed. `keyword-planner-seeds.json` preserves the seeds for a fresh run when API connectivity is available.

### Competitor evidence

These sources appeared during commercial query research. Their presence does not establish an exact Dubai-local Google position or independently validate their promotional claims. No competitor credentials, project counts, prices or warranties were copied as Halo claims.

- [Universal Roofing](https://www.roofing.ae/): service coverage and project-led navigation across roofs, polyurea, tanks and floors.
- [OFIXO polyurea service](https://ofixotech.com/services/waterproofing/roof-waterproofing/polyurea-coating/): specialist application terminology and specification questions.
- [The Leak Lab basement service](https://theleaklab.ae/basement-waterproofing-dubai): source diagnosis, repair limitations and warranty-scope questions.
- [Al Shirawi waterproofing](https://wp.alshirawicontracting.com/): envelope, substructure and joint-related service coverage.
- [Maawa water tank service](https://www.maawa.ae/services/water-tank-waterproofing): tank use, lining and adjacent service intent.
- [EPSCO indoor air quality](https://epsco-intl.com/indoor-air-quality-testing/): separate testing intent from treatment.
- [Mold Busters](https://moldbusters.ae/): inspection, removal and remediation vocabulary.
- [Thermilate fire coatings](https://thermilate.ae/service/fire-retardant-coating/): passive coating/applicator intent, distinct from active fire systems.
- [Cornerstone](https://www.cornerstonemiddleeast.com/): assessment, envelope and thermal/HVAC investigation terminology.

## Items that remain unresolved

1. **Original CMS articles:** the old site fetched these from `elegant-card-49a1c279cb.strapiapp.com`. Article bodies and slugs are not in the supplied repository. The endpoint failed through the available network/browser paths, including an SSL/cipher error in the browser. A CMS export or accessible backup is required to recover and verify every original article URL, body and image. The five new guides do not close this recovery gap. Unknown article URLs are not blanket-redirected to an unrelated FAQ page.
2. **Fresh keyword metrics:** rerun the preserved seeds through the supplied Planner script once Google Ads API connectivity works. New target phrases without historical exact-match evidence are explicitly labelled as intent-led seeds.
3. **Existing business claims:** the current site already contains ratings, property/project totals, DM approval, response-time commitments and LuxGuard performance/warranty figures. This source comparison is not independent proof of those claims. Conflicting old history/team totals, expired-looking job listings, security-clearance claims and guaranteed savings were not added back. Confirm operational claims and product documentation before launch.
4. **Host behavior:** redirect destinations and conflicting rules were checked in the export. Real HTTP 301 behavior must be verified on the intended hosting environment after deployment.

## Validation

- `npm run build:webpack`: passed; full static export generated.
- `npx tsc --noEmit`: passed.
- `npm run lint`: zero errors; one existing Google Tag Manager recommendation in `layout.tsx`.
- `python3 scripts/verify-export.py`: all 80 pages and 45 known old static routes passed, with no errors or warnings. Checks include headings, unique metadata, canonical URLs, staging noindex, JSON-LD, visible FAQ/schema consistency, internal pages/assets/anchors, sitemap coverage and 67 redirect rules.
- Browser checks: service hero at desktop and 390px mobile width; mobile quotation form, email validation, industry directory and restored warehouse page. No horizontal overflow in the inspected views. See `browser-verification.json` for the final recorded scope.
- Enquiry handler check: optional email/message and special characters preserved, correct WhatsApp destination and page context, no contact fields in the analytics event, `noopener` retained. No live enquiry sent. Results are in `enquiry-verification.json`.

The normal Turbopack build is blocked here because its CSS worker cannot bind a local port under the execution restrictions. Added an equivalent Webpack build command using the existing Tailwind loader. Also self-hosted the existing cached Geist Mono Latin font, with its license, so production compilation no longer depends on downloading it from Google Fonts. The normal development/build commands remain available.

Staging indexing protection remains enabled. Existing unrelated edits to `.gitignore` and the hero cursor hint were preserved.

## Blog URL update

The blog listing and all five articles now use `/blogs/` and `/blogs/[slug]/`. Updated internal links, navigation labels, breadcrumbs, canonical/Open Graph URLs, Article schema identifiers and sitemap entries. Previous resources URLs and known legacy blog links redirect directly to their new destinations without a redirect chain.

## Blog photography update

Added five AI-generated editorial illustrations using existing website photographs as references for people, workwear and equipment. Each uses a different composition, setting and palette. Added responsive images to all five blog cards and articles, with alt text, accurate dimensions, article/social image metadata and image sitemap entries. Article captions identify them as generated illustrations. Original generated images are retained, with references documented in `blog-image-provenance.json`; checks are in `blog-image-verification.json`.
