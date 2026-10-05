import type { Project } from "@/lib/types";
import { dan } from "./dan";
import { cemacBundles } from "./others";
import { payroll } from "./payroll";

/** To add a project: create a file in this folder and add it to this list. */
export const projects: Project[] = [dan, payroll, cemacBundles].sort(
  (a, b) => a.order - b.order,
);

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export const featuredProject = projects.find((p) => p.featured);
