import type { Metadata } from "next";
import { HomePage } from "@/features/home/HomePage";
import { site } from "@/content";

/* The site itself, at /home/. A real, directly-linkable document rather than a
   fragment of the gate: it carries its own canonical, it is in the sitemap, and
   every nav anchor resolves against it. Someone sent /home/#cremeai must land on
   the CrèmeAI act having never seen the gate. */
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
