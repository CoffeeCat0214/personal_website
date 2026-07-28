# Cutealism implementation plan — post-hero sections

## Chosen direction

Keep the homepage as an editorial document with a neobrutalist studio-board layer underneath the protected gate and hero. The act colors remain the primary section boundaries. Inside those acts, 3px ink frames and hard offset shadows create depth without turning the page into a grid of generic SaaS cards.

## Sequence

1. Hero (protected): unchanged.
2. Extension act: flagship proof first, with a stronger claim board, larger evidence, and an instrument-like FocusTimer.
3. CrèmeAI act: a project row with a tactile system figure and clickable request-path steps.
4. About act: existing biography, background index, and skills, now rendered as a readable editorial profile.
5. Contact act: existing contact channels, presented as a final dark-ink invitation with direct actions.
6. Footer: remains global chrome; it closes the document after Contact.

## Typography and color rules

- Keep Inter for reading, Fraunces for headings, and Geist Mono for metadata.
- Raise post-hero body copy to 1rem–1.2rem, supporting ledes to roughly 1.35rem, and act labels to at least 0.75rem.
- Keep the current per-ground ink tokens because their contrast has already been measured. Use full ink for key type and the measured secondary step only for supporting metadata.
- Keep the hero’s pink palette and layout untouched. The post-hero wrapper owns all new framing and elevation rules.

## Interaction rules

- FocusTimer: rectangular controls with a visible active state and a physical press offset.
- SystemPulse: selected request step remains exposed in both color and border treatment, with live detail text.
- Moving section markers expose a visible pause/resume control and disappear as controls under reduced motion.
- Links: external and internal links keep their semantic anchors, gain a clear bordered action treatment in post-hero acts, and remain keyboard accessible.
- Figures: use a zero-blur offset shadow as a physical screen bezel; do not add tilt or hover-only information.
- All nonessential motion remains suppressible by `prefers-reduced-motion`.

## Responsive contract

- At 900px, project proof stacks figure-first only where the existing composition already does so; reading copy stays first in About and Contact.
- At 640px, evidence boards become one column, contact rows stack, and controls wrap without shrinking below a comfortable touch target.
- At 390px, hard shadows are reduced slightly so they do not create accidental horizontal overflow, while the 3px border remains the visual anchor.

## Verification

- `npm run typecheck`
- `npm run build`
- `npm test`
- `node /Users/coffeecat0214/.agents/skills/impeccable/scripts/detect.mjs --json <changed targets>`
- Real-browser screenshots at 1440×1100 and 390×844, including the Extension, CrèmeAI, About, and Contact anchors.

### Agent handoff notes

- Treat a full-page mobile crop as a lead, not proof of overflow. For responsive sign-off, set an exact 390×844 browser viewport, wait for hydration and font/art loading, settle the anchor scroll, then inspect the captured viewport and `document.documentElement.scrollWidth` together.
- Never run `npm run build` or `npm run test:e2e` concurrently with a live dev-server screenshot session when both touch `out/`. The export can replace the development artifacts mid-request and create misleading 500s or missing-manifest errors.
- Repeated capability labels are navigational structure, so render them as real subheadings (`h4` in the About groups), not styled paragraphs. Keep the skills themselves single-sourced and use editorial groups only for presentation.
