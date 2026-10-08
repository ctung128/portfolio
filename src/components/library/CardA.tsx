"use client";

import type { CSSProperties } from "react";
import { TAGS, cover, readLabel, season, type Book } from "@/content/library";
import { COVER_VT } from "./useBookViewer";

/** Backdrop behind CardA when it's open. */
export const CARD_BACKDROP = "bg-[#f3f1ec]/95 backdrop-blur-sm";

const DROPS = [
  { left: "3%", top: "38%", s: 1 },
  { left: "27%", top: "-4%", s: 0.8 },
  { left: "52%", top: "92%", s: 0.9 },
  { left: "63%", top: "-2%", s: 1.1 },
  { left: "96%", top: "60%", s: 0.85 },
];

/** The blown-up card, after the xhs book-post layout: headline with rain
 * drops, cover with a round rating sticker, the season running down both
 * sides, the review on a highlighter block, genre chips. */
export function CardA({ book }: { book: Book }) {
  const style = { "--tone": book.tone } as CSSProperties;
  const runner = (
    <div aria-hidden className="flex flex-col items-center justify-around py-2 font-serif text-[15px] tracking-[0.35em] text-[var(--tone-ink)] sm:text-lg">
      <span className="[writing-mode:vertical-rl]">{season(book)}</span>
      <span className="[writing-mode:vertical-rl]">{season(book)}</span>
    </div>
  );

  return (
    <article style={style} className="tone-vars w-full max-w-[540px] bg-white px-5 pb-8 pt-10 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.35)] sm:px-8">
      <h2 className="relative mx-auto w-fit px-3 text-center font-serif text-[28px] leading-tight text-[var(--tone-ink)] sm:text-[34px]">
        {DROPS.map((d, i) => (
          <span
            key={i}
            aria-hidden
            className="drop absolute"
            style={{ left: d.left, top: d.top, scale: d.s }}
          />
        ))}
        {book.title}
      </h2>
      <p className="mt-1 text-center font-sans text-xs text-ink-soft">
        {book.author}, {book.year}
      </p>

      <div className="mt-6 grid grid-cols-[auto_1fr_auto] gap-3 sm:gap-6">
        {runner}
        <div className="relative mx-auto w-[78%]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={cover(book)}
            alt={`${book.title} cover`}
            style={{ viewTransitionName: COVER_VT }}
            className="block w-full shadow-[0_6px_18px_-8px_rgba(0,0,0,0.4)]"
          />
          {book.rating && (
            <span className="absolute -right-[14%] top-[52%] grid aspect-square w-[30%] place-items-center rounded-full bg-[color-mix(in_oklch,var(--tone)_80%,#121212)] font-sans text-[10px] font-semibold tracking-tight text-white shadow-md sm:text-xs">
              {"★".repeat(book.rating)}
            </span>
          )}
        </div>
        {runner}
      </div>

      <div className="mt-8 bg-[var(--tone-tint)] px-4 py-3 font-sans text-[15px] leading-[1.75] text-ink">
        {book.review.length ? (
          book.review.map((p, i) => (
            <p key={i} className={i ? "mt-2" : undefined}>
              {p}
            </p>
          ))
        ) : (
          <p className="italic text-ink-soft">Review coming soon.</p>
        )}
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-2">
        {book.tags.map((t) => (
          <span
            key={t}
            className="rounded-full border border-[var(--tone-ink)]/40 px-3 py-1 font-sans text-xs text-[var(--tone-ink)]"
          >
            #{TAGS[t]}
          </span>
        ))}
        {book.read && (
          <span className="ml-auto font-sans text-[11px] tabular-nums text-ink-faint">Read {readLabel(book)}</span>
        )}
      </div>
    </article>
  );
}
