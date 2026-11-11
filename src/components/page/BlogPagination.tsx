import Link from "next/link";
import { ArrowIcon } from "@/components/ui/Button";

const linkClass = "inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-full border border-ink/15 px-3 text-sm font-medium transition-colors hover:border-ink hover:bg-ink hover:text-membrane";

export function BlogPagination({ page, totalPages, hrefFor, label }: {
  page: number;
  totalPages: number;
  hrefFor: (page: number) => string;
  label: string;
}) {
  if (totalPages < 2) return null;
  const numbers = [...new Set([1, page - 1, page, page + 1, totalPages])]
    .filter((number) => number >= 1 && number <= totalPages)
    .sort((a, b) => a - b);

  return (
    <nav aria-label={label} className="mt-9 flex flex-wrap items-center gap-2 border-t border-ink/12 pt-6">
      {page > 1 && (
        <Link href={hrefFor(page - 1)} className={linkClass} prefetch={false}>
          <ArrowIcon size={12} className="rotate-180" /> Previous
        </Link>
      )}
      <ol className="flex flex-wrap items-center gap-1.5">
        {numbers.map((number, index) => (
          <li key={number} className="flex items-center gap-1.5">
            {index > 0 && number - numbers[index - 1] > 1 && <span aria-hidden="true" className="px-1 text-ink/55">…</span>}
            {number === page ? (
              <span aria-current="page" aria-label={`Page ${number}`} className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full bg-ink px-3 text-sm font-medium text-membrane">
                {number}
              </span>
            ) : (
              <Link href={hrefFor(number)} aria-label={`Page ${number}`} className={linkClass} prefetch={false}>
                {number}
              </Link>
            )}
          </li>
        ))}
      </ol>
      {page < totalPages && (
        <Link href={hrefFor(page + 1)} className={linkClass} prefetch={false}>
          Next <ArrowIcon size={12} />
        </Link>
      )}
    </nav>
  );
}
