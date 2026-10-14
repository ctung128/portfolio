"use client";

import { Caveat, Long_Cang } from "next/font/google";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { TWINKLE, playSfx } from "@/lib/sfx";
import { Bird, Dots, Flower, INK, Leaf } from "./storybookDoodles";

const caveat = Caveat({ subsets: ["latin"], weight: "500", preload: false });
const longCang = Long_Cang({ subsets: ["latin"], weight: "400", preload: false });

/** How long she has to stay fully on screen before saying hello, so a reader scrolling past sees it. */
const HELLO_DWELL_MS = 350;
/** The twinkle rings ~1.8s; brushing in and out again sooner doesn't restart it on top of itself. */
const TWINKLE_GAP_MS = 1200;

/**
 * The doodles that bloom around her: a symmetric halo on one ellipse around her head and
 * shoulders, at even angles (90° is straight up, 30° apart). Mirrored pairs carry the same
 * visual weight (size and darkness), crossing colour diagonally so neither side gets heavier;
 * they bloom in one wave from the top outward.
 */
const HALO = { cx: 50, cy: 46, rx: 56, ry: 48 };
const at = (deg: number) => ({
  x: HALO.cx + HALO.rx * Math.cos((deg * Math.PI) / 180),
  y: HALO.cy - HALO.ry * Math.sin((deg * Math.PI) / 180),
});

const BLOOM: { el: ReactNode; angle: number; size: number; r: number; delay: number; flip?: boolean; bird?: boolean }[] = [
  { el: <Dots />, angle: 90, size: 20, r: 0, delay: 0 },
  { el: <Flower />, angle: 120, size: 30, r: -12, delay: 70 },
  { el: <Bird />, angle: 60, size: 34, r: 4, delay: 70, bird: true },
  { el: <Flower color={INK.indigo} center={INK.ochre} />, angle: 150, size: 24, r: 10, delay: 140 },
  { el: <Flower color={INK.vermilion} center={INK.ochre} />, angle: 30, size: 24, r: -10, delay: 140 },
  { el: <Leaf />, angle: 180, size: 26, r: -20, delay: 210, flip: true },
  { el: <Leaf />, angle: 0, size: 26, r: 20, delay: 210 },
];

/**
 * A die-cut photo sticker on the note's page, like a storybook scrapbook. She waves hello once
 * she's fully in view, a penciled "say hi 你好" points up at her, and on hover (or a tap on
 * phones) she wobbles while flat flowers, leaves and a bird bloom around her. The doodles are
 * our own shapes in a folk gouache palette, not traced from her illustrations.
 */
export function StickerFigure({
  src,
  alt,
  width,
  height,
  pad,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Transparent margin around the die-cut, in the same units as width/height. */
  pad: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [entered, setEntered] = useState(false);
  const [tapped, setTapped] = useState(false);
  const lastTwinkle = useRef(0);

  // Hello once she's entirely on screen and stays there a moment, not as soon as the page loads.
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    let timer: number | undefined;
    const io = new IntersectionObserver(
      ([e]) => {
        window.clearTimeout(timer);
        if (e && e.intersectionRatio >= 0.98) {
          timer = window.setTimeout(() => {
            setEntered(true);
            io.disconnect();
          }, HELLO_DWELL_MS);
        }
      },
      { threshold: [0, 0.98, 1] },
    );
    io.observe(node);
    return () => {
      window.clearTimeout(timer);
      io.disconnect();
    };
  }, []);

  const twinkle = () => {
    const now = performance.now();
    if (now - lastTwinkle.current < TWINKLE_GAP_MS) return;
    lastTwinkle.current = now;
    playSfx(TWINKLE.src, TWINKLE.volume).catch(() => {});
  };

  const tap = () => {
    twinkle();
    setTapped(true);
    window.setTimeout(() => setTapped(false), 1400);
  };

  return (
    <div
      ref={ref}
      className="note-sticker"
      data-entered={entered || undefined}
      data-active={tapped || undefined}
      onClick={tap}
      onPointerEnter={(e) => e.pointerType === "mouse" && twinkle()}
    >
      <div className="note-sticker-doodles" aria-hidden="true">
        {BLOOM.map((d, i) => (
          <span
            key={i}
            className={`note-sticker-doodle ${d.bird ? "is-bird" : ""}`}
            style={
              {
                left: `${at(d.angle).x}%`,
                top: `${at(d.angle).y}%`,
                width: d.size,
                scale: d.flip ? "-1 1" : undefined,
                "--r": `${d.r}deg`,
                "--d": `${d.delay}ms`,
              } as CSSProperties
            }
          >
            {d.el}
          </span>
        ))}
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        draggable={false}
        className="note-sticker-img"
        // The box is her visible area; the file's transparent padding hangs outside it.
        // (Percentage margins, top and bottom too, are of the box's width.)
        style={{
          width: `${(width / (width - 2 * pad)) * 100}%`,
          maxWidth: "none",
          margin: `${-(pad / (width - 2 * pad)) * 100}%`,
        }}
      />
      <span className="note-sticker-hi" aria-hidden="true">
        <svg viewBox="0 0 44 40" className="note-sticker-arrow">
          <path d="M6 36 C 8 24, 18 14, 34 8" />
          <path d="M25 5 L34 8 L29 16" />
        </svg>
        <span className={caveat.className}>say hi</span> <span className={longCang.className}>你好</span>
      </span>
    </div>
  );
}
