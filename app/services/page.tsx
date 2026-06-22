import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Services from "@/components/Services";
import ServiceArea from "@/components/ServiceArea";
import CtaBand from "@/components/CtaBand";
import { site } from "@/site.config";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("services");

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow={site.servicesIntro.eyebrow}
        title="Lawn care, landscaping & seasonal services."
        sub="Everything your property needs from one dependable crew, from weekly mowing to cleanups and winter snow removal, across Elkhart and the Michiana area."
      />
      <Services />
      <ServiceArea />
      <CtaBand />
    </>
  );
}
