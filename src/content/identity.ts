import type { SiteIdentity } from "./types";

export const site = {
  name: "CoffeeCat",
  kind: "Humane software studio",
  founder: "Kyrstin Kauchak",
  location: "New York, NY",
  tagline:
    "Software that gives people more agency over how they think, learn and build. By Kyrstin Kauchak in New York.",
  email: "kauchakmk@gmail.com",
  github: "https://github.com/CoffeeCat0214",
  linkedin: "https://www.linkedin.com/in/kyrstin-mariko-kauchak/",
  lastUpdated: "2026-07-26",
} as const satisfies SiteIdentity;
