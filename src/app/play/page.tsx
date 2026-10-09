import type { Metadata } from "next";
import { playPage } from "@/content/site";
import { PlayGallery } from "@/components/play/PlayGallery";

export const metadata: Metadata = {
  title: "Play",
  description: playPage.description,
};

export default function PlayPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 pb-24 pt-[25px] sm:px-8 sm:pt-20">
      <PlayGallery />
    </div>
  );
}
