import type { Project } from "@/lib/types";

/**
 * Sources: CV (BEAC internship, June to August 2026) and the README of the
 * public demo repository dan-payment-risk-analysis (synthetic data only).
 */
export const dan: Project = {
  slug: "dan",
  order: 1,
  featured: true,
  title: { fr: "DAN", en: "DAN" },
  summary: {
    fr: "Application de surveillance des systèmes de paiement, conçue pour automatiser et structurer une partie du contrôle sur pièces des systèmes et moyens de paiement de la CEMAC.",
    en: "A payment systems monitoring application, designed to automate and structure part of the off-site oversight of CEMAC payment systems and means of payment.",
  },
  domains: ["finance", "automation", "data", "bi"],
  status: { fr: "Prototype terminé", en: "Completed prototype" },
  role: { fr: "Conception et développement", en: "Design and development" },
  period: { fr: "2026 · stage à la BEAC et mémoire", en: "2026 · BEAC internship and dissertation" },
  confidentialityNote: {
    fr: "Projet lié à un stage à la BEAC. La version présentée ici est une démonstration publique : données, cartographie des risques, modèles de rapports et logos sont synthétiques. Aucune donnée réelle de transaction, de participant ou d'institution n'y figure.",
    en: "Project connected to an internship at the BEAC. The version shown here is a public demo: data, risk mapping, report templates and logos are synthetic. No real transaction, participant or institutional data is included.",
  },
  stack: [
    "Python 3.11",
    "Streamlit",
    "pandas",
    "NumPy",
    "openpyxl",
    "docxtpl",
    "python-docx",
    "Plotly",
    "Matplotlib",
    "ReportLab",
    "pytest",
    "GitHub Actions",
    "Ollama",
  ],
  links: {
    repo: "https://github.com/Daniel-200600/dan-payment-risk-analysis",
  },
  sections: {
    context: {
      fr: [
        "Projet développé dans le cadre de mon stage à la Direction des Systèmes et Moyens de Paiement (DSMP) de la BEAC, de juin à août 2026, et de mon mémoire.",
        "La surveillance des systèmes de paiement (règlement de montants élevés, compensation, messagerie interbancaire, infrastructures réseau) repose sur des déclarations d'incidents envoyées chaque mois par de nombreux participants, dans plusieurs pays de la CEMAC.",
      ],
      en: [
        "Developed during my internship at the BEAC's Payment Systems and Means of Payment Department (DSMP), from June to August 2026, and for my dissertation.",
        "Payment systems oversight (large-value settlement, clearing, interbank messaging, network infrastructure) relies on incident reports sent every month by many participants across several CEMAC countries.",
      ],
    },
    problem: {
      fr: [
        "Ces déclarations arrivent sous forme de fichiers Excel hétérogènes. Les consolider à la main, dans des tableurs, est lent et peu homogène d'un mois à l'autre, alors qu'il faut décider rapidement où porter l'attention.",
      ],
      en: [
        "These reports arrive as heterogeneous Excel files. Consolidating them by hand in spreadsheets is slow and inconsistent from one month to the next, while the team needs to decide quickly where attention is required.",
      ],
    },
    objective: {
      fr: [
        [
          "Importer des fichiers de reporting hétérogènes avec un minimum de préparation manuelle.",
          "Rattacher chaque événement déclaré à une catégorie et à un niveau de risque, puis calculer un score de sévérité consolidé et explicable.",
          "Comparer les pays et les systèmes, et suivre les tendances dans le temps.",
          "Produire des rapports consolidés sans copier-coller.",
        ],
      ],
      en: [
        [
          "Ingest heterogeneous reporting files with minimal manual preparation.",
          "Map each reported event to a risk category and level, then compute a consolidated, explainable severity score.",
          "Compare countries and systems, and track trends over time.",
          "Generate consolidated reports without copy-paste.",
        ],
      ],
    },
    data: {
      fr: [
        "Fiches de reporting mensuelles au format Excel (.xlsx, .xls), une par participant, par pays et par système. Le pays, le mois et l'année sont déduits de l'arborescence des dossiers ; le système de paiement est reconnu à partir des codes de référence des événements.",
        "Une cartographie des risques associe chaque type d'événement à une catégorie et à un niveau de risque.",
        "Dans la version publique, toutes les données sont fictives : 3 pays, 2 banques et 4 systèmes, générés par un script du dépôt.",
      ],
      en: [
        "Monthly Excel reporting forms (.xlsx, .xls), one per participant, country and system. Country, month and year are inferred from the folder structure; the payment system is recognised from the events' reference codes.",
        "A risk mapping links each event type to a risk category and level.",
        "In the public version all data is fictitious: 3 countries, 2 banks and 4 systems, generated by a script in the repository.",
      ],
    },
    methodology: {
      fr: [
        "Un score transparent plutôt qu'un modèle opaque : la sévérité d'un événement combine un poids d'occurrence (lissé de façon logarithmique) et le poids de son niveau de risque. Les risques combinés sont répartis entre leurs catégories, et les seuils (critique, élevé, moyen, faible) restent paramétrables.",
        "La logique métier est séparée de l'interface, ce qui permet de la tester unitairement. Une suite pytest s'exécute en intégration continue à chaque modification.",
      ],
      en: [
        "A transparent score rather than an opaque model: an event's severity combines an occurrence weight (with logarithmic smoothing) and the weight of its risk level. Combined risks are split across their categories, and thresholds (critical, high, medium, low) remain configurable.",
        "Business logic is kept separate from the interface so it can be unit-tested. A pytest suite runs in continuous integration on every change.",
      ],
    },
    solution: {
      fr: [
        [
          "Import de fichiers isolés ou d'un dossier complet, avec rapprochement tolérant (casse, accents, abréviations) et alertes sur les fichiers incohérents.",
          "Tableau de bord : score consolidé, répartition par système et interprétation en langage clair.",
          "Analyse des incidents : incidents survenus, causes probables, risques dominants, recommandations et plan d'action proposé.",
          "Vue multi-pays et historique des analyses.",
          "Génération de rapports Word à partir de modèles (rapport consolidé d'incidents, rapport mensuel d'activité), avec export PDF.",
          "Assistant optionnel reposant sur un modèle de langage exécuté en local (Ollama).",
        ],
      ],
      en: [
        [
          "Import of single files or a whole folder, with tolerant matching (case, accents, abbreviations) and warnings on inconsistent files.",
          "Dashboard: consolidated score, breakdown by system and plain-language interpretation.",
          "Incident analysis: occurred incidents, probable causes, dominant risks, recommendations and a proposed action plan.",
          "Multi-country view and analysis history.",
          "Word report generation from templates (consolidated incident report, monthly activity report), with PDF export.",
          "Optional assistant built on a language model running locally (Ollama).",
        ],
      ],
    },
    results: {
      fr: [
        "Un prototype terminé qui couvre toute la chaîne, de l'import des reportings jusqu'aux rapports prêts à diffuser.",
        "Une version de démonstration publique, documentée et testée, qui peut être présentée sans exposer la moindre donnée interne.",
      ],
      en: [
        "A completed prototype covering the whole chain, from importing the reports to ready-to-share reports.",
        "A public, documented and tested demo version that can be shown without exposing any internal data.",
      ],
    },
    limits: {
      fr: [
        [
          "Les pondérations du score sont heuristiques : elles n'ont pas été validées sur des résultats réels.",
          "La cartographie des risques et les modèles fournis sont illustratifs.",
          "Interface en français uniquement, pour un utilisateur local, sans authentification.",
          "Le PDF fidèle aux modèles nécessite Microsoft Word ou LibreOffice ; sinon, un PDF simplifié est produit.",
        ],
      ],
      en: [
        [
          "The score weights are heuristic and have not been validated against real outcomes.",
          "The risk mapping and templates provided are illustrative.",
          "French-only interface, for a single local user, without authentication.",
          "A PDF faithful to the templates requires Microsoft Word or LibreOffice; otherwise a simplified PDF is produced.",
        ],
      ],
    },
  },
  workflow: [
    {
      title: { fr: "Problème métier", en: "Business problem" },
      body: {
        fr: ["Chaque mois, des déclarations d'incidents arrivent de nombreux participants et de plusieurs pays. Il faut savoir rapidement où porter l'attention."],
        en: ["Every month, incident reports arrive from many participants and several countries. The team needs to know quickly where attention is required."],
      },
    },
    {
      title: { fr: "Données", en: "Data" },
      body: {
        fr: ["Des fiches de reporting Excel, rangées par pays, mois et établissement, et une cartographie qui relie chaque type d'événement à une catégorie et à un niveau de risque."],
        en: ["Excel reporting forms, organised by country, month and institution, and a mapping that links each event type to a risk category and level."],
      },
    },
    {
      title: { fr: "Traitement", en: "Processing" },
      body: {
        fr: ["Import d'un fichier ou d'un dossier entier. Le pays et la période sont déduits des dossiers, le système est reconnu dans les codes de référence, et les fichiers incohérents sont signalés."],
        en: ["Import of a file or a whole folder. Country and period are inferred from the folders, the system is recognised from the reference codes, and inconsistent files are flagged."],
      },
    },
    {
      title: { fr: "Logique de contrôle", en: "Control logic" },
      body: {
        fr: ["Chaque événement survenu est rattaché à son risque. Sa sévérité combine sa fréquence, lissée, et le poids de son niveau de risque."],
        en: ["Each occurred event is mapped to its risk. Its severity combines its smoothed frequency and the weight of its risk level."],
      },
    },
    {
      title: { fr: "Indicateurs", en: "Indicators" },
      body: {
        fr: ["Score consolidé par pays, répartition par système, nombre d'incidents survenus, taux de transmission des reportings et niveau de risque selon des seuils paramétrables."],
        en: ["Consolidated score per country, breakdown by system, number of occurred incidents, reporting transmission rate and risk level against configurable thresholds."],
      },
    },
    {
      title: { fr: "Reporting", en: "Reporting" },
      body: {
        fr: ["Rapport consolidé des incidents et rapport mensuel d'activité, générés depuis des modèles Word et exportables en PDF."],
        en: ["Consolidated incident report and monthly activity report, generated from Word templates and exportable to PDF."],
      },
    },
    {
      title: { fr: "Décision", en: "Decision" },
      body: {
        fr: ["Interprétation en langage clair, causes probables, risques dominants, recommandations et plan d'action proposé pour orienter la surveillance."],
        en: ["Plain-language interpretation, probable causes, dominant risks, recommendations and a proposed action plan to steer oversight."],
      },
    },
  ],
  gallery: [
    {
      src: "/projects/dan/kpis.webp",
      width: 1020,
      height: 190,
      alt: {
        fr: "Indicateurs du tableau de bord de DAN pour un pays : événements suivis, incidents du mois, systèmes surveillés, disponibilité et indice de risque.",
        en: "DAN dashboard indicators for one country: tracked events, incidents this month, monitored systems, availability and risk index.",
      },
      caption: {
        fr: "Tableau de bord : indicateurs d'un pays. Données synthétiques de démonstration.",
        en: "Dashboard: indicators for one country. Synthetic demo data.",
      },
    },
    {
      src: "/projects/dan/multi-country.webp",
      width: 1020,
      height: 420,
      alt: {
        fr: "Vue multi-pays de DAN : taux de transmission, niveau de risque le plus élevé et comparaison des scores par pays en barres horizontales.",
        en: "DAN multi-country view: transmission rate, highest risk level and horizontal bar comparison of scores by country.",
      },
      caption: {
        fr: "Vue multi-pays : comparaison des scores. Données synthétiques de démonstration.",
        en: "Multi-country view: score comparison. Synthetic demo data.",
      },
    },
  ],
};
