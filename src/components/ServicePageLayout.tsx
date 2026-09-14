import type { ReactNode } from "react";
import {
  breadcrumbLd,
  faqPageLd,
  jsonLdScript,
  serviceLd,
} from "@/lib/json-ld";
import { SITE_URL } from "@/lib/constants";
import type { ServiceDocument } from "@/lib/content/schema";
import { getCategoryById } from "@/content/categories";
import { getRelatedServices, servicePath } from "@/lib/content/services";
import { Link } from "@/i18n/navigation";
import { BOOKING_URL } from "@/lib/constants";

type BreadcrumbItem = { name: string; href: string };

type ServicePageLayoutProps = {
  service: ServiceDocument;
  locale: "en" | "fr";
  breadcrumbs: BreadcrumbItem[];
  children: ReactNode;
  bookLabel: string;
  relatedLabel: string;
  toolsLabel: string;
  backLabel: string;
  faqs?: { question: string; answer: string }[];
};

export function ServicePageLayout({
  service,
  locale,
  breadcrumbs,
  children,
  bookLabel,
  relatedLabel,
  toolsLabel,
  backLabel,
  faqs = [],
}: ServicePageLayoutProps) {
  const category = getCategoryById(service.category)!;
  const related = getRelatedServices(service, 3);
  const pagePath = `/${locale}${servicePath(locale, service)}`;

  const ld = [
    serviceLd({
      name: service.title,
      description: service.summary,
      url: `${SITE_URL}${pagePath}`,
    }),
    breadcrumbLd(
      breadcrumbs.map((b) => ({
        name: b.name,
        url: b.href.startsWith("http") ? b.href : `${SITE_URL}${b.href}`,
      })),
    ),
  ];
  const faq = faqPageLd(faqs);
  if (faq) ld.push(faq);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(ld)}
      />

      <header className="section-rule">
        <div className="site-grid py-10 md:py-14">
          <div className="site-cols">
            <div className="col-span-full mb-6">
              <nav aria-label="Breadcrumb" className="text-[length:var(--text-sm)] body-muted">
                <ol className="flex flex-wrap gap-2">
                  {breadcrumbs.map((item, i) => (
                    <li key={item.href} className="flex items-center gap-2">
                      {i > 0 && <span aria-hidden="true">/</span>}
                      {i === breadcrumbs.length - 1 ? (
                        <span className="text-[var(--ink)]">{item.name}</span>
                      ) : (
                        <Link href={item.href.replace(`/${locale}`, "") || "/"}>
                          {item.name}
                        </Link>
                      )}
                    </li>
                  ))}
                </ol>
              </nav>
            </div>
            <div className="col-span-8">
              <p className="label-num mb-3">
                {category.title[locale]}
              </p>
              <h1 className="display mb-4">{service.h1}</h1>
              <p className="body-muted text-[length:var(--text-md)] max-w-[40rem]">
                {service.summary}
              </p>
            </div>
            <div className="col-span-4 mt-8 md:mt-0 md:flex md:items-end md:justify-end">
              <a href={BOOKING_URL} className="btn-primary" rel="noopener noreferrer">
                {bookLabel}
              </a>
            </div>
          </div>
        </div>
      </header>

      <section className="section-rule">
        <div className="site-grid py-10 md:py-14">
          <div className="site-cols">
            <aside className="col-span-3 mb-8 md:mb-0">
              <p className="label-num mb-3">{toolsLabel}</p>
              <ul className="space-y-2 text-[length:var(--text-sm)]">
                {service.tools.map((tool) => (
                  <li key={tool} className="border-b border-[var(--rule)] py-2">
                    {tool}
                  </li>
                ))}
              </ul>
              <p className="mt-8">
                <Link
                  href={`/services/${category.slug[locale]}`}
                  className="text-[length:var(--text-sm)]"
                >
                  {backLabel}
                </Link>
              </p>
            </aside>
            <div className="col-span-8 col-start-5 prose-service">{children}</div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section-rule">
          <div className="site-grid py-10 md:py-14">
            <div className="site-cols">
              <div className="col-span-4">
                <p className="label-num mb-3">Related</p>
                <h2 className="heading-lg">{relatedLabel}</h2>
              </div>
              <div className="col-span-8">
                <ul className="divide-y divide-[var(--rule)] border-y border-[var(--rule)]">
                  {related.map((item) => {
                    const cat = getCategoryById(item.category)!;
                    return (
                      <li key={item.id} className="py-4">
                        <Link
                          href={`/services/${cat.slug[locale]}/${item.slug}`}
                          className="heading-md no-underline text-[var(--ink)] hover:text-[var(--blue)]"
                        >
                          {item.title}
                        </Link>
                        <p className="body-muted mt-1 text-[length:var(--text-sm)]">
                          {item.summary}
                        </p>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
