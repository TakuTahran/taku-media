import { SITE_NAME, SITE_URL, SOCIAL_LINKS } from "./constants";

type JsonLd = Record<string, unknown>;

export function jsonLdScript(data: JsonLd | JsonLd[]) {
  return {
    __html: JSON.stringify(data),
  };
}

export function homeGraphLd(opts: {
  path: string;
  description: string;
  services: {
    id: string;
    name: string;
    serviceType: string;
    description: string;
  }[];
  faqs: { question: string; answer: string }[];
}): JsonLd {
  const pageUrl = `${SITE_URL}${opts.path}`;
  const orgId = `${SITE_URL}/#organization`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": orgId,
        name: SITE_NAME,
        url: SITE_URL,
        description: opts.description,
        areaServed: { "@type": "City", name: "Montréal" },
        sameAs: Object.values(SOCIAL_LINKS),
      },
      ...opts.services.map((s) => ({
        "@type": "Service",
        "@id": `${pageUrl}#${s.id}`,
        name: s.name,
        serviceType: s.serviceType,
        description: s.description,
        provider: { "@id": orgId },
      })),
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        mainEntity: opts.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      },
    ],
  };
}
