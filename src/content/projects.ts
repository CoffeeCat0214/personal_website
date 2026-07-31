import type { Project, ProjectRoute, ProjectSlug } from "./types";

export const projects = [
  {
    slug: "coffeecat",
    homeAnchorId: "extension",
    name: "CoffeeCat",
    eyebrow: "Chrome Extension · Shipped",
    title: "Focus without network access.",
    summary: "A privacy-first focus timer Chrome extension with no backend, no analytics, and no host permissions.",
    /* The display line in the flagship act, which is why it is three sentence
       fragments rather than a sentence: it is set as a split-line reveal and each
       fragment rises on its own. */
    positioning: "No backend. No analytics. No host permissions.",
    tests: "whether a tool can be genuinely useful with zero access to your data.",
    caseStudy: [
      {
        label: "Timer",
        heading: "Local sync over a backend.",
        body: [
          "I chose chrome.storage.sync over a backend because focus sessions should follow a Chrome profile without an account or a new data surface. The cost is quota and per-profile storage limits, but that is a better constraint than building a service just to store a timer.",
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
        label: "Surprise",
        heading: "The sync boundary is a real boundary.",
        body: [
          "The useful surprise was that a zero-backend product still has distributed-state behavior: profiles can be offline, delayed, or at quota. I kept the timer useful locally and made the sync layer additive instead of making a session depend on it.",
        ],
      },
      {
        label: "Next pass",
        heading: "Cut accounts before adding features.",
        body: [
          "Next time I would cut social or analytics features before widening the permission surface. The product is strongest when the manifest stays legible at a glance.",
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
    lastUpdated: "2026-07-30",
  },
  {
    slug: "adtech",
    name: "Adtech data platform",
    eyebrow: "Production systems · Anonymized",
    title: "Moving billions of events with predictable throughput.",
    summary:
      "Distributed Spark ETL and API systems for a high-traffic adtech platform. Scale figures are rounded for confidentiality.",
    tests: "whether a data platform can stay observable and useful as volume, identity, and delivery pressure compound.",
    caseStudy: [
      {
        label: "Scale",
        heading: "The hard problem lived in the tail.",
        body: [
          "At the order of billions of events per day, a small number of high-volume partitions could dominate a Spark stage and make an otherwise healthy batch unpredictable. The platform also had to keep downstream APIs useful while the data moved through the system.",
          "The figures here are deliberately order-of-magnitude: exact throughput and latency details are rounded for confidentiality.",
        ],
      },
      {
        label: "My part",
        heading: "I made the slow path legible.",
        body: [
          "I worked across the Spark ETL and API layers I owned, profiling stage behavior, shaping the data path around its busiest partitions, and adding observability so a slow tail became evidence an engineer could act on rather than a vague batch alarm.",
        ],
      },
      {
        label: "Decision",
        heading: "Batch the heavy work; keep APIs thin.",
        body: [
          "I kept the high-volume transformation in Spark instead of moving it into per-request API work. The rejected alternative would have made the batch simpler on paper, but it would have paid for the same computation repeatedly and pushed unpredictable work into the user-facing path.",
        ],
      },
      {
        label: "Surprise",
        heading: "A healthy average hid an unhealthy tail.",
        body: [
          "The aggregate pipeline looked fine until one skewed path stretched the batch. Stage-level instrumentation and tests around that path gave the team a way to see the outlier early and reason about it without guessing.",
        ],
      },
      {
        label: "Next pass",
        heading: "Standardize the contract sooner.",
        body: [
          "Next time I would cut bespoke telemetry at the service edges and establish one shared freshness and failure contract earlier. The platform had more surface area than every consumer needed; a smaller contract would have made the system easier to operate.",
        ],
      },
    ],
    tech: ["Apache Spark", "AWS", "Python", "Java", "Scala", "REST APIs", "Observability"],
    metrics: [
      { value: "10⁹+", label: "EVENTS / DAY" },
      { value: "HIGH", label: "THROUGHPUT" },
      { value: "BATCH", label: "FRESHNESS MODEL" },
    ],
    figure: "pipeline",
    tone: "sage",
    metadata: {
      title: "Adtech data platform — production case study",
      description:
        "An anonymized case study of Spark ETL, API, and observability work on a high-traffic adtech data platform.",
    },
    lastUpdated: "2026-07-30",
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
    lastUpdated: "2026-07-30",
  },
  {
    slug: "cremeai",
    name: "CrèmeAI",
    eyebrow: "Serverless Discord Bot",
    title: "A Discord bot built like a service.",
    summary:
      "A Discord assistant on Lambda with DynamoDB response caching, rate limiting, and CloudWatch instrumentation.",
    preview: {
      title: "Serverless Discord assistant.",
      summary: "Lambda, caching, and rate limits in one small service.",
    },
    tests: "how far a small service can degrade before anyone using it notices.",
    caseStudy: [
      {
        label: "Runtime",
        heading: "Lambda over a long-lived worker.",
        body: [
          "I chose Lambda with DynamoDB response caching over a long-lived worker because the bot's traffic is bursty and the service should pay for work when a command arrives. The cost is cold-start sensitivity and another boundary to observe.",
        ],
      },
      {
        label: "Controls",
        heading: "Rate limits are product behavior.",
        body: [
          "I treated rate limiting as part of the product boundary, not only infrastructure protection. It keeps a single busy channel from turning an assistant into an unreliable shared resource; the rejected alternative was to let the model absorb every request and discover the limit through failure.",
        ],
      },
      {
        label: "Failure",
        heading: "The cache miss was the real path.",
        body: [
          "A cache miss exposed more dependency behavior than the happy path did. CloudWatch instrumentation made the model and Discord boundaries observable enough to handle instead of guess at, and the service could fail in a known direction when a dependency was unavailable.",
        ],
      },
      {
        label: "Next pass",
        heading: "Cut surface area before adding features.",
        body: [
          "Next time I would cut secondary commands before adding another integration. The small-service shape is the feature: fewer paths make rate limits, cache behavior, and failure handling easier to explain and test.",
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
    lastUpdated: "2026-07-30",
  },
] as const satisfies readonly Project[];

export const featuredProject = projects[0];
/* Keep the homepage focused on the work that best represents the current
   engineering story. CodeHuskAI remains in the catalog so an old direct link
   and its case study do not disappear, but it is not part of the public index. */
export const supportingProjects = projects.filter((project) =>
  ["adtech", "cremeai"].includes(project.slug)
);
export const projectPreviews = [featuredProject, ...supportingProjects];

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
