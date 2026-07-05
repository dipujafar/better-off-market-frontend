import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  redirects: async () => [{ source: "/", destination: "/home", permanent: false }],
  images:{
    domains: [
      "picsum.photos"
    ]
  }
  /* config options here */
};

export default nextConfig;
