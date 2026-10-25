// Plain iframe embed; Cal.com's embed.js isn't needed for it and throws
// "Cal is not defined" when loaded without its init snippet.
export function CalEmbed({ bookingUrl, title }: { bookingUrl: string; title: string }) {
  const embedSrc = bookingUrl.includes("?")
    ? `${bookingUrl}&embed=true`
    : `${bookingUrl}?embed=true`;

  return (
    <div className="overflow-hidden rounded-[var(--radius-md)] border border-[var(--rule)] bg-[var(--surface)]">
      <iframe title={title} src={embedSrc} className="h-[680px] w-full border-0" loading="lazy" />
    </div>
  );
}
