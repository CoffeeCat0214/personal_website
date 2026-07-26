import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export keeps every hosting option open (S3, GitHub Pages, Vercel,
  // CloudFront). Deliberately no basePath/assetPrefix: setting either before the
  // host is chosen is the classic way to ship a site where every asset 404s.
  output: "export",
  distDir: "out",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
