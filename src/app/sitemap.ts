import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";
import { categories } from "@/content/categories";
import { getAllServices } from "@/lib/content/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ["", "/about", "/contact", "/services", "/ai-companies-montreal"];
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of ["en", "fr"] as const) {
    for (const path of staticPaths) {
      entries.push({
        url: `${SITE_URL}/${locale}${path}`,
        lastModified: new Date(),
        alternates: {
          languages: {
            en: `${SITE_URL}/en${path}`,
            fr: `${SITE_URL}/fr${path}`,
            "x-default": `${SITE_URL}/en${path}`,
          },
        },
      });
    }

    for (const cat of categories) {
      const catPath = `/services/${cat.slug[locale]}`;
      entries.push({
        url: `${SITE_URL}/${locale}${catPath}`,
        lastModified: new Date(),
        alternates: {
          languages: {
            en: `${SITE_URL}/en/services/${cat.slug.en}`,
            fr: `${SITE_URL}/fr/services/${cat.slug.fr}`,
            "x-default": `${SITE_URL}/en/services/${cat.slug.en}`,
          },
        },
      });
    }

    const services = getAllServices({ locale, publishedOnly: true });
    for (const service of services) {
      const cat = categories.find((c) => c.id === service.category)!;
      const path = `/services/${cat.slug[locale]}/${service.slug}`;
      const enService = getAllServices({ locale: "en", publishedOnly: true }).find(
        (s) => s.id === service.id,
      );
      const frService = getAllServices({ locale: "fr", publishedOnly: false }).find(
        (s) => s.id === service.id,
      );
      entries.push({
        url: `${SITE_URL}/${locale}${path}`,
        lastModified: new Date(),
        alternates: {
          languages: {
            en: enService
              ? `${SITE_URL}/en/services/${cat.slug.en}/${enService.slug}`
              : `${SITE_URL}/en${path}`,
            fr: frService?.published
              ? `${SITE_URL}/fr/services/${cat.slug.fr}/${frService.slug}`
              : `${SITE_URL}/en/services/${cat.slug.en}/${enService?.slug ?? service.slug}`,
            "x-default": enService
              ? `${SITE_URL}/en/services/${cat.slug.en}/${enService.slug}`
              : `${SITE_URL}/en${path}`,
          },
        },
      });
    }
  }

  return entries;
}
