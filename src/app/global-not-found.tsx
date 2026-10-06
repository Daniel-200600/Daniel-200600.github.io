import type { Metadata } from "next";
import Link from "next/link";
import { getDictionary } from "@/i18n/dictionaries";
import "./globals.css";

export const metadata: Metadata = {
  title: "404 · Page introuvable",
  robots: { index: false },
  icons: { icon: "/icon.svg" },
};

/*
 * Served for every unknown URL (out/404.html on GitHub Pages).
 * A URL without language prefix (e.g. /projects/) is sent to the same page
 * in the visitor's language, which replaces the former server-side redirect.
 */
const redirectScript = `(function () {
  var p = location.pathname;
  if (/^\\/(fr|en)(\\/|$)/.test(p)) return;
  var langs = navigator.languages || [navigator.language || ""];
  var lang = "fr";
  for (var i = 0; i < langs.length; i++) {
    var l = String(langs[i]).toLowerCase().slice(0, 2);
    if (l === "fr" || l === "en") { lang = l; break; }
  }
  location.replace("/" + lang + (p === "/" ? "/" : p) + location.search + location.hash);
})();`;

export default function GlobalNotFound() {
  const fr = getDictionary("fr").notFound;
  const en = getDictionary("en").notFound;
  return (
    <html lang="fr">
      <head>
        <script dangerouslySetInnerHTML={{ __html: redirectScript }} />
      </head>
      <body className="flex min-h-dvh flex-col justify-center">
        <main className="container-page py-24">
          <p className="label text-accent">404</p>
          <h1 className="display mt-5">{fr.title}</h1>
          <p className="lede mt-5">{fr.body}</p>
          <p className="lede mt-2" lang="en">
            {en.body}
          </p>
          <p className="mt-8 flex gap-6">
            <Link href="/fr/" className="prose-link text-ink">
              {fr.back}
            </Link>
            <Link href="/en/" lang="en" className="prose-link text-ink">
              {en.back}
            </Link>
          </p>
        </main>
      </body>
    </html>
  );
}
