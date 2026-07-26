import type { Metadata } from "next";
import "@/styles/tokens.css";
import "@/styles/base.css";
import { Nav } from "@/components/Nav";
import { SkipLink } from "@/components/SkipLink";
import { Reveal } from "@/components/Reveal";
import { Footer } from "@/components/Footer";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: `${site.name} — ${site.role}`,
  description: site.tagline,
  openGraph: {
    title: `${site.name} — ${site.role}`,
    description: site.tagline,
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
  },
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
      </head>
      <body>
        <SkipLink />
        <Nav />
        <main id="main">{children}</main>
        <Footer />
        <Reveal />
      </body>
    </html>
  );
}
