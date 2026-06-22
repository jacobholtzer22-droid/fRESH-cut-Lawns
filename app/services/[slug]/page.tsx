import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHeader from "@/components/PageHeader";
import ServiceDetail from "@/components/ServiceDetail";
import CtaBand from "@/components/CtaBand";
import { site } from "@/site.config";

type Params = { params: { slug: string } };

export function generateStaticParams() {
  return site.services.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const service = site.services.find((s) => s.slug === params.slug);
  if (!service) return {};
  const path = `/services/${service.slug}`;
  const title = `${service.title} in Elkhart & the Michiana Area | ${site.business.name}`;
  return {
    title,
    description: service.description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description: service.description,
      url: path,
      siteName: site.seo.siteName,
      type: "website",
    },
  };
}

export default function ServicePage({ params }: Params) {
  const service = site.services.find((s) => s.slug === params.slug);
  if (!service) notFound();

  return (
    <>
      <PageHeader
        eyebrow="Services"
        title={service.title}
        breadcrumbs={[
          { label: "Services", href: "/services" },
          { label: service.title },
        ]}
      />
      <ServiceDetail service={service} />
      <CtaBand />
    </>
  );
}
