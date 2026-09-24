"use client";

import { useCallback, useState } from "react";

/** Tracks whether a rendered `<img>` failed to load, without preloading it
 * (so `loading="lazy"` still defers the download). Spread `imgProps` onto
 * the `<img>`; the ref catches errors that fired before hydration. */
export function useImgFailed() {
  const [failed, setFailed] = useState(false);
  const ref = useCallback((img: HTMLImageElement | null) => {
    if (img?.complete && img.naturalWidth === 0) setFailed(true);
  }, []);
  const onError = useCallback(() => setFailed(true), []);
  return { failed, imgProps: { ref, onError, loading: "lazy", decoding: "async" } as const };
}
