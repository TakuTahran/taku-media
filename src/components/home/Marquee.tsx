import { Fragment, type ReactNode } from "react";

// Infinite horizontal ticker. The second copy is decorative so screen readers
// hear the items once; reduced-motion hides it and stops the animation.
export function Marquee({ items, className = "" }: { items: ReactNode[]; className?: string }) {
  const row = (hidden: boolean) => (
    <div aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {items.map((item, i) => (
        <Fragment key={i}>{item}</Fragment>
      ))}
    </div>
  );

  return (
    <div className={`overflow-hidden ${className}`}>
      <div className="marquee">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
