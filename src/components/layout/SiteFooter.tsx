import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { BOOKING_URL, SITE_NAME, SOCIAL_LINKS } from "@/lib/constants";
import { categories } from "@/content/categories";
import { getAllServices } from "@/lib/content/services";

const footerLinkClass =
  "text-[var(--ink)] no-underline hover:text-[var(--blue)]";

export async function SiteFooter() {
  const t = await getTranslations("footer");
  const tNav = await getTranslations("nav");
  const locale = (await getLocale()) as "en" | "fr";
  const year = new Date().getFullYear();
  const published = getAllServices({ locale, publishedOnly: true }).slice(0, 8);

  return (
    <footer className="section-rule mt-auto bg-[var(--paper)]">
      <div className="site-grid py-12 md:py-16">
        <div className="site-cols gap-y-10">
          <div className="col-span-4">
            <p className="heading-md mb-3">{SITE_NAME}</p>
            <p className="body-muted text-[length:var(--text-sm)] max-w-[22rem]">
              {t("tagline")}
            </p>
            {/* TODO(tahran): confirm NAP */}
            <p className="mt-4 text-[length:var(--text-sm)] body-muted">
              {t("napTodo")}
            </p>
          </div>

          <div className="col-span-3">
            <p className="label-num mb-3">{t("services")}</p>
            <ul className="space-y-2 text-[length:var(--text-sm)]">
              {published.map((s) => {
                const cat = categories.find((c) => c.id === s.category)!;
                return (
                  <li key={s.id}>
                    <Link
                      href={`/services/${cat.slug[locale]}/${s.slug}`}
                      className={footerLinkClass}
                    >
                      {s.title}
                    </Link>
                  </li>
                );
              })}
              <li>
                <Link href="/services" className={footerLinkClass}>
                  {tNav("services")}
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-3">
            <p className="label-num mb-3">{t("company")}</p>
            <ul className="space-y-2 text-[length:var(--text-sm)]">
              <li>
                <Link href="/about" className={footerLinkClass}>
                  {tNav("about")}
                </Link>
              </li>
              <li>
                <Link href="/contact" className={footerLinkClass}>
                  {tNav("contact")}
                </Link>
              </li>
              <li>
                <Link href="/ai-companies-montreal" className={footerLinkClass}>
                  {tNav("directory")}
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-2">
            <p className="label-num mb-3">{t("connect")}</p>
            <ul className="space-y-2 text-[length:var(--text-sm)]">
              <li>
                <a
                  href={BOOKING_URL}
                  className={footerLinkClass}
                  rel="noopener noreferrer"
                >
                  {tNav("bookCall")}
                </a>
              </li>
              <li>
                <a
                  href={SOCIAL_LINKS.linkedin}
                  className={footerLinkClass}
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href={SOCIAL_LINKS.facebook}
                  className={footerLinkClass}
                  rel="noopener noreferrer"
                >
                  Facebook
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-[var(--rule)] pt-6 text-[length:var(--text-xs)] body-muted">
          © {year} {SITE_NAME}. {t("rights")}
        </div>
      </div>
    </footer>
  );
}
