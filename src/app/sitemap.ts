import type { MetadataRoute } from "next";
import { labEntries } from "@/content/lab";
import { projects } from "@/content/projects";
import { locales } from "@/i18n/config";
import { localePath, siteUrl } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    "/projects",
    "/about",
    ...(labEntries.length > 0 ? ["/lab"] : []),
    ...projects.map((p) => `/projects/${p.slug}`),
  ];

  return paths.flatMap((path) =>
    locales.map((locale) => ({
      url: siteUrl + localePath(locale, path),
      alternates: {
        languages: Object.fromEntries(locales.map((l) => [l, siteUrl + localePath(l, path)])),
      },
    })),
  );
}
