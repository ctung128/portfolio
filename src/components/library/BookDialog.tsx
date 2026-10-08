"use client";

import { useEffect, useRef, type ReactNode } from "react";

type Props = {
  label: string;
  position: number;
  count: number;
  onClose: () => void;
  onStep: (delta: number) => void;
  /** Backdrop colour/texture; each direction brings its own. */
  backdropClassName: string;
  /** Classes for the round controls (close, prev/next, counter). */
  controlClassName?: string;
  children: ReactNode;
};

/** Full-screen layer the blown-up card sits in: Esc closes, ←/→ step,
 * clicking the backdrop closes, page scroll is locked while open. */
export function BookDialog({
  label,
  position,
  count,
  onClose,
  onStep,
  backdropClassName,
  controlClassName = "bg-white/90 text-ink shadow-sm hover:bg-white",
  children,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") onStep(1);
      else if (e.key === "ArrowLeft") onStep(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, onStep]);

  useEffect(() => {
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    ref.current?.focus({ preventScroll: true });
    return () => {
      document.body.style.overflow = overflow;
    };
  }, []);

  const control = `grid size-10 place-items-center rounded-full font-sans text-sm transition-colors ${controlClassName}`;

  return (
    <div
      ref={ref}
      role="dialog"
      aria-modal="true"
      aria-label={label}
      tabIndex={-1}
      className={`fixed inset-0 z-50 overflow-y-auto outline-none ${backdropClassName}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="flex min-h-full items-center justify-center px-4 py-20 sm:px-20"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        {children}
      </div>

      <div className="pointer-events-none fixed inset-x-0 top-0 flex items-center justify-between p-4 sm:p-6">
        <span className={`pointer-events-auto w-auto px-3 tabular-nums ${control}`} aria-live="polite">
          {position}/{count}
        </span>
        <button type="button" onClick={onClose} className={`pointer-events-auto ${control}`} aria-label="Close">
          ✕
        </button>
      </div>
      <button
        type="button"
        onClick={() => onStep(-1)}
        className={`fixed bottom-4 left-4 sm:bottom-auto sm:left-6 sm:top-1/2 sm:-translate-y-1/2 ${control}`}
        aria-label="Previous book"
      >
        ←
      </button>
      <button
        type="button"
        onClick={() => onStep(1)}
        className={`fixed bottom-4 right-4 sm:bottom-auto sm:right-6 sm:top-1/2 sm:-translate-y-1/2 ${control}`}
        aria-label="Next book"
      >
        →
      </button>
    </div>
  );
}
