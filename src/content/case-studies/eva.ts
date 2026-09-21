import type { CaseStudy } from "./types";

export const eva: CaseStudy = {
  slug: "eva",
  title: "EVA",
  oneLiner:
    "An AI operational intelligence chatbot that turns operational data into decision-ready answers, with built-in trust and verification.",
  cardDescription:
    "A 0→1 conversational ops agent for enterprise leadership, designed to be AI-second, not AI-first.",
  year: "2025",
  industry: "Enterprise · Business Operations · Internal Tool",
  role: "UX Designer",
  team: [
    "Carolyn Tung — UX Designer",
    "Travis Roe — Product Manager",
    "Abhinav Goyal — Head of Managed Services",
  ],
  timeline: "Jan — Mar 2025",
  skills: ["Prototyping", "Conversational AI Design", "AI-Native Product Thinking"],
  tags: ["0→1", "AI / Enterprise", "Internal Tool"],
  coverImage: {
    src: "/case-studies/eva/cover.png",
    alt: "EVA conversational ops agent cover image",
  },
  sections: [
    {
      id: "overview",
      navLabel: "Overview",
      heading: "Overview",
      blocks: [
        {
          type: "paragraph",
          text: "I designed EVA, a conversational ops agent that turns operational data into decision-ready answers with built-in trust and verification, so leaders can validate metrics on demand. This was a 0 → 1 design project.",
        },
      ],
    },
    {
      id: "problem",
      navLabel: "Problem",
      heading: "The problem",
      blocks: [
        {
          type: "subheading",
          text: "Operational intelligence existed, but it wasn't usable.",
        },
        {
          type: "paragraph",
          text: "Operational intelligence for the Managed Services team was buried in opaque logic and not easily accessible or interpretable. Teams relied on daily exports and static reporting. Leaders needed the ability to self-serve answers instantly, but lacked trust and on-demand access.",
        },
      ],
    },
    {
      id: "research",
      navLabel: "Research",
      heading: "Understanding user needs",
      blocks: [
        {
          type: "paragraph",
          text: "My two primary users were Managed Services leadership and Ops Managers. My PM interviewed our key users to understand how leadership currently reviews metrics and received direct stakeholder feedback. We discovered that leadership reviews metrics via static reports, workbooks, and exports, but data entry is time-consuming and disorganized, so tracking performance metrics was not consistent.",
        },
        {
          type: "subheading",
          text: "1. Trust was the bottleneck",
        },
        {
          type: "paragraph",
          text: "Metrics were calculated using undocumented business rules and embedded in hidden worksheets. As a result, leadership lacked confidence in performance monitoring data.",
        },
        {
          type: "subheading",
          text: "2. Leadership wanted on-demand answers based on existing data",
        },
        {
          type: "paragraph",
          text: "A conversational chatbot could interpret data and establish trust better than a dashboard.",
        },
        {
          type: "subheading",
          text: "Landscape research",
        },
        {
          type: "paragraph",
          text: "According to Nielsen Norman Group, users feel like AI products will upsell them, assuming that they are untrustworthy, inaccurate, and expensive due to hallucinations and the cost of tokens. For this project, I realized that we needed to give users some degree of success within their credit plan before they run out of credit limits. As a result, we ought to help them prompt less, because an increasing number of credits would be expensive for the business.",
        },
        {
          type: "quote",
          text: "AI features must solve real problems, not be implemented for novelty. Unnecessary AI chatbots and features can harm rather than help users.",
          attribution: "Nielsen Norman Group",
        },
        {
          type: "quote",
          text: "Be skeptical of the marketing claims being made by AI tools designed for UX researchers. Many of these systems are not able to do everything they claim.",
          attribution: "Nielsen Norman Group",
        },
        {
          type: "subheading",
          text: "Competitive research",
        },
        {
          type: "paragraph",
          text: "Perplexity was my north star for chatbot interface design. By auditing high-caliber chatbots, I gained insight into how they decided which sources to prioritize (academic papers vs. news vs. Reddit), how to rank conflicting information, and what to do when sources contradict each other. Perplexity demonstrates how anchoring every response to verifiable sources — a substrate-level decision tied to the retrieval policy — fundamentally establishes trust, far beyond what surface-level UI changes can achieve.",
        },
      ],
    },
    {
      id: "exploration",
      navLabel: "Exploration",
      heading: "Exploration",
      blocks: [
        {
          type: "subheading",
          text: "Scrapped",
        },
        {
          type: "list",
          items: [
            "Raw text input — played around with this, but ultimately decided against it to control model behavior and prevent off-domain or unverifiable responses",
            "Result citations — could help users track data entries used in calculations, boosting trust and credibility, but prioritized for a future phase",
          ],
        },
        {
          type: "subheading",
          text: "Implemented",
        },
        {
          type: "list",
          items: [
            "Pre-configured questions — reduced prompt ambiguity and anchored queries to supported metrics",
            "Chain-of-thought disclosure — a thinking/reasoning experience to show how the model is calculating the data",
            "Opinionated answer structure — every chat response followed a structured template: time-based comparison (yesterday / 7d / 14d / 30d), trend interpretation, then operational explanation of what likely changed",
            "Threading history",
          ],
        },
        {
          type: "image",
          src: "/case-studies/eva/chat-interface.png",
          alt: "EVA chat interface with structured answer template",
          wide: true,
        },
      ],
    },
    {
      id: "iterations",
      navLabel: "Iterations",
      heading: "Iterations",
      blocks: [
        {
          type: "paragraph",
          text: "During review, we discovered that Ops Managers needed to ask micro-level and mid-level questions, whereas leadership only needed to ask macro-level questions.",
        },
        {
          type: "subheading",
          text: "01 — Two role views",
        },
        {
          type: "paragraph",
          text: "Creating two role views: one for Managed Services leadership, one for Ops Managers.",
        },
        {
          type: "subheading",
          text: "02 — Establishing trust & verifiability",
        },
        {
          type: "paragraph",
          text: "We also discovered users needed to double-check the data used against the calculation. To fulfill this need, I extended the design so that any metric answer could display calculation logic and source attribution.",
        },
        {
          type: "subheading",
          text: "03 — Recommended follow-up questions",
        },
        {
          type: "paragraph",
          text: "Improving the success rate of the conversational experience while decreasing org costs for tokens.",
        },
      ],
    },
    {
      id: "testing",
      navLabel: "Testing",
      heading: "Testing & success criteria",
      blocks: [
        {
          type: "subheading",
          text: "Retrieval + grounding (RAG over structured data)",
        },
        {
          type: "list",
          items: [
            "Reduced ad-hoc reporting requests to analysts",
            "Faster leadership decision cycles (staffing, tooling, escalation response)",
          ],
        },
        {
          type: "subheading",
          text: "Higher trust signals",
        },
        {
          type: "paragraph",
          text: "Measured via Proof Mode usage rate.",
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
          text: "By working through multiple iterations of the chatbot interface, it became increasingly clear that it is more imperative to be AI-second than AI-first. I was able to sprinkle AI in where it could reduce frustrations or improve/speed up successes, instead of making everything automated without solving a real problem or user need.",
        },
      ],
    },
  ],
};
