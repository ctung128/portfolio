export const siteConfig = {
  name: "Carolyn Tung",
  chineseName: "悦悦",
  role: "Product Designer",
  email: "carolynatung@gmail.com",
  linkedin: "https://www.linkedin.com/in/carolyntung/",
  resume:
    "https://drive.google.com/file/d/1LgpJfmMNJraZ7HGYR7XIB5QbkGCNe5_E/view?usp=sharing",
  calendly: "https://calendly.com/carolyn-tung-bmore-designful/quick-chat",
  domain: "https://www.carolynatung.com",
};

export const hero = {
  headline: "Carolyn is a product-minded designer with a high bar for craft.",
  subheadBold: "Currently @ First Voyage.",
  subheadMuted: "Previously secured funding for founders @ B'More Designful.",
};

export const personalPhotos = [
  { src: "/personal/street.jpg", alt: "A tree-lined street in Nanjing" },
  { src: "/personal/calligraphy.jpg", alt: "A wall of Chinese calligraphy" },
  { src: "/personal/flowers.jpg", alt: "Arranging flowers" },
  { src: "/personal/storefront.jpg", alt: "A neighborhood storefront" },
  { src: "/personal/boy.jpg", alt: "A personal photo" },
  { src: "/personal/decor.jpg", alt: "A personal photo" },
];

export const portrait = {
  src: "/personal/me.jpg",
  alt: "Carolyn Tung",
};

export const specializationPillars = [
  {
    title: "I ship, not just design",
    description:
      "I design in Figma and build with Claude Code. I shipped a consumer app, led QA testing, and beta tested it with 10 users.",
  },
  {
    title: "I take 0→1 problems to shipped product",
    description:
      "SplitEV, Jino, and Inkline all started as an unvalidated idea. In each, I owned the strategy, the research, and the final screens that made it to production.",
  },
  {
    title: "I design AI products people trust.",
    description:
      "On EVA, I learned the hard way that AI-first isn't the goal — trustworthy is. I designed for verification and source attribution before I designed for novelty.",
  },
];

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
    role: "UX Designer",
    company: "EOX Vantage",
    period: "2023",
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

export const about = {
  paragraphs: [
    "Hi there! I'm a product designer that loves building things. I grew up in Cleveland and studied Cognitive Science at Johns Hopkins University, but my second home is in Nanjing, China.",
    "In my free time, I love drinking tea, reading Italian literature, and running.",
  ],
};

export const recommendations = {
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
    { title: "Training for a half-marathon" },
    { title: "Relearning tennis :')" },
    { title: "HSK 6", detail: "→ advanced Chinese proficiency test" },
    { title: "A freelance portrait photography studio" },
  ],
  recommending: [
    { title: "Siddhartha", detail: "by Hermann Hesse" },
    { title: "Being Mortal: Medicine and What Matters in the End", detail: "by Atul Gawande" },
    { title: "Days of Abandonment", detail: "by Elena Ferrante" },
    { title: "Whiplash", detail: "(2014)" },
  ],
};

export const nav = [
  { label: "Work", href: "/#work" },
  { label: "About", href: "/#about" },
  { label: "Resume", href: siteConfig.resume, external: true },
];
