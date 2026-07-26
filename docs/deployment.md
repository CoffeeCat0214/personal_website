# Deployment

The project builds as a static Next.js export.

## Environment

- `NEXT_PUBLIC_SITE_URL` controls metadata, sitemap, robots, JSON-LD, and Open Graph absolute URLs.
- Until a canonical domain exists, `src/lib/site-url.ts` falls back to the current S3 website endpoint.
- `site.lastUpdated` in `src/content/identity.ts` controls sitemap `lastModified`; do not use build time for this value.

## S3

Use:

```bash
npm run deploy:s3
```

The deploy script builds, syncs `out/` to S3, and rewrites the extensionless generated Open Graph image object with `Content-Type: image/png`.

## Static Export Checks

Use:

```bash
npm run test:e2e
```

This builds the static export and verifies the exported homepage, metadata routes, anchors, primary art reference, and deterministic sitemap date.
