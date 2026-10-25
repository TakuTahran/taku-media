"use client";

import { useEffect } from "react";
import { usePathname } from "@/i18n/navigation";

// Fades `.reveal` elements in as they scroll into view. The hidden state only
// applies once <html data-reveal> is set here, so content shows without JS.
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal:not(.is-visible)");
    if (!("IntersectionObserver" in window) || els.length === 0) return;

    document.documentElement.dataset.reveal = "";
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
