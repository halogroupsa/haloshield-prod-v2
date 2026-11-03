type Props = {
  items: readonly { q: string; a: string }[];
  tone?: "light" | "dark";
  /** Group name so opening one question closes the others (native exclusive accordion). */
  name?: string;
  openFirst?: boolean;
};

/** Native <details> accordion: zero JS, fully crawlable, mirrored in FAQPage JSON-LD by the page. */
export function FaqList({ items, tone = "dark", name = "faq", openFirst = true }: Props) {
  const line = tone === "dark" ? "border-ink/12" : "border-membrane/12";
  const body = tone === "dark" ? "text-ink/70" : "text-membrane/65";
  const ring =
    tone === "dark"
      ? "border-ink/20 group-open:border-ink group-open:bg-ink group-open:text-membrane"
      : "border-membrane/20 group-open:border-halo group-open:bg-halo group-open:text-ink";
  return (
    <div className={`border-t ${line}`}>
      {items.map((f, i) => (
        <details key={f.q} className={`faq group border-b ${line}`} name={name} open={openFirst && i === 0}>
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 md:py-6">
            <h3 className={`type-h4 font-medium transition-colors md:text-[1.125rem] ${tone === "dark" ? "group-hover:text-halo-deep" : "group-hover:text-halo"}`}>{f.q}</h3>
            <span
              aria-hidden
              className={`relative mt-0.5 grid size-7 shrink-0 place-items-center rounded-full border transition-[transform,background-color,border-color] duration-500 group-open:rotate-45 ${ring}`}
            >
              <span className="absolute h-px w-2.5 bg-current" />
              <span className="absolute h-2.5 w-px bg-current" />
            </span>
          </summary>
          <p className={`max-w-[64ch] pb-6 pr-10 text-[0.9375rem] leading-relaxed ${body}`}>{f.a}</p>
        </details>
      ))}
    </div>
  );
}
