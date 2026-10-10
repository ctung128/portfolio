import { NotesShell } from "@/components/notes/NotesShell";

export default function NotesLayout({ children }: LayoutProps<"/notes">) {
  return (
    <div className="mx-auto max-w-5xl px-6 pb-24 pt-[25px] sm:px-8 sm:pt-20">
      <NotesShell>{children}</NotesShell>
    </div>
  );
}
