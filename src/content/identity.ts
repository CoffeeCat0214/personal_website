import type { SiteIdentity } from "./types";

/* The masthead is a person, not a studio: CoffeeCat means the Chrome extension
   and nothing else, and survives as the GitHub handle, the cat mark and the
   favicon.

   `kind` is the eyebrow above the h1 and the second half of the page title, so
   it reads as a role rather than as a company descriptor.

   `tagline` does three jobs -- meta description, OG card body, and hero lead --
   and the binding constraint is ~160 characters, past which search results and
   link unfurls truncate it mid-sentence. It deliberately does not repeat the
   name: in all three placements the name already sits directly above it. */
export const site = {
  name: "Kyrstin Kauchak",
  kind: "Agentic systems engineer",
  location: "New York, NY",
  tagline:
    "Agentic systems engineer and systems builder in New York. Maker of CoffeeCat, a privacy-first focus timer.",
  email: "kauchakmk@gmail.com",
  github: "https://github.com/CoffeeCat0214",
  linkedin: "https://www.linkedin.com/in/kyrstin-mariko-kauchak/",
  lastUpdated: "2026-07-30",
} as const satisfies SiteIdentity;
