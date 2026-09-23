"use client";

import { useEffect, useState } from "react";

const PLAYBACK_RATE = 1.25;

function setPlaybackRate(video: HTMLVideoElement | null) {
  if (video) video.playbackRate = PLAYBACK_RATE;
}

const FRAME_HOLD_MS = 550;
const FRAME_TRANSITION_MS = 300;
const FRAME_EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

/** Cycles through a sequence of static screenshots. "scale" crossfades with
 * a subtle scale/drift settle (After Effects/Lottie-style), best for small
 * incremental state changes. "fade" is a plain opacity crossfade with no
 * motion, which reads cleaner when consecutive frames are very different
 * screens (e.g. a keyboard appearing, a full navigation change). */
function FrameSequence({
  frames,
  alt,
  holdMs = FRAME_HOLD_MS,
  transitionMs = FRAME_TRANSITION_MS,
  motion = "scale",
}: {
  frames: string[];
  alt: string;
  holdMs?: number;
  transitionMs?: number;
  motion?: "scale" | "fade";
}) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (frames.length <= 1) return;
    const id = setInterval(() => {
      setActive((i) => (i + 1) % frames.length);
    }, holdMs + transitionMs);
    return () => clearInterval(id);
  }, [frames.length, holdMs, transitionMs]);

  return (
    <div className="absolute inset-0">
      {frames.map((src, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={src}
          src={src}
          alt={i === 0 ? alt : ""}
          aria-hidden={i !== 0}
          className="absolute inset-0 h-full w-full object-cover object-top"
          style={{
            opacity: i === active ? 1 : 0,
            transform:
              motion === "scale"
                ? i === active
                  ? "scale(1) translateY(0)"
                  : "scale(1.045) translateY(10px)"
                : undefined,
            transition: `opacity ${transitionMs}ms ${FRAME_EASE}${
              motion === "scale" ? `, transform ${transitionMs}ms ${FRAME_EASE}` : ""
            }`,
            zIndex: i === active ? 1 : 0,
          }}
        />
      ))}
    </div>
  );
}

const SCROLL_EASE = "cubic-bezier(0.65, 0, 0.35, 1)";

/** Pans a single tall screenshot down inside the fixed-aspect screen mask
 * and back, looping — a live CSS transform, not a rendered video. `endPercent`
 * is the exact translateY (relative to the image's own rendered height)
 * needed to reveal the image's bottom edge, computed from its aspect ratio
 * vs. the phone screen's fixed 9:19.5 aspect ratio: -(1 - (19.5 * imgWidth)
 * / (9 * imgHeight)) * 100. */
function ScrollingImage({
  src,
  alt,
  endPercent,
  durationMs = 9000,
}: {
  src: string;
  alt: string;
  endPercent: number;
  durationMs?: number;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className="absolute inset-x-0 top-0 w-full"
      style={{
        ["--scroll-end" as string]: `${endPercent}%`,
        animation: `scroll-reveal ${durationMs}ms ${SCROLL_EASE} infinite`,
      }}
    />
  );
}

function StatusBarIcons() {
  return (
    <div className="flex items-center gap-[5px]">
      <svg width="18" height="12" viewBox="0 0 18 12" fill="none" aria-hidden>
        <rect x="0" y="7" width="3" height="5" rx="0.75" fill="white" />
        <rect x="4.5" y="5" width="3" height="7" rx="0.75" fill="white" />
        <rect x="9" y="3" width="3" height="9" rx="0.75" fill="white" />
        <rect x="13.5" y="0" width="3" height="12" rx="0.75" fill="white" />
      </svg>
      <svg width="16" height="12" viewBox="0 0 16 12" fill="none" aria-hidden>
        <path
          d="M8 10.2a1.1 1.1 0 1 1 0-2.2 1.1 1.1 0 0 1 0 2.2Z"
          fill="white"
        />
        <path
          d="M4.8 6.6a4.6 4.6 0 0 1 6.4 0"
          stroke="white"
          strokeWidth="1.4"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M2.2 3.9a8.4 8.4 0 0 1 11.6 0"
          stroke="white"
          strokeWidth="1.4"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
      <svg width="25" height="12" viewBox="0 0 25 12" fill="none" aria-hidden>
        <rect
          x="0.75"
          y="0.75"
          width="20.5"
          height="10.5"
          rx="2.5"
          stroke="white"
          strokeOpacity="0.5"
          strokeWidth="1"
        />
        <rect x="2.25" y="2.25" width="17.5" height="7.5" rx="1.5" fill="white" />
        <rect x="22.5" y="4" width="1.8" height="4" rx="0.9" fill="white" fillOpacity="0.5" />
      </svg>
    </div>
  );
}

type Variant = "13-pro" | "15-pro";

// Values expressed in cqw (% of the mockup's own rendered width, via a
// container query on the root element) instead of fixed rem/px, so the
// bezel and corner rounding stay proportional at every size instead of
// looking thick and over-rounded on a narrow mobile-width phone.
const VARIANT_STYLES: Record<
  Variant,
  { frameRadius: string; bezelRadius: string; screenRadius: string; bezelPadding: string }
> = {
  "13-pro": {
    frameRadius: "rounded-[15.4cqw]",
    bezelRadius: "rounded-[14.5cqw]",
    screenRadius: "rounded-[11.3cqw]",
    bezelPadding: "p-[1.85cqw]",
  },
  "15-pro": {
    frameRadius: "rounded-[16.5cqw]",
    bezelRadius: "rounded-[15.7cqw]",
    screenRadius: "rounded-[12.5cqw]",
    bezelPadding: "p-[3.3cqw]",
  },
};

export function IPhoneMockup({
  videoSrc,
  frames,
  scrollImage,
  poster,
  alt,
  className,
  sizeClassName = "w-[210px] sm:w-[240px] md:w-[270px]",
  position = "relative",
  showStatusBar = false,
  variant = "15-pro",
  frameHoldMs,
  frameTransitionMs,
  frameMotion,
}: {
  /** A looping video to fill the screen. Provide this or `frames`/`scrollImage`. */
  videoSrc?: string;
  /** A sequence of static screenshots to animate between (crossfade +
   * settle), for case studies without device footage. Provide this or
   * `videoSrc`/`scrollImage`. */
  frames?: string[];
  /** A single tall screenshot that pans down inside the screen mask and
   * back, looping — for a live-scroll effect with no video render step.
   * Provide this or `videoSrc`/`frames`. */
  scrollImage?: { src: string; alt: string; endPercent: number; durationMs?: number };
  poster?: string;
  alt: string;
  className?: string;
  sizeClassName?: string;
  /** Milliseconds each frame holds before transitioning. Only used with
   * `frames`. */
  frameHoldMs?: number;
  /** Milliseconds the crossfade itself takes. Only used with `frames`. */
  frameTransitionMs?: number;
  /** "scale" (default) crossfades with a subtle scale/drift settle, best
   * for small incremental changes. "fade" is a plain opacity crossfade,
   * which reads cleaner between very different screens (e.g. a keyboard
   * appearing). Only used with `frames`. */
  frameMotion?: "scale" | "fade";
  /** CSS position of the root element. Use "absolute" when placing this
   * inside a custom layout that positions it with top/right/etc via
   * `className` — avoids conflicting with the default "relative". */
  position?: "relative" | "absolute";
  /** Draw a synthetic status bar + notch/Dynamic Island over the video. Leave
   * off (default) when the source footage is a real device recording that
   * already shows its own status bar/notch. */
  showStatusBar?: boolean;
  /** Which device to render. iPhone 13 Pro has a notch; iPhone 15 Pro has a
   * Dynamic Island. Pick the one that matches the source recording. */
  variant?: Variant;
}) {
  const isThirteen = variant === "13-pro";
  const { frameRadius, bezelRadius, screenRadius, bezelPadding } = VARIANT_STYLES[variant];

  return (
    <div
      className={`${position} aspect-[9/19.5] [container-type:inline-size] ${sizeClassName} ${className ?? ""}`}
    >
      {/* Titanium frame */}
      <div
        className={`absolute inset-0 ${frameRadius} bg-gradient-to-b from-[#4a4a4d] via-[#2c2c2e] to-[#1c1c1e] p-[1.1cqw] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.55)] ring-1 ring-black/30`}
      >
        <div className={`h-full w-full ${bezelRadius} bg-black ${bezelPadding}`}>
          {/* Screen */}
          <div className={`relative h-full w-full overflow-hidden ${screenRadius} bg-black`}>
            {frames && frames.length > 0 ? (
              <FrameSequence
                frames={frames}
                alt={alt}
                holdMs={frameHoldMs}
                transitionMs={frameTransitionMs}
                motion={frameMotion}
              />
            ) : videoSrc ? (
              <video
                ref={setPlaybackRate}
                className="absolute inset-0 h-full w-full object-cover"
                src={videoSrc}
                poster={poster}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-label={alt}
                onLoadedMetadata={(e) => setPlaybackRate(e.currentTarget)}
              />
            ) : scrollImage ? (
              <ScrollingImage
                src={scrollImage.src}
                alt={scrollImage.alt}
                endPercent={scrollImage.endPercent}
                durationMs={scrollImage.durationMs}
              />
            ) : null}

            {showStatusBar && (
              <>
                {/* Status bar */}
                <div className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-[1.6rem] pt-[0.65rem]">
                  <span className="font-sans text-[13px] font-semibold tracking-tight text-white">
                    9:41
                  </span>
                  <StatusBarIcons />
                </div>

                {isThirteen ? (
                  /* Notch */
                  <div className="absolute inset-x-0 top-0 z-20 mx-auto h-[26px] w-[108px] rounded-b-[1.1rem] bg-black" />
                ) : (
                  /* Dynamic Island */
                  <div className="absolute left-1/2 top-[0.55rem] z-20 h-[26px] w-[86px] -translate-x-1/2 rounded-full bg-black" />
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
