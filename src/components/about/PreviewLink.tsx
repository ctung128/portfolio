"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ARROW_NE } from "@/lib/glyphs";

const WIDTH = 280;
/** Screenshot 16:10 inside a 6px print border, plus the caption row. */
const HEIGHT = Math.round((WIDTH - 12) * (10 / 16)) + 12 + 22;
const GAP = 12;
const EDGE = 16;
/** Keep the card clear of the sticky header. */
const TOP_LIMIT = 72;

function hostOf(href: string) {
  return new URL(href).hostname.replace(/^www\./, "");
}

/**
 * An inline bio link (the shared `link-underline` style) that, on hover or
 * keyboard focus, floats a tilted print of the linked site above itself,
 * like the Sidequesting prints. The print is a screenshot (most sites refuse
 * to be framed); it's fixed-positioned in a portal so the paragraph never
 * reflows, flips below the link near the top of the screen, and stays inside
 * the viewport. Touch devices skip it: a tap just follows the link.
 */
export function PreviewLink({
  href,
  preview,
  tilt = -2,
  children,
}: {
  href: string;
  preview?: string;
  /** Resting rotation of the print, in degrees. */
  tilt?: number;
  children: React.ReactNode;
}) {
  const link = useRef<HTMLAnchorElement>(null);
  const [armed, setArmed] = useState(false); // mount the card on first use only
  const [shown, setShown] = useState(false);
  const [pos, setPos] = useState({ left: 0, top: 0, below: false });

  const show = useCallback(() => {
    const el = link.current;
    if (!el || !preview) return;
    // A link that wraps has one rect per line; anchor to the first.
    const r = el.getClientRects()[0] ?? el.getBoundingClientRect();
    const below = r.top - GAP - HEIGHT < TOP_LIMIT;
    const left = Math.min(
      Math.max(r.left + r.width / 2 - WIDTH / 2, EDGE),
      window.innerWidth - WIDTH - EDGE,
    );
    setPos({ left, top: below ? r.bottom + GAP : r.top - GAP - HEIGHT, below });
    setArmed(true);
    setShown(true);
  }, [preview]);

  const hide = useCallback(() => setShown(false), []);

  // Fixed positioning goes stale once the page moves, so just put it away.
  useEffect(() => {
    if (!shown) return;
    window.addEventListener("scroll", hide, { passive: true });
    window.addEventListener("resize", hide);
    return () => {
      window.removeEventListener("scroll", hide);
      window.removeEventListener("resize", hide);
    };
  }, [shown, hide]);

  return (
    <>
      <a
        ref={link}
        href={href}
        target="_blank"
        rel="noreferrer"
        className="link-underline"
        onPointerEnter={(e) => e.pointerType === "mouse" && show()}
        onPointerLeave={hide}
        onFocus={(e) => e.currentTarget.matches(":focus-visible") && show()}
        onBlur={hide}
      >
        {children}
      </a>
      {armed &&
        preview &&
        createPortal(
          <div
            aria-hidden
            className="pointer-events-none fixed z-50 rounded-[6px] border border-border bg-white p-1.5 shadow-[0_1px_2px_rgba(37,37,37,0.06),0_14px_36px_-14px_rgba(37,37,37,0.32)] motion-reduce:!transition-none"
            style={{
              left: pos.left,
              top: pos.top,
              width: WIDTH,
              opacity: shown ? 1 : 0,
              visibility: shown ? "visible" : "hidden",
              transformOrigin: pos.below ? "50% 0" : "50% 100%",
              transform: shown
                ? `translateY(0) rotate(${tilt}deg) scale(1)`
                : `translateY(${pos.below ? -6 : 6}px) rotate(0deg) scale(0.96)`,
              transition: `opacity 200ms, visibility 200ms, transform 320ms cubic-bezier(0.22, 0.8, 0.3, 1)`,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={preview}
              alt=""
              decoding="async"
              className="block aspect-[16/10] w-full rounded-[3px] object-cover object-top"
            />
            <p className="flex h-[22px] items-end justify-between px-0.5 font-sans text-[11px] leading-none text-ink-faint">
              <span>{hostOf(href)}</span>
              <span>{ARROW_NE}</span>
            </p>
          </div>,
          document.body,
        )}
    </>
  );
}
