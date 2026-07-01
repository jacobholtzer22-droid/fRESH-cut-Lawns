"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type RevealTag = "div" | "li" | "section" | "span" | "figure" | "ul";

/**
 * Fades + slides its children up the first time they scroll into view.
 * Lightweight (IntersectionObserver, no animation library). The hidden state
 * only applies when JS is present (an inline script in the layout sets
 * `html.reveal-ready` before paint), so no-JS users still see everything, and
 * `prefers-reduced-motion` users skip the motion (handled in globals.css).
 */
export default function Reveal({
  children,
  as = "div",
  delay = 0,
  className = "",
  amount = 0.15,
}: {
  children: ReactNode;
  as?: RevealTag;
  /** Stagger, in seconds. */
  delay?: number;
  className?: string;
  /** Fraction of the element that must be visible before it reveals. */
  amount?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || shown) return;
    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true);
            io.disconnect();
            break;
          }
        }
      },
      { threshold: amount, rootMargin: "0px 0px -6% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [amount, shown]);

  const Tag = as as "div";
  return (
    <Tag
      ref={ref}
      className={`reveal${shown ? " reveal-in" : ""}${className ? " " + className : ""}`}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </Tag>
  );
}
