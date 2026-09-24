export type CaseStudyBlock =
  | {
      type: "paragraph";
      text: string;
      /** Turns the first occurrence of `text` inside the paragraph into an
       * external link. */
      link?: { text: string; href: string };
    }
  | {
      type: "subheading";
      text: string;
      /** "eyebrow" (default) is the bolder, dark uppercase tracked-out
       * label used for interstitial labels like "Key insights". "label" is
       * the fainter, lighter-weight treatment that matches the top-level
       * section eyebrow and the mockup/comparison-card labels — use it
       * when this subheading is meant to read as its own mini section
       * marker. "heading" matches the section h2 exactly (same font-serif
       * family and size) and is used to break a section into named
       * subsections that read as equally weighted headers. */
      style?: "eyebrow" | "label" | "heading";
      /** Add extra top margin to separate this subsection from the one
       * before it, beyond the standard block-to-block spacing. */
      spaced?: boolean;
      /** Small faint uppercase label above the subheading text, e.g.
       * "Iteration 2" over a descriptive "heading"-style title. */
      kicker?: string;
      /** Status chip after the text, marking a decision outcome: an
       * outlined "Rejected" chip or a filled "Shipped" chip. */
      status?: "rejected" | "shipped";
    }
  | { type: "quote"; text: string; attribution?: string }
  | {
      /** A labeled, non-italic statement (e.g. a problem statement or a
       * "How might we" question) with the label above as an eyebrow. */
      type: "callout";
      label: string;
      text: string;
    }
  | { type: "stats"; items: { value: string; label: string }[] }
  | {
      /** Labeled facts in the same format as the header's Role / Timeline /
       * Team row. An array value stacks one entry per line, like Team. */
      type: "details";
      items: { label: string; value: string | string[] }[];
    }
  | {
      type: "list";
      items: string[];
      ordered?: boolean;
      /** "arrow" replaces the bullets of an unordered list with → markers. */
      marker?: "arrow";
    }
  | {
      /** A list of labeled research insights, each pairing a short
       * category tag with an arrow-led quote and a supporting body
       * description (e.g. synthesized user-interview findings). When
       * `quote` is omitted, the body follows the arrow at paragraph size. */
      type: "insights";
      items: { label: string; quote?: string; body: string }[];
    }
  | {
      type: "image";
      src: string;
      alt: string;
      caption?: string;
      /** Small eyebrow-style label overlaid at the top-left of the card
       * (matches the mockup/comparison-card label treatment), instead of a
       * caption below the image. */
      label?: string;
      wide?: boolean;
      /** Render as a foreground layer over a solid-color background card. */
      background?: string;
      /** Width of the image within the `background` card. Defaults to 85%. */
      backgroundImageWidth?: string;
      /** Drop shadow following the image's own alpha silhouette. */
      shadow?: boolean;
      /** How the image sits inside its `background` card: "browser" wraps it
       * in a minimal browser window (for full-page screens), "float" gives it
       * rounded corners and a soft shadow (for cropped UI components). */
      frame?: "browser" | "float";
    }
  | {
      /** A looping, autoplaying video styled like a standard image card. */
      type: "video";
      src: string;
      alt: string;
      caption?: string;
    }
  | {
      /** Two same-sized screenshots that loop, crossfading between them. */
      type: "crossfade";
      images: [{ src: string; alt: string }, { src: string; alt: string }];
      /** Seconds each image holds before fading to the other. Defaults to 3. */
      holdSeconds?: number;
      /** Show both screenshots in a browser window on a solid-color
       * background card, like an image block with `frame: "browser"`. */
      background?: string;
      /** Width of the browser window within the `background` card.
       * Defaults to 88%. */
      backgroundImageWidth?: string;
    }
  | {
      type: "mockup";
      /** A looping video to fill the screen. Provide this or `frames`/`scrollImage`. */
      video?: string;
      /** A sequence of static screenshots to animate between. Provide this
       * or `video`/`scrollImage`. */
      frames?: string[];
      /** A single tall screenshot that pans down inside the screen mask and
       * back, looping. Provide this or `video`/`frames`/`scrollFrames`. */
      scrollImage?: { src: string; alt: string; durationMs?: number };
      /** Full-length screenshots that each hold at the top, scroll to their
       * bottom, then crossfade to the next, looping. `pinTop`/`pinBottom`
       * (source pixels) keep a status bar and tab bar fixed. */
      scrollFrames?: {
        frames: string[];
        pinTop?: number;
        pinBottom?: number;
        holdMs?: number;
        scrollMs?: number;
      };
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
      images: {
        src: string;
        alt: string;
        /** Width ÷ height of the image. When every image in the gallery has
         * one, they're laid out in a single row at equal heights, each
         * column sized to its image's proportions (no cropping). */
        aspect?: number;
      }[];
      /** Force a fixed 2-column layout at every breakpoint (e.g. a pair of
       * side-by-side persona cards), instead of the default responsive
       * 2→3 column grid. */
      columns?: 2;
    }
  | {
      /** Phone mockups side by side (e.g. a before/after pair), each on its
       * own background card with a label above it. Each screen is either a
       * static screenshot (`frames` with one entry), a crossfading sequence
       * (`frames`), or scroll-then-navigate screenshots (`scrollFrames`).
       * A → arrow sits between consecutive cards. */
      type: "mockupRow";
      background: string;
      variant?: "13-pro" | "15-pro";
      items: {
        label: string;
        alt: string;
        /** Overrides the row's `background` for this card, e.g. a quieter
         * "Before" so the "After" stands out. */
        background?: string;
        frames?: string[];
        scrollFrames?: {
          frames: string[];
          pinTop?: number;
          pinBottom?: number;
          holdMs?: number;
          scrollMs?: number;
        };
      }[];
    }
  | {
      /** Stacked two-column rows: a looping phone-mockup video on the left
       * and a serif title with a short description on the right (stacks
       * on mobile). For walking through a set of parallel options. */
      type: "featureRows";
      /** Shared background image behind every row's phone mockup. */
      background: string;
      variant?: "13-pro" | "15-pro";
      items: {
        video: string;
        /** First frame of the video, shown until it starts playing. */
        poster?: string;
        alt: string;
        title: string;
        body: string;
      }[];
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
        /** Decision-outcome chip shown next to the label. */
        status?: "rejected" | "shipped";
      }[];
      /** Center each group's images and give them rounded corners and a soft
       * shadow, instead of the default 2-column grid. */
      float?: boolean;
      /** Background color for each group's card, in place of the default
       * off-white. */
      background?: string;
    };

export type CaseStudySection = {
  id: string;
  /** Name shown in the table of contents. Also used as the on-page eyebrow
   * label above `heading`, unless `eyebrow` overrides it. */
  navLabel: string;
  /** On-page eyebrow label above `heading`, if it should read differently
   * from the TOC name (e.g. a section folding a second topic's content
   * in under one TOC entry, where the merged content should visibly lead
   * with its own label). Defaults to `navLabel`. */
  eyebrow?: string;
  /** Omit to show just the eyebrow, e.g. when the section's first block
   * is already a heading. */
  heading?: string;
  /** Hide the on-page eyebrow and heading (kept for screen readers and the
   * TOC), e.g. when the first block already introduces the section. */
  hideHeader?: boolean;
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
  /** Small translucent status chip shown next to the one-liner in the
   * header, e.g. "Currently in beta!". */
  badge?: string;
  /** Link to the live product, shown as a "See it live ↗" button next to
   * the one-liner in the header. */
  liveUrl?: string;
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
