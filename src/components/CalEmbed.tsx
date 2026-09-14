"use client";

import { useEffect } from "react";

export function CalEmbed({ bookingUrl }: { bookingUrl: string }) {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://app.cal.com/embed/embed.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      script.remove();
    };
  }, []);

  // Cal.com embed via iframe fallback for reliability
  const embedSrc = bookingUrl.includes("?")
    ? `${bookingUrl}&embed=true`
    : `${bookingUrl}?embed=true`;

  return (
    <div className="border border-[var(--rule-strong)] bg-[var(--surface)]">
      <iframe
        title="Book a call"
        src={embedSrc}
        className="h-[640px] w-full border-0"
        loading="lazy"
      />
    </div>
  );
}
