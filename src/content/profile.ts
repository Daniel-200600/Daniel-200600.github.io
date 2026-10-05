import type { Localized } from "@/lib/types";

export const profile = {
  fullName: "Tchomtchi Kamgang Daniel Merlys",
  /** The full name split in two lines where space is short (mobile header). */
  nameLines: ["Tchomtchi Kamgang", "Daniel Merlys"] as const,
  /** Used where the full name does not fit (favicon, OG image monogram). */
  initials: "TK",

  kicker: {
    fr: "Data · Business Intelligence · IA · Finance",
    en: "Data · Business Intelligence · AI · Finance",
  } satisfies Localized,

  statement: {
    fr: "Étudiant en Master 1 Business Intelligence, je construis des outils de données (analyse, automatisation, contrôle, reporting) à partir de problèmes métier réels, en particulier dans la finance : systèmes de paiement, banque, microfinance.",
    en: "Business Intelligence master's student (M1). I build data tools (analysis, automation, control, reporting) starting from real business problems, mostly in finance: payment systems, banking, microfinance.",
  } satisfies Localized,

  availability: {
    fr: "Ouvert à un premier emploi ou à un stage rémunéré.",
    en: "Open to a first job or a paid internship.",
  } satisfies Localized,

  location: { fr: "Cameroun", en: "Cameroon" } satisfies Localized,

  /** Factual landmarks shown under the hero. `href` is relative to the locale root. */
  credentials: [
    {
      label: { fr: "Dernière expérience", en: "Latest experience" },
      value: { fr: "BEAC · DSMP", en: "BEAC · DSMP" },
      detail: { fr: "Stage Data, juin à août 2026", en: "Data internship, June to August 2026" },
      href: "/about",
    },
    {
      label: { fr: "Projet phare", en: "Featured project" },
      value: { fr: "DAN", en: "DAN" },
      detail: { fr: "Prototype terminé", en: "Completed prototype" },
      href: "/projects/dan",
    },
    {
      label: { fr: "Formation", en: "Education" },
      value: { fr: "Master 1 BI · IUSJ", en: "Master's in BI (Y1) · IUSJ" },
      detail: { fr: "Licence, mention Excellent", en: "Bachelor's, “Excellent” distinction" },
      href: "/about",
    },
    {
      label: { fr: "Distinction", en: "Award" },
      value: { fr: "Premier prix", en: "First prize" },
      detail: { fr: "Startup Weekend IUSJ 2026", en: "Startup Weekend IUSJ 2026" },
      href: "/about",
    },
  ] satisfies { label: Localized; value: Localized; detail: Localized; href: string }[],

  links: {
    email: "tchomtchidaniel@gmail.com",
    linkedin: "https://www.linkedin.com/in/daniel-merlys-tchomtchi",
    github: "https://github.com/Daniel-200600",
  },

  /** Path under /public (web version without phone number, built by cv/build-cv.mjs). Undefined hides the CV button. */
  cv: {
    fr: "/cv/cv-fr.pdf",
    en: "/cv/cv-en.pdf",
  } as Localized<string | undefined>,

  seoDescription: {
    fr: "Portfolio de Tchomtchi Kamgang Daniel Merlys : data, business intelligence, IA et finance. Projets d'analyse, d'automatisation et de reporting construits à partir de problèmes métier réels.",
    en: "Portfolio of Tchomtchi Kamgang Daniel Merlys: data, business intelligence, AI and finance. Analysis, automation and reporting projects built from real business problems.",
  } satisfies Localized,
};
