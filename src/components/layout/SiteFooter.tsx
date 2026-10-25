import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { SITE_NAME, SOCIAL_LINKS } from "@/lib/constants";

const linkClass = "hover:opacity-60";

export async function SiteFooter() {
  const t = await getTranslations("footer");
  const tNav = await getTranslations("nav");
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto overflow-hidden border-t border-[var(--rule)] pt-12">
      <div className="site-grid">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-[length:var(--text-sm)] font-medium">
            <li>
              <Link href="/#vibe-hardening" className={linkClass}>
                {tNav("overhaul")}
              </Link>
            </li>
            <li>
              <Link href="/#mobile" className={linkClass}>
                {tNav("mobile")}
              </Link>
            </li>
            <li>
              <Link href="/#engagements" className={linkClass}>
                {tNav("engagements")}
              </Link>
            </li>
            <li>
              <a href={SOCIAL_LINKS.linkedin} className={linkClass} rel="noopener noreferrer">
                LinkedIn
              </a>
            </li>
            <li>
              <a href={SOCIAL_LINKS.facebook} className={linkClass} rel="noopener noreferrer">
                Facebook
              </a>
            </li>
          </ul>
          <p className="eyebrow text-[var(--ink-muted)]">
            © {year} {SITE_NAME}. {t("rights")}
          </p>
        </div>
        <p
          aria-hidden="true"
          className="mt-12 select-none whitespace-nowrap pb-4 text-[clamp(3.5rem,16vw,16rem)] font-semibold leading-[0.8] tracking-[-0.06em]"
        >
          Taku-Media
          <span className="ml-[0.04em] inline-block align-top text-[0.2em] font-medium leading-none">®</span>
        </p>
      </div>
    </footer>
  );
}
