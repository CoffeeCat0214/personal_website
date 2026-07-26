import type { Project, ProjectRoute, ProjectSlug } from "./types";

export const projects = [
  {
    slug: "coffeecat",
    homeAnchorId: "extension",
    name: "CoffeeCat",
    eyebrow: "Chrome Extension · Shipped",
    title: "A focus timer with no network access.",
    summary: "A privacy-first focus timer Chrome extension with no backend, no analytics, and no host permissions.",
    positioning: "No backend. No analytics. No host permissions. Chrome enforces all three.",
    tests: "whether a tool can be genuinely useful with zero access to your data.",
    caseStudy: [
      {
        label: "Timer",
        heading: "Sessions, stored locally.",
        body: [
          "State lives in chrome.storage.sync and follows your Chrome profile. No account, no sync service, nothing to sign into.",
        ],
      },
      {
        label: "Permissions",
        heading: "The manifest is the privacy policy.",
        body: [
          "The extension requests no host permissions, so Chrome will not grant it page content — even if the code asks.",
          "No backend to breach. No dependencies to audit.",
        ],
      },
      {
        label: "Craft",
        heading: "Artwork generated, not exported.",
        body: [
          "A Python tool renders the sprites. A test fails if the popup and this site drift apart.",
        ],
      },
    ],
    tech: ["Manifest V3", "Vanilla JS", "chrome.storage.sync", "Service Worker", "Python tooling"],
    metrics: [
      { value: "0", label: "NETWORK CALLS" },
      { value: "0", label: "DEPENDENCIES" },
      { value: "0", label: "ACCOUNTS" },
    ],
    repoHref: "https://github.com/CoffeeCat0214/CoffeeCat",
    figure: "coffeecat",
    tone: "pink",
    metadata: {
      title: "CoffeeCat focus timer",
      description:
        "CoffeeCat is a Chrome extension focus timer with no backend, no analytics, and no host permissions.",
    },
    lastUpdated: "2026-07-26",
  },
  {
    slug: "codehusk",
    name: "CodeHuskAI",
    eyebrow: "AI Refactoring Agent",
    title: "Refactoring that goes through review.",
    summary:
      "An agent that reads a repository before it changes one, then proposes patches with tradeoffs an engineer can review.",
    tests: "whether an agent can propose a refactor an engineer actually trusts.",
    caseStudy: [
      {
        label: "Context",
        heading: "Reads before it edits.",
        body: [
          "The agent maps repository structure, local conventions, and likely breakage before proposing a patch.",
        ],
      },
      {
        label: "Review",
        heading: "The engineer keeps control.",
        body: [
          "It explains the tradeoff behind a refactor instead of treating the patch as self-evident.",
        ],
      },
      {
        label: "Feedback",
        heading: "CI is part of the loop.",
        body: [
          "Git and CI context are part of the feedback surface, so review has concrete signals to inspect.",
        ],
      },
    ],
    tech: ["Python", "Machine Learning", "NLP", "Git Integration", "CI/CD"],
    metrics: [
      { value: "AI", label: "ANALYSIS" },
      { value: "Git", label: "CONTEXT" },
      { value: "CI", label: "FEEDBACK" },
    ],
    repoHref: "https://github.com/CoffeeCat0214/CodeHuskAI",
    figure: "diff",
    tone: "sage",
    metadata: {
      title: "CodeHuskAI refactoring agent",
      description:
        "CodeHuskAI is an AI refactoring agent that studies a repository before proposing reviewable changes.",
    },
    lastUpdated: "2026-07-26",
  },
  {
    slug: "cremeai",
    name: "CrèmeAI",
    eyebrow: "Serverless Discord Bot",
    title: "A chatbot built like a service.",
    summary:
      "A Discord assistant on Lambda with DynamoDB response caching, rate limiting, and CloudWatch instrumentation.",
    tests: "how far a small service can degrade before anyone using it notices.",
    caseStudy: [
      {
        label: "Runtime",
        heading: "Serverless by default.",
        body: [
          "The bot runs on Lambda, with DynamoDB response caching to keep the small-service shape predictable.",
        ],
      },
      {
        label: "Controls",
        heading: "Rate limits shape behavior.",
        body: [
          "Rate limiting is part of the product boundary, not only infrastructure protection.",
        ],
      },
      {
        label: "Failure",
        heading: "Degrades predictably.",
        body: [
          "CloudWatch instrumentation makes dependency failures observable enough to handle instead of guess at.",
        ],
      },
    ],
    tech: ["AWS Lambda", "DynamoDB", "OpenAI API", "Discord API", "CloudWatch"],
    metrics: [
      { value: "AWS", label: "RUNTIME" },
      { value: "LLM", label: "ENGINE" },
      { value: "Cache", label: "LATENCY" },
    ],
    repoHref: "https://github.com/CoffeeCat0214/CremeAI",
    figure: "thread",
    tone: "forest",
    metadata: {
      title: "CrèmeAI Discord bot",
      description:
        "CrèmeAI is a serverless Discord assistant built with Lambda, DynamoDB caching, and CloudWatch instrumentation.",
    },
    lastUpdated: "2026-07-26",
  },
] as const satisfies readonly Project[];

export const featuredProject = projects[0];
export const supportingProjects = projects.slice(1);
export const projectPreviews = projects;

export const projectRoutes = projects.map((project) => ({
  slug: project.slug,
  href: `/work/${project.slug}/`,
  lastUpdated: project.lastUpdated,
})) satisfies ProjectRoute[];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getProjectRoute(slug: ProjectSlug) {
  return `/work/${slug}/` as const;
}
