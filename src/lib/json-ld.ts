import { SITE_NAME, SITE_URL } from "./constants";

type JsonLd = Record<string, unknown>;

export function jsonLdScript(data: JsonLd | JsonLd[]) {
  return {
    __html: JSON.stringify(data),
  };
}

export function professionalServiceLd(opts?: {
  path?: string;
  description?: string;
}): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: SITE_NAME,
    url: opts?.path ? `${SITE_URL}${opts.path}` : SITE_URL,
    areaServed: {
      "@type": "City",
      name: "Montréal",
    },
    description:
      opts?.description ??
      "AI consulting for implementation and integration in Montreal.",
  };
}

export function serviceLd(opts: {
  name: string;
  description: string;
  url: string;
}): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: opts.name,
    description: opts.description,
    url: opts.url,
    provider: {
      "@type": "ProfessionalService",
      name: SITE_NAME,
      url: SITE_URL,
    },
    areaServed: {
      "@type": "City",
      name: "Montréal",
    },
  };
}

export function breadcrumbLd(
  items: { name: string; url: string }[],
): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function faqPageLd(
  faqs: { question: string; answer: string }[],
): JsonLd | null {
  if (!faqs.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
