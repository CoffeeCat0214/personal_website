/* The canonical origin, in one place.

   Metadata is the one part of the site that cannot use relative URLs. An OG card
   unfurled by Slack, iMessage or X is fetched by a machine with no knowledge of
   where the link came from, so `/opengraph-image` resolves against nothing and
   the card renders blank. Same for canonical tags, the sitemap and JSON-LD.

   Read from the environment because the origin is a deploy-time fact. The
   fallback is the production domain, so a build that forgets to set the variable
   still emits correct absolute URLs rather than pointing at localhost. */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://kyrstinkauchak.com";
