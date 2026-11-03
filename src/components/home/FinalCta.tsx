"use client";

import { useState } from "react";
import { Logo } from "@/components/ui/Logo";
import { communities, site, telHref, whatsappHref } from "@/lib/site";

const types = ["Villa", "Apartment", "Commercial", "Industrial"] as const;
const concerns = ["Active leak", "Damp or mold", "Roof", "Basement", "Pool / tank", "New-build protection"] as const;

/**
 * Booking form for a static site: composes a structured WhatsApp message (no backend needed).
 * Swap `submit` for a Cloudflare Worker + Turnstile endpoint when a CRM is wired in.
 */
type Props = {
  /** Service or topic the visitor is looking at — added to the WhatsApp message. */
  context?: string;
  /** Pre-fills the community field on area pages. */
  community?: string;
  title?: React.ReactNode;
};

export function FinalCta({ context, community, title }: Props = {}) {
  const [type, setType] = useState<string>("Villa");
  const [picked, setPicked] = useState<string[]>(["Active leak"]);

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const msg = [
      "Hi Halo Shield — I'd like to book a 360° assessment.",
      ...(context ? [`Regarding: ${context}`] : []),
      `Name: ${fd.get("name")}`,
      `Phone: ${fd.get("phone")}`,
      ...(fd.get("email") ? [`Email: ${fd.get("email")}`] : []),
      `Community: ${fd.get("community") || "—"}`,
      `Property: ${type}`,
      `Concern: ${picked.join(", ") || "—"}`,
      ...(fd.get("message") ? [`Project details: ${fd.get("message")}`] : []),
    ].join("\n");
    window.dataLayer?.push({ event: "booking_form_submit", property_type: type, concerns: picked.join("|"), context: context ?? "home" });
    window.open(whatsappHref(msg), "_blank", "noopener");
  };

  const toggle = (c: string) => setPicked((p) => (p.includes(c) ? p.filter((x) => x !== c) : [...p, c]));

  return (
    <section id="book" aria-labelledby="book-title" className="relative overflow-hidden bg-halo text-ink">
      <Logo variant="mark" className="pointer-events-none absolute -right-[8vw] -top-[6vw] w-[46vw] text-ink/[0.07]" label="" />
      <div className="container-x relative grid gap-10 py-20 md:gap-14 md:py-28 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-6">
          <p className="text-eyebrow text-ink/80">Free · no obligation · same-day response</p>
          <h2 id="book-title" className="text-display mt-5 type-hero">
            {title ?? (
              <>
                Protect it before the damage shows.
              </>
            )}
          </h2>
          <p className="mt-6 type-lead max-w-[42ch] text-ink">
            Your property is one of your largest investments. Early assessment prevents expensive structural damage
            later.
          </p>
          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 font-mono text-sm">
            <a href={telHref} className="phone-btn underline decoration-ink/40 underline-offset-4 hover:decoration-ink">
              {site.phone}
            </a>
            <a href={`mailto:${site.email}`} className="underline decoration-ink/40 underline-offset-4 hover:decoration-ink">
              {site.email}
            </a>
          </div>
        </div>

        <form
          onSubmit={submit}
          className="rounded-[28px] bg-ink p-6 text-membrane shadow-[0_40px_80px_-30px_rgb(12_12_13/0.6)] md:p-10 lg:col-span-6"
          aria-label="Book a 360° assessment"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Your name" name="name" autoComplete="name" required />
            <Field label="Mobile / WhatsApp" name="phone" type="tel" autoComplete="tel" inputMode="tel" required />
          </div>
          <div className="mt-4">
            <Field label="Email (optional)" name="email" type="email" autoComplete="email" />
          </div>
          <div className="mt-4">
            <Field label="Community" name="community" list="communities" placeholder="e.g. Palm Jumeirah" defaultValue={community} />
            <datalist id="communities">
              {communities.map((c) => (
                <option key={c.slug} value={c.name} />
              ))}
            </datalist>
          </div>

          <div className="mt-4">
            <label htmlFor="booking-message" className="block text-[0.8125rem] text-membrane/65">Project details (optional)</label>
            <textarea id="booking-message" name="message" rows={3} maxLength={1500} placeholder="Tell us about the problem, affected area and preferred timing" className="mt-2 w-full rounded-xl border border-membrane/20 bg-transparent px-4 py-3 text-[0.9375rem] text-membrane placeholder:text-membrane/40 focus:border-halo focus:outline-none" />
          </div>

          <fieldset className="mt-6">
            <legend className="text-eyebrow text-membrane/60">Property</legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {types.map((t) => (
                <label key={t} className="cursor-pointer">
                  <input type="radio" name="type" value={t} checked={type === t} onChange={() => setType(t)} className="peer sr-only" />
                  <span className="inline-block rounded-full border border-membrane/20 px-4 py-2 text-sm transition-colors peer-checked:border-halo peer-checked:bg-halo peer-checked:text-ink peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-halo">
                    {t}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset className="mt-6">
            <legend className="text-eyebrow text-membrane/60">What&apos;s going on?</legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {concerns.map((c) => (
                <label key={c} className="cursor-pointer">
                  <input type="checkbox" checked={picked.includes(c)} onChange={() => toggle(c)} className="peer sr-only" />
                  <span className="inline-block rounded-full border border-membrane/20 px-4 py-2 text-sm transition-colors peer-checked:border-membrane peer-checked:bg-membrane peer-checked:text-ink peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-halo">
                    {c}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <button
            type="submit"
            className="whatsapp-btn group mt-8 flex w-full items-center justify-between rounded-full bg-halo py-4 pl-7 pr-4 text-left font-semibold text-ink transition-colors hover:bg-membrane"
          >
            Send to an engineer on WhatsApp
            <span className="grid size-9 place-items-center rounded-full bg-ink text-membrane transition-transform duration-500 group-hover:-rotate-45">→</span>
          </button>
          <p className="mt-4 text-center text-xs text-membrane/60">We reply within 2 hours, 7 days a week.</p>
        </form>
      </div>
    </section>
  );
}

function Field({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="text-eyebrow text-membrane/60">{label}</span>
      <input
        {...props}
        className="mt-2 w-full rounded-2xl border border-membrane/15 bg-transparent px-4 py-3.5 text-membrane placeholder:text-membrane/30 focus:border-halo focus:outline-none"
      />
    </label>
  );
}

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}
