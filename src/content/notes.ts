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
      duration: 88,
      // Word timestamps from a transcript (faster-whisper small.en), 0.1s early so the highlight leads the voice.
      sentenceStarts: [0, 3.19, 9.01, 14.25, 16.65, 23.49, 28.85, 32.37, 37.31, 40.65, 43.65, 51.89, 59.25, 63.29, 68.23, 72.97, 77.57, 81.09],
    },
    paragraphs: [
      "I believe that design is the search for form. Every time I'm starting from 0, I’m really asking one question: What deserves to exist? Design was born to fight for the person on the other side of the work, and I still believe that’s the job.",
      "Products need to have identities and souls. The tea master Sen no Rikyu once asked his son to tidy their garden, so the son raked it perfectly clean, as one does. To teach him a lesson about wabi-sabi, Rikyu shook a tree so that a few leaves fell back down. Then he said: \"Now the garden is perfect.\" A completely manicured garden feels lifeless, but a few fallen leaves can bring it back to life. In an interface, the details do the same.",
      "So, ornament is what gives things soul. In the 1800s, craftsmen spent years dedicated to ornament, crafting grand cathedrals, engraved rifles, and twenty-foot-long rugs. Today we call ourselves minimalists, but that craftsmanship is actually still here; it just looks a little different. Pick up an AirPods case and watch the light glide across its curve. Engineers painstakingly sculpted that surface, purely for the sake of beauty and delight. That hidden craftsmanship is how you know someone was paying attention to the human.",
      "Dostoevsky wrote that beauty will save the world, and I believe it too. I want to make things people still love years from now, things worth keeping. That, to me, is what deserves to exist.",
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
