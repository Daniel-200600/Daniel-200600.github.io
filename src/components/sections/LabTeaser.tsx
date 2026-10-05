import Link from "next/link";
import { labEntries } from "@/content/lab";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { ArrowRight } from "@/components/ui/icons";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function LabTeaser({ locale, dict, index }: { locale: Locale; dict: Dictionary; index: string }) {
  if (labEntries.length === 0) return null;
  return (
    <section aria-labelledby="lab-title" className="container-page section-pad">
      <SectionHeader
        index={index}
        label={dict.lab.title}
        id="lab-title"
        title={dict.lab.homeTitle}
        intro={dict.lab.intro}
      />
      <ol className="grid gap-px overflow-hidden rounded-[4px] border border-rule bg-rule md:grid-cols-3">
        {labEntries.map((entry, i) => (
          <li key={entry.slug} data-reveal style={{ "--reveal-i": i } as React.CSSProperties} className="bg-paper">
            <Link
              href={`/${locale}/lab#${entry.slug}`}
              className="group flex h-full flex-col gap-5 p-6 transition-colors duration-300 hover:bg-paper-2"
            >
              <span className="label text-accent">{dict.lab.kinds[entry.kind]}</span>
              <span className="font-serif text-xl leading-snug text-ink transition-colors group-hover:text-accent">
                {entry.title[locale]}
              </span>
              <span className="text-[0.9375rem] text-ink-2">{entry.summary[locale]}</span>
              <span className="mt-auto font-mono text-[0.75rem] text-ink-3">{entry.stack.slice(0, 3).join(" · ")}</span>
            </Link>
          </li>
        ))}
      </ol>
      <div className="mt-8">
        <ButtonLink href={`/${locale}/lab`} variant="quiet" icon={<ArrowRight />}>
          {dict.lab.seeAll}
        </ButtonLink>
      </div>
    </section>
  );
}
