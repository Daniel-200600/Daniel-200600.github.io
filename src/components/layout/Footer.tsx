import Link from "next/link";
import { profile } from "@/content/profile";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { ContactLinks } from "@/components/sections/ContactLinks";

type Props = { locale: Locale; dict: Dictionary; showLab: boolean };

export function Footer({ locale, dict, showLab }: Props) {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-rule">
      <div className="container-page grid gap-10 py-12 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-5">
          <p className="font-serif text-lg text-ink">{profile.fullName}</p>
          <p className="mt-2 max-w-[38ch] text-[0.9375rem] text-ink-3">{profile.kicker[locale]}</p>
        </div>
        <nav aria-label={dict.nav.footerLabel} className="md:col-span-3">
          <ul className="space-y-2 text-[0.9375rem]">
            <li>
              <Link href={`/${locale}/projects`} className="text-ink-2 hover:text-ink">
                {dict.nav.projects}
              </Link>
            </li>
            <li>
              <Link href={`/${locale}/about`} className="text-ink-2 hover:text-ink">
                {dict.nav.about}
              </Link>
            </li>
            {showLab && (
              <li>
                <Link href={`/${locale}/lab`} className="text-ink-2 hover:text-ink">
                  {dict.nav.lab}
                </Link>
              </li>
            )}
          </ul>
        </nav>
        <div className="text-[0.9375rem] md:col-span-4">
          <ContactLinks labels={dict.contact} size="compact" />
        </div>
      </div>
      <div className="container-page">
        <div className="flex flex-col gap-2 border-t border-rule py-6 text-[0.8125rem] text-ink-3 sm:flex-row sm:justify-between">
        <p>
          © {year} {profile.fullName}. {dict.footer.rights}
        </p>
        <p>{dict.contact.noTracking}</p>
        </div>
      </div>
    </footer>
  );
}
