/** Library: the bookshelf at /library. Covers are the editions logged on
 * Goodreads (Amazon's hi-res image where it's the same cover, else Goodreads'
 * own ~300px one), ≤640px q84 WebP in public/library/covers/; originals in
 * media-originals/library/en/. Reviews are from Goodreads, lightly trimmed. */

export const TAGS = {
  italian: "Italian lit",
  japanese: "Japanese lit",
  russian: "Russian lit",
  german: "German lit",
  taiwanese: "Taiwanese lit",
  novel: "Novel",
  novella: "Novella",
  memoir: "Memoir",
  essay: "Essay",
  nonfiction: "Nonfiction",
  history: "History",
  philosophy: "Philosophy",
  aesthetics: "Aesthetics",
  design: "Design",
  tea: "Tea",
  spirituality: "Spirituality",
  classic: "Classic",
  friendship: "Female friendship",
  comingOfAge: "Coming of age",
  love: "Love",
  grief: "Grief",
  medicine: "Medicine",
  madness: "Madness",
  queer: "Queer",
  sciFi: "Sci-fi",
  experimental: "Experimental",
  myth: "Mythology",
  family: "Family",
  immigration: "Immigration",
  china: "China",
  tech: "Technology",
  war: "War",
} as const;

export type TagKey = keyof typeof TAGS;

export type Book = {
  slug: string;
  title: string;
  author: string;
  /** Original publication year. */
  year: number;
  /** Month finished, "YYYY-MM"; absent for books read after the Goodreads export. */
  read?: string;
  rating?: 1 | 2 | 3 | 4 | 5;
  /** A colour pulled from the cover, for tints and the colour-sorted shelf. */
  tone: string;
  tags: TagKey[];
  /** Empty until written (shows "Review coming soon"). */
  review: string[];
};

export const cover = (b: Book) => `/library/covers/${b.slug}.webp`;

export const books: Book[] = [
  {
    slug: "book-of-tea",
    title: "The Book of Tea",
    author: "Kakuzō Okakura",
    year: 1906,
    read: "2024-06",
    rating: 4,
    tone: "#6f7a2c",
    tags: ["japanese", "essay", "tea", "philosophy"],
    review: [
      "teaism = tea isn’t just a drink—it’s a philosophy and a way of life!! i love japandi interior design and tea houses, so it was fun learning about how tea rooms are constructed, organized, and involved in ritual.",
      "so many interesting quotes in here about taoism and zennism that i still need to decompose and process. probably deserves a reread. i sympathize with okakura’s mission… the west just doesn’t get it",
    ],
  },
  {
    slug: "in-praise-of-shadows",
    title: "In Praise of Shadows",
    author: "Jun'ichirō Tanizaki",
    year: 1933,
    read: "2024-09",
    rating: 5,
    tone: "#2a2a2a",
    tags: ["japanese", "essay", "aesthetics"],
    review: ["i would love to sit and chat with this man over tea. he’s just like me"],
  },
  {
    slug: "siddhartha",
    title: "Siddhartha",
    author: "Hermann Hesse",
    year: 1922,
    read: "2024-05",
    rating: 4,
    tone: "#d07a2a",
    tags: ["german", "novella", "spirituality"],
    review: [
      "after letting my notes on this book marinate, one year later i have returned feeling much more “childlike,” as siddhartha puts it.",
      "the self, personal growth, and life is cyclic. nothing is linear. the young are arrogant and don’t know things. nobody can teach you how to attain spiritual peace or to gain enlightenment; only your lived experiences can help you reach this state.",
    ],
  },
  {
    slug: "days-of-abandonment",
    title: "The Days of Abandonment",
    author: "Elena Ferrante",
    year: 2002,
    read: "2024-09",
    rating: 5,
    tone: "#5a5aa8",
    tags: ["italian", "novel", "madness"],
    review: [
      "ferrante never ceases to amaze me. once again her writing has put a spell on me. while reading this, i was lost in the chaos of olga's demise, just drowning in her insanity. i was crawling on the floor, losing my mind with her.",
      "kind of like the yellow wallpaper but 100x better. incredible reading experience. incredible book. incredible title. what am i going to do when i run out of ferrante books to read",
    ],
  },
  {
    slug: "being-mortal",
    title: "Being Mortal",
    author: "Atul Gawande",
    year: 2014,
    read: "2023-11",
    rating: 5,
    tone: "#6b8a3a",
    tags: ["nonfiction", "medicine", "grief"],
    review: ["as someone who is about to face profound grief, this book made me cry"],
  },
  {
    slug: "new-name",
    title: "The Story of a New Name",
    author: "Elena Ferrante",
    year: 2012,
    read: "2023-10",
    rating: 5,
    tone: "#8ab0b8",
    tags: ["italian", "novel", "friendship", "comingOfAge"],
    review: [
      "significantly better than my brilliant friend, which i already treated with high esteem… elena ferrante, the woman that you are",
    ],
  },
  {
    slug: "brothers-karamazov",
    title: "The Brothers Karamazov",
    author: "Fyodor Dostoevsky",
    year: 1880,
    tone: "#b8261e",
    tags: ["russian", "novel", "classic", "philosophy"],
    review: [],
  },
  {
    slug: "wabi-sabi",
    title: "Wabi-Sabi: for Artists, Designers, Poets & Philosophers",
    author: "Leonard Koren",
    year: 1994,
    read: "2022-08",
    rating: 3,
    tone: "#8a6a3a",
    tags: ["aesthetics", "design", "philosophy"],
    review: [
      "beauty can be coaxed out of ugliness; it is a dynamic event that occurs between you and something else and can spontaneously occur at any moment in the right conditions. beauty is thus an altered state of consciousness, an extraordinary moment of poetry and grace",
    ],
  },
  {
    slug: "strange-weather-in-tokyo",
    title: "Strange Weather in Tokyo",
    author: "Hiromi Kawakami",
    year: 2001,
    read: "2022-07",
    rating: 5,
    tone: "#c8302a",
    tags: ["japanese", "novel", "love"],
    review: [
      "now on my bucket list: mushroom hunting, reminiscing over my schoolgirl youth at a cherry blossom watching party, and collecting littlenecked clams in a hot springs town by the sea with my lover at night…",
      "tsukiko is such an endearing, silly girl. truly, what a lovely girl you are, tsukiko",
    ],
  },
  {
    slug: "the-membranes",
    title: "The Membranes",
    author: "Chi Ta-wei",
    year: 1995,
    read: "2022-05",
    rating: 5,
    tone: "#d8702a",
    tags: ["taiwanese", "novel", "sciFi", "queer"],
    review: ["this is my favorite book of all time rn…obsessed"],
  },
  {
    slug: "fish-in-exile",
    title: "Fish in Exile",
    author: "Vi Khi Nao",
    year: 2016,
    read: "2022-06",
    rating: 4,
    tone: "#7a8a96",
    tags: ["novel", "experimental", "grief", "myth"],
    review: [
      "the poetic wounds of modern, mythological homer… defamiliarized language… the most beautiful, beautiful prose… intelligent in every way",
    ],
  },
  {
    slug: "rape-of-nanking",
    title: "The Rape of Nanking",
    author: "Iris Chang",
    year: 1997,
    read: "2020-12",
    rating: 5,
    tone: "#d8412e",
    tags: ["history", "china", "war"],
    review: ["how many times can a heart break? to nanjing, my first love."],
  },
  {
    slug: "the-unpassing",
    title: "The Unpassing",
    author: "Chia-Chia Lin",
    year: 2019,
    read: "2020-04",
    rating: 5,
    tone: "#2a4a6a",
    tags: ["novel", "family", "immigration", "grief"],
    review: [
      "yesterday my creative writ prof and i both gushed over this book… she said it’s an incredibly atmospheric novel that was made for people who love to read and write… we both love the unpassing…",
    ],
  },
  {
    slug: "notes-of-a-crocodile",
    title: "Notes of a Crocodile",
    author: "Qiu Miaojin",
    year: 1994,
    read: "2018-02",
    rating: 5,
    tone: "#e8b81a",
    tags: ["taiwanese", "novel", "queer", "comingOfAge"],
    review: ["i read this at such a formative age that this book is forever etched into my soul"],
  },
  {
    slug: "breakneck",
    title: "Breakneck: China's Quest to Engineer the Future",
    author: "Dan Wang",
    year: 2025,
    tone: "#c9a43a",
    tags: ["nonfiction", "china", "tech"],
    review: [],
  },
  {
    slug: "mountains-are-high",
    title: "The Mountains Are High",
    author: "Alec Ash",
    year: 2023,
    read: "2024-07",
    rating: 4,
    tone: "#d8a060",
    tags: ["memoir", "china"],
    review: [
      "before reading this, if you had told me that dali, a city in rural china, is a psychedelic rave haven that houses the kind of environmentalist collectives, coworking spaces, and web3 conferences that you'd find in SF or toronto...i would never have believed you.",
      "100% worth reading just to learn about the cultural landscape of this one (1) city... i’m really interested in the psychogeography of cities, and its historical role in safeguarding counterculture rebels who want to escape state surveillance and societal norms.",
    ],
  },
  {
    slug: "blockchain-chicken-farm",
    title: "Blockchain Chicken Farm",
    author: "Xiaowei Wang",
    year: 2020,
    read: "2022-08",
    rating: 5,
    tone: "#6a7a5a",
    tags: ["nonfiction", "china", "tech"],
    review: [
      "overwhelmingly good. took so many notes - all my fav topics (shanzhai, sinofuturism, urban-rural gap, neural networks, ethics in tech, etc).",
    ],
  },
];

const SEASONS = ["WINTER", "WINTER", "SPRING", "SPRING", "SPRING", "SUMMER", "SUMMER", "SUMMER", "AUTUMN", "AUTUMN", "AUTUMN", "WINTER"];

/** The season a book was finished in, for the vertical running text on cards;
 * its publication year when there's no read date. */
export const season = (b: Book) => (b.read ? SEASONS[Number(b.read.slice(5, 7)) - 1] : String(b.year));

/** "2024.09" */
export const readLabel = (b: Book) => b.read?.replace("-", ".");

/** Hue in degrees (0–360) of a book's tone, for sorting the shelf by colour. */
export function hue(hex: string) {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const d = max - min;
  if (d < 0.08) return 400 + (1 - max) * 100; // greys/whites sort to the end, light → dark
  const h = max === r ? ((g - b) / d) % 6 : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
  return (h * 60 + 360) % 360;
}
