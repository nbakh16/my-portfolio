import projectsEn from "../data/projects.json";

export interface ProjectSection {
  heading: string;
  body?: string[];
  list?: string[];
}

export interface Project {
  slug: string;
  title: string;
  tagline?: string;
  description: string;
  category: string;
  period?: string;
  role?: string;
  tech: string[];
  platforms: string[];
  link?: string;
  repoUrl?: string;
  /** Filename inside src/assets/projects/<slug>/ to use as the card cover. Defaults to the first screenshot. */
  cover?: string;
  sections?: ProjectSection[];
  /** Screenshot filename -> caption, used as the alt text and shown in the lightbox. */
  captions?: Record<string, string>;
}

/**
 * Single entry point for project data. Adding a second language later means adding
 * src/data/projects.<lang>.json and a lang argument here — no component changes.
 */

export function getProjects(): Project[] {
  return projectsEn as Project[];
}

export function getProject(slug: string): Project | undefined {
  return getProjects().find((project) => project.slug === slug);
}
