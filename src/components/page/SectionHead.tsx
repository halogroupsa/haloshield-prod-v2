type Props = {
  eyebrow?: string;
  title: React.ReactNode;
  /** Right-hand column: a short paragraph, a link, or controls. */
  aside?: React.ReactNode;
  tone?: "light" | "dark";
  id?: string;
  className?: string;
};

/** Section heading row used across inner pages: eyebrow + h2 left, supporting copy right. */
export function SectionHead({ eyebrow, title, aside, tone = "dark", id, className = "" }: Props) {
  const muted = tone === "dark" ? "text-ink/60" : "text-membrane/60";
  return (
    <div className={`grid gap-5 md:grid-cols-12 md:items-end ${className}`}>
      <div className="md:col-span-7">
        {eyebrow && (
          <p className={`text-eyebrow flex items-center gap-3 ${muted}`} data-reveal>
            <span className="h-px w-6 bg-halo" />
            {eyebrow}
          </p>
        )}
        <h2 id={id} className="text-display type-h2 mt-4 max-w-[22ch]" data-reveal>
          {title}
        </h2>
      </div>
      {aside && (
        <div className={`text-[0.9375rem] leading-relaxed md:col-span-5 md:justify-self-end ${muted}`} data-reveal>
          {aside}
        </div>
      )}
    </div>
  );
}
