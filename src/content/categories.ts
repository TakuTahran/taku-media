export const CATEGORY_IDS = [
  "customer-experience",
  "marketing",
  "productivity",
  "sales",
  "operations",
  "foundation",
] as const;

export type CategoryId = (typeof CATEGORY_IDS)[number];

export type CategoryMeta = {
  id: CategoryId;
  title: Record<"en" | "fr", string>;
  summary: Record<"en" | "fr", string>;
  slug: Record<"en" | "fr", string>;
};

export const categories: CategoryMeta[] = [
  {
    id: "customer-experience",
    slug: { en: "customer-experience", fr: "experience-client" },
    title: {
      en: "Customer experience",
      fr: "Expérience client",
    },
    summary: {
      en: "Support agents and conversational lead capture on channels you already run.",
      fr: "Agents de support et capture de leads conversationnelle sur vos canaux existants.",
    },
  },
  {
    id: "marketing",
    slug: { en: "marketing", fr: "marketing" },
    title: { en: "Marketing", fr: "Marketing" },
    summary: {
      en: "Copy, social, SEO, and visual production workflows around AI tools.",
      fr: "Flux de production pour le contenu, les réseaux, le SEO et le visuel.",
    },
  },
  {
    id: "productivity",
    slug: { en: "productivity", fr: "productivite" },
    title: { en: "Productivity", fr: "Productivité" },
    summary: {
      en: "Meetings, email, writing, and internal knowledge made searchable.",
      fr: "Réunions, courriel, rédaction et connaissances internes consultables.",
    },
  },
  {
    id: "sales",
    slug: { en: "sales", fr: "ventes" },
    title: { en: "Sales", fr: "Ventes" },
    summary: {
      en: "CRM scoring, call analytics, and recruiting screen assists.",
      fr: "Score CRM, analyse d'appels et aide au recrutement.",
    },
  },
  {
    id: "operations",
    slug: { en: "operations", fr: "operations" },
    title: { en: "Operations", fr: "Opérations" },
    summary: {
      en: "Workflow automation, bookkeeping assists, BI, and internal tooling.",
      fr: "Automatisation, comptabilité assistée, BI et outils internes.",
    },
  },
  {
    id: "foundation",
    slug: { en: "foundation", fr: "fondations" },
    title: { en: "Foundation", fr: "Fondations" },
    summary: {
      en: "Strategy, implementation, and training that make the rest stick.",
      fr: "Stratégie, mise en œuvre et formation pour que le reste tienne.",
    },
  },
];

export function getCategoryById(id: string): CategoryMeta | undefined {
  return categories.find((c) => c.id === id);
}

export function getCategoryBySlug(
  locale: "en" | "fr",
  slug: string,
): CategoryMeta | undefined {
  return categories.find((c) => c.slug[locale] === slug);
}
