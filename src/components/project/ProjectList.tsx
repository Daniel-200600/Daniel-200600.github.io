import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { isTodo } from "@/lib/content";
import type { Project } from "@/lib/types";
import { ArrowRight } from "@/components/ui/icons";
import { StatusChip } from "@/components/ui/StatusChip";
import { Txt } from "@/components/ui/Txt";
import { DomainTags } from "./DomainTags";

type Props = { projects: Project[]; locale: Locale; dict: Dictionary; startIndex?: number };

/** Projects as editorial rows rather than cards: index, title, summary, status, domains, stack. */
export function ProjectList({ projects, locale, dict, startIndex = 1 }: Props) {
  return (
    <ol className="border-b border-rule">
      {projects.map((project, i) => {
        const stack = project.stack.filter((s) => !isTodo(s));
        return (
          <li key={project.slug} data-reveal style={{ "--reveal-i": i } as React.CSSProperties}>
            <Link
              href={`/${locale}/projects/${project.slug}`}
              className="group relative grid gap-4 border-t border-rule py-8 transition-colors duration-300 hover:bg-paper-2 md:grid-cols-12 md:gap-8 md:px-4 md:py-10"
            >
              <span
                aria-hidden
                className="absolute top-0 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-500 ease-out group-hover:scale-x-100"
              />
              <span className="font-mono text-sm text-ink-3 transition-colors group-hover:text-accent md:col-span-1 md:pt-1.5">
                {String(startIndex + i).padStart(2, "0")}
              </span>
              <div className="md:col-span-6">
                <h3 className="h-item flex items-baseline gap-3">
                  {project.title[locale]}
                  <ArrowRight className="shrink-0 translate-y-0.5 text-ink-3 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent group-hover:opacity-100 max-md:hidden" />
                </h3>
                <p className="mt-2.5 max-w-[58ch] text-ink-2">
                  <Txt>{project.summary[locale]}</Txt>
                </p>
              </div>
              <div className="flex flex-col gap-3 md:col-span-5 md:items-end md:text-right">
                <StatusChip>{project.status[locale]}</StatusChip>
                <DomainTags domains={project.domains} labels={dict.domains} />
                {stack.length > 0 && (
                  <p className="font-mono text-[0.8125rem] text-ink-3">{stack.slice(0, 4).join(" · ")}</p>
                )}
              </div>
            </Link>
          </li>
        );
      })}
    </ol>
  );
}
