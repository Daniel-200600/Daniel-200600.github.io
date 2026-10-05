import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Project } from "@/lib/types";
import { DomainTags } from "@/components/project/DomainTags";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { IndexLabel } from "@/components/ui/IndexLabel";
import { ArrowRight } from "@/components/ui/icons";
import { StatusChip } from "@/components/ui/StatusChip";
import { Txt } from "@/components/ui/Txt";

type Props = { project: Project; locale: Locale; dict: Dictionary; index: string };

export function FeaturedProject({ project, locale, dict, index }: Props) {
  const steps = project.workflow ?? [];
  return (
    <section aria-labelledby="featured-title" className="night relative overflow-hidden section-pad">
      <div aria-hidden className="grid-backdrop pointer-events-none absolute inset-0 opacity-40" />
      <div className="container-page relative">
        <div className="grid gap-8 border-t border-rule pt-6 md:grid-cols-12">
          <IndexLabel index={index} label={dict.sections.featured} className="md:col-span-3 md:self-start" />
          <div className="md:col-span-9">
            <div className="flex flex-wrap items-center gap-4">
              <h2 id="featured-title" className="font-serif text-[clamp(3rem,2rem+4vw,5.5rem)] leading-none tracking-[-0.03em]">
                {project.title[locale]}
              </h2>
              <StatusChip>{project.status[locale]}</StatusChip>
            </div>
            <p className="lede mt-6 max-w-[58ch]">
              <Txt>{project.summary[locale]}</Txt>
            </p>
          </div>
        </div>

        {steps.length > 0 && (
          <div className="mt-14">
            <p className="label mb-4 text-ink-3">{dict.project.workflow}</p>

            {/* Track: a data point travels through the steps (desktop). */}
            <div aria-hidden className="relative mb-3 hidden h-3 overflow-hidden lg:block">
              <span className="absolute inset-x-0 top-1/2 h-px bg-rule-strong" />
              <span className="grid h-full grid-cols-7">
                {steps.map((s) => (
                  <span key={s.title.fr} className="relative">
                    <span className="absolute top-1/2 left-4 size-1.5 -translate-y-1/2 rounded-full bg-rule-strong" />
                  </span>
                ))}
              </span>
              <span className="flow-pulse absolute inset-0">
                <span className="absolute top-1/2 left-0 size-2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_12px_2px_var(--accent-soft)]" />
              </span>
            </div>

            <ol className="grid grid-cols-2 gap-px overflow-hidden rounded-[4px] border border-rule bg-rule sm:grid-cols-4 lg:grid-cols-7">
              {steps.map((step, i) => (
                <li
                  key={step.title.fr}
                  data-reveal
                  style={{ "--reveal-i": i } as React.CSSProperties}
                  className="group flex min-h-32 flex-col justify-between gap-6 bg-paper p-4 transition-colors duration-300 hover:bg-paper-2"
                >
                  <span className="label text-accent">{String(i + 1).padStart(2, "0")}</span>
                  <span className="font-serif text-[1.0625rem] leading-snug text-ink">{step.title[locale]}</span>
                </li>
              ))}
            </ol>
          </div>
        )}

        <div className="mt-10 grid gap-8 md:grid-cols-12 md:items-end">
          <div className="space-y-4 md:col-span-7">
            <DomainTags domains={project.domains} labels={dict.domains} />
            {project.confidentialityNote && (
              <p className="max-w-[62ch] text-[0.9375rem] text-ink-3">{project.confidentialityNote[locale]}</p>
            )}
          </div>
          <div className="flex flex-wrap gap-3 md:col-span-5 md:justify-end">
            <ButtonLink href={`/${locale}/projects/${project.slug}`} icon={<ArrowRight />}>
              {dict.project.readCaseStudy}
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
