/* All site copy, in one typed module.

   The previous site hardcoded content inside JSX, which is how it ended up with
   `link` fields defined on both projects and rendered on neither. Keeping copy
   in one place makes that class of drift visible: if a field exists here and no
   component reads it, that is a lint-visible unused property rather than a
   silent hole in the page.

   That rule is why the three tools below no longer carry `beats`. They used to
   have full Problem/Approach/Result narratives from when this was a portfolio
   and they were the point. They are supporting evidence now, so their acts are
   compact -- and rather than leave three unread fields behind, the strongest
   sentences were folded into the subtitles. The originals are in git at
   e669106 if any of them are wanted back. */

export type Beat = {
  label: string;
  heading: string;
  body: string;
};

export type Metric = {
  value: string;
  label: string;
};

/* Grounds that can carry body copy. sage, pink and forest all clear 7.0:1
   against their ink, which is what a three-step ink ramp needs. */
export type ContentTone = "sage" | "pink" | "forest";

/* Grounds that cannot. lilac and orange top out at 5.46:1 and 4.94:1 -- fine
   for display type, no headroom for a muted small-text step. Splitting the
   union is the guard: an act cannot be given one of these by accident, because
   Act only accepts a ContentTone. See tokens.css for the measurements. */
export type PanelTone = "lilac" | "orange";

/* There is deliberately no `Tone = ContentTone | PanelTone` union here. It
   existed and nothing ever consumed it, which is exactly the drift this file is
   meant to prevent -- and a combined alias would quietly hand back the ability
   to put body copy on a 4.94:1 ground, which is the one thing the split is for.
   Components take the narrower type they can actually render. */

/* A full-bleed colour panel carrying the mark and one display-size line, and
   nothing else. These are the page's rhythm: they break the run of dense acts
   the way the reference board breaks its grid. */
export type MarkPanel = {
  id: string;
  tone: PanelTone;
  /** Display-size. Deliberately the only text on the panel. */
  line: string;
};

/* A full-bleed marquee band: two phrases cycled with a `/` separator, scrolling
   at a rate tied to scroll velocity. Structural, not decorative -- they mark
   the seams between acts, which is the job the reference site gives them. */
export type Runner = {
  id: string;
  phrases: [string, string];
  /* PanelTone for the same reason MarkPanel is: a runner is display type and
     nothing else, so lilac and orange are legal here where they would not be in
     an act carrying body copy. */
  tone: PanelTone;
};

/* The flagship. Distinct from Tool because it is the only thing on the page
   that gets narrative depth: the tools show that the studio can build, the
   flagship has to show what the studio believes. */
export type Flagship = {
  id: string;
  number: string;
  name: string;
  eyebrow: string;
  title: string;
  /** The standing description of the story world. Used verbatim, everywhere. */
  positioning: string;
  beats: Beat[];
  tone: ContentTone;
};

/* Supporting work. No `beats` -- see the note at the top of this file. */
export type Tool = {
  id: string;
  name: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  tech: string[];
  metrics: Metric[];
  href: string;
  figure: "coffeecat" | "diff" | "thread";
};

export const site = {
  name: "Crème & Misu Lab",
  kind: "Independent studio",
  founder: "Kyrstin Kauchak",
  location: "New York, NY",
  /* The studio line, not the flagship line. It has to hold both halves of the
     work -- children's stories and small humane software -- without sounding
     like two companies sharing a landing page. */
  tagline:
    "An independent studio making story worlds for children, and quiet, humane software for everyone else.",
  email: "kauchakmk@gmail.com",
  github: "https://github.com/CoffeeCat0214",
  linkedin: "https://www.linkedin.com/in/kyrstin-mariko-kauchak/",
} as const;

/* The thesis act. This is the page's argument, and the first thing a partner or
   investor reads that is not a tagline. It runs on the dark ground so the
   inversion lands early, where a visitor who bounces has still seen it. */
export const thesis = {
  heading: "Children meet machines before they meet evidence.",
  body: [
    "A child born this year will ask a machine a question before they can read the answer. It will reply instantly, fluently, and with complete confidence — whether or not it is right. That is a new condition of childhood, and the stories for it have not been written yet.",
    "Curricula arrive late and adults arrive skeptical. Children arrive first, and they arrive without defences. What they need is not a media-literacy unit at age eleven. It is a set of instincts — ask what is true, ask how you know, notice when you are being told rather than shown — built early enough to feel like character rather than coursework.",
    "Stories install instincts. That is what they have always done. Crème & Misu Lab exists to find out which stories install this one.",
  ],
};

export const flagship: Flagship = {
  id: "flagship",
  number: "02",
  name: "Crème & Misu",
  eyebrow: "Flagship · In development",
  title: "Two cats, one question at a time.",
  /* Fixed wording. This sentence is the studio's standing description of the
     story world and should not be paraphrased per-surface -- it is what makes
     "experimental" a claim the rest of this act then has to earn. */
  positioning:
    "An experimental story world for exploring how children understand technology, emotion, cooperation, and evidence.",
  beats: [
    {
      label: "The Instrument",
      heading: "A story world, not a curriculum.",
      body: "Crème and Misu are cats who disagree. One trusts quickly, one checks first, and neither is written as the correct one. The disagreement is the mechanism: a child watching two characters they love reach different conclusions has to do the deciding themselves, which is the exact muscle this is trying to build. Cooperation and emotion are not the wrapper around the lesson — a child who cannot sit with frustration cannot stay curious long enough to check anything.",
    },
    {
      label: "The Method",
      heading: "Every episode starts from a question we cannot answer yet.",
      body: "Does a four-year-old distinguish “the machine said it” from “it is true”? At what age does “how do you know?” stop sounding rude and start sounding normal? What does a child do when two characters they trust disagree in front of them? Each episode is written toward one of these, not toward a moral, and then we watch what children actually do with it.",
    },
    {
      label: "The Output",
      heading: "The notes ship alongside the episodes.",
      body: "Every piece is published with the question behind it, what we observed, and what did not land. A studio that only publishes its successes is a studio nobody can learn anything from, and the failures are the more useful half of an experiment. The archive is as much the product as the story world is.",
    },
  ],
  tone: "pink",
};

/* Supporting work: three shipped things that establish the studio can build,
   compressed to one act so they cannot compete with the flagship for
   attention. Ordered by how well each one argues for the Lab. */
export const tools: Tool[] = [
  {
    id: "coffeecat",
    name: "CoffeeCat",
    eyebrow: "Chrome Extension · Shipped",
    title: "A focus timer that never phones home.",
    subtitle:
      "A Manifest V3 extension with no backend, no analytics, and no host permissions — so “it cannot read your pages” is enforced by the manifest rather than promised in a README. Its artwork is generated by a Python tool, and a test asserts the site and the popup cannot drift apart. The same discipline produced the design system this site runs on.",
    tech: ["Manifest V3", "Vanilla JS", "chrome.storage.sync", "Service Worker", "Python tooling"],
    metrics: [
      { value: "0", label: "NETWORK CALLS" },
      { value: "0", label: "DEPENDENCIES" },
      { value: "MV3", label: "SERVICE WORKER" },
    ],
    href: "https://github.com/CoffeeCat0214/CoffeeCat",
    figure: "coffeecat",
  },
  {
    id: "cremeai",
    name: "CrèmeAI",
    eyebrow: "Serverless Discord Bot",
    title: "A conversational bot with cloud-native bones.",
    subtitle:
      "A Discord assistant on AWS Lambda with DynamoDB response caching, rate limiting, and CloudWatch instrumentation. The surface is a chatbot named after a cat; underneath is a bounded, cached, observable service that degrades predictably when a dependency misbehaves. The Lab took half its name from here.",
    tech: ["AWS Lambda", "DynamoDB", "OpenAI API", "Discord API", "CloudWatch"],
    metrics: [
      { value: "AWS", label: "RUNTIME" },
      { value: "LLM", label: "ENGINE" },
      { value: "Cache", label: "LATENCY" },
    ],
    href: "https://github.com/CoffeeCat0214/CremeAI",
    figure: "thread",
  },
  {
    id: "codehusk",
    name: "CodeHuskAI",
    eyebrow: "AI Refactoring Agent",
    title: "Repositories, rewritten with guardrails.",
    subtitle:
      "An AI refactoring agent built around repository inspection rather than wholesale rewriting. It reads repository shape, local conventions and likely breakage first, then proposes changes that move through review instead of bypassing it — finding opportunities, explaining tradeoffs, and leaving the final decision with the engineer.",
    tech: ["Python", "Machine Learning", "NLP", "Git Integration", "CI/CD"],
    metrics: [
      { value: "AI", label: "ANALYSIS" },
      { value: "Git", label: "CONTEXT" },
      { value: "CI", label: "FEEDBACK" },
    ],
    href: "https://github.com/CoffeeCat0214/CodeHuskAI",
    figure: "diff",
  },
];

/* The founder act answers one question -- "why her?" -- and nothing else. The
   previous version of this content was a resume: a role title, a GPA, and a
   status line reading "Open to new roles". None of that argues for a studio,
   and the status line actively contradicted it. */
export const founder = {
  heading: "Why this studio, and why her.",
  body: [
    "Kyrstin Kauchak builds distributed data systems — Spark ETL pipelines, performant APIs, and the observability to know they work — on high-traffic production infrastructure. Three years on the machine side of the problem: what these systems actually do, how confidently they report it, and how routinely that confidence is misplaced.",
    "That is the unusual qualification for this work. Children's media is rarely made by people who have operated the systems the media is about. The Lab is what happens when someone who instruments production infrastructure for a living decides the more interesting problem is how a six-year-old learns to interrogate it.",
  ],
};

/* Employer intentionally unnamed. The previous site carried "improved system
   reliability by 40%", which was placeholder text inherited from a deleted
   AI-generated "Senior Software Engineer, TechCorp Inc." stub -- it described no
   real work. Unverifiable numbers are worse than no numbers, so scope is
   described qualitatively instead. */
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
];

export const skills = [
  "Java",
  "Scala",
  "Python",
  "AWS",
  "Spark",
  "ETL",
  "Microservices",
  "API Design",
  "Test-Driven Development",
  "Cloud-Native",
  "Data Systems",
  "Observability",
];

/* The conversion surface. Audience growth is the studio's stated goal, and for
   a children's media venture the subscriber count is also the traction number a
   partner underwrites -- so this is infrastructure, not a footer widget.

   No cadence promise. A newsletter that misses its own stated schedule is worse
   than one that never claimed one, and there is nothing to send yet. */
export const subscribe = {
  heading: "The Lab publishes as it goes.",
  body: "Notes on what we are testing, what children actually did with it, and what we got wrong. It arrives when there is something real to report, and not on a schedule.",
  cta: "Subscribe",
  placeholder: "you@example.com",
};

/* Keyed by the id of the section they precede, so page.tsx stays declarative
   and the panels cannot drift away from the acts they punctuate. */
export const markPanels: Record<string, MarkPanel> = {
  thesis: { id: "panel-question", tone: "lilac", line: "Children meet machines first" },
  work: { id: "panel-work", tone: "lilac", line: "Also from the Lab" },
};

/* Seam markers between acts. Two phrases each, cycled with a `/` -- the second
   phrase has to earn the first rather than restate it.

   Interleaved with the mark panels so no two adjacent bands share a ground: the
   full sequence down the page runs sage, lilac, forest, orange, pink, lilac,
   sage, orange, pink, forest. */
export const runners: Record<string, Runner> = {
  flagship: {
    id: "runner-evidence",
    phrases: ["Ask what is true", "Ask how you know"],
    tone: "orange",
  },
  founder: {
    id: "runner-craft",
    phrases: ["Built by someone", "who runs the machines"],
    tone: "orange",
  },
};

export const navSections = [
  { id: "thesis", label: "Thesis" },
  { id: "flagship", label: "Flagship" },
  { id: "work", label: "Work" },
  { id: "subscribe", label: "Subscribe" },
];
