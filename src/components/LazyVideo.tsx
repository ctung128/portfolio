"use client";

import { useEffect, useRef, type ComponentProps } from "react";

/** A muted, looping video that only downloads and plays while it's on (or
 * near) screen, and pauses when scrolled away. Stands in for
 * `<video autoPlay muted loop playsInline>`, which downloads every video on
 * the page up front. */
export function LazyVideo({
  videoRef,
  ...props
}: Omit<ComponentProps<"video">, "autoPlay" | "preload" | "ref"> & {
  /** Called with the element once mounted, e.g. to set playbackRate. */
  videoRef?: (video: HTMLVideoElement | null) => void;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {
            // Autoplay can be refused (e.g. low-power mode); the poster stays up.
          });
        } else {
          video.pause();
        }
      },
      { rootMargin: "600px 0px" },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      {...props}
      ref={(el) => {
        ref.current = el;
        videoRef?.(el);
      }}
      muted
      loop
      playsInline
      preload="none"
    />
  );
}
