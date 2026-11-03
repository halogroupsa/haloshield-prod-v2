import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { communities, companyNav, emirates, legalNav, services, site, telHref, whatsappHref } from "@/lib/site";

const linkCls = "inline-block py-1 transition-colors hover:text-halo";

export function Footer() {
  const year = 2026;
  return (
    <footer className="relative overflow-hidden bg-ink pb-28 pt-16 text-membrane md:pb-10 md:pt-24">
      <div className="container-x">
        <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-12">
          <div className="sm:col-span-2 lg:col-span-4">
            <Link href="/" aria-label="Halo Shield — home" className="mb-6 inline-flex min-h-11 items-center text-membrane/95 transition-colors hover:text-halo">
              <Logo className="block w-40 md:w-44" label="" />
            </Link>
            <p className="text-[1.625rem] font-medium leading-tight tracking-tight text-membrane/90 md:text-[2rem]">
              Engineering first.
              <br />
              Protection always.
            </p>
            <address className="mt-7 space-y-3 text-[0.875rem] not-italic leading-relaxed text-membrane/60">
              <p>
                {site.name}
                <br />
                {site.address.street}
                <br />
                {site.address.locality}, {site.address.city}, {site.address.countryName}
              </p>
              <p className="flex flex-col">
                <a href={telHref} className={`phone-btn ${linkCls} text-membrane/85`}>
                  {site.phone}
                </a>
                <a href={`mailto:${site.email}`} className={`${linkCls} text-membrane/85`}>
                  {site.email}
                </a>
              </p>
            </address>
            <ul className="mt-6 flex flex-wrap gap-2">
              {Object.entries(site.socials).map(([k, href]) => (
                <li key={k}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-10 items-center rounded-full border border-membrane/15 px-4 text-[0.75rem] capitalize text-membrane/70 transition-colors hover:border-halo hover:text-membrane"
                  >
                    {k}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Services" className="lg:col-span-3">
            <h2 className="text-eyebrow text-membrane/55">
              <Link href="/services/" className="hover:text-membrane">Services</Link>
            </h2>
            <ul className="mt-4 text-[0.875rem] text-membrane/75">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}/`} className={linkCls}>
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Areas" className="lg:col-span-3">
            <h2 className="text-eyebrow text-membrane/55">
              <Link href="/areas/" className="hover:text-membrane">Areas</Link>
            </h2>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 text-[0.875rem] text-membrane/75">
              {[...communities, ...emirates].map((a) => (
                <li key={a.slug}>
                  <Link href={`/${a.slug}/`} className={linkCls}>
                    {a.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Company" className="lg:col-span-2">
            <h2 className="text-eyebrow text-membrane/55">Company</h2>
            <ul className="mt-4 text-[0.875rem] text-membrane/75">
              <li>
                <Link href="/luxguard-360/" className={linkCls}>
                  LuxGuard™ 360°
                </Link>
              </li>
              {companyNav.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={linkCls}>
                    {l.label.replace("About Halo Shield", "About")}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-10 flex flex-col justify-between gap-4 border-t border-membrane/10 pt-6 text-[0.75rem] text-membrane/55 md:mt-12 md:flex-row md:items-center md:pr-20">
          <p>
            © {year} {site.name}. Waterproofing &amp; property protection, Dubai.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {legalNav.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-membrane">
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className="whatsapp-btn hover:text-membrane">
                WhatsApp
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
