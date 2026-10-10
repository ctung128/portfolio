export const notesPage = {
  headline: "Notes",
};

/** A name, a work, or both: "Name", "Name, *Work*" or "*Work* (note)". */
export type Reading = { name?: string; work?: string; note?: string };

export type Note = {
  slug: string;
  title: string;
  /** ISO date, shown as MM-DD-YYYY. */
  date: string;
  /** Pinned notes lead the list and open by default on /notes. */
  pinned?: boolean;
  paragraphs: string[];
  signoff?: string;
  reading?: { heading: string; items: Reading[] };
  /** Read-aloud banner at the top of the note; its cover carries the title. */
  audio?: {
    src: string;
    cover: string;
    description: string;
    duration: number;
    /** When each sentence of `paragraphs` starts in the audio (seconds, split by `splitSentences`). */
    sentenceStarts?: number[];
  };
};

// Newest first; pinned notes are lifted to the top by `sortedNotes`.
export const notes: Note[] = [
  {
    slug: "design-philosophy",
    title: "Design philosophy",
    date: "2026-10-10",
    pinned: true,
    audio: {
      src: "/notes/design-philosophy.m4a",
      cover: "/notes/design-philosophy-banner.webp",
      description: "my thoughts on design craft",
      duration: 106,
      // From the pauses in the recording, 0.1s early so the highlight leads the voice.
      sentenceStarts: [0.68, 3.88, 11.25, 13.53, 19.62, 26.37, 32.98, 42.93, 46.64, 52.52, 55.86, 59.32, 68.98, 75.51, 84.97, 89.4, 92.94, 94.55, 99.5],
    },
    paragraphs: [
      "Design, to me, is the search for form. Every time I start from nothing, I’m asking a question more critical than any KPI: what deserves to exist? I take that question seriously. Design was born to fight for the person on the other side of the work, and I still believe that’s the job.",
      "Although function is king, it's now more important than ever for products to have identities and souls. In Japan, there’s an aesthetic called wabi-sabi that finds beauty in things that are imperfect and ephemeral. To teach his son a lesson about wabi-sabi, the tea master Sen no Rikyu raked his garden perfectly clean, then shook a tree so a few leaves fell back down. What Rikyu said: \"Now the garden is perfect.\" A perfectly manicured garden feels soulless, but a few leaves on the ground can bring it back to life. In an interface, the details do the same.",
      "So, ornament is what gives things soul. In the 1800s, craftsmen spent years dedicated to ornament, crafting grand cathedrals, engraved rifles, or twenty-feet-long rugs, sewn by hand. Today we call ourselves minimalists, but that craftsmanship is still here; it just looks different. When light glides cleanly across the curve of an AirPods case, that’s the product of engineers painstakingly sculpting a surface most people will never consciously notice. That hidden craftmanship is how you know someone paid attention to the human.",
      "Dostoevsky believed beauty will save the world. I believe it too. Good design is about making things worth keeping, things people still love years from now. And that, to me, is what deserves to exist.",
    ],
    signoff: "— Carolyn",
    reading: {
      heading: "Foundational reading",
      items: [
        { name: "Vitaly Friedman" },
        { name: "Tuhin Kumar" },
        { work: "Objectified", note: "Gary Hustwit" },
        { name: "Oscar Wilde", work: "The Decay of Lying" },
        { name: "Fyodor Dostoevsky", work: "The Idiot" },
        { name: "Leonard Koren", work: "Wabi-Sabi for Artists, Designers, Poets & Philosophers" },
        { name: "Jun’ichirō Tanizaki", work: "In Praise of Shadows" },
        { work: "The Maximalist Theory of Minimalism", note: "Config 2025" },
      ],
    },
  },
];

/** Splits a paragraph after . ? ! (or a closing quote) followed by a capital. */
export const splitSentences = (p: string) => p.split(/(?<=[.?!"])\s+(?=[A-Z"])/);

export const sortedNotes = [...notes].sort(
  (a, b) => Number(!!b.pinned) - Number(!!a.pinned) || b.date.localeCompare(a.date),
);

export const getNote = (slug: string) => notes.find((n) => n.slug === slug);

/** "2026-10-10" → "10-10-2026". */
export const formatNoteDate = (iso: string) => {
  const [y, m, d] = iso.split("-");
  return `${m}-${d}-${y}`;
};
