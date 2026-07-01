import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Section from "./Section";
import ImagePlaceholder from "./ImagePlaceholder";
import Reveal from "./Reveal";
import { site } from "@/site.config";

type ServiceItem = (typeof site.services)[number];

function ServiceCard({
  service,
  photo = false,
}: {
  service: ServiceItem;
  photo?: boolean;
}) {
  const Icon = service.icon;

  // Photo card (used on the /services page): image on top, icon badge, copy below.
  if (photo) {
    return (
      <Link
        href={`/services/${service.slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-2xl border border-evergreen/10 bg-bone transition-shadow hover:shadow-lg"
      >
        <div className="relative aspect-[16/10] overflow-hidden">
          <ImagePlaceholder
            image={service.image}
            sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
            className="transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          />
          <span className="absolute bottom-3 left-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-evergreen text-bone shadow-md">
            <Icon className="h-5 w-5" aria-hidden="true" />
          </span>
        </div>
        <div className="flex flex-1 flex-col gap-3 p-6">
          <h3 className="font-display text-lg font-semibold tracking-tight text-evergreen">
            {service.title}
          </h3>
          <p className="text-[15px] leading-relaxed text-ink/65">
            {service.description}
          </p>
          <span className="mt-auto inline-flex items-center gap-1.5 pt-1 text-sm font-semibold text-cedar-dark">
            Learn more
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            />
          </span>
        </div>
      </Link>
    );
  }

  // Icon card (fallback, no photo).
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group flex h-full flex-col gap-4 bg-bone p-7 transition-colors hover:bg-limestone-deep"
    >
      <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-evergreen text-bone">
        <Icon className="h-6 w-6" aria-hidden="true" />
      </span>
      <h3 className="font-display text-lg font-semibold tracking-tight text-evergreen">
        {service.title}
      </h3>
      <p className="text-[15px] leading-relaxed text-ink/65">
        {service.description}
      </p>
      <span className="mt-auto inline-flex items-center gap-1.5 pt-1 text-sm font-semibold text-cedar-dark">
        Learn more
        <ArrowRight
          className="h-4 w-4 transition-transform group-hover:translate-x-1"
          aria-hidden="true"
        />
      </span>
    </Link>
  );
}

/**
 * Services overview. `compact` (home) = intro + card grid + "all services" link.
 * Full (/services) = intro + featured-service feature block + remaining cards + CTA.
 */
export default function Services({ compact = false }: { compact?: boolean }) {
  const { servicesIntro, services, cta } = site;
  const featured = services.find((s) => s.featured);
  const rest = services.filter((s) => !s.featured);

  return (
    <Section id="services" tone="stone" className="ashlar-wash">
      <Reveal className="max-w-2xl">
        <p className="eyebrow mb-4">{servicesIntro.eyebrow}</p>
        <h2 className="h-display text-3xl text-evergreen sm:text-[2.6rem]">
          {servicesIntro.heading}
        </h2>
        <p className="mt-4 text-lg text-ink/70">{servicesIntro.sub}</p>
      </Reveal>

      {/* Featured service feature block, only on the full /services page. */}
      {!compact && featured && (
        <Reveal className="mt-12 grid items-stretch gap-8 overflow-hidden rounded-2xl border border-evergreen/10 bg-bone lg:grid-cols-2">
          <div className="relative min-h-[20rem] lg:min-h-[26rem]">
            <ImagePlaceholder
              image={featured.image}
              sizes="(min-width: 1024px) 600px, 100vw"
            />
          </div>
          <div className="flex flex-col justify-center p-8 sm:p-10">
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-cedar/12 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-cedar-dark">
              <featured.icon className="h-4 w-4" aria-hidden="true" />
              Our specialty
            </span>
            <h3 className="h-display mt-5 text-2xl text-evergreen sm:text-3xl">
              {featured.title}
            </h3>
            <p className="mt-4 text-base leading-relaxed text-ink/70">
              {featured.intro}
            </p>
            <Link
              href={`/services/${featured.slug}`}
              className="group mt-7 inline-flex w-fit items-center gap-2 font-semibold text-cedar-dark hover:text-cedar"
            >
              Explore {featured.title.toLowerCase()}
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </div>
        </Reveal>
      )}

      {/* Card grid. Compact shows every service; full shows the non-featured ones. */}
      <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {(compact ? services : rest).map((service, i) => (
          <Reveal as="li" key={service.slug} delay={(i % 3) * 0.08}>
            <ServiceCard service={service} photo />
          </Reveal>
        ))}
      </ul>

      <div className="mt-10 flex flex-wrap items-center gap-4">
        <Link href={cta.href} className="btn-dark px-7 py-4 text-base">
          {cta.label}
        </Link>
        {compact && (
          <Link
            href="/services"
            className="group inline-flex items-center gap-2 font-semibold text-cedar-dark hover:text-cedar"
          >
            {servicesIntro.allLabel}
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        )}
      </div>
    </Section>
  );
}
