import type { Metadata } from "next";
import Link from "next/link";
import { DirectionB } from "@/components/library/DirectionB";
import { DirectionC } from "@/components/library/DirectionC";
import "@/components/library/library.css";

export const metadata: Metadata = {
  title: "Library",
  description: "A museum of my favorite books. Open one to read what I thought.",
};

// Temporary: directions to pick from (?v=b|c|c-post); drop the switcher and
// the unused pieces once one is chosen.
const DIRECTIONS = {
  b: { label: "B · Spectrum", render: () => <DirectionB /> },
  c: { label: "C · Exhibition", render: () => <DirectionC /> },
  "c-post": { label: "C · Exhibition + A’s card", render: () => <DirectionC card="post" /> },
} as const;

type Key = keyof typeof DIRECTIONS;

export default async function LibraryPage({ searchParams }: PageProps<"/library">) {
  const { v } = await searchParams;
  const key: Key = typeof v === "string" && v in DIRECTIONS ? (v as Key) : "b";

  return (
    <div className="mx-auto max-w-5xl px-6 pb-24 pt-16 sm:px-8 sm:pt-20">
      <header className="max-w-2xl">
        <h1 className="font-serif text-[28px] leading-tight text-ink sm:text-[38px] lg:text-5xl">
          Library
        </h1>
        <p className="mt-5 font-sans text-lg leading-relaxed text-ink-soft">
          A museum of my favorite books. Open one to read what I thought.
        </p>
      </header>

      <nav
        aria-label="Design directions"
        className="mb-8 mt-8 flex flex-wrap gap-2 font-sans text-xs"
      >
        {(Object.keys(DIRECTIONS) as Key[]).map((k) => (
          <Link
            key={k}
            href={`/library?v=${k}`}
            scroll={false}
            aria-current={k === key ? "page" : undefined}
            className={`rounded-full border px-3 py-1.5 transition-colors ${
              k === key
                ? "border-ink bg-ink text-cream"
                : "border-border-strong text-ink-soft hover:border-ink hover:text-ink"
            }`}
          >
            {DIRECTIONS[k].label}
          </Link>
        ))}
      </nav>

      {DIRECTIONS[key].render()}
    </div>
  );
}
