import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  return (["en", "fr"] as const).map((locale) => ({
    url: `${SITE_URL}/${locale}`,
    lastModified: new Date(),
    alternates: {
      languages: {
        en: `${SITE_URL}/en`,
        fr: `${SITE_URL}/fr`,
        "x-default": `${SITE_URL}/en`,
      },
    },
  }));
}
