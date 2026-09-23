import type { CaseStudy } from "./types";

export const props: CaseStudy = {
  slug: "props",
  title: "A discoverable community that platforms & gamifies social orgs",
  oneLiner:
    "Redesigning Props' mobile app to reduce drop-off for first-time users and increase Day 1–7 retention.",
  cardDescription:
    "A gamified community platform's confusing MVP, rebuilt into a learnable, reward-driven experience.",
  year: "2025",
  industry: "Props / Consumer Social",
  role: "UX Manager/Designer",
  team: [
    "2 Founders-Engineers",
    "1 UX Manager (me!)",
    "1 UX Designer",
    "1 User Researcher",
  ],
  timeline: "Aug — Oct 2025",
  skills: ["UX Research", "iOS App Design", "Rapid Testing (RITE)", "Product Strategy"],
  tags: ["Redesign", "Consumer Social", "Mobile"],
  coverImage: {
    src: "/case-studies/props/cover.png",
    alt: "Props app redesign cover image",
  },
  heroMockup: {
    video: "/case-studies/props/cover.mp4",
    background: "/case-studies/props/cover-bg.png",
    alt: "Props app demo playing inside an iPhone mockup",
    variant: "13-pro",
  },
  sections: [
    {
      id: "overview",
      navLabel: "Overview",
      heading: "Overview",
      blocks: [
        {
          type: "paragraph",
          text: "Props is a gamified community-building and reward platform for social groups, charities, and businesses. It aims to incentivize users to join communities and win “props” by participating in their events.",
        },
        {
          type: "paragraph",
          text: "The goal: transform Props' confusing MVP into a clear, learnable experience that helps users understand what to do, where to go, and why it matters.",
        },
        {
          type: "list",
          items: [
            "Business goals: MVP features, Props Premium, advertising, user stickiness",
            "Timeline: 3-month engagement",
            "Technical constraints: responsive design",
          ],
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
          text: "Users liked the idea behind Props, but it felt overwhelming and unintuitive.",
        },
        {
          type: "stats",
          items: [
            { value: "50%", label: "of users would use Props" },
            { value: "75%", label: "thought it was hard to use" },
          ],
        },
      ],
    },
    {
      id: "research",
      navLabel: "Research",
      heading: "Research & key insights",
      blocks: [
        {
          type: "paragraph",
          text: "Since Props was early-stage, we ran discovery research to identify how Props could boost community engagement in a way that met user needs and reached the right users: 16 discovery interviews, 4 usability tests, a System Usability Scale (SUS) survey, and 6 personas.",
        },
        {
          type: "subheading",
          text: "Key insight",
        },
        {
          type: "paragraph",
          text: "The platform's reward loop was buried under unclear navigation and visual hierarchy.",
        },
        {
          type: "list",
          items: [
            "First-time users abandoned key tasks mid-flow",
            "Users cycled through every tab trying to guess where to complete tasks",
            "Users didn't understand what Props' key features were",
            "Organizers completed key tasks only through trial and error",
          ],
        },
      ],
    },
    {
      id: "strategy",
      navLabel: "Strategy",
      heading: "Strategy",
      blocks: [
        {
          type: "paragraph",
          text: "New users needed a smoother path to their first win. Our strategy focused on reducing early friction and making the quest → reward loop unmistakable.",
        },
        {
          type: "list",
          ordered: true,
          items: [
            "HMW make a new user understand Props and complete a first meaningful action in < 5 min?",
            "HMW surface the right groups/quests above the fold so first-time users always see something compelling to do?",
            "HMW reinforce the reward loop to boost user retention?",
            "HMW give organizers clear, low-effort creation with immediate confirmation and guaranteed visibility?",
          ],
        },
      ],
    },
    {
      id: "onboarding",
      navLabel: "Onboarding",
      heading: "Onboarding explorations",
      blocks: [
        {
          type: "paragraph",
          text: "User testing showed that the original onboarding was cluttered, unintuitive, and lacked system feedback. Design goals: improve visual hierarchy, strengthen reward framing to boost the emotional hook, and sharpen CTAs to boost interactivity.",
        },
        {
          type: "image",
          src: "/case-studies/props/onboarding-explorations.png",
          alt: "Three onboarding concepts: cut-scene, quest-based, and tutorial",
          caption: "Three onboarding directions tested side by side.",
          wide: true,
        },
        {
          type: "list",
          items: [
            "Cut-scene onboarding — strengthens Props' branding, evoking Animal Crossing & Pokémon",
            "Quest-based onboarding — guides users through experiential learning",
            "Tutorial onboarding — provides contextual education for first-time users",
          ],
        },
        {
          type: "paragraph",
          text: "We combined a guided empty state with tutorial-based onboarding to both orient users and drive active engagement.",
        },
      ],
    },
    {
      id: "solution",
      navLabel: "Final design",
      heading: "Final design outputs",
      blocks: [
        {
          type: "image",
          src: "/case-studies/props/home-my-groups.png",
          alt: "Redesigned Home (My Groups) screen",
          caption: "Home (My Groups) — clear labels, predictable grouping, reduced scroll depth.",
        },
        {
          type: "paragraph",
          text: "By restructuring the Home (My Groups) section with clear labels, predictable grouping, and reduced scroll depth, we gave users a reliable entry point into their community activity.",
        },
        {
          type: "image",
          src: "/case-studies/props/home-discover.png",
          alt: "Redesigned Home (Discover) screen",
          caption: "Home (Discover) — a scannable system that surfaces high-value groups and quests early.",
        },
        {
          type: "paragraph",
          text: "We reorganized Discover into a structured, scannable system that surfaces high-value groups and quests early, helping users find a first action quickly.",
        },
        {
          type: "image",
          src: "/case-studies/props/complete-quest.png",
          alt: "Redesigned quest completion flow",
          caption: "Complete Quest — guided, intuitive, confidence-building.",
        },
        {
          type: "paragraph",
          text: "We redesigned quest completion to feel guided, intuitive, and confidence-building.",
        },
        {
          type: "image",
          src: "/case-studies/props/quest-rewards.png",
          alt: "Redesigned quest rewards screen",
          caption: "Quest Rewards — enlarged visuals, categorized into Prizes and Props.",
        },
        {
          type: "paragraph",
          text: "By enlarging the visuals, simplifying the layout, and categorizing rewards into Prizes and Props, we brought the reward loop to the forefront.",
        },
        {
          type: "image",
          src: "/case-studies/props/quests-list.png",
          alt: "Redesigned quest list screen",
          caption: "Quests — clear hierarchy, simplified cards, stronger visual cues.",
        },
        {
          type: "paragraph",
          text: "By redesigning the Quest List with clear hierarchy, simplified cards, and stronger visual cues, we turned a dense, overwhelming list into a scannable flow.",
        },
        {
          type: "image",
          src: "/case-studies/props/eventure-profile.png",
          alt: "Redesigned Eventure profile screen",
          caption: "Eventure Profile — restructured around clear hierarchy and social cues.",
        },
        {
          type: "paragraph",
          text: "By restructuring the Eventure profile around clear hierarchy and social cues, we transformed a visually noisy page into a focused event overview.",
        },
      ],
    },
    {
      id: "iteration",
      navLabel: "Iteration",
      heading: "Post-launch iteration: Home screen",
      blocks: [
        {
          type: "paragraph",
          text: "We initially designed Home around Discover and My Groups, giving users an at-a-glance view of the communities they belonged to. But My Groups was surfacing individual Eventures, which risked blurring two distinct concepts in the product: the communities users belong to and the events happening within them.",
        },
        {
          type: "paragraph",
          text: "We separated Groups and Eventures into distinct destinations. While this introduced slightly more structure for the MVP, it established a clearer mental model.",
        },
      ],
    },
    {
      id: "handoff",
      navLabel: "Handoff",
      heading: "Developer handoff",
      blocks: [
        {
          type: "paragraph",
          text: "My UX design intern annotated key user flows to provide maximum clarity and context for the developers implementing the designs, tagging each as “Navigation Flow,” “Interaction,” or “Other.” I managed the project, delegated tasks to my intern, provided design critiques on user flows and design thinking, and communicated with the client about specs, design tokens, and navigation/usability.",
        },
      ],
    },
    {
      id: "takeaways",
      navLabel: "Takeaways",
      heading: "Key takeaways",
      blocks: [
        {
          type: "subheading",
          text: "Product strategy",
        },
        {
          type: "paragraph",
          text: "Reducing ambiguity is often more impactful than adding features. We focused on perfecting in-scope features to ensure the experience of first-time users and the reward loop would be seamless and valuable.",
        },
        {
          type: "subheading",
          text: "Stakeholder alignment",
        },
        {
          type: "paragraph",
          text: "When feedback conflicted with research or scope, I redirected conversations back to research insights, business anchors, and frameworks like user stories and Jobs to be Done.",
        },
      ],
    },
  ],
};
