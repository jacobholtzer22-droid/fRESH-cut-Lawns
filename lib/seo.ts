import type { Metadata } from "next";
import { site } from "@/site.config";

type PageKey = keyof typeof site.seo.pages;

/**
 * Build Next.js Metadata for a page from site.config's per-page SEO.
 * metadataBase (set in app/layout.tsx) resolves canonical/og URLs to absolute.
 */
export function pageMetadata(key: PageKey): Metadata {
  const page = site.seo.pages[key];
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: page.path },
    openGraph: {
      title: page.title,
      description: page.description,
      url: page.path,
      siteName: site.seo.siteName,
      type: "website",
    },
  };
}
