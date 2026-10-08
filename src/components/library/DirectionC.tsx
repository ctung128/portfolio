"use client";

import type { CSSProperties } from "react";
import { TAGS, books, cover, readLabel, season, type Book } from "@/content/library";
import { BookDialog } from "./BookDialog";
import { CARD_BACKDROP, CardA } from "./CardA";
import { COVER_VT, useBookViewer } from "./useBookViewer";

/** Books that take a double cell in the bento: the ones with the longest reviews. */
const FEATURED = new Set(["the-membranes", "notes-of-a-crocodile", "days-of-abandonment", "in-praise-of-shadows", "blockchain-chicken-farm"]);

/** C — Exhibition. A dense bento on black (like the reference's black
 * spreads), favourites at double size; the card opens as a book spread: the
 * cover taped to the left page, the right page on a manuscript grid with a
 * vertical title and a red seal for the rating. */
export function DirectionC({ card = "spread" }: { card?: "spread" | "post" }) {
  const { index, open, close, step, registerTile } = useBookViewer(books.length);
  const book = index === null ? null : books[index];

  return (
    <section className="-mx-6 bg-[#121212] px-3 py-8 sm:-mx-8 sm:rounded-sm sm:px-6 sm:py-10">
      <div className="mb-6 flex items-start justify-between gap-6 px-1 text-white">
        <h2 className="font-serif text-5xl leading-none sm:text-7xl">Exhibition</h2>
        <p className="max-w-[16rem] text-right font-sans text-[11px] uppercase leading-relaxed tracking-[0.18em] text-white/55">
          A reading exhibition
          <br />
          {books.length} works, 2020—2025
          <br />
          favourites hung large
        </p>
      </div>

      <ol className="grid grid-flow-dense grid-cols-3 gap-1.5 sm:grid-cols-4 sm:gap-2 lg:grid-cols-6">
        {books.map((b, i) => {
          const big = FEATURED.has(b.slug);
          return (
            <li key={b.slug} className={big ? "col-span-2 row-span-2" : undefined}>
              <button
                type="button"
                onClick={() => open(i)}
                className={`group relative block w-full overflow-hidden bg-[#222] ${big ? "h-full" : "aspect-[2/3]"}`}
                aria-label={`${b.title} by ${b.author}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  ref={registerTile(i)}
                  src={cover(b)}
                  alt=""
                  loading={i < 12 ? "eager" : "lazy"}
                  className="size-full object-cover transition-opacity duration-300 group-hover:opacity-60"
                />
                <span className="absolute left-2 top-2 font-sans text-[10px] tabular-nums text-white mix-blend-difference">
                  №{String(i + 1).padStart(2, "0")}
                </span>
                <span className="absolute inset-x-0 bottom-0 translate-y-full bg-white px-2 py-1.5 text-left font-sans text-[11px] leading-tight text-ink transition-transform duration-300 group-hover:translate-y-0 group-focus-visible:translate-y-0">
                  <span className="font-serif text-[13px]">{b.title}</span>
                  <span className="block truncate text-ink-faint">{b.author}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ol>

      {book && index !== null && (
        <BookDialog
          label={book.title}
          position={index + 1}
          count={books.length}
          onClose={close}
          onStep={step}
          {...(card === "post"
            ? { backdropClassName: CARD_BACKDROP }
            : {
                backdropClassName: "bg-[#121212]/92",
                controlClassName: "bg-white/10 text-white hover:bg-white/20",
              })}
        >
          {card === "post" ? <CardA book={book} /> : <CardC book={book} />}
        </BookDialog>
      )}
    </section>
  );
}

function CardC({ book }: { book: Book }) {
  const style = { "--tone": book.tone } as CSSProperties;

  return (
    <article
      style={style}
      className="tone-vars grid w-full max-w-[880px] bg-[#f5f0e6] shadow-[0_40px_100px_-30px_rgba(0,0,0,0.8)] sm:grid-cols-2"
    >
      {/* Left page: the cover, taped down, on the book's own colour. */}
      <div className="relative flex flex-col items-center justify-center gap-5 bg-[var(--tone-tint)] px-8 py-10 sm:py-14">
        <div className="relative w-[62%] max-w-[260px] rotate-[1.5deg]">
          <span aria-hidden className="tape left-1/2 -top-3 -translate-x-1/2 rotate-[-4deg]" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={cover(book)}
            alt={`${book.title} cover`}
            style={{ viewTransitionName: COVER_VT }}
            className="block w-full shadow-[0_18px_40px_-16px_rgba(0,0,0,0.55)]"
          />
        </div>
        <dl className="grid w-full max-w-[260px] grid-cols-[auto_1fr] gap-x-4 gap-y-0.5 font-sans text-[11px] uppercase tracking-[0.12em] text-ink-soft">
          <dt className="text-ink-faint">Title</dt>
          <dd className="normal-case tracking-normal text-ink">{book.title}</dd>
          <dt className="text-ink-faint">Author</dt>
          <dd className="normal-case tracking-normal text-ink">
            {book.author}
          </dd>
          <dt className="text-ink-faint">Year</dt>
          <dd className="tabular-nums text-ink">{book.year}</dd>
          {book.read && (
            <>
              <dt className="text-ink-faint">Read</dt>
              <dd className="tabular-nums text-ink">
                {readLabel(book)} · {season(book)}
              </dd>
            </>
          )}
        </dl>
        <span aria-hidden className="absolute inset-y-0 right-0 hidden w-6 bg-gradient-to-l from-black/10 to-transparent sm:block" />
      </div>

      {/* Right page: manuscript grid, vertical title, red seal. */}
      <div className="manuscript relative flex gap-5 px-6 py-10 sm:px-8 sm:py-14">
        <div className="min-w-0 flex-1">
          <div className="font-sans text-[15px] leading-[32px] text-ink">
            {book.review.length ? (
              book.review.map((p, i) => (
                <p key={i} className={i ? "mt-[32px]" : undefined}>
                  {p}
                </p>
              ))
            ) : (
              <p className="italic text-ink-soft">Review coming soon.</p>
            )}
          </div>
          <div className="mt-8 flex flex-wrap gap-1.5">
            {book.tags.map((t) => (
              <span
                key={t}
                className="border border-ink/70 px-2 py-0.5 font-sans text-[11px] text-ink"
              >
                {TAGS[t]}
              </span>
            ))}
          </div>
        </div>

        <div className="flex shrink-0 flex-col items-center gap-5">
          <h2 className="max-h-[340px] font-serif text-[30px] leading-[1.05] text-ink [writing-mode:vertical-rl] sm:text-[36px]">
            {book.title}
          </h2>
          <span className="font-sans text-[11px] uppercase tracking-[0.25em] text-ink-soft [writing-mode:vertical-rl]">
            by {book.author}
          </span>
          {book.rating && (
            <span
              className="seal mt-auto grid size-14 rotate-[-6deg] place-items-center font-serif text-xl leading-none text-[#c8322b]"
              aria-label={`${book.rating} out of 5 stars`}
            >
              {book.rating}/5
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
