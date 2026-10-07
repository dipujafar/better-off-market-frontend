import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/home",
        permanent: false,
      },
    ];
  },
  
  allowedDevOrigins: ["10.10.28.21"],

  images: {
    domains: [
      "picsum.photos",
      "nazmulhasan.s3.us-east-1.amazonaws.com",
      "your-bucket.s3.amazonaws.com",
      'batter-off-market-storage.nyc3.digitaloceanspaces.com'
    ],
  },

  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
