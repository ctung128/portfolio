"use client";

import type { CSSProperties } from "react";
import { TAGS, cover, readLabel, type Book } from "@/content/library";
import { COVER_VT } from "./useBookViewer";

/** Backdrop behind the card when it's open. */
export const CARD_BACKDROP = "bg-cream/95 backdrop-blur-sm";

/** The blown-up card, after the xhs book-post layout: title, cover with a
 * round rating sticker, the review on a block tinted with the book's tone,
 * genre chips. */
export function BookCard({ book }: { book: Book }) {
  const style = { "--tone": book.tone } as CSSProperties;
  return (
    <article style={style} className="tone-vars w-full max-w-[540px] rounded-[24px] border border-border bg-white px-5 pb-8 pt-10 shadow-[0_1px_2px_rgba(37,37,37,0.06),0_24px_60px_-24px_rgba(37,37,37,0.3)] sm:px-8">
      <h2 className="mx-auto text-center font-serif text-[28px] leading-tight text-[var(--tone-ink)] sm:text-[34px]">
        {book.title}
      </h2>
      <p className="mt-1 text-center font-sans text-xs text-ink-soft">
        {book.author}, {book.year}
      </p>

      <div className="mt-6">
        <div className="relative mx-auto w-[62%]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={cover(book)}
            alt={`${book.title} cover`}
            style={{ viewTransitionName: COVER_VT }}
            className="block w-full rounded-[6px] shadow-[0_6px_18px_-8px_rgba(37,37,37,0.4)]"
          />
          {book.rating && (
            <span className="absolute -right-[14%] top-[52%] grid aspect-square w-[30%] place-items-center rounded-full bg-[color-mix(in_oklch,var(--tone)_80%,#121212)] font-sans text-[10px] font-semibold tracking-tight text-white shadow-md sm:text-xs">
              {"★".repeat(book.rating)}
            </span>
          )}
        </div>
      </div>

      <div className="mt-8 rounded-[12px] bg-[var(--tone-tint)] px-4 py-3 font-sans text-[15px] leading-[1.75] text-ink">
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
