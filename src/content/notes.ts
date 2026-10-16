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
  /** Paragraphs starting "## " are section headings; ones made of "- " lines are lists. Text may hold [words](https://…) links, **bold** and *italics*. */
  paragraphs: string[];
  /** Images or videos shown after the paragraph at index `after`; image width/height in CSS px (half the 2× screenshot). */
  figures?: (
    | {
        after: number;
        src: string;
        alt: string;
        width: number;
        height: number;
        /**
         * A transparent cutout shown as a storybook sticker (`StickerFigure`): a hello on scroll-in,
         * a wobble and blooming doodles on hover. `pad` is the transparent margin around the
         * die-cut, in the same units as width/height; rows line up her visible edge, not the file's.
         */
        sticker?: { pad: number };
        /** Where the image came from; credits show in one line under the image or row. */
        credit?: { label: string; href: string };
      }
    | { after: number; video: string; poster?: string; alt: string; /** File not added yet: a dashed slot in dev, nothing in production. */ pending?: boolean }
  )[];
  signoff?: string;
  /** Kept in the file but off the site: not listed, and its page 404s. */
  hidden?: boolean;
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
    slug: "why-startups-cultivate-friendability",
    title: "Why startups cultivate friendability",
    date: "2026-10-14",
    paragraphs: [
      "At the end of the day, people just want to make cool things with their friends. That’s one of the reasons I like startups.",
      "I’ve worked at companies early enough that there was no HR yet. At that size, they're kind of like members-only social clubs where you also happen to be building a business together. My design studio was just three of us: me, my cofounder, and an awesome design intern. When a team is that small, friendability matters as much as what you can do. The best people I’ve worked with were hungry and curious, but also just fun to be around.",
      "In *The Founder’s Dilemmas*, Noam Wasserman writes that the strongest founding teams are people who have worked together before and became friends through that work, so the team is already filtered for trust and fit from day one. Rockefeller said it best: “A friendship built on business can be glorious, while a business built on friendship can be murder.” My cofounder and I met at a startup, and it’s the four years and three teams together since then that made us friends. I’d say we’re on the glorious side.",
    ],
  },
  {
    slug: "shipping-with-claude-code",
    title: "My take on AI-second design",
    date: "2026-10-12",
    paragraphs: [
      "My newest personal software is [Pebble](https://learnpebble.vercel.app), a bespoke language learning app I built for my own learning. It transcribes Chinese podcasts, adds pinyin and English on demand, and exports vocab to Anki. Building it end to end in Claude Code sharpened how I think about designing AI products, so here’s my process.",
      "My pain point started with 小宇宙 (Xiaoyuzhou), a popular Chinese podcast app full of comedy, psychology discussions, and life advice. I wanted to listen to an interview with Cai Gao, a children's book illustrator and the first Chinese illustrator to win the [Hans Christian Andersen Award](https://www.ibby.org/awards-activities/awards/hans-christian-andersen-award/hans-christian-andersen-awards-2026/hcaa-2026-winner-for-illustration-cai-gao) (the highest honor in children's literature worldwide). But the app is built for native speakers, so following along meant screenshotting the subtitles every 30 seconds and pasting them into a translator. A very high friction experience that I wanted to solve!",
      "## AI-second, not AI-first",
      "Pebble runs on AI, but I design it AI-second. This philosophy comes from [Vitaly Friedman](https://www.dive.club/deep-dives/vitaly-friedman), who asks us to add “quiet AI” only where it removes friction or speeds up success. An AI-first mentality tends to turn teams into a feature factory of sparkle buttons, chatbots, and slop.",
      "Working from first principles, I start with the job to be done and employ design patterns people already trust. AI powers them in the backdrop of a familiar audio transcript interface, showing pinyin when you toggle it on and English on tap. With so many proven design patterns available, being a chatbot loyalist is a local maximum, not a global one.",
      "Trust is the limiting factor. Numerous [Nielsen Norman Group studies](https://www.nngroup.com/articles/designing-ai-study-guide/) show that advertising AI features make people expect upsells, hallucinations, and credits that run out fast. That puts the burden on design. Our job is to help people reach a good result in fewer prompts, so they succeed before they hit a credit limit and the company isn’t paying for every retry.",
      "## Designing for failure modes",
      "Hallucination is the default failure mode of AI. We can’t design it away, so I treat it as a constraint and over-index on surface area for trust. In Pebble, any line can be corrected by hand and reverted, and a line can be marked as “May need review” to be transparent about the model's limitations.",
      "Waiting with uncertainty was the most critical failure mode I designed for. Transcribing episodes that last over an hour can take a while, and a loading spinner leaves people wondering whether anything is happening. People want to see work in motion to trust the process and catch errors early.",
      "## Designing for edge cases",
      "My first few iterations filled the progress bar only from real-time updates. During audio processing, Pebble splits the audio into sections, and the progress bar moves forward each time a section finishes. But that broke down for non-podcast audio, like music or short-form content. A 55-second Douyin video I uploaded was a single section, so the bar sat empty for 20 seconds and jumped straight to done. This offered an underwhelming waiting experience.",
      "In the latest iteration, the progress bar eases forward on an estimate while each section processes and holds short of the end until the work actually finishes. Real-time updates still drive the bar, but now an estimate fills the silence between updates, providing system feedback that keeps the user in the loop. I also hide the steps for audio under 4 minutes since those clips finish in seconds and only add visual clutter.",
      "## How I build with Claude Code",
      "I built Pebble end to end in Claude Code. I wanted to start learning from podcasts as soon as possible, and an MVP that covered the core jobs to be done (a non-negotiable) would deliver value right away. The last 20%, the taste layer, could wait for later versions. My setup is the usual Claude Code playbook:",
      "- Plan mode before big changes, so we agree on the approach before any code is written\n- A CLAUDE.md that works like a product spec with guardrails, establishing what Pebble must never do, and which actions need my sign-off\n- A design system in Claude Design that Claude checks for exact sizes and tokens before building UI\n- Skills for repeatable work, like commits and fixing failing tests",
      "Prompting is a refinement journey that I try to optimize. I ask Claude to interview me before it starts, so it captures my vision and doesn’t waste tokens on guesses. I also use sliders to fine-tune UI details to take control over the taste layer.",
      "AI can’t one-shot a design and probably never will, so I ask Claude to generate three visual directions. This way I can play with the brand direction, micro-interactions, and feel before committing to one—or combining the best parts of each—to refine.",
      "## Design agents",
      "Taste is something you cultivate a sensitivity for through tacit knowledge. How might we leverage AI tools to reflect that in our work? After reading [Claire Taylor’s essay](https://claireytee.substack.com/p/thinking-is-still-the-work), I started keeping a taste journal in a skill file and adopted a new agent:",
      "-  **Taste maker:** gathers my recent saves from Substack, Instagram, and X, asks what they reveal about my taste, and turns the answers into heuristics for my design.md.",
      "I still prefer to rely on my own knowledge of best practices and heuristics for design critiques, as well as user testing. Outsourcing that to an agent works for evaluating visual consistency across a system, but now that AI can generate design (even if it can't one-shot it), critical thinking, process, and authority is kind of the whole point of hiring a designer.",
      "## Next steps?",
      "The [live demo](https://learnpebble.vercel.app) runs on sample episodes and Luvvoice AI voice actors, but I run a local-first version where I upload my own audio. Pebble has saved me an extraordinary amount of time. I translate and learn while listening instead of leaving the app and opening new tabs, so I stay immersed in the episode. Plus, a whole new world of perspectives has opened up to me via Chinese podcasts, which is priceless. If you’d like to use it too, let me know and I’ll build it for public use!!",
    ],
    // Recorded from the local version of Pebble.
    figures: [
      { after: 1, src: "/notes/pebble/cai-gao-sticker.webp", alt: "Illustrator Cai Gao smiling, holding flowers and her picture book 出生的故事", width: 192, height: 243, sticker: { pad: 10 }, credit: { label: "Hunan Provincial Government", href: "http://www.enghunan.gov.cn/hneng/News/Localnews/202604/t20260414_33954428.html" } },
      { after: 1, src: "/notes/pebble/cai-gao-baoer.webp", alt: "Cai Gao in her garden beside the cover of her picture book Baoer, winner of the BIB Golden Apple Award", width: 1180, height: 793, credit: { label: "Publishers Weekly", href: "https://www.publishersweekly.com/pw/by-topic/specials/promotional/article/98654-pw-studio-spotlight-on-cai-gao-innovative-storytelling-for-children.html" } },
      { after: 0, video: "/notes/pebble/listening.mp4", poster: "/notes/pebble/listening-poster.webp", alt: "Pebble playing an episode, revealing pinyin and English line by line" },
      { after: 10, video: "/notes/pebble/processing-before.mp4", poster: "/notes/pebble/processing-before-poster.webp", alt: "Pebble’s first progress screen: the bar sits empty for the whole of a one-section clip, then jumps to Transcript ready" },
      { after: 11, video: "/notes/pebble/processing-after.mp4", poster: "/notes/pebble/processing-after-poster.webp", alt: "Pebble’s progress screen now: the bar eases forward while the clip processes, then fills when the transcript is ready" },
      { after: 16, src: "/notes/pebble/directions.webp", alt: "Three visual directions for Pebble, Scholarly, Editorial and Wabi-sabi, combined into a fourth", width: 1792, height: 1344 },
    ],
  },
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
          { name: "Cursor", note: "my first descent into vibe-coding & git" },
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
    title: "Hiring junior designers",
    date: "2026-03-30",
    paragraphs: [
      "Before we closed up shop in early 2026, my cofounder Sean and I hired an intern for B’More Designful, our design studio. We ran three rounds: a behavioral interview, a case study presentation, and a live design challenge. We interviewed 25+ candidates in the first round and narrowed it down to about five for the final round.",
      "If you’re a junior designer applying for roles, one piece of advice: let your personality shine in the right places. Likeability and personality fit mattered a lot to us (they even settled our tiebreaker), and the best places to show them are a charming, quirky portfolio and the conversation itself. In written answers, clear, professional, and thoughtful still wins. One applicant told us their favorite candy is \"Nerds Gummy Clusters :3\" (valid, but save it for the call). Another assured us that they are HIM over email. Show us in the case study!",
      "Being intentional about hiring, onboarding, and mentorship led us to the best intern for our needs: someone hungry to grow, scrappy, and a delight to work with. Shoutout to Alli! We met up in NYC earlier this year, which was a great way to close things out.",
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
          { name: "If you’re going after a highly sought-after designer, reach out with a personalized note or video explaining what you like about their work. Some sales skills are especially relevant if you’re in the market for poaching." },
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
    hidden: true,
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

/** List order, most relevant to people in tech first; the first visible one opens by default on /notes. Unlisted notes follow, newest first. */
const noteOrder = [
  "design-philosophy",
  "shipping-with-claude-code",
  "role-of-the-designer",
  "why-startups-cultivate-friendability",
  "hiring-junior-designers",
  "exploratory-education",
  "rabbitholes",
  "my-2026-book-log",
];

const rank = (n: Note) => (noteOrder.indexOf(n.slug) + 1 || Infinity);

/** Notes on the site (hidden ones left out). */
export const visibleNotes = notes.filter((n) => !n.hidden);

export const sortedNotes = [...visibleNotes].sort(
  (a, b) => rank(a) - rank(b) || b.date.localeCompare(a.date),
);

export const getNote = (slug: string) => visibleNotes.find((n) => n.slug === slug);

/** "2026-10-10" → "10-10-2026". */
export const formatNoteDate = (iso: string) => {
  const [y, m, d] = iso.split("-");
  return `${m}-${d}-${y}`;
};
