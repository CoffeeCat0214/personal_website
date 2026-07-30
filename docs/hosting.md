# Getting kyrstinkauchak.com online

The site is a **static export**: `npm run build` writes plain HTML, CSS, JS and
images into `out/`. There is no server, no runtime, no database. That makes this
a file-hosting problem, and it means every host below can serve it correctly —
the differences are in TLS, DNS, CI, and how much of it you have to operate.

---

## First: the certificate you bought

This is the decision that determines everything else, so it goes first.

**A Cloudflare certificate only works if Cloudflare terminates TLS.** Cloudflare
does not hand you the private key for a Universal or Advanced certificate, so it
cannot be installed anywhere else. Concretely:

| Host | Which certificate serves your visitors |
| --- | --- |
| Cloudflare Pages | **Yours, from Cloudflare.** |
| Any origin behind Cloudflare's proxy (orange cloud) | **Yours, from Cloudflare.** |
| GitHub Pages, DNS-only | GitHub's own Let's Encrypt cert, issued automatically. Yours is unused. |
| CloudFront, DNS-only | An **AWS Certificate Manager** cert in **us-east-1**. Free, but it must be an ACM cert — yours cannot be imported. Yours is unused. |

So the certificate is an argument for keeping Cloudflare in the request path.

**Worth checking before you renew.** Cloudflare's **Universal SSL is free** and
already covers `kyrstinkauchak.com` and `*.kyrstinkauchak.com`. The paid
**Advanced Certificate Manager** (~$10/mo) buys multi-level wildcards
(`a.b.kyrstinkauchak.com`), custom validity windows, and CA selection. A
portfolio on an apex plus `www` needs none of that. If ACM is what you bought,
look at cancelling it — Universal SSL will serve this site identically.

---

## Recommendation: Cloudflare Pages

Your domain is already at Cloudflare. Pages puts the build on the same edge that
already holds your DNS and your certificate, which removes the entire class of
problems where those three live in different places.

- Free tier: unlimited bandwidth, 500 builds/month.
- TLS provisioned and renewed automatically. Nothing to install.
- Git-connected: push to `main` → live in ~60s. Every PR gets a preview URL.
- Reads `public/_headers` natively, which is already committed — that is where
  the security headers and the Open Graph content-type fix live.
- Apex domains work directly (Cloudflare flattens the CNAME). No `www` redirect
  workarounds, no ALIAS-record hunting.

### Setup, once

1. **Push to GitHub.** Cloudflare Pages builds from a repo.

2. **Cloudflare dashboard → Workers & Pages → Create → Pages → Connect to Git.**
   Select the repository.

3. **Build settings:**

   | Field | Value |
   | --- | --- |
   | Framework preset | `Next.js (Static HTML Export)` |
   | Build command | `npm run build` |
   | Build output directory | `out` |
   | Node version | `20` (env var `NODE_VERSION=20`) |

4. **Environment variable:** `NEXT_PUBLIC_SITE_URL = https://kyrstinkauchak.com`
   Set it on the **Production** environment only. Leave it unset on Preview so
   preview builds fall back rather than emitting canonical tags and sitemap
   entries pointing at production — which is how preview URLs end up indexed.

5. **Custom domains → Set up a domain → `kyrstinkauchak.com`.** Add
   `www.kyrstinkauchak.com` too; Cloudflare will create the DNS records itself
   since it is already your nameserver.

6. **Redirect `www` → apex.** Rules → Redirect Rules → dynamic redirect,
   `www.kyrstinkauchak.com/*` → `https://kyrstinkauchak.com/${1}`, 301. Pick one
   canonical hostname and make the other a redirect; serving both splits your
   search ranking and makes the canonical tags disagree with the URL bar.

7. **SSL/TLS → Overview → Full (strict).** Not Flexible. Flexible terminates TLS
   at Cloudflare and then talks **plaintext HTTP** to the origin, which means the
   padlock is telling your visitors something untrue. Full (strict) is the only
   correct setting.

8. **SSL/TLS → Edge Certificates → Always Use HTTPS: on.**

### After it is live

- Verify the share card: paste the URL into
  [opengraph.xyz](https://www.opengraph.xyz/). If the image is blank, the
  `/opengraph-image` rule in `public/_headers` did not apply.
- Submit `https://kyrstinkauchak.com/sitemap.xml` in Google Search Console.
- Bump `site.lastUpdated` in `src/content/identity.ts` when content changes —
  it drives `lastmod` in the sitemap, deliberately rather than using build time,
  so a rebuild does not claim every page changed.

---

## Alternative A: GitHub Pages

Free, and reasonable if you would rather keep everything on GitHub.

The catch: GitHub Pages issues **its own** certificate, so the Cloudflare one
goes unused unless you proxy through Cloudflare — and proxying in front of
GitHub Pages is a known-awkward combination (GitHub's own cert provisioning
fails while the orange cloud is on, so you enable it in a specific order and it
breaks again on renewal). If you go this route, run Cloudflare **DNS-only** (grey
cloud) and let GitHub handle TLS.

Also note `public/_headers` does nothing here — GitHub Pages serves fixed
headers and no configuration. You lose the security headers and the Open Graph
content-type fix, which means **the share card will be broken**. That alone is
why this is the alternative and not the recommendation.

The old `deploy:gh-pages` npm script was removed: it ran `git init` inside `out/`
and force-pushed to an `origin` that the nested repo did not have, so it could
not have worked. Use `actions/deploy-pages` instead.

## Alternative B: S3 + CloudFront

The most moving parts, a few dollars a month, and no advantage for a static site
of this size — with one honest exception: you are an engineer who works in AWS,
and running your own origin, distribution and cache invalidation is a thing you
can point at. That is a real reason. It is just not a technical one.

If you do it, the parts people get wrong:

1. **Directory indexes.** `trailingSlash: true` means routes are `/home/`, and
   CloudFront with an **S3 REST origin** will not resolve that to
   `/home/index.html`. `DefaultRootObject` only fixes `/`. You need a
   **CloudFront Function** on viewer-request appending `index.html` to any URI
   ending in `/`. Skipping this gives you a working homepage and 403s on every
   subpage — which looks like a deploy problem and is not.

   The S3 *website* endpoint resolves indexes on its own, but it is HTTP-only
   and cannot be locked down with Origin Access Control, so the bucket has to be
   world-readable. Prefer REST origin + OAC + the function.

2. **The certificate must be in ACM, in `us-east-1`**, regardless of where the
   bucket is. CloudFront reads certificates from that region only.

3. **The Open Graph content-type**, same extensionless-file problem as above.
   `deploy-to-s3.sh` already handles it by re-putting that one object with
   `--content-type image/png`.

4. **Cache invalidation.** Set `DISTRIBUTION_ID` and `deploy-to-s3.sh` will
   invalidate on deploy. The script already splits cache headers: hashed assets
   immutable, everything else revalidated.

```bash
S3_BUCKET=kyrstin-portfolio-website DISTRIBUTION_ID=E123ABC ./deploy-to-s3.sh
```

---

## What ships

`npm run verify` runs lint, typecheck, unit tests and the static-export
assertions in one command — the same set CI runs. Run it before you push.

The export contains:

- `/` — the entry gate
- `/home/` — the site
- `/work/{coffeecat,codehusk,cremeai}/` — project case studies
- `/sitemap.xml`, `/robots.txt`, `/opengraph-image`, `/404.html`
- `_headers` — host configuration for Cloudflare Pages and Netlify

Total first-load JS is ~101 kB shared plus ~6 kB per route.
