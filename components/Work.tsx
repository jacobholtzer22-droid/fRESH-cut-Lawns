import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { site } from "@/site.config";

/**
 * Finished-project gallery. Dark evergreen ground so the work pops (Portfolio-Grid
 * pattern). `teaser` (home) shows the first `limit` projects + a link to the full
 * gallery; full (/gallery) shows everything + a quote CTA. Config-driven.
 */
export default function Work({
  teaser = false,
  limit,
}: {
  teaser?: boolean;
  limit?: number;
}) {
  const { work, cta } = site;
  const projects =
    typeof limit === "number" ? work.projects.slice(0, limit) : work.projects;

  return (
    <section id="work" className="bg-evergreen py-20 text-bone sm:py-28">
      <div className="container-page">
        <div className="max-w-2xl">
          <p className="eyebrow mb-4 text-cedar-light">{work.eyebrow}</p>
          <h2 className="h-display text-3xl text-bone sm:text-[2.6rem]">
            {work.heading}
          </h2>
          <p className="mt-4 text-lg text-bone/70">{work.sub}</p>
        </div>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <li key={project.title}>
              <figure className="group relative aspect-[4/5] overflow-hidden rounded-2xl border border-bone/10 bg-evergreen-dark">
                <Image
                  src={project.image.src}
                  alt={project.image.alt}
                  fill
                  sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                />
                <div className="photo-scrim absolute inset-0" aria-hidden="true" />
                <figcaption className="absolute inset-x-0 bottom-0 p-5">
                  <span className="inline-block rounded-full bg-cedar px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-bone">
                    {project.category}
                  </span>
                  <p className="mt-2.5 font-display text-lg font-semibold leading-tight text-bone">
                    {project.title}
                  </p>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>

        <div className="mt-11 flex flex-col items-start gap-4 border-t border-bone/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-md text-base text-bone/70">{work.footerNote}</p>
          {teaser ? (
            <Link
              href="/gallery"
              className="btn-primary shrink-0 px-7 py-4 text-base"
            >
              {work.teaserCta}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          ) : (
            <Link
              href={cta.href}
              className="btn-primary shrink-0 px-7 py-4 text-base"
            >
              {work.cta}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
