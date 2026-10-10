"use client";

import { useEffect, useRef } from "react";

/**
 * Selected work entry that fades up the first time it scrolls into view, like
 * the Play tiles. Styles are `.work-reveal` in globals.css.
 */
export function WorkReveal({
  className,
  children,
}: {
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
    >
      {children}
    </div>
  );
}
