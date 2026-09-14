# Taku-Media

Next.js (App Router) site for Taku-Media, an AI consulting practice in Montreal.

## Stack

- Next.js + TypeScript + Tailwind CSS
- `next-intl` (`/en`, `/fr`)
- MDX services in `content/services/{locale}`
- Deploy target: Vercel

## Develop

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Locale middleware redirects `/` from `Accept-Language`.

Dev-only control: **Toggle grid** (bottom right) shows or hides column hairlines.

## Content

- Service pages: `content/services/en/*.mdx` and `content/services/fr/*.mdx`
- Set `published: true` only when copy is unique and substantive
- Company directory: `content/companies.json`
- UI strings: `messages/en.json`, `messages/fr.json`
- Booking URL: `src/lib/constants.ts` → `BOOKING_URL`

## Docs

- [Local SEO checklist](docs/local-seo-checklist.md) (off-site work)

## Note on Bill 96

Confirm your Charter of the French Language obligations with counsel. This repo structures bilingual routes; it is not legal advice.
