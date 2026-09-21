import type { CaseStudy } from "./types";

export const jino: CaseStudy = {
  slug: "jino",
  title: "Jino",
  oneLiner: "The relationship growth companion for ambitious couples.",
  cardDescription:
    "Founder & designer of a relationship app built around daily behavioral loops instead of journal prompts or paywalls.",
  year: "Shipped 2026",
  industry: "Consumer Social",
  role: "Founder, UX Designer",
  team: ["Carolyn Tung — Founder, UX Designer", "Sean Pak — Engineer"],
  timeline: "Design: Nov 2025 · Development: Aug 2026",
  skills: ["Design System", "Prototyping", "Product Strategy", "QA Testing"],
  tags: ["0→1", "Founder", "Consumer Social"],
  coverImage: {
    src: "/case-studies/jino/cover.png",
    alt: "Jino relationship app cover image",
  },
  sections: [
    {
      id: "context",
      navLabel: "Context",
      heading: "Context",
      blocks: [
        {
          type: "paragraph",
          text: "Jino is a relationship growth companion for ambitious, emotionally intelligent couples. It's a lightweight app that creates opportunities for shared rituals: connection, emotional presence, and goal tracking.",
        },
      ],
    },
    {
      id: "problem",
      navLabel: "Problem",
      heading: "The problem",
      blocks: [
        {
          type: "paragraph",
          text: "Some relationships fail because couples struggle to balance ambition with emotional presence. For these users, being in a relationship can even be seen as a threat to one's individuality or ambition.",
        },
      ],
    },
    {
      id: "competitive-research",
      navLabel: "Competitive research",
      heading: "Competitive research",
      blocks: [
        {
          type: "paragraph",
          text: "Central question: why isn't there a go-to relationship app that has monopolized the industry yet?",
        },
        {
          type: "paragraph",
          text: "Finding: most existing apps optimize for connection by cultivating memories and reflection. Critical gap: how do couples maintain closeness without becoming codependent or losing individuality?",
        },
      ],
    },
    {
      id: "strategy",
      navLabel: "Strategy",
      heading: "My approach — product strategy",
      blocks: [
        {
          type: "paragraph",
          text: "Competitors focus on diaries, memories, or journal prompts, but not the actual behaviors that keep couples aligned. I designed around four behavioral loops instead.",
        },
        {
          type: "list",
          items: [
            "Daily Emotional Loop: log mood → visibility → reflection",
            "Connection Loop: show affection → reciprocity → appreciation",
            "Growth Loop: track individual goals → mutual accountability → celebration",
            "Autonomy Loop: solo time → recovery → reconnection",
          ],
        },
      ],
    },
    {
      id: "icp",
      navLabel: "ICP",
      heading: "Understanding my ICP",
      blocks: [
        {
          type: "paragraph",
          text: "Target audience: Gen Z Asian or Asian-adjacent users who value both emotional intentionality and personal ambition. The existing market splits into two extremes — ultra-cute, gamified Asian-market apps with charming branding and playful mascots, and premium Western apps that are polished but often corporate and lifeless.",
        },
      ],
    },
    {
      id: "branding",
      navLabel: "Art direction",
      heading: "Art direction & branding",
      blocks: [
        {
          type: "list",
          items: [
            "Expressive illustrations inspired by KakaoTalk/WeChat sticker culture",
            "A premium, wellness-inspired brand",
            "A playful mascot, like Duolingo or 365 Memories",
          ],
        },
        {
          type: "image",
          src: "/case-studies/jino/brand-illustrations.png",
          alt: "Jino brand illustrations and mascot",
          wide: true,
        },
      ],
    },
    {
      id: "final-design",
      navLabel: "Final design",
      heading: "Final design",
      blocks: [
        {
          type: "quote",
          text: "A relationship product lives or dies in the first five minutes.",
        },
        {
          type: "paragraph",
          text: "Onboarding used social logins and minimal form elements so users completed key sign-up in fewer than 5 screens.",
        },
        {
          type: "image",
          src: "/case-studies/jino/onboarding.png",
          alt: "Jino onboarding flow",
        },
        {
          type: "subheading",
          text: "Success metrics",
        },
        {
          type: "list",
          items: [
            "Day 7 retention on Daily Standups",
            "Weekly Connect interactions per user",
            "Pair Connection Days per week",
          ],
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
          text: "Most relationship apps rely on either ads-driven engagement or an aggressive premium paywall, with no middle ground. Instead of centering monetization around screens or feature gates, I reframed Jino around daily rituals that naturally create long-term value.",
        },
      ],
    },
  ],
};
