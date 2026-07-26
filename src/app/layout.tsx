import type { Metadata } from "next";
import "@/styles/tokens.css";
import "@/styles/base.css";
/* Lenis needs `html, body { height: auto }` and a couple of overscroll rules to
   avoid fighting the browser's own scrolling. Imported from the package rather
   than copied so it cannot drift from the version actually installed. */
import "lenis/dist/lenis.css";
import { Nav } from "@/components/Nav";
import { SkipLink } from "@/components/SkipLink";
import { Reveal } from "@/components/Reveal";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { Footer } from "@/components/Footer";
import { site } from "@/content/site";
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

/* Organization rather than Person. The masthead is a studio now, and the
   structured data should agree with it -- a Person entity here would tell
   Google the opposite of what the page says.

   `founder` keeps the human attached to it, which is what stops an
   Organization with no named people reading as either much larger than it is,
   or as evasive. */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: SITE_URL,
  description: site.tagline,
  email: site.email,
  founder: {
    "@type": "Person",
    name: site.founder,
    sameAs: [site.github, site.linkedin],
  },
  sameAs: [site.github, site.linkedin],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Sans only. The wordmark paints first at display size, so it is worth
            the early fetch; the mono is label-sized and not render-blocking, and
            preloading both would have them compete for the same connection. */}
        <link
          rel="preload"
          href="/fonts/Geist-Variable.woff2"
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
      <body>
        <SkipLink />
        <Nav />
        <main id="main">{children}</main>
        <Footer />
        <Reveal />
        <MotionProvider />
      </body>
    </html>
  );
}
