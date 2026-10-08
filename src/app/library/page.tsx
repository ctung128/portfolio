import type { Metadata } from "next";
import { Bookshelf } from "@/components/library/Bookshelf";
import "@/components/library/library.css";

export const metadata: Metadata = {
  title: "Library",
  description: "A museum of my favorite books. Open one to read what I thought.",
};

export default function LibraryPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 pb-24 pt-16 sm:px-8 sm:pt-20">
      <header className="max-w-2xl">
        <h1 className="font-serif text-[28px] leading-tight text-ink sm:text-[38px] lg:text-5xl">
          Library
        </h1>
        <p className="mt-5 font-sans text-base leading-relaxed text-ink-soft">
          A museum of my favorite books. Open one to read what I thought.
        </p>
      </header>

      <div className="mt-10">
        <Bookshelf />
      </div>
    </div>
  );
}
