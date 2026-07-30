import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export: no server, no runtime. The site is served from a CDN, so
  // every route has to exist as a file at build time.
  output: "export",
  distDir: "out",
  // Subpages export as directory indexes (/home/index.html), which is what a
  // static host can resolve without rewrite rules.
  trailingSlash: true,
  // next/image's optimizer needs a server. Without this the build fails.
  images: {
    unoptimized: true,
  },
  // No basePath/assetPrefix: the site is served from the apex of its own domain.
  // Setting either would prefix every asset URL and 404 the whole site.
};

export default nextConfig;
