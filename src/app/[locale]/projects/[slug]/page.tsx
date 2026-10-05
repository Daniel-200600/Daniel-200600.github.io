import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects, getProject } from "@/content/projects";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary, type Dictionary } from "@/i18n/dictionaries";
import { isTodo } from "@/lib/content";
import { alternatesFor } from "@/lib/site";
import type { CaseStudySections, Project, Rich } from "@/lib/types";
import { CaseStudyNav } from "@/components/project/CaseStudyNav";
import { DomainTags } from "@/components/project/DomainTags";
import { WorkflowSteps } from "@/components/project/WorkflowSteps";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "@/components/ui/icons";
import { StatusChip } from "@/components/ui/StatusChip";
import { RichText, Txt } from "@/components/ui/Txt";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/projects/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = getProject(slug);
  if (!isLocale(locale) || !project) return {};
  return {
    title: project.title[locale],
    description: project.summary[locale],
    alternates: alternatesFor(locale, `/projects/${slug}`),
    openGraph: { type: "article", title: project.title[locale], description: project.summary[locale] },
  };
}

type Block =
  | { kind: "section"; key: keyof CaseStudySections }
  | { kind: "workflow" }
  | { kind: "gallery" }
  | { kind: "tech" };

function blocksFor(project: Project): Block[] {
  const sec = (key: keyof CaseStudySections): Block => ({ kind: "section", key });
  return [
    sec("context"),
    sec("problem"),
    sec("objective"),
    sec("data"),
    sec("methodology"),
    ...(project.workflow ? [{ kind: "workflow" } as const] : []),
    sec("solution"),
    ...(project.gallery?.length ? [{ kind: "gallery" } as const] : []),
    { kind: "tech" },
    sec("results"),
    sec("limits"),
  ];
}

function blockId(block: Block) {
  return block.kind === "section" ? block.key : block.kind;
}

function SectionHeading({ id, n, title }: { id: string; n: number; title: string }) {
  return (
    <h2 id={`${id}-title`} className="flex items-baseline gap-4">
      <span className="font-mono text-sm text-accent">{String(n).padStart(2, "0")}</span>
      <span className="font-serif text-[clamp(1.5rem,1.25rem+0.9vw,2rem)] leading-tight text-ink">{title}</span>
    </h2>
  );
}

function MetaItem({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-rule py-4">
      <dt className="label text-ink-3">{label}</dt>
      <dd className="mt-1.5 text-ink">{children}</dd>
    </div>
  );
}

function ProjectMeta({ project, locale, dict }: { project: Project; locale: Locale; dict: Dictionary }) {
  const { repo, demo } = project.links;
  return (
    <dl className="grid sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-4">
      <MetaItem label={dict.project.status}>
        <Txt>{project.status[locale]}</Txt>
      </MetaItem>
      {project.role && (
        <MetaItem label={dict.project.role}>
          <Txt>{project.role[locale]}</Txt>
        </MetaItem>
      )}
      {project.period && (
        <MetaItem label={dict.project.period}>
          <Txt>{project.period[locale]}</Txt>
        </MetaItem>
      )}
      <MetaItem label={dict.project.links}>
        {repo || demo ? (
          <span className="flex flex-col gap-1">
            {repo && (
              <a href={repo} target="_blank" rel="noopener noreferrer" className="prose-link inline-flex items-center gap-1.5">
                {dict.project.repo} <ArrowUpRight className="text-ink-3" />
              </a>
            )}
            {demo && (
              <a href={demo} target="_blank" rel="noopener noreferrer" className="prose-link inline-flex items-center gap-1.5">
                {dict.project.demo} <ArrowUpRight className="text-ink-3" />
              </a>
            )}
          </span>
        ) : (
          <span className="text-ink-3">{dict.project.noLinks}</span>
        )}
      </MetaItem>
    </dl>
  );
}

export default async function ProjectPage({ params }: PageProps<"/[locale]/projects/[slug]">) {
  const { locale, slug } = await params;
  const project = getProject(slug);
  if (!isLocale(locale) || !project) notFound();
  const dict = getDictionary(locale);
  const labels = dict.project.sections;

  const idx = projects.findIndex((p) => p.slug === slug);
  const next = projects[(idx + 1) % projects.length];

  const blocks = blocksFor(project);
  const titleOf = (block: Block) =>
    block.kind === "section"
      ? labels[block.key]
      : block.kind === "tech"
        ? labels.technologies
        : block.kind === "gallery"
          ? labels.preview
          : dict.project.workflow;
  const toc = blocks.map((block, i) => ({ id: blockId(block), n: i + 1, label: titleOf(block) }));

  return (
    <article id="case-study">
      <header className="night relative overflow-hidden">
        <div aria-hidden className="grid-backdrop pointer-events-none absolute inset-0 opacity-50" />
        <div className="container-page relative pt-8 pb-12 md:pt-12 md:pb-16">
          <Link
            href={`/${locale}/projects`}
            className="group inline-flex min-h-11 items-center gap-2 text-[0.9375rem] text-ink-2 hover:text-ink"
          >
            <ArrowLeft className="transition-transform duration-200 group-hover:-translate-x-0.5" />
            {dict.project.backToProjects}
          </Link>
          <div className="mt-8 md:mt-12">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
              <DomainTags domains={project.domains} labels={dict.domains} />
              <StatusChip>{project.status[locale]}</StatusChip>
            </div>
            <h1 className="display mt-6 max-w-[18ch]">{project.title[locale]}</h1>
            <p className="lede mt-6 max-w-[62ch]">
              <Txt>{project.summary[locale]}</Txt>
            </p>
            {project.confidentialityNote && (
              <p className="mt-6 max-w-[62ch] border-l-2 border-accent-soft pl-4 text-[0.9375rem] text-ink-2">
                {project.confidentialityNote[locale]}
              </p>
            )}
          </div>
          <div className="mt-12">
            <ProjectMeta project={project} locale={locale} dict={dict} />
          </div>
        </div>
      </header>

      <div className="container-page grid gap-10 py-12 md:py-16 lg:grid-cols-12 lg:gap-12">
        <aside className="hidden lg:col-span-3 lg:block">
          <CaseStudyNav items={toc} label={dict.project.contents} />
        </aside>

        <div className="lg:col-span-9">
          {blocks.map((block, i) => {
            const n = i + 1;
            const id = blockId(block);
            return (
              <section
                key={id}
                id={id}
                aria-labelledby={`${id}-title`}
                data-reveal
                className={
                  block.kind === "workflow"
                    ? "night my-10 scroll-mt-24 rounded-[4px] border border-rule p-6 md:p-10"
                    : "scroll-mt-24 border-t border-rule py-10 first:border-t-0 first:pt-0 md:py-12"
                }
              >
                <SectionHeading id={id} n={n} title={titleOf(block)} />
                <div className="mt-6 max-w-[66ch] text-ink-2">
                  {block.kind === "section" && <RichText blocks={project.sections[block.key][locale] as Rich} />}
                  {block.kind === "workflow" && <p className="lede">{dict.project.workflowIntro}</p>}
                  {block.kind === "tech" && (
                    <ul className="flex flex-wrap gap-2">
                      {project.stack.map((tech) => (
                        <li
                          key={tech}
                          className={
                            isTodo(tech)
                              ? ""
                              : "rounded-[3px] border border-rule px-2.5 py-1 font-mono text-[0.8125rem] text-ink"
                          }
                        >
                          <Txt>{tech}</Txt>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                {block.kind === "gallery" && project.gallery && (
                  <div className="mt-8 space-y-8">
                    {project.gallery.map((shot) => (
                      <figure key={shot.src}>
                        <div className="overflow-hidden rounded-[4px] border border-rule bg-white">
                          <Image
                            src={shot.src}
                            width={shot.width}
                            height={shot.height}
                            alt={shot.alt[locale]}
                            sizes="(min-width: 1024px) 860px, 100vw"
                            className="h-auto w-full"
                          />
                        </div>
                        <figcaption className="mt-3 text-[0.875rem] text-ink-3">{shot.caption[locale]}</figcaption>
                      </figure>
                    ))}
                  </div>
                )}
                {block.kind === "workflow" && project.workflow && (
                  <div className="mt-10">
                    <WorkflowSteps steps={project.workflow} locale={locale} />
                  </div>
                )}
              </section>
            );
          })}
        </div>
      </div>

      {next && next.slug !== project.slug && (
        <nav aria-label={dict.project.next} className="border-t border-rule">
          <Link
            href={`/${locale}/projects/${next.slug}`}
            className="group container-page flex items-center justify-between gap-6 py-12 md:py-16"
          >
            <span>
              <span className="label block text-ink-3">{dict.project.next}</span>
              <span className="h-section mt-2 block transition-colors group-hover:text-accent">{next.title[locale]}</span>
            </span>
            <ArrowRight className="size-6 shrink-0 text-ink-3 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-accent" />
          </Link>
        </nav>
      )}
    </article>
  );
}
