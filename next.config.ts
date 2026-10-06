import type { NextConfig } from "next";

/**
 * Fully static site (GitHub Pages): every page is pre-rendered to HTML in out/.
 * Consequences handled in the code: language choice on "/" happens in
 * public/index.html, unknown URLs land on app/global-not-found.tsx, and
 * images are served as-is (they are already small WebP files).
 */
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  poweredByHeader: false,
  images: { unoptimized: true },
  experimental: {
    /* Most visitors (recruiters) arrive once: shipping the small Tailwind CSS inside the HTML
       removes a render-blocking request on first load. */
    inlineCss: true,
    globalNotFound: true,
  },
};

export default nextConfig;
