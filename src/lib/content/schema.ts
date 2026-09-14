import { z } from "zod";

export const serviceFrontmatterSchema = z.object({
  slug: z.string().min(1),
  category: z.enum([
    "customer-experience",
    "marketing",
    "productivity",
    "sales",
    "operations",
    "foundation",
  ]),
  title: z.string().min(1),
  h1: z.string().min(1),
  metaTitle: z.string().min(1),
  metaDescription: z.string().min(1).max(160),
  primaryKeyword: z.string().min(1),
  secondaryKeywords: z.array(z.string()).default([]),
  searchIntent: z.string().min(1),
  summary: z.string().min(1),
  tools: z.array(z.string()).default([]),
  relatedServices: z.array(z.string()).default([]),
  priceFrom: z.union([z.number(), z.null()]).default(null),
  published: z.boolean().default(false),
});

export type ServiceFrontmatter = z.infer<typeof serviceFrontmatterSchema>;

export type ServiceDocument = ServiceFrontmatter & {
  locale: "en" | "fr";
  id: string;
  body: string;
  filepath: string;
};

export const companySchema = z.object({
  id: z.string(),
  name: z.string(),
  website: z.string().optional().default(""),
  summary: z.string(),
  categories: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
  isSiteOwner: z.boolean().default(false),
  placeholder: z.boolean().default(false),
});

export type Company = z.infer<typeof companySchema>;

export const companiesFileSchema = z.object({
  companies: z.array(companySchema),
});
