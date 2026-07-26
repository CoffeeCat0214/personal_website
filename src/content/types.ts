/* The site's content lives under /home/. The root route is the entry gate and
   carries nothing but the TL;DR, so every anchor into an act -- nav links, the
   hero's own buttons, the "back to work" link on a project page -- has to be
   prefixed with this rather than hanging off "/".

   A constant and not a literal sprinkled through the components: there are six
   call sites, and the failure mode of missing one is a link that lands on the
   gate and looks like the site simply forgot where it was going. */
export const HOME_ROUTE = "/home/";

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
  tone: ContentTone | PanelTone;
};

/* No `founder` field. The masthead is the person, so a separate founder string
   would be the same name stored twice with nothing keeping the two in agreement.
   Anything that needs to attribute the work reads `name`. */
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

/* The hero fact row. `status` is what renders the value as a pill rather than as
   plain text, so it belongs to the content and not to the component -- which is
   where this row used to live. */
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

/* The TL;DR that carries the entry gate.

   `items` are rich rather than plain strings because one of them emphasises two
   words ("Glam & Grind") and the alternatives are both worse: raw HTML in the
   content layer means dangerouslySetInnerHTML for a <strong>, and a component
   that regex-matches a magic phrase couples the markup to the copy. A run list
   makes the emphasis a property of the content, which is where it belongs, and
   keeps the renderer a plain .map(). */
export type TldrRun = {
  text: string;
  emphasis?: boolean;
};

export type Tldr = {
  /* Rendered as a mono label, deliberately separate from `heading`. It is a
     structural marker, not part of the sentence -- folding it into the <h1>
     would make the page's accessible name "TL;DR — Currently building..." and
     disagree with the JSON-LD description. */
  label: string;
  heading: string;
  items: readonly (readonly TldrRun[])[];
  closer: string;
};

/* No "gate" member. The gate is its own route now rather than this page's first
   section, so it is not something homeSections can order, the nav can target,
   or the section-id invariants apply to. */
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
