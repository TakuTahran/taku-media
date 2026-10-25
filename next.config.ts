import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

// The site is now a single page per locale; old pages forward to it.
const RETIRED_PATHS = ["about", "ai-companies-montreal", "services", "services/:path*"];

const nextConfig: NextConfig = {
  async redirects() {
    return [
      ...RETIRED_PATHS.map((path) => ({
        source: `/:locale(en|fr)/${path}`,
        destination: "/:locale",
        permanent: true,
      })),
      {
        source: "/:locale(en|fr)/contact",
        destination: "/:locale#book",
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
