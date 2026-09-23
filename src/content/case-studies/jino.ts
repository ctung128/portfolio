import type { CaseStudy } from "./types";

export const jino: CaseStudy = {
  slug: "jino",
  title: "A relationship companion app for ambitious couples",
  oneLiner: "A daily check-in for couples building big lives without slipping into codependency or growing apart.",
  cardDescription:
    "Founder & designer of a relationship app built around daily behavioral loops instead of journal prompts or paywalls.",
  badge: "Currently in beta!",
  year: "Shipped 2026",
  industry: "Jino / Consumer Social",
  role: "Founder, UX Designer",
  team: ["1 UX Designer", "1 Engineer"],
  timeline: "Design: Nov 2025 Development: Aug 2026 Testing: Sep 2026",
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
      id: "overview",
      navLabel: "Overview",
      heading: "Introducing Jino",
      blocks: [
        {
          type: "paragraph",
          text: "Jino is a relationship growth companion for ambitious, emotionally intelligent couples. It is a lightweight app that creates opportunity for shared rituals for connection, emotional presence, and goal tracking. The goal of Jino is to help couples maintain emotional closeness and personal development while preserving individuality and a strong sense of self.",
        },
        {
          type: "mockup",
          video: "/case-studies/jino/goal-tracking.mp4",
          background: "/case-studies/jino/bg-fcfffa.png",
          alt: "Jino goal-tracking flow playing inside an iPhone mockup",
          variant: "13-pro",
        },
        {
          type: "gallery",
          images: [
            { src: "/case-studies/jino/appstore-1.png", alt: "Jino App Store screenshot 1" },
            { src: "/case-studies/jino/appstore-2.png", alt: "Jino App Store screenshot 2" },
            { src: "/case-studies/jino/appstore-3.png", alt: "Jino App Store screenshot 3" },
            { src: "/case-studies/jino/appstore-4.png", alt: "Jino App Store screenshot 4" },
            { src: "/case-studies/jino/appstore-5.png", alt: "Jino App Store screenshot 5" },
            { src: "/case-studies/jino/appstore-6.png", alt: "Jino App Store screenshot 6" },
          ],
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
          text: "In some circles, self-development culture runs rampant. For these people, self-optimization and independence often come before relationships. Even being in a relationship can be seen as a threat to one's individuality or ambition. Many ambitious, goal-driven people want relationships that help support their personal growth.",
        },
      ],
    },
    {
      id: "user-research",
      navLabel: "User research",
      heading: "To discover this, first I did a deep dive into what hurts Gen Z relationships. ",
      blocks: [
        {
          type: "paragraph",
          text: "Before designing, I wanted to understand the problems that Gen Z couples struggle with. I pulled from three sources:",
        },
        {
          type: "list",
          ordered: false,
          items: [
            "User interviews with couples in my network who matched my ICP (ages 22–28, career-driven or in school, in committed relationships)",
            "Competitor audience research of relationship app users and why they drop off", 
            "Reddit threads from r/relationships, r/relationship_advice, and r/LongDistance, plus App Store and Google Play reviews of existing couple apps",
          ],
        },
        {
          type: "subheading",
          text: "Key insights",
          spaced: true,
        },
        {
          type: "insights",
          items: [
            {
              label: "post-honeymoon phase complacency",
              quote: "We're together but feel like roommates.",
              body: "Once routines set in, dates and intentional quality time quietly drop off.",
            },
            {
              label: "Lack of curiosity",
              quote: "We talk every day, but not about anything substantial.",
              body: "People want to be known and to peek into their partner's inner life through deep conversations.",
            },
            {
              label: "Uneven effort",
              quote: "I plan everything; they don't notice.",
              body: "One partner usually carries the planning and remembers anniversaries, and resentment builds when it goes unacknowledged.",
            },
          ],
        },
        {
          type: "image",
          src: "/case-studies/jino/affinity-1.png",
          alt: "Affinity map of user interview notes on complacency, lack of curiosity, and uneven effort",
        },
        {
          type: "insights",
          items: [
            {
              label: "Not meeting each other's love languages",
              quote: "They don't express love the same way I do.",
              body: "Differences in love languages and introversion vs. extroversion get misread as indifference.",
            },
            {
              label: "Not leaving the comfort zone",
              quote: "We love each other but we stopped growing.",
              body: "Comfort slides into stagnation. Ambitious partners worry the relationship is slowing their momentum and want emotional upkeep that feels efficient.",
            },
            {
              label: "Loss of individuality",
              quote: "I miss doing my own thing.",
              body: "Partners feel guilty taking solo time or when one falls behind on personal goals, especially when their productivity rhythms don't match.",
            },
          ],
        },
        {
          type: "image",
          src: "/case-studies/jino/affinity-2.png",
          alt: "Affinity map of user interview notes on love languages, comfort zones, and loss of individuality",
        },
        {
          type: "subheading",
          text: "Existing apps lose users in one of two ways",
          style: "heading",
          spaced: true,
        },
        {
          type: "paragraph",
          text: "Reviews showed two recurring churn points: apps were either too basic, with novelty prompts that run dry within weeks, or locked behind a subscription before users experienced enough value to justify paying. Neither model supports a relationship that's meant to last years.",
        },
        {
          type: "subheading",
          text: "How might we…",
          style: "heading",
          spaced: true,
        },
        {
          type: "quote",
          text: "…help ambitious couples stay emotionally close through low-effort daily rituals, without asking either partner to shrink their individual life?",
        },
        {
          type: "subheading",
          text: "Meet the couple",
          style: "heading",
          spaced: true,
        },
        {
          type: "paragraph",
          text: "A couples app only works if the less-engaged partner opens it too. Instead of designing for one user, I built paired personas: the partner who initiates and the partner who needs a low-effort way in.",
        },
        {
          type: "gallery",
          columns: 2,
          images: [
            {
              src: "/case-studies/jino/persona-1.png",
              alt: "Persona: Serena Park, \"The Intentional Planner\" — the partner who initiates",
            },
            {
              src: "/case-studies/jino/persona-2.png",
              alt: "Persona: Daniel Nguyen, \"The Heads-Down Builder\" — the partner who needs a low-effort way in",
            },
          ],
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
      navLabel: "Product Strategy",
      heading: "Defining the MVP",
      blocks: [
        {
          type: "paragraph",
          text: "Competitors focus on diaries, memories, or journal prompts, but not the actual behaviors that keep couples aligned. To prevent couples from growing apart, Jino needed to create daily rituals that address the root cause of the problem. Instead of designing another \"couple diary,\" I designed behavioral loops to drive connection.",
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
          type: "comparison",
          groups: [
            {
              label: "Cute, gamified Asian-market apps",
              images: [
                { src: "/case-studies/jino/asia-1.png", alt: "SumOne couple app screenshot" },
                { src: "/case-studies/jino/asia-2.png", alt: "Couple Tree app screenshot" },
              ],
              caption:
                "Charming branding and playful mascots, but held back by inconsistent English localization and cluttered UX",
            },
            {
              label: "Premium Western apps",
              images: [
                {
                  src: "/case-studies/jino/west-1.png",
                  alt: "Premium Western relationship app screenshot with daily question, quiz, and game activities",
                },
                {
                  src: "/case-studies/jino/west-2.png",
                  alt: "Premium Western relationship app screenshot with a growth-tracking home screen",
                },
              ],
              caption: "Polished, but often corporate and lifeless",
            },
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
          src: "/case-studies/jino/branding.png",
          alt: "Jino brand illustrations and mascot",
          background: "#FCFFFA",
          shadow: true,
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
          text: "A consumer product lives or dies in the first five minutes.",
        },
        {
          type: "paragraph",
          text: "For an MVP whose business model is dependent on user stickiness and behavioral loops, I needed to ensure that onboarding was quick and optimized for low click rate. I approached this by providing social logins and minimal form elements so that users completed key sign up in fewer than 5 screens.",
        },
        {
          type: "mockup",
          frames: [
            "/case-studies/jino/onboarding-1.png",
            "/case-studies/jino/onboarding-2.png",
            "/case-studies/jino/onboarding-3.png",
            "/case-studies/jino/onboarding-4.png",
            "/case-studies/jino/onboarding-5.png",
            "/case-studies/jino/onboarding-6.png",
            "/case-studies/jino/onboarding-7.png",
            "/case-studies/jino/onboarding-8.png",
            "/case-studies/jino/onboarding-9.png",
            "/case-studies/jino/onboarding-10.png",
            "/case-studies/jino/onboarding-11.png",
            "/case-studies/jino/onboarding-12.png",
            "/case-studies/jino/onboarding-13.png",
          ],
          background: "/case-studies/jino/bg-fcfffa.png",
          alt: "Jino onboarding happy path playing inside an iPhone mockup",
          label: "Onboarding happy path",
          variant: "13-pro",
          frameHoldMs: 1200,
          frameTransitionMs: 400,
          frameMotion: "fade",
        },
        {
          type: "image",
          src: "/case-studies/jino/error-state.png",
          alt: "Jino onboarding error state",
          label: "Error state",
          background: "#FCFFFA",
          backgroundImageWidth: "45%",
          shadow: true,
        },
        {
          type: "paragraph",
          text: "Next, instead of dumping users into a blank home screen, the first-time user flow prompts them to complete key rituals (ex. daily check-ins or sending a voice note). With an example Connect Day streak calendar and preview cards, the empty states also teach the user what the app will feel like once they consistently use the app. This primes users for loops that drive retention.",
        },
        {
          type: "mockup",
          scrollImage: {
            src: "/case-studies/jino/home-empty.png",
            alt: "Jino home screen empty state, panning to reveal the full screen inside an iPhone mockup",
            endPercent: -47.15,
          },
          background: "/case-studies/jino/bg-fcfffa.png",
          alt: "Jino home screen empty state, panning to reveal the full screen inside an iPhone mockup",
          label: "Home empty state",
          variant: "13-pro",
        },
      ],
    },
    {
      id: "testing",
      navLabel: "Testing",
      heading: "QA Testing & Beta Testing with my ICP",
      blocks: [
        {
          type: "paragraph",
          text: "After I conducted 4 rounds of QA testing on TestFlight, we opened Jino up to 5 couples that matched my ICP criteria for a 2-week period, collecting D14 retention and feature engagement with Posthog. After the trial period ends, I plan on distributing a post-hoc SUS survey. The specific features I am tracking are Daily Standups per week, Weekly Connect interactions per user, and Pair Connection Days per week.",
        },
        {
          type: "image",
          src: "/case-studies/jino/waitlist.png",
          alt: "Jino waitlist",
        },
      ],
    },
    {
      id: "takeaways",
      navLabel: "Takeaways",
      heading: "What I learned",
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
