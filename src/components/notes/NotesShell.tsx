"use client";

import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { ARROW_NE } from "@/lib/glyphs";
import { formatNoteDate, notesPage, sortedNotes } from "@/content/notes";

/**
 * Notes, laid out like Play: a sticky 220px left column (headline and the
 * list of notes) beside a window holding the open note, ruled like the hero
 * box. It lives in the notes layout, so clicking a note only swaps the window. md+: /notes opens the first (pinned) note. Phones: /notes
 * is just the list and /notes/[slug] just the note, with a link back.
 */
export function NotesShell({ children }: { children: React.ReactNode }) {
  const segment = useSelectedLayoutSegment();
  const activeSlug = segment ?? sortedNotes[0]?.slug;
  const onIndex = segment === null;

  return (
    <div className="flex flex-col gap-10 md:flex-row md:gap-14">
      <aside className={`md:sticky md:top-28 md:block md:h-fit md:w-[220px] md:shrink-0 ${onIndex ? "" : "hidden"}`}>
        <h1 style={{ "--n": 0 } as React.CSSProperties} className="intro-item font-serif text-[26px] text-ink sm:text-[30px] lg:text-4xl">
          {notesPage.headline}
        </h1>
        {/* 24px under the headline, less the first row's 8px top padding. */}
        <ul style={{ "--n": 1 } as React.CSSProperties} className="intro-item mt-4">
          {sortedNotes.map((note) => {
            const current = note.slug === activeSlug;
            return (
              <li key={note.slug}>
                <Link
                  href={`/notes/${note.slug}`}
                  aria-current={current && !onIndex ? "page" : undefined}
                  className="group flex items-baseline justify-between gap-3 py-2"
                >
                  <span className="min-w-0">
                    <span
                      className={`block font-sans text-[15px] leading-snug transition-colors group-hover:text-matcha ${
                        current ? "text-ink md:font-semibold" : "text-ink"
                      }`}
                    >
                      {note.title}
                    </span>
                    <span className="mt-1 block font-sans text-[11px] uppercase tracking-wider text-ink-faint">
                      {formatNoteDate(note.date)}
                    </span>
                  </span>
                  <span
                    aria-hidden
                    className="shrink-0 text-[13px] text-ink-faint transition-[translate,color] duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-matcha"
                  >
                    {ARROW_NE}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </aside>

      <div className={`min-w-0 flex-1 md:block ${onIndex ? "hidden" : ""}`}>
        {!onIndex && (
          <Link href="/notes" className="mb-6 inline-block font-sans text-base text-ink-faint hover:text-ink md:hidden">
            ← Notes
          </Link>
        )}
        <div style={{ "--n": 1 } as React.CSSProperties} className="intro-item rounded-[12px] border border-border p-6 sm:p-10">
          {children}
        </div>
      </div>
    </div>
  );
}
