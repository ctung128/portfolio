import type { CaseStudy } from "./types";

export const inkline: CaseStudy = {
  slug: "inkline",
  title: "Inkline",
  oneLiner: "A micro-SaaS queue management tool for tattoo studios, taken from idea to shipped, revenue-generating product.",
  cardDescription:
    "0→1 as designer, engineer, and founder — I designed, built, and shipped a live micro-SaaS product and generated early MRR.",
  year: "Shipped 2025",
  industry: "B2B SaaS",
  role: "Design & Development",
  team: [
    "Carolyn Tung — Design & Development",
    "Allison Chu — Marketing",
    "Sean Pak — User Research",
  ],
  timeline: "Sep — Dec 2025",
  skills: ["Design Engineering", "Product Strategy", "Cursor", "Figma MCP", "Supabase & Vercel"],
  tags: ["0→1", "B2B SaaS", "Design Engineering"],
  coverImage: {
    src: "/case-studies/inkline/cover.png",
    alt: "Inkline queue management app cover image",
  },
  sections: [
    {
      id: "role",
      navLabel: "My role",
      heading: "My role",
      blocks: [
        {
          type: "paragraph",
          text: "In this project I took a micro-SaaS app from idea to deployed product. I designed the experience, built the system, and shipped the code. I also developed a business model and generated MRR through social media marketing with the help of an intern. By wearing multiple hats, I simultaneously approached this project like a designer, engineer, and founder.",
        },
        {
          type: "paragraph",
          text: "Our goal was to validate market demand, ship a working MVP fast, and design an experience studios can trust on event day.",
        },
      ],
    },
    {
      id: "impact",
      navLabel: "Outcomes",
      heading: "Impact — outcomes (shipped 2025)",
      blocks: [
        {
          type: "list",
          items: [
            "A shipped micro-SaaS app built from 0 → 1",
            "A validated problem with strong early-market validation",
            "A reliable queue system with SMS notifications",
            "A landing page + early go-to-market test funnel",
          ],
        },
        {
          type: "quote",
          text: "Tattoo artists gain an organized queue they can rely on. Clients avoid long waits and know exactly when they're up.",
        },
      ],
    },
    {
      id: "research",
      navLabel: "Research",
      heading: "Early validation & research",
      blocks: [
        {
          type: "subheading",
          text: "Tattoo flash events are chaotic to manage and leave customers frustrated.",
        },
        {
          type: "paragraph",
          text: "Through landscape research, I identified a market opportunity in the tattoo studio industry by collecting feedback in online forums. We discovered a variety of challenges during tattoo flash events, including revenue loss from drop-off due to frustrated customers waiting in line. Sean also conducted customer discovery with local tattoo artists and identified early interest. We built Inkline, a queue management tool for tattoo studios hosting high-volume events, to solve this problem.",
        },
        {
          type: "quote",
          text: "Flash days are great for exposure, but the line management and no-shows make the whole day feel chaotic instead of profitable.",
          attribution: "Tattoo artist",
        },
        {
          type: "quote",
          text: "I waited in line for hours, and when it was finally my turn they were rushing so hard...",
          attribution: "Customer",
        },
        {
          type: "quote",
          text: "There's only so many tattoos we can safely do in a day.",
          attribution: "Tattoo artist",
        },
      ],
    },
    {
      id: "scope",
      navLabel: "MVP scope",
      heading: "Our approach — defining MVP scope",
      blocks: [
        {
          type: "paragraph",
          text: "Before designing anything, I created a PRD with user stories and jobs to be done for tattoo studio owners, tattoo studio staff, and customers. I also outlined requirements, constraints, assumptions, and edge cases to design the app with intention. This step aligned my design and engineering decisions around a single source of truth.",
        },
        {
          type: "list",
          items: [
            "Supabase for auth, database, policies, and serverless functions",
            "Next.js + Vite",
            "Twilio for SMS notifications",
            "Vercel for hosting",
          ],
        },
      ],
    },
    {
      id: "build",
      navLabel: "Build",
      heading: "Build",
      blocks: [
        {
          type: "subheading",
          text: "01 — Prototyping",
        },
        {
          type: "paragraph",
          text: "I started by generating a quick-and-dirty prototype in Lovable that covered key user flows based on the PRD, then cloned it in Cursor.",
        },
        {
          type: "subheading",
          text: "02 — Functional build",
        },
        {
          type: "paragraph",
          text: "I then built the app in Cursor, implementing the core functionality, structuring it around real database schemas, and integrating Twilio for SMS notifications.",
        },
      ],
    },
    {
      id: "design",
      navLabel: "Design",
      heading: "Design",
      blocks: [
        {
          type: "subheading",
          text: "03 — High-fidelity design & branding",
        },
        {
          type: "paragraph",
          text: "After core functionality was established, I redesigned the entire frontend using Figma MCP: created a design system and defined tokens for spacing, color, typography, etc., and designed branding to distinguish the marketing site and app from generic AI-generated SaaS tools.",
        },
        {
          type: "image",
          src: "/case-studies/inkline/design-system.png",
          alt: "Inkline design system and branding",
          wide: true,
        },
      ],
    },
    {
      id: "testing",
      navLabel: "Testing & QA",
      heading: "Testing & QA — accounting for edge cases",
      blocks: [
        {
          type: "paragraph",
          text: "I manually QA'd the entire system: empty states, invalid phone numbers, re-joining the queue, skipping users, SMS delivery, staff refresh scenarios, and queue reorder logic. I also used SQL queries to validate real data and ensure accurate system behavior.",
        },
      ],
    },
    {
      id: "launch",
      navLabel: "Launch",
      heading: "Launch — testing market demand after launch",
      blocks: [
        {
          type: "paragraph",
          text: "To test market demand, my intern and I designed a landing page, set up tracking and conversion goals, designed and ran Instagram ads targeted at tattoo studios, and measured impressions → clicks → signups. Early results confirmed the same demand patterns surfaced in community research.",
        },
      ],
    },
    {
      id: "takeaways",
      navLabel: "Takeaways",
      heading: "Key takeaways",
      blocks: [
        {
          type: "paragraph",
          text: "Building this micro-SaaS app strengthened my confidence as a design engineer across four areas:",
        },
        {
          type: "subheading",
          text: "Design engineering",
        },
        {
          type: "paragraph",
          text: "By shipping an app with Cursor and Vercel, I built strong mental models of how full-stack systems behave — learning relational databases and SQL through Supabase, and how schemas shape product constraints, while improving communication with developers by understanding how architecture impacts UX.",
        },
        {
          type: "subheading",
          text: "Developer handoff",
        },
        {
          type: "paragraph",
          text: "Using Figma Dev Mode and Figma MCP helped me see handoff from the engineer's perspective. Extracting spacing, alignment, and design tokens helped me understand how to design experiences that ship. Moving between design and development also helped me recognize the limitations of current design handoff tools and where designers can pitch in to provide maximum clarity for engineers.",
        },
        {
          type: "subheading",
          text: "Product thinking",
        },
        {
          type: "paragraph",
          text: "By wearing multiple hats, I strengthened my ability to think like a product owner — integrating PRDs, user stories, and jobs to be done into my design workflow, and learning to define requirements, constraints, and success metrics before designing.",
        },
        {
          type: "subheading",
          text: "Testing",
        },
        {
          type: "paragraph",
          text: "I now proactively design for edge cases by anticipating failure modes early and designing resilient experiences — conducting QA for edge cases, empty states, and data-dependent flows, and stress-testing authentication, submission logic, and database behavior.",
        },
      ],
    },
  ],
};
