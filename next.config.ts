import type { NextConfig } from "next";

const PRIMARY_DOMAIN = "www.elev8incorporation.org";

// All domains that should permanently redirect to the primary domain
const REDIRECT_DOMAINS = [
  "elev8incorporation.org",       // non-www of primary
  "elev8corporation.com",
  "www.elev8corporation.com",
  "elev8corporation.org",
  "www.elev8corporation.org",
  "elev8enterprises.com",
  "www.elev8enterprises.com",
  "elev8enterprises.org",
  "www.elev8enterprises.org",
  "elev8incorporation.com",
  "www.elev8incorporation.com",
  "elev8all.org",
  "www.elev8all.org",
  "elev8inc.org",
  "www.elev8inc.org",
  "elev8inc.com",
  "www.elev8inc.com",
];

const nextConfig: NextConfig = {
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return REDIRECT_DOMAINS.map((domain) => ({
      source: "/:path*",
      has: [{ type: "host" as const, value: domain }],
      destination: `https://${PRIMARY_DOMAIN}/:path*`,
      permanent: true,
    }));
  },
  experimental: {
    optimizePackageImports: [
      "framer-motion",
      "three",
      "@react-three/fiber",
      "@react-three/drei",
      "lucide-react",
    ],
  },
};

export default nextConfig;
