import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getDirectoryCompanies } from "@/lib/content/companies";
import { SITE_URL } from "@/lib/constants";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "directory" });
  return {
    title: t("title"),
    description: t("intro"),
    alternates: {
      canonical: `${SITE_URL}/${locale}/ai-companies-montreal`,
      languages: {
        en: `${SITE_URL}/en/ai-companies-montreal`,
        fr: `${SITE_URL}/fr/ai-companies-montreal`,
        "x-default": `${SITE_URL}/en/ai-companies-montreal`,
      },
    },
  };
}

export default async function DirectoryPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("directory");
  const companies = getDirectoryCompanies();

  return (
    <>
      <header className="section-rule">
        <div className="site-grid py-12 md:py-16">
          <div className="site-cols">
            <div className="col-span-8">
              <p className="label-num mb-3">01</p>
              <h1 className="display mb-4">{t("title")}</h1>
              <p className="body-muted text-[length:var(--text-md)] max-w-[42rem]">
                {t("intro")}
              </p>
            </div>
          </div>
        </div>
      </header>

      <section className="section-rule">
        <div className="site-grid py-10 md:py-14">
          {companies.length === 0 ? (
            <p className="body-muted">{t("empty")}</p>
          ) : (
            <ul className="divide-y divide-[var(--rule)] border-y border-[var(--rule)]">
              {companies.map((company) => (
                <li
                  key={company.id}
                  className={`site-cols py-8 ${
                    company.isSiteOwner ? "bg-[var(--blue-wash)] px-4 -mx-4 md:mx-0 md:px-6" : ""
                  }`}
                >
                  <div className="col-span-4">
                    <p className="heading-md text-[var(--ink)]">
                      {company.name}
                    </p>
                    {company.isSiteOwner && (
                      <p className="label-num mt-2 text-[var(--blue-deep)]">
                        {t("featuredLabel")}
                      </p>
                    )}
                    {company.placeholder && (
                      <p className="label-num mt-2">{t("placeholderLabel")}</p>
                    )}
                  </div>
                  <div className="col-span-6">
                    <p
                      className={`text-[length:var(--text-sm)] ${
                        company.isSiteOwner
                          ? "text-[var(--blue-deep)]"
                          : "body-muted"
                      }`}
                    >
                      {company.summary}
                    </p>
                    {company.website ? (
                      <p className="mt-3 text-[length:var(--text-sm)]">
                        <a
                          href={company.website}
                          rel="noopener noreferrer"
                          className={
                            company.isSiteOwner
                              ? "text-[var(--blue-deep)]"
                              : undefined
                          }
                        >
                          {company.website.replace(/^https?:\/\//, "")}
                        </a>
                      </p>
                    ) : null}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  );
}
