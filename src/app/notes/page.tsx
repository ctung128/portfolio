import type { Metadata } from "next";
import { notesPage, sortedNotes } from "@/content/notes";
import { NoteBody } from "@/components/notes/NoteBody";

export const metadata: Metadata = {
  title: notesPage.headline,
};

/** md+ shows the first (pinned) note beside the list; phones show only the list. */
export default function NotesPage() {
  return <NoteBody note={sortedNotes[0]} />;
}
