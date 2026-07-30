import type { Metadata } from "next";
import { Gate } from "@/features/home/Gate";
import { site, tldr } from "@/content";

/* The entry gate, and the whole of "/". It sits in its own route group so it can
   opt out of the site chrome entirely; see (site)/layout.tsx.

   Its own description rather than the inherited site tagline: the TL;DR's
   opening line is what a search result for her name should actually say. */
export const metadata: Metadata = {
  title: `${site.name} — ${site.kind}`,
  description: tldr.items[0].map((run) => run.text).join(""),
  alternates: {
    canonical: "/",
  },
};

export default function GatePage() {
  return (
    /* The gate carries the page's <main> itself. The site layout owns one for
       every other route; this one is outside that layout and would otherwise
       have no main landmark at all. */
    <main id="main">
      <Gate />
    </main>
  );
}
