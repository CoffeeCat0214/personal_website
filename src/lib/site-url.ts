/* The canonical origin, in one place.

   Metadata is the one part of the site that cannot use relative URLs. An OG
   card unfurled by Slack, iMessage or X is being fetched by a machine with no
   knowledge of where the link came from, so `/opengraph-image.png` resolves
   against nothing and the card renders blank. Same for canonical tags, the
   sitemap and JSON-LD.

   Read from the environment because the deployed origin is a deploy-time fact,
   not a source-code one -- and it is genuinely not settled yet: the bucket is
   still `kyrstin-portfolio-website` and the domain has not been registered. The
   fallback keeps builds working meanwhile and is wrong on purpose in a way that
   is obvious rather than subtle if it ever ships. */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://cremeandmisu.com";
