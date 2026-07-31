import { site } from "./identity";
import { featuredProject } from "./projects";
import type {
  BackgroundEntry,
  HeroCopy,
  HeroFact,
  HomeSection,
  RouteNavItem,
  Tldr,
} from "./types";
import { HOME_ROUTE } from "./types";

/* The entry gate's copy, transcribed verbatim: punctuation, the curly
   apostrophe, and the emphasis on "Glam & Grind" are all as written. Not to be
   paraphrased or tightened without Kyrstin's say-so.

   Annotated `Tldr` rather than `as const satisfies`, for the same reason
   heroFacts below is: only one run carries `emphasis`, so under `as const` the
   run type becomes a union of shapes and most members have no such property --
   reading `run.emphasis` in the component then does not compile. */
export const tldr: Tldr = {
  label: "TL;DR",
  heading: "(Building a meaningful life)",
  items: [
    [
      {
        text: "I engineer agentic systems and paint ambitious ideas into reality beyond the terminal.",
      },
    ],
    [
      {
        text: "I’m a proud cat mom of two. Somewhere along the way, that became a creative practice of its own.",
      },
    ],
    [
      { text: "Technology is my medium. " },
      { text: "Glam & Grind", emphasis: true },
      { text: " is the philosophy behind the work." },
    ],
  ],
  closer: "I like catalyzing elegant solutions to big-brain problems. Good coffee, too. ☕",
};

/* The hero's copy, both modes of it.

   The nav's Mode toggle swaps the whole voice, not a colour: glam and grind are
   two readings of the same claim and both ship in the HTML, with CSS choosing
   which is visible. That is why they live together here -- they have to be
   editable as a pair, and a line changed in one voice but not the other is the
   failure this shape exists to make obvious.

   `statement` is outside the pair deliberately: it reads in both modes.

   The taglines interpolate identity rather than restating it, so a change to
   site.kind or site.location cannot leave the hero contradicting the masthead. */
export const hero = {
  glam: {
    headline: "Small tools for deep work.",
    tagline: `${site.kind} / systems builder in ${site.location}. Small tools. Clear intent.`,
  },
  grind: {
    headline: "Ship small. Think hard.",
    tagline: `${site.kind} / systems builder / ${site.location}. Useful software, kept close to the metal.`,
  },
  /* An array because the hero renders each entry as its own display line. One
     line today; the shape is what lets a second be added without touching Hero. */
  statement: ["Small tools for people who think in systems."],
} as const satisfies HeroCopy;

/* Annotated `readonly HeroFact[]` rather than `as const satisfies`, unlike the
   other content arrays: only one cell carries `status`, so under `as const` the
   element type is a union of three shapes and two of them have no such property,
   which makes `fact.status` in the component a type error. */
export const heroFacts: readonly HeroFact[] = [
  { key: "Extension", value: "CoffeeCat", status: true },
  { key: "Service", value: "CrèmeAI" },
  { key: "Based in", value: "New York" },
];

/* AboutAct destructures `body` positionally as [experience, focus, cats, motto].
   Reordering these four lines reassigns them to different slots in the layout. */
export const about = {
  heading: "The short version.",
  body: [
    "Four years building distributed data systems: Spark ETL, APIs, and observability.",
    "Systems engineer and builder: now making agentic systems and small tools you can inspect.",
    "Two cats. Every illustration here starts there.",
    "Glam & Grind: make it good, then make it work.",
  ],
} as const;

/* `heading` is the mono label above the act's h2; `title` is the h2 itself.
   The work act is a group, so its h2 names the shared idea and each project
   below owns an h3. */
export const work = {
  heading: "Selected work",
  title: "Small systems, fully considered.",
} as const;

export const background = [
  {
    role: "Data Engineering",
    team: "High-traffic adtech platform",
    period: "2022 — Present",
    context: "Distributed systems",
    body: "Distributed Spark ETL pipelines and performant APIs serving high-traffic adtech workloads. Cloud-native AWS services, microservice architecture, observability instrumentation, and test-driven delivery across infrastructure and application layers.",
    href: "/work/adtech/",
    linkLabel: "Read the production case study",
  },
  {
    role: "B.S. Software Engineering",
    team: "Miami University, Oxford OH",
    period: "2019 — 2022",
    context: "Education",
    body: "",
  },
] as const satisfies readonly BackgroundEntry[];

/* Ordered, not alphabetical. The masthead claims agentic systems, so the list
   opens on that claim; a reader scanning the first three entries should meet the
   same engineer the hero describes. */
export const skills = [
  "Agents",
  "LLM Systems",
  "Python",
  "AWS",
  "Spark",
  "ETL",
  "Java",
  "Scala",
  "Microservices",
  "API Design",
  "Observability",
  "Test-Driven Development",
  "Cloud-Native",
  "Data Systems",
] as const;

export const contact = {
  heading: "Say hello.",
  body: "Email is fastest.",
} as const;

/* Order is the page order, and the menu is derived from the same acts. Keep the
   named CrèmeAI act before the broader Work act so the navigation follows the
   page's argument rather than inventing a second order. */
export const homeSections = [
  { kind: "hero", id: "top" },
  {
    kind: "act",
    act: "flagship",
    id: featuredProject.homeAnchorId,
    navLabel: "Extension",
    number: "01",
    eyebrow: featuredProject.eyebrow,
    /* The hero owns pink, so the first act cuts to a new ground and the work
       reads as a chapter rather than as a continuation of the masthead. */
    tone: "sage",
  },
  {
    kind: "act",
    act: "cremeai",
    id: "cremeai",
    navLabel: "CrèmeAI",
    number: "02",
    eyebrow: "Serverless Discord Bot",
    tone: "sage",
  },
  {
    kind: "act",
    act: "work",
    id: "work",
    navLabel: "Work",
    number: "03",
    eyebrow: "Selected work",
    tone: "sage",
  },
  {
    kind: "act",
    act: "about",
    id: "about",
    navLabel: "About",
    number: "04",
    eyebrow: "The short version",
    tone: "forest",
  },
  {
    kind: "act",
    act: "contact",
    id: "contact",
    navLabel: "Contact",
    number: "05",
    eyebrow: "Open channel",
    tone: "pink",
  },
] as const satisfies readonly HomeSection[];

export const homeNavSections = homeSections.flatMap((section) =>
  section.kind === "act" ? [{ id: section.id, label: section.navLabel }] : []
);

export const navSections = homeNavSections.map((section) => ({
  label: section.label,
  href: `${HOME_ROUTE}#${section.id}` as `/${string}`,
  kind: "home-anchor" as const,
})) satisfies RouteNavItem[];
