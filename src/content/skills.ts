import type { SkillCategory } from "@/lib/types";

/**
 * Source: CV (October 2026) and the code of the projects shown here.
 * No self-rated levels. When a skill was used in a project, a Data Lab entry
 * or an experience presented on the site, it points to it
 * (usedIn = project or Data Lab slugs, usedAt = experience ids).
 */
export const skillCategories: SkillCategory[] = [
  {
    id: "data-bi",
    title: { fr: "Data & Business Intelligence", en: "Data & Business Intelligence" },
    skills: [
      { name: "Data analysis", usedIn: ["cemac-payment-bundles"], usedAt: ["beac"] },
      { name: { fr: "KPI & tableaux de bord", en: "KPIs & dashboards" }, usedIn: ["dan", "cemac-payment-bundles"], usedAt: ["beac"] },
      { name: "Data preprocessing", usedIn: ["credit-card-fraud", "census-income"] },
      { name: "Data visualization", usedIn: ["dan", "cemac-payment-bundles"] },
      { name: "Feature engineering" },
      { name: { fr: "Reporting automatisé (Word, PDF, Excel)", en: "Automated reporting (Word, PDF, Excel)" }, usedIn: ["dan", "payroll", "cemac-payment-bundles"] },
    ],
  },
  {
    id: "programming",
    title: { fr: "Programmation & Data", en: "Programming & Data" },
    skills: [
      { name: "Python", usedIn: ["dan", "payroll", "cemac-payment-bundles"], usedAt: ["beac"] },
      { name: "pandas", usedIn: ["dan", "payroll", "cemac-payment-bundles"], usedAt: ["beac"] },
      { name: "NumPy", usedIn: ["dan"], usedAt: ["beac"] },
      { name: "scikit-learn", usedIn: ["credit-card-fraud", "census-income", "depression-risk"] },
      { name: "Matplotlib · Plotly", usedIn: ["dan", "cemac-payment-bundles", "credit-card-fraud"] },
      { name: "SQL", usedIn: ["payroll"] },
      { name: "Excel", usedIn: ["dan", "payroll", "cemac-payment-bundles"] },
    ],
  },
  {
    id: "ml",
    title: { fr: "Machine Learning", en: "Machine Learning" },
    skills: [
      { name: "Classification", usedIn: ["credit-card-fraud", "census-income"] },
      { name: { fr: "Régression", en: "Regression" }, usedIn: ["depression-risk"] },
      { name: { fr: "Données déséquilibrées", en: "Imbalanced data" }, usedIn: ["credit-card-fraud"] },
      { name: { fr: "Évaluation des modèles", en: "Model evaluation" }, usedIn: ["credit-card-fraud", "census-income"] },
      { name: { fr: "Détection d'anomalies", en: "Anomaly detection" }, usedIn: ["credit-card-fraud"] },
      { name: { fr: "Séries temporelles", en: "Time series" } },
    ],
  },
  {
    id: "ai",
    title: { fr: "Intelligence Artificielle", en: "Artificial Intelligence" },
    skills: [
      { name: { fr: "IA générative", en: "Generative AI" }, usedIn: ["dan"], usedAt: ["beac"] },
      { name: { fr: "LLM en local (Ollama)", en: "Local LLMs (Ollama)" }, usedIn: ["dan"] },
      { name: "Prompt engineering" },
      { name: { fr: "Conception et optimisation de prompts", en: "Prompt design and optimisation" } },
      { name: { fr: "Automatisation avec l'IA", en: "AI-driven automation" } },
      { name: { fr: "Agents et workflows IA", en: "AI agents and workflows" } },
    ],
  },
  {
    id: "finance",
    title: { fr: "Finance & paiements", en: "Finance & payments" },
    skills: [
      { name: { fr: "Systèmes de paiement (SYGMA, SYSTAC, SWIFT)", en: "Payment systems (SYGMA, SYSTAC, SWIFT)" }, usedIn: ["dan"], usedAt: ["beac"] },
      { name: { fr: "Contrôle sur pièces", en: "Off-site oversight" }, usedIn: ["dan"], usedAt: ["beac"] },
      { name: { fr: "Statistiques de paiements", en: "Payment statistics" }, usedIn: ["cemac-payment-bundles"] },
      { name: { fr: "Paie et états comptables", en: "Payroll and accounting statements" }, usedIn: ["payroll"] },
      { name: { fr: "Opérations bancaires", en: "Banking operations" }, usedAt: ["afriland", "africa-finance"] },
    ],
  },
  {
    id: "apps",
    title: { fr: "Applications & qualité", en: "Applications & quality" },
    skills: [
      { name: "Streamlit", usedIn: ["dan", "payroll", "cemac-payment-bundles"], usedAt: ["beac"] },
      { name: "SQLite", usedIn: ["payroll"], usedAt: ["beac"] },
      { name: { fr: "Tests automatisés (pytest)", en: "Automated testing (pytest)" }, usedIn: ["dan", "payroll", "cemac-payment-bundles"] },
      { name: { fr: "Intégration continue (GitHub Actions)", en: "Continuous integration (GitHub Actions)" }, usedIn: ["dan", "payroll", "cemac-payment-bundles"] },
      { name: "Git / GitHub" },
      { name: "Microsoft Excel, Word, PowerPoint" },
    ],
  },
];
