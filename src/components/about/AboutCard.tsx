"use client";

import { useEffect, useRef } from "react";

/**
 * An About card: matcha paper pinned at a slight `tilt` under a strip of
 * washi tape. It drops in tilted the first time it scrolls into view and
 * springs to rest; on hover it straightens, lifts and the tape flips. Styles
 * are `.about-reveal` / `.about-card` / `.about-tape` in globals.css. The
 * reveal and the hover live on separate elements so they never fight.
 */
export function AboutCard({
  tilt,
  index = 0,
  children,
}: {
  tilt: number;
  index?: number;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const mounted = performance.now();
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        // On screen at load: land after the portrait/bio intro (globals.css).
        if (performance.now() - mounted < 600) el.style.transitionDelay = `${450 + index * 90}ms`;
        el.setAttribute("data-in", "");
        io.disconnect();
      },
      // Reveal as soon as any of the card is on screen (60px covers its
      // pre-reveal drop), so a card showing above the fold appears at load.
      { rootMargin: "0px 0px 60px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [index]);

  return (
    <div
      ref={ref}
      className="about-reveal"
      style={{ "--i": index, "--from-tilt": `${tilt * 4.5}deg` } as React.CSSProperties}
    >
      <div
        className="about-card h-full p-6 sm:p-8"
        style={{ "--tilt": `${tilt}deg`, "--tape-tilt": `${tilt >= 0 ? -3 : 3}deg` } as React.CSSProperties}
      >
        <span aria-hidden className="about-tape" />
        {children}
      </div>
    </div>
  );
}
