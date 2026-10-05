import type { Locale } from "@/i18n/config";

/** A value written once per language. */
export type Localized<T = string> = Record<Locale, T>;

/**
 * Rich text kept deliberately small:
 * a string is a paragraph, a string[] is a bullet list.
 */
export type Rich = (string | string[])[];

export type Domain = "data" | "bi" | "ai" | "finance" | "automation";

export type CaseStudySections = {
  context: Localized<Rich>;
  problem: Localized<Rich>;
  objective: Localized<Rich>;
  data: Localized<Rich>;
  methodology: Localized<Rich>;
  solution: Localized<Rich>;
  results: Localized<Rich>;
  limits: Localized<Rich>;
};

export type WorkflowStep = {
  title: Localized;
  body: Localized<Rich>;
};

export type Project = {
  slug: string;
  /** Lower comes first. */
  order: number;
  featured?: boolean;
  title: Localized;
  /** One sentence shown in lists. */
  summary: Localized;
  domains: Domain[];
  status: Localized;
  role?: Localized;
  period?: Localized;
  /** Shown above the case study when the project touches non-public material. */
  confidentialityNote?: Localized;
  stack: string[];
  links: {
    repo?: string;
    demo?: string;
  };
  sections: CaseStudySections;
  /** Business workflow rendered as an animated step-by-step diagram. */
  workflow?: WorkflowStep[];
  /** Screenshots under /public, always on non-sensitive data. */
  gallery?: {
    src: string;
    width: number;
    height: number;
    alt: Localized;
    caption: Localized;
  }[];
};

export type Experience = {
  id: string;
  organization: string;
  unit?: Localized;
  role: Localized;
  kind?: Localized;
  period: Localized;
  location?: Localized;
  summary: Localized;
  highlights: Localized<string[]>;
  tools?: Localized<string[]>;
  relatedProject?: string;
};

export type Education = {
  id: string;
  degree: Localized;
  institution: string;
  period: Localized;
  status: Localized;
  details?: Localized<string[]>;
};

export type SkillCategory = {
  id: string;
  title: Localized;
  skills: {
    name: string | Localized;
    /** Slugs of projects where the skill was actually used. */
    usedIn?: string[];
    /** Ids of experiences where the skill was used (see experience.ts). */
    usedAt?: string[];
  }[];
};

export type LabEntryKind = "analysis" | "dashboard" | "notebook" | "article" | "experiment";

export type LabEntry = {
  slug: string;
  kind: LabEntryKind;
  date: string;
  title: Localized;
  summary: Localized;
  stack: string[];
  /** Methods and checks, as a short list. */
  highlights: Localized<string[]>;
  /** Honest scope note shown under the entry. */
  limit?: Localized;
  links: { repo?: string; notebook?: string; demo?: string };
};
