import Link from "next/link";
import { activities, education, experience } from "@/content/experience";
import { getProject } from "@/content/projects";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Experience } from "@/lib/types";
import { Txt } from "@/components/ui/Txt";

type Props = { locale: Locale; dict: Dictionary; detailed?: boolean };

/** A dated row; the tick on the rule turns the list into a timeline. */
function Row({ meta, children, current = false }: { meta: React.ReactNode; children: React.ReactNode; current?: boolean }) {
  return (
    <li data-reveal className="relative grid gap-2 border-t border-rule py-7 md:grid-cols-12 md:gap-8">
      <span
        aria-hidden
        className={`absolute -top-[4.5px] left-0 size-2 rounded-full border ${
          current ? "border-accent bg-accent shadow-[0_0_0_4px_var(--paper)]" : "border-rule-strong bg-paper"
        }`}
      />
      <div className="pt-1 text-[0.9375rem] text-ink-3 md:col-span-3">{meta}</div>
      <div className="md:col-span-9">{children}</div>
    </li>
  );
}

function ExperienceList({ items, locale, dict, detailed }: Props & { items: Experience[] }) {
  return (
    <ol className="border-b border-rule">
      {items.map((exp, index) => {
        const related = exp.relatedProject ? getProject(exp.relatedProject) : undefined;
        return (
          <Row
            key={exp.id}
            current={index === 0}
            meta={
              <>
                <p className="font-mono text-[0.8125rem]">
                  <Txt>{exp.period[locale]}</Txt>
                </p>
                {detailed && exp.location && <p className="mt-1">{exp.location[locale]}</p>}
              </>
            }
          >
            <p className="h-item">{exp.organization}</p>
            {exp.unit && <p className="mt-1 text-ink-2">{exp.unit[locale]}</p>}
            <p className="mt-3 text-ink">
              {exp.role[locale]}
              {exp.kind && (
                <>
                  <span className="text-ink-3"> · </span>
                  <span className="text-ink-3">{exp.kind[locale]}</span>
                </>
              )}
            </p>
            {detailed && (
              <>
                <p className="mt-4 max-w-[62ch] text-ink-2">
                  <Txt>{exp.summary[locale]}</Txt>
                </p>
                {exp.highlights[locale].length > 0 && (
                  <ul className="mt-4 max-w-[66ch] space-y-2">
                    {exp.highlights[locale].map((h) => (
                      <li key={h} className="relative pl-5 text-ink-2">
                        <span aria-hidden className="absolute top-[0.6em] left-0.5 size-1.5 rounded-full bg-accent-soft" />
                        <Txt>{h}</Txt>
                      </li>
                    ))}
                  </ul>
                )}
                {exp.tools && (
                  <p className="mt-4 font-mono text-[0.8125rem] text-ink-3">{exp.tools[locale].join(" · ")}</p>
                )}
              </>
            )}
            {related && (
              <p className="mt-4 text-[0.9375rem]">
                <span className="text-ink-3">{dict.experience.relatedProject} </span>
                <Link href={`/${locale}/projects/${related.slug}`} className="prose-link text-ink">
                  {related.title[locale]}
                </Link>
              </p>
            )}
          </Row>
        );
      })}
    </ol>
  );
}

/** Experience, activities, then education, as dated lists. `detailed` adds summaries, highlights and tools. */
export function Journey({ locale, dict, detailed = false }: Props) {
  return (
    <div className="space-y-14">
      <div>
        <h3 className="label mb-4 text-ink-2">{dict.sections.experience}</h3>
        <ExperienceList items={experience} locale={locale} dict={dict} detailed={detailed} />
      </div>

      <div>
        <h3 className="label mb-4 text-ink-2">{dict.sections.activities}</h3>
        <ExperienceList items={activities} locale={locale} dict={dict} detailed={detailed} />
      </div>

      <div>
        <h3 className="label mb-4 text-ink-2">{dict.sections.education}</h3>
        <ol className="border-b border-rule">
          {education.map((ed, index) => (
            <Row
              key={ed.id}
              current={index === 0}
              meta={
                <p className="font-mono text-[0.8125rem]">
                  <Txt>{ed.period[locale]}</Txt>
                </p>
              }
            >
              <p className="h-item">{ed.degree[locale]}</p>
              <p className="mt-1 text-ink-2">
                <Txt>{ed.institution}</Txt>
              </p>
              <p className="mt-2 text-[0.9375rem] text-ink-3">{ed.status[locale]}</p>
            </Row>
          ))}
        </ol>
      </div>
    </div>
  );
}
