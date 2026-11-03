import { SectionLabel } from "@/components/ui/SectionLabel";
import { faqs, site, telHref } from "@/lib/site";

/** Native <details> accordion: zero JS, fully crawlable, mirrored in FAQPage JSON-LD. */
export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="relative bg-ink py-20 text-membrane md:py-28">
      <div className="container-x grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <SectionLabel index="10" label="FAQ" />
            <h2 id="faq-title" className="text-display mt-8 type-h2" data-reveal>
              Straight{" "}
              <span className="text-halo">answers</span>
            </h2>
            <p className="mt-6 max-w-[34ch] leading-relaxed text-membrane/60">
              For property owners who don&apos;t want risk. Still unsure? Speak to an engineer directly.
            </p>
            <a href={telHref} className="phone-btn mt-6 inline-flex items-center gap-3 font-mono text-sm tracking-wider text-membrane hover:text-halo">
              <span className="size-2 rounded-full bg-halo" />
              {site.phone}
            </a>
          </div>
        </div>

        <div className="border-t border-membrane/12 lg:col-span-8">
          {faqs.map((f, i) => (
            <details key={f.q} className="faq group border-b border-membrane/12" name="faq" open={i === 0}>
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 md:py-7">
                <h3 className="type-h4 md:text-[1.1875rem] font-medium leading-snug tracking-tight transition-colors group-hover:text-halo">
                  {f.q}
                </h3>
                <span
                  aria-hidden
                  className="relative mt-1 grid size-8 shrink-0 place-items-center rounded-full border border-membrane/20 transition-[transform,background-color,border-color] duration-500 group-open:rotate-45 group-open:border-halo group-open:bg-halo group-open:text-ink"
                >
                  <span className="absolute h-px w-3 bg-current" />
                  <span className="absolute h-3 w-px bg-current" />
                </span>
              </summary>
              <p className="max-w-[64ch] pb-7 pr-12 leading-relaxed text-membrane/65">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
