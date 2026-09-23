"use client";

import { useImageStatus } from "@/lib/useImageStatus";

export function Portrait({ src, alt }: { src: string; alt: string }) {
  const status = useImageStatus(src);

  if (status !== "loaded") {
    return (
      <div
        title={`Add a portrait at ${src}`}
        className={`aspect-[4/3] w-full max-w-[260px] rounded-[12px] border border-dashed border-border-strong bg-cream sm:max-w-none ${
          status === "loading" ? "animate-pulse" : ""
        }`}
      />
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className="h-auto w-full max-w-[260px] rounded-[12px] border border-border object-contain sm:max-w-none"
    />
  );
}
