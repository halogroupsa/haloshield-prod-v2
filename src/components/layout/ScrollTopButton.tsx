"use client";

import { useEffect, useState } from "react";
import { scrollToTop } from "@/lib/scroll";

/** Fades in two screens down: bottom left on mobile, above WhatsApp on desktop. */
export function ScrollTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const update = () => setVisible(window.scrollY > window.innerHeight * 2);
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll up"
      title="Scroll up"
      tabIndex={visible ? 0 : -1}
      className={`fixed bottom-[max(1.5rem,env(safe-area-inset-bottom))] left-6 z-40 grid size-11 place-items-center rounded-full bg-ink/90 text-membrane shadow-[0_2px_8px_rgb(0_0_0/0.12)] transition-[opacity,translate,background-color,box-shadow] duration-200 hover:bg-ink hover:shadow-[0_4px_12px_rgb(0_0_0/0.15)] md:bottom-19 md:left-auto md:right-6 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none invisible translate-y-2 opacity-0"
      }`}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden className="size-5">
        <path d="M7 9 L12 4 L17 9" />
        <path d="M7 13 L12 8 L17 13" opacity={0.55} />
        <path d="M7 17 L12 12 L17 17" opacity={0.25} />
      </svg>
    </button>
  );
}
