# Architecture

This repo is intentionally small, but it is organized by ownership rather than by file type.

## Boundaries

- `src/app` stays thin: metadata routes, layout, and route entrypoints only.
- `src/features/home` owns the page composition. `homeSections` in `src/content/home.ts` is the source of truth for section order and navigation.
- `src/features/motion` isolates imperative browser work behind setup functions that return cleanup callbacks. React components mount those adapters once.
- `src/components/ui` holds reusable, content-agnostic primitives.
- `src/components/brand` holds visual brand assets and project figure components.
- `src/components/site` holds shell components that know about site identity and navigation.

## Patterns

- Server components render static content wherever possible. Client components should be limited to browser effects and interactive controls.
- Data attributes bridge static markup to browser effects: `[data-tone]`, `[data-reveal]`, `[data-split]`, and `[data-runner]`.
- Content types encode design constraints. Body-copy sections use `ContentTone`; poster panels and runners use `PanelTone`.
- `homeSections` drives section order and `navSections` is derived from it, so anchors and nav cannot drift silently.

## Guardrails

Run these before deploying:

```bash
npm run lint
npm run typecheck
npm run test
npm run build
npm run test:e2e
```
