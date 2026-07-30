export { site } from "./identity";
export {
  featuredProject,
  getProjectBySlug,
  getProjectRoute,
  projectPreviews,
  projectRoutes,
  projects,
  supportingProjects,
} from "./projects";
export {
  about,
  background,
  contact,
  hero,
  heroFacts,
  homeSections,
  homeNavSections,
  navSections,
  skills,
  tldr,
  work,
} from "./home";
export type {
  BackgroundEntry,
  ContentTone,
  FigureName,
  HeroFact,
  HomeSection,
  Metric,
  Project,
  ProjectCaseStudySection,
  ProjectMetadata,
  ProjectRoute,
  ProjectSlug,
  RouteNavItem,
  SiteIdentity,
  Tldr,
  TldrRun,
} from "./types";
export { CONTENT_TONES, FIGURE_NAMES, HOME_ROUTE, PROJECT_SLUGS } from "./types";
