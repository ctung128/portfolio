import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getNote, visibleNotes } from "@/content/notes";
import { NoteBody } from "@/components/notes/NoteBody";

export function generateStaticParams() {
  return visibleNotes.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: PageProps<"/notes/[slug]">): Promise<Metadata> {
  const note = getNote((await params).slug);
  if (!note) return {};
  // The root layout's title template already appends " | Carolyn Tung".
  return { title: note.title, description: note.paragraphs[0]?.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/\*\*/g, "") };
}

export default async function NotePage({ params }: PageProps<"/notes/[slug]">) {
  const note = getNote((await params).slug);
  if (!note) notFound();
  return <NoteBody note={note} />;
}
