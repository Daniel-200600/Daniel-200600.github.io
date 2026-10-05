"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

type Props = {
  locale: Locale;
  nameLines: readonly [string, string];
  nav: Dictionary["nav"];
  showLab: boolean;
  cvHref?: string;
};

export function Header({ locale, nameLines, nav, showLab, cvHref }: Props) {
  const pathname = usePathname();
  // The menu is tied to the path it was opened on, so navigating closes it.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const close = () => setOpenOn(null);
  const menuId = useId();

  const items = [
    { href: `/${locale}/projects`, label: nav.projects },
    { href: `/${locale}/about`, label: nav.about },
    ...(showLab ? [{ href: `/${locale}/lab`, label: nav.lab }] : []),
    { href: `/${locale}#contact`, label: nav.contact },
  ];

  const otherLocale: Locale = locale === "fr" ? "en" : "fr";
  const switchHref = pathname.replace(/^\/(fr|en)(?=\/|$)/, `/${otherLocale}`);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenOn(null);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  // The bottom rule only appears once the page has scrolled.
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) => !href.includes("#") && pathname.startsWith(href);

  return (
    <header
      className={`sticky top-0 z-40 border-b bg-paper/90 backdrop-blur-md transition-colors duration-300 supports-[not(backdrop-filter:blur(1px))]:bg-paper ${
        scrolled || open ? "border-rule" : "border-transparent"
      }`}
    >
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link
          href={`/${locale}`}
          className="min-w-0 font-serif text-[0.9375rem] leading-tight tracking-[-0.005em] text-ink sm:text-base"
        >
          <span className="block sm:inline">{nameLines[0]}</span> <span className="block sm:inline">{nameLines[1]}</span>
        </Link>

        <nav aria-label={nav.label} className="hidden md:block">
          <ul className="flex items-center gap-7 text-[0.9375rem]">
            {items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className="relative py-2 text-ink-2 transition-colors hover:text-ink aria-[current=page]:text-ink"
                >
                  {item.label}
                  <span
                    aria-hidden
                    className={`absolute inset-x-0 -bottom-px h-px bg-accent transition-transform duration-300 ${
                      isActive(item.href) ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </Link>
              </li>
            ))}
            {cvHref && (
              <li>
                <a
                  href={cvHref}
                  download
                  className="inline-flex min-h-9 items-center rounded-[3px] border border-rule-strong px-3.5 text-ink transition-colors hover:border-ink"
                >
                  {nav.cv}
                </a>
              </li>
            )}
            <li>
              <Link
                href={switchHref}
                hrefLang={otherLocale}
                lang={otherLocale}
                aria-label={nav.switchLanguage}
                className="label text-ink-3 transition-colors hover:text-ink"
              >
                {nav.switchLanguageShort}
              </Link>
            </li>
          </ul>
        </nav>

        <div className="flex items-center gap-1 md:hidden">
          <Link
            href={switchHref}
            hrefLang={otherLocale}
            lang={otherLocale}
            aria-label={nav.switchLanguage}
            className="label grid min-h-11 min-w-11 place-items-center text-ink-3"
          >
            {nav.switchLanguageShort}
          </Link>
          <button
            type="button"
            aria-expanded={open}
            aria-controls={menuId}
            onClick={() => setOpenOn(open ? null : pathname)}
            className="grid min-h-11 min-w-11 place-items-center text-ink"
          >
            <span className="sr-only">{open ? nav.close : nav.menu}</span>
            <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden stroke="currentColor" strokeWidth="1.5">
              {open ? (
                <path d="M4.5 4.5l11 11M15.5 4.5l-11 11" />
              ) : (
                <path d="M3 7h14M3 13h14" />
              )}
            </svg>
          </button>
        </div>
      </div>

      <nav
        id={menuId}
        aria-label={nav.label}
        hidden={!open}
        className="border-t border-rule bg-paper md:hidden"
      >
        <ul className="container-page py-3">
          {items.map((item, i) => (
            <li key={item.href} className={i ? "border-t border-rule" : ""}>
              <Link
                href={item.href}
                onClick={close}
                aria-current={isActive(item.href) ? "page" : undefined}
                className="flex min-h-13 items-center justify-between font-serif text-xl text-ink"
              >
                {item.label}
                <span className="label text-ink-3">0{i + 1}</span>
              </Link>
            </li>
          ))}
          {cvHref && (
            <li className="border-t border-rule py-3">
              <a
                href={cvHref}
                download
                className="inline-flex min-h-11 items-center rounded-[3px] border border-rule-strong px-4 text-ink"
              >
                {nav.cv}
              </a>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
