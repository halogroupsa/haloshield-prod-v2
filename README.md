# Halo Shield — haloshield.ae (v2)

Static Next.js 16 site for Halo Shield, a waterproofing & property protection company in Dubai.
Exports to plain HTML and deploys to Cloudflare Pages.

**Cloudflare Pages settings:** build command `npm run check`, output directory `out`, Node 24 (pinned via `.nvmrc`).

## Run

```bash
npm ci
npm run dev          # http://localhost:3000
npm run build:clean  # static export to ./out (clears Turbopack cache — use after CSS edits)
npm run build:webpack # equivalent export when Turbopack worker ports are restricted
npm run verify:export # validate export, links, metadata and legacy routes
npm run preview      # serve ./out on :4321
PAGES_PROJECT=your-pages-project npm run deploy # verify and deploy to the explicit project
```

## Pages

| Route | Template | Notes |
| --- | --- | --- |
| `/` | home | interactive sections below |
| `/services/` + 15 × `/services/[slug]/` | service | existing and restored service copy, with quotation guidance |
| `/areas/` + 23 × `/[slug]/` | area | Dubai + 16 Dubai communities + 6 other emirates |
| `/industries/` + 24 × `/industries/[slug]/` | sector / audience | three sectors and all 21 restored industry audience URLs |
| `/blogs/`, `/blogs/page/[number]/`, `/blogs/[slug]/` | guide | searchable archive, older pages, and individual guides |
| `/careers/` | careers | role areas and enquiry channel; no assumed live vacancies |
| `/luxguard-360/`, `/projects/`, `/about/`, `/contact/`, `/faq/` | one-off | |
| `/privacy-policy/`, `/terms-of-service/` | legal | ported from the old site — needs legal review |

Navigation: desktop disclosure panels (Services / Areas / Company), mobile accordion sheet, breadcrumbs
(+ BreadcrumbList JSON-LD) on every inner page, full sitemap in the footer.

## Structure

```
src/lib/site.ts               single source of truth: NAP, services, nav, areas, FAQ, copy
src/lib/content/*             service, buyer, area, audience and guide content
src/lib/seo.ts                pageMeta(): per-page title, description, canonical, OG/Twitter
src/lib/schema.ts             composable JSON-LD (Organization, LocalBusiness, WebPage, Breadcrumbs, Service, FAQPage)
src/lib/images.generated.ts   image manifest (sizes + blur placeholders) — generated
src/components/home/*         home-page sections (several are reused on inner pages)
src/components/page/*         inner-page building blocks (hero, cards, rails, FAQ, legal shell)
src/components/layout/*       header + mega menu, footer, floating contact, smooth-scroll runtime
src/fonts/archivo-trimmed.woff2   Archivo variable, instanced to wght 400–800 / wdth 68–100
public/images/                responsive WebP sets (480/960/1600)
public/video/                 hero loop (10 s, captions & watermark cropped out)
public/_headers, _redirects   Cloudflare caching/security headers and 301s from old URLs
docs/seo-migration-audit.md   page coverage, keyword research evidence, tests and unresolved recovery items
scripts/optimize-images.py    regenerates public/images + the manifest from the old site's assets
```

For the existing hero video specifications and preparing its next replacement, see [the hero video workflow](docs/hero-video-workflow.md).

## Publishing a guide

Add an entry in [`src/lib/content/resources.ts`](src/lib/content/resources.ts) with a permanent slug,
title, description, publication timestamp (`publishedAt`, for example `2026-11-11T09:00:00+04:00`),
cover image and article sections. The site displays times in Dubai time. Use the `service` slug for the guide’s primary service page. Add `relatedLinks`
when a location, service or case study helps the reader take the next step. Add `keywords` for
useful search terms or alternate spellings missing from the title, summary and section headings.

Run the usual build and deploy when the post is ready to go live. Dated guides appear newest first.
The build generates the article, its sitemap entry, the search index and a new archive page for
each additional group of six guides.

## Signature interactions

| Section | Interaction |
| --- | --- |
| Hero | Canvas rain that bursts on the shield and on the visitor's cursor "halo"; on scroll the shield expands to full screen |
| Problem | Movement test — drag the temperature, watch a lapped membrane tear and LuxGuard stretch |
| Services | Cursor-following shield preview with velocity tilt |
| LuxGuard™ | Sticky scroll; 7-layer isometric stack explodes layer by layer |
| Diagnostics | Draggable thermal lens (SVG thermal filter + live reading) |
| Projects | Concave 3D arc carousel — drag, inertia, snap, keyboard |
| Risk | Live AED risk calculator that pre-fills the WhatsApp message |
| Book | Booking form → structured WhatsApp message (no backend) |

All motion respects `prefers-reduced-motion`; rain and smooth scroll start only after load/intent.

## Typography

One fluid scale in `globals.css` (`type-hero` 36→60px, `type-h2` 26→40px, `type-h3` 20→26px, `type-statement`,
`type-lead`, `type-stat`), Archivo at normal width / medium weight in sentence case. Use these instead of ad-hoc sizes.

## SEO

- Static HTML for every word (the old site was a client-rendered SPA).
- Keyword-first, Dubai-scoped URLs: `/services/roof-waterproofing-dubai/`, `/palm-jumeirah/` …
- Every page: unique title + description (≤160 chars), self-referencing canonical, one H1, breadcrumbs.
- JSON-LD `@graph`: Organization, HomeAndConstructionBusiness + RoofingContractor, OfferCatalog of 15 Services, WebSite, WebPage, FAQPage and guide Article nodes.
- `sitemap.xml`, `robots.txt`, `manifest.webmanifest`, OG/Twitter cards, canonical, `en-AE`, geo meta.
- `_redirects` maps the old `/solutions/*`, `/company/*`, `/applications/*` URLs to the new structure.
- GTM (GTM-P865Z5BZ) loads once on HTTPS at `haloshield.ae`; existing `whatsapp-btn` / `phone-btn` classes are kept for triggers.

Lighthouse mobile (simulated, local static server): performance 90–94, accessibility 100, best practices 100.
SEO reads ~69 on staging only because of the deliberate noindex.

## Before launch

- Confirm with the client: Google/Trustpilot ratings, "650+ properties", "2.5M m²", "98%", LuxGuard layer claims.
- Replace placeholder testimonials (old site's were not real) with verified Google reviews.
- Review the service/area/industry copy in `src/lib/content/*` with the client's engineers (technical claims, community details).
- Legal review of privacy policy and terms. The old pages listed a different phone (+971 58 981 1400) — confirm which is current.
- The old About page claimed "nearly 30 years", "40+ experts", "500+ projects" — these conflict with the 650+ stat; confirm before adding any.
- Optional: wire the booking form to a Cloudflare Worker + Turnstile + CRM.

## Deployment configuration and production sync

Production origin: `https://haloshield.ae`. GTM container: `GTM-P865Z5BZ`.
Leave `NEXT_PUBLIC_SITE_URL` unset for production, or set it to that origin
(a trailing slash is accepted). Set it to the staging deployment's own origin
before preview builds. `NEXT_PUBLIC_NOINDEX=true` explicitly disables indexing;
the legacy `NEXT_PUBLIC_ALLOW_INDEXING=false` switch also disables it. Remove
staging-only overrides from production build settings.

Public production pages are indexable and included in the sitemap. Preview
builds emit `noindex, nofollow` metadata and an empty sitemap, with no sitemap
advertised by robots.txt. Crawling remains allowed so search engines can read
the noindex directives. Cloudflare `_headers` additionally applies noindex to
all request hosts except `https://haloshield.ae`, even for a shared production export.
Use equivalent hostname-based headers on another hosting platform. No manual
edits to `_headers` are needed when syncing source.

GTM's standard bootstrap is present in the HTML head and runs only once on
HTTPS at exactly `haloshield.ae`. It remains inactive on local, staging, Pages and
other hosts. A noscript tracker is omitted because it cannot check the runtime
hostname in a shared static export. Publish and verify the container's tags
through GTM Tag Assistant after deploying. Configure any www-to-apex redirect
in Cloudflare; analytics and indexing use the apex domain.

```sh
make check
NEXT_PUBLIC_SITE_URL=https://staging.haloshield.ae npm run check
# Rebuild for production after checking a preview build.
make build
make start
```

`make check` also runs the local repo sync tests, requiring Bash, Git and rsync.
The Cloudflare build command is `npm run check`, with output directory `out`;
it regenerates route types before checking TypeScript, then checks the full
static export, existing content/redirect inventory,
GTM's runtime host restriction and indexing rules. `make start` uses the pinned
Cloudflare Wrangler to test the real header rules locally.

The production destination defaults to the sibling `haloshield-prod-v2` checkout.
It is configurable; the old production application is never modified implicitly.
Clone the intended production repo first, then run:

```sh
make sync-to-prod-dry-run PROD_DIR=/absolute/path/to/production-repo
make sync-to-prod PROD_DIR=/absolute/path/to/production-repo
```

Sync previews changes before asking for confirmation; use `CONFIRM=1` only
after reviewing the preview. It requires a separate, clean Git checkout,
removes obsolete application files, and preserves Git history, secrets,
dependencies, build output, local hosting config and agent settings. Large raw
research/media and local QA files are excluded. Sync does not commit or push.

For manual deployment from the reviewed production checkout:

```sh
make deploy PAGES_PROJECT=your-actual-production-pages-project
```

The explicit project name prevents selecting a deployment destination by
accident. All build/export checks run before uploading. Attach `haloshield.ae` as
the production Pages custom domain. After deployment, verify the live response
has no noindex header, check robots.txt and sitemap.xml, and confirm the
published GTM tags in Tag Assistant. Local verification sends no real enquiries
or analytics requests.

## Dependency maintenance

Next.js and its ESLint config are updated to 16.4.4; Wrangler is pinned in the
lockfile. The full dependency audit retains moderate advisories in development
lint tooling (ESLint/minimatch), with no high or critical findings. Production
dependencies are checked separately; build tooling is not shipped in `out/`.
