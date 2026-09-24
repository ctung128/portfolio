import type { CaseStudy } from "./types";

/** Plain off-white (the Jino mockup background) behind "before" screens, so
 * the redesigned "after" screens on the green gradient stand out. */
const BEFORE_BG = "/case-studies/jino/bg-fcfffa.png";
/** Background behind the final design "after" screens. Trying the same
 * off-white as the befores; swap back to "/case-studies/props/cover-bg.webp"
 * for the green gradient. */
const AFTER_BG = BEFORE_BG;

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
    "2 Founder-Engineers",
    "1 UX Manager (me!)",
    "1 UX Designer",
    "1 User Researcher",
  ],
  timeline: "Aug — Oct 2025",
  skills: ["UX Research", "iOS App Design", "Rapid Testing (RITE)", "Product Strategy"],
  tags: ["End-to-end", "Consumer Social", "Techstars"],
  coverImage: {
    src: "/case-studies/props/cover.webp",
    alt: "Props app redesign cover image",
  },
  heroMockup: {
    video: "/case-studies/props/cover.mp4",
    poster: "/case-studies/props/cover-poster.webp",
    background: "/case-studies/props/cover-bg.webp",
    alt: "Props app demo playing inside an iPhone mockup",
    variant: "13-pro",
  },
  sections: [
    {
      id: "overview",
      navLabel: "Overview",
      heading: "Introducing Props",
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
          type: "details",
          items: [
            {
              label: "Business goals",
              value: ["Props Premium", "Advertising", "User stickiness"],
            },
            { label: "Timeline", value: "3-month engagement" },
            { label: "Technical constraints", value: "Responsive design" },
          ],
        },
      ],
    },
    {
      id: "problem",
      navLabel: "Problem",
      heading: "Users liked the idea behind Props, but it felt overwhelming and unintuitive. So, users kept dropping off.",
      blocks: [
        {
          type: "stats",
          items: [
            { value: "50%", label: "of users would use Props" },
            { value: "75%", label: "thought it was hard to use" },
          ],
        },
        {
          type: "subheading",
          text: "Before the redesign",
        },
        {
          type: "mockup",
          frames: [
            "/case-studies/props/before-1.webp",
            "/case-studies/props/before-2.webp",
            "/case-studies/props/before-3.webp",
            "/case-studies/props/before-4.webp",
            "/case-studies/props/before-5.webp",
            "/case-studies/props/before-6.webp",
          ],
          background: BEFORE_BG,
          alt: "The original Props app, cycling through six screens inside an iPhone mockup",
          variant: "13-pro",
        },
      ],
    },
    {
      id: "research",
      navLabel: "Research",
      heading: "The platform's reward loop was buried under unclear navigation and visual hierarchy.",
      blocks: [
        {
          type: "paragraph",
          text: "Since Props was early-stage, we ran discovery research to identify how Props could boost community engagement in a way that met user needs and reached the right users: 16 discovery interviews, 4 usability tests, a System Usability Scale (SUS) survey, and 6 personas.",
        },
        {
          type: "subheading",
          text: "Key insights",
        },
        {
          type: "list",
          marker: "arrow",
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
      heading: "Optimizing the first-time user experience",
      blocks: [
        {
          type: "paragraph",
          text: "New users needed a smoother path to their first win. Our strategy focused on reducing early friction and making the quest-to-reward loop unmistakable.",
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
          text: "User testing showed that the original onboarding was cluttered, unintuitive, and lacked system feedback. We explored 3 onboarding designs to improve visual hierarchy, strengthen reward framing to boost the emotional hook, and sharpen CTAs to boost interactivity.",
        },
        {
          type: "featureRows",
          background: "/case-studies/props/cover-bg.webp",
          variant: "13-pro",
          items: [
            {
              video: "/case-studies/props/cutscene.mp4",
              poster: "/case-studies/props/cutscene-poster.webp",
              alt: "Cut-scene onboarding concept playing inside an iPhone mockup",
              title: "Cut-scene onboarding",
              body: "Strengthens Props' branding, evoking Animal Crossing and Pokémon.",
            },
            {
              video: "/case-studies/props/quest.mp4",
              poster: "/case-studies/props/quest-poster.webp",
              alt: "Quest-based onboarding concept playing inside an iPhone mockup",
              title: "Quest-based onboarding",
              body: "Guides users through experiential learning.",
            },
            {
              video: "/case-studies/props/tutorial.mp4",
              poster: "/case-studies/props/tutorial-poster.webp",
              alt: "Tutorial onboarding concept playing inside an iPhone mockup",
              title: "Tutorial onboarding",
              body: "Provides contextual education for first-time users.",
            },
          ],
        },
        {
          type: "paragraph",
          text: "Based on user testing, we ultimately combined a guided empty state with tutorial-based onboarding to both orient users and drive active engagement.",
        },
      ],
    },
    {
      id: "solution",
      navLabel: "Final design",
      blocks: [
        {
          type: "subheading",
          text: "Home (My Groups)",
          style: "heading",
        },
        {
          type: "mockupRow",
          background: AFTER_BG,
          variant: "13-pro",
          items: [
            {
              label: "Before",
              background: BEFORE_BG,
              alt: "Original Home (My Groups) screen",
              frames: ["/case-studies/props/before-1.webp"],
            },
            {
              label: "After",
              alt: "Redesigned Home (My Groups) screen",
              frames: ["/case-studies/props/after-1.png"],
            },
          ],
        },
        {
          type: "paragraph",
          text: "By restructuring the Home (My Groups) section with clear labels, predictable grouping, and reduced scroll depth, we gave users a reliable entry point into their community activity.",
        },
        {
          type: "subheading",
          text: "Home (Discover)",
          style: "heading",
          spaced: true,
        },
        {
          type: "mockupRow",
          background: AFTER_BG,
          variant: "13-pro",
          items: [
            {
              label: "Before",
              background: BEFORE_BG,
              alt: "Original Home (Discover) screen",
              frames: ["/case-studies/props/before-2.webp"],
            },
            {
              label: "After",
              alt: "Redesigned Home (Discover) screen",
              frames: ["/case-studies/props/after-2.webp"],
            },
          ],
        },
        {
          type: "paragraph",
          text: "We reorganized Discover into a structured, scannable system that surfaces high-value groups and quests early, helping users find a first action quickly.",
        },
        {
          type: "subheading",
          text: "Complete Quest",
          style: "heading",
          spaced: true,
        },
        {
          type: "mockupRow",
          background: AFTER_BG,
          variant: "13-pro",
          items: [
            {
              label: "Before",
              background: BEFORE_BG,
              alt: "Original quest completion flow",
              frames: ["/case-studies/props/before-4.webp"],
            },
            {
              label: "After",
              alt: "Redesigned quest completion flow",
              frames: ["/case-studies/props/after-4.webp"],
            },
          ],
        },
        {
          type: "paragraph",
          text: "We redesigned quest completion to feel guided, intuitive, and confidence-building.",
        },
        {
          type: "subheading",
          text: "Quest Rewards",
          style: "heading",
          spaced: true,
        },
        {
          type: "mockupRow",
          background: AFTER_BG,
          variant: "13-pro",
          items: [
            {
              label: "Before",
              background: BEFORE_BG,
              alt: "Original quest rewards screen",
              frames: ["/case-studies/props/before-5.webp"],
            },
            {
              label: "After",
              alt: "Redesigned quest rewards screen",
              frames: ["/case-studies/props/after-5.webp"],
            },
          ],
        },
        {
          type: "paragraph",
          text: "By enlarging the visuals, simplifying the layout, and categorizing rewards into Prizes and Props, we brought the reward loop to the forefront.",
        },
        {
          type: "subheading",
          text: "Quests",
          style: "heading",
          spaced: true,
        },
        {
          type: "mockupRow",
          background: AFTER_BG,
          variant: "13-pro",
          items: [
            {
              label: "Before",
              background: BEFORE_BG,
              alt: "Original quest list screen",
              frames: ["/case-studies/props/before-6.webp"],
            },
            {
              label: "After",
              alt: "Redesigned quest list screen",
              frames: ["/case-studies/props/after-6.webp"],
            },
          ],
        },
        {
          type: "paragraph",
          text: "By redesigning the Quest List with clear hierarchy, simplified cards, and stronger visual cues, we turned a dense, overwhelming list into a scannable flow.",
        },
        {
          type: "subheading",
          text: "Eventure Profile",
          style: "heading",
          spaced: true,
        },
        {
          type: "mockupRow",
          background: AFTER_BG,
          variant: "13-pro",
          items: [
            {
              label: "Before",
              background: BEFORE_BG,
              alt: "Original Eventure profile screen",
              frames: ["/case-studies/props/before-3.webp"],
            },
            {
              label: "After",
              alt: "Redesigned Eventure profile screen",
              frames: ["/case-studies/props/after-3.webp"],
            },
          ],
        },
        {
          type: "paragraph",
          text: "By restructuring the Eventure profile around clear hierarchy and social cues, we transformed a visually noisy page into a focused event overview.",
        },
      ],
    },
    {
      id: "testing",
      navLabel: "Testing",
      heading: "Every participant completed the core loop without help.",
      blocks: [
        {
          type: "paragraph",
          text: "Our user researcher ran a final round of RITE testing with 3 participants (2 frequent event-goers, 1 infrequent) across onboarding, navigation, and quest completion.",
        },
        {
          type: "stats",
          items: [
            { value: "0 → 3/3", label: "could explain Props' value after onboarding" },
            { value: "10 → ≤2", label: "taps to reach an active Eventure" },
            { value: "25% → 100%", label: "task completion rate" },
          ],
        },
        {
          type: "subheading",
          text: "Why it matters",
        },
        {
          type: "paragraph",
          text: "Each result drives retention:",
        },
        {
          type: "list",
          marker: "arrow",
          items: [
            "Understanding the value prop in onboarding gives users a reason to come back",
            "Reaching an Eventure in two taps helps users reach value faster",
            "Completing a quest delivers the reward, a gamification loop that boosts retention ",
          ],
        },
        {
          type: "paragraph",
          text: "These testing results gave us strong evidence the redesign fixed the core usability issues.",
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
          text: "We initially designed Home with two tabs: My Groups and Discover. But testing and conversations with stakeholders flagged this. Because Props eventually needed to scale with premium features, advertising, and leaderboards, we revisited the underlying information architecture.",
        },
        {
          type: "paragraph",
          text: "After evaluating the tradeoffs, we separated Groups and Eventures (originally in My Groups) into two different tabs. While this required changing our initial information architecture, it established a clearer mental model. Resolving this issue now saved money and time, giving us more room for future expansion without fundamentally rethinking the navigation as the product grows.",
        },
        {
          type: "mockup",
          scrollFrames: {
            frames: [
              "/case-studies/props/final-1.webp",
              "/case-studies/props/final-2.webp",
              "/case-studies/props/final-3.webp",
            ],
            // Status bar and tab bar stay put while each Home tab scrolls.
            pinTop: 54,
            pinBottom: 83,
            // 1.5x the default pace (1400ms holds, 2600ms scroll).
            holdMs: 930,
            scrollMs: 1730,
          },
          background: "/case-studies/props/cover-bg.webp",
          alt: "The redesigned Home screen, cycling through Eventures & Quests, Groups, and Discover inside an iPhone mockup",
          variant: "13-pro",
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
