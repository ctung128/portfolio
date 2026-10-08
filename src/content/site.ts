export const siteConfig = {
  name: "Carolyn Tung",
  chineseName: "悦悦",
  role: "Product Designer",
  email: "carolynatung@gmail.com",
  linkedin: "https://www.linkedin.com/in/carolyntung/",
  x: "https://x.com/carolyn_tung",
  curius: "https://curius.app/carolyn-tung",
  resume:
    "https://drive.google.com/file/d/1LgpJfmMNJraZ7HGYR7XIB5QbkGCNe5_E/view?usp=sharing",
  calendly: "https://calendly.com/carolyn-tung-bmore-designful/quick-chat",
  domain: "https://www.carolynatung.com",
};

export const hero = {
  name: "Carolyn Tung",
  /** Set vertically beside the name in Huiwen Mincho. Changing it means
   * rebuilding the font subset (src/fonts/LICENSE-huiwen-mincho.txt). */
  chineseName: "童雪玲",
  tagline: "AI-native product designer with a high bar for craft.",
  /** "Just shipped {name} {relative date}". The date is counted in the
   * visitor's browser, so it stays current without a rebuild. */
  shipped: { name: "Pebble", href: "https://learnpebble.vercel.app/", date: "2026-10-06" },
  subheadBold: "Currently @ First Voyage.",
  location: "Based in NYC",
  artwork: {
    src: "/personal/hero.webp",
    alt: "Ink painting of an immortal reclining on a billowing cloud, holding a pair of peaches",
    caption: "“An Immortal on a Cloud with a Pair of Peaches” (20th century)",
  },
};

export const personalPhotos = [
  { src: "/personal/street.webp", alt: "A tree-lined street in Nanjing" },
  { src: "/personal/calligraphy.webp", alt: "A wall of Chinese calligraphy" },
  { src: "/personal/flowers.webp", alt: "Arranging flowers" },
  { src: "/personal/storefront.webp", alt: "A neighborhood storefront" },
  { src: "/personal/boy.webp", alt: "A personal photo" },
  { src: "/personal/decor.webp", alt: "A personal photo" },
];

export const portrait = {
  src: "/personal/me.webp",
  alt: "Carolyn Tung",
};

export const workExperience = [
  {
    role: "Product Designer",
    company: "First Voyage",
    period: "2024 — Present",
  },
  {
    role: "Product Designer",
    company: "B'More Designful",
    period: "2024 — 2025",
    note: "Design studio helping founders secure funding.",
  },
  {
    role: "Product Designer",
    company: "EOX Vantage",
    period: "2025",
    note: "Enterprise B2B SaaS.",
  },
  {
    role: "Designer",
    company: "Blind Industries & Services of Maryland",
  },
];

export const education = {
  degree: "B.A. Cognitive Science",
  school: "Johns Hopkins University",
};

type AboutSegment =
  | string
  /** `preview`: a screenshot of the linked site, shown on hover (public/about/previews/). */
  | { text: string; href: string; preview?: string }
  | { text: string; highlight: true };

export const about: { paragraphs: (string | AboutSegment[])[] } = {
  paragraphs: [
    [
      "Hey there! I'm a product designer that's obsessed with building things. In university, I became involved with the startup scene and eventually founded a ",
      { text: "design studio", href: "https://bmore-designful.com/", preview: "/about/previews/bmore-designful.webp" },
      ". Since then, I've been the founding designer for ",
      { text: "3 venture-backed startups", highlight: true },
      ", scaled a bootstrapped SaaS app to ",
      { text: "30K+ users", highlight: true },
      " and ",
      { text: "$20K MRR", highlight: true },
      " within 6 months, and designed products for ",
      { text: "15+ founders", highlight: true },
      ".",
    ],
    [
      "Outside of work, I'm also a ",
      {
        text: "published fiction writer",
        href: "https://sinetheta.net/26.html",
        preview: "/about/previews/sinetheta.webp",
      },
      ", ",
      { text: "photographer", href: "https://snowbellphoto.com/", preview: "/about/previews/snowbell.webp" },
      ", voracious reader, and ",
      {
        text: "aspiring translator",
        href: "https://tealeafgirl.substack.com/",
        preview: "/about/previews/tealeafgirl.webp",
      },
      ".",
    ],
  ],
};

export type RecommendationItem = {
  title: string;
  detail?: string;
  href?: string;
  /** Shown in the card's photo slot on hover/tap. `ratio` is width / height. */
  photo?: { src: string; ratio: number };
};

export const recommendations: Record<
  "reading" | "listening" | "learning" | "recommending",
  RecommendationItem[]
> = {
  reading: [
    { title: "jasmi.news", detail: "- my favorite journalist on Silicon Valley and trends in startup/tech/AI culture" },
    { title: "Lies and Sorcery", detail: "by Elsa Morante" },
  ],
  listening: [
    { title: "Dive Club", detail: "- my favorite product design podcast" },
    { title: "How I Built This with Guy Raz" },
    { title: "The Lonely Palette", detail: "- my favorite art history podcast" },
    { title: "Sinica Podcast", detail: "- my favorite podcast on Chinese geopolitics, history & culture" },
  ],
  learning: [
    {
      title: "Creating at art cafes",
      photo: { src: "/personal/sidequests/hamster.webp", ratio: 3 / 4 },
    },
    { title: "Moribana ikebana", photo: { src: "/personal/sidequests/ikebana.webp", ratio: 3 / 4 } },
    {
      title: "Making rock friends",
      photo: { src: "/personal/sidequests/rock-friends.webp", ratio: 3 / 2 },
    },
    {
      title: "Tea apprenticing",
      photo: { src: "/personal/sidequests/tea.webp", ratio: 3 / 2 },
    },
    {
      title: "Exploring Yosemite (heaven on earth)",
      photo: { src: "/personal/sidequests/yosemite.webp", ratio: 3 / 4 },
    },
    {
      title: "Cookin up Chinese fairy medicine (TCM)",
      photo: { src: "/personal/sidequests/soup.webp", ratio: 3 / 2 },
    },
  ],
  recommending: [
    { title: "Siddhartha", detail: "by Hermann Hesse" },
    { title: "Being Mortal: Medicine and What Matters in the End", detail: "by Atul Gawande" },
    { title: "Days of Abandonment", detail: "by Elena Ferrante" },
    { title: "Whiplash", detail: "(2014)" },
  ],
};

// Resume and "Let's talk" live in the footer and the About links row.
export const nav: { label: string; href: string; external?: boolean }[] = [
  { label: "About", href: "/about" },
  { label: "Work", href: "/#work" },
  { label: "Play", href: "/play" },
  { label: "Library", href: "/library" },
];

export const playPage = {
  headline: "Things I design & build for fun",
  description:
    "branding/marketing, vibe-coding, web design, etc etc :-)"
};

export type PlayProject = {
  title: string;
  tag: string;
  image: { src: string; alt: string; position?: string };
  /** Looping video shown instead of the cover image. */
  video?: string;
  href?: string;
};

export const playProjects: PlayProject[] = [
  {
    title: "Designed $20K MRR app for 30K+ users",
    tag: "BRANDING * SHIPPED 2025",
    image: { src: "/play/project-two/cover.webp", alt: "Project two cover image" },
  },
  {
    title: "Helping Grean win 1st place and $10K",
    tag: "UX DESIGN * PITCH DECK DESIGN",
    image: { src: "/play/project-eight/cover.webp", alt: "Project eight cover image" },
  },
  {
    title: "Language learning app for Chinese podcasts",
    tag: "CLAUDE CODE * SHIPPED 2026",
    image: { src: "/play/project-eleven/cover.webp", alt: "Project eleven cover image" },
    href: "https://learnpebble.vercel.app/",
  },
  {
    title: "Design studio marketing website",
    tag: "BRANDING * SHIPPED 2025",
    image: { src: "/play/project-seven/cover.webp", alt: "Project seven cover image" },
    href: "https://www.bmore-designful.com",
  },
  {
    title: "Landing page for an HVAC startup",
    tag: "FRAMER WEB DESIGN",
    image: {
      src: "/play/project-three/cover.webp",
      alt: "Project three cover image",
      position: "left",
    },
  },
  {
    title: "Queue management dashboard for tattoo studios",
    tag: "CLAUDE CODE * SHIPPED 2025",
    image: { src: "/play/project-one/cover.webp", alt: "Project one cover image" },
  },
  {
    title: "Menu for a friend's pop-up cafe",
    tag: "GRAPHIC DESIGN",
    image: { src: "/play/project-four/cover.webp", alt: "Project four cover image" },
  },
  {
    title: "Cards for an art investing venture",
    tag: "VISUAL DESIGN",
    image: { src: "/play/project-five/cover.webp", alt: "Project five cover image" },
  },
  {
    title: "Branding for a sustainability firm",
    tag: "BRANDING * SHIPPED 2025",
    image: { src: "/play/project-six/cover.webp", alt: "Project six cover image" },
  },
  {
    title: "Web design for photography studio",
    tag: "CLAUDE CODE * SHIPPED 2026",
    image: { src: "/play/project-nine/cover.webp", alt: "Project nine cover image" },
    href: "https://snowbellphoto.com/",
  },
  {
    title: "Translation Substack blog",
    tag: "RESEARCH * WRITING",
    image: { src: "/play/project-ten/cover.webp", alt: "Project ten cover image" },
    href: "https://tealeafgirl.substack.com/",
  },
];
