import { notFound } from "next/navigation";
import { NotesShell } from "@/components/notes/NotesShell";

export default function NotesLayout({ children }: LayoutProps<"/notes">) {
  // Hidden for now (also removed from the nav in src/content/site.ts).
  notFound();
  return (
    <div className="mx-auto max-w-5xl px-6 pb-24 pt-[25px] sm:px-8 sm:pt-20">
      <NotesShell>{children}</NotesShell>
    </div>
  );
}
