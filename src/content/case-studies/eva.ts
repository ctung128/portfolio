import type { CaseStudy } from "./types";

export const eva: CaseStudy = {
  slug: "eva",
  title: "EVA",
  oneLiner:
    "A conversational ops agent that interprets EOX Vantage's operational data so leaders can validate performance metrics on demand.",
  cardDescription:
    "A 0→1 conversational ops agent for enterprise leadership, designed to be AI-second, not AI-first.",
  year: "2025",
  industry: "EOX Vantage — Enterprise Ops Intelligence",
  role: "Product Designer",
  team: [
    "1 Designer (me!)",
    "1 Product Manager",
    "1 Software Engineer",
  ],
  timeline: "Jan–Mar 2025",
  skills: ["User Research", "\nPrototyping", "Conversational AI Design", "AI-Native Product Thinking"],
  tags: ["0→1", "AI / Enterprise", "Internal Tool"],
  coverImage: {
    src: "/case-studies/eva/cover.png",
    alt: "EVA conversational ops agent cover image",
  },
  coverVideo: "/case-studies/eva/cover.mp4",
  sections: [
    {
      id: "overview",
      navLabel: "Overview",
      heading: "EOX Vantage was becoming a product company. EVA was the first proof of it.",
      blocks: [
        {
          type: "paragraph",
          text: "EOX Vantage was transitioning from a Managed Services IT company toward a product company, and EVA was the first 0→1 internal product built to prove that shift out. I was the sole product designer, working with a PM, an engineer, and the Head of Managed Services as primary stakeholder — two months to a working prototype.",
        },
        {
          type: "paragraph",
          text: "The hard part was never \"design an AI interface.\" It was multiple user roles, a complicated underlying data model, existing organizational workflows, and a real open question about whether anyone would trust what the system told them.",
        },
      ],
    },
    {
      id: "problem",
      navLabel: "Problem",
      heading: "Operational intelligence existed. It was hard to validate and interpret.",
      blocks: [
        {
          type: "paragraph",
          text: "The initial ask was broad: EOX had a lot of operational data, but leadership couldn't use it with confidence. My first job wasn't design — it was turning \"make this data easier to use\" into an actual product problem.",
        },
        {
          type: "subheading",
          text: "Insight 1 — Trust was the bottleneck",
        },
        {
          type: "paragraph",
          text: "Leadership lacked confidence in the accuracy of the data insights themselves, not access to them.",
        },
        {
          type: "subheading",
          text: "Insight 2 — Leadership wanted on-demand answers based on existing data",
        },
        {
          type: "paragraph",
          text: "A conversational chatbot could interpret data and establish trust better than another dashboard.",
        },
        {
          type: "quote",
          text: "Although performance data is readily available, Managed Services leadership lacks confidence in it because metrics are derived from opaque, manual reporting processes. This creates a need for on-demand, explainable insights that leaders can trust and act on.",
          attribution: "Problem statement",
        },
      ],
    },
    {
      id: "user-research",
      navLabel: "User research",
      heading: "Leadership reviewed metrics. Leadership didn't trust them.",
      blocks: [
        {
          type: "paragraph",
          text: "My PM interviewed the Head of Managed Services and several Operations Managers about how they monitored team performance. Everyone landed in the same place: leadership reviewed metrics via static reports, workbooks, and exports, but data entry was time-consuming and disorganized — tracking performance was slow, inconsistent, and sometimes just inaccurate.",
        },
        {
          type: "paragraph",
          text: "Two very different jobs to be done fell out of that research: leadership needed a macro-level view they could defend in a meeting, without reading every number. Operations managers needed fast, granular answers — broken down by team, queue, case type, or individual — so they could act, not just observe. Same underlying data, very different jobs. One generic view would technically serve both and actually optimize for neither.",
        },
      ],
    },
    {
      id: "competitive-research",
      navLabel: "Competitive research",
      heading: "Studying Perplexity taught me the fix wasn't UI.",
      blocks: [
        {
          type: "image",
          src: "/case-studies/eva/perplexity-audit.png",
          alt: "Competitive research on Perplexity and AI UX pattern libraries",
        },
        {
          type: "paragraph",
          text: "I audited high-caliber AI products — Perplexity especially, alongside a broader pass through AI UX pattern libraries — to see how they'd earned trust. The finding that mattered: trust lived in the retrieval policy, not the interface. Which sources get prioritized, how conflicting data gets ranked — that's a substrate-level decision, not a surface one.",
        },
      ],
    },
    {
      id: "ai-philosophy",
      navLabel: "AI design philosophy",
      heading: "AI-second, not AI-first.",
      blocks: [
        {
          type: "quote",
          text: "Be skeptical of the marketing claims being made by AI tools... Unnecessary AI chatbots and features can harm rather than help users.",
          attribution: "Nielsen Norman Group, 2023–2024 studies on AI products",
        },
        {
          type: "paragraph",
          text: "I read as much of that research as I could find, plus articles and podcasts on designing for AI, before writing a single flow. That set the bar: this only shipped if it beat the static report on trust, not on novelty.",
        },
        {
          type: "list",
          items: [
            "Designers should be AI-second, not AI-first.",
            "Sprinkle AI in where it reduces frustration or speeds up success — never automate everything just because a real problem or user need hasn't been solved yet.",
            "The artifact I was actually designing wasn't the UI. It was the retrieval policy.",
          ],
        },
      ],
    },
    {
      id: "iterations",
      navLabel: "Iterations",
      heading: "Three rounds, each one breaking something the last one couldn't see.",
      blocks: [
        {
          type: "subheading",
          text: "Iteration 1 — Raw text input, one role view",
        },
        {
          type: "image",
          src: "/case-studies/eva/iteration-1-raw-input.png",
          alt: "Iteration 1: open text field with one shared set of suggested questions",
        },
        {
          type: "paragraph",
          text: "The first version was intentionally simple: a raw text field and one shared view for every user. Ask a question, get an answer. Here's a trimmed version of what it actually produced for an Average Handling Time query.",
        },
        {
          type: "quote",
          text: "AHT for the trailing 30 days: 14,950 hours across 30,000 transactions — 29.9 min average, a 1.8% improvement over the trailing 14 days. Trend analysis flagged both wins (new training programs, process automation) and headwinds (unfamiliar transaction types in weeks 2–3).",
          attribution: "Trimmed excerpt of the real Iteration 1 output",
        },
        {
          type: "paragraph",
          text: "It worked. It also broke fast, in two specific ways: raw text input meant anyone could ask anything, with no guarantee the model stayed inside verified data — and this dense, spreadsheet-style answer was built for someone willing to read every number, which described neither audience well. One generic view couldn't serve a five-minute glance and a granular investigation at the same time.",
        },
        {
          type: "subheading",
          text: "Iteration 2 — Disabled raw input, two role views",
        },
        {
          type: "image",
          src: "/case-studies/eva/iteration-2-two-views.png",
          alt: "Iteration 2: leadership's 3 broad question categories next to operations' 4 more granular ones",
        },
        {
          type: "paragraph",
          text: "Disabled raw text input entirely, replaced with pre-configured questions. Removing free text wasn't a downgrade — it meant every question that could be asked was one EVA could actually answer inside verified data.",
        },
        {
          type: "paragraph",
          text: "Split into two role views. Leadership's surfaced three broad categories (Average Handling Time, Specific Customer AHT, Specific Employee AHT); operations' surfaced four, with more granularity (adding incident volume, first-call resolution, and escalation patterns). Same underlying questions, different altitude. Research wasn't shaping the visuals here — it was shaping the product's structure and what the AI was allowed to do.",
        },
        {
          type: "subheading",
          text: "Iteration 3 — Built-in trust and verification",
        },
        {
          type: "paragraph",
          text: "Even if EVA gave the right answer — why should anyone trust it? My first instinct was citations. I explored two approaches.",
        },
        {
          type: "subheading",
          text: "Exploration 1 — Appended citations",
        },
        {
          type: "image",
          src: "/case-studies/eva/appended-citations.png",
          alt: "Appended citations concept: a source link at the bottom of the answer",
        },
        {
          type: "paragraph",
          text: "A source link at the bottom of the answer. Rejected: linked the source, but gave no context for what the data actually said.",
        },
        {
          type: "subheading",
          text: "Exploration 2 — Inline citations",
        },
        {
          type: "image",
          src: "/case-studies/eva/inline-citations.png",
          alt: "Inline citations concept: numbered footnotes inside the answer text",
        },
        {
          type: "paragraph",
          text: "Numbered footnotes inside the answer text. Rejected: required two or more clicks to actually verify anything — worked directly against the speed leadership needed.",
        },
        {
          type: "paragraph",
          text: "Looking closer, citations weren't solving the actual problem. For an operational metric, nobody needed to know which document an answer came from. They needed something more specific: how did you get this number, and can I defend it if someone challenges me on it?",
        },
        {
          type: "quote",
          text: "How might we enable trust and verification so that users will be confident in the accuracy of insights, while optimizing for low click rate and speed?",
          attribution: "Reframed HMW",
        },
        {
          type: "subheading",
          text: "What shipped instead",
        },
        {
          type: "subheading",
          text: "Chain-of-Thought Disclosure",
        },
        {
          type: "paragraph",
          text: "Users can view how the model reasoned its way to the answer. Conceptually interesting on its own — but reasoning alone still didn't give leadership enough to validate an operational decision.",
        },
        {
          type: "subheading",
          text: "Proof Mode",
        },
        {
          type: "paragraph",
          text: "Users can expand any answer, in place, into its calculation details and the data it was sourced from — no separate page, no extra click to a different view. This is what actually closed the gap chain-of-thought alone couldn't: leadership could validate a number before using it in an executive discussion, and operations could trace exactly where a number came from.",
        },
        {
          type: "subheading",
          text: "Suggested follow-up questions",
        },
        {
          type: "paragraph",
          text: "Aimed at raising the success rate per prompt rather than the number of prompts — every additional prompt is a real token cost to the business, so \"more engagement\" was the wrong goal to optimize toward.",
        },
      ],
    },
    {
      id: "final-designs",
      navLabel: "Final designs",
      heading: "From a blank text box to a named, categorized starting point.",
      blocks: [
        {
          type: "image",
          src: "/case-studies/eva/before-after.png",
          alt: "Before and after: a blank chat entry point versus a categorized, named landing screen",
          wide: true,
        },
        {
          type: "paragraph",
          text: "Before: one generic entry point, four unlabeled question cards, no framing. After: EVA opens by naming what it does (\"AI-powered operations intelligence for Managed Services leaders\"), sorts questions into categories with counts, and gets leadership or operations to their first real question in one tap instead of a guess.",
        },
        {
          type: "paragraph",
          text: "The finished chatbot looks constrained, almost simple. That was deliberate, not a limitation. EVA was never meant to be a general-purpose AI assistant — it was built specifically around EOX's existing workflows, data, roles, and constraints. Open-ended prompting was on the table, and I ruled it out: it would have let people ask questions the data couldn't support, and every one of those queries would have cost real token money for no guaranteed value.",
        },
        {
          type: "list",
          items: [
            "Reduced ad-hoc reporting requests to analysts — with improved trust in the numbers themselves",
            "Faster leadership decision cycles — faster insight generation, less reliance on manual reporting",
            "Strong signals of adoption and alignment across both roles",
          ],
        },
        {
          type: "quote",
          text: "Instead of scanning reports, I can ask a question and immediately understand whether we're improving, what changed, and where to look next. Being able to see how numbers were calculated and see what changed makes this more useful than the reports we rely on today.",
          attribution: "Abhinav Goyal, Head of Managed Services, after an early prototype walkthrough",
        },
      ],
    },
    {
      id: "reflection",
      navLabel: "Reflection",
      heading: "The constraint wasn't a limitation of the design. It was part of the product strategy.",
      blocks: [
        {
          type: "paragraph",
          text: "In a complex enterprise product, good design isn't maximum flexibility for the user — it's understanding the organization's workflows, technical architecture, economics, and different user needs, then deciding where the product should absorb complexity and where it needs to expose it.",
        },
      ],
    },
  ],
};
