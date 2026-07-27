# Current UI audit — Editorial Cutealism pass

## What is already working

- The app is a static-export Next.js 15 site with CSS Modules, typed content modules, self-hosted fonts, and progressive enhancement for motion.
- The gate at `/` and the first home section at `/home/#top` have a deliberate, recognizable visual world. They are explicitly protected from this pass.
- The existing post-hero system already has useful interaction primitives: a local FocusTimer, a clickable SystemPulse request path, scroll-aware navigation, and reduced-motion handling.
- The original cat artwork, project figures, and CoffeeCat sprites are authored assets. No additional mascot universe is needed.

## Current friction

- The home route stopped rendering after the two project acts even though typed About and Contact content and components already exist. The page therefore lacks a clear biography and contact finish.
- Project evidence is technically sound but visually quiet: 1px rules, small mono metadata, and thinly outlined figures make the work feel flatter than the research direction calls for.
- The normal reading tier is technically above the minimum but visually undersized beside the oversized hero and moving bands. Labels at roughly 11px are especially easy to lose on saturated grounds.
- Most post-hero grouping comes from hairlines alone. There is little physical feedback when a visitor presses a control or moves through a project proof surface.
- Existing interactive demos work, but their controls inherit a polite editorial treatment instead of exposing their state as a tactile instrument.

## Direction mapped to the repository

The research recommendation is applied as a 70/20/10 balance:

- **70% editorial:** keep the existing fonts, full-bleed color acts, restrained copy, and evidence-first order.
- **20% neobrutalist:** use 3px ink outlines, flat offset shadows, squared control states, and stronger spacing around post-hero content.
- **10% cat mischief:** keep the authored cat stamps, project figure details, and small directional marks concentrated at act boundaries.

The implementation avoids changing the gate or hero, avoids gradients and blur, keeps all interactions keyboard reachable, and preserves reduced-motion fallbacks.

## Files in scope

- `src/content/home.ts`, `src/features/home/HomePage.tsx`: restore the existing About and Contact acts and derive their nav links from the same source of truth.
- `src/features/home/HomePage.module.css`: scope the visual upgrade to the post-hero wrapper so the protected hero stays unchanged.
- `src/components/ui/Act.module.css`, `src/components/ui/IndexList.module.css`: increase readable type and establish the shared act/nameplate language.
- `src/features/home/Flagship.module.css`, `Work.module.css`, `About.module.css`, `Contact.module.css`: give each section a distinct composition and stronger evidence hierarchy.
- `src/features/home/FocusTimer.module.css`, `SystemPulse.module.css`, `src/components/brand/figures/Figure.module.css`: make existing interactions and proof surfaces feel tactile.

## Acceptance criteria

- The gate and the home hero render unchanged in structure and styling.
- Post-hero body copy is at least 1rem, readable on its ground, and labels are no smaller than 0.75rem where the visitor needs to scan them.
- Extension, CrèmeAI, About, and Contact are all reachable from navigation and in a continuous page flow.
- Interactive controls show clear hover, pressed/selected, keyboard-focus, and reduced-motion behavior.
- Hard shadows use zero blur and move with the press state; no shadow is applied to the protected hero.
- Desktop and 390px mobile layouts contain no horizontal overflow or clipped required content.
- `npm run typecheck`, `npm run build`, and the static-export tests pass.
