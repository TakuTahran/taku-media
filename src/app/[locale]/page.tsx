import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { BOOKING_URL, SITE_URL } from "@/lib/constants";
import { homeGraphLd, jsonLdScript } from "@/lib/json-ld";
import { CalEmbed } from "@/components/CalEmbed";
import { Marquee } from "@/components/home/Marquee";
import type { Metadata } from "next";

type Props = { params: Promise<{ locale: string }> };

type Card = { stat: string; title: string; body: string };
type MobileCard = {
  badge: string;
  stack: string;
  title: string;
  body: string;
  points: string[];
  delivery: string;
};
type Tier = {
  label: string;
  name: string;
  price: string;
  terms: string;
  body: string;
  points: string[];
  cta: string;
};
type Step = { label: string; title: string; body: string };
type Faq = { question: string; answer: string };

const STACK = [
  "TypeScript / Node",
  "React / Next.js",
  "Swift (iOS)",
  "Kotlin (Android)",
  "Python / FastAPI",
  "PostgreSQL / Supabase",
  "AWS / Docker",
];

// Order matches home.pricing.tiers in messages/*.json.
const TIER_META = [
  { id: "backlog-sprint", price: 12500, serviceType: "Software Development Sprint" },
  { id: "vibe-hardening", price: 14500, serviceType: "Software Refactoring & Architecture" },
  { id: "mvp-sprint", price: 25000, serviceType: "Mobile App Development" },
];
const FEATURED_TIER = 1;

const PROCESS_IMAGES = [
  "/media/process-1.jpg",
  "/media/process-2.jpg",
  "/media/process-3.jpg",
  "/media/process-4.jpg",
];

const BEFORE_CODE = "const { data } = await supabase.from('users').select('*'); // Client-exposed key";
const AFTER_CODE = [
  "export const getUserProfile = async (session: AuthSession): Promise<UserDTO> => {",
  "  return await db.transaction(async (tx) => { /* RLS Enforced + Indexed */ });",
  "};",
];

const card = "rounded-[var(--radius-md)] bg-[var(--surface)]";
const pill =
  "inline-flex items-center rounded-full border border-[var(--rule)] px-3 py-1 text-[length:var(--text-xs)] font-medium";
const darkBtn =
  "inline-flex items-center justify-center gap-2 rounded-full bg-[var(--ink)] px-6 py-3.5 text-[length:var(--text-sm)] font-medium text-white transition hover:bg-[var(--accent)]";
const lightBtn =
  "inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-[length:var(--text-sm)] font-medium text-[var(--ink)] transition hover:bg-[var(--accent)] hover:text-white";

function AccentDot({ className = "" }: { className?: string }) {
  return <span aria-hidden="true" className={`inline-block h-2 w-2 shrink-0 rounded-full bg-[var(--accent)] ${className}`} />;
}

function SectionHead({
  eyebrow,
  display,
  title,
  aside,
  dark = false,
}: {
  eyebrow: string;
  display: string;
  title?: string;
  aside?: React.ReactNode;
  dark?: boolean;
}) {
  return (
    <div className="reveal mb-14 grid grid-cols-1 items-end gap-8 lg:grid-cols-12">
      <div className="lg:col-span-8">
        <p className={`eyebrow mb-5 flex items-center gap-2 ${dark ? "text-white/60" : "text-[var(--ink-muted)]"}`}>
          <AccentDot />
          {eyebrow}
        </p>
        <h2 className="display-md">{display}</h2>
      </div>
      <div className="lg:col-span-4">
        {aside}
        {title && (
          <p className={`text-[length:var(--text-md)] leading-snug ${dark ? "text-white/70" : "text-[var(--ink-muted)]"}`}>
            {title}
          </p>
        )}
      </div>
    </div>
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home.meta" });
  return {
    title: t("title"),
    description: t("description"),
    keywords: t("keywords"),
    alternates: {
      canonical: `${SITE_URL}/${locale}`,
      languages: {
        en: `${SITE_URL}/en`,
        fr: `${SITE_URL}/fr`,
        "x-default": `${SITE_URL}/en`,
      },
    },
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
      url: `${SITE_URL}/${locale}`,
      siteName: "Taku-Media",
      locale: locale === "fr" ? "fr_CA" : "en_CA",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("ogTitle"),
      description: t("ogDescription"),
    },
  };
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");
  const tNav = await getTranslations("nav");

  const heroTags = t.raw("hero.tags") as string[];
  const problemCards = t.raw("problem.cards") as Card[];
  const overhaulPoints = t.raw("overhaul.points") as string[];
  const mobileCards = t.raw("mobile.cards") as MobileCard[];
  const tiers = t.raw("pricing.tiers") as Tier[];
  const steps = t.raw("process.steps") as Step[];
  const stepTags = t.raw("process.tags") as string[][];
  const faqs = t.raw("faq.items") as Faq[];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(
          homeGraphLd({
            path: `/${locale}`,
            description: t("meta.orgDescription"),
            services: tiers.map((tier, i) => ({
              id: TIER_META[i].id,
              name: tier.name,
              serviceType: TIER_META[i].serviceType,
              description: tier.body,
              price: TIER_META[i].price,
            })),
            faqs,
          }),
        )}
      />

      {/* HERO */}
      <section className="pt-4 md:pt-6">
        <div className="site-grid">
          <p aria-hidden="true" className="display flex select-none justify-between pb-4 md:pb-6">
            <span>Taku</span>
            <span>
              Media<sup className="align-top text-[0.32em] font-medium">®</sup>
            </span>
          </p>

          <div className="relative flex min-h-[640px] flex-col overflow-hidden rounded-[var(--radius-lg)] bg-[var(--night)] text-white md:min-h-[min(84vh,820px)]">
            <Image
              src="/media/hero-prism.jpg"
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            <video
              aria-hidden="true"
              className="home-loop-video absolute inset-0 h-full w-full object-cover"
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              poster="/media/hero-prism.jpg"
            >
              <source src="/media/hero-prism-loop.mp4" type="video/mp4" />
            </video>
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/10"
            />

            <ul className="relative z-10 mx-5 grid grid-cols-2 border-b border-white/20 md:mx-10 md:grid-cols-4">
              {heroTags.map((tag) => (
                <li key={tag} className="py-4 text-center text-[length:var(--text-xs)] font-medium md:text-[length:var(--text-sm)]">
                  {tag}
                </li>
              ))}
            </ul>

            <div className="relative z-10 mt-auto grid grid-cols-1 items-end gap-8 p-5 md:p-10 lg:grid-cols-12">
              <div className="space-y-5 lg:col-span-8">
                <p className="eyebrow text-white/70">{t("hero.eyebrow")}</p>
                <h1 className="max-w-4xl text-[clamp(2.25rem,5.2vw,4.75rem)] font-semibold leading-[0.98] tracking-[-0.045em]">
                  {t("hero.titleLead")} <span className="text-white/55">{t("hero.titleAccent")}</span>
                </h1>
                <p className="max-w-2xl text-[length:var(--text-base)] leading-relaxed text-white/75">{t("hero.body")}</p>
                <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                  <a href="#book" className={lightBtn}>
                    {t("hero.ctaPrimary")}
                  </a>
                  <a
                    href="#pricing"
                    className="glass inline-flex items-center justify-center rounded-full px-6 py-3.5 text-[length:var(--text-sm)] font-medium hover:bg-white/25"
                  >
                    {t("hero.ctaSecondary")}
                  </a>
                </div>
              </div>
              <div className="flex lg:col-span-4 lg:justify-end">
                <a href="#book" className="glass flex items-center gap-3 rounded-[var(--radius-sm)] p-2.5 pr-5 hover:bg-white/25">
                  <span className="relative grid h-11 w-11 place-items-center rounded-[10px] bg-white text-[var(--ink)]">
                    <span className="text-[13px] font-semibold tracking-[-0.04em]">TM</span>
                    <span
                      aria-hidden="true"
                      className="absolute -right-1 -top-1 h-3 w-3 animate-pulse rounded-full border-2 border-[var(--night)] bg-[var(--accent)]"
                    />
                  </span>
                  <span className="leading-tight">
                    <span className="block text-[length:var(--text-sm)] font-semibold">{t("hero.chipTitle")}</span>
                    <span className="block text-[length:var(--text-xs)] text-white/65">{t("hero.chipBody")}</span>
                  </span>
                </a>
              </div>
            </div>

            <Marquee
              className="relative z-10 border-t border-white/15 py-3 text-white/55"
              items={Array.from({ length: 6 }, (_, i) => (
                <span key={i} className="eyebrow px-6">
                  {t("hero.marquee")}
                </span>
              ))}
            />
          </div>

          <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center">
            <p className="eyebrow shrink-0 text-[var(--ink-muted)]">{t("hero.stackLabel")}</p>
            <Marquee
              className="min-w-0 flex-1 [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]"
              items={STACK.map((item) => (
                <span key={item} className={`${pill} mr-3 bg-[var(--surface)]`}>
                  {item}
                </span>
              ))}
            />
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="py-24 md:py-32">
        <div className="site-grid">
          <SectionHead eyebrow={t("problem.label")} display={t("problem.display")} title={t("problem.title")} />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {problemCards.map((c, i) => (
              <div key={c.title} className={`${card} reveal flex min-h-[320px] flex-col p-8`}>
                <p className="eyebrow text-[var(--ink-faint)]">0{i + 1}</p>
                <p className="mt-auto text-[clamp(2rem,3.4vw,2.75rem)] font-semibold leading-none tracking-[-0.045em]">
                  {c.stat}
                </p>
                <h3 className="mt-5 text-[length:var(--text-md)] font-semibold tracking-[-0.03em]">{c.title}</h3>
                <p className="mt-2 text-[length:var(--text-sm)] leading-relaxed text-[var(--ink-muted)]">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FLAGSHIP: VIBE-CODE OVERHAUL */}
      <section id="vibe-hardening" className="scroll-mt-16 pb-24 md:pb-32">
        <div className="site-grid">
          <SectionHead
            eyebrow={t("overhaul.badge")}
            display={t("overhaul.display")}
            aside={<p className="mb-4 text-[length:var(--text-lg)] font-semibold leading-[1.05] tracking-[-0.04em]">{t("overhaul.title")}</p>}
          />
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
            <div className="reveal relative min-h-[420px] overflow-hidden rounded-[var(--radius-lg)] lg:col-span-7">
              <Image
                src="/media/work-overhaul.jpg"
                alt=""
                fill
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="object-cover"
              />
              <span className="absolute bottom-5 left-5 inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-[length:var(--text-xs)] font-medium">
                <AccentDot />
                {t("overhaul.codeLabel")}
              </span>
            </div>

            <div className={`${card} reveal flex flex-col gap-6 p-6 sm:p-8 lg:col-span-5`}>
              <p className="leading-relaxed text-[var(--ink-muted)]">{t("overhaul.body")}</p>
              <ul className="space-y-3 text-[length:var(--text-sm)]">
                {overhaulPoints.map((point, i) => (
                  <li key={point} className="flex items-start gap-3 border-t border-[var(--rule)] pt-3">
                    <span className="eyebrow pt-0.5 text-[var(--accent)]">0{i + 1}</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              <div className="space-y-2 font-mono text-[11px] leading-relaxed">
                <div className="overflow-x-auto rounded-[var(--radius-sm)] bg-[var(--surface-sunk)] p-4">
                  <p className="text-[var(--accent)]">{t("overhaul.beforeLabel")}</p>
                  <pre className="whitespace-pre-wrap text-[var(--ink-muted)]">{BEFORE_CODE}</pre>
                  <p className="pt-2 text-[var(--accent)]">{t("overhaul.beforeResult")}</p>
                </div>
                <div className="overflow-x-auto rounded-[var(--radius-sm)] bg-[var(--night)] p-4 text-white">
                  <p className="text-white/55">{t("overhaul.afterLabel")}</p>
                  <pre className="whitespace-pre-wrap">{AFTER_CODE.join("\n")}</pre>
                  <p className="pt-2 text-white/55">{t("overhaul.afterResult")}</p>
                </div>
              </div>
              <a href="#book" className={`${darkBtn} mt-auto self-start`}>
                {t("overhaul.cta")} <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* MOBILE */}
      <section id="mobile" className="scroll-mt-16 pb-24 md:pb-32">
        <div className="site-grid">
          <SectionHead eyebrow={t("mobile.label")} display={t("mobile.display")} title={t("mobile.body")} />
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
            <div className="flex flex-col gap-4 lg:col-span-7">
              <h3 className="reveal max-w-2xl text-[length:var(--text-lg)] font-semibold leading-[1.05] tracking-[-0.04em]">
                {t("mobile.title")}
              </h3>
              {mobileCards.map((c) => (
                <div key={c.title} className={`${card} reveal p-6 sm:p-8`}>
                  <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                    <span className={`${pill} gap-2 bg-[var(--surface-sunk)]`}>
                      <AccentDot />
                      {c.badge}
                    </span>
                    <span className="eyebrow text-[var(--ink-faint)]">{c.stack}</span>
                  </div>
                  <h4 className="mb-2 text-[length:var(--text-md)] font-semibold tracking-[-0.03em]">{c.title}</h4>
                  <p className="mb-6 text-[length:var(--text-sm)] leading-relaxed text-[var(--ink-muted)]">{c.body}</p>
                  <ul className="mb-6 flex flex-wrap gap-2">
                    {c.points.map((point) => (
                      <li key={point} className={pill}>
                        {point}
                      </li>
                    ))}
                  </ul>
                  <p className="eyebrow border-t border-[var(--rule)] pt-4">{c.delivery}</p>
                </div>
              ))}
            </div>
            <div className="reveal relative min-h-[420px] overflow-hidden rounded-[var(--radius-lg)] lg:col-span-5">
              <Image
                src="/media/work-mobile.jpg"
                alt=""
                fill
                sizes="(min-width: 1024px) 42vw, 100vw"
                className="object-cover"
              />
              <span className="absolute bottom-5 left-5 inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-[length:var(--text-xs)] font-medium">
                <AccentDot />
                iOS · Android
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="scroll-mt-16 bg-[var(--night)] py-24 text-white md:py-32">
        <div className="site-grid">
          <SectionHead
            dark
            eyebrow={t("process.label")}
            display={t("process.display")}
            aside={
              <p aria-hidden="true" className="display-md mb-4 text-right font-normal text-white/90">
                (0{steps.length})
              </p>
            }
          />
          <p className="reveal -mt-6 mb-14 text-[length:var(--text-md)] text-white/70">{t("process.title")}</p>
          <ol>
            {steps.map((step, i) => (
              <li
                key={step.title}
                className="reveal grid grid-cols-1 gap-6 border-t border-[var(--night-rule)] py-10 lg:grid-cols-12"
              >
                <p className="eyebrow text-white/50 lg:col-span-3">{step.label}</p>
                <div className="lg:col-span-5">
                  <h3 className="mb-5 flex items-center gap-3 text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-none tracking-[-0.045em]">
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[var(--accent)] text-[11px] font-semibold tracking-normal">
                      {i + 1}
                    </span>
                    {step.title}
                  </h3>
                  <ul className="flex flex-wrap gap-2">
                    {stepTags[i]?.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full bg-[var(--night-raised)] px-3 py-1 text-[length:var(--text-xs)] text-white/75"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex gap-5 lg:col-span-4">
                  <div className="relative aspect-square w-24 shrink-0 overflow-hidden rounded-[var(--radius-sm)] sm:w-32">
                    <Image src={PROCESS_IMAGES[i]} alt="" fill sizes="128px" className="object-cover" />
                  </div>
                  <p className="text-[length:var(--text-sm)] leading-relaxed text-white/65">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="scroll-mt-16 py-24 md:py-32">
        <div className="site-grid">
          <SectionHead eyebrow={t("pricing.label")} display={t("pricing.display")} title={t("pricing.title")} />
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            {tiers.map((tier, i) => {
              const featured = i === FEATURED_TIER;
              return (
                <div
                  key={tier.name}
                  className={`reveal flex flex-col rounded-[var(--radius-lg)] p-8 md:p-10 ${
                    featured ? "bg-[var(--night)] text-white" : "bg-[var(--surface)]"
                  }`}
                >
                  <div className="mb-10 flex flex-wrap items-center justify-between gap-2">
                    <span
                      className={`eyebrow rounded-full border px-3 py-1 ${
                        featured ? "border-white/20 text-white/70" : "border-[var(--rule)] text-[var(--ink-muted)]"
                      }`}
                    >
                      {tier.label}
                    </span>
                    {featured && (
                      <span className="eyebrow rounded-full bg-[var(--accent)] px-3 py-1 text-white">
                        {t("pricing.featured")}
                      </span>
                    )}
                  </div>
                  <h3 className="text-[length:var(--text-md)] font-semibold tracking-[-0.03em]">{tier.name}</h3>
                  <p className="mt-3 text-[clamp(2.5rem,4vw,3.5rem)] font-semibold leading-none tracking-[-0.05em]">
                    {tier.price}
                  </p>
                  <p className={`mt-2 text-[length:var(--text-sm)] ${featured ? "text-white/60" : "text-[var(--ink-muted)]"}`}>
                    {tier.terms}
                  </p>
                  <p
                    className={`mt-6 text-[length:var(--text-sm)] leading-relaxed ${
                      featured ? "text-white/70" : "text-[var(--ink-muted)]"
                    }`}
                  >
                    {tier.body}
                  </p>
                  <ul
                    className={`my-8 space-y-3 border-t pt-6 text-[length:var(--text-sm)] ${
                      featured ? "border-white/15" : "border-[var(--rule)]"
                    }`}
                  >
                    {tier.points.map((point) => (
                      <li key={point} className="flex items-start gap-3">
                        <span aria-hidden="true" className="text-[var(--accent)]">
                          ✓
                        </span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                  <a href="#book" className={`${featured ? lightBtn : darkBtn} mt-auto w-full`}>
                    {tier.cta}
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="scroll-mt-16 pb-24 md:pb-32">
        <div className="site-grid grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="reveal lg:sticky lg:top-24 lg:col-span-5 lg:self-start">
            <p className="eyebrow mb-5 flex items-center gap-2 text-[var(--ink-muted)]">
              <AccentDot />
              {t("faq.label")}
            </p>
            <h2 className="text-[clamp(2.5rem,5vw,4.5rem)] font-semibold leading-[0.95] tracking-[-0.045em]">
              {t("faq.display")}
            </h2>
            <p className="mt-5 text-[length:var(--text-md)] text-[var(--ink-muted)]">{t("faq.title")}</p>
          </div>
          <div className="space-y-3 lg:col-span-7">
            {faqs.map((faq, i) => (
              <details key={faq.question} className={`${card} faq-item reveal group`}>
                <summary className="flex cursor-pointer list-none items-start gap-5 p-6 md:p-7">
                  <span className="eyebrow pt-1.5 text-[var(--ink-faint)]">{i + 1}</span>
                  <h3 className="flex-1 text-[length:var(--text-md)] font-semibold leading-snug tracking-[-0.03em]">
                    {faq.question}
                  </h3>
                  <span
                    aria-hidden="true"
                    className="faq-icon grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[var(--surface-sunk)] text-lg leading-none transition-transform group-hover:bg-[var(--ink)] group-hover:text-white"
                  >
                    +
                  </span>
                </summary>
                <p className="px-6 pb-7 pl-[3.25rem] text-[length:var(--text-sm)] leading-relaxed text-[var(--ink-muted)] md:px-7 md:pl-[3.5rem]">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* BOOK */}
      <section id="book" className="scroll-mt-16 pb-24">
        <div className="site-grid space-y-4">
          <div className="reveal relative overflow-hidden rounded-[var(--radius-lg)] bg-[var(--night)] px-6 py-20 text-white md:px-12 md:py-28">
            <Image src="/media/cta-bg.jpg" alt="" fill sizes="100vw" className="object-cover" />
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
            <div className="relative z-10 max-w-4xl">
              <p className="eyebrow mb-6 flex items-center gap-2 text-white/70">
                <AccentDot className="animate-pulse" />
                {t("book.badge")}
              </p>
              <h2 className="display-md">{t("book.display")}</h2>
              <p className="mt-8 max-w-xl text-[length:var(--text-md)] font-medium leading-snug">{t("book.title")}</p>
              <p className="mt-3 max-w-xl text-white/70">{t("book.body")}</p>
              <a href="#book-cal" className={`${lightBtn} mt-8`}>
                {t("book.cta")} <span aria-hidden="true">↓</span>
              </a>
            </div>
          </div>
          <div id="book-cal" className="scroll-mt-20">
            <p className="eyebrow mb-4 mt-6 text-center text-[var(--ink-muted)]">{t("book.prep")}</p>
            <CalEmbed bookingUrl={`${BOOKING_URL}?theme=light`} title={tNav("bookCall")} />
          </div>
        </div>
      </section>
    </>
  );
}
