import type { MetadataRoute } from "next";
import { site } from "@/site.config";

const base = site.seo.url.replace(/\/$/, "");

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = Object.values(site.seo.pages).map((page) => ({
    url: `${base}${page.path}`,
    changeFrequency: "monthly" as const,
    priority: page.path === "/" ? 1 : 0.8,
  }));

  const servicePages = site.services.map((s) => ({
    url: `${base}/services/${s.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...pages, ...servicePages];
}
