import { Img } from "@/components/ui/Img";

/**
 * Full-bleed band carrying the brand statement over a fixed background image.
 * The image is position:fixed and the section's clip-path (inset 0) windows it, so it stays put
 * while the content scrolls — unlike background-attachment:fixed, this also works on iOS.
 */
export function Statement() {
  return (
    <section
      aria-label="Our approach"
      className="relative isolate flex min-h-[80svh] items-center bg-ink py-32 text-membrane [clip-path:inset(0)] md:min-h-[90svh] md:py-48"
    >
      <div aria-hidden className="fixed inset-0 -z-10">
        <Img name="dubai-skyline-roof-coating" alt="" sizes="100vw" className="size-full object-cover" />
        <div className="absolute inset-0 bg-ink/60" />
      </div>

      <div className="container-x w-full">
        <p className="text-display mx-auto max-w-[24ch] text-center type-h2" data-reveal>
          Waterproofing treats symptoms. <span className="text-halo-soft">Halo Shield eliminates the cause.</span>
        </p>
      </div>
    </section>
  );
}
