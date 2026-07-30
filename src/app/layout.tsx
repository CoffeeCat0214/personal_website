import type { Metadata } from "next";
import "@/styles/tokens.css";
import "@/styles/base.css";
/* Lenis needs `html, body { height: auto }` and a couple of overscroll rules to
   avoid fighting the browser's own scrolling. Imported from the package rather
   than copied so it cannot drift from the version actually installed. */
import "lenis/dist/lenis.css";
import { Reveal } from "@/features/motion/Reveal";
import { MotionProvider } from "@/features/motion/MotionProvider";
import { site } from "@/content";
import { SITE_URL } from "@/lib/site-url";

const title = `${site.name} — ${site.kind}`;

export const metadata: Metadata = {
  /* Without metadataBase, Next emits the OG image as a relative path and every
     unfurler -- Slack, iMessage, X, LinkedIn -- fails to resolve it and falls
     back to a bare link. opengraph-image.tsx is only worth having if this is
     set. */
  metadataBase: new URL(SITE_URL),
  title,
  description: site.tagline,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title,
    description: site.tagline,
    type: "website",
    siteName: site.name,
    url: "/",
  },
  /* summary_large_image, not summary. The card is 1200x630 and a `summary`
     declaration would have it cropped to a small square, throwing away the
     composition and most of the tagline. */
  twitter: {
    card: "summary_large_image",
    title,
    description: site.tagline,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

/* Person, not Organization: the masthead is a person, and structured data that
   disagrees with the page it describes is worse than none.

   `jobTitle` carries site.kind so the role a reader sees in the eyebrow is the
   same string a crawler reads. A SoftwareApplication entity for CoffeeCat would
   need its own node linked from here, not extra fields bolted onto this one. */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  url: SITE_URL,
  jobTitle: site.kind,
  description: site.tagline,
  email: site.email,
  address: {
    "@type": "PostalAddress",
    addressLocality: "New York",
    addressRegion: "NY",
  },
  sameAs: [site.github, site.linkedin],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Sans and display, not mono. Both paint above the fold on the gate --
            Fraunces sets the headline, Inter sets the three list items -- so a
            swap on either is visible on the one screen that has to land. */}
        <link
          rel="preload"
          href="/fonts/Fraunces-SemiBold.woff2"
          as="font"
          type="font/woff2"
          crossOrigin=""
        />
        <link
          rel="preload"
          href="/fonts/Inter-Variable.woff2"
          as="font"
          type="font/woff2"
          crossOrigin=""
        />
        {/* Not next/script: this is static data with no execution semantics, and
            a plain tag lands in the initial HTML where a crawler that does not
            run JS can still read it. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      {/* Nav, footer, skip link and <main> belong to (site)/layout.tsx so that
          "/" can be the gate and nothing else. What stays here is what is
          genuinely global: the document, the tokens and fonts above, and the
          motion layer -- which must mount on both routes, because the reveal
          system applies its hidden state at runtime and a route without it would
          strand every [data-reveal] element permanently invisible. */}
      <body>
        {children}
        <Reveal />
        <MotionProvider />
      </body>
    </html>
  );
}
