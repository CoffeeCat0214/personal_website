# Deployment

The project builds as a static Next.js export. For choosing and setting up a
host, see [hosting.md](./hosting.md) — this file is the contract the build
depends on.

## Environment

- `NEXT_PUBLIC_SITE_URL` controls `metadataBase`, canonical tags, the sitemap,
  robots.txt, JSON-LD and Open Graph absolute URLs. No trailing slash.
- Unset, `src/lib/site-url.ts` falls back to `https://kyrstinkauchak.com`, so a
  build that forgets the variable is still correct. Set it explicitly on preview
  environments so previews do not emit production canonicals.
- `site.lastUpdated` in `src/content/identity.ts` controls sitemap `lastModified`.
  Deliberately not build time: otherwise every rebuild claims every page changed.
- `projectRoutes` in `src/content/projects.ts` controls project sitemap entries.
- `trailingSlash: true` in `next.config.ts` makes subpages export as directory
  indexes, which is what a static host can resolve without rewrite rules.

## Host configuration

`public/_headers` is copied verbatim into `out/` and is read natively by
Cloudflare Pages and Netlify. It carries three things:

1. Security headers (CSP, HSTS, frame-ancestors, nosniff, referrer policy).
2. **`Content-Type: image/png` on `/opengraph-image`.** Next emits the generated
   share card with no file extension, so hosts serve it as
   `application/octet-stream` and every unfurler refuses to render it. Nothing in
   the build reports this — the card is silently blank.
3. Cache policy: hashed assets immutable, HTML revalidated.

On S3/CloudFront the file is inert; `deploy-to-s3.sh` applies the equivalent
content-type and cache settings during the sync.

## Commands

```bash
npm run verify     # lint + typecheck + unit tests + static-export assertions
npm run build      # writes out/
npm run serve      # serves out/ locally
npm run deploy:s3  # manual AWS path; see hosting.md
```

CI (`.github/workflows/ci.yml`) runs `verify` on every push and PR to `main`.

## Static export checks

`npm run test:e2e` builds and then asserts against the emitted HTML: the
homepage, project route directory indexes, metadata routes, anchors, the primary
art reference, and deterministic sitemap dates.
