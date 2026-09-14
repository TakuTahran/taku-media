import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { categories } from "@/content/categories";
import { getServicesByCategory } from "@/lib/content/services";
import { SITE_URL } from "@/lib/constants";
import { breadcrumbLd, jsonLdScript } from "@/lib/json-ld";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "services" });
  return {
    title: t("hubTitle"),
    description: t("hubIntro"),
    alternates: {
      canonical: `${SITE_URL}/${locale}/services`,
      languages: {
        en: `${SITE_URL}/en/services`,
        fr: `${SITE_URL}/fr/services`,
        "x-default": `${SITE_URL}/en/services`,
      },
    },
  };
}

export default async function ServicesHubPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("services");
  const loc = locale as "en" | "fr";

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(
          breadcrumbLd([
            { name: "Home", url: `${SITE_URL}/${locale}` },
            { name: t("hubTitle"), url: `${SITE_URL}/${locale}/services` },
          ]),
        )}
      />
      <header className="section-rule">
        <div className="site-grid py-12 md:py-16">
          <div className="site-cols">
            <div className="col-span-8">
              <p className="label-num mb-3">01</p>
              <h1 className="display mb-4">{t("hubTitle")}</h1>
              <p className="body-muted text-[length:var(--text-md)] max-w-[40rem]">
                {t("hubIntro")}
              </p>
            </div>
          </div>
        </div>
      </header>

      {categories.map((cat, index) => {
        const services = getServicesByCategory(loc, cat.id, true);
        return (
          <section key={cat.id} className="section-rule">
            <div className="site-grid py-10 md:py-14">
              <div className="site-cols gap-y-6">
                <div className="col-span-4">
                  <p className="label-num mb-3">
                    {String(index + 2).padStart(2, "0")}
                  </p>
                  <h2 className="heading-lg">
                    <Link
                      href={`/services/${cat.slug[loc]}`}
                      className="text-[var(--ink)] no-underline"
                    >
                      {cat.title[loc]}
                    </Link>
                  </h2>
                  <p className="body-muted mt-3 text-[length:var(--text-sm)]">
                    {cat.summary[loc]}
                  </p>
                </div>
                <div className="col-span-8">
                  {services.length === 0 ? (
                    <p className="body-muted text-[length:var(--text-sm)]">
                      {t("categoryEmpty")}
                    </p>
                  ) : (
                    <ul className="divide-y divide-[var(--rule)] border-y border-[var(--rule)]">
                      {services.map((s) => (
                        <li key={s.id} className="py-4">
                          <Link
                            href={`/services/${cat.slug[loc]}/${s.slug}`}
                            className="heading-md text-[var(--ink)] no-underline"
                          >
                            {s.title}
                          </Link>
                          <p className="body-muted mt-1 text-[length:var(--text-sm)]">
                            {s.summary}
                          </p>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
}
