import type { Education, Experience } from "@/lib/types";

/** Source: CV (October 2026). Most recent first. */
export const experience: Experience[] = [
  {
    id: "beac",
    organization: "BEAC",
    unit: {
      fr: "Banque des États de l'Afrique Centrale, Direction des Systèmes et Moyens de Paiement (DSMP)",
      en: "Bank of Central African States, Payment Systems and Means of Payment Department (DSMP)",
    },
    role: {
      fr: "Stagiaire Data / Systèmes et Moyens de Paiement",
      en: "Data / Payment Systems and Means of Payment Intern",
    },
    kind: { fr: "Stage", en: "Internship" },
    period: { fr: "Juin à août 2026", en: "June to August 2026" },
    summary: {
      fr: "Participation aux activités de la DSMP ; travail autour des systèmes de paiement SYGMA, SYSTAC et SWIFT dans le contexte des activités étudiées durant le stage.",
      en: "Took part in the DSMP's activities; worked on the SYGMA, SYSTAC and SWIFT payment systems within the scope of the activities studied during the internship.",
    },
    highlights: {
      fr: [
        "Conception de DAN, application visant à automatiser et structurer une partie du contrôle sur pièces des systèmes et moyens de paiement de la CEMAC.",
        "Analyse et exploitation de données liées aux systèmes de paiement ; utilisation de Python et d'outils de Data Analytics pour automatiser et structurer les traitements.",
        "Développement d'un outil d'aide à la surveillance et à l'analyse des risques.",
        "Production de tableaux de bord, indicateurs, analyses et rapports pour faciliter l'aide à la décision.",
      ],
      en: [
        "Designed DAN, an application aimed at automating and structuring part of the off-site oversight of CEMAC payment systems and means of payment.",
        "Analysed and used payment-system data; used Python and data analytics tools to automate and structure data processing.",
        "Developed a tool supporting monitoring and risk analysis.",
        "Produced dashboards, indicators, analyses and reports to support decision-making.",
      ],
    },
    tools: {
      fr: ["Python", "Pandas", "NumPy", "Streamlit", "SQLite", "Data Analytics", "IA générative", "Automatisation"],
      en: ["Python", "Pandas", "NumPy", "Streamlit", "SQLite", "Data Analytics", "Generative AI", "Automation"],
    },
    relatedProject: "dan",
  },
  {
    id: "africa-finance",
    organization: "Africa Finance",
    unit: { fr: "Anciennement EIA Microfinance", en: "Formerly EIA Microfinance" },
    role: { fr: "Stagiaire", en: "Intern" },
    kind: { fr: "Stage", en: "Internship" },
    period: { fr: "Juillet à août 2025", en: "July to August 2025" },
    summary: {
      fr: "Accueil des clients ; ouverture et gestion des comptes ; prospection.",
      en: "Customer reception; account opening and management; prospecting.",
    },
    highlights: { fr: [], en: [] },
  },
  {
    id: "afriland",
    organization: "Afriland First Bank",
    role: { fr: "Stagiaire", en: "Intern" },
    kind: { fr: "Stage", en: "Internship" },
    period: { fr: "Juillet à août 2024", en: "July to August 2024" },
    summary: {
      fr: "Accueil et orientation des clients ; création et gestion des comptes ; procédures de procuration ; opérations liées au découvert bancaire.",
      en: "Customer reception and guidance; account opening and management; power-of-attorney procedures; overdraft-related operations.",
    },
    highlights: { fr: [], en: [] },
  },
];

export const activities: Experience[] = [
  {
    id: "startup-weekend",
    organization: "Startup Weekend IUSJ 2026",
    unit: { fr: "Projet Health Care", en: "Health Care project" },
    role: { fr: "Participant, responsable technique", en: "Participant, technical lead" },
    kind: { fr: "Premier prix", en: "First prize" },
    period: { fr: "Janvier 2026", en: "January 2026" },
    summary: {
      fr: "Conception d'une startup appelée Health Care ; responsabilité de la partie technique du projet.",
      en: "Designed a startup called Health Care; in charge of the technical side of the project.",
    },
    highlights: { fr: [], en: [] },
  },
  {
    id: "business-game",
    organization: "Business Game IUSJ 2025",
    role: { fr: "Participant", en: "Participant" },
    period: { fr: "2025", en: "2025" },
    summary: {
      fr: "Simulation en management, stratégie et prise de décision.",
      en: "Simulation in management, strategy and decision-making.",
    },
    highlights: { fr: [], en: [] },
  },
];

export const education: Education[] = [
  {
    id: "master-bi",
    degree: {
      fr: "Master 1 Business Intelligence",
      en: "Master's degree in Business Intelligence, year 1",
    },
    institution: "Institut Universitaire Saint Jean du Cameroun (IUSJ)",
    period: { fr: "Depuis 2026", en: "Since 2026" },
    status: { fr: "En cours", en: "In progress" },
  },
  {
    id: "licence-mtq",
    degree: {
      fr: "Licence Management et Techniques Quantitatives",
      en: "Bachelor's degree in Management and Quantitative Techniques",
    },
    institution: "Institut Universitaire Saint Jean du Cameroun (IUSJ)",
    period: { fr: "2023 à 2026", en: "2023 to 2026" },
    status: {
      fr: "Soutenance avec la mention Excellent, septembre 2026",
      en: "Thesis defended with “Excellent” distinction, September 2026",
    },
  },
  {
    id: "bac-c",
    degree: {
      fr: "Baccalauréat C",
      en: "Baccalauréat C (mathematics and physical sciences)",
    },
    institution: "Lycée bilingue de Mimboman",
    period: { fr: "2023", en: "2023" },
    status: { fr: "Obtenu", en: "Completed" },
  },
];

export const languages = [
  { name: { fr: "Français", en: "French" }, level: { fr: "Langue maternelle", en: "Native" } },
  { name: { fr: "Anglais", en: "English" }, level: { fr: "B1, intermédiaire", en: "B1, intermediate" } },
  { name: { fr: "Allemand", en: "German" }, level: { fr: "Débutant", en: "Beginner" } },
];
