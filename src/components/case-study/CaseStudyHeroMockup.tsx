import { IPhoneMockup } from "./IPhoneMockup";

export function CaseStudyHeroMockup({
  video,
  frames,
  scrollImage,
  background,
  alt,
  label,
  poster,
  className = "mb-20 rounded-[24px] border border-border py-20 sm:py-24",
  phoneSizeClassName,
  variant,
  frameHoldMs,
  frameTransitionMs,
  frameMotion,
}: {
  /** A looping video to fill the screen. Provide this or `frames`/`scrollImage`. */
  video?: string;
  /** A sequence of static screenshots to animate between. Provide this or
   * `video`/`scrollImage`. */
  frames?: string[];
  /** A single tall screenshot that pans down inside the screen mask and
   * back, looping. Provide this or `video`/`frames`. */
  scrollImage?: { src: string; alt: string; endPercent: number; durationMs?: number };
  background: string;
  alt: string;
  /** Small eyebrow-style label overlaid at the top of the card, above the
   * phone (matches the comparison-card label treatment). */
  label?: string;
  /** Still frame shown in the phone until the video starts playing. */
  poster?: string;
  className?: string;
  phoneSizeClassName?: string;
  variant?: "13-pro" | "15-pro";
  frameHoldMs?: number;
  frameTransitionMs?: number;
  frameMotion?: "scale" | "fade";
}) {
  return (
    <div className={`relative flex items-center justify-center overflow-hidden ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        loading="lazy"
        decoding="async"
        src={background}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover"
      />
      {label && (
        <p className="absolute left-6 top-6 z-20 font-sans text-xs uppercase tracking-wider text-ink-faint sm:left-8 sm:top-8">
          {label}
        </p>
      )}
      <IPhoneMockup
        videoSrc={video}
        poster={poster}
        frames={frames}
        scrollImage={scrollImage}
        alt={alt}
        className="z-10"
        sizeClassName={phoneSizeClassName}
        variant={variant}
        frameHoldMs={frameHoldMs}
        frameTransitionMs={frameTransitionMs}
        frameMotion={frameMotion}
      />
    </div>
  );
}
