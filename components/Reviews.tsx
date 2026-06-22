import { Star, Quote, ExternalLink, PenLine } from "lucide-react";
import { site } from "@/site.config";

export default function Reviews() {
  const { reviews } = site;
  const hasRating = reviews.rating != null;

  return (
    <section id="reviews" className="bg-evergreen-deep py-20 text-bone sm:py-28">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow mb-4 text-cedar-light">{reviews.eyebrow}</p>
          <h2 className="h-display text-3xl text-bone sm:text-4xl">
            {reviews.heading}
          </h2>
          {hasRating && (
            <div className="mt-5 flex flex-col items-center gap-2">
              <div
                className="flex items-center gap-1"
                aria-label={`${reviews.rating!.toFixed(1)} out of 5 stars`}
              >
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-6 w-6 fill-cedar text-cedar"
                    aria-hidden="true"
                  />
                ))}
              </div>
              <p className="text-sm font-semibold text-bone/80">
                {reviews.rating!.toFixed(1)} out of 5
              </p>
            </div>
          )}
          <p className="mt-4 text-base text-bone/70">{reviews.sub}</p>
        </div>

        <div className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-2">
          {reviews.quotes.map((review, i) => {
            const hasQuote = review.quote.trim().length > 0;
            const hasAuthor = review.author.trim().length > 0;
            return (
              <figure
                key={i}
                className="flex flex-col rounded-2xl border border-bone/10 bg-evergreen/40 p-7"
              >
                <Quote className="h-7 w-7 text-cedar/80" aria-hidden="true" />
                {hasQuote ? (
                  <>
                    <blockquote className="mt-4 flex-1 text-lg leading-relaxed text-bone">
                      “{review.quote}”
                    </blockquote>
                    <figcaption className="mt-5 text-sm font-semibold text-bone/80">
                      {hasAuthor && <span>{review.author}</span>}
                      {review.context ? (
                        <span
                          className={
                            hasAuthor ? "font-normal text-bone/55" : "text-bone/60"
                          }
                        >
                          {hasAuthor ? ` · ${review.context}` : review.context}
                        </span>
                      ) : null}
                    </figcaption>
                  </>
                ) : (
                  /* Placeholder, paste a real review in site.config.ts, never invent. */
                  <div className="mt-4 flex flex-1 flex-col justify-center rounded-xl border border-dashed border-bone/25 p-6 text-center">
                    <span className="text-xs font-semibold uppercase tracking-wider text-bone/70">
                      {reviews.placeholderLabel} {i + 1}
                    </span>
                    <span className="mt-1 text-xs text-bone/55">
                      {reviews.placeholderHint}
                    </span>
                  </div>
                )}
              </figure>
            );
          })}
        </div>

        {/* Google review CTA */}
        <div className="mt-11 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href={reviews.googleReviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary px-7 py-4 text-base"
          >
            <PenLine className="h-4 w-4" aria-hidden="true" />
            {reviews.reviewCtaLabel}
          </a>
          <a
            href={reviews.googleProfileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost px-7 py-4 text-base"
          >
            {reviews.readReviewsLabel}
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
