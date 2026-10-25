"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";

const SECTIONS = ["overhaul", "mobile", "process", "engagements", "faq"] as const;
const SECTION_IDS: Record<(typeof SECTIONS)[number], string> = {
  overhaul: "vibe-hardening",
  mobile: "mobile",
  process: "process",
  engagements: "engagements",
  faq: "faq",
};
// Count bubble on the engagements link, matching the three packages.
const ENGAGEMENT_COUNT = 3;

// Decorative barcode mark next to the logo; bar widths in px.
const BARS = [2, 1, 3, 1, 1, 2, 3, 1, 2, 1, 1, 3, 2, 1];

export function SiteHeader() {
  const t = useTranslations("nav");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setMobileOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-[var(--paper)]/85 backdrop-blur-md">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-[var(--ink)] focus:px-4 focus:py-2 focus:text-white"
      >
        {t("skipToContent")}
      </a>
      <div className="site-grid flex h-16 items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <Link href="/" className="text-[19px] font-semibold tracking-[-0.04em]">
            Taku-Media<sup className="ml-0.5 text-[10px]">®</sup>
          </Link>
          <span className="hidden items-center gap-2.5 md:flex" aria-hidden="true">
            <span className="flex h-6 items-stretch gap-[2px]">
              {BARS.map((w, i) => (
                <span key={i} className="bg-[var(--ink)]" style={{ width: w }} />
              ))}
            </span>
            <span className="eyebrow text-[10px] font-semibold">{t("tagline")}</span>
          </span>
        </div>

        <nav aria-label={t("primary")} className="hidden items-center gap-7 lg:flex">
          {SECTIONS.map((key) => (
            <Link
              key={key}
              href={`/#${SECTION_IDS[key]}`}
              className="relative text-[length:var(--text-sm)] font-medium hover:opacity-60"
            >
              {t(key)}
              {key === "engagements" && (
                <span
                  aria-hidden="true"
                  className="absolute -right-3.5 -top-1.5 grid h-4 w-4 place-items-center rounded-full bg-[var(--accent)] text-[9px] font-semibold text-white"
                >
                  {ENGAGEMENT_COUNT}
                </span>
              )}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <LocaleSwitcher />
          <Link
            href="/#book"
            className="hidden rounded-full bg-[var(--ink)] px-4 py-2 text-[length:var(--text-sm)] font-medium text-white hover:bg-[var(--accent)] sm:inline-flex"
          >
            {t("bookCall")}
          </Link>
          <button
            type="button"
            className="flex h-10 w-10 flex-col items-center justify-center gap-[5px] lg:hidden"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            aria-label={mobileOpen ? t("closeMenu") : t("openMenu")}
            onClick={() => setMobileOpen((v) => !v)}
          >
            <span
              className={`h-[1.5px] w-6 bg-[var(--ink)] transition ${mobileOpen ? "translate-y-[3.25px] rotate-45" : ""}`}
            />
            <span
              className={`h-[1.5px] w-6 bg-[var(--ink)] transition ${mobileOpen ? "-translate-y-[3.25px] -rotate-45" : ""}`}
            />
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav id="mobile-nav" aria-label={t("primary")} className="border-t border-[var(--rule)] lg:hidden">
          <div className="site-grid flex flex-col py-4">
            {SECTIONS.map((key) => (
              <Link
                key={key}
                href={`/#${SECTION_IDS[key]}`}
                className="py-3 text-2xl font-semibold tracking-[-0.04em]"
                onClick={() => setMobileOpen(false)}
              >
                {t(key)}
              </Link>
            ))}
            <Link
              href="/#book"
              className="mt-4 inline-flex justify-center rounded-full bg-[var(--ink)] px-4 py-3 text-[length:var(--text-sm)] font-medium text-white"
              onClick={() => setMobileOpen(false)}
            >
              {t("bookCall")}
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}

function LocaleSwitcher() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const other = locale === "en" ? "fr" : "en";

  return (
    <Link
      href={pathname || "/"}
      locale={other}
      hrefLang={other}
      aria-label={t("language")}
      className="eyebrow rounded-full border border-[var(--rule)] px-2.5 py-1 hover:border-[var(--ink)]"
    >
      {other}
    </Link>
  );
}
