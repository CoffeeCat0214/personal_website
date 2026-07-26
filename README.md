# CoffeeCat Personal Website

Static Next.js portfolio for CoffeeCat, a one-person humane software studio by Kyrstin Kauchak.

## Commands

```bash
npm run dev
npm run lint
npm run typecheck
npm run test
npm run build
npm run test:e2e
```

`npm run build` writes the static export to `out/`. `npm run test:e2e` builds first, then checks the exported HTML and metadata routes.

## Structure

- `src/features/home` owns the one-page composition and section-specific components.
- `src/features/motion` owns browser-only setup/teardown adapters for tone tracking, reveal animation, smooth scroll, marquees, and split text.
- `src/components/ui` contains reusable markup primitives.
- `src/components/brand` contains CoffeeCat brand marks and project figures.
- `src/components/site` contains site shell components such as nav and footer.
- `src/content` contains typed site identity, project data, and homepage composition.

## Deployment

The app uses `output: "export"` and is safe to host from S3, GitHub Pages, CloudFront, or any static host. Set `NEXT_PUBLIC_SITE_URL` at build time once a canonical domain exists.

See `docs/architecture.md`, `docs/design-system.md`, and `docs/deployment.md` for the repo contracts that matter when changing structure, visuals, or hosting.
