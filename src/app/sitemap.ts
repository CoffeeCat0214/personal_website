import type { MetadataRoute } from "next";
import { HOME_ROUTE, projectRoutes, site } from "@/content";
import { SITE_URL } from "@/lib/site-url";

/* Required under `output: 'export'`. Next treats metadata routes as dynamic by
   default -- they are ordinary route handlers underneath -- and refuses to
   build one it cannot prove is static. There is no server to regenerate this
   against, so pinning it is both what the export needs and what is true. */
export const dynamic = "force-static";

/* "/" is the entry gate and /home/ is the site. Both are listed: they are
   genuinely different documents with different content, and omitting /home/
   would leave every act on the site reachable only by a crawler following the
   gate's single link. The gate keeps priority 1 as the entry point; /home/ sits
   just under it because it is where the substance actually is. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: site.lastUpdated,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: new URL(HOME_ROUTE, SITE_URL).toString(),
      lastModified: site.lastUpdated,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...projectRoutes.map((route) => ({
      url: new URL(route.href, SITE_URL).toString(),
      lastModified: route.lastUpdated,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
