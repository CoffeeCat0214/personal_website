import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { SkipLink } from "@/components/ui/SkipLink";

/* Chrome for everything that is not the entry gate: /home/ and every project
   page.

   These three used to live in the root layout, which was correct while "/" was
   the site. Now "/" is the gate, and a root-level nav would put a four-link
   section menu and a colophon on the one screen whose whole design is that it
   holds a single idea. Moving them down one level is what makes the gate's
   emptiness structural rather than something CSS has to keep hiding.

   The root layout still owns <html>, <body> and the motion layer, so the gate
   keeps the design tokens, the fonts and prefers-reduced-motion handling without
   inheriting the furniture. */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SkipLink />
      <Nav />
      <main id="main">{children}</main>
      <Footer />
    </>
  );
}
