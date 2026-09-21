"use client";

import { useImageStatus } from "@/lib/useImageStatus";

export function Portrait({ src, alt }: { src: string; alt: string }) {
  const status = useImageStatus(src);

  if (status !== "loaded") {
    return (
      <div
        title={`Add a portrait at ${src}`}
        className={`h-16 w-16 flex-shrink-0 rounded-full border border-dashed border-border-strong bg-cream sm:h-20 sm:w-20 ${
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
      className="h-16 w-16 flex-shrink-0 rounded-full border border-border object-cover sm:h-20 sm:w-20"
    />
  );
}
