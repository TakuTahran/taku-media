export const SITE_NAME = "Taku-Media";
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://taku-media.com";
export const BOOKING_URL = "https://cal.com/tahranc";

export const SOCIAL_LINKS = {
  linkedin: "https://www.linkedin.com/company/taku-media",
  facebook: "https://www.facebook.com/people/Taku-Media/61583154091698/",
} as const;

export const LOCALES = ["en", "fr"] as const;
export type AppLocale = (typeof LOCALES)[number];
