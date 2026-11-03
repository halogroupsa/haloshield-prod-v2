/**
 * The Halo Shield silhouette, normalised to a 0–1 box so any element can be
 * clipped to it with `clip-path: url(#shield-clip)`. Proportions follow the logo mark
 * (520 × 541): a gently peaked top, straight flanks, and a soft point.
 */
export const SHIELD_PATH =
  "M0,0.036 L0.5,0 L1,0.03 L1,0.555 C0.975,0.7 0.8,0.855 0.5,1 C0.2,0.855 0.025,0.7 0,0.555 Z";

/**
 * Outer silhouette of the logo mark (viewBox 0 0 521 541), lifted from
 * /brand/halo-shield-mark.svg. Used by the audience cards for their double-border frame.
 */
export const MARK_VIEWBOX = "0 0 521 541";
export const MARK_OUTLINE_PATH =
  "M135.665 9.09509C67.7985 14.4284 9.93182 18.8284 6.86516 18.8284L1.39849 18.9617L0.465156 155.228C-0.334845 257.762 -0.0681778 294.162 0.998489 301.628C11.2652 366.428 74.3318 435.762 180.332 498.962C200.999 511.228 256.865 540.295 259.798 540.295C265.665 540.295 341.265 499.362 366.332 482.562C452.732 424.695 500.865 370.695 517.399 312.562L520.332 302.295L519.932 158.962C519.665 80.1617 519.132 15.3618 518.865 15.0951C518.332 14.5618 417.665 8.42841 268.999 0.0283813C263.265 -0.371643 206.865 3.49512 135.665 9.09509Z";

/** Polygon approximation of SHIELD_PATH (normalised) for hit-testing in canvas. */
export const SHIELD_POLY: [number, number][] = (() => {
  const pts: [number, number][] = [
    [0, 0.036],
    [0.5, 0],
    [1, 0.03],
    [1, 0.555],
  ];
  // right curve: cubic (1,0.555) (0.975,0.7) (0.8,0.855) (0.5,1)
  const cubic = (p0: number[], p1: number[], p2: number[], p3: number[], t: number) => {
    const u = 1 - t;
    return [
      u * u * u * p0[0] + 3 * u * u * t * p1[0] + 3 * u * t * t * p2[0] + t * t * t * p3[0],
      u * u * u * p0[1] + 3 * u * u * t * p1[1] + 3 * u * t * t * p2[1] + t * t * t * p3[1],
    ] as [number, number];
  };
  for (let i = 1; i <= 8; i++) pts.push(cubic([1, 0.555], [0.975, 0.7], [0.8, 0.855], [0.5, 1], i / 8));
  for (let i = 1; i <= 8; i++) pts.push(cubic([0.5, 1], [0.2, 0.855], [0.025, 0.7], [0, 0.555], i / 8));
  return pts;
})();

export function ShieldDefs() {
  return (
    <svg width="0" height="0" aria-hidden="true" focusable="false" style={{ position: "absolute" }}>
      <defs>
        <clipPath id="shield-clip" clipPathUnits="objectBoundingBox">
          <path d={SHIELD_PATH} />
        </clipPath>
        {/* Exact outer silhouette of the logo mark. */}
        <clipPath id="shield-mark-clip" clipPathUnits="objectBoundingBox">
          <path d={MARK_OUTLINE_PATH} transform="scale(0.00191939 0.00184843)" />
        </clipPath>
        {/* Luminance → cool, white-hot thermal palette, used by the diagnostic lens. */}
        <filter id="thermal" colorInterpolationFilters="sRGB">
          <feColorMatrix
            type="matrix"
            values="0.33 0.5 0.17 0 0  0.33 0.5 0.17 0 0  0.33 0.5 0.17 0 0  0 0 0 1 0"
          />
          <feComponentTransfer>
            <feFuncR type="table" tableValues="0.063 0.098 0.145 0.294 0.502 0.718 0.949" />
            <feFuncG type="table" tableValues="0.114 0.247 0.408 0.588 0.741 0.863 0.980" />
            <feFuncB type="table" tableValues="0.239 0.439 0.580 0.729 0.812 0.898 0.988" />
          </feComponentTransfer>
        </filter>
      </defs>
    </svg>
  );
}
