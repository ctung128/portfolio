import type { Metadata } from "next";
import { playPage } from "@/content/site";
import { PlayGallery } from "@/components/play/PlayGallery";

export const metadata: Metadata = {
  title: "Play",
  description: playPage.description,
};

export default function PlayPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 pb-24 pt-16 sm:px-8 sm:pt-20">
      <header className="max-w-2xl">
        <h1 className="font-serif text-[28px] leading-tight text-ink sm:text-[38px] lg:text-5xl">
          {playPage.headline}
        </h1>
        <p className="mt-5 font-sans text-lg leading-relaxed text-ink-soft">
          {playPage.description}
        </p>
      </header>

      <PlayGallery />
    </div>
  );
}
