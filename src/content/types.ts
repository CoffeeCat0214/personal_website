export type Beat = {
  label: string;
  heading: string;
  body: string;
};

export type Metric = {
  value: string;
  label: string;
};

export const FIGURE_NAMES = ["coffeecat", "diff", "thread"] as const;
export type FigureName = (typeof FIGURE_NAMES)[number];

export const CONTENT_TONES = ["sage", "pink", "forest"] as const;
export type ContentTone = (typeof CONTENT_TONES)[number];

export const PANEL_TONES = ["lilac", "orange"] as const;
export type PanelTone = (typeof PANEL_TONES)[number];

export type MarkPanel = {
  id: string;
  tone: PanelTone;
  line: string;
};

export type Runner = {
  id: string;
  phrases: [string, string];
  tone: PanelTone;
};

export type SiteIdentity = {
  name: string;
  kind: string;
  founder: string;
  location: string;
  tagline: string;
  email: string;
  github: string;
  linkedin: string;
  lastUpdated: string;
};

export const PROJECT_SLUGS = ["coffeecat", "codehusk", "cremeai"] as const;
export type ProjectSlug = (typeof PROJECT_SLUGS)[number];

export type ProjectCaseStudySection = {
  label: string;
  heading: string;
  body: string[];
};

export type ProjectMetadata = {
  title: string;
  description: string;
};

export type ProjectRoute = {
  slug: ProjectSlug;
  href: `/work/${ProjectSlug}/`;
  lastUpdated: string;
};

export type Project = {
  slug: ProjectSlug;
  homeAnchorId?: string;
  name: string;
  eyebrow: string;
  title: string;
  summary: string;
  positioning?: string;
  tests: string;
  caseStudy: ProjectCaseStudySection[];
  tech: string[];
  metrics: Metric[];
  repoHref: string;
  figure: FigureName;
  tone: ContentTone;
  metadata: ProjectMetadata;
  lastUpdated: string;
};

export type BackgroundEntry = {
  role: string;
  team: string;
  period: string;
  context: string;
  body: string;
};

export type HomeActName = "flagship" | "work" | "about" | "contact";

export type HomeActSection = {
  [Act in HomeActName]: {
    kind: "act";
    act: Act;
    id: string;
    navLabel: string;
    number: string;
    eyebrow: string;
    tone: ContentTone;
  };
}[HomeActName];

export type HomeSection =
  | { kind: "hero"; id: "top" }
  | { kind: "runner"; runner: Runner }
  | { kind: "panel"; panel: MarkPanel; precedes: string }
  | HomeActSection;

export type RouteNavItem = {
  label: string;
  href: `/${string}` | `/#${string}`;
  kind: "home-anchor" | "route";
};
