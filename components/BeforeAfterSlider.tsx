"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import { MoveHorizontal } from "lucide-react";
import { site } from "@/site.config";

/**
 * Accessible before/after reveal slider (drag + arrow keys / Home / End).
 * SIGNATURE element, but config-gated: renders nothing unless
 * `site.beforeAfter.enabled` is true AND at least one pair has both images.
 * This keeps the site honest until Joe sends real matched before/after photos
 * (same angle). To turn it on: add a pair in site.config.ts and flip `enabled`.
 */
export default function BeforeAfterSlider() {
  const { beforeAfter } = site;
  const pair = beforeAfter.pairs.find((p) => p.before.src && p.after.src);

  const [pos, setPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const setFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(100, Math.max(0, pct)));
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true;
    (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
    setFromClientX(e.clientX);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    setFromClientX(e.clientX);
  };
  const onPointerUp = () => {
    dragging.current = false;
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    const step = e.shiftKey ? 10 : 2;
    if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
      e.preventDefault();
      setPos((p) => Math.max(0, p - step));
    } else if (e.key === "ArrowRight" || e.key === "ArrowUp") {
      e.preventDefault();
      setPos((p) => Math.min(100, p + step));
    } else if (e.key === "Home") {
      e.preventDefault();
      setPos(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setPos(100);
    }
  };

  // Off until enabled with a real pair, render nothing.
  if (!beforeAfter.enabled || !pair) return null;

  return (
    <section id="before-after" className="bg-ink py-20 text-bone sm:py-28">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow mb-4 text-cedar-light">{beforeAfter.eyebrow}</p>
          <h2 className="h-display text-3xl text-bone sm:text-4xl">
            {beforeAfter.heading}
          </h2>
          <p className="mt-4 text-base text-bone/70">{beforeAfter.sub}</p>
        </div>

        <div
          ref={containerRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          className="relative mx-auto mt-12 aspect-[4/5] w-full max-w-lg touch-none select-none overflow-hidden rounded-2xl border border-bone/10 sm:aspect-[4/3] sm:max-w-2xl"
        >
          {/* Base layer: BEFORE, always full */}
          <Image
            src={pair.before.src}
            alt={pair.before.alt}
            fill
            sizes="(min-width: 640px) 672px, 100vw"
            className="object-cover"
            draggable={false}
          />

          {/* Overlay: AFTER, clipped from the left up to `pos` */}
          <div
            className="absolute inset-0"
            style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
          >
            <Image
              src={pair.after.src}
              alt={pair.after.alt}
              fill
              sizes="(min-width: 640px) 672px, 100vw"
              className="object-cover"
              draggable={false}
            />
          </div>

          {/* Corner labels */}
          <span className="pointer-events-none absolute left-4 top-4 rounded-full bg-ink/75 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-bone backdrop-blur">
            {beforeAfter.afterLabel}
          </span>
          <span className="pointer-events-none absolute right-4 top-4 rounded-full bg-ink/75 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-bone/70 backdrop-blur">
            {beforeAfter.beforeLabel}
          </span>

          {/* Seam + handle */}
          <div
            className="pointer-events-none absolute inset-y-0"
            style={{ left: `${pos}%`, transform: "translateX(-50%)" }}
          >
            <div className="absolute inset-y-0 left-1/2 w-0.5 -translate-x-1/2 bg-cedar" />
            <button
              type="button"
              role="slider"
              aria-label="Drag to compare before and after"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(pos)}
              aria-valuetext={`${Math.round(pos)}% after`}
              onKeyDown={onKeyDown}
              className="pointer-events-auto absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-full border-2 border-cedar bg-ink text-cedar shadow-lg"
            >
              <MoveHorizontal className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        <p className="mt-5 text-center text-xs text-bone/55">
          Drag the handle, or focus it and use the arrow keys.
        </p>
      </div>
    </section>
  );
}
