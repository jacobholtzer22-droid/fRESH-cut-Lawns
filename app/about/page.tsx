import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import WhyUs from "@/components/WhyUs";
import ServiceArea from "@/components/ServiceArea";
import Reviews from "@/components/Reviews";
import CtaBand from "@/components/CtaBand";
import { site } from "@/site.config";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("about");

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow={site.whyUs.eyebrow}
        title="Locally owned. Personally run."
        sub="Lawn care done the way it should be: show up on schedule, do clean work, and keep you in the loop. Here's the story behind Fresh Cut Lawns and the Michiana yards we keep sharp."
      />
      <WhyUs />
      <ServiceArea />
      <Reviews />
      <CtaBand />
    </>
  );
}
