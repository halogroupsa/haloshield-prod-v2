import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";

export const metadata: Metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  return (
    <main id="main" className="grid min-h-svh place-items-center bg-ink px-6 text-center text-membrane">
      <div>
        <Logo variant="mark" className="mx-auto w-16 text-halo" label="" />
        <h1 className="text-display mt-8 type-hero">
          Found a leak.
        </h1>
        <p className="mt-4 text-membrane/60">This page doesn&apos;t exist — yet.</p>
        <Link href="/" className="mt-8 inline-block rounded-full bg-halo px-6 py-3.5 font-semibold text-ink">
          Back to safety
        </Link>
      </div>
    </main>
  );
}
