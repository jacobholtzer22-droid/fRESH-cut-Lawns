import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Work from "@/components/Work";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import CtaBand from "@/components/CtaBand";
import { site } from "@/site.config";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("gallery");

export default function GalleryPage() {
  return (
    <>
      <PageHeader
        eyebrow={site.work.eyebrow}
        title="Our finished work."
        sub="Recent lawns and properties we keep sharp across Elkhart, Granger, and South Bend. Take a look."
      />
      <Work />
      {/* Config-gated before/after, renders only when a real before/after pair is added. */}
      <BeforeAfterSlider />
      <CtaBand />
    </>
  );
}
