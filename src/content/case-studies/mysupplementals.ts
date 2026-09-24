import type { CaseStudy } from "./types";

/** Pale blue-gray from MySupplementals' own section backgrounds, used as the
 * card behind every screenshot. */
const TINT = "#F1F7FA";

export const mysupplementals: CaseStudy = {
  slug: "mysupplementals",
  title: "Optimizing the college essay gathering process",
  oneLiner:
    "A web app that merges overlapping college essay prompts across schools into a single, organized Google Doc. Built for students and the counselors who advise them.",
  cardDescription:
    "Freelance design for a solo founder: a landing page and core web app flow that help college applicants and counselors write once and apply everywhere.",
  year: "2026",
  industry: "MySupplementals / EdTech",
  role: "Founding Product Designer",
  team: ["1 Designer (me!)", "1 Engineer"],
  timeline: "March - May 2026",
  skills: ["Landing Page Design", "Interaction Design", "UX Writing", "Design–Dev Collaboration"],
  tags: ["0→1", "EdTech", "B2C + B2B"],
  coverImage: {
    src: "/case-studies/mysupplementals/cover.png",
    alt: "MySupplementals landing page cover image",
  },
  coverVideo: "/case-studies/mysupplementals/cover.mp4",
  liveUrl: "https://mysupplementals.com",
  sections: [
    {
      id: "overview",
      navLabel: "Overview",
      heading: "Introducing MySupplementals",
      blocks: [
        {
          type: "paragraph",
          text: "MySupplementals helps college applicants get through supplemental essays. Students add their school list, and the app pulls every essay prompt from 1,211+ universities, groups the ones that ask the same thing, and exports the plan to Google Docs in one click.",
        },
        {
          type: "paragraph",
          text: "It's built for more than students. High school counselors and private college counselors can use it to plan essays across a whole caseload, and it could be sold to schools as a resource.",
        },
        {
          type: "paragraph",
          text: "I worked as a founding designer with a founding engineer. I designed in Figma, he built in code, and we reviewed each iteration together in coworking sessions. I owned the marketing landing page and the core web app flow, from picking schools to the final insight reveal.",
        },
        { type: "subheading", text: "Impact for students", style: "label", spaced: true },
        {
          type: "stats",
          items: [
            { value: "1,211+", label: "universities with prompts in one place" },
            { value: "47 → 13", label: "average essays for a 10-school list" },
            { value: "2 min", label: "to build an essay list" },
          ],
        },
      ],
    },
    {
      id: "problem",
      navLabel: "Problem",
      heading: "Applying to ten schools can mean 47 essays across 15 browser tabs.",
      blocks: [
        {
          type: "paragraph",
          text: "Supplemental essays are where college applications get overwhelming. Every school asks its own questions, but many of them overlap, and students rarely see that until they're deep into drafting.",
        },
        {
          type: "insights",
          items: [
            {
              label: "Scattered",
              quote: "Prompts live on a different site for every school.",
              body: "Students end up juggling a tab per school just to see what they need to write.",
            },
            {
              label: "Redundant",
              quote: "Many prompts ask the same thing in different words.",
              body: "Without seeing them side by side, students write near-duplicate essays from scratch.",
            },
            {
              label: "Fragile",
              quote: "Progress is easy to lose.",
              body: "Spreadsheets and bookmarked links break down as the school list grows.",
            },
          ],
        },
        {
          type: "image",
          src: "/case-studies/mysupplementals/affinity-1.png",
          alt: "Affinity map of student answers to what frustrates them about supplementals, grouped into scattered, redundant, and fragile",
        },
        { type: "subheading", text: "Designing for multiple stakeholders", style: "heading", spaced: true },
        {
          type: "insights",
          items: [
            {
              label: "Students",
              quote: "I just want to know what I actually have to write.",
              body: "College applicants juggling 10+ schools need one list of prompts and a way to avoid writing the same essay twice.",
            },
            {
              label: "High school counselors",
              quote: "I'm guiding dozens of students at once.",
              body: "School counselors need a shared, reliable resource instead of rebuilding prompt lists for each student.",
            },
            {
              label: "Private counselors",
              quote: "My time is what clients pay for.",
              body: "Independent counselors can spend less time on logistics and more on helping students with the essays themselves.",
            },
          ],
        },
        {
          type: "image",
          src: "/case-studies/mysupplementals/affinity-2.png",
          alt: "Affinity map of what would make tracking supplemental essays easier, grouped by students, high school counselors, and private counselors",
        },
      ],
    },
    {
      id: "opportunity",
      navLabel: "Opportunity",
      heading: "How might we turn a pile of browser tabs into one clear writing plan, and make the product's value obvious in seconds?",
      blocks: [
        {
          type: "paragraph",
          text: "When the founder reached out, he had a creative vision, but no existing prototype. My job was to make build an MVP that felt trustworthy, easy to follow, and rewarding at every step: first on the landing page that sells the product, then in the app itself. The design also had to feel credible enough for counselors to recommend, and for a school to adopt as an official resource.",
        },
      ],
    },
    {
      id: "landing-page",
      navLabel: "Iteration 1",
      heading: "A landing page built around trust",
      blocks: [
        {
          type: "paragraph",
          text: "My first draft kept the visuals simple and put the messaging first: say what the app does, show how it works, and give students an easy way in. More branding could come later. The first job was building trust and getting clicks.",
        },
        {
          type: "image",
          src: "/case-studies/mysupplementals/landing-page.png",
          alt: "MySupplementals marketing landing page",
          background: TINT,
          frame: "browser",
          backgroundImageWidth: "88%",
        },
      ],
    },
    {
      id: "progress",
      navLabel: "Iteration 2",
      heading: "More flexibility made the design worse, not better",
      blocks: [
        {
          type: "paragraph",
          text: "After selecting schools from a search bar, students confirm details for each one based on the Common App. My engineer defined multiple states for the progress indicator: active state, completed state, and incomplete state. For a list that could be 10+ schools, the progress indicator had to answer two questions at once: where am I, and how much is left?  This one went through more churn than any other screen, because the underlying need kept getting more complex before it got simpler.",
        },
        { type: "subheading", text: "v1 → Dots", style: "label", spaced: true },
        {
          type: "paragraph",
          text: "This was the engineer's first pass. It didn't scale past a handful of schools and also couldn't communicate anything beyond an active state.",
        },
        {
          type: "image",
          src: "/case-studies/mysupplementals/dot.png",
          alt: "Dot",
          background: TINT,
          frame: "float",
          backgroundImageWidth: "52%",
        },
        { type: "subheading", text: "v2 → Progress bar + stepper", style: "label", spaced: true },
        {
          type: "paragraph",
          text: "To support all three states, the bottom stepper showed three schools at a time with an overflow count (\"3+\"). The current school took the primary color, finished ones got a green check, and a progress bar up top gave a louder signal for longer lists.",
        },
        {
          type: "paragraph",
          text: "But this ran into an engineering constraint. The \"Next\" button was already gated until the current question was answered, meaning a student couldn't jump ahead to an incomplete school even if they wanted to. With that constraint in place, the university names inside the stepper didn't make sense. We also already had the top progress bar communicating overall completion, so the bottom progress stepper was redundant."
        },
        {
          type: "image",
          src: "/case-studies/mysupplementals/stepper.png",
          alt: "School stepper with overflow count",
          background: TINT,
          frame: "float",
          backgroundImageWidth: "80%",
        },
        { type: "subheading", text: "v3 → PROGRESS BAR", style: "label", spaced: true },
        {
          type: "paragraph",
          text: "I cut the university names from the bottom stepper, deferring to a simple X out of Y status indicator to reinforce clarity on the user's progress. ",
        },
        {
          type: "image",
          src: "/case-studies/mysupplementals/stepper-states.png",
          alt: "School stepper with active, completed, and remaining states",
          background: TINT,
          frame: "float",
          backgroundImageWidth: "80%",
        },
      ],
    },
    {
      id: "iteration-3",
      navLabel: "Iteration 3",
      heading: "Making the journey feel like a reward",
      blocks: [
        {
          type: "paragraph",
          text: "The insight reveal card is where students see how much work the app just saved them. It's the moment the whole flow builds toward, so it went through several rounds.",
        },
        {
          type: "paragraph",
          text: "My engineer initially produced an insight card with a blurred background. After auditing comparable web apps, I found blur was largely absent from the category, and it muddied the card instead of elevating it, so I cut it. In the same round I tested green against blue for the primary accent. Blue read cleaner against the card's other elements, so that's what shipped.",
        },
        {
          type: "image",
          src: "/case-studies/mysupplementals/insight-reveal.png",
          alt: "Insight reveal card with confetti",
          background: TINT,
          frame: "browser",
          backgroundImageWidth: "88%",
        },
        { type: "subheading", text: "Which impact metric lands best for students?", style: "heading", spaced: true },
        {
          type: "paragraph",
          text: "Instead of assuming an impact metric, I explored two competing ones.",
        },
        {
          type: "comparison",
          float: true,
          background: TINT,
          groups: [
            {
              label: "Time saved",
              images: [
                { src: "/case-studies/mysupplementals/metric-time.png", alt: "Insight card led by time saved" },
              ],
            },
            {
              label: "Unique essays left to write",
              images: [
                { src: "/case-studies/mysupplementals/metric-essays.png", alt: "Insight card led by unique essay count" },
              ],
            },
          ],
        },
        {
          type: "paragraph",
          text: "We weighed which gave students the bigger emotional payoff against which more honestly showed what the tool actually did. A smaller, concrete number (\"8 essays to write\") beat an abstract one (\"38 hours saved\") on both counts.",
        },
      ],
    },
    {
      id: "saving",
      navLabel: "Iteration 4",
      heading: "Designing around features that existed before the UX did",
      blocks: [
        {
          type: "paragraph",
          text: "Sometimes in fast startups, engineers, especially ones that are founders, develop features before a designer defines them. Partway through, my engineer shipped smart saving, where changes are saved even if the tab closes. As a result, I needed to design reactively, or at least in parallel with my engineer, to map out the user journey and more complex states. ",
        },
        {
          type: "image",
          src: "/case-studies/mysupplementals/save.png",
          alt: "MySupplementals smart saving feature",
          background: TINT,
          frame: "float",
          backgroundImageWidth: "80%",
        },
        { type: "subheading", text: "Making smart saving visible", style: "heading", spaced: true },
        {
          type: "paragraph",
          text: "I proposed a save-status indicator based on a mental model students already trust, Google Docs' autosave, in two states. Green confirms their own selections are saved. A warning color flags that they're viewing someone else's data (ex. a college counseler viewing a student's list).",
        },
        {
          type: "video",
          src: "/case-studies/mysupplementals/save-status.mp4",
          alt: "Save status indicator in saved and viewing-shared states",
        },
        { type: "subheading", text: "Edge Case: When someone's shared link collides with your own saved progress", style: "heading", spaced: true },
        {
          type: "paragraph",
          text: "What happens if a student opens up a friend's shared link, and they edit changes or want to make a copy of it for themselves? Do we enabled smart saving here and overwrite their own list?. We came up a persistent modal that prompts users to either overwrite changes or go back to their own list, with a clear indicator at the top making the shared view status visible. However, after much deliberation, we decided to push this to a future phase because it did not cover a core Job to be Done.",
        },
        {
          type: "image",
          src: "/case-studies/mysupplementals/shared-modal.png",
          alt: "MySupplementals smart saving feature",
          background: TINT,
          frame: "browser",
          backgroundImageWidth: "72%",
        },
        { type: "subheading", text: "Edge Case: Letting students export first and answer questions later", style: "heading", spaced: true },
        {
          type: "paragraph",
          text: "Some schools require extra essays for specific departments or scholarships, which the Common App determines through a string of conditional questions. Making students answer all of those before reaching their essay list is the highest-friction point of the user journey, and letting students defer that decision meant they could reach value faster.",
        },
        {
          type: "paragraph",
          text: "Rather than forcing a choice immediately, I included a \"Choose later\" option alongside the actual prompts in V3.",
        },
        {
          type: "image",
          src: "/case-studies/mysupplementals/choose-later.png",
          alt: "Choose later feature",
          background: TINT,
          frame: "float",
          backgroundImageWidth: "48%",
        },
      ],
    },
    {
      id: "outcome",
      navLabel: "Outcome",
      heading: "Where it's landed",
      blocks: [
        {
          type: "paragraph",
          text: "MySupplementals is live, and the founder is now working on marketing. It hasn't had its public launch yet. Next is reaching students directly while positioning the app as a resource counselors and schools can offer.",
          link: { text: "live", href: "https://mysupplementals.com/" },
        },
        {
          type: "quote",
          text: "Once Carolyn was on the project, I stopped second-guessing the design. She took my half-baked ideas for MySupplementals and transformed them into screens that felt finished on the first pass. Fast, thoughtful, and easy to work with.",
          attribution: "Founder, MySupplementals",
        },
      ],
    },
    {
      id: "reflection",
      navLabel: "Reflection",
      heading: "On being an opinionated designer",
      blocks: [
        {
          type: "paragraph",
          text: "Tuhin Kumar, an early designer at Facebook and Airbnb, describes 0→1 as a designer's chance to put a signature on something. His point is that really well-designed products have an almost art-like quality that doesn't come from a purely rational process. They have an essence that speaks to people on a gut level. When someone asks why you did it that way, sometimes the honest answer is:",
        },
        {
          type: "quote",
          text: "Honestly, I just thought it was better.",
        },
        {
          type: "paragraph",
          text: "For two founders in the early stages, that was a lot of MySupplementals. For example, I scrapped the dot progress steppers because they looked funky compared to a progress bar. Alternatively, I eliminated the blurred background from the insights popup modal screen because I didn't like how it felt. Together these craft-based decisions are what make the product feel like a real, lived-in thing.",
        },
        {
          type: "paragraph",
          text: "But knowing when taste should give way to strategy matters just as much. For example, letting a technical constraint delete a feature instead of complicate it, or adding friction on purpose in front of a destructive action. Knowing when taste should yield to constraint, and when a business need (a counselor's trust, a school's adoption) should outrank a personal preference, mattered as much as the taste itself. Every decision in this project, instinctive or constrained, came back to one question: what actually serves a stressed-out student staring down 47 essays?"
        }
      ],
    },
  ],
};
