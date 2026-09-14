import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { SITE_URL } from "@/lib/constants";
import { Link } from "@/i18n/navigation";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return {
    title: t("title"),
    description: t("intro"),
    alternates: {
      canonical: `${SITE_URL}/${locale}/about`,
      languages: {
        en: `${SITE_URL}/en/about`,
        fr: `${SITE_URL}/fr/about`,
        "x-default": `${SITE_URL}/en/about`,
      },
    },
  };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");

  return (
    <header className="section-rule">
      <div className="site-grid py-12 md:py-16">
        <div className="site-cols gap-y-8">
          <div className="col-span-4">
            <p className="label-num mb-3">01</p>
            <h1 className="display">{t("title")}</h1>
          </div>
          <div className="col-span-7 col-start-6">
            <p className="text-[length:var(--text-md)] mb-4">{t("intro")}</p>
            <p className="body-muted mb-8">{t("body")}</p>
            <Link href="/contact" className="btn-primary">
              {t("cta")}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
