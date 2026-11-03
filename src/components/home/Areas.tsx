import { Img } from "@/components/ui/Img";
import Link from "next/link";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { communities, emirates } from "@/lib/site";

export function Areas() {
  return (
    <section id="areas" aria-labelledby="areas-title" className="relative overflow-hidden bg-ink text-membrane">
      <div className="absolute inset-0">
        <Img
          name="palm-jumeirah-aerial-dubai"
          alt="Aerial view of Palm Jumeirah villas and the Dubai Marina skyline"
          sizes="100vw"
          className="size-full object-cover opacity-75"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,var(--color-ink)_8%,rgb(12_12_13/0.75)_45%,rgb(12_12_13/0.35))]" />
        <div className="absolute inset-0 bg-linear-to-b from-ink via-transparent to-ink" />
      </div>

      <div className="container-x relative grid gap-14 py-20 md:py-28 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionLabel index="09" label="Areas we cover" />
          <h2 id="areas-title" className="text-display mt-8 type-h2" data-reveal>
            Every Dubai{" "}
            <span className="text-halo">community</span>, covered
          </h2>
          <p className="mt-6 max-w-[46ch] leading-relaxed text-membrane/70" data-reveal>
            Whether it&apos;s a leaking roof in Arabian Ranches, a basement in Dubai Hills Estate, a pool on Palm
            Jumeirah or a podium deck in Business Bay, our Al Quoz-based engineers and crews are on site fast — with
            the same 360° inspection and LuxGuard™ system on every job.
          </p>
          <p className="mt-10 text-eyebrow text-membrane/60">Also across the UAE</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {emirates.map((e) => (
              <li key={e.slug}>
                <Link
                  href={`/${e.slug}/`}
                  className="inline-block rounded-full border border-membrane/20 px-4 py-2 text-sm text-membrane/80 backdrop-blur transition-colors hover:border-halo hover:text-membrane"
                >
                  {e.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <nav aria-label="Dubai communities" className="lg:col-span-6 lg:col-start-7">
          <ul className="grid grid-cols-1 border-t border-membrane/15 sm:grid-cols-2 sm:gap-x-8">
            {communities.map((c, i) => (
              <li key={c.slug} className="border-b border-membrane/15" data-reveal style={{ ["--reveal-delay" as string]: `${(i % 8) * 40}ms` }}>
                <Link
                  href={`/${c.slug}/`}
                  className="group flex items-center justify-between py-4 text-[1.05rem] transition-colors hover:text-halo"
                >
                  <span>
                    <span className="mr-3 font-mono text-[0.65rem] text-membrane/60">{String(i + 1).padStart(2, "0")}</span>
                    Waterproofing in {c.name}
                  </span>
                  <span aria-hidden className="translate-x-[-6px] opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
