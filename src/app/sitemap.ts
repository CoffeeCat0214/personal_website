import type { MetadataRoute } from "next";
import { site } from "@/content";
import { SITE_URL } from "@/lib/site-url";

/* Required under `output: 'export'`. Next treats metadata routes as dynamic by
   default -- they are ordinary route handlers underneath -- and refuses to
   build one it cannot prove is static. There is no server to regenerate this
   against, so pinning it is both what the export needs and what is true. */
export const dynamic = "force-static";

/* One route today. The sitemap exists anyway because it is the thing that stops
   being trivial the moment the first essay ships, and adding it now costs a
   file. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: site.lastUpdated,
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
