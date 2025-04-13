import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  // The following line ensures assets work correctly with S3 hosting
  assetPrefix: '/',
  distDir: 'out',
  // Disable ESLint during build
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
