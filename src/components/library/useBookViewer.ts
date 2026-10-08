"use client";

import { useCallback, useRef, useState } from "react";
import { flushSync } from "react-dom";

/** Shared-element name carried by the clicked tile in the "before" snapshot and
 * by the open card's cover in the "after" one, so the cover blows up into the
 * card (and shrinks back into its tile on close). */
export const COVER_VT = "library-cover";

type ViewTransitionDoc = Document & {
  startViewTransition?: (cb: () => void) => { ready: Promise<void>; finished: Promise<void> };
};

function morph(update: () => void, before: () => void, after: () => void, done: () => void) {
  const doc = document as ViewTransitionDoc;
  if (!doc.startViewTransition || matchMedia("(prefers-reduced-motion: reduce)").matches) {
    update();
    done();
    return;
  }
  before();
  const vt = doc.startViewTransition(() => {
    after();
    flushSync(update);
  });
  // Skipped transitions (hidden tab, a second click mid-morph) reject `ready`;
  // the DOM update still happens, so there's nothing to handle.
  vt.ready.catch(() => {});
  vt.finished.finally(done);
}

function name(el: HTMLElement | undefined, value: string) {
  if (el) el.style.viewTransitionName = value;
}

/** Open, close and step through books. Browsers without view transitions (or
 * with reduced motion) just swap instantly. */
export function useBookViewer(count: number) {
  const [index, setIndex] = useState<number | null>(null);
  const tiles = useRef(new Map<number, HTMLElement>());

  const open = useCallback((i: number) => {
    const tile = tiles.current.get(i);
    morph(
      () => setIndex(i),
      () => name(tile, COVER_VT),
      () => name(tile, ""),
      () => {},
    );
  }, []);

  const close = useCallback(() => {
    if (index === null) return;
    // Stepping may have moved on from the book that was clicked; morph back
    // into whichever book is showing now.
    const tile = tiles.current.get(index);
    morph(
      () => setIndex(null),
      () => {},
      () => name(tile, COVER_VT),
      () => {
        name(tile, "");
        tile?.closest("button")?.focus({ preventScroll: true });
      },
    );
  }, [index]);

  const step = useCallback(
    (delta: number) => setIndex((c) => (c === null ? c : (c + delta + count) % count)),
    [count],
  );

  /** Ref for each tile's cover <img> (the element that morphs). */
  const registerTile = useCallback(
    (i: number) => (el: HTMLElement | null) => {
      if (el) tiles.current.set(i, el);
      else tiles.current.delete(i);
    },
    [],
  );

  return { index, open, close, step, registerTile };
}
