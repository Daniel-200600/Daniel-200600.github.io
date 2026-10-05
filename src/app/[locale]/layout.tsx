import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans, Source_Serif_4 } from "next/font/google";
import { notFound } from "next/navigation";
import { labEntries } from "@/content/lab";
import { profile } from "@/content/profile";
import { isLocale, locales, ogLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { alternatesFor, siteUrl } from "@/lib/site";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { RevealObserver } from "@/components/motion/RevealObserver";
import "../globals.css";

const serif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-source-serif",
  display: "swap",
});

const sans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-sans",
  display: "swap",
});

// Courier New has the same 0.6em advance as Plex Mono, so the font swap moves nothing.
const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-plex-mono",
  display: "swap",
  fallback: ["Courier New", "monospace"],
  adjustFontFallback: false,
});

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const title = `${profile.fullName} · ${profile.kicker[locale]}`;
  return {
    metadataBase: new URL(siteUrl),
    title: { default: title, template: `%s · ${profile.fullName}` },
    description: profile.seoDescription[locale],
    alternates: alternatesFor(locale),
    authors: [{ name: profile.fullName }],
    openGraph: {
      type: "website",
      siteName: profile.fullName,
      title,
      description: profile.seoDescription[locale],
      locale: ogLocale[locale],
      alternateLocale: locales.filter((l) => l !== locale).map((l) => ogLocale[l]),
    },
    twitter: { card: "summary_large_image", title, description: profile.seoDescription[locale] },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f5f1" },
    { media: "(prefers-color-scheme: dark)", color: "#0b111a" },
  ],
};

export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const showLab = labEntries.length > 0;

  return (
    <html
      lang={locale}
      className={`${serif.variable} ${sans.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Enables reveal animations only when JS runs, so content never stays hidden. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only z-50 rounded-[3px] bg-ink px-4 py-2 text-paper focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          {dict.skipToContent}
        </a>
        <Header
          locale={locale}
          nameLines={profile.nameLines}
          nav={dict.nav}
          showLab={showLab}
          cvHref={profile.cv[locale]}
        />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer locale={locale} dict={dict} showLab={showLab} />
        <RevealObserver />
      </body>
    </html>
  );
}
