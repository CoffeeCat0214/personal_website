import { ImageResponse } from "next/og";
import { site } from "@/content";

/* The share card. Every link to this site currently unfurls as a bare URL,
   which matters more than usual here: the studio's stated growth mechanism is
   an audience, and the card is what a link looks like at the moment somebody
   decides whether to click it.

   Generated at build time. `output: 'export'` has no server to render this on
   request, so Next runs it during the build and writes a real PNG into out/.

   No custom font. Satori -- the renderer behind ImageResponse -- reads ttf, otf
   and woff, and public/fonts ships Geist as woff2 only. Rather than add a
   duplicate copy of the typeface purely for this file, the card leans on colour
   and composition, which is what carries the brand anyway: forest ground, the
   accent rule, the wordmark. */

/* See the note in sitemap.ts. Metadata routes are dynamic by default and must
   opt in before `output: 'export'` will build them; this one genuinely is
   static, since the card's content comes entirely from the content module. */
export const dynamic = "force-static";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${site.name} — ${site.tagline}`;

/* Copied from the .tone-forest block in tokens.css, values and all. Satori has
   no access to CSS custom properties, so this is the one place in the codebase
   where ground values are legitimately duplicated -- which is worth a comment
   on both sides if they ever change.

   Forest's ink is green, not off-white: the dark ground inverts to the sage
   ramp rather than to neutral, which is the single most recognisable thing
   about the palette. A card with white text on this background would be
   off-system in the one asset most people see before they see the site.

   Ratios against --paper are from the audit in tokens.css: ink 10.88:1,
   ink-2 7.08:1. The tagline uses ink-2 rather than ink-3 (4.55:1) -- large
   text would pass at that ratio, but a share card gets rendered at thumbnail
   size in most feeds, where "large text" stops being true. */
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
