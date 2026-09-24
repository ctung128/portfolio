import type { CaseStudy } from "./types";

export const splitev: CaseStudy = {
  slug: "splitev",
  title: "A two-sided EV charging marketplace",
  oneLiner: "Redesigning onboarding, booking, dashboards, and vehicle management",
  cardDescription:
    "A Techstars-backed EV charging startup's five most critical flows, rebuilt from fragmented prototype into a launch-ready MVP.",
  year: "Shipped 2026",
  industry: "SplitEV — Climate Tech",
  role: "UX Designer",
  team: [
    "1 Founder",
    "1 UX Designer",
    "1 Fractional UX Manager",
    "1 UX Researcher",
    "4 Engineers",
  ],
  timeline: "Dec 2024 — Jan 2026",
  skills: ["UI Design", "Prototyping", "Rapid Testing (RITE)", "Product Strategy", "Handoff"],
  tags: ["Climate Tech", "MVP", "Techstars"],
  coverImage: {
    src: "/case-studies/splitev/cover.webp",
    alt: "SplitEV app redesign cover image",
  },
  heroMockup: {
    frames: [
      "/case-studies/splitev/frame-1.webp",
      "/case-studies/splitev/frame-2.webp",
      "/case-studies/splitev/frame-3.webp",
      "/case-studies/splitev/frame-4.webp",
    ],
    background: "/case-studies/splitev/cover-bg.webp",
    alt: "SplitEV app demo playing inside an iPhone mockup",
    variant: "13-pro",
  },
  sections: [
    {
      id: "context",
      navLabel: "Context",
      heading: "Introducing SplitEV",
      blocks: [
        {
          type: "paragraph",
          text: "SplitEV is a Techstars-backed startup making EV charging accessible by letting hosts generate income from private chargers and letting drivers book safe, reliable, and nearby chargers. I joined as a fractional design partner to build the MVP from scratch.",
        },
      ],
    },
    {
      id: "problem",
      navLabel: "Problem",
      heading: "Friction everywhere",
      blocks: [
        {
          type: "paragraph",
          text: "Early flows were incomplete and full of friction. Drivers couldn't reliably book chargers, hosts couldn't understand earnings or charger status, key user flows were broken or circular, and onboarding took too long. This led to users dropping before they found value.",
        },
        {
          type: "quote",
          text: "There's a lot of info here so it'll take a while for me to make a decision.",
        },
        {
          type: "quote",
          text: "Is the charger fit for my Tesla?",
        },
        {
          type: "quote",
          text: "I'd like a validation process for a host and driver, like Airbnb or Uber.",
        },
        {
          type: "subheading",
          text: "Before the redesign",
        },
        {
          type: "mockup",
          frames: [
            "/case-studies/splitev/before-1.webp",
            "/case-studies/splitev/before-2.png",
            "/case-studies/splitev/before-3.webp",
            "/case-studies/splitev/before-4.webp",
          ],
          background: "#EFF9EF",
          alt: "The original SplitEV prototype, cycling through four screens inside an iPhone mockup",
          variant: "13-pro",
        },
      ],
    },
    {
      id: "strategy",
      navLabel: "Strategy",
      heading: "Our approach",
      blocks: [
        {
          type: "paragraph",
          text: "Our goal was to unify the product into a coherent system that real users could test and that engineering could actually build. We used Rapid Iterative Testing and Evaluation (RITE) to uncover friction early, iterate fast, and validate improvements.",
        },
        {
          type: "paragraph",
          text: "Over 12 months, through dozens of iterations, we rebuilt SplitEV's core experience into a launch-ready MVP across five critical flows: Host/Driver Onboarding, Booking & Navigation, Host Dashboard, Driver Dashboard, and Vehicle Management.",
        },
      ],
    },
    {
      id: "solution",
      navLabel: "Solution",
      blocks: [
        {
          type: "subheading",
          text: "Reducing onboarding friction to boost conversion",
          style: "heading",
        },
        {
          type: "paragraph",
          text: "Onboarding was 200% longer than the industry average and was predicted to lead to high drop-off rates. With a UX manager, we reduced onboarding friction by nearly 60%.",
        },
        {
          type: "stats",
          items: [
            { value: "-58%", label: "onboarding friction" },
            { value: "24 → 10", label: "screens" },
            { value: "119 → 53", label: "form elements" },
          ],
        },
        {
          type: "image",
          src: "/case-studies/splitev/driver-journey.webp",
          alt: "Driver onboarding journey, current vs. new: the redesign cuts account creation, subscription, and vehicle setup into one shorter flow",
        },
        {
          type: "image",
          src: "/case-studies/splitev/host-journey.webp",
          alt: "Host onboarding journey, current vs. new",
          caption: "Onboarding before and after for drivers and hosts",
        },
        {
          type: "paragraph",
          text: "Progressive disclosure reduced cognitive overload and decreased time on task. Completion rates increased meaningfully, and users consistently reached activation on the first attempt.",
        },
        {
          type: "subheading",
          text: "Booking & navigation",
          style: "heading",
          spaced: true,
        },
        {
          type: "paragraph",
          text: "This user flow was incomplete and failed to surface key information needed to select a fitting station. By reducing friction in the Driver flow, we reinforced the high-retention charging loop that drives SplitEV's subscription revenue.",
        },
        {
          type: "image",
          src: "/case-studies/splitev/booking.webp",
          alt: "Booking user flows",
          caption: "Map, station list & station details",
        },
        {
          type: "subheading",
          text: "Driver dashboard",
          style: "heading",
          spaced: true,
        },
        {
          type: "paragraph",
          text: "Drivers had no way to understand their charging behavior, plan usage, or savings. This led to uncertainty about the value of their subscription.",
        },
        {
          type: "quote",
          text: "I don't know if this is a good deal or not.",
        },
        {
          type: "quote",
          text: "I need to compare pricing online.",
        },
        {
          type: "image",
          src: "/case-studies/splitev/driver-dashboard.webp",
          alt: "Redesigned SplitEV driver dashboard",
        },
        {
          type: "paragraph",
          text: "By giving Drivers a transparent, data-rich dashboard, we turned SplitEV's subscription model into a visible value loop that keeps Drivers charging.",
        },
        {
          type: "subheading",
          text: "Vehicle management",
          style: "heading",
          spaced: true,
        },
        {
          type: "paragraph",
          text: "The original system mixed plan details, subscription details, and vehicle details into one confusing flow. Core actions like adding a vehicle, starting a charge, or checking health indicators were buried in decorative UI.",
        },
        {
          type: "quote",
          text: "I don't know what's included in my plan.",
        },
        {
          type: "quote",
          text: "This looks cool, but I don't know what to do from here.",
        },
        {
          type: "paragraph",
          text: "By simplifying the vehicle experience and clarifying plan logic, we turned a busy, decorative interface into a reliable control center Drivers can use with confidence.",
        },
        {
          type: "image",
          src: "/case-studies/splitev/vehicle-management.webp",
          alt: "Redesigned SplitEV vehicle management",
        },
        {
          type: "subheading",
          text: "Host dashboard",
          style: "heading",
          spaced: true,
        },
        {
          type: "paragraph",
          text: "Hosts had no way to see earnings, manage bookings, track station performance, or handle payouts. RITE testing showed confusion, distrust, and failed to meet user expectations.",
        },
        {
          type: "quote",
          text: "An Airbnb would have all the answers here.",
        },
        {
          type: "image",
          src: "/case-studies/splitev/host-1.webp",
          alt: "Redesigned SplitEV host dashboard",
          caption: "At-a-glance host analytics",
        },
        {
          type: "image",
          src: "/case-studies/splitev/host-2.webp",
          alt: "Redesigned SplitEV host dashboard, second view",
          caption: "Managing driver bookings",
        },
        {
          type: "paragraph",
          text: "By transforming fragmented host tools into a unified, insight-driven dashboard, we gave hosts the operational clarity and financial confidence needed to successfully run their chargers on SplitEV.",
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
          text: "Since we didn't have a product manager to think about long-term vision and scalability, it was important that I prioritize tasks for sprints rather than mindlessly accepting Phase 2+ backlog requests. I needed to think in terms of systems to envision how retrofitting new features would interact with the current infrastructure and cascade down, in order to save time and development costs. This way, I was able to shape the direction of the MVP so that we would have a successful and sustainable launch.",
        },
      ],
    },
  ],
};
