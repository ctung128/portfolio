"use client";

import { books, cover, hue } from "@/content/library";
import { BookDialog } from "./BookDialog";
import { BookCard, CARD_BACKDROP } from "./BookCard";
import { useBookViewer } from "./useBookViewer";

const shelf = [...books].sort((a, b) => hue(a.tone) - hue(b.tone));

/** The shelf: covers cropped to one size and butted edge to edge,
 * sorted by hue so the shelf reads as a single colour field. A cover opens
 * its BookCard. */
export function Bookshelf() {
  const { index, open, close, step, registerTile } = useBookViewer(shelf.length);
  const book = index === null ? null : shelf[index];

  return (
    <section>
      <p className="mb-3 text-right font-sans text-xs text-ink-faint">Tap a book to open it</p>
      <ol className="grid grid-cols-4 overflow-hidden rounded-[12px] border border-border shadow-[0_1px_2px_rgba(37,37,37,0.06),0_8px_24px_-12px_rgba(37,37,37,0.18)] sm:grid-cols-6">
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
