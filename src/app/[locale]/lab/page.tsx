import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { labEntries } from "@/content/lab";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { alternatesFor } from "@/lib/site";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { ArrowUpRight } from "@/components/ui/icons";
import { IndexLabel } from "@/components/ui/IndexLabel";

export async function generateMetadata({ params }: PageProps<"/[locale]/lab">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return { title: dict.lab.title, description: dict.lab.intro, alternates: alternatesFor(locale, "/lab") };
}

function formatMonth(date: string, locale: Locale) {
  const [y, m] = date.split("-").map(Number);
  return new Intl.DateTimeFormat(locale === "fr" ? "fr-FR" : "en-GB", { month: "long", year: "numeric" }).format(
    new Date(Date.UTC(y, (m ?? 1) - 1, 1)),
  );
}

/** Hidden (404) until the first real entry exists in content/lab. */
export default async function LabPage({ params }: PageProps<"/[locale]/lab">) {
  const { locale } = await params;
  if (!isLocale(locale) || labEntries.length === 0) notFound();
  const dict = getDictionary(locale);

  return (
    <div className="night relative min-h-[70vh] overflow-hidden">
      <div aria-hidden className="grid-backdrop pointer-events-none absolute inset-x-0 top-0 h-[520px] opacity-50" />
      <div className="container-page relative pt-12 pb-24 md:pt-20">
        <header className="mb-16 max-w-[62ch]">
          <IndexLabel index={String(labEntries.length).padStart(2, "0")} label={dict.lab.title} />
          <h1 className="display mt-5">{dict.lab.title}</h1>
          <p className="lede mt-6">{dict.lab.intro}</p>
        </header>

        <ol className="border-b border-rule">
          {labEntries.map((entry, i) => (
            <li
              key={entry.slug}
              id={entry.slug}
              data-reveal
              style={{ "--reveal-i": i } as React.CSSProperties}
              className="grid scroll-mt-24 gap-6 border-t border-rule py-10 md:grid-cols-12 md:gap-8 md:py-14"
            >
              <div className="md:col-span-3">
                <p className="label text-accent">{dict.lab.kinds[entry.kind]}</p>
                <p className="mt-2 font-mono text-[0.8125rem] text-ink-3">
                  <time dateTime={entry.date}>{formatMonth(entry.date, locale)}</time>
                </p>
              </div>
              <div className="md:col-span-9">
                <h2 className="h-item">{entry.title[locale]}</h2>
                <p className="mt-3 max-w-[64ch] text-ink-2">{entry.summary[locale]}</p>
                <ul className="mt-6 max-w-[66ch] space-y-2.5">
                  {entry.highlights[locale].map((h) => (
                    <li key={h} className="relative pl-5 text-[0.9375rem] text-ink-2">
                      <span aria-hidden className="absolute top-[0.6em] left-0.5 size-1.5 rounded-full bg-accent-soft" />
                      {h}
                    </li>
                  ))}
                </ul>
                {entry.limit && (
                  <p className="mt-6 max-w-[64ch] border-l-2 border-rule-strong pl-4 text-[0.875rem] text-ink-3">
                    <span className="label mr-2 text-ink-2">{dict.lab.limit}</span>
                    {entry.limit[locale]}
                  </p>
                )}
                <div className="mt-7 flex flex-wrap items-center justify-between gap-4">
                  <p className="font-mono text-[0.8125rem] text-ink-3">{entry.stack.join(" · ")}</p>
                  {entry.links.repo && (
                    <ButtonLink href={entry.links.repo} variant="secondary" external icon={<ArrowUpRight />}>
                      {dict.lab.code}
                    </ButtonLink>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
