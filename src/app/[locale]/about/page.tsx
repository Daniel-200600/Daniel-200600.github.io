import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { languages } from "@/content/experience";
import { profile } from "@/content/profile";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { alternatesFor } from "@/lib/site";
import { ContactSection } from "@/components/sections/ContactSection";
import { Journey } from "@/components/sections/Journey";
import { Skills } from "@/components/sections/Skills";
import { IndexLabel } from "@/components/ui/IndexLabel";
import { SectionHeader } from "@/components/ui/SectionHeader";

export async function generateMetadata({ params }: PageProps<"/[locale]/about">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return {
    title: dict.about.title,
    description: dict.about.intro,
    alternates: alternatesFor(locale, "/about"),
  };
}

export default async function AboutPage({ params }: PageProps<"/[locale]/about">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return (
    <>
      <header className="container-page pt-12 pb-16 md:pt-20 md:pb-24">
        <IndexLabel index="00" label={dict.sections.profile} />
        <h1 className="display mt-5 max-w-[16ch]">{dict.about.title}</h1>
        <div className="mt-8 grid gap-6 md:grid-cols-12 md:gap-8">
          <p className="lede md:col-span-8">{dict.about.intro}</p>
          <div className="space-y-2 text-[0.9375rem] md:col-span-4 md:border-l md:border-rule md:pl-8">
            <p className="flex items-center gap-2 text-ink">
              <span aria-hidden className="size-1.5 shrink-0 rounded-full bg-accent" />
              {profile.availability[locale]}
            </p>
            <p className="text-ink-2">{profile.location[locale]}</p>
            <div className="pt-4">
              <h2 className="label text-ink-3">{dict.sections.languages}</h2>
              <ul className="mt-2 space-y-1">
                {languages.map((l) => (
                  <li key={l.name.fr} className="flex justify-between gap-4">
                    <span className="text-ink">{l.name[locale]}</span>
                    <span className="text-ink-3">{l.level[locale]}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </header>

      <section aria-labelledby="approach-title" className="container-page pb-20 md:pb-28">
        <SectionHeader index="01" label={dict.sections.approach} id="approach-title" title={dict.sections.approachTitle} />
        <ol className="grid gap-px overflow-hidden rounded-[4px] border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-4">
          {dict.about.approach.map((item, i) => (
            <li key={item.title} data-reveal style={{ "--reveal-i": i } as React.CSSProperties} className="bg-paper p-6">
              <span className="label text-accent">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-6 font-serif text-xl leading-snug text-ink">{item.title}</h3>
              <p className="mt-3 text-[0.9375rem] text-ink-2">{item.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="journey-title" className="border-t border-rule bg-paper-2/60">
        <div className="container-page section-pad">
          <SectionHeader index="02" label={dict.sections.journey} id="journey-title" title={dict.sections.journeyTitle} intro={dict.sections.journeyIntro} />
          <Journey locale={locale} dict={dict} detailed />
        </div>
      </section>

      <section aria-labelledby="skills-title" className="container-page section-pad">
        <SectionHeader index="03" label={dict.sections.skills} id="skills-title" title={dict.sections.skillsTitle} intro={dict.sections.skillsIntro} />
        <Skills locale={locale} dict={dict} />
      </section>

      <ContactSection locale={locale} dict={dict} index="04" />
    </>
  );
}
