import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function NotFound() {
  const t = await getTranslations("notFound");

  return (
    <div className="site-grid py-24 md:py-32">
      <p className="display mb-6">404</p>
      <h1 className="mb-4 text-[length:var(--text-lg)] font-semibold tracking-[-0.04em]">{t("title")}</h1>
      <p className="mb-8 max-w-xl text-[var(--ink-muted)]">{t("body")}</p>
      <Link
        href="/"
        className="inline-flex rounded-full bg-[var(--ink)] px-6 py-3.5 text-[length:var(--text-sm)] font-medium text-white hover:bg-[var(--accent)]"
      >
        {t("home")}
      </Link>
    </div>
  );
}
