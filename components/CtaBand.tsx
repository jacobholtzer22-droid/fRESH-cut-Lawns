import Link from "next/link";
import { Phone } from "lucide-react";
import { site } from "@/site.config";

/** Closing CTA band used at the bottom of most pages. */
export default function CtaBand() {
  const { ctaBand, cta, business } = site;

  return (
    <section className="bg-evergreen-deep py-20 text-bone sm:py-24">
      <div className="container-page flex flex-col items-center gap-7 text-center">
        <div>
          <h2 className="h-display text-3xl text-bone sm:text-4xl">
            {ctaBand.heading}
          </h2>
          <p className="mx-auto mt-3 max-w-md text-base text-bone/70">
            {ctaBand.sub}
          </p>
        </div>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Link href={cta.href} className="btn-primary px-7 py-4 text-base">
            {cta.label}
          </Link>
          <a href={business.phoneHref} className="btn-ghost px-7 py-4 text-base">
            <Phone className="h-4 w-4" aria-hidden="true" />
            {business.phoneDisplay}
          </a>
        </div>
      </div>
    </section>
  );
}
