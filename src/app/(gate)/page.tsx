import type { Metadata } from "next";
import { Gate } from "@/features/home/Gate";
import { site, tldr } from "@/content";

/* The entry gate, and the whole of "/".

   It is in a route group rather than sharing the site layout because the group
   is what lets this route opt out of the nav and the footer entirely. Hiding
   them with CSS would have left both in the DOM: a navigation landmark and a
   colophon that a screen reader still announces on a screen whose entire premise
   is that there is one thing on it.

   Its own metadata, because this page and /home/ are now different documents
   with different jobs. The description is the TL;DR's own opening line -- what
   a search result for her name should actually say -- rather than the site-wide
   tagline the layout would otherwise inherit down. */
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
