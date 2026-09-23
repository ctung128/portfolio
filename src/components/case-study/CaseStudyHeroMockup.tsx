import { IPhoneMockup } from "./IPhoneMockup";

export function CaseStudyHeroMockup({
  video,
  frames,
  background,
  alt,
  className = "mb-20 rounded-[24px] border border-border py-20 sm:py-24",
  phoneSizeClassName,
  variant,
}: {
  /** A looping video to fill the screen. Provide this or `frames`. */
  video?: string;
  /** A sequence of static screenshots to animate between. Provide this or
   * `video`. */
  frames?: string[];
  background: string;
  alt: string;
  className?: string;
  phoneSizeClassName?: string;
  variant?: "13-pro" | "15-pro";
}) {
  return (
    <div className={`relative flex items-center justify-center overflow-hidden ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={background}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover"
      />
      <IPhoneMockup
        videoSrc={video}
        frames={frames}
        alt={alt}
        className="z-10"
        sizeClassName={phoneSizeClassName}
        variant={variant}
      />
    </div>
  );
}
