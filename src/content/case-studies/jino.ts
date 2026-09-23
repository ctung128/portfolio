import type { CaseStudy } from "./types";

export const jino: CaseStudy = {
  slug: "jino",
  title: "A relationship companion app for ambitious couples",
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
  heroMockup: {
    video: "/case-studies/jino/cover.mp4",
    background: "/case-studies/jino/cover-bg.png",
    alt: "Jino app demo playing inside an iPhone mockup",
    variant: "13-pro",
  },
  duoHero: {
    background: "/case-studies/jino/cover-bg.png",
    splash: {
      src: "/case-studies/jino/splash-screen.png",
      alt: "Jino splash screen with two hamster mascots",
    },
    video: "/case-studies/jino/cover.mp4",
    alt: "Jino app demo playing inside an iPhone mockup",
    variant: "13-pro",
  },
  sections: [
    {
      id: "context",
      navLabel: "Context",
      heading: "Context",
      blocks: [
        {
          type: "paragraph",
          text: "Jino is a relationship growth companion for ambitious, emotionally intelligent couples. It is a lightweight app that creates opportunity for shared rituals for connection, emotional presence, and goal tracking. The goal of Jino is to help couples maintain emotional closeness and personal development while preserving individuality and a strong sense of self.",
        },
      ],
    },
    {
      id: "problem",
      navLabel: "Problem",
      heading:
        "Some relationships fail because couples struggle to balance ambition with emotional presence.",
      blocks: [
        {
          type: "paragraph",
          text: "In some circles, self-development culture runs rampant. For these people, self-optimization and independence often come before relationships. For these users, being in a relationship can even be seen as a threat to one's individuality or ambition. Many ambitious, goal-driven people want relationships that help support their personal growth.",
        },
      ],
    },
    {
      id: "competitive-research",
      navLabel: "Competitive research",
      heading: "Why isn't there a go-to relationship app that has monopolized the industry yet?",
      blocks: [
        {
          type: "paragraph",
          text: "Despite huge market demand and cultural obsession with relationships, no app has become the definitive category leader. According to my competitive research, most existing apps optimize for connection by cultivating memories and reflection. But scrapbooks and journal prompts aren't the same as showing up for your partner emotionally.",
        },
        {
          type: "paragraph",
          text: "This leaves a massive unsolved gap: How do couples maintain closeness without becoming codependent or losing individuality? No existing app has a compelling answer.",
        },
      ],
    },
    {
      id: "strategy",
      navLabel: "My approach",
      heading: "Product Strategy: Defining the MVP",
      blocks: [
        {
          type: "paragraph",
          text: "Competitors focus on diaries, memories, or journal prompts, but not the actual behaviors that keep couples aligned. To solve emotional drift, Jino needed to create daily rituals that address the root cause of the problem. Instead of designing another \"couple diary,\" I designed behavioral loops to drive connection.",
        },
        {
          type: "paragraph",
          text: "Jino is built around 4 behavioral loops:",
        },
        {
          type: "list",
          ordered: true,
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
      navLabel: "Understanding my ICP",
      heading: "Preserving whimsy and play for couples set on achieving their goals",
      blocks: [
        {
          type: "paragraph",
          text: "Most relationship apps are split into two extremes:",
        },
        {
          type: "list",
          items: [
            "Ultra-cute, gamified Asian-market apps — charming branding and playful mascots, but held back by inconsistent English localization and cluttered UX",
            "Premium Western apps — polished, but often corporate and lifeless",
          ],
        },
        {
          type: "paragraph",
          text: "Neither experience resonates with the couples I'm designing for: Gen Z Asian or Asian-adjacent audiences who value both emotional intentionality and personal ambition (ex. a couple who might be building a company together while also loving Pokémon, Sanrio, or Studio Ghibli).",
        },
      ],
    },
    {
      id: "branding",
      navLabel: "Art direction",
      heading: "Defining the brand vision",
      blocks: [
        {
          type: "paragraph",
          text: "I set out to create a visual identity that sits between those two worlds:",
        },
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
      heading: "Designing the first-time user flow for user stickiness and retention",
      blocks: [
        {
          type: "quote",
          text: "A relationship product lives or dies in the first five minutes.",
        },
        {
          type: "paragraph",
          text: "For an MVP whose business model is dependent on user stickiness and behavioral loops, I needed to ensure that onboarding was quick and optimized for low click rate. I approached this by providing social logins and minimal form elements so that users completed key sign up in fewer than 5 screens.",
        },
        {
          type: "image",
          src: "/case-studies/jino/onboarding.png",
          alt: "Jino onboarding flow",
        },
        {
          type: "paragraph",
          text: "Next, instead of dumping users into a blank home screen, the first-time user flow prompts them to complete key rituals (ex. daily check-ins or sending a voice note). With an example Connect Day streak calendar and preview cards, the empty states also teach the user what the app will feel like once they consistently use the app. This primes users for loops that drive retention.",
        },
        {
          type: "paragraph",
          text: "Once shipped, I plan on testing user stickiness and retention using the following success metrics:",
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
          text: "Competitive research revealed that most relationship apps rely on either ads-driven engagement or an aggressive premium paywall with no middle ground. Both models disrupt the emotional experience, especially for my ICP, so I had to rethink the business model from first principles.",
        },
        {
          type: "paragraph",
          text: "Instead of centering monetization around screens or feature gates, I reframed Jino around daily rituals that naturally create long-term value. Designing for ritual allowed the product to demonstrate its worth over time, making Jino Premium feel like a worthy investment.",
        },
        {
          type: "paragraph",
          text: "Approaching design through a business lens prevented me from churning out a feature factory by prioritizing user stickiness and retention. As a result, the business model emerged from designing a system where daily commitment and relationship growth feel worth paying for.",
        },
      ],
    },
  ],
};
