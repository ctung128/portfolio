import type { Metadata } from "next";
import { Bookshelf } from "@/components/library/Bookshelf";
import "@/components/library/library.css";

export const metadata: Metadata = {
  title: "Library",
  description: "A museum of books I love. Open one to read my thoughts.",
};

export default function LibraryPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 pb-24 pt-[25px] sm:px-8 sm:pt-20">
      <Bookshelf />
    </div>
  );
}
