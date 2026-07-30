import { ImageResponse } from "next/og";
import { site } from "@/content";

/* The share card -- what a link to this site looks like at the moment somebody
   decides whether to click it. Without it, every link unfurls as a bare URL.

   Generated at build time: `output: 'export'` has no server to render it on
   request, so Next runs this during the build and writes a PNG into out/. The
   wordmark sits close to the 80px padding at 92px, so re-check the generated
   PNG if the name or the size changes.

   No custom font: Satori, the renderer behind ImageResponse, reads ttf/otf/woff
   and public/fonts ships woff2 only. The card leans on colour and composition
   instead of shipping a duplicate copy of the typeface for one asset.

   See sitemap.ts on why `dynamic` must be pinned. */
export const dynamic = "force-static";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${site.name} — ${site.tagline}`;

/* Copied from the .tone-forest block in tokens.css. Satori has no access to CSS
   custom properties, so this is the one place ground values are legitimately
   duplicated -- keep the two in sync by hand.

   Forest's ink is green, not off-white: the dark ground inverts to the sage ramp
   rather than to neutral, which is the most recognisable thing about the palette.

   Ratios against --paper, from the audit in tokens.css: ink 10.88:1, ink-2
   7.08:1. The tagline uses ink-2 rather than ink-3 (4.55:1) because a share card
   renders at thumbnail size in most feeds, where "large text" stops being true. */
const FOREST = "#1e2b16";
const INK = "#b8eb96";
const INK_2 = "#95bf79";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: FOREST,
          color: INK,
          padding: 80,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div
            style={{
              display: "flex",
              fontSize: 22,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: INK_2,
            }}
          >
            {site.kind}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 92,
              letterSpacing: -3,
              lineHeight: 1.05,
              fontWeight: 600,
            }}
          >
            {site.name}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
          <div style={{ display: "flex", width: 160, height: 6, background: INK }} />
          <div
            style={{
              display: "flex",
              fontSize: 34,
              lineHeight: 1.35,
              color: INK_2,
              maxWidth: 900,
            }}
          >
            {site.tagline}
          </div>
        </div>
      </div>
    ),
    size
  );
}
