import { flagship } from "./projects";
import type { BackgroundEntry, HomeSection, MarkPanel, Runner } from "./types";

export const hero = {
  statement: [
    "I build small software that hands control back to the person using it.",
    "Everything here is an experiment. The ones that work become products.",
  ],
} as const;

export const about = {
  heading: "Kyrstin Kauchak.",
  body: [
    "Three years building distributed data systems on high-traffic production infrastructure: Spark ETL pipelines, APIs, and the observability to prove they work.",
    "CoffeeCat is the after-hours work. AI tools, scalable systems, character-led media. Smaller scope, stricter standard.",
    "The people I build for are usually early in something. Learning a subject, starting a project, working out how they think best.",
  ],
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

export const skills = [
  "Java",
  "Scala",
  "Python",
  "AWS",
  "Spark",
  "ETL",
  "LLM Systems",
  "Agents",
  "Microservices",
  "API Design",
  "Test-Driven Development",
  "Cloud-Native",
  "Data Systems",
  "Observability",
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
  agency: {
    id: "runner-agency",
    phrases: ["More capable", "Not more occupied"],
    tone: "orange",
  },
  about: {
    id: "runner-hours",
    phrases: ["Pipelines by day", "Tools at night"],
    tone: "lilac",
  },
} as const satisfies Record<string, Runner>;

export const homeSections = [
  { kind: "hero", id: "top" },
  { kind: "runner", runner: runners.agency },
  { kind: "panel", panel: markPanels.extension, precedes: flagship.id },
  {
    kind: "act",
    act: "flagship",
    id: flagship.id,
    navLabel: "Extension",
    number: flagship.number,
    eyebrow: flagship.eyebrow,
    tone: flagship.tone,
  },
  { kind: "panel", panel: markPanels.work, precedes: "work" },
  {
    kind: "act",
    act: "work",
    id: "work",
    navLabel: "Experiments",
    number: "02",
    eyebrow: "Experiments",
    tone: "sage",
  },
  { kind: "runner", runner: runners.about },
  {
    kind: "act",
    act: "about",
    id: "about",
    navLabel: "About",
    number: "03",
    eyebrow: "About",
    tone: "forest",
  },
  {
    kind: "act",
    act: "contact",
    id: "contact",
    navLabel: "Contact",
    number: "04",
    eyebrow: "Contact",
    tone: "pink",
  },
] as const satisfies readonly HomeSection[];

export const navSections = homeSections.flatMap((section) =>
  section.kind === "act" ? [{ id: section.id, label: section.navLabel }] : []
);
