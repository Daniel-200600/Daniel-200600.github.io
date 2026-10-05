import Link from "next/link";
import { profile } from "@/content/profile";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { PipelineFigure } from "@/components/motion/PipelineFigure";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { ArrowRight, ArrowUpRight, Download } from "@/components/ui/icons";

const line = (i: number) => ({ "--i": i }) as React.CSSProperties;

export function Hero({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const cv = profile.cv[locale];
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden border-b border-rule">
      <div aria-hidden className="grid-backdrop pointer-events-none absolute inset-0" />

      <div className="container-page relative pt-12 pb-14 sm:pt-20 lg:pt-24 lg:pb-20">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <p className="label flex items-start gap-3 text-balance text-ink-2">
              <span aria-hidden className="mt-[0.45em] size-1.5 shrink-0 rotate-45 bg-accent" />
              {profile.kicker[locale]}
            </p>

            <h1
              id="hero-title"
              className="mt-6 font-serif text-[clamp(2.375rem,1.3rem+3.4vw,4rem)] leading-[1.04] font-normal tracking-[-0.025em] text-ink"
            >
              <span className="block sm:whitespace-nowrap">{profile.nameLines[0]}</span>
              <span className="block text-ink-2">{profile.nameLines[1]}</span>
            </h1>

            <p className="lede mt-7 max-w-[54ch]">
              {profile.statement[locale]}
            </p>

            <p className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 text-[0.9375rem]">
              <span className="inline-flex items-start gap-2 text-ink">
                <span aria-hidden className="relative mt-[0.5em] flex size-2 shrink-0">
                  <span className="absolute inset-0 animate-ping rounded-full bg-accent-soft opacity-60 motion-reduce:hidden" />
                  <span className="relative size-2 rounded-full bg-accent" />
                </span>
                {profile.availability[locale]}
              </span>
              <span className="text-ink-3">{profile.location[locale]}</span>
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href={`/${locale}/projects`} icon={<ArrowRight />}>
                {dict.hero.ctaProjects}
              </ButtonLink>
              {cv && (
                <ButtonLink href={cv} variant="secondary" download icon={<Download />}>
                  {dict.hero.ctaCv}
                </ButtonLink>
              )}
              <ButtonLink href={profile.links.github} variant="secondary" external icon={<ArrowUpRight />}>
                {dict.hero.ctaGithub}
              </ButtonLink>
            </div>
          </div>

          <div className="hero-line lg:col-span-5" style={line(1)}>
            <PipelineFigure labels={dict.pipeline} />
          </div>
        </div>

        <dl className="hero-line mt-14 grid grid-cols-2 border-t border-rule lg:mt-20 lg:grid-cols-4" style={line(3)}>
          {profile.credentials.map((c, i) => (
            <div
              key={c.label.fr}
              className={`border-rule py-5 ${i % 2 ? "border-l pl-4 sm:pl-6" : "pr-4"} ${i > 1 ? "border-t lg:border-t-0" : ""} ${
                i === 2 ? "lg:border-l lg:pl-6" : ""
              } ${i > 0 ? "lg:pl-6" : ""}`}
            >
              <dt className="label text-ink-3">{c.label[locale]}</dt>
              <dd className="mt-2">
                <Link href={`/${locale}${c.href}`} className="group block">
                  <span className="block font-serif text-lg leading-snug text-ink transition-colors group-hover:text-accent sm:text-xl">
                    {c.value[locale]}
                  </span>
                  <span className="mt-0.5 block text-[0.875rem] text-ink-3">{c.detail[locale]}</span>
                </Link>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
