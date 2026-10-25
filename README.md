# Taku-Media

Next.js (App Router) one-page site for Taku-Media: senior engineering pods, prototype production hardening, and iOS/Android app sprints.

## Stack

- Next.js + TypeScript + Tailwind CSS
- `next-intl` (`/en`, `/fr`)
- Hero video loop and section imagery generated with Higgsfield (`public/media/`)
- Deploy target: Vercel

## Develop

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Locale middleware redirects `/` from `Accept-Language`.

## Content

- All page copy (EN/FR): `messages/en.json` and `messages/fr.json` under `home`
- Page layout: `src/app/[locale]/page.tsx`
- Service IDs for structured data: `TIER_META` in `src/app/[locale]/page.tsx` (same order as `home.engagements.tiers`)
- Booking URL: `src/lib/constants.ts` → `BOOKING_URL`
- Media: `public/media/` (hero prism frame and loop, work/process photos, CTA background)
- Design tokens (colours, radii, type scale): `src/app/globals.css`

Old pages (`/about`, `/contact`, `/services/*`, `/ai-companies-montreal`) permanently redirect to the home page (see `next.config.ts`).

## Note on Bill 96

Confirm your Charter of the French Language obligations with counsel. This repo structures bilingual routes; it is not legal advice.
