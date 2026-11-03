import type { Metadata } from "next";
import { LegalPage } from "@/components/page/LegalPage";
import { site, telHref } from "@/lib/site";
import { pageMeta } from "@/lib/seo";

// Ported from the previous site's policy (effective August 2024) and updated for this site:
// no accounts, booking form hands off to WhatsApp, analytics via Google Tag Manager.
// Have the client's legal advisor review before launch.

const title = "Privacy Policy";
const description = "How Halo Shield collects, uses and protects personal data submitted through haloshield.ae.";
const path = "/privacy-policy/";

export const metadata: Metadata = pageMeta({ title, description, path });

export default function PrivacyPolicy() {
  return (
    <LegalPage title={title} description={description} path={path} updated="October 2026">
      <p>
        Halo Shield (&ldquo;us&rdquo;, &ldquo;we&rdquo; or &ldquo;our&rdquo;) operates {site.url} (the &ldquo;Service&rdquo;). This
        page explains how we collect, use and disclose personal data when you use the Service, and the choices you have.
        By using the Service you agree to the collection and use of information in accordance with this policy.
      </p>

      <h2>Information we collect</h2>
      <p>When you contact us or request an assessment, you may give us personal data such as:</p>
      <ul>
        <li>Your name</li>
        <li>Phone / WhatsApp number and email address</li>
        <li>Your community or property address, property type and the issue you&apos;re experiencing</li>
        <li>Photos or documents you choose to send us</li>
      </ul>
      <p>
        The booking form on this site does not store your details on our servers. It composes a message that opens in
        WhatsApp, where you choose whether to send it. Messages you send are then handled under this policy and
        WhatsApp&apos;s own terms.
      </p>

      <h2>Usage data and cookies</h2>
      <p>
        We may collect information about how the Service is accessed and used (&ldquo;Usage Data&rdquo;), such as your IP
        address, browser type and version, the pages you visit, the time and date of your visit, time spent on pages,
        device identifiers and other diagnostic data.
      </p>
      <p>
        Analytics tags are loaded through Google Tag Manager only after you first interact with the page. These may set
        cookies to measure traffic and the performance of our marketing. You can block or delete cookies in your browser
        settings; the site will continue to work.
      </p>

      <h2>How we use data</h2>
      <ul>
        <li>To respond to enquiries and arrange inspections</li>
        <li>To provide, maintain and improve the Service</li>
        <li>To provide customer care and support</li>
        <li>To analyse usage so we can improve the Service</li>
        <li>To detect, prevent and address technical issues</li>
        <li>To comply with legal obligations</li>
      </ul>

      <h2>Analytics</h2>
      <p>
        We use Google Analytics, a web analytics service offered by Google that tracks and reports website traffic. Google
        may use the data collected to contextualise and personalise ads in its own advertising network. You can opt out by
        installing the{" "}
        <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">
          Google Analytics opt-out browser add-on
        </a>
        . For more on Google&apos;s practices, see the{" "}
        <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
          Google Privacy &amp; Terms
        </a>{" "}
        page.
      </p>

      <h2>Transfer of data</h2>
      <p>
        Your information may be transferred to and maintained on computers located outside your emirate or country, where
        data protection laws may differ. We take reasonable steps to ensure your data is treated securely and in
        accordance with this policy, and no transfer takes place without adequate controls in place.
      </p>

      <h2>Disclosure of data</h2>
      <p>We may disclose personal data in the good-faith belief that it is necessary to:</p>
      <ul>
        <li>Comply with a legal obligation</li>
        <li>Protect and defend the rights or property of Halo Shield</li>
        <li>Prevent or investigate possible wrongdoing in connection with the Service</li>
        <li>Protect the personal safety of users of the Service or the public</li>
        <li>Protect against legal liability</li>
      </ul>

      <h2>Security</h2>
      <p>
        The security of your data is important to us, but no method of transmission over the internet or of electronic
        storage is 100% secure. We use commercially acceptable means to protect personal data but cannot guarantee its
        absolute security.
      </p>

      <h2>Service providers and other sites</h2>
      <p>
        We may employ third parties to facilitate the Service, provide it on our behalf or help us analyse how it is used.
        The Service may also link to sites we don&apos;t operate; we are not responsible for their content or privacy
        practices, and recommend you review their policies.
      </p>

      <h2>Children&apos;s privacy</h2>
      <p>
        The Service is not directed at anyone under 18 and we do not knowingly collect personal data from children. If you
        believe a child has provided us with personal data, contact us and we will remove it.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        We may update this policy from time to time. Changes are effective when posted on this page, and the &ldquo;last
        updated&rdquo; date above will change.
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
