/** Scroll the page back to the top, through Lenis when it is driving the scroll (see SmoothScroll). */
export function scrollToTop() {
  const lenis = (window as unknown as { __lenis?: { scrollTo: (y: number) => void } }).__lenis;
  if (lenis) return lenis.scrollTo(0);
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
}
