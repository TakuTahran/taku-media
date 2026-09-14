import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ServicePageLayout } from "@/components/ServicePageLayout";
import { ServiceMdx } from "@/components/ServiceMdx";
import {
  getPublishedServiceParams,
  getServiceById,
  getServiceBySlug,
} from "@/lib/content/services";
import { getCategoryById } from "@/content/categories";
import { SITE_URL } from "@/lib/constants";
import { routing } from "@/i18n/routing";

type Props = {
  params: Promise<{ locale: string; category: string; slug: string }>;
};

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getPublishedServiceParams(locale as "en" | "fr").map((p) => ({
      locale,
      ...p,
    })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, category, slug } = await params;
  const service = getServiceBySlug(locale as "en" | "fr", category, slug, {
    publishedOnly: true,
  });
  if (!service) return {};

  const cat = getCategoryById(service.category)!;
  const en = getServiceById("en", service.id, { publishedOnly: false });
  const fr = getServiceById("fr", service.id, { publishedOnly: false });

  const enPath = en
    ? `${SITE_URL}/en/services/${cat.slug.en}/${en.slug}`
    : `${SITE_URL}/en/services/${category}/${slug}`;
  const frPath = fr
    ? `${SITE_URL}/fr/services/${cat.slug.fr}/${fr.slug}`
    : enPath;

  return {
    title: service.metaTitle,
    description: service.metaDescription,
    keywords: [service.primaryKeyword, ...service.secondaryKeywords],
    alternates: {
      canonical: `${SITE_URL}/${locale}/services/${category}/${slug}`,
      languages: {
        en: enPath,
        fr: frPath,
        "x-default": enPath,
      },
    },
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      url: `${SITE_URL}/${locale}/services/${category}/${slug}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: service.metaTitle,
      description: service.metaDescription,
    },
  };
}

export default async function ServicePage({ params }: Props) {
  const { locale, category, slug } = await params;
  setRequestLocale(locale);
  const loc = locale as "en" | "fr";
  const service = getServiceBySlug(loc, category, slug, {
    publishedOnly: true,
  });
  if (!service) notFound();

  const t = await getTranslations("services");
  const cat = getCategoryById(service.category)!;

  return (
    <ServicePageLayout
      service={service}
      locale={loc}
      bookLabel={t("bookCta")}
      relatedLabel={t("related")}
      toolsLabel={t("tools")}
      backLabel={cat.title[loc]}
      breadcrumbs={[
        { name: "Home", href: `/${locale}` },
        { name: t("hubTitle"), href: `/${locale}/services` },
        {
          name: cat.title[loc],
          href: `/${locale}/services/${cat.slug[loc]}`,
        },
        {
          name: service.title,
          href: `/${locale}/services/${cat.slug[loc]}/${service.slug}`,
        },
      ]}
    >
      <ServiceMdx source={service.body} />
    </ServicePageLayout>
  );
}
