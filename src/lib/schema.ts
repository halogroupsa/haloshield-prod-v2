import { imageSrc } from "./image-src";
import { communities, emirates, faqs, services, site, type Service } from "./site";

/**
 * JSON-LD, built from composable nodes with stable @ids so search engines (and AI answer
 * engines) can resolve Organization ⇄ LocalBusiness ⇄ WebPage ⇄ Service ⇄ FAQ across the site.
 * Every page emits the Organization + LocalBusiness + WebSite core plus its own nodes.
 *
 * Deliberately NOT included: aggregateRating. Google ignores self-served review markup
 * for LocalBusiness and it can trigger a manual action. Ratings live on the Google
 * Business Profile instead.
 */

type Node = Record<string, unknown>;
export type Crumb = { name: string; path: string };

const ORG = `${site.url}/#organization`;
const BIZ = `${site.url}/#localbusiness`;
const WEB = `${site.url}/#website`;
const abs = (path: string) => `${site.url}${path}`;

const dubai = { "@type": "City", name: "Dubai", sameAs: "https://en.wikipedia.org/wiki/Dubai" };

function coreNodes(): Node[] {
  return [
    {
      "@type": "Organization",
      "@id": ORG,
      name: site.name,
      url: site.url,
      logo: { "@type": "ImageObject", url: `${site.url}/brand/halo-shield-mark.png`, width: 512, height: 512 },
      email: site.email,
      telephone: site.phoneE164,
      sameAs: Object.values(site.socials),
      contactPoint: {
        "@type": "ContactPoint",
        telephone: site.phoneE164,
        contactType: "customer service",
        areaServed: "AE",
        availableLanguage: ["English", "Arabic"],
      },
    },
    {
      "@type": ["HomeAndConstructionBusiness", "RoofingContractor"],
      "@id": BIZ,
      name: `${site.name} — Waterproofing Company in Dubai`,
      url: site.url,
      image: `${site.url}/og.jpg`,
      logo: `${site.url}/brand/halo-shield-mark.png`,
      description:
        "Engineering-led waterproofing and property protection company in Dubai. Roof, villa, basement, pool, terrace and wet-area waterproofing with the seven-layer LuxGuard™ 360° system, DM-approved engineers and up to 25-year protection assurance.",
      telephone: site.phoneE164,
      email: site.email,
      parentOrganization: { "@id": ORG },
      address: {
        "@type": "PostalAddress",
        streetAddress: site.address.street,
        addressLocality: `${site.address.locality}, ${site.address.city}`,
        addressRegion: "Dubai",
        addressCountry: site.address.country,
      },
      geo: { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lng },
      hasMap: `https://www.google.com/maps?q=${site.geo.lat},${site.geo.lng}`,
      areaServed: [
        dubai,
        ...communities.map((c) => ({ "@type": "Place", name: `${c.name}, Dubai` })),
        ...emirates.map((e) => ({ "@type": "AdministrativeArea", name: e.name })),
      ],
      knowsAbout: [
        "Waterproofing",
        "Roof waterproofing",
        "Polyurea coating",
        "Basement waterproofing",
        "Leak detection",
        "Thermal insulation",
        "Mold remediation",
        "Building envelope",
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Waterproofing & property protection services in Dubai",
        itemListElement: services.map((s) => ({
          "@type": "Offer",
          itemOffered: { "@id": `${abs(`/services/${s.slug}/`)}#service` },
        })),
      },
    },
    { "@type": "WebSite", "@id": WEB, url: site.url, name: site.name, publisher: { "@id": ORG }, inLanguage: "en-AE" },
  ];
}

function webPage(path: string, name: string, description: string, crumbs?: Crumb[], extra: Node = {}): Node[] {
  const id = abs(path);
  const nodes: Node[] = [
    {
      "@type": "WebPage",
      "@id": `${id}#webpage`,
      url: id,
      name,
      description,
      isPartOf: { "@id": WEB },
      about: { "@id": BIZ },
      inLanguage: "en-AE",
      ...(crumbs ? { breadcrumb: { "@id": `${id}#breadcrumb` } } : null),
      ...extra,
    },
  ];
  if (crumbs) {
    nodes.push({
      "@type": "BreadcrumbList",
      "@id": `${id}#breadcrumb`,
      itemListElement: crumbs.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, item: abs(c.path) })),
    });
  }
  return nodes;
}

export function serviceNode(s: Service, description: string, areaServed: Node = dubai): Node {
  return {
    "@type": "Service",
    "@id": `${abs(`/services/${s.slug}/`)}#service`,
    name: `${s.name} in Dubai`,
    serviceType: s.name,
    description,
    url: abs(`/services/${s.slug}/`),
    image: abs(imageSrc(s.image, 1600)),
    provider: { "@id": BIZ },
    areaServed,
  };
}

export function faqNode(path: string, items: readonly { q: string; a: string }[]): Node {
  return {
    "@type": "FAQPage",
    "@id": `${abs(path)}#faq`,
    mainEntity: items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
}

/** Full graph for a page: core entities + WebPage (+ BreadcrumbList) + any page-specific nodes. */
export function pageGraph(opts: { path: string; name: string; description: string; crumbs?: Crumb[]; nodes?: Node[]; page?: Node }) {
  return {
    "@context": "https://schema.org",
    "@graph": [...coreNodes(), ...webPage(opts.path, opts.name, opts.description, opts.crumbs, opts.page), ...(opts.nodes ?? [])],
  };
}

export function homeJsonLd() {
  return pageGraph({
    path: "/",
    name: "Waterproofing Company in Dubai | Halo Shield",
    description: "Engineering-led waterproofing and property protection in Dubai.",
    page: { primaryImageOfPage: `${site.url}/og.jpg` },
    nodes: [...services.map((s) => serviceNode(s, s.short)), faqNode("/", faqs)],
  });
}
