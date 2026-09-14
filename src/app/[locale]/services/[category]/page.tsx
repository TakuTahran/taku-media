import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import {
  categories,
  getCategoryBySlug,
} from "@/content/categories";
import { getServicesByCategory } from "@/lib/content/services";
import { SITE_URL } from "@/lib/constants";
import { breadcrumbLd, jsonLdScript } from "@/lib/json-ld";
import { routing } from "@/i18n/routing";

type Props = {
  params: Promise<{ locale: string; category: string }>;
};

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    categories.map((cat) => ({
      locale,
      category: cat.slug[locale as "en" | "fr"],
    })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, category: categorySlug } = await params;
  const loc = locale as "en" | "fr";
  const cat = getCategoryBySlug(loc, categorySlug);
  if (!cat) return {};
  return {
    title: cat.title[loc],
    description: cat.summary[loc],
    alternates: {
      canonical: `${SITE_URL}/${locale}/services/${categorySlug}`,
      languages: {
        en: `${SITE_URL}/en/services/${cat.slug.en}`,
        fr: `${SITE_URL}/fr/services/${cat.slug.fr}`,
        "x-default": `${SITE_URL}/en/services/${cat.slug.en}`,
      },
    },
  };
}

export default async function CategoryHubPage({ params }: Props) {
  const { locale, category: categorySlug } = await params;
  setRequestLocale(locale);
  const loc = locale as "en" | "fr";
  const cat = getCategoryBySlug(loc, categorySlug);
  if (!cat) notFound();

  const t = await getTranslations("services");
  const services = getServicesByCategory(loc, cat.id, true);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(
          breadcrumbLd([
            { name: "Home", url: `${SITE_URL}/${locale}` },
            { name: t("hubTitle"), url: `${SITE_URL}/${locale}/services` },
            {
              name: cat.title[loc],
              url: `${SITE_URL}/${locale}/services/${categorySlug}`,
            },
          ]),
        )}
      />
      <header className="section-rule">
        <div className="site-grid py-12 md:py-16">
          <div className="site-cols">
            <div className="col-span-8">
              <p className="mb-4 text-[length:var(--text-sm)]">
                <Link href="/services">{t("backToHub")}</Link>
              </p>
              <h1 className="display mb-4">{cat.title[loc]}</h1>
              <p className="body-muted text-[length:var(--text-md)] max-w-[40rem]">
                {cat.summary[loc]}
              </p>
            </div>
          </div>
        </div>
      </header>

      <section className="section-rule">
        <div className="site-grid py-10 md:py-14">
          <div className="site-cols">
            <div className="col-span-full">
              {services.length === 0 ? (
                <p className="body-muted">{t("categoryEmpty")}</p>
              ) : (
                <ul className="divide-y divide-[var(--rule)] border-y border-[var(--rule)]">
                  {services.map((s) => (
                    <li key={s.id} className="site-cols py-6">
                      <div className="col-span-4">
                        <Link
                          href={`/services/${cat.slug[loc]}/${s.slug}`}
                          className="heading-md text-[var(--ink)] no-underline"
                        >
                          {s.title}
                        </Link>
                      </div>
                      <div className="col-span-7">
                        <p className="body-muted text-[length:var(--text-sm)]">
                          {s.summary}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
