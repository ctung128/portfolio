"use client";

import { useImageStatus } from "@/lib/useImageStatus";

function CarouselSlide({ src, alt }: { src: string; alt: string }) {
  const status = useImageStatus(src);

  return (
    <div className="relative h-[220px] w-[240px] flex-shrink-0 sm:h-[320px] sm:w-[300px]">
      {status === "loaded" ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt} className="h-full w-full object-cover" />
      ) : (
        <div
          className={`flex h-full w-full flex-col items-center justify-center gap-1.5 border border-dashed border-border-strong bg-cream-subtle px-4 text-center ${
            status === "loading" ? "animate-pulse" : ""
          }`}
        >
          {status === "failed" && (
            <>
              <span className="font-sans text-[10px] uppercase tracking-wider text-ink-faint">
                Photo placeholder
              </span>
              <span className="font-sans text-xs text-ink-soft">{alt}</span>
              <code className="text-[10px] text-ink-faint">{src}</code>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export function PersonalCarousel({
  photos,
}: {
  photos: { src: string; alt: string }[];
}) {
  const loop = [...photos, ...photos];

  return (
    <div className="group relative mt-12 overflow-hidden rounded-[12px]">
      <div className="flex w-max animate-marquee gap-[10px] group-hover:[animation-play-state:paused] motion-reduce:animate-none">
        {loop.map((photo, i) => (
          <CarouselSlide key={`${photo.src}-${i}`} src={photo.src} alt={photo.alt} />
        ))}
      </div>
    </div>
  );
}
