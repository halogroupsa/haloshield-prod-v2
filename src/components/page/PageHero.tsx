import { Img } from "@/components/ui/Img";
import { Button } from "@/components/ui/Button";
import { Breadcrumbs } from "./Breadcrumbs";
import { whatsappHref } from "@/lib/site";
import type { Crumb } from "@/lib/schema";
import type { ImageName } from "@/lib/images.generated";

type Props = {
  crumbs: Crumb[];
  eyebrow?: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  image?: ImageName;
  imageAlt?: string;
  /** Glass chips pinned bottom-right on desktop (reference: "Hot · Price · Place"). */
  chips?: string[];
  /** "lg" for landing pages, "md" for hubs, "sm" for text pages (no image). */
  size?: "lg" | "md" | "sm";
  /** Pre-filled WhatsApp message for the secondary CTA. */
  whatsapp?: string;
  actions?: boolean;
  children?: React.ReactNode;
};

/**
 * Inner-page hero: an inset, rounded image card the header floats inside (as in the reference).
 * The image is the LCP element, so it is eager + high priority with explicit dimensions.
 */
export function PageHero({
  crumbs,
  eyebrow,
  title,
  lede,
  image,
  imageAlt = "",
  chips,
  size = "lg",
  whatsapp,
  actions = true,
  children,
}: Props) {
  const minH =
    size === "lg"
      ? "min-h-[max(560px,82svh)] md:min-h-[max(620px,86svh)]"
      : size === "md"
        ? "min-h-[max(480px,64svh)] md:min-h-[max(540px,70svh)]"
        : "min-h-[360px] md:min-h-[420px]";

  return (
    <section aria-label="Introduction" className="bg-membrane p-2 md:p-3">
      <div className={`relative isolate flex overflow-hidden rounded-[22px] bg-ink text-membrane md:rounded-[32px] ${minH}`}>
        {image ? (
          <>
            <Img
              name={image}
              alt={imageAlt}
              sizes="100vw"
              priority
              className="hero-zoom absolute inset-0 -z-10 size-full object-cover"
            />
            <div
              aria-hidden
              className="absolute inset-0 -z-10 bg-ink/65 lg:bg-ink/35"
            />
            <div
              aria-hidden
              className="absolute inset-0 -z-10 bg-linear-to-t from-ink/50 via-ink/15 to-ink/10 lg:bg-[linear-gradient(90deg,rgb(12_12_13/0.82)_0%,rgb(12_12_13/0.70)_45%,rgb(12_12_13/0.30)_70%,transparent_100%)]"
            />
          </>
        ) : (
          <>
            <div aria-hidden className="blueprint absolute inset-0 -z-10 text-membrane opacity-50 [mask-image:radial-gradient(80%_80%_at_80%_20%,#000,transparent)]" />
            <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(50%_60%_at_85%_10%,rgb(159_183_201/0.18),transparent_70%)]" />
          </>
        )}

        <div className="container-x relative flex w-full flex-col justify-end pb-8 pt-28 md:pb-12 md:pt-36">
          <Breadcrumbs crumbs={crumbs} />
          {eyebrow && (
            <p className="text-eyebrow mt-6 flex items-center gap-3 text-membrane/90 md:mt-8">
              <span className="h-px w-6 bg-halo" />
              {eyebrow}
            </p>
          )}
          <h1 className={`text-display mt-4 max-w-[20ch] text-membrane [text-shadow:0_2px_16px_rgb(0_0_0/0.3)] ${size === "sm" ? "type-h2 md:type-hero" : "type-hero"}`}>{title}</h1>
          <div className="mt-4 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              {lede && <p className="max-w-[52ch] text-[0.9375rem] leading-relaxed text-membrane/95 md:text-base">{lede}</p>}
              {actions && (
                <div className="mt-6 flex flex-wrap gap-2.5 md:mt-7">
                  <Button href="#book" arrow>
                    <span className="min-[420px]:hidden">Free inspection</span>
                    <span className="hidden min-[420px]:inline">Book a free inspection</span>
                  </Button>
                  <Button
                    href={whatsappHref(whatsapp)}
                    external
                    variant="outline-light"
                    className="whatsapp-btn border-membrane/45 bg-ink/65 hover:bg-ink/85"
                  >
                    Ask an engineer
                  </Button>
                </div>
              )}
              {children}
            </div>
            {chips && chips.length > 0 && (
              <ul className="hidden flex-wrap justify-end gap-2 md:flex lg:max-w-[40%]">
                {chips.map((c) => (
                  <li
                    key={c}
                    className="rounded-full border border-membrane/30 bg-ink/75 px-3.5 py-1.5 text-[0.8125rem] text-membrane/95 backdrop-blur-md"
                  >
                    {c}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
