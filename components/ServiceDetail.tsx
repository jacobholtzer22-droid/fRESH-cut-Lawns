import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import Image from "next/image";
import { site } from "@/site.config";

type ServiceItem = (typeof site.services)[number];

/** Body of a /services/<slug> sub-page. */
export default function ServiceDetail({ service }: { service: ServiceItem }) {
  const others = site.services.filter((s) => s.slug !== service.slug);

  return (
    <>
      {/* Intro + photo */}
      <section className="bg-limestone py-16 text-ink sm:py-20">
        <div className="container-page grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-lg leading-relaxed text-ink/75">{service.intro}</p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {service.bullets.map((b) => (
                <li
                  key={b}
                  className="flex items-start gap-3 text-[15px] text-ink/80"
                >
                  <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cedar/15 text-cedar-dark">
                    <Check className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                  {b}
                </li>
              ))}
            </ul>
            <Link
              href={site.cta.href}
              className="btn-primary mt-9 px-7 py-4 text-base"
            >
              {site.cta.label}
            </Link>
          </div>

          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-evergreen/10 shadow-md">
            <Image
              src={service.image.src}
              alt={service.image.alt}
              fill
              sizes="(min-width: 1024px) 520px, 100vw"
              className="object-cover"
              priority
            />
            <div className="stone-seam absolute inset-x-0 bottom-0" />
          </div>
        </div>
      </section>

      {/* Other services */}
      <section className="bg-limestone-deep py-16 text-ink sm:py-20">
        <div className="container-page">
          <h2 className="h-display text-2xl text-evergreen sm:text-3xl">
            Other services
          </h2>
          <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((s) => {
              const Icon = s.icon;
              return (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="group flex h-full flex-col gap-3 rounded-2xl border border-evergreen/10 bg-bone p-6 transition-colors hover:bg-limestone"
                  >
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-evergreen text-bone">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="font-display text-base font-semibold text-evergreen">
                      {s.title}
                    </span>
                    <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-cedar-dark">
                      Learn more
                      <ArrowRight
                        className="h-4 w-4 transition-transform group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </>
  );
}
