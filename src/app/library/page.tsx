import type { Metadata } from "next";
import { Bookshelf } from "@/components/library/Bookshelf";
import "@/components/library/library.css";

export const metadata: Metadata = {
  title: "Library",
  description: "A museum of my favorite books. Open one to read what I thought.",
};

export default function LibraryPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 pb-24 pt-[45px] sm:px-8 sm:pt-20">
      <Bookshelf />
    </div>
  );
}
