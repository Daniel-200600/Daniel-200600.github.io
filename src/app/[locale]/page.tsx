import { notFound } from "next/navigation";
import { education } from "@/content/experience";
import { profile } from "@/content/profile";
import { featuredProject, projects } from "@/content/projects";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { isTodo } from "@/lib/content";
import { siteUrl } from "@/lib/site";
import { ProjectList } from "@/components/project/ProjectList";
import { ContactSection } from "@/components/sections/ContactSection";
import { FeaturedProject } from "@/components/sections/FeaturedProject";
import { Hero } from "@/components/sections/Hero";
import { Journey } from "@/components/sections/Journey";
import { LabTeaser } from "@/components/sections/LabTeaser";
import { Skills } from "@/components/sections/Skills";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { ArrowRight } from "@/components/ui/icons";
import { SectionHeader } from "@/components/ui/SectionHeader";

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const others = projects.filter((p) => p.slug !== featuredProject?.slug);

  const sameAs = [profile.links.github, profile.links.linkedin].filter((l) => !isTodo(l));
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.fullName,
    url: `${siteUrl}/${locale}`,
    description: profile.seoDescription[locale],
    knowsAbout: ["Data analytics", "Business Intelligence", "Artificial Intelligence", "Finance"],
    alumniOf: education
      .filter((e) => !isTodo(e.institution))
      .map((e) => ({ "@type": "CollegeOrUniversity", name: e.institution })),
    sameAs,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <Hero locale={locale} dict={dict} />

      {featuredProject && <FeaturedProject project={featuredProject} locale={locale} dict={dict} index="01" />}

      <section aria-labelledby="projects-title" className="container-page section-pad">
        <SectionHeader
          index="02"
          label={dict.sections.projects}
          id="projects-title"
          title={dict.sections.projectsTitle}
          intro={dict.sections.projectsIntro}
        />
        <ProjectList projects={others} locale={locale} dict={dict} />
        <div className="mt-8">
          <ButtonLink href={`/${locale}/projects`} variant="quiet" icon={<ArrowRight />}>
            {dict.project.allProjects}
          </ButtonLink>
        </div>
      </section>

      <LabTeaser locale={locale} dict={dict} index="03" />

      <section aria-labelledby="journey-title" className="border-t border-rule bg-paper-2/60">
        <div className="container-page section-pad">
          <SectionHeader
            index="04"
            label={dict.sections.journey}
            id="journey-title"
            title={dict.sections.journeyTitle}
            intro={dict.sections.journeyIntro}
          />
          <Journey locale={locale} dict={dict} />
          <div className="mt-8">
            <ButtonLink href={`/${locale}/about`} variant="quiet" icon={<ArrowRight />}>
              {dict.experience.seeFullJourney}
            </ButtonLink>
          </div>
        </div>
      </section>

      <section aria-labelledby="skills-title" className="container-page section-pad">
        <SectionHeader
          index="05"
          label={dict.sections.skills}
          id="skills-title"
          title={dict.sections.skillsTitle}
          intro={dict.sections.skillsIntro}
        />
        <Skills locale={locale} dict={dict} />
      </section>

      <ContactSection locale={locale} dict={dict} index="06" />
    </>
  );
}
