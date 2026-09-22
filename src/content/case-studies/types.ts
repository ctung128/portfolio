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
  sections: CaseStudySection[];
};
