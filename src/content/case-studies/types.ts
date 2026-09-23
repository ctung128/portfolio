export type CaseStudyBlock =
  | { type: "paragraph"; text: string }
  | { type: "subheading"; text: string }
  | { type: "quote"; text: string; attribution?: string }
  | { type: "stats"; items: { value: string; label: string }[] }
  | { type: "list"; items: string[]; ordered?: boolean }
  | { type: "image"; src: string; alt: string; caption?: string; wide?: boolean };

export type CaseStudySection = {
  id: string;
  navLabel: string;
  heading: string;
  blocks: CaseStudyBlock[];
};

export type CaseStudy = {
  slug: string;
  title: string;
  oneLiner: string;
  cardDescription: string;
  year: string;
  industry: string;
  role: string;
  team: string[];
  timeline: string;
  skills: string[];
  tags: string[];
  coverImage: { src: string; alt: string };
  coverVideo?: string;
  heroMockup?: {
    /** A looping video to fill the screen. Provide this or `frames`. */
    video?: string;
    /** A sequence of static screenshots to animate between. Provide this or
     * `video`. */
    frames?: string[];
    background: string;
    alt: string;
    variant?: "13-pro" | "15-pro";
  };
  /** Two-card case study hero: a static splash screenshot staggered up/left
   * behind an animated phone mockup staggered down/right. Used instead of
   * `heroMockup` on the case study page only (the homepage card keeps using
   * `heroMockup`). */
  duoHero?: {
    background: string;
    splash: { src: string; alt: string };
    video: string;
    alt: string;
    variant?: "13-pro" | "15-pro";
  };
  sections: CaseStudySection[];
};
