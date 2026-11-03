import Link from "next/link";

type Variant = "primary" | "light" | "dark" | "outline-light" | "outline-dark";

const styles: Record<Variant, string> = {
  primary: "bg-halo text-ink hover:bg-membrane",
  light: "bg-membrane text-ink hover:bg-halo",
  dark: "bg-ink text-membrane hover:bg-halo hover:text-ink",
  "outline-light": "border border-membrane/25 text-membrane hover:border-membrane/60 backdrop-blur",
  "outline-dark": "border border-ink/20 text-ink hover:border-ink/50",
};

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  /** Show the circular arrow chip. */
  arrow?: boolean;
  className?: string;
  external?: boolean;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">;

/**
 * Pill button. Internal paths render as next/link (prefetch + client navigation);
 * external / tel: / mailto: / hash-only links render as a plain <a>.
 */
export function Button({ href, children, variant = "primary", arrow, className = "", external, ...rest }: Props) {
  const cls = `group inline-flex items-center justify-center gap-3 rounded-full text-[0.875rem] font-semibold transition-colors duration-300 ${
    arrow ? "py-2 pl-5 pr-2" : "px-5 py-3"
  } min-h-11 ${styles[variant]} ${className}`;
  const inner = (
    <>
      {children}
      {arrow && (
        <span
          className={`grid size-8 place-items-center rounded-full transition-transform duration-500 ease-out-expo group-hover:-rotate-45 ${
            variant === "primary" || variant === "light" ? "bg-ink text-membrane" : variant === "dark" ? "bg-membrane text-ink" : "bg-current/10"
          }`}
        >
          <ArrowIcon />
        </span>
      )}
    </>
  );
  const isInternal = href.startsWith("/") && !external;
  if (isInternal) {
    return (
      <Link href={href} className={cls} {...rest}>
        {inner}
      </Link>
    );
  }
  return (
    <a href={href} className={cls} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : null)} {...rest}>
      {inner}
    </a>
  );
}

export function ArrowIcon({ size = 14, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" aria-hidden className={className}>
      <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export function ChevronIcon({ size = 10, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 10 10" fill="none" aria-hidden className={className}>
      <path d="M1.5 3.5 5 7l3.5-3.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
