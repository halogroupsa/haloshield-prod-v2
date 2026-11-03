import { PageHero } from "./PageHero";
import { JsonLd } from "./JsonLd";
import { pageGraph, type Crumb } from "@/lib/schema";

type Props = { title: string; description: string; path: string; updated: string; children: React.ReactNode };

/** Text page shell for policies. */
export function LegalPage({ title, description, path, updated, children }: Props) {
  const crumbs: Crumb[] = [
    { name: "Home", path: "/" },
    { name: title, path },
  ];
  return (
    <>
      <JsonLd data={pageGraph({ path, name: title, description, crumbs })} />
      <main id="main" className="bg-membrane text-ink">
        <PageHero size="sm" crumbs={crumbs} eyebrow="Legal" title={title} lede={`Last updated ${updated}`} actions={false} />
        <article className="container-x py-14 md:py-20">
          <div className="prose-legal mx-auto max-w-[68ch]">{children}</div>
        </article>
      </main>
    </>
  );
}
