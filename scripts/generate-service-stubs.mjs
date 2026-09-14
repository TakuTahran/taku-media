import fs from "fs";
import path from "path";

const services = [
  {
    slug: "ai-customer-support",
    frSlug: "support-client-ia",
    category: "customer-experience",
    title: "AI customer support",
    h1: "AI customer support for chat, email, and social",
    primaryKeyword: "AI customer support Montreal",
    tools: ["Intercom", "Zendesk", "Voiceflow"],
    related: ["conversational-website", "workflow-automation", "ai-implementation"],
    summary:
      "Tier-1 support agents across chat, email, and social with clear handoff rules.",
  },
  {
    slug: "conversational-website",
    frSlug: "site-conversationnel",
    category: "customer-experience",
    title: "Conversational website",
    h1: "Conversational websites that capture qualified leads",
    primaryKeyword: "conversational website Montreal",
    tools: ["Voiceflow", "Typebot", "Custom GPT"],
    related: ["ai-customer-support", "crm-lead-scoring", "ai-strategy"],
    summary:
      "Turn a static site into an interactive guide that qualifies and routes leads.",
  },
  {
    slug: "ai-copywriting",
    frSlug: "redaction-ia",
    category: "marketing",
    title: "AI copywriting",
    h1: "On-brand AI copywriting for blogs, email, and ads",
    primaryKeyword: "AI copywriting Montreal",
    tools: ["Claude", "ChatGPT", "Jasper"],
    related: ["ai-seo", "social-media-management", "ai-training"],
    summary:
      "Brand-guided generation for blog, email, and ad copy with human review gates.",
  },
  {
    slug: "social-media-management",
    frSlug: "gestion-reseaux-sociaux",
    category: "marketing",
    title: "Social media management",
    h1: "AI-assisted social media batching and scheduling",
    primaryKeyword: "AI social media management Montreal",
    tools: ["Buffer", "Later", "ChatGPT"],
    related: ["ai-copywriting", "visual-content", "ai-implementation"],
    summary:
      "Batch creation, scheduling, and engagement analysis with human approval.",
  },
  {
    slug: "ai-seo",
    frSlug: "seo-ia",
    category: "marketing",
    title: "AI SEO",
    h1: "AI SEO for search intent and page structure",
    primaryKeyword: "AI SEO Montreal",
    tools: ["Surfer", "Ahrefs", "Claude"],
    related: ["ai-copywriting", "ai-strategy", "conversational-website"],
    summary:
      "Search intent analysis, keyword structure, and page optimization with AI assists.",
  },
  {
    slug: "visual-content",
    frSlug: "contenu-visuel",
    category: "marketing",
    title: "Visual content",
    h1: "Brand-consistent marketing image generation",
    primaryKeyword: "AI visual content Montreal",
    tools: ["Midjourney", "Firefly", "Figma"],
    related: ["social-media-management", "video-generation", "ai-training"],
    summary:
      "Marketing image generation and brand-consistent collateral workflows.",
  },
  {
    slug: "video-generation",
    frSlug: "generation-video",
    category: "marketing",
    title: "Video generation",
    h1: "Avatar and voice video for marketing and training",
    primaryKeyword: "AI video generation Montreal",
    tools: ["HeyGen", "ElevenLabs", "Descript"],
    related: ["visual-content", "ai-training", "ai-copywriting"],
    summary:
      "Avatar and voice video pipelines for marketing clips and internal training.",
  },
  {
    slug: "meeting-transcription",
    frSlug: "transcription-reunions",
    category: "productivity",
    title: "Meeting transcription",
    h1: "Meeting transcription with summaries and action items",
    primaryKeyword: "AI meeting transcription Montreal",
    tools: ["Fireflies", "Otter", "Notion AI"],
    related: ["knowledge-management", "email-management", "ai-implementation"],
    summary:
      "Call summaries and action item extraction routed into your existing tools.",
  },
  {
    slug: "email-management",
    frSlug: "gestion-courriel",
    category: "productivity",
    title: "Email management",
    h1: "AI email triage and draft assistance",
    primaryKeyword: "AI email management Montreal",
    tools: ["Superhuman", "Shortwave", "Outlook Copilot"],
    related: ["writing-assistance", "meeting-transcription", "workflow-automation"],
    summary:
      "Triage, drafting, and surfacing urgent threads without losing human control.",
  },
  {
    slug: "writing-assistance",
    frSlug: "aide-redaction",
    category: "productivity",
    title: "Writing assistance",
    h1: "Tone and grammar consistency for client communications",
    primaryKeyword: "AI writing assistance Montreal",
    tools: ["Claude", "Grammarly", "Word"],
    related: ["email-management", "ai-copywriting", "ai-training"],
    summary:
      "Tone and grammar consistency across client-facing communications.",
  },
  {
    slug: "knowledge-management",
    frSlug: "gestion-connaissances",
    category: "productivity",
    title: "Knowledge management",
    h1: "SOP synthesis and internal AI search",
    primaryKeyword: "AI knowledge management Montreal",
    tools: ["Notion", "Guru", "Custom RAG"],
    related: ["meeting-transcription", "ai-training", "ai-implementation"],
    summary:
      "SOP synthesis and internal search over the documents your team already has.",
  },
  {
    slug: "crm-lead-scoring",
    frSlug: "score-leads-crm",
    category: "sales",
    title: "CRM lead scoring",
    h1: "CRM lead scoring and outreach timing",
    primaryKeyword: "AI CRM lead scoring Montreal",
    tools: ["HubSpot", "Salesforce", "Clay"],
    related: ["sales-call-analytics", "conversational-website", "ai-implementation"],
    summary:
      "Conversion-likelihood scoring and outreach timing inside your CRM.",
  },
  {
    slug: "sales-call-analytics",
    frSlug: "analyse-appels-vente",
    category: "sales",
    title: "Sales call analytics",
    h1: "Sales call analytics for deal risk and coaching",
    primaryKeyword: "AI sales call analytics Montreal",
    tools: ["Gong", "Chorus", "Fireflies"],
    related: ["crm-lead-scoring", "meeting-transcription", "ai-training"],
    summary:
      "Deal-risk detection and rep coaching from recorded sales calls.",
  },
  {
    slug: "ai-recruiting",
    frSlug: "recrutement-ia",
    category: "sales",
    title: "AI recruiting",
    h1: "Resume parsing against job requirements",
    primaryKeyword: "AI recruiting Montreal",
    tools: ["Ashby", "Greenhouse", "Custom GPT"],
    related: ["knowledge-management", "workflow-automation", "ai-strategy"],
    summary:
      "Resume parsing against job requirements with human shortlist review.",
  },
  {
    slug: "workflow-automation",
    frSlug: "automatisation-des-flux",
    category: "operations",
    title: "Workflow automation",
    h1: "Workflow automation for Montreal businesses",
    primaryKeyword: "workflow automation Montreal",
    tools: ["n8n", "Make", "Zapier"],
    related: ["ai-bookkeeping", "business-intelligence", "ai-implementation"],
    summary:
      "Connect disconnected systems with n8n, Make, or Zapier so data stops living in inboxes.",
  },
  {
    slug: "ai-bookkeeping",
    frSlug: "comptabilite-ia",
    category: "operations",
    title: "AI bookkeeping",
    h1: "AI bookkeeping for expense categorization and cash flow",
    primaryKeyword: "AI bookkeeping Montreal",
    tools: ["QuickBooks", "Xero", "Ramp"],
    related: ["expense-auditing", "business-intelligence", "workflow-automation"],
    summary:
      "Expense categorization and cash flow forecasting assists on top of your books.",
  },
  {
    slug: "business-intelligence",
    frSlug: "intelligence-daffaires",
    category: "operations",
    title: "Business intelligence",
    h1: "Plain-language querying of company data",
    primaryKeyword: "AI business intelligence Montreal",
    tools: ["Metabase", "Power BI", "Claude"],
    related: ["ai-bookkeeping", "workflow-automation", "ai-strategy"],
    summary:
      "Ask business questions in plain language against data you already store.",
  },
  {
    slug: "expense-auditing",
    frSlug: "audit-depenses",
    category: "operations",
    title: "Expense auditing",
    h1: "Spend anomaly detection and budget enforcement",
    primaryKeyword: "AI expense auditing Montreal",
    tools: ["Ramp", "Expensify", "Custom rules"],
    related: ["ai-bookkeeping", "business-intelligence", "ai-implementation"],
    summary:
      "Spend anomaly detection and budget enforcement with reviewable alerts.",
  },
  {
    slug: "translation-localization",
    frSlug: "traduction-localisation",
    category: "operations",
    title: "Translation and localization",
    h1: "EN/FR translation for contracts, support, and marketing",
    primaryKeyword: "AI translation localization Montreal",
    tools: ["DeepL", "Phrase", "Claude"],
    related: ["ai-copywriting", "knowledge-management", "ai-training"],
    summary:
      "Contracts, support docs, and marketing for English and French markets.",
  },
  {
    slug: "ai-software-prototyping",
    frSlug: "prototypage-logiciel-ia",
    category: "operations",
    title: "AI software prototyping",
    h1: "AI-native prototyping for internal tools",
    primaryKeyword: "AI software prototyping Montreal",
    tools: ["Cursor", "v0", "Supabase"],
    related: ["workflow-automation", "ai-implementation", "ai-strategy"],
    summary:
      "Fast internal tool prototypes using AI-assisted development, not platform builds for sale.",
  },
  {
    slug: "ai-strategy",
    frSlug: "strategie-ia",
    category: "foundation",
    title: "AI strategy",
    h1: "AI strategy for operators who need a clear sequence",
    primaryKeyword: "AI strategy Montreal",
    tools: ["Workshops", "Audits"],
    related: ["ai-implementation", "ai-training", "workflow-automation"],
    summary:
      "Prioritize use cases, constraints, and a sequenced plan before buying more tools.",
  },
  {
    slug: "ai-implementation",
    frSlug: "mise-en-oeuvre-ia",
    category: "foundation",
    title: "AI implementation",
    h1: "AI implementation that wires tools into daily work",
    primaryKeyword: "AI implementation Montreal",
    tools: ["n8n", "Vendor APIs", "SOPs"],
    related: ["ai-strategy", "ai-training", "workflow-automation"],
    summary:
      "Hands-on integration of selected AI tools into the workflows your team already runs.",
  },
  {
    slug: "ai-training",
    frSlug: "formation-ia",
    category: "foundation",
    title: "AI training",
    h1: "AI training for teams that need working habits",
    primaryKeyword: "AI training Montreal",
    tools: ["Workshops", "Playbooks"],
    related: ["ai-implementation", "ai-strategy", "knowledge-management"],
    summary:
      "Practical training so staff can use AI tools without inventing risky shortcuts.",
  },
];

const published = new Set([
  "workflow-automation",
  "ai-strategy",
  "ai-implementation",
  "ai-training",
  "ai-bookkeeping",
  "business-intelligence",
  "ai-customer-support",
  "conversational-website",
]);

function metaDesc(summary) {
  return summary.length <= 155 ? summary : summary.slice(0, 152) + "...";
}

function yamlList(items) {
  return items.map((t) => `  - ${t}`).join("\n");
}

for (const s of services) {
  const isPub = published.has(s.slug);
  const desc = metaDesc(s.summary).replace(/"/g, "");
  const summary = s.summary.replace(/"/g, "");

  const enBody = isPub
    ? "PLACEHOLDER_BODY"
    : "{/* TODO(tahran): write unique EN body copy before publishing */}";

  const en = `---
slug: ${s.slug}
category: ${s.category}
title: "${s.title}"
h1: "${s.h1}"
metaTitle: "${s.title} Montreal | Taku-Media"
metaDescription: "${desc}"
primaryKeyword: "${s.primaryKeyword}"
secondaryKeywords: []
searchIntent: commercial-investigation
summary: "${summary}"
tools:
${yamlList(s.tools)}
relatedServices:
${yamlList(s.related)}
priceFrom: null
published: ${isPub}
---

${enBody}
`;

  fs.writeFileSync(
    path.join("content/services/en", `${s.slug}.mdx`),
    en,
    "utf8",
  );

  const fr = `---
slug: ${s.frSlug}
category: ${s.category}
title: "${s.title}"
h1: "${s.h1}"
metaTitle: "${s.title} | Taku-Media"
metaDescription: "${desc}"
primaryKeyword: "${s.primaryKeyword}"
secondaryKeywords: []
searchIntent: commercial-investigation
summary: "${summary}"
tools:
${yamlList(s.tools)}
relatedServices:
${yamlList(s.related)}
priceFrom: null
published: false
---

{/* TODO(tahran): French body copy. Do not machine-translate and ship. */}
`;

  fs.writeFileSync(
    path.join("content/services/fr", `${s.frSlug}.mdx`),
    fr,
    "utf8",
  );
}

console.log(`wrote ${services.length} en + fr stubs`);
