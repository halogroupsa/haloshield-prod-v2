"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState, type ComponentProps } from "react";
import { Logo } from "@/components/ui/Logo";
import { Img } from "@/components/ui/Img";
import { ArrowIcon, ChevronIcon } from "@/components/ui/Button";
import { scrollToTop } from "@/lib/scroll";
import { communities, companyNav, emirates, legalNav, primaryNav, services, site, telHref, whatsappHref } from "@/lib/site";

type Menu = "services" | "areas" | "company";

/** Company links minus those already shown as top-level items (Projects, Contact). */
const companyMenu = [...companyNav, ...legalNav].filter((l) => !primaryNav.some((p) => !p.menu && p.href === l.href));

const normalizePath = (path: string) => path.replace(/\/+$/, "") || "/";
const isCurrentPage = (path: string, href: string) => normalizePath(path) === normalizePath(href);
const isActive = (path: string, href: string) => {
  const current = normalizePath(path);
  const target = normalizePath(href);
  return current === target || (target !== "/" && current.startsWith(`${target}/`));
};
const menuActive = (path: string, menu: Menu) =>
  menu === "services"
    ? isActive(path, "/services/")
    : menu === "areas"
      ? isActive(path, "/areas/") || ["dubai", ...communities.map((a) => a.slug), ...emirates.map((a) => a.slug)].some((slug) => isCurrentPage(path, `/${slug}/`))
      : companyMenu.some((l) => isActive(path, l.href));

const activeMenu = (path: string) => (["services", "areas", "company"] as const).find((m) => menuActive(path, m)) ?? null;

/** Exact pages use aria-current=page; an ancestor link identifies the current section. */
function MenuLink({ pathname, href, exact = false, className = "", children, ...props }: Omit<ComponentProps<typeof Link>, "href"> & { pathname: string; href: string; exact?: boolean }) {
  const current = isCurrentPage(pathname, href);
  const active = exact ? current : isActive(pathname, href);
  return (
    <Link
      {...props}
      href={href}
      aria-current={active ? (current ? "page" : "location") : undefined}
      className={`${className} ${active ? "bg-halo/15 font-semibold text-halo ring-1 ring-inset ring-halo/30" : "text-membrane/75 hover:bg-membrane/[0.07] hover:text-membrane"}`}
    >
      {children}
    </Link>
  );
}

/**
 * Site navigation.
 * Desktop: floating glass pill; Services / Areas / Company open disclosure panels (hover with intent
 * delay for mouse, click/Enter for everyone; Escape and outside-click close; focus returns to the trigger).
 * Mobile: full-screen sheet with accordion groups and thumb-reach CTAs.
 * Panels stay in the DOM (inert when closed) so every link is crawlable.
 */
export function Header() {
  const pathname = usePathname();
  const [sheet, setSheet] = useState(false);
  const [menu, setMenu] = useState<Menu | null>(null);
  const [solid, setSolid] = useState(false);
  // Panel preview images mount only once the visitor reaches for the nav: they sit inside the
  // viewport rect, so loading="lazy" alone would still fetch ~400 KB on every page view.
  const [primed, setPrimed] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const hoverTimer = useRef<number | undefined>(undefined);
  const triggers = useRef<Partial<Record<Menu, HTMLButtonElement | null>>>({});
  const uid = useId();

  // Close everything on navigation (state adjusted during render, React's recommended pattern).
  const [prevPath, setPrevPath] = useState(pathname);
  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setSheet(false);
    setMenu(null);
  }

  // The header stays pinned; scrolling only switches it from transparent to solid.
  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock page scroll under the mobile sheet.
  useEffect(() => {
    document.documentElement.style.overflow = sheet ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [sheet]);

  const close = useCallback((returnFocus = false) => {
    setMenu((m) => {
      if (returnFocus && m) triggers.current[m]?.focus();
      return null;
    });
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setSheet(false);
      close(true);
    };
    const onDown = (e: PointerEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) close();
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onDown);
    };
  }, [close]);

  const hoverOpen = (m: Menu | null) => (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    window.clearTimeout(hoverTimer.current);
    hoverTimer.current = window.setTimeout(() => setMenu(m), m ? 90 : 220);
  };

  // Already on the home page: the logo returns to the top instead of a no-op same-route navigation.
  const onLogoClick = (e: React.MouseEvent) => {
    if (pathname !== "/" || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    setSheet(false);
    setMenu(null);
    if (window.location.hash) history.replaceState(null, "", "/");
    scrollToTop();
  };

  const overHero = !solid && !menu;

  return (
    // No transform on the header: it would become the containing block of the fixed mobile sheet.
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="container-x pt-3 md:pt-4" onPointerLeave={hoverOpen(null)}>
        <nav
          ref={navRef}
          aria-label="Primary"
          onPointerEnter={() => setPrimed(true)}
          onFocus={() => setPrimed(true)}
          className={`relative rounded-[30px] transition-[background-color,box-shadow,backdrop-filter] duration-500 ${
            overHero && !sheet
              ? "bg-transparent"
              : `${menu ? "bg-ink/95" : "bg-ink/80"} shadow-[0_10px_40px_-10px_rgb(0_0_0/0.45),inset_0_0_0_1px_rgb(255_255_255/0.08)] backdrop-blur-xl`
          }`}
        >
          <div className="flex h-[60px] items-center justify-between gap-4 pl-5 pr-2">
            <Link href="/" onClick={onLogoClick} className="flex shrink-0 items-center text-membrane" aria-label="Halo Shield — home" aria-current={isCurrentPage(pathname, "/") ? "page" : undefined}>
              <Logo className="h-[26px]" label="" />
            </Link>

            <ul className="hidden items-center lg:flex">
              {primaryNav.map((item) => {
                const m = item.menu;
                const active = m ? menuActive(pathname, m) : isActive(pathname, item.href);
                const base = `relative flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[0.875rem] transition-colors xl:px-4 ${
                  active ? "bg-halo font-semibold text-ink" : "text-membrane/70 hover:bg-membrane/10 hover:text-membrane"
                }`;
                return (
                  <li key={item.label} onPointerEnter={hoverOpen(m ?? null)}>
                    {m ? (
                      <button
                        ref={(el) => {
                          triggers.current[m] = el;
                        }}
                        type="button"
                        aria-expanded={menu === m}
                        aria-controls={`${uid}-${m}`}
                        aria-current={active ? "location" : undefined}
                        onClick={() => setMenu((cur) => (cur === m ? null : m))}
                        className={base}
                      >
                        {item.label}
                        <ChevronIcon className={`transition-transform duration-300 ${menu === m ? "rotate-180" : ""}`} />
                      </button>
                    ) : (
                      <Link href={item.href} className={base} aria-current={active ? "page" : undefined}>
                        {item.label}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>

            <div className="flex items-center gap-1.5">
              <a
                href={telHref}
                className="phone-btn hidden items-center gap-2 rounded-full px-3 py-2 font-mono text-[0.75rem] tracking-wider text-membrane/80 transition-colors hover:text-membrane xl:flex"
              >
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-halo opacity-60" />
                  <span className="relative inline-flex size-2 rounded-full bg-halo" />
                </span>
                {site.phone}
              </a>
              <a
                href={whatsappHref("Hi Halo Shield, I'd like to book a 360° assessment.")}
                target="_blank"
                rel="noopener noreferrer"
                className="whatsapp-btn hidden min-h-11 items-center rounded-full bg-halo px-5 text-[0.8125rem] font-semibold text-ink transition-colors hover:bg-membrane sm:inline-flex"
              >
                Book assessment
              </a>
              <button
                type="button"
                onClick={() => setSheet((v) => !v)}
                aria-expanded={sheet}
                aria-controls={`${uid}-sheet`}
                aria-label={sheet ? "Close menu" : "Open menu"}
                className="relative grid size-11 place-items-center rounded-full bg-membrane/10 text-membrane lg:hidden"
              >
                <span className={`absolute h-[1.5px] w-5 bg-current transition-transform duration-500 ${sheet ? "rotate-45" : "-translate-y-[4px]"}`} />
                <span className={`absolute h-[1.5px] w-5 bg-current transition-transform duration-500 ${sheet ? "-rotate-45" : "translate-y-[4px]"}`} />
              </button>
            </div>
          </div>

          {/* Desktop panels */}
          <div className="hidden lg:block">
            <Panel id={`${uid}-services`} open={menu === "services"}>
              <ServicesPanel key={pathname} primed={primed} pathname={pathname} />
            </Panel>
            <Panel id={`${uid}-areas`} open={menu === "areas"}>
              <AreasPanel pathname={pathname} />
            </Panel>
            <Panel id={`${uid}-company`} open={menu === "company"}>
              <CompanyPanel pathname={pathname} />
            </Panel>
          </div>
        </nav>
      </div>

      <MobileSheet id={`${uid}-sheet`} open={sheet} pathname={pathname} />
    </header>
  );
}

function Panel({ id, open, children }: { id: string; open: boolean; children: React.ReactNode }) {
  return (
    <div
      id={id}
      inert={!open}
      className={`grid transition-[grid-template-rows,opacity] duration-500 ease-out-expo ${
        open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
      }`}
    >
      <div className="overflow-hidden">
        <div className="border-t border-membrane/10 px-5 pb-5 pt-5 text-membrane">{children}</div>
      </div>
    </div>
  );
}

function ServicesPanel({ primed, pathname }: { primed: boolean; pathname: string }) {
  const [hover, setHover] = useState(() => Math.max(0, services.findIndex((s) => isCurrentPage(pathname, `/services/${s.slug}/`))));
  const s = services[hover];
  const groups = [
    { title: "Waterproofing", list: services.filter((x) => x.group === "waterproofing") },
    { title: "Protection systems", list: services.filter((x) => x.group === "systems") },
  ];
  return (
    <div className="grid grid-cols-12 gap-6">
      {groups.map((g) => (
        <div key={g.title} className="col-span-4">
          <p className="text-eyebrow px-3 text-membrane/50">{g.title}</p>
          <ul className="mt-3">
            {g.list.map((x) => {
              const i = services.indexOf(x);
              return (
                <li key={x.slug}>
                  <MenuLink
                    pathname={pathname}
                    href={`/services/${x.slug}/`}
                    onPointerEnter={() => setHover(i)}
                    onFocus={() => setHover(i)}
                    className={`flex items-center justify-between rounded-xl px-3 py-2 text-[0.875rem] transition-colors ${
                      hover === i && !isCurrentPage(pathname, `/services/${x.slug}/`) ? "bg-membrane/[0.07]" : ""
                    }`}
                  >
                    {x.name}
                    <ArrowIcon size={11} className={`shrink-0 transition-opacity ${hover === i || isCurrentPage(pathname, `/services/${x.slug}/`) ? "opacity-100" : "opacity-0"}`} />
                  </MenuLink>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
      <Link href={`/services/${s.slug}/`} tabIndex={-1} aria-hidden className="group relative col-span-4 overflow-hidden rounded-[20px] bg-ink-3">
        {primed &&
          services.map((x, i) => (
          <Img
            key={x.slug}
            name={x.image}
            alt=""
            sizes="320px"
            placeholder={false}
            className={`absolute inset-0 size-full object-cover transition-opacity duration-500 ${i === hover ? "opacity-100" : "opacity-0"}`}
          />
          ))}
        <span className="absolute inset-0 bg-linear-to-t from-ink/90 via-ink/20 to-transparent" />
        <span className="absolute inset-x-0 bottom-0 p-5">
          <span className="block text-[1rem] font-medium">{s.name}</span>
          <span className="mt-1 line-clamp-2 block text-[0.8125rem] text-membrane/70">{s.short}</span>
        </span>
      </Link>
      <div className="col-span-12 flex items-center justify-between border-t border-membrane/10 px-3 pt-4 text-[0.8125rem]">
        <MenuLink pathname={pathname} href="/services/" exact className="inline-flex items-center gap-2 rounded-lg px-2 py-1 font-semibold">
          All services <ArrowIcon size={11} />
        </MenuLink>
        <Link href="/luxguard-360/" className="text-membrane/65 hover:text-membrane">
          Every service is built on LuxGuard™ 360° →
        </Link>
      </div>
    </div>
  );
}

function AreasPanel({ pathname }: { pathname: string }) {
  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-9">
        <p className="text-eyebrow px-3 text-membrane/50">Dubai communities</p>
        <ul className="mt-3 grid grid-cols-3">
          {communities.map((c) => (
            <li key={c.slug}>
              <MenuLink pathname={pathname} href={`/${c.slug}/`} className="block rounded-xl px-3 py-2 text-[0.875rem] transition-colors">
                {c.name}
              </MenuLink>
            </li>
          ))}
        </ul>
      </div>
      <div className="col-span-3 border-l border-membrane/10 pl-6">
        <p className="text-eyebrow px-3 text-membrane/50">Across the UAE</p>
        <ul className="mt-3">
          {[{ slug: "dubai", name: "Dubai" }, ...emirates].map((e) => (
            <li key={e.slug}>
              <MenuLink pathname={pathname} href={`/${e.slug}/`} className="block rounded-xl px-3 py-2 text-[0.875rem] transition-colors">
                {e.name}
              </MenuLink>
            </li>
          ))}
        </ul>
      </div>
      <div className="col-span-12 flex items-center justify-between border-t border-membrane/10 px-3 pt-4 text-[0.8125rem]">
        <MenuLink pathname={pathname} href="/areas/" exact className="inline-flex items-center gap-2 rounded-lg px-2 py-1 font-semibold">
          All areas we cover <ArrowIcon size={11} />
        </MenuLink>
        <span className="text-membrane/55">Engineers based in Al Quoz, Dubai</span>
      </div>
    </div>
  );
}

function CompanyPanel({ pathname }: { pathname: string }) {
  return (
    <div className="grid grid-cols-12 gap-6">
      <ul className="col-span-8 grid grid-cols-2 gap-1">
        {companyMenu.map((l) => (
          <li key={l.href}>
            <MenuLink
              pathname={pathname}
              href={l.href}
              className="block rounded-xl px-3 py-2.5 transition-colors"
            >
              <span className="block text-[0.875rem]">{l.label}</span>
              <span className="block text-[0.75rem] text-membrane/55">{l.note}</span>
            </MenuLink>
          </li>
        ))}
      </ul>
      <div className="col-span-4 flex flex-col justify-between rounded-[20px] bg-halo p-5 text-ink">
        <p className="text-[1rem] font-medium leading-snug">Talk to an engineer, not a salesperson.</p>
        <a href={telHref} className="phone-btn mt-6 font-mono text-[0.8125rem] underline decoration-ink/40 underline-offset-4">
          {site.phone}
        </a>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */

function MobileSheet({ id, open, pathname }: { id: string; open: boolean; pathname: string }) {
  const [group, setGroup] = useState<Menu | null>(null);
  const [wasOpen, setWasOpen] = useState(open);
  if (wasOpen !== open) {
    setWasOpen(open);
    setGroup(open ? activeMenu(pathname) : null);
  }

  const sub: Record<Menu, { label: string; href: string }[]> = {
    services: [{ label: "All services", href: "/services/" }, ...services.map((s) => ({ label: s.name, href: `/services/${s.slug}/` }))],
    areas: [
      { label: "All areas", href: "/areas/" },
      ...[{ slug: "dubai", name: "Dubai" }, ...communities, ...emirates].map((a) => ({ label: a.name, href: `/${a.slug}/` })),
    ],
    company: companyMenu.map((l) => ({ label: l.label, href: l.href })),
  };

  return (
    <div
      id={id}
      inert={!open}
      className={`fixed inset-0 -z-10 bg-ink text-membrane transition-[clip-path] duration-700 ease-in-out-quart lg:hidden ${
        open ? "[clip-path:inset(0_0_0_0_round_0px)]" : "pointer-events-none [clip-path:inset(0_0_100%_0_round_0_0_32px_32px)]"
      }`}
    >
      <div className="container-x flex h-full flex-col overflow-y-auto overscroll-contain pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-24">
        <MenuLink pathname={pathname} href="/" exact className="mb-2 flex min-h-11 items-center rounded-xl px-3 text-[1.125rem]">
          Home
        </MenuLink>
        <ul className="divide-y divide-membrane/10 border-b border-membrane/10">
          {primaryNav.map((item, i) => {
            const m = item.menu;
            const expanded = m && group === m;
            const active = m ? menuActive(pathname, m) : isActive(pathname, item.href);
            const row = `flex w-full items-center justify-between rounded-xl px-3 py-4 text-left text-[1.375rem] font-medium tracking-tight transition-[transform,opacity] duration-700 ease-out-expo ${
              open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            } ${active ? "bg-halo/15 text-halo ring-1 ring-inset ring-halo/30" : ""}`;
            const delay = { transitionDelay: `${open ? 120 + i * 40 : 0}ms` };
            return (
              <li key={item.label}>
                {m ? (
                  <>
                    <button type="button" className={row} style={delay} aria-expanded={!!expanded} aria-current={active ? "location" : undefined} onClick={() => setGroup(expanded ? null : m)}>
                      {item.label}
                      <span className="grid size-9 place-items-center rounded-full bg-membrane/8">
                        <ChevronIcon size={12} className={`transition-transform duration-300 ${expanded ? "rotate-180" : ""}`} />
                      </span>
                    </button>
                    <div className={`grid transition-[grid-template-rows] duration-500 ease-out-expo ${expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                      <ul className={`overflow-hidden ${m === "areas" ? "grid grid-cols-2 gap-x-4" : ""}`} inert={!expanded}>
                        {sub[m].map((l, j) => (
                          <li key={l.href} className={j === 0 && m === "areas" ? "col-span-2" : ""}>
                            <MenuLink
                              pathname={pathname}
                              exact={j === 0 && m !== "company"}
                              href={l.href}
                              className={`flex min-h-11 items-center rounded-xl px-3 py-2 text-[0.9375rem] ${j === 0 && m !== "company" ? "font-semibold" : ""}`}
                            >
                              {l.label}
                            </MenuLink>
                          </li>
                        ))}
                        <li aria-hidden className="col-span-2 h-3" />
                      </ul>
                    </div>
                  </>
                ) : (
                  <Link href={item.href} className={row} style={delay} aria-current={active ? "page" : undefined}>
                    {item.label}
                    <ArrowIcon size={14} className="mr-3 opacity-50" />
                  </Link>
                )}
              </li>
            );
          })}
        </ul>

        <div className="mt-auto grid gap-2.5 pt-8">
          <a
            href={whatsappHref("Hi Halo Shield, I'd like to book a 360° assessment.")}
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-btn rounded-full bg-halo py-4 text-center text-[0.9375rem] font-semibold text-ink"
          >
            Book a free 360° assessment
          </a>
          <a href={telHref} className="phone-btn rounded-full border border-membrane/20 py-4 text-center font-mono text-[0.875rem] text-membrane">
            {site.phone}
          </a>
          <p className="mt-2 text-center text-[0.75rem] text-membrane/50">
            {site.address.street}, {site.address.locality}, Dubai
          </p>
        </div>
      </div>
    </div>
  );
}
