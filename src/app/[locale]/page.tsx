import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { BOOKING_URL, SITE_URL } from "@/lib/constants";
import { categories } from "@/content/categories";
import { getAllServices } from "@/lib/content/services";
import { jsonLdScript, professionalServiceLd } from "@/lib/json-ld";
import type { Metadata } from "next";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });
  const tMeta = await getTranslations({ locale, namespace: "meta" });
  return {
    title: tMeta("tagline"),
    description: t("supporting"),
    alternates: {
      canonical: `${SITE_URL}/${locale}`,
      languages: {
        en: `${SITE_URL}/en`,
        fr: `${SITE_URL}/fr`,
        "x-default": `${SITE_URL}/en`,
      },
    },
    openGraph: {
      title: t("brand"),
      description: t("supporting"),
      url: `${SITE_URL}/${locale}`,
      siteName: "Taku-Media",
      locale: locale === "fr" ? "fr_CA" : "en_CA",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("brand"),
      description: t("supporting"),
    },
  };
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");
  const loc = locale as "en" | "fr";
  const published = getAllServices({ locale: loc, publishedOnly: true });
  const byCategory = categories
    .map((cat) => ({
      cat,
      services: published.filter((s) => s.category === cat.id),
    }))
    .filter((row) => row.services.length > 0);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(
          professionalServiceLd({
            path: `/${locale}`,
            description: t("supporting"),
          }),
        )}
      />

      <section className="hero-gradient section-rule">
        <div className="site-grid py-16 md:py-24">
          <div className="site-cols">
            <div className="col-span-8">
              <p className="label-num mb-4 text-white/80">{t("brand")}</p>
              <h1 className="display mb-6 text-white">{t("headline")}</h1>
              <p className="max-w-[36rem] text-[length:var(--text-md)] text-white/90">
                {t("supporting")}
              </p>
              <div className="mt-8">
                <a
                  href={BOOKING_URL}
                  className="inline-flex border border-white bg-white px-5 py-3 text-[length:var(--text-sm)] font-medium text-[var(--blue-deep)] no-underline"
                  rel="noopener noreferrer"
                >
                  {t("cta")}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-rule">
        <div className="site-grid py-14 md:py-20">
          <div className="site-cols gap-y-8">
            <div className="col-span-4">
              <p className="label-num mb-3">{t("sectionPractice")}</p>
              <h2 className="heading-lg">{t("sectionPracticeTitle")}</h2>
            </div>
            <div className="col-span-7 col-start-6">
              <p className="text-[length:var(--text-md)]">{t("sectionPracticeBody")}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-rule">
        <div className="site-grid py-14 md:py-20">
          <div className="site-cols mb-10">
            <div className="col-span-8">
              <p className="label-num mb-3">{t("sectionAreas")}</p>
              <h2 className="heading-lg">{t("sectionAreasTitle")}</h2>
            </div>
          </div>
          <div className="site-cols gap-y-8">
            {byCategory.map(({ cat, services }) => (
              <div key={cat.id} className="col-span-6 border-t border-[var(--rule)] pt-6">
                <Link
                  href={`/services/${cat.slug[loc]}`}
                  className="heading-md text-[var(--ink)] no-underline"
                >
                  {cat.title[loc]}
                </Link>
                <p className="body-muted mt-2 text-[length:var(--text-sm)]">
                  {cat.summary[loc]}
                </p>
                <ul className="mt-4 space-y-2">
                  {services.map((s) => (
                    <li key={s.id}>
                      <Link
                        href={`/services/${cat.slug[loc]}/${s.slug}`}
                        className="text-[length:var(--text-sm)]"
                      >
                        {s.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-gradient section-rule">
        <div className="site-grid py-14 md:py-20">
          <div className="site-cols">
            <div className="col-span-7">
              <p className="label-num mb-3 text-white/80">{t("sectionCta")}</p>
              <h2 className="heading-lg text-white">{t("sectionCtaTitle")}</h2>
              <p className="mt-4 max-w-[34rem] text-white/90">
                {t("sectionCtaBody")}
              </p>
              <a
                href={BOOKING_URL}
                className="mt-8 inline-flex border border-white bg-white px-5 py-3 text-[length:var(--text-sm)] font-medium text-[var(--blue-deep)] no-underline"
                rel="noopener noreferrer"
              >
                {t("cta")}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
