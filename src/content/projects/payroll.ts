import type { Project } from "@/lib/types";

/** Source: README and docs of the gestion-salaires repository (v1.8.0). */
export const payroll: Project = {
  slug: "payroll",
  order: 2,
  title: { fr: "Gestion des salaires", en: "Payroll management" },
  summary: {
    fr: "Application de paie des enseignants pour des établissements scolaires au Cameroun : du classeur Excel mensuel aux bulletins et aux exports comptables.",
    en: "Teacher payroll application for schools in Cameroon: from the monthly Excel workbook to payslips and accounting exports.",
  },
  domains: ["automation", "data", "finance"],
  status: { fr: "Version 1.8.0", en: "Version 1.8.0" },
  role: { fr: "Conception et développement", en: "Design and development" },
  period: { fr: "2026", en: "2026" },
  stack: [
    "Python",
    "Streamlit",
    "SQLite",
    "pandas",
    "openpyxl",
    "python-docx",
    "PyMuPDF",
    "cryptography",
    "pytest",
    "GitHub Actions",
  ],
  links: {
    repo: "https://github.com/Daniel-200600/gestion-salaires",
  },
  sections: {
    context: {
      fr: [
        "La paie des enseignants d'établissements scolaires au Cameroun, avec deux statuts aux règles différentes : vacataires, soumis à une taxe spécifique, et permanents, payés au mois.",
        "Les éléments de paie arrivent chaque mois dans un classeur Excel (heures, informations, état comptable).",
      ],
      en: [
        "Teacher payroll for schools in Cameroon, with two statuses following different rules: part-time teachers, subject to a specific tax, and permanent staff paid monthly.",
        "Payroll inputs arrive every month in an Excel workbook (hours, staff information, accounting statement).",
      ],
    },
    problem: {
      fr: ["Chaque mois, la paie part d'un classeur Excel : calculer les montants selon le statut de chaque enseignant, contrôler les écarts, produire les bulletins au format de l'établissement et préparer l'état comptable. À la main, ce travail est répétitif, difficile à contrôler et laisse peu de traces des corrections."],
      en: ["Every month, payroll starts from an Excel workbook: compute amounts according to each teacher's status, check discrepancies, produce payslips in the school's format and prepare the accounting statement. Done by hand, this work is repetitive, hard to check and leaves little trace of corrections."],
    },
    objective: {
      fr: [
        "Couvrir tout le cycle de paie dans un seul outil : saisie, calcul, contrôle, validation, clôture, bulletins et exports comptables.",
      ],
      en: [
        "Cover the whole payroll cycle in a single tool: input, calculation, control, validation, closing, payslips and accounting exports.",
      ],
    },
    data: {
      fr: [
        [
          "Classeur Excel mensuel : heures, informations des enseignants, état comptable.",
          "Listes d'enseignants existantes (Excel, CSV, Word ou PDF), reprises avec détection des doublons probables.",
          "Modèles de bulletin de l'établissement (Word ou PDF).",
        ],
        "Les tests automatisés utilisent un classeur fictif construit sur le modèle de celui des établissements.",
      ],
      en: [
        [
          "Monthly Excel workbook: hours, teacher information, accounting statement.",
          "Existing teacher lists (Excel, CSV, Word or PDF), imported with likely-duplicate detection.",
          "The school's payslip templates (Word or PDF).",
        ],
        "Automated tests use a fictitious workbook built on the model of the schools' own.",
      ],
    },
    methodology: {
      fr: [
        [
          "Architecture en couches stricte : page Streamlit → service → repository → SQLite. Aucune requête SQL depuis l'interface, aucune logique métier dans les pages.",
          "Un seul module de calcul de paie, source unique de vérité.",
          "Cycle de vie des périodes : brouillon → ouverte → validée → clôturée. Le taux de taxe est figé au moment de la validation.",
          "Imports contrôlés : écarts détectés et tableau de correction avant validation ; imports massifs avec simulation préalable (dry-run) et transaction.",
          "Tests automatisés (pytest) exécutés en intégration continue avec GitHub Actions.",
        ],
      ],
      en: [
        [
          "Strict layered architecture: Streamlit page → service → repository → SQLite. No SQL from the UI, no business logic in pages.",
          "A single payroll calculation module, used as the one source of truth.",
          "Pay period lifecycle: draft → open → validated → closed. The tax rate is frozen at validation.",
          "Controlled imports: discrepancies flagged with a correction table before validation; bulk imports with a dry-run and a transaction.",
          "Automated tests (pytest) run in continuous integration with GitHub Actions.",
        ],
      ],
    },
    solution: {
      fr: [
        [
          "Authentification et rôles (administrateur, gestionnaire de paie, consultation), sans aucun mot de passe par défaut.",
          "Calcul, contrôle, validation et clôture de la paie.",
          "Bulletins identiques au bulletin officiel de l'établissement, en Word ou en PDF.",
          "Exports comptables Excel, historique et reporting sur plusieurs périodes, statistiques.",
          "Gestion documentaire et archivage ; sauvegarde et restauration par l'API native SQLite, avec retour arrière automatique en cas d'échec.",
          "Licence d'utilisation par clé signée (Ed25519).",
          "Code source consultable sur GitHub, sous licence propriétaire.",
        ],
      ],
      en: [
        [
          "Authentication and roles (administrator, payroll manager, read-only), with no default password ever created.",
          "Payroll calculation, control, validation and closing.",
          "Payslips matching the school's official layout, in Word or PDF.",
          "Excel accounting exports, multi-period history and reporting, statistics.",
          "Document management and archiving; backup and restore through SQLite's native API, with automatic rollback on failure.",
          "Licence keys signed with Ed25519.",
          "Source code available on GitHub under a proprietary licence.",
        ],
      ],
    },
    results: {
      fr: ["Version 1.8.0, couverte par plus de 1 600 tests automatisés exécutés en intégration continue (GitHub Actions).", "La sécurité des données de paie est traitée dès la conception : aucun mot de passe par défaut, droits par rôle, journalisation des changements de statut et sauvegardes vérifiées avant toute restauration."],
      en: ["Version 1.8.0, covered by more than 1,600 automated tests running in continuous integration (GitHub Actions).", "Payroll data security is handled by design: no default password, role-based permissions, logged status changes and verified backups before any restore."],
    },
    limits: {
      fr: [
        "L'exécutable Windows est spécifié (PyInstaller) mais n'a pas encore été construit ni testé sur Windows.",
        "Base SQLite locale : l'application est pensée pour fonctionner sur un poste, pas comme un service en ligne.",
      ],
      en: [
        "The Windows executable is specified (PyInstaller) but has not yet been built or tested on Windows.",
        "Local SQLite database: the application is designed to run on one machine, not as an online service.",
      ],
    },
  },
};
