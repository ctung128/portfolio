"use client";

import { useImageStatus } from "@/lib/useImageStatus";

export function CaseStudyImage({
  src,
  alt,
  caption,
  label,
  wide,
  fill,
  objectPosition = "center",
  imageClassName,
  background,
  backgroundImageWidth = "85%",
  shadow,
}: {
  src: string;
  alt: string;
  caption?: string;
  /** Small eyebrow-style label overlaid at the top-left of the card
   * (matches the mockup/comparison-card label treatment), instead of a
   * caption below the image. */
  label?: string;
  wide?: boolean;
  fill?: boolean;
  objectPosition?: string;
  imageClassName?: string;
  /** Render the image as a foreground layer over a solid-color background
   * card (e.g. a hex value), with breathing-room padding. */
  background?: string;
  /** Width of the image within the `background` card (CSS value, e.g.
   * "50%"). Defaults to 85%; use a smaller value for a single
   * supplementary screenshot so it does not dominate the wide card. */
  backgroundImageWidth?: string;
  /** Apply a drop shadow that follows the image's own alpha silhouette
   * (works well for images with transparent backgrounds), matching the
   * device mockup shadow treatment. */
  shadow?: boolean;
}) {
  const status = useImageStatus(src);

  if (status !== "loaded") {
    return (
      <figure className={`${wide ? "-mx-4 sm:mx-0" : ""} ${fill ? "h-full w-full" : ""}`}>
        <div
          className={`flex flex-col items-center justify-center gap-2 rounded-[12px] border border-dashed border-border-strong bg-cream-subtle px-6 text-center ${
            fill ? "h-full w-full" : "aspect-video w-full"
          } ${status === "loading" ? "animate-pulse" : ""}`}
        >
          {status === "failed" && (
            <>
              <span className="font-sans text-xs uppercase tracking-wider text-ink-faint">
                Image placeholder
              </span>
              <span className="max-w-xs font-sans text-sm text-ink-soft">{alt}</span>
              <code className="mt-1 rounded bg-cream px-2 py-1 text-[11px] text-ink-faint">
                {src}
              </code>
            </>
          )}
        </div>
      </figure>
    );
  }

  if (background) {
    return (
      <figure>
        <div
          className="relative flex items-center justify-center rounded-[24px] border border-border py-16 sm:py-20"
          style={{ backgroundColor: background }}
        >
          {label && (
            <p className="absolute left-6 top-6 z-20 font-sans text-xs uppercase tracking-wider text-ink-faint sm:left-8 sm:top-8">
              {label}
            </p>
          )}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt}
            className={imageClassName}
            style={{
              width: backgroundImageWidth,
              filter: shadow ? "drop-shadow(0 20px 30px rgba(0,0,0,0.25))" : undefined,
            }}
          />
        </div>
        {caption && (
          <figcaption className="mt-3 font-sans text-sm text-ink-soft">{caption}</figcaption>
        )}
      </figure>
    );
  }

  return (
    <figure className={`${wide ? "-mx-4 sm:mx-0" : ""} ${fill ? "h-full w-full" : ""}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className={`rounded-[12px] border border-border object-cover ${
          fill ? "h-full w-full" : "w-full"
        } ${imageClassName ?? ""}`}
        style={{ objectPosition }}
      />
      {caption && (
        <figcaption className="mt-3 font-sans text-sm text-ink-soft">{caption}</figcaption>
      )}
    </figure>
  );
}
