import Link from "next/link";
import { MapPin } from "lucide-react";
import Section from "./Section";
import Reveal from "./Reveal";
import { site } from "@/site.config";

export default function ServiceArea() {
  const { serviceArea } = site;

  return (
    <Section id="service-area" tone="stone">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-center lg:gap-16">
        <Reveal>
          <p className="eyebrow mb-4">{serviceArea.eyebrow}</p>
          <h2 className="h-display text-3xl text-evergreen sm:text-4xl">
            {serviceArea.heading.split("\n").map((line, i) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
          </h2>
          <p className="mt-4 max-w-md text-base text-ink/70">
            {serviceArea.note}
          </p>
          <Link href={site.cta.href} className="btn-dark mt-7 px-7 py-4 text-base">
            {serviceArea.cta}
          </Link>
        </Reveal>

        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {serviceArea.towns.map((town, i) => (
            <Reveal
              as="li"
              key={town}
              delay={(i % 3) * 0.05}
              className="flex items-center gap-2.5 rounded-xl border border-evergreen/10 bg-bone px-4 py-3.5 text-[15px] font-medium text-ink"
            >
              <MapPin
                className="h-4 w-4 shrink-0 text-cedar-dark"
                aria-hidden="true"
              />
              {town}
            </Reveal>
          ))}
        </ul>
      </div>
    </Section>
  );
}
