export const notesPage = {
  headline: "Notes",
};

/** A name, a work, or both: "Name", "*Work* — Name" or "*Work* (note)". `name` and `note` may hold [words](https://…) links. */
export type Reading = { name?: string; work?: string; note?: string };

/** Shown after a list's heading as "Name, *Work* (year)"; any part may be left out. */
export type Credit = { name?: string; work?: string; year?: number };

export type Note = {
  slug: string;
  title: string;
  /** ISO date, shown as MM-DD-YYYY. */
  date: string;
  paragraphs: string[];
  /** Images shown after the paragraph at index `after`; width/height in CSS px (half the 2× screenshot). */
  figures?: { after: number; src: string; alt: string; width: number; height: number }[];
  signoff?: string;
  /** Reading lists under the note, each under its own heading; `credit` names the source of the whole list. */
  reading?: { heading: string; credit?: Credit; items: Reading[] }[];
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

// Listed in the order of `noteOrder`, not this array.
export const notes: Note[] = [
  {
    slug: "my-2026-book-log",
    title: "My 2026 book log",
    date: "2026-10-11",
    paragraphs: [],
    reading: [
      {
        heading: "Currently reading",
        items: [
          {
            name: "Siddhartha Mukherjee",
            work: "The Emperor of All Maladies: A Biography of Cancer",
            note: "for a book club with my medical student friends",
          },
          { name: "张天翼", work: "人鱼之间", note: "trudging through it because it’s in Chinese" },
        ],
      },
      {
        heading: "Read so far",
        items: [
          { name: "Mizuki Tsujimura", work: "Lost Souls Meet Under a Full Moon", note: "rec from Amrita" },
          { name: "簡媜", work: "水问" },
          { name: "Yoko Ogawa", work: "The Housekeeper and the Professor" },
          { name: "Leonard Koren", work: "Wabi-Sabi: for Artists, Designers, Poets & Philosophers", note: "reread" },
          { name: "Jun’ichirō Tanizaki", work: "In Praise of Shadows", note: "reread" },
        ],
      },
      {
        heading: "On my list",
        items: [{ name: "C.S. Lewis", work: "Mere Christianity" }, { work: "The Book of Ecclesiastes" }, { name: "Eric Jorgenson", work: "The Almanack of Naval Ravikant", note: "another reread" }],
      },
    ],
  },
  {
    slug: "rabbitholes",
    title: "Rabbitholes",
    date: "2026-10-11",
    paragraphs: [],
    // `name` is the rabbithole, `note` the faint aside. Link words in either with [words](https://…).
    reading: [
      {
        heading: "2026",
        items: [
          { name: "Design engineering" },
          { name: "Consumer app growth hacks" },
          { name: "Spirituality, mysticism, and airbending" },
          { name: "Portrait photography" },
          { name: "Ticks and cyclosporiasis" },
          { name: "Calligraphy" },
        ],
      },
      {
        heading: "2025",
        items: [
          { name: "Cursor", note: "my first descent into vibe-coding & git basics" },
          { name: "Growing a design studio", note: "scaled it to six-figures in < 1 year and learned i dislike marketing. also binged a lot of chris do videos." },
          { name: "Good Culture cottage cheese", note: "admittedly fell victim to Big Protein" },
          {
            name: "Folk search engines like [Marginalia](https://marginalia-search.com/)",
            note: "inspired by [this One Thing post](https://onethingnewsletter.substack.com/p/beyond-the-search-engine)",
          },
          { name: "Philosophy of aesthetics" },
          { name: "Yixing / purple clay teapots 宜兴紫砂壶"},
          { name: "Art history" },
          { name: "Ikebana" },
        ],
      },
      {
        heading: "2024",
        items: [
          { name: "Framer web design & high-converting landing pages" },
          { name: "Chess", note: "forced my friends to play every night of winter 2024. i am washed now though" },
          { name: "Schema monks", note: "iykyk" },
          { name: "Audrey Hepburn movies" },
          { name: "Phantom of the Opera" },
          { name: "Sporcle", note: "i love geography" },
          { name: "Unicorns" },
        ],
      },
      {
        heading: "2023",
        items: [ { name: "Zines & graphic design" }, { name: "Video editing" }, { name: "Hamsters" }, { name: "Cheer Chen 陈绮贞"}, { name: "Magical realism"}],
      },
    ],
  },
  {
    slug: "exploratory-education",
    title: "Exploratory education",
    date: "2026-08-05",
    paragraphs: [],
    // `work` is the course, `name` who teaches it, `note` when it was finished.
    reading: [
      {
        heading: "Working through",
        items: [
          { name: "The Odin Project", work: "Full Stack JavaScript" },
          { name: "Josh Puckett", work: "Interface Craft" },
          { name: "Mariana Castilho", work: "UI Engineering 101" },
          { name: "Zero to Hero", work: "HSK 5" },
        ],
      },
      {
        heading: "Completed",
        items: [
          { name: "The Odin Project", work: "Foundations", note: "Aug 2026" },
          { name: "ShiftNudge", work: "Interface Design", note: "Sep 2025" },
          { name: "Maven", work: "AI-Assisted App Development", note: "May 2025" },
          { name: "Designership", work: "Figma Masterclass", note: "Aug 2024" },
        ],
      },
    ],
  },
  {
    slug: "role-of-the-designer",
    title: "On the role of the designer",
    date: "2026-10-11",
    paragraphs: [],
    // Each list is a theme; `name` is the thought, `credit` (whole list) or `note` (one line) where it came from.
    reading: [
      {
        heading: "Giving form to possible futures",
        credit: { name: "Dunne & Raby", work: "Speculative Everything" },
        items: [
          {
            name: "The designer helps people imagine futures, generating ones that “act as catalysts for public debate and discussion about the kinds of futures people really want.”",
          },
          {
            name: "Designers can facilitate a dreaming that unlocks people’s own imaginations: seven billion little utopias from the bottom up. The challenge is to give them form.",
          },
        ],
      },
      {
        heading: "Culture generators",
        credit: { work: "Objectified", year: 2009 },
        items: [
          {
            name: "In France, philosophers are the culture generators (people want their thoughts on the cheese war with Italy, or the price of gas). Designers could be the culture generators all over the world—the intellectuals of the future." },
        ],
      },
      {
        heading: "A good host",
        credit: { name: "Charles Eames" },
        items: [{ name: "The role of the designer is to be a good host." }],
      },
      {
        heading: "Keeping the question open",
        credit: { name: "Rosanne Somerson, RISD" },
        items: [
          { name: "The designer’s role is to keep the question open longer than anyone else will. The result is things that matter—things that haven’t existed or been imagined before." },
        ],
      },
      {
        heading: "Designing for the future",
        credit: { work: "Objectified", year: 2009 },
        items: [
          { name: "The job of the designer is to look into the future, not to use any frame of reference that exists now." },
          { name: "Make products fundamentally non-disposable: things you want to keep that stand the test of time." },
          { name: "Design thinking is a way to be systematically innovative." },
        ],
      },
      {
        heading: "A moral responsibility",
        credit: { name: "Tuhin Kumar" },
        items: [
          { name: "As designers, we are charged with what should come into existence in the world. That is a moral responsibility." },
          {
            name: "We talk business metrics and stakeholder alignment, but design was brought into existence because we needed a function to fight for the user.",
          },
          {
            name: "Early on, the designer has the most influence on the shape something can take. That is what separates a designer’s signature from doing something just because it seems cool.",
          },
        ],
      },
      {
        heading: "Knowing what is desirable",
        credit: { name: "Tuhin Kumar" },
        items: [
          { name: "Design is knowing what is desirable." },
          {
            name: "You can fulfill the jobs to be done, but that alone isn’t sticky: one day a better business model comes along and people switch.",
          },
        ],
      },
      {
        heading: "The expert who explains why",
        credit: { name: "Tom Greever", work: "Articulating Design Decisions" },
        items: [
          { name: "The designer’s role is to be the expert who can explain why: making the case for the user to the people who decide what ships." },
        ],
      },
    ],
  },
  {
    slug: "hiring-junior-designers",
    title: "Hiring/mentoring junior designers",
    date: "2026-03-30",
    paragraphs: [
      "Before we closed up shop in early 2026, my cofounder Sean and I hired an intern for B’More Designful, our design studio. We ran three rounds: a behavioral interview, a case study presentation, and a live design challenge. We interviewed 25+ candidates in the first round and narrowed it down to about five for the final round.",
      "If you’re a junior designer applying for roles, one piece of advice: let your personality shine in the right places. Likeability and personality fit mattered a lot to us (they even settled our tiebreaker), and the best places to show them are a charming, quirky portfolio and the conversation itself. In written answers, clear, professional, and thoughtful still wins. One applicant told us their favorite candy is \"Nerds Gummy Clusters :3\" (valid, but save it for the call). Another assured us that they are HIM over email. Show us in the case study!",
      "Being intentional about hiring, onboarding, and mentorship led us to the best intern for our needs: someone hungry to grow, scrappy, willing to go above and beyond, and a delight to work with. Shoutout to Alli! We met up in NYC earlier this year, which was a great way to close things out.",
    ],
    reading: [
      {
        heading: "What we looked for",
        items: [
          { name: "A win-or-learn mentality" },
          { name: "High autonomy and drive" },
          { name: "Scrappiness and a love of startup velocity" },
          { name: "Self-motivation and strong time management" },
          { name: "Someone fun to work with, whom we’d be thrilled to welcome onto our team and mentor" },
        ],
      },
      {
        heading: "If you’re applying",
        items: [
          { name: "Show your personality in your portfolio and in conversation; keep written answers clear and thoughtful." },
          { name: "Let your visual craft and taste shine in your case study slides. You’re a designer, and we need to see your design sense." },
          { name: "Use everything the team tells you about each round: the agenda, which projects to present, and the judging criteria." },
        ],
      },
      {
        heading: "If you’re a small team that's hiring",
        items: [
          { name: "Respond personally to thank-you emails." },
          { name: "Send personalized feedback to final round candidates whom you don’t move forward." },
          { name: "Send a physical welcome care package with a handwritten letter." },
        ],
      },
    ],
  },
  {
    slug: "design-philosophy",
    title: "Design philosophy",
    date: "2026-10-10",
    audio: {
      src: "/notes/design-philosophy.m4a",
      cover: "/notes/design-philosophy-banner.webp",
      description: "my thoughts on design craft",
      duration: 93,
      // Where each sentence's voice starts in the edited file (pauses evened to 0.9s), 0.1s early so the highlight leads the voice.
      sentenceStarts: [0, 6.39, 10, 14.94, 18.11, 22.87, 32.43, 36.49, 43.93, 47.3, 51.06, 52.91, 59.44, 67.91, 73.38, 76.74, 81.48, 87.92],
    },
    paragraphs: [
      "Every time I'm starting a new project from zero, I'm really asking one question: what deserves to exist?",
      "In tech, our answer tends to be colored by minimalism. Dieter Rams famously said, \"Good design is as little design as possible.\" But taken too far, every product starts looking the same.",
      "A lot of people in tech believe function is king, while others lament over the loss of ornament. In the 1800s, craftsmen spent years on grand cathedrals, engraved rifles, and twenty-foot-long rugs, and it can feel like that level of craft belongs to a bygone era. But look at the way light glides across the curve of an AirPods case. Engineers sculpted that in CAD purely for the sake of beauty and delight, and knockoff AirPods can’t replicate that level of craft. So it's more accurate to say ornament never died. It just found a new vessel, hidden beneath the veneer of minimalism.",
      "So how do you learn to see it? For me, being an eager student of life has led me to disciplines like ikebana, calligraphy, and philosophy. Each one has sharpened my sensibility, and made me a more patient, passionate, and invested maker of products that pay attention to the human. Every rabbit hole I fall down and every side project I build helps fill in the shape of my craft.",
      "Design was born to fight for the person on the other side of the work. Dostoevsky wrote that beauty will save the world, and I believe it too. I want to make things that make people's lives a little bit easier, and a little bit more beautiful. That's what deserves to exist.",
    ],
    signoff: "— Carolyn",
    reading: [
      {
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
    ],
  },
];

/** Splits a paragraph after . ? ! (or a closing quote) followed by a capital. */
export const splitSentences = (p: string) => p.split(/(?<=[.?!"])\s+(?=[A-Z"])/);

/** List order, most relevant to people in tech first; the first one opens by default on /notes. Unlisted notes follow, newest first. */
const noteOrder = [
  "design-philosophy",
  "role-of-the-designer",
  "hiring-junior-designers",
  "exploratory-education",
  "rabbitholes",
  "my-2026-book-log",
];

const rank = (n: Note) => (noteOrder.indexOf(n.slug) + 1 || Infinity);

export const sortedNotes = [...notes].sort(
  (a, b) => rank(a) - rank(b) || b.date.localeCompare(a.date),
);

export const getNote = (slug: string) => notes.find((n) => n.slug === slug);

/** "2026-10-10" → "10-10-2026". */
export const formatNoteDate = (iso: string) => {
  const [y, m, d] = iso.split("-");
  return `${m}-${d}-${y}`;
};
