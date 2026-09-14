import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import {
  serviceFrontmatterSchema,
  type ServiceDocument,
  type ServiceFrontmatter,
} from "./schema";
import { getCategoryById } from "@/content/categories";
import type { AppLocale } from "../constants";

const CONTENT_ROOT = path.join(process.cwd(), "content", "services");

function listMdxFiles(locale: AppLocale): string[] {
  const dir = path.join(CONTENT_ROOT, locale);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => path.join(dir, f));
}

function parseFile(filepath: string, locale: AppLocale): ServiceDocument {
  const raw = fs.readFileSync(filepath, "utf8");
  const { data, content } = matter(raw);
  const parsed = serviceFrontmatterSchema.parse(data);
  const id = path.basename(filepath, path.extname(filepath));
  return {
    ...parsed,
    id,
    locale,
    body: content.trim(),
    filepath,
  };
}

let cache: ServiceDocument[] | null = null;

export function getAllServices(options?: {
  locale?: AppLocale;
  publishedOnly?: boolean;
}): ServiceDocument[] {
  if (!cache) {
    const en = listMdxFiles("en").map((f) => parseFile(f, "en"));
    const fr = listMdxFiles("fr").map((f) => parseFile(f, "fr"));
    cache = [...en, ...fr];
  }

  let result = cache;
  if (options?.locale) {
    result = result.filter((s) => s.locale === options.locale);
  }
  if (options?.publishedOnly) {
    result = result.filter((s) => s.published);
  }
  return result;
}

export function getServiceBySlug(
  locale: AppLocale,
  categorySlug: string,
  serviceSlug: string,
  options?: { publishedOnly?: boolean },
): ServiceDocument | undefined {
  const services = getAllServices({
    locale,
    publishedOnly: options?.publishedOnly ?? true,
  });

  return services.find((s) => {
    const cat = getCategoryById(s.category);
    if (!cat) return false;
    return cat.slug[locale] === categorySlug && s.slug === serviceSlug;
  });
}

export function getServiceById(
  locale: AppLocale,
  id: string,
  options?: { publishedOnly?: boolean },
): ServiceDocument | undefined {
  return getAllServices({
    locale,
    publishedOnly: options?.publishedOnly ?? false,
  }).find((s) => s.id === id);
}

export function getPublishedServiceParams(locale: AppLocale) {
  return getAllServices({ locale, publishedOnly: true }).map((s) => {
    const cat = getCategoryById(s.category)!;
    return {
      category: cat.slug[locale],
      slug: s.slug,
    };
  });
}

export function getServicesByCategory(
  locale: AppLocale,
  categoryId: string,
  publishedOnly = true,
) {
  return getAllServices({ locale, publishedOnly }).filter(
    (s) => s.category === categoryId,
  );
}

export function getRelatedServices(
  service: ServiceFrontmatter & { locale: AppLocale; id?: string },
  limit = 3,
): ServiceDocument[] {
  const all = getAllServices({ locale: service.locale, publishedOnly: true });
  const selfId =
    service.id ??
    (service as ServiceDocument).id ??
    service.slug;

  const related = service.relatedServices
    .map((id) => all.find((s) => s.id === id))
    .filter((s): s is ServiceDocument => Boolean(s));

  if (related.length >= limit) return related.slice(0, limit);

  const fillers = all.filter(
    (s) =>
      s.id !== selfId &&
      !related.some((r) => r.id === s.id) &&
      (s.category === service.category || s.category === "foundation"),
  );

  return [...related, ...fillers].slice(0, limit);
}

export function getFoundationService(locale: AppLocale) {
  return getAllServices({ locale, publishedOnly: true }).find(
    (s) => s.category === "foundation",
  );
}

export function servicePath(
  locale: AppLocale,
  service: Pick<ServiceDocument, "category" | "slug">,
) {
  const cat = getCategoryById(service.category)!;
  return `/services/${cat.slug[locale]}/${service.slug}`;
}

/** Clear module cache (useful in dev after content edits). */
export function clearServiceCache() {
  cache = null;
}
