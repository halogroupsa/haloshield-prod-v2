"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

type LenisLike = { scrollTo: (y: number, o?: { immediate?: boolean; force?: boolean }) => void; resize: () => void };

/**
 * Page runtime, mounted once:
 *  - Lenis smooth scrolling (desktop pointer only, off for reduced motion)
 *  - one shared IntersectionObserver that flips `.is-in` on [data-reveal] / .line-mask / .strike
 */
export function SmoothScroll() {
  const pathname = usePathname();

  // Client-side navigation: Lenis keeps its own scroll target, so jump it to the top
  // (unless the URL targets an anchor) and re-measure the new page.
  useEffect(() => {
    const lenis = (window as unknown as { __lenis?: LenisLike }).__lenis;
    if (!lenis) return;
    if (!window.location.hash) lenis.scrollTo(0, { immediate: true, force: true });
    lenis.resize();
  }, [pathname]);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(pointer: fine)").matches;

    // Reveal observer
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.01 },
    );
    const observeAll = () =>
      document.querySelectorAll("[data-reveal]:not(.is-in), [data-reveal-group]:not(.is-in)").forEach((el) => io.observe(el));
    observeAll();
    const mo = new MutationObserver(observeAll);
    mo.observe(document.body, { childList: true, subtree: true });

    // Smooth scroll
    let destroy: (() => void) | undefined;
    const intents = ["wheel", "pointermove", "keydown"] as const;
    const initLenis = () => {
      intents.forEach((e) => window.removeEventListener(e, initLenis));
      import("lenis").then(({ default: Lenis }) => {
        const lenis = new Lenis({ duration: 1.15, smoothWheel: true, anchors: { offset: -88 } });
        let raf = 0;
        const loop = (t: number) => {
          lenis.raf(t);
          raf = requestAnimationFrame(loop);
        };
        raf = requestAnimationFrame(loop);
        (window as unknown as { __lenis?: unknown }).__lenis = lenis;
        destroy = () => {
          cancelAnimationFrame(raf);
          lenis.destroy();
        };
      });
    };
    // Smooth scrolling only matters once someone scrolls — load it on first intent, not on page load.
    if (!reduce && fine) intents.forEach((e) => window.addEventListener(e, initLenis, { once: true, passive: true }));

    return () => {
      intents.forEach((e) => window.removeEventListener(e, initLenis));
      io.disconnect();
      mo.disconnect();
      destroy?.();
    };
  }, []);

  return null;
}
