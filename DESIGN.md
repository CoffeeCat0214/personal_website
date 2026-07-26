---
name: Kyrstin Kauchak — Portfolio
description: A five-ground colour-block portfolio set in acts, where one cat mark is restated across every ground.
colors:
  forest: "#1e2b16"
  sage: "#b8eb96"
  sage-panel: "#c9f0ad"
  pink: "#f4c2da"
  pink-panel: "#f9d9e8"
  lilac: "#9a95dd"
  lilac-panel: "#b0abe6"
  ginger: "#e8734a"
  ginger-panel: "#ed8a68"
  forest-panel: "#2b3d20"
  ink-2-on-sage: "#374a2a"
  ink-3-on-sage: "#4f683f"
  ink-2-on-pink: "#3a3f2f"
  ink-3-on-pink: "#5e5851"
  ink-2-on-forest: "#95bf79"
  ink-3-on-forest: "#76985f"
  rule: "rgba(30, 43, 22, 0.18)"
  rule-strong: "rgba(30, 43, 22, 0.32)"
  demo-top: "#35241d"
  demo-bot: "#1a120e"
typography:
  display:
    fontFamily: "Fraunces, Iowan Old Style, Georgia, serif"
    fontSize: "min(calc(var(--u) * 13), 19vw)"
    fontWeight: 600
    lineHeight: 0.92
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Fraunces, Iowan Old Style, Georgia, serif"
    fontSize: "clamp(2.125rem, 4.4vw, 3.5rem)"
    fontWeight: 600
    lineHeight: 1.04
    letterSpacing: "-0.014em"
  statement:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "clamp(1.5rem, 2.4vw, 2rem)"
    fontWeight: 400
    lineHeight: 1.25
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Fraunces, Iowan Old Style, Georgia, serif"
    fontSize: "1.3125rem"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "-0.008em"
  lead:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 400
    lineHeight: 1.5
  body:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
  small:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Geist Mono, ui-monospace, SFMono-Regular, Menlo, monospace"
    fontSize: "0.6875rem"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "0.12em"
  display-mono:
    fontFamily: "Geist Mono, ui-monospace, SFMono-Regular, Menlo, monospace"
    fontSize: "max(3rem, min(25vw, 50dvh, 22rem))"
    fontWeight: 500
    lineHeight: 0.92
    letterSpacing: "-0.045em"
rounded:
  structure: "0"
  code: "4px"
  focus: "2px"
  screen-panel: "18px"
  pill: "999px"
spacing:
  s1: "4px"
  s2: "8px"
  s3: "12px"
  s4: "16px"
  s5: "20px"
  s6: "24px"
  s7: "32px"
  s8: "48px"
  s9: "64px"
  s10: "96px"
  u: "clamp(4px, 0.72vw, 11px)"
components:
  button-primary:
    backgroundColor: "{colors.forest}"
    textColor: "{colors.sage}"
    rounded: "{rounded.pill}"
    padding: "0 24px"
    height: "46px"
    typography: "{typography.small}"
  button-primary-hover:
    backgroundColor: "#16200f"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.forest}"
    rounded: "{rounded.pill}"
    padding: "0 24px"
    height: "46px"
    typography: "{typography.small}"
  arrow-link:
    textColor: "{colors.forest}"
    rounded: "0"
    padding: "0 0 2px"
    height: "44px"
    typography: "{typography.small}"
  act-label:
    textColor: "{colors.ink-3-on-sage}"
    typography: "{typography.label}"
  index-row:
    backgroundColor: "transparent"
    textColor: "{colors.forest}"
    rounded: "0"
    padding: "24px 0"
    typography: "{typography.title}"
  nav-bar:
    backgroundColor: "{colors.sage}"
    textColor: "{colors.forest}"
    rounded: "0"
    height: "60px"
    typography: "{typography.small}"
  nav-toggle:
    backgroundColor: "transparent"
    textColor: "{colors.forest}"
    rounded: "{rounded.pill}"
    padding: "0 12px"
    height: "44px"
    typography: "{typography.label}"
---

# Design System: Kyrstin Kauchak — Portfolio

## Overview

**Creative North Star: "The Silkscreened Playbill"**

The page is printed, not assembled. Every section is a numbered act that owns a full-bleed ground of flat spot-colour ink, and the reader moves through the page the way they move through a programme: sage, then a poster interlude, then pink, then the dark act. There is no card grid, no elevation, no chrome sitting on a neutral canvas — the colour *is* the structure, and the boundary between two acts is the cut between two inks.

The system's discipline is subtractive. Nothing is enclosed: no box-shadows anywhere, no borders drawn around content, no container with a background that differs from its act. Grouping is done by alignment, hairline rules and whitespace only. A section stops being a section because the ink changes, not because a line was drawn under it. Where the previous system used a border-top to divide a single paper colour, the colour-block system deletes it — a hairline on top of a colour change is a second, weaker statement of the same thing and reads as a seam.

The voice is "Glam & Grind" and the type pairing carries it literally. Fraunces is the glam: high-contrast, editorial, unmistakably *set* rather than chosen, and used only at the display tier. Geist Mono is the grind: uppercase, wide-tracked, on act numerals and metadata labels. Inter does the reading and never pretends to be either. One ginger cat mark is restated at every scale across all five grounds — small on the sticky act rail, poster-size on the interlude panels — and it is a real cutout with transparency, so it sits directly on the ink with no plate behind it.

**Key Characteristics:**
- Five full-bleed grounds; the ink change is the section boundary.
- Zero shadows, zero enclosure — hairlines, alignment and whitespace group everything.
- Numbered acts with a sticky mono rail label beside a wide content column.
- Display serif for headings only; grotesque for reading; mono for labels.
- One cat mark restated at two scales across every ground.
- Structure is square (0 radius); only controls are pills and only screens are soft.

## Colors

Five saturated grounds and one universal ink, drawn from a silkscreen palette where every member is a flat spot colour rather than a tint of a neutral.

### Primary
- **Forest Ink** (`#1e2b16`): The universal ink and the only dark ground. Every heading, every control fill on a light act, and every focus ring is this colour. It is the single value that unifies five grounds — it clears AA on all of them, which is why no other ink exists.
- **Chartreuse Sage** (`#b8eb96`): The workhorse ground for the experiments and most acts. `:root` carries it so an element outside any act is never unstyled. Also the ink on the forest act, where the ramp runs the other way (10.88:1 both directions).

### Secondary
- **Powder Rose** (`#f4c2da`): The landing and contact ground. It carries forest at 9.61:1 and gives the cat artwork a warmer opening field.

### Tertiary
- **Periwinkle Lilac** (`#9a95dd`): A mark-panel ground only. Forest lands at 5.46:1 here — fine for display type, not enough headroom for a muted ink step.
- **Ginger** (`#e8734a`): The other mark-panel ground, and the one theme-constant accent outside the figures (the bot-bubble fill in the CoffeeCat figure). Chosen to stay in-family with the cat artwork and the coffee-mug sprites. Forest at 4.94:1.

### Neutral
- **Panel tints** (`#c9f0ad`, `#f9d9e8`, `#2b3d20`, `#b0abe6`, `#ed8a68`): One step off each ground, for the rare surface that must separate from its act without a border.
- **Ink 2** (per-ground, ~7.0:1): Body copy. The page's default text colour, never full ink.
- **Ink 3** (per-ground, ~4.55:1): Mono labels, act numerals, deemphasised nav links. Exists only on sage, pink and forest.
- **Rule** (`rgba(30, 43, 22, 0.18)`) and **Rule Strong** (`rgba(30, 43, 22, 0.32)`): Hairlines and control borders. The only drawn lines in the system.
- **Espresso** (`#35241d` → `#1a120e`): The figure interior — the ground inside project figures that depict a screen. Deliberately theme-constant and deliberately warm-brown: these represent something being *looked at*, not site chrome, so they do not adopt an act's ground, and the brown keeps the mug sprites and the ginger cat in their own shadow family.

### Named Rules

**The Mark-Panel Ceiling Rule.** Lilac and ginger never carry body copy. Their best available ink is 5.46:1 and 4.94:1, so a genuinely muted third step would land under 4.5. On those two grounds `--ink-2` and `--ink-3` collapse into `--ink` rather than faking a ramp there is no headroom for, and the panels carry nothing but the mark and one display-size line. The contrast limit is a layout rule, not a compromise.

**The Invert, Don't Accent Rule.** There is no separate accent hue, because none exists: nothing in the palette clears 4.5:1 on more than one ground (ginger on sage is 2.20:1). Controls invert their act instead — fill = `--ink`, label = `--paper` — which inherits the body-text ratio on every ground for free. `--accent-hover` always moves *away* from the label, so it deepens on the light grounds and lightens on forest.

**The Re-Declared Focus Rule.** `--focus` is declared on every `.tone-*` class, not only on `:root`. A custom property is substituted where it is *declared*, so `--focus: var(--ink)` sitting only in `:root` resolves against root's ink once and inherits that fixed colour everywhere — producing a forest ring on the forest ground at 1.0:1. Any new ground must re-declare `--focus` alongside `--ink`.

## Typography

**Display Font:** Fraunces SemiBold (with Iowan Old Style, Georgia fallback)
**Body Font:** Inter Variable, `opsz` 14–32 (with system-ui fallback)
**Label/Mono Font:** Geist Mono Variable (with ui-monospace, Menlo fallback)

**Character:** A high-contrast editorial serif set against a neutral workhorse grotesque and a wide-tracked mono. The serif is doing the voice, the grotesque is doing the reading, and the mono is doing the filing — three faces with three jobs and no overlap between them. Inter's optical-size axis is engaged (`font-optical-sizing: auto`), so the wordmark gets the Display drawing and body copy gets the Text drawing from one file.

### Hierarchy
- **Display** (Fraunces 600, `min(13u, 19vw)`, 0.92, −0.02em): The name in the hero and the single line on each mark panel. Nothing else. Line-height is loosened from the grotesque's 0.84 because a serif's descenders reach further — at 0.84 the *y* of "Kyrstin" landed in the *K* of "Kauchak".
- **Display Mono** (Geist Mono 500, `max(3rem, min(25vw, 50dvh, 22rem))`, 0.92, −0.045em): The gate's "TL;DR" and nowhere else on the site. The one place mono is set at display scale, because that string is terminal shorthand and a high-contrast serif would dress up the word that should arrive plain. Tracking runs sharply negative both to correct a monospaced face's natural airiness at 350px and to close the sidebearings around the semicolon, which otherwise reads as "TL ; DR". Sized against three axes so it cannot crowd the bands below it on a short window or run away on a 27" display.
- **Headline** (Fraunces 600, `clamp(2.125rem, 4.4vw, 3.5rem)`, 1.04, −0.014em, balanced): Act headings. Constrained to 52ch, which keeps a heading to roughly two lines — the point where a display line stops reading as a statement and starts reading as a paragraph.
- **Statement** (Inter 400, `clamp(1.5rem, 2.4vw, 2rem)`, 1.25, −0.02em): The hero positioning copy, at full `--ink`. The one step between the lead and a heading, and the one piece of copy on the page that is neither. Its ceiling stays under Headline's floor so it can never out-size a section heading. Max 45ch, no `text-wrap: balance` — balancing two stacked paragraphs optimises each in isolation and leaves the block ragged.
- **Title** (Fraunces 600, 1.3125rem, 1.25, −0.008em): Sub-headings and index-row terms.
- **Lead** (Inter 400, 1.25rem, 1.5): Act ledes. Max 42ch.
- **Body** (Inter 400, 1.0625rem, 1.6, `tabular-nums`): All reading copy, at `--ink-2`. Notes cap at 60ch.
- **Label** (Geist Mono 500, 0.6875rem, +0.12em, uppercase, `--ink-3`): Act numerals, eyebrows, fact keys, index metadata, the nav role and the mobile menu toggle.

### Named Rules

**The Display-Only Rule.** Fraunces sets h1, h2 and h3 — never body copy. Its thin strokes disappear at 17px, which is the failure mode of every site that sets a whole page in its display face. If Fraunces fails to load, the stack lands on Georgia rather than falling through to the sans, so the contrast the layout was set against survives.

**The One Mono Headline Rule.** The gate's "TL;DR" is the single sanctioned exception to the rule above, and it is an exception about meaning rather than taste: the string is a piece of terminal shorthand and the mono face is what says so. It is not a licence for a second one. Any other display-scale heading on this site is Fraunces, and the gate's own `<h1>` — the bracketed aside beneath it — stays in the serif precisely to keep the pairing legible as a pairing.

**The rem Floor Rule.** Only the display unit `--u` is viewport-driven; everything from the heading scale down is rem. Reference editorial sites set `html { font-size: ~0.694vw }` so the whole composition scales as one object — and thereby override the visitor's browser font-size preference (WCAG 1.4.4). This system keeps proportional scaling where it does the work (wordmark, numerals, band rhythm) and leaves anything a person actually reads in rem.

**The Two-Tracking Rule.** Display type gets tight negative tracking; small uppercase mono labels get wide positive tracking (+0.12em). There is no third tracking treatment. Note that display tracking here is *looser* than a grotesque would take — a serif's own serifs already close the gaps, and pulling in hard on top of them collides the terminals.

## Layout

One container rule governs every band: `.wrap` is `min(1120px, 100vw − 48px)`, tightening to a 24px inset below 900px. Sections themselves are full-width and paint their own ground, so a dark act bleeds edge to edge with no negative-margin trick — only `.wrap` constrains the measure.

The act is the page's structural unit: a `minmax(0, 200px)` rail beside a `minmax(0, 1fr)` content column with a 48px gutter, vertical padding of `11u`. The rail carries the cat mark, the act numeral and the eyebrow, and it is `position: sticky` at `nav-h + 32px` with `align-self: start` — a stretched grid item cannot stick. Mark panels use the same spine inverted: display line left, poster-scale mark right, at `12u` padding — taller than a band, shorter than a screen, so an interlude never becomes a scroll obstacle.

Spacing runs on a 4pt grid (`--s1` 4px through `--s10` 96px). The display unit `--u` is `clamp(4px, 0.72vw, 11px)` and drives only act padding and display type.

**Breakpoints:** 900px collapses the act grid to one column and runs the rail label horizontally above its content (sticky is dropped — it would park the label over the heading it introduces); the hero and mark panels reorder art-first. 640px swaps the desktop nav for a disclosure panel and drops leader rules from index rows. 400px makes hero buttons full-width and the fact list single-column.

**The Art-First Rule.** On the hero at ≤900px the cat leads, because it is the brand and it establishes the page before the copy has to. On mark panels the mark also leads, but for the opposite reason — there the mark is the content and the line is its caption.

## Elevation & Depth

**There are no shadows in this system.** Not one `box-shadow`, at any tier, in any state. Depth is not modelled; the page is flat printed ink. What would elsewhere be elevation is here either a ground change (an act on a different colour), a one-step panel tint, or nothing at all.

Hairlines are the only drawn separators: `--rule` at 18% ink for dividers, index rows and the nav underline, `--rule-strong` at 32% for control borders and inline-link underlines. On mark-panel grounds both step up (22% / 38%) to hold against the more saturated ink.

### Named Rules

**The No-Enclosure Rule.** No strokes and no box-shadows anywhere. Grouping comes from alignment, hairline rules and whitespace instead of from enclosure. Nothing gets a border drawn around it to say "these things belong together".

**The Colour Change Is the Boundary Rule.** Acts get no `border-top`. When every act paints its own full-bleed ground, the colour change *is* the boundary — a hairline over it restates the same thing more weakly and reads as a seam.

**The Hard Cut Rule.** Grounds cut, they never blend: sage fading into pink muds both. The sticky nav is the single exception, because it is chrome sitting *over* the cut rather than part of it — it transitions its background over 300ms so it doesn't read as a flash. It stays fully opaque; translucency and blur made adjacent tones bleed together.

## Shapes

Square by default. Radii are `0` for all structure — sections, panels, index rows, figures' outer edges, the nav. Three exceptions exist and each is justified by what it depicts rather than by taste:

- **Pill (999px)** on interactive controls only: `.btn`, `.btn.secondary`, the mobile nav toggle. A control is a physical affordance and reads as one.
- **Screen (18px)** reserved exclusively for panels that depict a screen, where the corner reads as a device bezel rather than as decoration.
- **Code (4px)** and **focus ring (2px)**, both incidental.

The recurring silhouette is the portrait cutout: the cat mark is a real alpha-transparent PNG/WebP (22% of the source is alpha 0) with no frame, no radius and no ground of its own, sitting directly on the act's ink at `aspect-ratio: 890 / 1142`.

**The Zero-By-Default Rule.** A new surface gets radius `0` unless it is a control (pill) or it is depicting a screen (18px). There is no middle radius in this system, and adding one would introduce a fourth form language.

## Components

### Buttons
- **Shape:** Full pill (999px), 46px minimum height, 24px horizontal padding, 1px transparent border so the secondary variant swaps in place with no reflow.
- **Primary:** Inverts its act — fill `--accent` (= `--ink`), label `--on-accent` (= `--paper`). Inter 500 at 0.9375rem, −0.005em.
- **Hover:** `--accent-hover` only, always moving away from the label (deepens on light grounds, lightens on forest). 300ms on the shared easing. No lift, no shadow, no scale.
- **Secondary:** Transparent ground, `--rule-strong` hairline border, `--ink` label. Hover fills with 5% ink and hardens the border to full `--ink` — a hairline and a colour shift, not a raised slab.
- **Scope:** These rules are scoped to `.btn`. Styling the bare `a` element would turn every link on the page into a 46px filled button.

### Arrow Links
- **Style:** Inline-flex with an 8px gap, 44px min-height for touch, `--ink` label, a 1px `--rule-strong` bottom border with 2px of standoff. The workhorse link form outside prose.
- **Hover:** Label and border both shift to `--accent-text`, and the arrow glyph translates `2px, −2px` — the one directional motion in the component set.
- **Note:** The arrow glyphs (U+2190–2199) are included in the Inter subset deliberately. Google's stock `latin` subset drops U+2192 and U+2197, which fails silently — the arrows just render in the fallback at a different weight.

### Index List
- **Style:** A leader-rule index — a price-list / table-of-contents form, not a stack of cards. Two columns (term / period) baseline-aligned, 24px block padding, hairline `--rule` on every row top plus the last row's bottom.
- **Term:** Title-tier at 500 weight, followed by a flex-filled 1px leader rule rendered as `::after` *inside* the `<dt>` — a `<dl>` row admits only `dt`/`dd`, so a decorative span between them would be invalid markup.
- **Metadata:** Mono label tier at `--ink-3`, `white-space: nowrap`.
- **Mobile (≤640px):** Collapses to one column and drops the leader — with one column it has nothing to lead to.

### Navigation
- **Style:** Sticky, `z-index: 20`, 60px tall, opaque `--paper` ground with a `--rule` bottom hairline. Colours resolve entirely through `--paper` / `--ink`, which is why mirroring the current act's tone class onto `<html>` re-skins the bar by inheritance with no rules of its own.
- **Links:** 0.9375rem at `--ink-3`, hovering to `--ink`. The current section gets `--ink` plus a 1px underline at 0.35em offset.
- **Mark:** Name at `--ink`, role beside it in the mono label tier at `--ink-3`. The role is hidden below 640px, where it would push the bar to two crowded lines — it repeats in the hero immediately below.
- **Mobile:** A pill disclosure toggle with a two-bar glyph that rotates into an X. The toggle is rendered always and hidden by CSS only below its breakpoint — rendering it and hiding it with `display: none` at desktop would leave it in the tab order as a trap invisible to sighted mouse users.

### Act
- The signature component. A numbered act: sticky mono rail (mark + numeral + eyebrow) on the left, heading / lede / body on the right, on its own full-bleed ground with no top border. Head constrained to 52ch, lede to 42ch, body gap 48px.

### Mark Panel
- The interlude. One display-size line (max 12ch, −0.045em, line-height 0.96) left, poster-scale cat mark (`min(260px, 24vw)`) right, on lilac or ginger. The only place outside the hero that uses the display tier, which is what makes a panel read as a cover rather than a section. Line-height stays at 0.96 rather than 0.86 because GSAP masks each split line with `overflow: hidden` and the tighter value clipped descenders.

### Figures
- Project figures depicting screens: espresso interior (`--demo-top` → `--demo-bot`), 18px radius, theme-constant across every act. They carry the coffee-mug pixel sprites, and the warm brown keeps that art in its own shadow family.

## Do's and Don'ts

### Do:
- **Do** put a new section on a ground by applying one `.tone-*` class. A component that reads `--ink` / `--paper` / `--rule` is correct on all five grounds with no variant — that is the only reason a five-ground page doesn't need five sets of component styles.
- **Do** re-declare `--focus: var(--ink)` on any new ground class, on the same element that declares `--ink`.
- **Do** invert the act for any control fill (`--ink` fill, `--paper` label) rather than reaching for a colour.
- **Do** keep display type on `--u` and everything readable on rem.
- **Do** group with alignment, hairlines and whitespace.
- **Do** state measured contrast ratios in a comment when adding a colour. Every ratio in `tokens.css` is measured, not assumed, and that convention is what keeps the palette from drifting a step below AA silently.
- **Do** apply reveal hidden-states at runtime, never as a static CSS rule — `[data-reveal] { opacity: 0 }` in the stylesheet hands anyone without JS a blank page, and under static export that is a real risk rather than a hypothetical.

### Don't:
- **Don't** add a `box-shadow`. Not for hover, not for cards, not for the nav. The system has none and depth is not part of its vocabulary.
- **Don't** draw a border around content to group it, or add a `border-top` to an act.
- **Don't** put body copy, small labels or anything below display size on lilac or ginger.
- **Don't** introduce a new accent hue. No colour in this palette clears 4.5:1 on more than one ground, so an accent that works everywhere does not exist here.
- **Don't** set body copy in Fraunces, or use it below the h3 tier.
- **Don't** introduce a radius between 0 and the pill. There is no medium radius, and adding one creates a fourth form language.
- **Don't** blend or cross-fade between two grounds; they cut. Only the nav transitions, because it sits over the cut rather than in it.
- **Don't** give the cat mark a frame, plate, radius or background. It is a cutout and sits directly on the ink.
- **Don't** push the figure interiors cooler without looking at the mug sprites and the ginger cat against them.
