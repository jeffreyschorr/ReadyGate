import type { NextConfig } from "next";

const securityHeaders = [
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  {
    key: "X-Robots-Tag",
    value: "noindex, nofollow, noarchive, nosnippet, noimageindex",
  },
];

const nextConfig: NextConfig = {
  devIndicators: false,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/updates",
        destination: "/notifications",
        permanent: true,
      },
      {
        source: "/replay",
        destination: "/journey",
        permanent: false,
      },
      {
        source: "/design-system",
        destination: "/design",
        permanent: true,
      },
      {
        source: "/preferences",
        destination: "/settings/preferences",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
