import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { SkipLink } from "@/components/ui/SkipLink";

/* Chrome for everything that is not the entry gate: /home/ and every project
   page.

   It lives here rather than in the root layout so the gate's emptiness is
   structural. Hiding the nav and footer with CSS would leave both in the DOM --
   a navigation landmark and a colophon a screen reader still announces on the
   one screen whose whole premise is that it holds a single idea. */
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
