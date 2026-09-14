import { Inter_Tight } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { GridDebugToggle, GridLines } from "@/components/GridLines";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { getAllServices } from "@/lib/content/services";
import "../globals.css";

const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-inter-tight",
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const messages = await getMessages();
  const services = getAllServices({
    locale: locale as "en" | "fr",
    publishedOnly: true,
  }).map((s) => ({
    id: s.id,
    slug: s.slug,
    title: s.title,
    category: s.category,
    summary: s.summary,
  }));

  return (
    <html lang={locale} className={`${interTight.variable} h-full`}>
      <body className="relative flex min-h-full flex-col font-sans antialiased">
        <NextIntlClientProvider messages={messages}>
          <GridLines />
          <div className="relative z-10 flex min-h-full flex-1 flex-col">
            <SiteHeader services={services} />
            <main id="main" className="flex-1">
              {children}
            </main>
            <SiteFooter />
          </div>
          <GridDebugToggle />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
