import { IPhoneMockup } from "./IPhoneMockup";

// splash-screen.png is 393x852, with its own rounded corners baked into the
// PNG's alpha channel (top and bottom). We render the full, uncropped image
// and shift it up so its own status bar/notch and the gap above the
// hamsters are pushed above the hero container's edge, which clips it (the
// same "cut off at the top" look as cover.png) — the bottom keeps its
// natural rounded corner since that part of the image is untouched.
const SPLASH_SHIFT_PCT = -35.2; // % of the image's own rendered height

export function CaseStudyDuoHero({
  background,
  splash,
  video,
  poster,
  alt,
  variant,
}: {
  background: string;
  splash: { src: string; alt: string };
  video: string;
  poster?: string;
  alt: string;
  variant?: "13-pro" | "15-pro";
}) {
  return (
    <div className="relative mb-20 aspect-[16/10] overflow-hidden rounded-[24px] border border-border">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={background}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Splash card: static, staggered up/left, cut off by this
          container's own edge (no separate crop box, so no gap/frame) */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={splash.src}
        alt={splash.alt}
        className="absolute left-[6%] top-0 z-10 w-[40%]"
        style={{
          transform: `translateY(${SPLASH_SHIFT_PCT}%)`,
          filter: "drop-shadow(0 20px 30px rgba(0,0,0,0.3))",
        }}
      />

      {/* Animated mockup: staggered down/right, spills past the bottom edge */}
      <IPhoneMockup
        videoSrc={video}
        poster={poster}
        alt={alt}
        variant={variant}
        position="absolute"
        className="right-[6%] top-[16%] z-20"
        sizeClassName="w-[38%]"
      />
    </div>
  );
}
