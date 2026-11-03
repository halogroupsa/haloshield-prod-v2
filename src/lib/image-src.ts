import { images, type ImageName } from "./images.generated";

/** Public URL of the largest generated width ≤ `max` (falls back to the smallest). */
export function imageSrc(name: ImageName, max = Infinity) {
  const widths = images[name].widths as readonly number[];
  if (!widths.length) return `/images/${name}.webp`;
  const fit = widths.filter((w) => w <= max);
  return `/images/${name}-${fit.length ? fit[fit.length - 1] : widths[0]}.webp`;
}
