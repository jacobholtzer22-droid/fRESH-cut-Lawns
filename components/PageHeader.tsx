import Link from "next/link";
import { ChevronRight } from "lucide-react";

type Crumb = { label: string; href?: string };

type Props = {
  eyebrow: string;
  title: string;
  sub?: string;
  /** Optional breadcrumb trail (e.g. Services → Hardscaping). Last item is current. */
  breadcrumbs?: Crumb[];
};

/**
 * Top-of-page header band for interior pages. The dark evergreen band gives the
 * site a grounded spine and clears the fixed site header (pt-28+).
 */
export default function PageHeader({ eyebrow, title, sub, breadcrumbs }: Props) {
  return (
    <section className="bg-evergreen pb-12 pt-28 text-bone sm:pb-16 sm:pt-36">
      <div className="container-page max-w-3xl">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-5">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-bone/55">
              {breadcrumbs.map((c, i) => {
                const last = i === breadcrumbs.length - 1;
                return (
                  <li key={`${c.label}-${i}`} className="flex items-center gap-1.5">
                    {c.href && !last ? (
                      <Link
                        href={c.href}
                        className="transition-colors hover:text-bone"
                      >
                        {c.label}
                      </Link>
                    ) : (
                      <span
                        className={last ? "text-bone/80" : undefined}
                        aria-current={last ? "page" : undefined}
                      >
                        {c.label}
                      </span>
                    )}
                    {!last && (
                      <ChevronRight
                        className="h-3.5 w-3.5 text-bone/35"
                        aria-hidden="true"
                      />
                    )}
                  </li>
                );
              })}
            </ol>
          </nav>
        )}

        <p className="eyebrow mb-4 text-cedar-light">{eyebrow}</p>
        <h1 className="h-display text-4xl text-bone sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {sub ? (
          <p className="mt-5 max-w-xl text-base text-bone/70 sm:text-lg">{sub}</p>
        ) : null}
      </div>
    </section>
  );
}
