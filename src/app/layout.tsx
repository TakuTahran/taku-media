import type { ReactNode } from "react";
import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
};

// next-intl owns <html>/<body> in [locale]/layout.
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
