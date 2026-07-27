import { featuredProject } from "./projects";
import type {
  BackgroundEntry,
  HeroFact,
  HomeSection,
  MarkPanel,
  RouteNavItem,
  Runner,
  Tldr,
} from "./types";
import { HOME_ROUTE } from "./types";

/* The entry gate's copy. Transcribed verbatim -- punctuation, the curly
   apostrophe, and the emphasis on "Glam & Grind" are all as written, and this
   block is not to be paraphrased or tightened without her saying so.

   `heading` is deliberately the same sentence as `about.heading` below. That
   duplication is real and currently ships the same line as both the page's <h1>
   and the About act's <h2>; it is left standing rather than silently resolved,
   because deciding which of the two slots keeps it is a content call. Worth
   settling in the next pass over the page flow.

   Note also that item 1 says "into reality beyond the terminal" while
   site.tagline says "into life beyond the terminal". Both are verbatim from
   their own sources and the divergence is intentional -- do not "fix" one to
   match the other.

   Annotated rather than `as const satisfies`, for the same reason heroFacts
   above is: only one run carries `emphasis`, so under `as const` the run type
   is a union of shapes and most of them have no such property -- reading
   `run.emphasis` in the component does not compile. Widening to Tldr makes the
   optional field optional at the point it is read. */
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
  closer: "I like catalyzing elegant solutions to big-brain problems. Good coffee, too.",
};

/* The second line stays whatever else changes around it. Every project carries a
   required `tests` field that renders as "TESTING ...", and that device only
   reads as deliberate if something up top establishes the experiment framing;
   without it, each project page looks like it is hedging about its own value.

   The first line carries the positioning claim, and lands on the same word
   CodeHuskAI's hypothesis already uses -- trust. That is the actual hard part of
   agentic work, and naming it is more specific than naming the technology. */
export const hero = {
  statement: [
    "Small tools for people who think in systems.",
  ],
} as const;

/* Three cells, and this row used to live inline in Hero.tsx -- copy outside the
   content module, which is the drift this module exists to catch.

   "Built by -> Kyrstin Kauchak" was one of them and is gone: it restated the h1
   sitting directly above it. The freed cell states the philosophy as a label,
   which is the whole of what the page needs to say about it. Naming it here and
   running it as a marquee band is enough; a paragraph explaining it would be
   the thing to avoid.

   Annotated rather than `as const satisfies`, unlike the other content arrays.
   Only one cell carries `status`, so under `as const` the array's element type
   is a union of three shapes and two of them have no such property -- reading
   `fact.status` in the component would not compile. Widening to HeroFact makes
   the optional field optional at the point it is read. */
export const heroFacts: readonly HeroFact[] = [
  { key: "Extension", value: "CoffeeCat", status: true },
  { key: "Service", value: "CrèmeAI" },
  { key: "Based in", value: "New York" },
];

/* The heading was "Kyrstin Kauchak." -- redundant now that the name is the h1,
   so her own line takes the slot.

   The cats are here as biography and as the source of the site's artwork. That
   is deliberately not the same as the story-world branding that was cut: a fact
   about the person, not an IP to build a media property on. */
export const about = {
  heading: "The short version.",
  body: [
    "Four years building distributed data systems: Spark ETL, APIs, and observability.",
    "Now: agentic systems and small tools you can inspect.",
    "Two cats. Every illustration here starts there.",
    "Glam & Grind: make it good, then make it work.",
  ],
} as const;

/* Hardcoded in WorkAct.tsx until now, same drift as the hero fact row. */
export const work = {
  heading: "One more thing.",
} as const;

export const background = [
  {
    role: "Data Engineering",
    team: "High-traffic adtech platform",
    period: "2022 — Present",
    context: "Distributed systems",
    body: "Distributed Spark ETL pipelines and performant APIs serving high-traffic adtech workloads. Cloud-native AWS services, microservice architecture, observability instrumentation, and test-driven delivery across infrastructure and application layers.",
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
   has to open on that claim -- it read `Java, Scala` first, which is a different
   engineer than the one the hero describes. Nothing added: the ordering is the
   only honest lever here, since the skills themselves have not changed. */
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

export const markPanels = {
  extension: { id: "panel-extension", tone: "lilac", line: "It can't read your pages" },
  work: { id: "panel-work", tone: "orange", line: "Every project is an experiment" },
} as const satisfies Record<string, MarkPanel>;

export const runners = {
  landing: {
    id: "runner-landing",
    phrases: ["Glam", "Grind"],
    tone: "forest",
  },
  agency: {
    id: "runner-agency",
    phrases: ["More capable", "Not more occupied"],
    tone: "orange",
  },
  /* Two single words, alternating: GLAM GRIND GLAM GRIND. The philosophy as a
     property of the page rather than as a paragraph arguing for it -- same
     principle as the required `tests` field on every project.

     The id stays `runner-hours` even though the phrases no longer refer to
     hours. It is not user-visible, and the content invariants test asserts that
     section ids are unique, not that they are descriptive.

     The displaced "Pipelines by day / Tools at night" moved into about.body,
     where a fact about her schedule belongs. */
  about: {
    id: "runner-hours",
    phrases: ["Glam", "Grind"],
    tone: "lilac",
  },
} as const satisfies Record<string, Runner>;

export const homeSections = [
  { kind: "hero", id: "top" },
  {
    kind: "act",
    act: "flagship",
    id: featuredProject.homeAnchorId,
    navLabel: "Extension",
    number: "01",
    eyebrow: featuredProject.eyebrow,
    /* The hero owns the pink ground; the first project needs to cut to a new
       ground so the work begins as a distinct chapter instead of extending
       the masthead. */
    tone: "sage",
  },
  {
    kind: "act",
    act: "work",
    id: "cremeai",
    navLabel: "CrèmeAI",
    number: "02",
    eyebrow: "Serverless Discord bot",
    tone: "sage",
  },
] as const satisfies readonly HomeSection[];

export const homeNavSections = homeSections.flatMap((section) =>
  section.kind === "act" ? [{ id: section.id, label: section.navLabel }] : []
);

export const navSections = homeNavSections.map((section) => ({
  label: section.label,
  href: `${HOME_ROUTE}#${section.id}`,
  kind: "home-anchor",
})) satisfies RouteNavItem[];
