import Link from "next/link";
import { experience } from "@/content/experience";
import { getLabEntry } from "@/content/lab";
import { getProject } from "@/content/projects";
import { skillCategories } from "@/content/skills";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

const MAX_REFS = 3;

type Ref = { key: string; label: string; href?: string };

/** Skills grouped by category; each skill points to where it was actually used. */
export function Skills({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const categories = skillCategories.filter((c) => c.skills.length > 0);

  const refsFor = (usedIn: string[] = [], usedAt: string[] = []): Ref[] => [
    ...usedIn.flatMap((slug): Ref[] => {
      const project = getProject(slug);
      if (project) return [{ key: slug, label: project.title[locale], href: `/${locale}/projects/${slug}` }];
      const entry = getLabEntry(slug);
      if (entry) return [{ key: slug, label: entry.title[locale], href: `/${locale}/lab#${slug}` }];
      return [];
    }),
    ...usedAt.flatMap((id): Ref[] => {
      const exp = experience.find((e) => e.id === id);
      return exp ? [{ key: id, label: exp.organization }] : [];
    }),
  ];

  return (
    <div className="grid gap-px overflow-hidden rounded-[4px] border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-3">
      {categories.map((category, i) => (
        <section
          key={category.id}
          data-reveal
          style={{ "--reveal-i": i } as React.CSSProperties}
          aria-labelledby={`skills-${category.id}`}
          className="bg-paper p-6"
        >
          <h3 id={`skills-${category.id}`} className="label text-ink-2">
            {category.title[locale]}
          </h3>
          <ul className="mt-5 space-y-3">
            {category.skills.map((skill) => {
              const name = typeof skill.name === "string" ? skill.name : skill.name[locale];
              const refs = refsFor(skill.usedIn, skill.usedAt);
              const shown = refs.slice(0, MAX_REFS);
              const more = refs.length - shown.length;
              return (
                <li key={name}>
                  <span className="text-ink">{name}</span>
                  {refs.length > 0 && (
                    <span className="mt-0.5 block text-[0.8125rem] leading-snug text-ink-3">
                      <span className="sr-only">{dict.skills.usedIn} </span>
                      {shown.map((ref, j) => (
                        <span key={ref.key}>
                          {j > 0 && ", "}
                          {ref.href ? (
                            <Link href={ref.href} className="prose-link hover:text-ink">
                              {ref.label}
                            </Link>
                          ) : (
                            ref.label
                          )}
                        </span>
                      ))}
                      {more > 0 && ` +${more}`}
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </div>
  );
}
