import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Work from "@/components/Work";
import WhyUs from "@/components/WhyUs";
import Reviews from "@/components/Reviews";
import CtaBand from "@/components/CtaBand";

// Home metadata is inherited from the layout default (seo.pages.home).
export default function Home() {
  return (
    <>
      <Hero />
      <Services compact />
      <Work teaser limit={3} />
      <WhyUs />
      <Reviews />
      <CtaBand />
    </>
  );
}
