import { notFound } from "next/navigation";

// Unknown paths under a locale render [locale]/not-found.tsx inside the site
// layout instead of Next's bare root 404.
export default function CatchAll() {
  notFound();
}
