import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fully static HTML export — deployed to Cloudflare Pages (output: ./out).
  output: "export",
  trailingSlash: true,
  // Images are pre-optimised into responsive WebP sets by scripts/optimize-images.py.
  images: { unoptimized: true },
  poweredByHeader: false,
  // CSS ships as one immutable, cached stylesheet. (inlineCss was tried: with 50+ pages it
  // duplicated ~95 KB into every HTML + RSC payload and measured no faster on Lighthouse mobile.)
  reactStrictMode: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  // Equivalent Tailwind transform for `next build --webpack`, useful in restricted
  // environments where Turbopack's loader-worker port cannot be opened.
  webpack(config) {
    config.module.rules.push({
      test: /globals\.css$/,
      enforce: "pre",
      use: [{ loader: "@tailwindcss/turbopack" }],
    });
    return config;
  },
};

export default nextConfig;
