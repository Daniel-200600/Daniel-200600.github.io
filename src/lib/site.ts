import type { Metadata } from "next";
import { locales, type Locale } from "@/i18n/config";

/**
 * Public origin of the site.
 * Set NEXT_PUBLIC_SITE_URL once a custom domain exists; Vercel's production
 * domain is used until then.
 */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

/** "/projects" -> "/fr/projects" */
export function localePath(locale: Locale, path = ""): string {
  const clean = path === "/" ? "" : path;
  return `/${locale}${clean}`;
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
