"use client";

import { useEffect, useRef } from "react";

/**
 * Selected work entry that drops in tilted (`tilt` degrees) the first time it
 * scrolls into view and springs to rest, like the Play tiles and Library
 * covers. Styles are `.work-reveal` in globals.css.
 */
export function WorkReveal({
  tilt,
  className,
  children,
}: {
  tilt: number;
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.setAttribute("data-in", "");
        io.disconnect();
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`work-reveal ${className ?? ""}`}
      style={{ "--from-tilt": `${tilt}deg` } as React.CSSProperties}
    >
      {children}
    </div>
  );
}
