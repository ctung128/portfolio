"use client";

import { useEffect, useState } from "react";

export type ImageStatus = "loading" | "loaded" | "failed";

export function useImageStatus(src: string): ImageStatus {
  const [status, setStatus] = useState<ImageStatus>("loading");

  useEffect(() => {
    let cancelled = false;
    const img = new window.Image();
    img.onload = () => {
      if (!cancelled) setStatus("loaded");
    };
    img.onerror = () => {
      if (!cancelled) setStatus("failed");
    };
    img.src = src;
    return () => {
      cancelled = true;
    };
  }, [src]);

  return status;
}
