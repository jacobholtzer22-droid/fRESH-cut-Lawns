"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Phone } from "lucide-react";
import { site } from "@/site.config";

const strip = (p: string) => p.replace(/\/+$/, "") || "/";

/**
 * Sticky bottom CTA bar for mobile/tablet (lg:hidden). Keeps click-to-call and
 * the free-quote CTA under the thumb. Hidden on the /contact page (that page IS
 * the form). On the home page it appears once the hero (#top) scrolls out; on
 * interior pages (no hero) it's shown immediately.
 */
export default function MobileCtaBar() {
  const pathname = usePathname();
  const onQuotePage = strip(pathname || "/") === strip(site.cta.href);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (onQuotePage) {
      setShow(false);
      return;
    }
    const compute = () => {
      const hero = document.getElementById("top");
      if (!hero) {
        setShow(true);
        return;
      }
      setShow(hero.getBoundingClientRect().bottom < 80);
    };
    compute();
    window.addEventListener("scroll", compute, { passive: true });
    window.addEventListener("resize", compute);
    return () => {
      window.removeEventListener("scroll", compute);
      window.removeEventListener("resize", compute);
    };
  }, [onQuotePage, pathname]);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-bone/10 bg-evergreen/95 backdrop-blur transition-transform duration-300 lg:hidden ${
        show ? "translate-y-0" : "invisible translate-y-full"
      }`}
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      aria-hidden={!show}
    >
      <div className="container-page flex items-center gap-3 py-3">
        <a
          href={site.business.phoneHref}
          className="btn-ghost min-h-[48px] flex-1 px-4 py-3"
          aria-label={`Call ${site.business.name} at ${site.business.phoneDisplay}`}
        >
          <Phone className="h-4 w-4" aria-hidden="true" />
          {site.cta.callShort}
        </a>
        <a href={site.cta.href} className="btn-primary min-h-[48px] flex-1 px-4 py-3">
          {site.cta.short}
        </a>
      </div>
    </div>
  );
}
