import type { Metadata } from "next";
import { HomePage } from "@/features/home/HomePage";
import { site } from "@/content";

/* The site itself, at /home/.

   It moved off "/" when the gate took that route. Worth being explicit that this
   is a real, directly-linkable page and not a fragment of the gate: it carries
   its own canonical, it is in the sitemap, and every nav anchor resolves against
   it. Someone who is sent /home/#work should land on the work act having never
   seen the gate, and that has to keep working. */
export const metadata: Metadata = {
  title: `${site.name} — ${site.kind}`,
  description: site.tagline,
  alternates: {
    canonical: "/home/",
  },
};

export default function Home() {
  return <HomePage />;
}
