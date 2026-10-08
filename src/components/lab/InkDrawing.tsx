"use client";

import { useId, type CSSProperties } from "react";
import type { CloudArt } from "./cloudArt";
import "./lab.css";

const FADES = {
  top: "linear-gradient(to top, #000 85%, transparent)",
  right: "linear-gradient(to right, #000 85%, transparent)",
  bottom: "linear-gradient(to bottom, #000 88%, transparent)",
  left: "linear-gradient(to left, #000 85%, transparent)",
};

/**
 * Traced line art that draws itself on: the exact ink shapes, revealed through
 * a mask of centrelines whose dashes animate open, with a soft ink wash under
 * each line and a paper fill that wipe in behind the brush. A brush
 * front sweeps left to right (`sweep` seconds); each stroke takes time in
 * proportion to its length. The drawing plays while an ancestor (or this
 * element) has `data-play`; removing it resets the drawing. Edges where the
 * crop cut through lines fade out.
 */
export function InkDrawing({
  art,
  sweep = 1.2,
  speed = 600,
  paper = true,
  mist,
  className,
  style,
}: {
  art: CloudArt;
  /** Seconds for the brush front to cross the drawing. */
  sweep?: number;
  /** Drawing speed along a stroke, crop px per second. */
  speed?: number;
  /** Paint the paper fill under the cloud. */
  paper?: boolean;
  /** Fade the paper out toward the cloud's base, from this fraction of its height. */
  mist?: number;
  className?: string;
  style?: CSSProperties;
}) {
  const id = `ink-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const mask = art.fade.map((e) => FADES[e]).join(", ");
  const timing = (s: CloudArt["strokes"][number]) => ({
    animationDelay: `${(s.x / art.w) * sweep}s`,
    animationDuration: `${Math.min(0.7, Math.max(0.12, s.len / speed))}s`,
  });
  return (
    <svg
      viewBox={`0 0 ${art.w} ${art.h}`}
      className={className}
      aria-hidden
      style={{
        ...style,
        ...(mask && {
          maskImage: mask,
          WebkitMaskImage: mask,
          maskComposite: "intersect",
          WebkitMaskComposite: "source-in",
        }),
      }}
    >
      <defs>
        <mask id={id} maskUnits="userSpaceOnUse" x={0} y={0} width={art.w} height={art.h}>
          {art.strokes.map((s, i) => (
            <path
              key={i}
              d={s.d}
              pathLength={1}
              className="ink-draw"
              fill="none"
              stroke="#fff"
              strokeWidth={9}
              strokeLinecap="round"
              strokeLinejoin="round"
              style={timing(s)}
            />
          ))}
        </mask>
        {/* A soft-edged wipe that follows the brush front left to right;
            reveals the paper and the wash, so neither shows ahead of the ink. */}
        <linearGradient id={`${id}-front`}>
          <stop offset="0.62" stopColor="#fff" />
          <stop offset="0.667" stopColor="#000" />
        </linearGradient>
        <mask id={`${id}-reveal`} maskUnits="userSpaceOnUse" x={-art.w * 0.1} y={-60} width={art.w * 1.2} height={art.h + 120}>
          <rect
            className="ink-reveal"
            x={-2 * art.w}
            y={-60}
            width={3 * art.w}
            height={art.h + 120}
            fill={`url(#${id}-front)`}
            style={
              {
                "--reveal": `${art.w * 1.15}px`,
                animationDelay: `${Math.min(0.2, sweep * 0.15)}s`,
                animationDuration: `${sweep}s`,
              } as CSSProperties
            }
          />
        </mask>
      </defs>
      {paper && (
        <>
          {/* Paper: soft-edged (so the odd unlined side reads as mist, not a
              cut), softening out at the far sides, and with `mist` fading
              toward its base. */}
          <linearGradient id={`${id}-paper`}>
            <stop offset="0" stopColor="var(--cloud-paper)" stopOpacity={0} />
            <stop offset="0.06" stopColor="var(--cloud-paper)" />
            <stop offset="0.94" stopColor="var(--cloud-paper)" />
            <stop offset="1" stopColor="var(--cloud-paper)" stopOpacity={0} />
          </linearGradient>
          <filter id={`${id}-edge`} x="-5%" y="-5%" width="110%" height="110%">
            <feGaussianBlur stdDeviation={2.5} />
          </filter>
          {mist !== undefined && (
            <>
              <linearGradient id={`${id}-mist`} x1="0" x2="0" y1="0" y2="1">
                <stop offset={mist} stopColor="#fff" />
                <stop offset="0.97" stopColor="#000" />
              </linearGradient>
              <mask id={`${id}-base`} maskUnits="userSpaceOnUse" x={0} y={0} width={art.w} height={art.h}>
                <rect width={art.w} height={art.h} fill={`url(#${id}-mist)`} />
              </mask>
            </>
          )}
          <g mask={mist !== undefined ? `url(#${id}-base)` : undefined}>
            <path d={art.fill} fill={`url(#${id}-paper)`} filter={`url(#${id}-edge)`} mask={`url(#${id}-reveal)`} />
          </g>
        </>
      )}
      {/* Wash: the ink, thickened, blurred and dropped just under each line,
          so lobes shade softly inward from their outlines. */}
      {/* Region in user space with room for the blur, so thin ribbons don't
          clip their wash into a rectangle. */}
      <filter id={`${id}-soft`} filterUnits="userSpaceOnUse" x={-40} y={-40} width={art.w + 80} height={art.h + 80}>
        <feGaussianBlur stdDeviation={6} />
      </filter>
      <g mask={`url(#${id}-reveal)`}>
        <path
          d={art.ink}
          fill="var(--cloud-wash)"
          stroke="var(--cloud-wash)"
          strokeWidth={10}
          strokeLinejoin="round"
          transform="translate(0 6)"
          filter={`url(#${id}-soft)`}
          opacity={0.3}
        />
      </g>
      <path d={art.ink} fill="var(--cloud-ink)" fillRule="evenodd" mask={`url(#${id})`} />
    </svg>
  );
}
