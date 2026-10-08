import type { Metadata } from "next";
import Link from "next/link";
import { playPage } from "@/content/site";
import { PlayGallery } from "@/components/play/PlayGallery";
import { DirectionA, DirectionB, DirectionC } from "@/components/play/PlayDirections";

export const metadata: Metadata = {
  title: "Play",
  description: playPage.description,
};

function Current() {
  return (
    <>
      <header className="max-w-2xl">
        <h1 className="font-serif text-[28px] leading-tight text-ink sm:text-[38px] lg:text-5xl">
          {playPage.headline}
        </h1>
        <p className="mt-5 font-sans text-lg leading-relaxed text-ink-soft">
          {playPage.description}
        </p>
      </header>
      <PlayGallery />
    </>
  );
}

// Temporary: directions modelled on dinmukhamed.me/craft (?v=a|b|c, "now" is
// the shipped gallery). Drop the switcher and the unused pieces once one is picked.
const DIRECTIONS = {
  a: { label: "A · Faithful", render: () => <DirectionA /> },
  b: { label: "B · Catalogue", render: () => <DirectionB /> },
  c: { label: "C · Open first", render: () => <DirectionC /> },
  now: { label: "Now", render: () => <Current /> },
} as const;

type Key = keyof typeof DIRECTIONS;

export default async function PlayPage({ searchParams }: PageProps<"/play">) {
  const { v } = await searchParams;
  const key: Key = typeof v === "string" && v in DIRECTIONS ? (v as Key) : "a";

  return (
    <div className="mx-auto max-w-5xl px-6 pb-24 pt-10 sm:px-8 sm:pt-12">
      <nav aria-label="Design directions" className="mb-12 flex flex-wrap gap-2 font-sans text-xs">
        {(Object.keys(DIRECTIONS) as Key[]).map((k) => (
          <Link
            key={k}
            href={`/play?v=${k}`}
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
