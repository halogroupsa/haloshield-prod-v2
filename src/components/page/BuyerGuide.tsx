import { buyerGuides } from "@/lib/content/buyer-guides";
import { Button } from "@/components/ui/Button";

export function BuyerGuide({ slug }: { slug: string }) {
  const guide = buyerGuides[slug];
  if (!guide) return null;
  return (
    <section aria-labelledby="quotation-scope" className="bg-bone py-16 md:py-24">
      <div className="container-x">
        <div className="grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="text-eyebrow text-ink/60">Before you appoint a contractor</p>
            <h2 id="quotation-scope" className="text-display type-h2 mt-4 max-w-[22ch]">{guide.heading}: what to check in your quote</h2>
            <p className="mt-5 max-w-[44ch] leading-relaxed text-ink/70">The final scope follows inspection. Ask for preparation, materials, access, testing and reinstatement to be itemised so you can compare proposals fairly.</p>
            <div className="mt-7"><Button href="#book" variant="dark" arrow>Discuss your scope</Button></div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:col-span-7">
            {[{ title: "Define the work included", items: guide.included }, { title: "Items that may cost extra", items: guide.extras }].map((card) => (
              <div key={card.title} className="rounded-[22px] bg-membrane p-6 md:p-8">
                <h3 className="text-[1.125rem] font-medium">{card.title}</h3>
                <ul className="mt-5 list-disc space-y-4 pl-5 text-[0.9375rem] leading-relaxed text-ink/70">{card.items.map((item) => <li key={item}>{item}</li>)}</ul>
              </div>
            ))}
            <div className="rounded-[22px] bg-ink p-6 text-membrane sm:col-span-2 md:p-8">
              <h3 className="text-[1.125rem] font-medium">What to send for an accurate quotation</h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-membrane/75">{guide.inputs}</p>
              <h3 className="mt-6 text-[1.125rem] font-medium">Comparing proposals</h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-membrane/75">{guide.compare}</p>
            </div>
          </div>
        </div>
        <div className="mt-10 grid gap-6 border-t border-ink/15 pt-8 md:grid-cols-2">
          <div><h3 className="font-medium">Changes to price and programme</h3><p className="mt-3 text-[0.9375rem] leading-relaxed text-ink/70">Concealed damage, additional areas, changed materials or access restrictions can change the work. Ask for the extra cost, revised completion date and any effect on testing or warranty to be recorded and agreed before additional work proceeds.</p></div>
          <div><h3 className="font-medium">Testing, handover and warranty</h3><p className="mt-3 text-[0.9375rem] leading-relaxed text-ink/70">Confirm the inspection or testing method, completion records, aftercare and written warranty for the selected system. Coverage, duration, exclusions and maintenance requirements should be stated for your specific project.</p></div>
        </div>
      </div>
    </section>
  );
}
