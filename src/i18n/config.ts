export const locales = ["fr", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "fr";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Open Graph locale codes. */
export const ogLocale: Record<Locale, string> = {
  fr: "fr_FR",
  en: "en_US",
};
