import { Img } from "@/components/ui/Img";
import type { ImageName } from "@/lib/images.generated";

const developers: { name: ImageName; alt: string; h: string }[] = [
  { name: "logo-emaar", alt: "Emaar Properties", h: "h-9" },
  { name: "logo-nakheel", alt: "Nakheel", h: "h-10" },
  { name: "logo-dubai-properties", alt: "Dubai Properties", h: "h-8" },
  { name: "logo-tecom", alt: "TECOM Group", h: "h-8" },
];
const press: { name: ImageName; alt: string; h: string }[] = [
  { name: "press-gulf-news", alt: "Gulf News", h: "h-5" },
  { name: "press-khaleej-times", alt: "Khaleej Times", h: "h-6" },
  { name: "press-gulf-today", alt: "Gulf Today", h: "h-6" },
  { name: "press-business-insider", alt: "Business Insider", h: "h-8" },
  { name: "press-yahoo-news", alt: "Yahoo News", h: "h-5" },
];

function Row({ dup = false }: { dup?: boolean }) {
  const a = dup ? ({ "aria-hidden": true } as const) : {};
  return (
    <>
      <li {...a} className="text-eyebrow shrink-0 rounded-full border border-membrane/15 px-3 py-2 text-membrane/60">Trusted in communities by</li>
      {developers.map((l) => (
        <li {...a} key={l.name} className="shrink-0">
          <Img name={l.name} alt={dup ? "" : l.alt} placeholder={false} className={`${l.h} w-auto opacity-60 transition-opacity hover:opacity-100`} />
        </li>
      ))}
      <li {...a} className="text-eyebrow shrink-0 rounded-full border border-membrane/15 px-3 py-2 text-membrane/60">As featured in</li>
      {press.map((l) => (
        <li {...a} key={l.name} className="shrink-0">
          <Img name={l.name} alt={dup ? "" : l.alt} placeholder={false} className={`${l.h} w-auto opacity-60 transition-opacity hover:opacity-100`} />
        </li>
      ))}
    </>
  );
}

export function TrustMarquee() {
  return (
    <section aria-label="Clients and press" className="relative border-y border-membrane/10 bg-ink py-8">
      <div className="group overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
        <ul
          className="flex w-max animate-marquee items-center gap-14 pr-14 group-hover:[animation-play-state:paused]"
          style={{ ["--marquee-duration" as string]: "48s" }}
        >
          <Row />
          {/* duplicate for a seamless loop; hidden from assistive tech */}
          <Row dup />
        </ul>
      </div>
    </section>
  );
}
