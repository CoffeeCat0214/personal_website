# Kyrstin Kauchak — Personal Website

Static Next.js portfolio for Kyrstin Kauchak, an agentic systems engineer in New York. CoffeeCat is the flagship project on it — a Chrome extension — not the name of the site's author.

## Commands

```bash
npm run dev
npm run verify   # lint + typecheck + test + test:e2e — run this before pushing
npm run build
npm run serve    # serves the built out/ locally
```

`npm run build` writes the static export to `out/`. `npm run test:e2e` builds first, then checks the exported HTML and metadata routes.

## Structure

- `src/features/home` owns the one-page composition and section-specific components.
- `src/features/projects` owns project evidence UI and `/work/[slug]/` pages.
- `src/features/motion` owns browser-only setup/teardown adapters for tone tracking, reveal animation, smooth scroll, and split text.
- `src/components/ui` contains reusable markup primitives.
- `src/components/brand` contains the cat mark and project figures.
- `src/components/site` contains site shell components such as nav and footer.
- `src/content` contains typed site identity, project data, and homepage composition.

## Deployment

The app uses `output: "export"` with trailing-slash routes, so subpages export as directory indexes for static hosts. `public/_headers` carries security headers, cache policy, and the `Content-Type` fix the generated Open Graph card needs.

**[docs/hosting.md](docs/hosting.md) is the runbook for getting this on the internet** — host comparison, the certificate constraint, and step-by-step setup.

See `docs/architecture.md`, `docs/design-system.md`, and `docs/deployment.md` for the repo contracts that matter when changing structure, visuals, or the build.
