"use client";

import { useEffect, useRef, type RefObject } from "react";
import { HEADER_HEIGHT } from "@/components/layout/Header";

export const HEADER_PX = parseInt(HEADER_HEIGHT, 10);

export const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
/** Where `p` sits inside [a, b], as 0…1. */
export const seg = (p: number, a: number, b: number) => clamp((p - a) / (b - a));
export const easeIn = (t: number) => t * t * t;

/**
 * Pinned scroll scene: `track` is a tall block holding a sticky `stage`
 * (top = header height). Calls `render(p)` every frame while p is moving,
 * with p = 0 when the stage pins and 1 when it releases. With `ease` (0–1),
 * p glides toward the scroll position instead of stepping with each wheel
 * notch; smaller is softer. `measure` runs on mount and resize.
 */
export function useScrollScene(
  track: RefObject<HTMLElement | null>,
  stage: RefObject<HTMLElement | null>,
  render: (p: number) => void,
  measure?: () => void,
  ease = 1,
) {
  const renderRef = useRef(render);
  const measureRef = useRef(measure);
  useEffect(() => {
    renderRef.current = render;
    measureRef.current = measure;
  });

  useEffect(() => {
    let raf = 0;
    let shown = -1;
    const target = () => {
      const t = track.current;
      const s = stage.current;
      if (!t || !s) return 0;
      const dist = t.offsetHeight - s.offsetHeight;
      return dist > 0 ? clamp((HEADER_PX - t.getBoundingClientRect().top) / dist) : 0;
    };
    const tick = () => {
      raf = 0;
      const goal = target();
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const next = shown < 0 || reduce ? goal : shown + (goal - shown) * ease;
      shown = Math.abs(goal - next) < 0.0004 ? goal : next;
      renderRef.current(shown);
      if (shown !== goal) raf = requestAnimationFrame(tick);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const onResize = () => {
      measureRef.current?.();
      onScroll();
    };
    onResize();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [track, stage, ease]);
}
