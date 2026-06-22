"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, Menu, X, ChevronDown } from "lucide-react";
import { site } from "@/site.config";

const strip = (p: string) => p.replace(/\/+$/, "") || "/";

const serviceLinks = [
  { href: "/services", label: site.servicesIntro.allLabel },
  ...site.services.map((s) => ({ href: `/services/${s.slug}`, label: s.title })),
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false); // mobile menu
  const [svcOpen, setSvcOpen] = useState(false); // desktop services flyout
  const [svcAccordion, setSvcAccordion] = useState(false); // mobile services accordion
  const [scrolled, setScrolled] = useState(false);
  const svcRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!svcOpen) return;
    const onClick = (e: MouseEvent) => {
      if (svcRef.current && !svcRef.current.contains(e.target as Node))
        setSvcOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [svcOpen]);

  const here = strip(pathname || "/");
  const isActive = (href: string) =>
    href === "/" ? here === "/" : here === strip(href);
  const servicesActive = here === "/services" || here.startsWith("/services/");

  // Light text when scrolled (evergreen bar) OR on any page whose top band is dark
  // (every page except the home hero, which is light limestone).
  const light = scrolled || here !== "/";
  const wordmark = light ? "text-bone" : "text-evergreen";
  const link = light
    ? "text-bone/75 hover:text-bone"
    : "text-ink/70 hover:text-ink";
  const linkActive = light ? "text-bone" : "text-evergreen";
  const phoneLink = light
    ? "text-bone hover:text-cedar-light"
    : "text-ink hover:text-cedar-dark";
  const menuBtn = light ? "border-bone/20 text-bone" : "border-ink/15 text-ink";

  const closeMobile = () => {
    setOpen(false);
    setSvcAccordion(false);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "border-b border-bone/10 bg-evergreen/95 backdrop-blur"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="container-page flex h-16 items-center justify-between gap-4">
        {/* Wordmark */}
        <Link
          href="/"
          className={`h-display text-xl sm:text-2xl ${wordmark}`}
          aria-label={`${site.business.name}, home`}
        >
          {site.business.shortName}
          <span className="text-cedar">.</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          <Link
            href="/"
            aria-current={isActive("/") ? "page" : undefined}
            className={`text-sm font-medium transition-colors ${
              isActive("/") ? linkActive : link
            }`}
          >
            Home
          </Link>
          {/* Services dropdown */}
          <div
            ref={svcRef}
            className="relative"
            onMouseEnter={() => setSvcOpen(true)}
            onMouseLeave={() => setSvcOpen(false)}
          >
            <button
              type="button"
              onClick={() => setSvcOpen((v) => !v)}
              aria-expanded={svcOpen}
              aria-haspopup="true"
              className={`flex items-center gap-1 text-sm font-medium transition-colors ${
                servicesActive ? linkActive : link
              }`}
            >
              Services
              <ChevronDown
                className={`h-4 w-4 transition-transform ${svcOpen ? "rotate-180" : ""}`}
                aria-hidden="true"
              />
            </button>
            <div
              className={`absolute left-0 top-full pt-3 transition-opacity duration-200 ${
                svcOpen ? "visible opacity-100" : "invisible opacity-0"
              }`}
            >
              <div className="min-w-[230px] overflow-hidden rounded-xl border border-evergreen/10 bg-bone shadow-xl">
                {serviceLinks.map((s) => (
                  <Link
                    key={s.href}
                    href={s.href}
                    onClick={() => setSvcOpen(false)}
                    aria-current={isActive(s.href) ? "page" : undefined}
                    className={`block px-4 py-3 text-sm font-medium transition-colors ${
                      isActive(s.href)
                        ? "bg-cedar/10 text-cedar-dark"
                        : "text-ink/75 hover:bg-limestone-deep hover:text-ink"
                    }`}
                  >
                    {s.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {site.nav
            .filter((item) => item.href !== "/services")
            .map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={`text-sm font-medium transition-colors ${
                  isActive(item.href) ? linkActive : link
                }`}
              >
                {item.label}
              </Link>
            ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={site.business.phoneHref}
            className={`hidden items-center gap-2 text-sm font-semibold transition-colors sm:inline-flex ${phoneLink}`}
          >
            <Phone className="h-4 w-4 text-cedar" aria-hidden="true" />
            {site.business.phoneDisplay}
          </a>
          <Link href={site.cta.href} className="btn-primary hidden sm:inline-flex">
            {site.cta.label}
          </Link>

          {/* Mobile: call + menu */}
          <a
            href={site.business.phoneHref}
            className="btn-primary min-h-[44px] px-4 py-3 sm:hidden"
            aria-label={`Call ${site.business.name}`}
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            {site.cta.callShort}
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className={`inline-flex h-11 w-11 items-center justify-center rounded-lg border lg:hidden ${menuBtn}`}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile nav panel, solid evergreen so it's legible over any page top. */}
      {open && (
        <nav
          id="mobile-nav"
          aria-label="Primary mobile"
          className="border-t border-bone/10 bg-evergreen lg:hidden"
        >
          <div className="container-page flex flex-col py-3">
            <Link
              href="/"
              onClick={closeMobile}
              aria-current={isActive("/") ? "page" : undefined}
              className={`border-b border-bone/5 py-3 text-base font-medium transition-colors ${
                isActive("/") ? "text-bone" : "text-bone/80 hover:text-bone"
              }`}
            >
              Home
            </Link>
            {/* Services accordion */}
            <button
              type="button"
              onClick={() => setSvcAccordion((v) => !v)}
              aria-expanded={svcAccordion}
              className={`flex items-center justify-between border-b border-bone/5 py-3 text-base font-medium transition-colors ${
                servicesActive ? "text-bone" : "text-bone/80 hover:text-bone"
              }`}
            >
              Services
              <ChevronDown
                className={`h-5 w-5 transition-transform ${svcAccordion ? "rotate-180" : ""}`}
                aria-hidden="true"
              />
            </button>
            {svcAccordion && (
              <div className="flex flex-col border-b border-bone/5 py-1 pl-4">
                {serviceLinks.map((s) => (
                  <Link
                    key={s.href}
                    href={s.href}
                    onClick={closeMobile}
                    aria-current={isActive(s.href) ? "page" : undefined}
                    className={`py-2.5 text-[15px] transition-colors ${
                      isActive(s.href)
                        ? "text-cedar-light"
                        : "text-bone/65 hover:text-bone"
                    }`}
                  >
                    {s.label}
                  </Link>
                ))}
              </div>
            )}

            {site.nav
              .filter((item) => item.href !== "/services")
              .map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMobile}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`border-b border-bone/5 py-3 text-base font-medium transition-colors ${
                    isActive(item.href)
                      ? "text-bone"
                      : "text-bone/80 hover:text-bone"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            <Link
              href={site.cta.href}
              onClick={closeMobile}
              className="btn-primary mt-4"
            >
              {site.cta.label}
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
