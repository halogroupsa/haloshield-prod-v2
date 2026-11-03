type Props = { variant?: "full" | "mark"; className?: string; label?: string };

/** Brand logo rendered via CSS mask so it inherits `color` (white on ink, ink on bone). */
export function Logo({ variant = "full", className = "", label = "Halo Shield" }: Props) {
  const src = variant === "full" ? "/brand/halo-shield-logo.svg" : "/brand/halo-shield-mark.svg";
  const ratio = variant === "full" ? "2046 / 541" : "521 / 541";
  return (
    <span
      {...(label ? { role: "img", "aria-label": label } : { "aria-hidden": true })}
      className={`logo-mask inline-block ${className}`}
      style={{ ["--logo-src" as string]: `url(${src})`, aspectRatio: ratio }}
    />
  );
}
