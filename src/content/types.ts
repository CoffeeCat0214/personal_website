export type Beat = {
  label: string;
  heading: string;
  body: string;
};

export type Metric = {
  value: string;
  label: string;
};

export type FigureName = "coffeecat" | "diff" | "thread";

export type ContentTone = "sage" | "pink" | "forest";
export type PanelTone = "lilac" | "orange";

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

export type FlagshipProject = {
  id: string;
  number: string;
  name: string;
  eyebrow: string;
  title: string;
  positioning: string;
  tests: string;
  beats: Beat[];
  tech: string[];
  metrics: Metric[];
  href: string;
  figure: FigureName;
  tone: ContentTone;
};

export type Project = {
  id: string;
  name: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  tests: string;
  tech: string[];
  metrics: Metric[];
  href: string;
  figure: FigureName;
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
