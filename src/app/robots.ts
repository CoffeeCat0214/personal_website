import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site-url";

/* See the note in sitemap.ts -- metadata routes must opt into static rendering
   under `output: 'export'`. */
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
