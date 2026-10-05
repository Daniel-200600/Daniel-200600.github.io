import type { Project } from "@/lib/types";

/** Source: README of the public repository consolidateur-liasses-paiements. */
export const cemacBundles: Project = {
  slug: "cemac-payment-bundles",
  order: 3,
  title: { fr: "Consolidateur de liasses de paiements", en: "Payment statistics consolidator" },
  summary: {
    fr: "Application locale qui consolide des liasses statistiques de paiements au format Excel, calcule les indicateurs par pays de la CEMAC et produit des exports prêts à analyser.",
    en: "A local application that consolidates payment statistics workbooks in Excel, computes indicators by CEMAC country and produces ready-to-analyse exports.",
  },
  domains: ["finance", "data", "automation", "bi"],
  status: { fr: "Application locale testée", en: "Tested local application" },
  role: { fr: "Conception et développement", en: "Design and development" },
  period: { fr: "2026", en: "2026" },
  stack: ["Python 3.11", "Streamlit", "pandas", "openpyxl", "Plotly", "pytest", "GitHub Actions", "LibreOffice (tests)"],
  links: {
    repo: "https://github.com/Daniel-200600/consolidateur-liasses-paiements",
  },
  sections: {
    context: {
      fr: [
        "Les établissements de la zone CEMAC transmettent des statistiques de paiements sous forme de liasses Excel : chèques et virements, cartes, mobile money, transferts d'argent, prêts. Chaque classeur suit un même gabarit, mais les onglets varient d'un établissement à l'autre.",
      ],
      en: [
        "Institutions in the CEMAC zone report payment statistics as Excel workbooks: cheques and transfers, cards, mobile money, money transfers, loans. Each workbook follows the same template, but tabs vary from one institution to another.",
      ],
    },
    problem: {
      fr: [
        "Consolider un nombre variable de liasses à la main expose à trois risques : oublier des lignes, additionner deux fois le même flux et mélanger des périodes différentes. Les onglets renommés ou découpés (par réseau de cartes, par mois) rendent la consolidation manuelle encore plus fragile.",
      ],
      en: [
        "Consolidating a variable number of workbooks by hand creates three risks: missing rows, counting the same flow twice and mixing different periods. Renamed or split tabs (by card network, by month) make manual consolidation even more fragile.",
      ],
    },
    objective: {
      fr: [
        [
          "Consolider automatiquement toutes les liasses déposées, sans liste d'indicateurs codée en dur.",
          "Regrouper les résultats par pays et pour l'ensemble de la CEMAC.",
          "Ne jamais deviner à l'aveugle : tout rattachement incertain doit rester visible et validable.",
          "Travailler entièrement en local : aucune donnée ne quitte le poste.",
        ],
      ],
      en: [
        [
          "Automatically consolidate every uploaded workbook, with no hard-coded list of indicators.",
          "Group results by country and for the whole CEMAC zone.",
          "Never guess blindly: any uncertain match must stay visible and easy to validate.",
          "Work fully offline: no data leaves the machine.",
        ],
      ],
    },
    data: {
      fr: [
        "Liasses statistiques de paiements (Excel) sur 11 thèmes, un classeur par établissement. Le pays est détecté à partir du nom de fichier, parmi les 6 pays de la CEMAC.",
        "Le dépôt public et ses tests reposent uniquement sur des liasses fictives. Les fichiers réels ne sont jamais publiés.",
      ],
      en: [
        "Payment statistics workbooks (Excel) covering 11 themes, one workbook per institution. The country is detected from the file name, among the 6 CEMAC countries.",
        "The public repository and its tests rely only on fictitious workbooks. Real files are never published.",
      ],
    },
    methodology: {
      fr: [
        [
          "Indicateurs identifiés par leur position dans le gabarit, identique d'un établissement à l'autre, plutôt que par leur libellé.",
          "Reconnaissance des onglets renommés par alignement de séquence sur la structure du gabarit, jamais sur le seul nom ; un rattachement peu sûr devient une proposition validable en un clic.",
          "Garde-fous : un onglet d'un exercice antérieur est écarté, une variation mensuelle invraisemblable (facteur supérieur à 15) est exclue du total et signalée, et le même fichier déposé deux fois n'est compté qu'une fois.",
          "Montant total par pays calculé sans double comptage entre totaux et sous-totaux.",
        ],
      ],
      en: [
        [
          "Indicators identified by their position in the template, which is identical across institutions, rather than by their label.",
          "Renamed tabs recognised through sequence alignment against the template structure, never by name alone; an uncertain match becomes a one-click proposal.",
          "Safeguards: a tab from an earlier year is set aside, an implausible monthly jump (factor above 15) is excluded from the total and flagged, and the same file uploaded twice is only counted once.",
          "Total amount per country computed without double counting totals and subtotals.",
        ],
      ],
    },
    solution: {
      fr: [
        [
          "Dépôt des liasses et réglages regroupés dans la barre latérale ; la zone principale n'affiche que les résultats.",
          "Exports Excel : un fichier complet avec un total par pays et un total CEMAC pour chacun des 11 thèmes, et un résumé « Pays / Montant total (XAF) ».",
          "Graphiques interactifs : évolution par pays, répartition par pays et par rubrique, en nombre ou en montant, et répartition par réseau de cartes.",
          "Historique multi-période conservé hors du dossier de l'application.",
          "Exécutable Windows généré par un script, pour un usage sans installation de Python.",
        ],
      ],
      en: [
        [
          "Upload and settings grouped in the sidebar; the main area only shows results.",
          "Excel exports: a full workbook with a total per country and a CEMAC total for each of the 11 themes, plus a summary “Country / Total amount (XAF)”.",
          "Interactive charts: trend by country, breakdown by country and by item, in count or amount, and breakdown by card network.",
          "Multi-period history stored outside the application folder.",
          "Windows executable built by a script, for use without installing Python.",
        ],
      ],
    },
    results: {
      fr: [
        "La détection automatique expose 45 lignes porteuses de données sur les fichiers de référence, contre 8 avec l'ancienne liste d'indicateurs codée en dur.",
        "295 tests automatisés, exécutés à chaque modification. Certains simulent un vrai dépôt de fichiers dans l'application, d'autres recalculent les exports avec LibreOffice pour garantir l'absence d'erreur de formule.",
      ],
      en: [
        "Automatic detection exposes 45 data-bearing rows on the reference files, against 8 with the former hard-coded list of indicators.",
        "295 automated tests run on every change. Some simulate a real file upload in the app, others recalculate the exports with LibreOffice to make sure no formula breaks.",
      ],
    },
    limits: {
      fr: [
        [
          "Tout repose sur le gabarit de liasse : un onglet qui ne lui correspond pas reste à rattacher manuellement.",
          "Application locale pour un poste, sans partage entre plusieurs utilisateurs.",
          "Les tests de recalcul des exports sont ignorés quand LibreOffice n'est pas installé.",
        ],
      ],
      en: [
        [
          "Everything relies on the workbook template: a tab that does not match it must be assigned manually.",
          "A local, single-machine application, without sharing between several users.",
          "Export recalculation tests are skipped when LibreOffice is not installed.",
        ],
      ],
    },
  },
};
