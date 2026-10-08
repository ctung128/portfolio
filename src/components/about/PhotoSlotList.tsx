"use client";

import { useState } from "react";
import type { RecommendationItem } from "@/content/site";
import { ARROW_NE } from "@/lib/glyphs";

/** Small fixed tilts so prints feel hand-placed but stay stable across renders. */
const TILTS = [-3, 2, -1.5, 2.5, -2, 1.5];
const EASE_OUT = "cubic-bezier(0.22, 0.8, 0.3, 1)";

/**
 * Recommendation list whose photo items develop a print in a reserved slot
 * on hover/focus/tap (after charisa.design/about). One print at a time; a
 * dashed frame holds the space otherwise so the card never resizes.
 */
export function PhotoSlotList({ items }: { items: RecommendationItem[] }) {
  const [active, setActive] = useState<number | null>(null);
  const photos = items.flatMap((item, i) => (item.photo ? [{ ...item.photo, title: item.title, index: i }] : []));

  return (
    <div
      className="mt-4 grid grid-cols-1 min-[420px]:grid-cols-[minmax(0,1fr)_132px] min-[420px]:gap-5 sm:grid-cols-[minmax(0,1fr)_148px]"
      onMouseLeave={() => setActive(null)}
    >
      <ul className="space-y-3">
        {items.map((item, i) => (
          <li key={item.title} className="flex gap-3">
            <span aria-hidden className="mt-0.5 shrink-0 text-sm text-ink">
              ✱
            </span>
            <p className="font-sans text-[15px] leading-relaxed text-ink-soft">
              {item.photo ? (
                <button
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(active === i ? null : i)}
                  aria-pressed={active === i}
                  className="link-underline text-left"
                >
                  {item.title}
                </button>
              ) : item.href ? (
                <a href={item.href} target="_blank" rel="noreferrer" className="text-ink hover:text-ink-soft">
                  {item.title} <span aria-hidden className="text-ink-faint">{ARROW_NE}</span>
                </a>
              ) : (
                <span className="text-ink">{item.title}</span>
              )}
              {item.detail ? ` ${item.detail}` : null}
              {/* Phones: no room for a side slot, so the print develops under the tapped line. */}
              {item.photo && active === i ? (
                <span
                  className="mt-3 block max-w-[220px] animate-[print-rise_420ms_cubic-bezier(0.22,0.8,0.3,1)] motion-reduce:animate-none rounded-[6px] border border-border bg-white p-1.5 shadow-[0_1px_2px_rgba(37,37,37,0.06),0_8px_24px_-12px_rgba(37,37,37,0.25)] min-[420px]:hidden"
                  style={{ aspectRatio: String(item.photo.ratio), rotate: "-1.5deg" }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.photo.src}
                    alt={item.title}
                    className="block h-full w-full rounded-[3px] object-cover"
                  />
                </span>
              ) : null}
            </p>
          </li>
        ))}
      </ul>

      <div
        className="relative hidden self-center min-[420px]:block"
        style={{ aspectRatio: "3 / 4" }}
      >
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-2 rounded-[8px] border border-dashed border-border-strong text-center transition-opacity duration-300"
          style={{ opacity: active === null ? 1 : 0 }}
        >
          <span aria-hidden className="text-ink-faint">✱</span>
          <span className="px-3 font-sans text-xs text-ink-faint">
            <span className="[@media(hover:none)]:hidden">hover</span>
            <span className="hidden [@media(hover:none)]:inline">click</span> a sidequest
          </span>
        </div>
        {photos.map((p, n) => {
          const on = active === p.index;
          return (
            <div
              key={p.src}
              aria-hidden={!on}
              className="absolute left-1/2 top-1/2 rounded-[6px] border border-border bg-white p-1.5 shadow-[0_1px_2px_rgba(37,37,37,0.06),0_8px_24px_-12px_rgba(37,37,37,0.25)] motion-reduce:!transition-none"
              style={{
                width: p.ratio > 1 ? "118%" : "100%",
                aspectRatio: String(p.ratio),
                opacity: on ? 1 : 0,
                visibility: on ? "visible" : "hidden",
                transform: `translate(-50%, -50%) translateY(${on ? 0 : 10}px) scale(${on ? 1 : 0.97}) rotate(${TILTS[n % TILTS.length]}deg)`,
                transition: `opacity 320ms, visibility 320ms, transform 420ms ${EASE_OUT}`,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.src}
                alt={p.title}
                loading="lazy"
                draggable={false}
                className="block h-full w-full rounded-[3px] object-cover"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
