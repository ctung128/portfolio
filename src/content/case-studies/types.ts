export type CaseStudyBlock =
  | { type: "paragraph"; text: string }
  | { type: "subheading"; text: string }
  | { type: "quote"; text: string; attribution?: string }
  | { type: "stats"; items: { value: string; label: string }[] }
  | { type: "list"; items: string[]; ordered?: boolean }
  | {
      type: "image";
      src: string;
      alt: string;
      caption?: string;
      wide?: boolean;
      /** Render as a foreground layer over a solid-color background card. */
      background?: string;
      /** Width of the image within the `background` card. Defaults to 85%. */
      backgroundImageWidth?: string;
      /** Drop shadow following the image's own alpha silhouette. */
      shadow?: boolean;
    }
  | {
      type: "mockup";
      /** A looping video to fill the screen. Provide this or `frames`/`scrollImage`. */
      video?: string;
      /** A sequence of static screenshots to animate between. Provide this
       * or `video`/`scrollImage`. */
      frames?: string[];
      /** A single tall screenshot that pans down inside the screen mask and
       * back, looping. Provide this or `video`/`frames`. `endPercent` is the
       * translateY (relative to the image's own rendered height) needed to
       * reveal its bottom edge: -(1 - (19.5 * imgWidth) / (9 * imgHeight)) * 100. */
      scrollImage?: { src: string; alt: string; endPercent: number; durationMs?: number };
      background: string;
      alt: string;
      /** Small eyebrow-style label overlaid at the top of the card, above
       * the phone mockup. */
      label?: string;
      variant?: "13-pro" | "15-pro";
      /** Milliseconds each frame holds before transitioning. Only used with
       * `frames`. */
      frameHoldMs?: number;
      /** Milliseconds the crossfade itself takes. Only used with `frames`. */
      frameTransitionMs?: number;
      /** "scale" (default) crossfades with a subtle scale/drift settle.
       * "fade" is a plain opacity crossfade, cleaner between very
       * different screens. Only used with `frames`. */
      frameMotion?: "scale" | "fade";
    }
  | {
      /** A responsive grid of standalone images (e.g. App Store
       * screenshots) that already have their own device frame/styling
       * baked in — no additional mockup wrapper. */
      type: "gallery";
      images: { src: string; alt: string }[];
    }
  | {
      /** Side-by-side labeled groups of images, e.g. a competitive audit
       * comparing categories of apps. */
      type: "comparison";
      groups: {
        label: string;
        images: { src: string; alt: string }[];
        /** Short description shown below the images. */
        caption?: string;
      }[];
    };

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
