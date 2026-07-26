import type { SiteIdentity } from "./types";

/* The masthead is a person, not a studio.

   It was "CoffeeCat -- Humane software studio", which forced the name CoffeeCat
   to mean two things at once: the org in the nav and footer, and the Chrome
   extension in act 01. Naming the person resolves that. CoffeeCat now means
   exactly one thing -- the extension -- and survives as the GitHub handle, the
   cat mark and the favicon, which is where it was doing real work anyway.

   `kind` is the eyebrow above the h1 and the second half of the page title, so
   it has to read as a role rather than as a company descriptor.

   `tagline` is doing three jobs: the hero lead, the meta description, and the
   body of the OG card. Under ~160 characters is the binding constraint -- past
   that, search results and link unfurls truncate it mid-sentence.

   It does not repeat the name. In all three placements the name is already
   directly above it -- the h1, the card wordmark, the search result title -- so
   signing the sentence just prints it twice in one glance. */
export const site = {
  name: "Kyrstin Kauchak",
  kind: "Agentic systems engineer",
  location: "New York, NY",
  tagline:
    "Agentic systems engineer in New York. Maker of CoffeeCat, a privacy-first focus timer.",
  email: "kauchakmk@gmail.com",
  github: "https://github.com/CoffeeCat0214",
  linkedin: "https://www.linkedin.com/in/kyrstin-mariko-kauchak/",
  lastUpdated: "2026-07-26",
} as const satisfies SiteIdentity;
