import type { NextConfig } from "next";
import "./shared/config/env";

const nextConfig: NextConfig = {
  typedRoutes: true,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/overview",
        permanent: true,
      }
    ]
  },
};

export default nextConfig;
