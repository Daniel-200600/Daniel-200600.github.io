import type { Metadata } from "next";
import { locales, type Locale } from "@/i18n/config";

/**
 * Public origin of the site.
 * Set by the deployment (GitHub Pages workflow) through NEXT_PUBLIC_SITE_URL;
 * Vercel's production domain or localhost otherwise.
 */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

/** "/projects" -> "/fr/projects/" (the static export serves folders, so URLs end with a slash). */
export function localePath(locale: Locale, path = ""): string {
  const clean = path === "/" ? "" : path;
  return `/${locale}${clean}/`;
}

/** canonical + hreflang alternates for a path that exists in every locale. */
export function alternatesFor(locale: Locale, path = ""): Metadata["alternates"] {
  return {
    canonical: localePath(locale, path),
    languages: {
      ...Object.fromEntries(locales.map((l) => [l, localePath(l, path)])),
      "x-default": localePath("fr", path),
    },
  };
}

/** Static social preview image (public/og). Repeated on pages that override openGraph. */
export function ogImages(locale: Locale, alt: string) {
  return [{ url: `/og/${locale}.png`, width: 1200, height: 630, alt }];
}
