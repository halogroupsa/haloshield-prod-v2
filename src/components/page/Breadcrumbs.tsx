import Link from "next/link";
import type { Crumb } from "@/lib/schema";

/** Visible breadcrumb trail; the same `crumbs` feed the BreadcrumbList JSON-LD. */
export function Breadcrumbs({ crumbs, tone = "light" }: { crumbs: Crumb[]; tone?: "light" | "dark" }) {
  const muted = tone === "light" ? "text-membrane/90 hover:text-membrane" : "text-ink/60 hover:text-ink";
  const current = tone === "light" ? "text-membrane" : "text-ink";
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.8125rem]">
        {crumbs.map((c, i) => {
          const last = i === crumbs.length - 1;
          return (
            <li key={c.path} className="flex items-center gap-2">
              {last ? (
                <span aria-current="page" className={`line-clamp-1 ${current}`}>
                  {c.name}
                </span>
              ) : (
                <>
                  <Link href={c.path} className={`transition-colors ${muted}`}>
                    {c.name}
                  </Link>
                  <span aria-hidden className={tone === "light" ? "text-membrane/65" : "text-ink/30"}>
                    /
                  </span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
