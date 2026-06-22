import Link from "next/link";
import { Phone, MapPin } from "lucide-react";
import { site } from "@/site.config";
import { DAY_ORDER, dayLabel, formatDayHours } from "@/lib/format";

const footerNav = [{ label: "Home", href: "/" }, ...site.nav];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink text-bone">
      {/* Chiseled stone-seam cap, the brand motif. */}
      <div className="stone-seam" />
      <div className="container-page py-16">
        <div className="grid gap-10 lg:grid-cols-4">
          {/* Brand + contact */}
          <div className="lg:col-span-2">
            <Link href="/" className="h-display text-2xl text-bone">
              {site.business.name}
              <span className="text-cedar">.</span>
            </Link>
            <p className="mt-3 max-w-xs text-sm text-bone/60">
              {site.footer.blurb}
            </p>
            <a
              href={site.business.phoneHref}
              className="mt-4 inline-flex min-h-[44px] items-center gap-2 font-display text-lg font-bold text-bone transition-colors hover:text-cedar-light"
            >
              <Phone className="h-5 w-5 text-cedar" aria-hidden="true" />
              {site.business.phoneDisplay}
            </a>
            <p className="mt-3 flex items-center gap-2 text-sm text-bone/60">
              <MapPin className="h-4 w-4 text-cedar" aria-hidden="true" />
              Serving {site.business.region}
            </p>
          </div>

          {/* Nav */}
          <nav aria-label="Footer">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-bone/55">
              {site.footer.exploreLabel}
            </h2>
            <ul className="mt-2 space-y-1">
              {footerNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-flex min-h-[44px] items-center text-sm text-bone/75 transition-colors hover:text-bone"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Hours */}
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-wider text-bone/55">
              {site.footer.hoursLabel}
            </h2>
            <ul className="mt-4 space-y-1.5 text-sm">
              {DAY_ORDER.map((key) => (
                <li
                  key={key}
                  className="flex justify-between gap-4 text-bone/75"
                >
                  <span>{dayLabel(key)}</span>
                  <span className="text-bone/55">
                    {formatDayHours(site.hours[key])}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-bone/10 pt-6 text-sm text-bone/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.business.name}. {site.footer.rightsText}
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {site.footer.legal.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="transition-colors hover:text-bone"
              >
                {item.label}
              </Link>
            ))}
            <span className="text-bone/40">{site.footer.credit}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
