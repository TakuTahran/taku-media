"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { BOOKING_URL } from "@/lib/constants";
import { categories, type CategoryMeta } from "@/content/categories";

type NavService = {
  id: string;
  slug: string;
  title: string;
  category: string;
  summary: string;
};

type MegaMenuProps = {
  services: NavService[];
};

export function SiteHeader({ services }: MegaMenuProps) {
  const pathname = usePathname();
  return <SiteHeaderChrome key={pathname} services={services} />;
}

function SiteHeaderChrome({ services }: MegaMenuProps) {
  const t = useTranslations("nav");
  const locale = useLocale();
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const panelId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open || !panelRef.current) return;
    const panel = panelRef.current;
    const focusables = panel.querySelectorAll<HTMLElement>(
      "a[href], button:not([disabled])",
    );
    const first = focusables[0];
    const last = focusables[focusables.length - 1];

    function onTab(e: KeyboardEvent) {
      if (e.key !== "Tab" || focusables.length === 0) return;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    }

    panel.addEventListener("keydown", onTab);
    return () => panel.removeEventListener("keydown", onTab);
  }, [open]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        setMobileOpen(false);
        triggerRef.current?.focus();
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!open && !mobileOpen) return;
    const prev = document.body.style.overflow;
    if (mobileOpen) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open, mobileOpen]);

  function servicesForCategory(cat: CategoryMeta) {
    return services.filter((s) => s.category === cat.id);
  }

  return (
    <header className="relative z-40 border-b border-[var(--rule-strong)] bg-[var(--paper)]">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-[var(--surface)] focus:px-3 focus:py-2"
      >
        {t("skipToContent")}
      </a>
      <div className="site-grid">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link
            href="/"
            className="text-[length:var(--text-md)] font-medium text-[var(--ink)] no-underline"
          >
            Taku-Media
          </Link>

          <nav className="hidden items-center gap-6 md:flex" aria-label="Primary">
            <div
              className="relative"
              onMouseEnter={() => setOpen(true)}
              onMouseLeave={() => setOpen(false)}
            >
              <button
                ref={triggerRef}
                type="button"
                className="text-[length:var(--text-sm)] text-[var(--ink)]"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpen((v) => !v)}
                onFocus={() => setOpen(true)}
              >
                {t("services")}
              </button>
              {open && (
                <div
                  id={panelId}
                  ref={panelRef}
                  role="region"
                  aria-label={t("services")}
                  className="absolute left-1/2 top-full z-50 w-[min(90vw,56rem)] -translate-x-1/2 border border-[var(--rule-strong)] bg-[var(--surface)]"
                >
                  <div className="grid grid-cols-3 gap-0">
                    {categories.map((cat) => {
                      const items = servicesForCategory(cat);
                      return (
                        <div
                          key={cat.id}
                          className="border-r border-[var(--rule)] p-4 last:border-r-0"
                        >
                          <Link
                            href={`/services/${cat.slug[locale as "en" | "fr"]}`}
                            className="heading-md mb-2 block text-[var(--ink)] no-underline"
                          >
                            {cat.title[locale as "en" | "fr"]}
                          </Link>
                          <ul className="space-y-2">
                            {items.length === 0 ? (
                              <li className="text-[length:var(--text-sm)] body-muted">
                                —
                              </li>
                            ) : (
                              items.map((item) => (
                                <li key={item.id}>
                                  <Link
                                    href={`/services/${cat.slug[locale as "en" | "fr"]}/${item.slug}`}
                                    className="text-[length:var(--text-sm)] text-[var(--ink)] no-underline hover:text-[var(--blue)]"
                                  >
                                    {item.title}
                                  </Link>
                                </li>
                              ))
                            )}
                          </ul>
                        </div>
                      );
                    })}
                  </div>
                  <div className="border-t border-[var(--rule)] px-4 py-3">
                    <Link href="/services" className="text-[length:var(--text-sm)]">
                      {t("services")} →
                    </Link>
                  </div>
                </div>
              )}
            </div>
            <Link href="/about" className="text-[length:var(--text-sm)] text-[var(--ink)] no-underline">
              {t("about")}
            </Link>
            <Link href="/ai-companies-montreal" className="text-[length:var(--text-sm)] text-[var(--ink)] no-underline">
              {t("directory")}
            </Link>
            <Link href="/contact" className="text-[length:var(--text-sm)] text-[var(--ink)] no-underline">
              {t("contact")}
            </Link>
            <LocaleSwitcher />
            <a href={BOOKING_URL} className="btn-primary py-2" rel="noopener noreferrer">
              {t("bookCall")}
            </a>
          </nav>

          <button
            type="button"
            className="md:hidden text-[length:var(--text-sm)]"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? t("closeMenu") : t("openMenu")}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-[var(--rule)] bg-[var(--surface)] md:hidden">
          <div className="site-grid py-4">
            <button
              type="button"
              className="flex w-full items-center justify-between py-3 text-left text-[length:var(--text-sm)]"
              aria-expanded={mobileServicesOpen}
              onClick={() => setMobileServicesOpen((v) => !v)}
            >
              {t("services")}
              <span aria-hidden="true">{mobileServicesOpen ? "−" : "+"}</span>
            </button>
            {mobileServicesOpen && (
              <div className="pb-4">
                {categories.map((cat) => {
                  const items = servicesForCategory(cat);
                  return (
                    <div key={cat.id} className="mb-4 border-t border-[var(--rule)] pt-3">
                      <Link
                        href={`/services/${cat.slug[locale as "en" | "fr"]}`}
                        className="font-medium text-[var(--ink)] no-underline"
                      >
                        {cat.title[locale as "en" | "fr"]}
                      </Link>
                      <ul className="mt-2 space-y-2 pl-3">
                        {items.map((item) => (
                          <li key={item.id}>
                            <Link
                              href={`/services/${cat.slug[locale as "en" | "fr"]}/${item.slug}`}
                              className="text-[length:var(--text-sm)] text-[var(--ink-muted)] no-underline"
                            >
                              {item.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            )}
            <Link href="/about" className="block py-3 text-[length:var(--text-sm)] text-[var(--ink)] no-underline">
              {t("about")}
            </Link>
            <Link href="/ai-companies-montreal" className="block py-3 text-[length:var(--text-sm)] text-[var(--ink)] no-underline">
              {t("directory")}
            </Link>
            <Link href="/contact" className="block py-3 text-[length:var(--text-sm)] text-[var(--ink)] no-underline">
              {t("contact")}
            </Link>
            <div className="py-3">
              <LocaleSwitcher />
            </div>
            <a href={BOOKING_URL} className="btn-primary mt-2 inline-flex" rel="noopener noreferrer">
              {t("bookCall")}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const other = locale === "en" ? "fr" : "en";

  return (
    <Link
      href={pathname || "/"}
      locale={other}
      className="text-[length:var(--text-sm)] text-[var(--ink-muted)] no-underline uppercase"
      hrefLang={other}
    >
      {other}
    </Link>
  );
}
