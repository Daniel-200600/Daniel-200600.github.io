import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects } from "@/content/projects";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { alternatesFor } from "@/lib/site";
import { ProjectList } from "@/components/project/ProjectList";
import { IndexLabel } from "@/components/ui/IndexLabel";

export async function generateMetadata({ params }: PageProps<"/[locale]/projects">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return {
    title: dict.sections.projects,
    description: dict.sections.projectsIntro,
    alternates: alternatesFor(locale, "/projects"),
  };
}

export default async function ProjectsPage({ params }: PageProps<"/[locale]/projects">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return (
    <div className="container-page pt-12 pb-24 md:pt-20">
      <header className="mb-14 max-w-[60ch]">
        <IndexLabel index={String(projects.length).padStart(2, "0")} label={dict.sections.projects} />
        <h1 className="display mt-5">{dict.sections.projects}</h1>
        <p className="lede mt-6">{dict.sections.projectsIntro}</p>
      </header>
      <ProjectList projects={projects} locale={locale} dict={dict} />
    </div>
  );
}
