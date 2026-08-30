import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Placeholder artwork ships as local SVG until real product photography
    // is added — see README "How to replace images".
    dangerouslyAllowSVG: true,
    contentDispositionType: "inline",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
