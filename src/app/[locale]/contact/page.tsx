import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CalEmbed } from "@/components/CalEmbed";
import { BOOKING_URL, SITE_URL } from "@/lib/constants";
import { jsonLdScript, professionalServiceLd } from "@/lib/json-ld";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return {
    title: t("title"),
    description: t("intro"),
    alternates: {
      canonical: `${SITE_URL}/${locale}/contact`,
      languages: {
        en: `${SITE_URL}/en/contact`,
        fr: `${SITE_URL}/fr/contact`,
        "x-default": `${SITE_URL}/en/contact`,
      },
    },
  };
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(
          professionalServiceLd({
            path: `/${locale}/contact`,
            description: t("intro"),
          }),
        )}
      />
      <header className="section-rule">
        <div className="site-grid py-12 md:py-16">
          <div className="site-cols gap-y-8">
            <div className="col-span-4">
              <p className="label-num mb-3">01</p>
              <h1 className="display">{t("title")}</h1>
            </div>
            <div className="col-span-7 col-start-6">
              <p className="text-[length:var(--text-md)] mb-4">{t("intro")}</p>
              <p className="mb-8">
                <a
                  href={BOOKING_URL}
                  className="btn-primary"
                  rel="noopener noreferrer"
                >
                  {t("bookingLabel")}
                </a>
              </p>
              {/* TODO(tahran): confirm NAP */}
            </div>
          </div>
        </div>
      </header>

      <section className="section-rule">
        <div className="site-grid py-10 md:py-14">
          <div className="site-cols">
            <div className="col-span-4">
              <p className="label-num mb-3">02</p>
              <h2 className="heading-lg">{t("embedNote")}</h2>
            </div>
            <div className="col-span-8">
              <CalEmbed bookingUrl={BOOKING_URL} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
