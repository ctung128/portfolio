import type { CaseStudy } from "./types";

/** Pale blue-gray from EVA's own chat surfaces, a step deeper so the screens
 * still separate from it, used as the card behind every EVA screenshot. */
const TINT = "#E6EFF2";

export const eva: CaseStudy = {
  slug: "eva",
  title: "Conversational AI operational chatbot",
  oneLiner:
    "A conversational ops agent that interprets EOX Vantage's operational data so leaders can validate performance metrics on demand.",
  cardDescription:
    "A 0→1 conversational ops agent for enterprise leadership, designed to be AI-second, not AI-first.",
  year: "2025",
  industry: "EOX Vantage / Enterprise Ops Intelligence",
  role: "Product Designer",
  team: [
    "1 Designer (me!)",
    "1 Product Manager",
    "1 Software Engineer",
  ],
  timeline: "Jan–Mar 2025",
  skills: ["User Research", "Prototyping", "Conversational AI Design", "AI-Native Product Thinking"],
  tags: ["0→1", "AI / Enterprise", "Internal Tool"],
  coverImage: {
    src: "/case-studies/eva/cover.webp",
    alt: "EVA conversational ops agent cover image",
  },
  coverVideo: "/case-studies/eva/cover.mp4",
  sections: [
    {
      id: "overview",
      navLabel: "Overview",
      heading: "What is EVA?",
      blocks: [
        {
          type: "paragraph",
          text: "EVA is a conversational AI agent that turns operational data into decision-ready answers with built-in trust and verification, allowing Managed Services team leaders to validate metrics on demand. This was an internal tool meant to support the unique and established workflows of the Managed Services team.",
        },
        {
          type: "paragraph",
          text: "I was the sole product designer, working with a PM, and an engineer. This project took around 2 months to test a working MVP prototype.",
        },
      ],
    },
    {
      id: "problem",
      navLabel: "Problem",
      heading: "EOX had a lot of operational data, but it was tough to validate and interpret.",
      blocks: [
        {
          type: "subheading",
          text: "Key insights",
        },
        {
          type: "insights",
          items: [
            {
              label: "Trust was the bottleneck",
              body: "Leadership lacked confidence in the accuracy of the data insights themselves, not access to them.",
            },
            {
              label: "Leadership wanted on-demand answers based on existing data",
              body: "A conversational chatbot could interpret data and establish trust better than another dashboard.",
            },
          ],
        },
        {
          type: "callout",
          label: "Problem statement",
          text: "Although performance data is readily available, Managed Services leadership lacks confidence in it because metrics are derived from opaque, manual reporting processes. This creates a need for on-demand, explainable insights that leaders can trust and act on.",
        },
      ],
    },
    {
      id: "user-research",
      navLabel: "User research",
      heading: "Two different stakeholders with contrasting use cases",
      blocks: [
        {
          type: "paragraph",
          text: "My PM interviewed the Head of Managed Services and several Operations Managers about how they monitored team performance. Everyone landed in the same place: leadership reviewed metrics via static reports, workbooks, and exports, but data entry was time-consuming and disorganized. Tracking performance was also slow, inconsistent, and sometimes just inaccurate.",
        },
        {
          type: "paragraph",
          text: "Two very different jobs to be done fell out of that research:",
        },
        {
          type: "paragraph",
          text: "1) Leadership needed a macro-level view they could defend in a meeting, without doing the calculations themselves.",
        },
        {
          type: "paragraph",
          text: "2) Operations managers needed fast, granular answers broken down by team, queue, case type, or individual, so that they could act on it.",
        },
      ],
    },
    {
      id: "competitive-research",
      navLabel: "Competitive research",
      heading: "Perplexity taught me that substrate-level decisions are what drive good conversational AI design.",
      blocks: [
        {
          type: "gallery",
          columns: 2,
          images: [
            { src: "/case-studies/eva/perplexity.png", alt: "Competitive research: Perplexity", aspect: 642 / 642 },
            { src: "/case-studies/eva/ai.webp", alt: "Competitive research: AI UX pattern library", aspect: 935 / 642 },
          ],
        },
        {
          type: "paragraph",
          text: "I audited high-caliber AI products like Perplexity and AI UX pattern libraries to see how they build trust. I found that trust grew from a solid retrieval policy, not the interface. For conversational AI design, substrate-level decisions—which sources get prioritized, how conflicting data gets ranked, what guardrails are in place—are the deciding factor, which informed my design approach.",
        },
      ],
    },
    {
      id: "ai-philosophy",
      navLabel: "AI design philosophy",
      heading: "Be AI-second, not AI-first.",
      blocks: [
        {
          type: "quote",
          text: "Be skeptical of the marketing claims being made by AI tools... Unnecessary AI chatbots and features can harm rather than help users.",
          attribution: "Nielsen Norman Group, 2023–2024 studies on AI products",
        },
        {
          type: "paragraph",
          text: "I read as much of that research as I could find, plus articles and podcasts on designing for AI, before designing a single flow. That set the bar: this only shipped if it was more trustworthy than the status quo—not if it was more novel.",
        },
      ],
    },
    {
      id: "iterations",
      navLabel: "Iterations",
      heading: "Exploring different AI design patterns",
      hideHeader: true,
      blocks: [
        {
          type: "subheading",
          kicker: "Iteration 1",
          text: "Raw text input, one role view",
          style: "heading",
        },
        {
          type: "image",
          src: "/case-studies/eva/iteration-1-raw-input.png",
          alt: "Iteration 1: open text field with one shared set of suggested questions",
          background: TINT,
          frame: "browser",
          backgroundImageWidth: "88%",
        },
        {
          type: "paragraph",
          text: "The first version was intentionally simple: a raw text field and one shared view for every user. Ask a question, get an answer—like your typical AI chatbot.",
        },
        {
          type: "paragraph",
          text: "It worked... but also broke fast. First, raw text input meant anyone could ask out-of-bounds questions, which was expensive and unsupported by our data. Secondly, one generic role view couldn't simultaneously provide a five-minute glance for Managed Services leaders and a granular analysis for Operational Managers.",
        },
        {
          type: "subheading",
          kicker: "Iteration 2",
          text: "Disabled raw input, two role views",
          style: "heading",
          spaced: true,
        },
        {
          type: "crossfade",
          images: [
            { src: "/case-studies/eva/managed.png", alt: "Iteration 2: leadership view with pre-configured questions" },
            { src: "/case-studies/eva/ops.png", alt: "Iteration 2: operations manager view with pre-configured questions" },
          ],
          background: TINT,
        },
        {
          type: "paragraph",
          text: "I disabled raw text input entirely and replaced it with pre-configured questions. This meant every question that could be asked was one EVA could answer with verified data. I also split the chatbot into two role views. Leadership accessed higher-level questions whereas operational managers accessed more granularity.",
        },
        {
          type: "subheading",
          kicker: "Iteration 3",
          text: "Built-in trust and verification",
          style: "heading",
          spaced: true,
        },
        {
          type: "paragraph",
          text: "Even if EVA gave the right answer — why should anyone trust it? My first instinct was citations. I explored two approaches.",
        },
        {
          type: "comparison",
          groups: [
            {
              label: "Appended citations",
              status: "rejected",
              images: [
                {
                  src: "/case-studies/eva/appended-citations.webp",
                  alt: "Appended citations concept: a source link at the bottom of the answer",
                },
              ],
              caption: "Gave no context for what the data actually said on the same page.",
            },
            {
              label: "Inline citations",
              status: "rejected",
              images: [
                {
                  src: "/case-studies/eva/inline-citations.webp",
                  alt: "Inline citations concept: numbered footnotes inside the answer text",
                },
              ],
              caption: "Took two or more clicks to verify anything, working against the speed leadership needed.",
            },
          ],
          float: true,
        },
        {
          type: "paragraph",
          text: "Looking closer, citations weren't solving the actual problem. For an operational metric, users needed more specificity: how did you get this number, and can I defend it if someone challenges me on it?",
        },
        {
          type: "callout",
          label: "How might we",
          text: "…enable trust and verification so that users will be confident in the accuracy of insights, while optimizing for low click rate and speed?",
        },
        {
          type: "subheading",
          kicker: "What shipped",
          text: "Explainability and guided follow-ups",
          style: "heading",
          spaced: true,
        },
        {
          type: "subheading",
          text: "Chain-of-thought disclosure",
          status: "shipped",
        },
        {
          type: "paragraph",
          text: "Users can view how the model reasoned its way to the answer. However, reasoning in real time still didn't give leadership enough to validate an operational decision.",
        },
        {
          type: "video",
          src: "/case-studies/eva/chain.mp4",
          alt: "Expanding an EVA answer to reveal the model's chain of thought",
        },
        {
          type: "subheading",
          text: "Proof mode",
          status: "shipped",
        },
        {
          type: "paragraph",
          text: "Users can expand any answer, in place, into its calculation details and the data it was sourced from. This closed the gap chain-of-thought alone couldn't: leadership could validate a number before using it in an executive discussion, and operations could trace exactly where a number came from.",
        },
        {
          type: "video",
          src: "/case-studies/eva/proof.mp4",
          alt: "Proof mode expanding an answer into its calculation details and source data",
        },
        {
          type: "subheading",
          text: "Suggested follow-up questions",
          status: "shipped",
        },
        {
          type: "image",
          src: "/case-studies/eva/suggested.png",
          alt: "Suggested follow up questions",
          background: TINT,
          frame: "float",
          backgroundImageWidth: "80%",
        },
        {
          type: "paragraph",
          text: "I included suggested follow-up questions after a new chat initiated to raise the success rate per prompt rather than the number of prompts. Every additional prompt is a real token cost to the business, so \"more engagement\" opposed EOX's business needs.",
        },
      ],
    },
    {
      id: "final-designs",
      navLabel: "Final designs",
      heading: "From a ChatGPT dupe to a uniquely EOX solution.",
      blocks: [
        {
          type: "comparison",
          groups: [
            {
              label: "Before",
              images: [
                {
                  src: "/case-studies/eva/before.webp",
                  alt: "Before: a blank chat entry point with unlabeled question cards",
                },
              ],
            },
            {
              label: "After",
              images: [
                {
                  src: "/case-studies/eva/after.webp",
                  alt: "After: a named landing screen with categorized questions",
                },
              ],
            },
          ],
          float: true,
          numbered: false,
        },
        {
          type: "paragraph",
          text: "With pre-configured questions, the finished chatbot looks constrained, almost simple. That was intentional. EVA was never meant to be a general-purpose AI assistant. As an internal tool, it was built specifically around the EOX Managed Services team's existing workflows, data, roles, and constraints. Open-ended prompting would have let people ask questions the data couldn't support, and every one of those queries would have cost token money for no guaranteed value.",
        },
        {
          type: "paragraph",
          text: "After demoing our MVP to our target users, we received the following feedback:",
        },
        {
          type: "list",
          items: [
            "Reduced ad-hoc reporting requests to analysts, with improved trust in the numbers themselves",
            "Strong signals of adoption and alignment across both roles",
          ],
        },
      ],
    },
    {
      id: "reflection",
      navLabel: "Reflection",
      heading: "Our constraints weren't design limitations! They were part of the product strategy.",
      blocks: [
        {
          type: "paragraph",
          text: "For a complex enterprise product, especially for an internal tool, we weren't trying to max out AI chatbot capabilities.  For EOX Vantage, good design looked like a product that understood organizational workflows, technical architecture, buesiness needs, and different user needs. In the end, that might look like a simpler, more constrained design, but that was the solution that worked for EOX's users, and what moved the needle.",
        },
      ],
    },
  ],
};
