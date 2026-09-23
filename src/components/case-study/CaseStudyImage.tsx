"use client";

import { useImageStatus } from "@/lib/useImageStatus";

export function CaseStudyImage({
  src,
  alt,
  caption,
  wide,
  fill,
  objectPosition = "center",
  imageClassName,
}: {
  src: string;
  alt: string;
  caption?: string;
  wide?: boolean;
  fill?: boolean;
  objectPosition?: string;
  imageClassName?: string;
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
