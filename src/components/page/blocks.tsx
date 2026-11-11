import Link from "next/link";
import type { ImageName } from "@/lib/images";
import { Img } from "@/components/ui/Img";
import { ArrowIcon, Button } from "@/components/ui/Button";
import { CountUp } from "@/components/ui/CountUp";
import { Logo } from "@/components/ui/Logo";
import { CardRail } from "./CardRail";
import { communities, emirates, luxguardLayers, processSteps, projects, stats, type Service } from "@/lib/site";

/* Small, server-rendered building blocks shared by the inner pages. */

type Project = (typeof projects)[number];

type ProjectCardData = {
  title: string;
  location: string;
  type: string;
  spec: string;
  image: ImageName;
};

export function ProjectCard({
  p,
  href,
  imageAlt,
  sizes = "(min-width: 1024px) 30vw, 80vw",
  aspect = "aspect-[4/5]",
}: {
  p: ProjectCardData;
  href?: string;
  imageAlt?: string;
  sizes?: string;
  aspect?: string;
}) {
  const figure = (
    <figure className={`group relative overflow-hidden ${aspect} rounded-[22px] bg-ink-3 text-membrane`}>
      <Img
        name={p.image}
        alt={imageAlt ?? `${p.title} in ${p.location}, Dubai — ${p.spec}`}
        sizes={sizes}
        className="absolute inset-0 size-full object-cover transition-transform duration-[1.4s] ease-out-expo group-hover:scale-[1.04]"
      />
      <div aria-hidden className="absolute inset-0 bg-linear-to-t from-ink/85 via-ink/10 to-transparent" />
      <span className="absolute left-4 top-4 flex gap-1.5">
        <span className="rounded-full bg-membrane/90 px-3 py-1 text-[0.75rem] font-medium text-ink">{p.type}</span>
        <span className="rounded-full bg-ink/40 px-3 py-1 text-[0.75rem] text-membrane backdrop-blur">{p.location}</span>
      </span>
      <figcaption className={`absolute inset-x-0 bottom-0 p-5 ${href ? "pr-16" : ""}`}>
        <span className="block text-[1.125rem] font-medium leading-snug tracking-tight">{p.title}</span>
        <span className="mt-1 block text-[0.8125rem] text-membrane/75">{p.spec}</span>
        {href && (
          <span className="absolute bottom-5 right-5 grid size-9 place-items-center rounded-full bg-membrane/15 backdrop-blur transition-colors group-hover:bg-halo group-hover:text-ink group-focus-visible:bg-halo group-focus-visible:text-ink">
            <ArrowIcon size={12} />
          </span>
        )}
      </figcaption>
    </figure>
  );

  return href ? <Link href={href} className="group block rounded-[22px]" prefetch={false}>{figure}</Link> : figure;
}

export function ProjectRail({ title, list = projects }: { title: React.ReactNode; list?: readonly Project[] }) {
  return (
    <CardRail label="Projects" title={title}>
      {list.map((p) => (
        <ProjectCard key={p.title + p.location} p={p} />
      ))}
    </CardRail>
  );
}

/** Service tile for hubs and grids. */
export function ServiceTile({ s, index }: { s: Service; index?: number }) {
  return (
    <Link
      href={`/services/${s.slug}/`}
      className="group flex h-full flex-col overflow-hidden rounded-[22px] bg-membrane ring-1 ring-ink/8 transition-shadow duration-500 hover:shadow-[0_30px_60px_-35px_rgb(12_12_13/0.45)]"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-ink-3">
        <Img
          name={s.image}
          alt={`${s.name} by Halo Shield in Dubai`}
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw"
          className="absolute inset-0 size-full object-cover transition-transform duration-[1.4s] ease-out-expo group-hover:scale-[1.04]"
        />
        {index !== undefined && (
          <span className="absolute left-4 top-4 rounded-full bg-membrane/90 px-3 py-1 font-mono text-[0.6875rem] text-ink">
            {String(index + 1).padStart(2, "0")}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5 md:p-6">
        <h3 className="text-[1.125rem] font-medium leading-snug tracking-tight">{s.name}</h3>
        <p className="mt-2 flex-1 text-[0.875rem] leading-relaxed text-ink/65">{s.short}</p>
        <span className="mt-5 inline-flex items-center gap-2 text-[0.8125rem] font-semibold text-ink">
          View service
          <ArrowIcon size={12} className="transition-transform duration-500 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

/** The four-step method, compact. */
export function ProcessStrip({ tone = "dark" }: { tone?: "light" | "dark" }) {
  const muted = tone === "dark" ? "text-ink/65" : "text-membrane/65";
  const card = tone === "dark" ? "bg-membrane ring-1 ring-ink/8" : "bg-membrane/[0.04] ring-1 ring-membrane/10";
  return (
    <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {processSteps.map((s, i) => (
        <li key={s.title} className={`flex flex-col rounded-[22px] p-6 ${card}`} data-reveal style={{ ["--reveal-delay" as string]: `${i * 80}ms` }}>
          <span className="font-mono text-[0.75rem] text-halo-ink">
            <span className="sr-only">Step </span>
            {String(i + 1).padStart(2, "0")}
          </span>
          <h3 className="mt-8 text-[1.0625rem] font-medium leading-snug tracking-tight md:mt-12">{s.title}</h3>
          <p className={`mt-2 text-[0.875rem] leading-relaxed ${muted}`}>{s.body}</p>
        </li>
      ))}
    </ol>
  );
}

export function StatsBand({ tone = "dark" }: { tone?: "light" | "dark" }) {
  const line = tone === "dark" ? "border-ink/15" : "border-membrane/15";
  const muted = tone === "dark" ? "text-ink/65" : "text-membrane/60";
  return (
    <dl className={`grid grid-cols-2 border-t lg:grid-cols-4 ${line}`}>
      {stats.map((s, i) => (
        <div key={s.label} className={`flex flex-col-reverse justify-end py-8 pr-4 ${i % 2 ? `border-l pl-5 ${line}` : ""} ${i === 2 ? `lg:border-l lg:pl-5 ${line}` : ""}`}>
          <dt className={`mt-2 text-[0.8125rem] ${muted}`}>{s.label}</dt>
          <dd className="text-display type-stat">
            <CountUp value={s.value} decimals={"decimals" in s ? s.decimals : 0} suffix={s.suffix} />
          </dd>
        </div>
      ))}
    </dl>
  );
}

/** Internal links to every area page — pass the current slug to leave it out. */
export function AreaChips({ exclude, tone = "dark" }: { exclude?: string; tone?: "light" | "dark" }) {
  const chip =
    tone === "dark"
      ? "border-ink/15 text-ink/80 hover:border-ink hover:bg-ink hover:text-membrane"
      : "border-membrane/20 text-membrane/80 hover:border-halo hover:text-membrane";
  return (
    <ul className="flex flex-wrap gap-2">
      {[...communities, ...emirates]
        .filter((a) => a.slug !== exclude)
        .map((a) => (
          <li key={a.slug}>
            <Link href={`/${a.slug}/`} className={`inline-flex min-h-10 items-center rounded-full border px-4 text-[0.8125rem] transition-colors ${chip}`}>
              {a.name}
            </Link>
          </li>
        ))}
    </ul>
  );
}

/** Dark band that introduces LuxGuard™ on pages other than its own. */
export function LuxGuardTeaser() {
  return (
    <section aria-labelledby="lg-teaser" className="bg-membrane px-2 pb-2 md:px-3 md:pb-3">
      <div className="relative isolate overflow-hidden rounded-[22px] bg-ink py-16 text-membrane md:rounded-[32px] md:py-24">
        <Logo variant="mark" label="" className="pointer-events-none absolute -right-24 -top-16 -z-10 w-[26rem] text-membrane/[0.04] md:w-[34rem]" />
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <p className="text-eyebrow flex items-center gap-3 text-membrane/60">
              <span className="h-px w-6 bg-halo" />
              The system
            </p>
            <h2 id="lg-teaser" className="text-display type-h2 mt-4" data-reveal>
              LuxGuard™ 360° — seven layers, <span className="text-halo">one seamless</span> shield.
            </h2>
            <p className="mt-5 max-w-[44ch] text-[0.9375rem] leading-relaxed text-membrane/65" data-reveal>
              Every Halo Shield system is built on the same engineered stack: bonded to the substrate, designed to move, and
              finished to take Dubai sun and foot traffic for decades.
            </p>
            <div className="mt-7">
              <Button href="/luxguard-360/" variant="light" arrow>
                Explore LuxGuard™
              </Button>
            </div>
          </div>
          <ol className="grid gap-px overflow-hidden rounded-[18px] bg-membrane/10 sm:grid-cols-2 lg:col-span-7">
            {luxguardLayers.map((l, i) => (
              <li key={l.name} className={`flex items-center gap-4 bg-ink p-4 md:p-5 ${i === luxguardLayers.length - 1 ? "sm:col-span-2" : ""}`}>
                <span className="size-8 shrink-0 rounded-md" style={{ background: l.tone }} aria-hidden />
                <span className="min-w-0">
                  <span className="block text-[0.9375rem] font-medium">{l.name}</span>
                  <span className="block text-[0.8125rem] text-membrane/55">{l.stat}</span>
                </span>
                <span className="ml-auto font-mono text-[0.6875rem] text-membrane/60">{String(i + 1).padStart(2, "0")}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
