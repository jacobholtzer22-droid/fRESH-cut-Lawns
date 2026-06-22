import Link from "next/link";
import { Phone, Check, Star } from "lucide-react";
import { site } from "@/site.config";
import ImagePlaceholder from "./ImagePlaceholder";

export default function Hero() {
  const { hero, business, trust, images } = site;
  const hasRating = trust.rating != null;

  return (
    <section
      id="top"
      className="relative overflow-hidden bg-limestone ashlar-wash"
    >
      <div className="container-page pt-28 pb-16 sm:pt-32 lg:pt-36 lg:pb-20">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          {/* Copy */}
          <div className="animate-fade-up">
            <p className="eyebrow mb-5">{hero.eyebrow}</p>
            <h1 className="h-display text-[2.6rem] leading-[1.02] text-evergreen sm:text-6xl lg:text-[4.1rem]">
              {hero.headline.split("\n").map((line, i) => (
                <span key={i} className="block">
                  {line}
                </span>
              ))}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink/70">
              {hero.sub}
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link href={site.cta.href} className="btn-primary px-7 py-4 text-base">
                {hero.primaryCta}
              </Link>
              <a
                href={business.phoneHref}
                className="btn-outline px-7 py-4 text-base"
              >
                <Phone className="h-4 w-4 text-cedar-dark" aria-hidden="true" />
                {hero.secondaryCtaLabel} · {business.phoneDisplay}
              </a>
            </div>

            {hasRating && (
              <div className="mt-6 flex items-center gap-2 text-sm text-ink/65">
                <span className="flex" aria-hidden="true">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-cedar text-cedar"
                    />
                  ))}
                </span>
                {trust.rating!.toFixed(1)} on {trust.ratingSource}
              </div>
            )}
          </div>

          {/* Photo, tall finished-project shot with an offset evergreen frame for depth */}
          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute -bottom-4 -right-4 hidden h-full w-full rounded-2xl bg-evergreen/90 sm:block"
            />
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-evergreen/10 shadow-xl">
              <ImagePlaceholder
                image={images[hero.imageKey]}
                priority
                sizes="(min-width: 1024px) 540px, 100vw"
              />
              <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-ink/70 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-bone backdrop-blur">
                {hero.imageBadge}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Trust strip */}
      <div className="border-t border-evergreen/10 bg-limestone-deep/70">
        <div className="container-page">
          <ul className="grid grid-cols-1 gap-x-8 gap-y-3 py-5 sm:grid-cols-2 lg:grid-cols-4">
            {trust.points.map((point) => (
              <li
                key={point}
                className="flex items-center gap-2.5 text-sm font-medium text-ink/75"
              >
                <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cedar/15 text-cedar-dark">
                  <Check className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
                {point}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
