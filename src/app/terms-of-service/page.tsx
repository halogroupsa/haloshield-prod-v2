import type { Metadata } from "next";
import { LegalPage } from "@/components/page/LegalPage";
import { site, telHref } from "@/lib/site";
import { pageMeta } from "@/lib/seo";

// Ported from the previous site's terms. The old "Account terms" section was dropped because
// this site has no accounts. Have the client's legal advisor review before launch.

const title = "Terms of Service";
const description = "The terms that govern use of the Halo Shield website, haloshield.ae.";
const path = "/terms-of-service/";

export const metadata: Metadata = pageMeta({ title, description, path });

export default function Terms() {
  return (
    <LegalPage title={title} description={description} path={path} updated="October 2026">
      <p>These terms set out the rules for using the Halo Shield website at {site.url.replace("https://", "")}.</p>

      <h2>Acceptance of terms</h2>
      <p>
        By accessing this website you agree to be bound by these terms. If you do not agree with them, please do not use
        the website.
      </p>

      <h2>Changes to terms</h2>
      <p>
        We may modify these terms at any time. Continued use of the website after changes are posted means you accept the
        updated terms, so please review them periodically.
      </p>

      <h2>Information on this website</h2>
      <p>
        Content on this website is general information about our services. It is not a specification or a quotation for
        your property; every project is specified and priced after an on-site inspection, and the written proposal and
        contract govern the work.
      </p>

      <h2>Prohibited uses</h2>
      <p>You agree not to use the website for any unlawful purpose, including:</p>
      <ul>
        <li>Violating any local, national or international law or regulation</li>
        <li>Infringing our intellectual property rights or those of others</li>
        <li>Engaging in conduct that restricts or inhibits anyone&apos;s use or enjoyment of the website</li>
      </ul>

      <h2>Intellectual property</h2>
      <p>
        The website and its original content, features and functionality — including the Halo Shield and LuxGuard™ names
        and marks — are the exclusive property of Halo Shield and its licensors, and may not be used in connection with any
        product or service without our prior written consent.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        In no event shall Halo Shield, nor its directors, employees, partners, agents, suppliers or affiliates, be liable
        for any indirect, incidental, special, consequential or punitive damages, including loss of profits, data, use,
        goodwill or other intangible losses, resulting from your use of the website.
      </p>

      <h2>Governing law</h2>
      <p>
        These terms are governed by and construed in accordance with the laws of the United Arab Emirates, without regard
        to conflict-of-law provisions.
      </p>

      <h2>Contact us</h2>
      <p>
        {site.name}, {site.address.street}, {site.address.locality}, {site.address.city}, {site.address.countryName}
        <br />
        Phone: <a href={telHref}>{site.phone}</a> · Email: <a href={`mailto:${site.email}`}>{site.email}</a>
      </p>
    </LegalPage>
  );
}
