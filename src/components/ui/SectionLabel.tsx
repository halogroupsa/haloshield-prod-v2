type Props = { index: string; label: string; tone?: "light" | "dark"; className?: string };

/** Numbered section marker: "01 —— The problem" */
export function SectionLabel({ index, label, tone = "light", className = "" }: Props) {
  const c = tone === "light" ? "text-membrane/60" : "text-ink/60";
  return (
    <p className={`text-eyebrow flex items-center gap-4 ${c} ${className}`} data-reveal>
      <span className={tone === "light" ? "text-halo" : "font-semibold text-ink"}>{index}</span>
      <span className={`h-px w-14 ${tone === "light" ? "bg-membrane/25" : "bg-ink/25"}`} />
      {label}
    </p>
  );
}
