import type { FlagshipProject, Project } from "./types";

export const flagship = {
  id: "extension",
  number: "01",
  name: "CoffeeCat",
  eyebrow: "Chrome Extension · Shipped",
  title: "A focus timer with no network access.",
  positioning: "No backend. No analytics. No host permissions. Chrome enforces all three.",
  tests: "whether a tool can be genuinely useful with zero access to your data.",
  beats: [
    {
      label: "Timer",
      heading: "Sessions, stored locally.",
      body: "State lives in chrome.storage.sync and follows your Chrome profile. No account, no sync service, nothing to sign into.",
    },
    {
      label: "Permissions",
      heading: "The manifest is the privacy policy.",
      body: "The extension requests no host permissions, so Chrome will not grant it page content — even if the code asks. No backend to breach. No dependencies to audit.",
    },
    {
      label: "Craft",
      heading: "Artwork generated, not exported.",
      body: "A Python tool renders the sprites. A test fails if the popup and this site drift apart.",
    },
  ],
  tech: ["Manifest V3", "Vanilla JS", "chrome.storage.sync", "Service Worker", "Python tooling"],
  metrics: [
    { value: "0", label: "NETWORK CALLS" },
    { value: "0", label: "DEPENDENCIES" },
    { value: "0", label: "ACCOUNTS" },
  ],
  href: "https://github.com/CoffeeCat0214/CoffeeCat",
  figure: "coffeecat",
  tone: "pink",
} as const satisfies FlagshipProject;

export const tools = [
  {
    id: "codehusk",
    name: "CodeHuskAI",
    eyebrow: "AI Refactoring Agent",
    title: "Refactoring that goes through review.",
    subtitle:
      "An agent that reads a repository before it changes one. It maps structure, local conventions and likely breakage, then proposes patches and explains the tradeoff. The engineer decides.",
    tests: "whether an agent can propose a refactor an engineer actually trusts.",
    tech: ["Python", "Machine Learning", "NLP", "Git Integration", "CI/CD"],
    metrics: [
      { value: "AI", label: "ANALYSIS" },
      { value: "Git", label: "CONTEXT" },
      { value: "CI", label: "FEEDBACK" },
    ],
    href: "https://github.com/CoffeeCat0214/CodeHuskAI",
    figure: "diff",
  },
  {
    id: "cremeai",
    name: "CrèmeAI",
    eyebrow: "Serverless Discord Bot",
    title: "A chatbot built like a service.",
    subtitle:
      "A Discord assistant on Lambda. DynamoDB response caching, rate limiting, CloudWatch instrumentation. It degrades predictably when a dependency fails.",
    tests: "how far a small service can degrade before anyone using it notices.",
    tech: ["AWS Lambda", "DynamoDB", "OpenAI API", "Discord API", "CloudWatch"],
    metrics: [
      { value: "AWS", label: "RUNTIME" },
      { value: "LLM", label: "ENGINE" },
      { value: "Cache", label: "LATENCY" },
    ],
    href: "https://github.com/CoffeeCat0214/CremeAI",
    figure: "thread",
  },
] as const satisfies readonly Project[];
