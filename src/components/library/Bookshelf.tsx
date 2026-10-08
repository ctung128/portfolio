"use client";

import { books, cover, hue } from "@/content/library";
import { BookDialog } from "./BookDialog";
import { BookCard, CARD_BACKDROP } from "./BookCard";
import { useBookViewer } from "./useBookViewer";

const COLS = 5;
const shelf = [...books].sort((a, b) => hue(a.tone) - hue(b.tone));

/** The shelf: covers cropped to one size and butted edge to edge,
 * sorted by hue so the shelf reads as a single colour field. A cover opens
 * its BookCard. */
export function Bookshelf() {
  const { index, open, close, step, registerTile } = useBookViewer(shelf.length);
  const book = index === null ? null : shelf[index];

  return (
    <section className="py-6">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <h2 className="font-serif text-[28px] leading-none text-ink sm:text-4xl">
          <span className="highlight">The shelf</span>
          <span className="ml-3 align-middle font-sans text-xs tracking-[0.2em] text-ink-faint">
            BY COLOUR
          </span>
        </h2>
        <span className="font-sans text-xs text-ink-faint">tap a book ↓</span>
      </div>

      <ol className="grid grid-cols-5 overflow-hidden rounded-xl shadow-[0_20px_60px_-30px_rgba(0,0,0,0.45)]">
        {shelf.map((b, i) => (
          <li key={b.slug} className="relative">
            <button
              type="button"
              onClick={() => open(i)}
              className="group relative block aspect-[2/3] w-full overflow-hidden focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
              aria-label={`${b.title} by ${b.author}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                ref={registerTile(i)}
                src={cover(b)}
                alt=""
                className="size-full object-cover transition-[filter,scale] duration-300 group-hover:scale-105 group-hover:brightness-75"
              />
              <span className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
                <span className="px-2 text-center font-serif text-sm leading-tight text-white sm:text-xl">
                  {b.title}
                </span>
              </span>
            </button>
          </li>
        ))}
        {shelf.length % COLS > 0 && (
          <li
            aria-hidden
            style={{ gridColumn: `span ${COLS - (shelf.length % COLS)}` }}
            className="flex items-end bg-[#f3f1ec] p-3 font-sans text-[11px] uppercase leading-relaxed tracking-[0.18em] text-ink-faint sm:p-5"
          >
            {shelf.length} books,
            <br />
            warm to cool
          </li>
        )}
      </ol>
      <div
        aria-hidden
        className="mt-3 h-1.5 rounded-full"
        style={{ background: `linear-gradient(90deg, ${shelf.map((b) => b.tone).join(",")})` }}
      />

      {book && index !== null && (
        <BookDialog
          label={book.title}
          position={index + 1}
          count={shelf.length}
          onClose={close}
          onStep={step}
          backdropClassName={CARD_BACKDROP}
        >
          <BookCard book={book} />
        </BookDialog>
      )}
    </section>
  );
}
