"use client";

import { books, cover, hue } from "@/content/library";
import { BookDialog } from "./BookDialog";
import { BookCard, CARD_BACKDROP } from "./BookCard";
import { useBookViewer } from "./useBookViewer";

const shelf = [...books].sort((a, b) => hue(a.tone) - hue(b.tone));

/** The shelf: covers cropped to one size with a thin gutter between,
 * sorted by hue so the shelf reads as a single colour field. A cover opens
 * its BookCard. Laid out like the Play page: a sticky left column (title,
 * description, hint) beside the grid. */
export function Bookshelf() {
  const { index, open, close, step, registerTile } = useBookViewer(shelf.length);
  const book = index === null ? null : shelf[index];

  return (
    <section className="flex flex-col gap-10 md:flex-row md:gap-14">
      <aside className="md:sticky md:top-28 md:h-fit md:w-[220px] md:shrink-0">
        <h1 className="font-serif text-[26px] text-ink sm:text-[30px] lg:text-4xl">Library</h1>
        <p className="mt-3 font-sans text-[15px] leading-relaxed text-ink-soft">
          A museum of my favorite books. Open one to read what I thought.
        </p>
        <p className="mt-6 flex items-center gap-2 font-sans text-xs text-ink-faint">
          Tap a book to open it
          {/* Hand-drawn, like the Sidequesting arrow; points down when the
              shelf stacks below this column. */}
          <svg
            aria-hidden
            viewBox="0 0 30 14"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.3}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-3.5 w-[30px] rotate-90 text-matcha md:rotate-0"
          >
            <path d="M1.5 7.6 C8 6.4 15.5 6.6 27.5 7" />
            <path d="M21 2.2 C23.4 3.9 25.4 5.4 28.2 7 C25.2 8.6 23.2 10.1 21.2 12" />
          </svg>
        </p>
      </aside>

      <ol className="grid flex-1 grid-cols-4 gap-1 self-start p-1 sm:gap-1.5 sm:p-1.5 overflow-hidden rounded-[12px] border border-border shadow-[0_1px_2px_rgba(37,37,37,0.06),0_8px_24px_-12px_rgba(37,37,37,0.18)] sm:grid-cols-6">
        {shelf.map((b, i) => (
          <li key={b.slug} className="relative">
            <button
              type="button"
              onClick={() => open(i)}
              className="group relative block aspect-[2/3] w-full overflow-hidden rounded-[8px] sm:rounded-[6px] focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
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
      </ol>

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
