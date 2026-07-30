/* The root route is the entry gate; the site's content lives under /home/. Every
   anchor into an act -- nav links, hero buttons, the "back to work" link on a
   project page -- resolves against this rather than "/", so a missed call site
   lands on the gate instead of the section it named. */
export const HOME_ROUTE = "/home/";

export type Metric = {
  value: string;
  label: string;
};

export const FIGURE_NAMES = ["coffeecat", "diff", "thread"] as const;
export type FigureName = (typeof FIGURE_NAMES)[number];

/* The grounds an act or a project may claim. Each re-points the whole palette
   for its subtree; see tokens.css for the contrast audit behind each one. */
export const CONTENT_TONES = ["sage", "pink", "forest"] as const;
export type ContentTone = (typeof CONTENT_TONES)[number];

/* The masthead is a person, so there is no separate `founder`: that would store
   the same name twice with nothing keeping the two in agreement. Anything
   attributing the work reads `name`. */
export type SiteIdentity = {
  name: string;
  kind: string;
  location: string;
  tagline: string;
  email: string;
  github: string;
  linkedin: string;
  lastUpdated: string;
};

/* The two voices of the hero. Both ship in the HTML; the nav's Mode toggle picks
   which is visible, so neither is optional and a mode missing a line would be a
   blank headline rather than a fallback. */
export type HeroVoice = {
  headline: string;
  tagline: string;
};

export type HeroCopy = {
  glam: HeroVoice;
  grind: HeroVoice;
  statement: readonly string[];
};

/* The hero fact row. `status` renders the value as a pill rather than as plain
   text, which makes it a property of the content rather than of the component. */
export type HeroFact = {
  key: string;
  value: string;
  status?: boolean;
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

/* Homepage-index copy, for when a project's case-study `title` and `summary` are
   longer than the work index has room for. Absent means the case-study strings
   are already the right length and the index uses them directly -- so this is a
   real override, not a second name for the same thing. */
export type ProjectPreview = {
  title: string;
  summary: string;
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
  preview?: ProjectPreview;
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

type HomeActName = "flagship" | "work" | "about" | "contact";

/* Distributed over the act names so `section.act` narrows `section` to exactly
   one variant. A single `{ act: HomeActName }` shape would let any act's props
   reach any act's component. */
type HomeActSection = {
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

/* The TL;DR that carries the entry gate.

   `items` are runs rather than plain strings because one of them emphasises two
   words. The alternatives are worse: raw HTML in the content layer means
   dangerouslySetInnerHTML for a <strong>, and a component that regex-matches a
   magic phrase couples the markup to the copy. */
export type TldrRun = {
  text: string;
  emphasis?: boolean;
};

export type Tldr = {
  /* A structural marker, not part of the sentence, so it stays out of the <h1>:
     folding it in would make the page's accessible name start with "TL;DR" and
     disagree with the JSON-LD description. */
  label: string;
  heading: string;
  items: readonly (readonly TldrRun[])[];
  closer: string;
};

/* The gate is its own route, not a section here, so it is not something
   homeSections can order or the nav can target. */
export type HomeSection = { kind: "hero"; id: "top" } | HomeActSection;

export type RouteNavItem = {
  label: string;
  href: `/${string}` | `/#${string}`;
  kind: "home-anchor" | "route";
};
