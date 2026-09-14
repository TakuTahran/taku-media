import { MDXRemote } from "next-mdx-remote/rsc";
import { Link } from "@/i18n/navigation";
import type { ComponentProps } from "react";

function MdxLink({ href = "", children, ...props }: ComponentProps<"a">) {
  const isInternal = href.startsWith("/") && !href.startsWith("//");
  if (isInternal) {
    // Strip locale prefix if present; next-intl Link adds it.
    const cleaned = href.replace(/^\/(en|fr)/, "") || "/";
    return (
      <Link href={cleaned} {...props}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} rel="noopener noreferrer" {...props}>
      {children}
    </a>
  );
}

const components = {
  a: MdxLink,
  h2: (props: ComponentProps<"h2">) => <h2 {...props} />,
  h3: (props: ComponentProps<"h3">) => <h3 {...props} />,
};

export function ServiceMdx({ source }: { source: string }) {
  return <MDXRemote source={source} components={components} />;
}
