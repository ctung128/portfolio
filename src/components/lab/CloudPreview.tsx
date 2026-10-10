"use client";

import { useState } from "react";
import { InkDrawing } from "./InkDrawing";
import { head, ribbon } from "./cloudArt";

/** One traced cloud head and one ribbon stream, inking in on the cream page. */
export function CloudPreview() {
  const [run, setRun] = useState(0);
  return (
    <div className="mx-auto max-w-6xl px-6 py-10 font-sans sm:px-8">
      <div className="flex flex-wrap items-baseline justify-between gap-4">
        <div>
          <h1 className="font-serif text-[30px] leading-tight text-ink lg:text-4xl">Traced clouds</h1>
          <p className="mt-2 max-w-[60ch] text-[15px] text-ink-soft">
            Traced line for line from the scholar reference. The ink is the original drawing&apos;s
            shape; only the draw-in is added.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setRun((r) => r + 1)}
          className="rounded-[12px] bg-ink px-3 py-1.5 text-[14px] font-normal text-cream"
        >
          Replay
        </button>
      </div>

      <section key={`h${run}`} data-play className="mt-10">
        <p className="text-[12px] uppercase tracking-[0.12em] text-ink-faint">Cloud head</p>
        <InkDrawing art={head} paper={false} className="mt-4 block h-auto w-full max-w-[1000px]" />
      </section>

      <section key={`r${run}`} data-play className="mt-14">
        <p className="text-[12px] uppercase tracking-[0.12em] text-ink-faint">Ribbon stream</p>
        <InkDrawing art={ribbon} paper={false} sweep={2.4} className="mt-4 block h-auto w-full" />
      </section>
    </div>
  );
}
