/* The canonical origin, in one place.

   Metadata is the one part of the site that cannot use relative URLs. An OG
   card unfurled by Slack, iMessage or X is being fetched by a machine with no
   knowledge of where the link came from, so `/opengraph-image.png` resolves
   against nothing and the card renders blank. Same for canonical tags, the
   sitemap and JSON-LD.

   Read from the environment because the deployed origin is a deploy-time fact,
   and no domain is registered yet. The fallback was https://cremeandmisu.com,
   which is now both the wrong studio and a dead domain -- it would unfurl as a
   broken card rather than an obvious placeholder.

   So the fallback is the origin that actually serves the site, from
   deploy-to-s3.sh. Set NEXT_PUBLIC_SITE_URL the day a domain lands. */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  "http://kyrstin-portfolio-website.s3-website-us-east-1.amazonaws.com";
