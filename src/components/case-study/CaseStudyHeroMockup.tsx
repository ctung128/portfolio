import { IPhoneMockup } from "./IPhoneMockup";

export function CaseStudyHeroMockup({
  video,
  background,
  alt,
  className = "mb-20 rounded-[24px] border border-border py-16 sm:py-20",
  phoneSizeClassName,
  variant,
}: {
  video: string;
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
        alt={alt}
        className="z-10"
        sizeClassName={phoneSizeClassName}
        variant={variant}
      />
    </div>
  );
}
