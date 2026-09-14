import fs from "node:fs";
import path from "node:path";
import { companiesFileSchema, type Company } from "./schema";

export function getCompanies(): Company[] {
  const filepath = path.join(process.cwd(), "content", "companies.json");
  const raw = JSON.parse(fs.readFileSync(filepath, "utf8"));
  const parsed = companiesFileSchema.parse(raw);
  return parsed.companies;
}

export function getFeaturedCompany(): Company | undefined {
  return getCompanies().find((c) => c.isSiteOwner || c.featured);
}

export function getDirectoryCompanies(): Company[] {
  const all = getCompanies();
  const featured = all.filter((c) => c.isSiteOwner || c.featured);
  const rest = all.filter((c) => !c.isSiteOwner && !c.featured);
  return [...featured, ...rest];
}
