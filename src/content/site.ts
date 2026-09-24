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

export const about = {
  paragraphs: [
    "Hey there! I'm a product designer that loves building things, whether that's an app or a good story. I studied Cognitive Science at Johns Hopkins University, where I became involved with the startup scene and eventually founded a design studio. So far, I've worked with 15+ founders across consumer social, automotive, and enterprise products, helping companies scale and drive growth.",
    "Outside of work, I love tea, Italian literature, mountains, and all things wabi-sabi.",
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
    {
      title: "Running a quarterly translation Substack",
      href: "https://tealeafgirl.substack.com",
    },
    { title: "Relearning tennis :')" },
    { title: "Building a portrait photography studio", href: "https://snowbellphoto.com" },
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
  { label: "Play", href: "/play" },
  { label: "Resume", href: siteConfig.resume, external: true },
];

export const playPage = {
  // TODO: swap this for your real intro copy
  headline: "Things I build for fun when I get that itch.",
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
    title: "Helping Grean win 1st place and $10K",
    tag: "UX DESIGN * PITCH DECK DESIGN",
    image: { src: "/play/project-eight/cover.webp", alt: "Project eight cover image" },
  },
  {
    title: "Design studio marketing website",
    tag: "BRANDING * SHIPPED 2025",
    image: { src: "/play/project-seven/cover.webp", alt: "Project seven cover image" },
    href: "https://www.bmore-designful.com",
  },
  {
    title: "Branding for a $15K MRR micro-SaaS app",
    tag: "BRANDING * SHIPPED 2025",
    image: { src: "/play/project-two/cover.webp", alt: "Project two cover image" },
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
