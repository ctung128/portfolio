"use client";

import { useEffect, useRef, useSyncExternalStore, type ReactNode, type RefObject } from "react";
import { hero } from "@/content/site";
import { HEADER_HEIGHT } from "@/components/layout/Header";
import "./hero-scene.css";

const HEADER_PX = parseInt(HEADER_HEIGHT, 10);

/** The scan's own shape, mat included (1438 x 1165). */
export const RATIO = 1438 / 1165;
/** Where the immortal sits in the scan, as fractions of its width/height. */
export const FIGURE = { x: 0.48, y: 0.42 };

export const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
/** Where `p` sits inside [a, b], as 0…1. */
export const seg = (p: number, a: number, b: number) => clamp((p - a) / (b - a));
export const expoOut = (t: number) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t));
export const inOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export type Rect = { x: number; y: number; w: number; h: number };
export const lerpRect = (a: Rect, b: Rect, t: number): Rect => ({
  x: lerp(a.x, b.x, t),
  y: lerp(a.y, b.y, t),
  w: lerp(a.w, b.w, t),
  h: lerp(a.h, b.h, t),
});
/** A clip-path that leaves only `r` of a W×H box showing. */
export const inset = (r: Rect, W: number, H: number, round = 0) =>
  `inset(${r.y}px ${W - r.x - r.w}px ${H - r.y - r.h}px ${r.x}px round ${round}px)`;

/**
 * Pinned scroll scene with a load clock. `track` is a tall block holding a
 * sticky `stage` (pinned at `pinTop` px). `draw(p, t)` runs every frame while
 * the page is loading in (t = ms since mount, up to `loadMs`) or while p is
 * still gliding toward the scroll position (`ease` < 1 smooths wheel steps;
 * smaller is softer). p = 0 when the stage pins, 1 when it releases.
 * `measure` runs on mount, once fonts load and whenever the stage resizes.
 */
export function useScene(
  track: RefObject<HTMLElement | null>,
  stage: RefObject<HTMLElement | null>,
  draw: (p: number, t: number) => void,
  measure: () => void,
  { ease = 1, loadMs = 0, pinTop = HEADER_PX }: { ease?: number; loadMs?: number; pinTop?: number } = {},
) {
  const drawRef = useRef(draw);
  const measureRef = useRef(measure);
  useEffect(() => {
    drawRef.current = draw;
    measureRef.current = measure;
  });

  useEffect(() => {
    const t0 = performance.now();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let shown = -1;
    const target = () => {
      const tr = track.current;
      const st = stage.current;
      if (!tr || !st) return 0;
      const dist = tr.offsetHeight - st.offsetHeight;
      return dist > 0 ? clamp((pinTop - tr.getBoundingClientRect().top) / dist) : 0;
    };
    const tick = (now: number) => {
      raf = 0;
      const goal = target();
      const next = shown < 0 || reduce ? goal : shown + (goal - shown) * ease;
      shown = Math.abs(goal - next) < 0.0003 ? goal : next;
      const t = reduce ? Infinity : now - t0;
      drawRef.current(shown, t);
      if (shown !== goal || t < loadMs) raf = requestAnimationFrame(tick);
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const remeasure = () => {
      measureRef.current();
      kick();
    };
    remeasure();
    document.fonts?.ready.then(remeasure);
    const ro = new ResizeObserver(remeasure);
    if (stage.current) ro.observe(stage.current);
    window.addEventListener("scroll", kick, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("scroll", kick);
    };
  }, [track, stage, ease, loadMs, pinTop]);
}

/** The hero painting's on-screen box inside `layer`, relative to `stage`
 * (whichever copy is showing: phone or sm+). Transforms on `layer` are
 * ignored. */
export function paintingRect(layer: HTMLElement, stage: HTMLElement): Rect | null {
  const saved = layer.style.transform;
  layer.style.transform = "none";
  const img = [...layer.querySelectorAll("img")].find(
    (el) => el.src.includes(hero.artwork.src) && el.offsetWidth > 0,
  );
  const s = stage.getBoundingClientRect();
  const r = img?.getBoundingClientRect();
  layer.style.transform = saved;
  return r ? { x: r.left - s.left, y: r.top - s.top, w: r.width, h: r.height } : null;
}

const REDUCE = "(prefers-reduced-motion: reduce)";
const subscribeReduce = (cb: () => void) => {
  const mq = window.matchMedia(REDUCE);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};

/**
 * The homepage hero and Selected work, joined by the aperture (picked from
 * /lab/hero-motion).
 *
 * - Load: the hero copy rises in and the painting surfaces out of the silk:
 *   it fades up a few px low and a touch large and settles into its cell.
 * - Scroll: the painting's window grows past the box to full bleed while the
 *   copy lifts away; the header slides up out of the way once the painting
 *   fills the screen. Then Selected work slides up over it as a sheet while
 *   the painting drifts up at a third of the speed and dims underneath, and
 *   the header slides back in.
 *
 * The stage runs under the header (pinned at the very top, hero padded down
 * by the header height, so the hero rests exactly where it always has). The
 * painting in motion is a copy drawn by the scene; the hero's own painting
 * stays in place (transparent) for layout and its alt text. Only transform,
 * opacity and clip-path change per frame. With reduced motion it's just the
 * hero followed by Selected work.
 */
export function HeroScene({ hero: heroNode, work }: { hero: ReactNode; work: ReactNode }) {
  const reduce = useSyncExternalStore(subscribeReduce, () => window.matchMedia(REDUCE).matches, () => false);
  if (reduce) {
    return (
      <>
        {heroNode}
        {work}
      </>
    );
  }
  return <Aperture hero={heroNode} work={work} />;
}

function Aperture({ hero: heroNode, work }: { hero: ReactNode; work: ReactNode }) {
  const track = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const textLayer = useRef<HTMLDivElement>(null);
  const paintLayer = useRef<HTMLDivElement>(null);
  const img = useRef<HTMLImageElement>(null);
  const dim = useRef<HTMLDivElement>(null);
  const geo = useRef<{ W: number; H: number; R0: Rect; cover: Rect } | null>(null);
  const navHidden = useRef(false);

  // The header lives in the layout; hide it through an attribute on <html>
  // (styles in hero-scene.css) and always hand it back on the way out.
  useEffect(() => {
    const root = document.documentElement;
    root.dataset.heroNav = "shown";
    return () => {
      delete root.dataset.heroNav;
    };
  }, []);

  useScene(
    track,
    stage,
    (p, t) => {
      const g = geo.current;
      if (!g || !paintLayer.current || !img.current) return;
      const { W, H, R0, cover } = g;
      // Expanding takes the first 0.9 screens of the pin, the sheet the last 1.
      const ex = 0.9 / 1.9;
      const E = inOut(seg(p, 0, ex));
      const S = seg(p, ex, 1);

      // Header out once the painting has (nearly) filled the screen, back in
      // once the work sheet has come most of the way up.
      const hide = E > 0.92 && S < 0.6;
      if (hide !== navHidden.current) {
        navHidden.current = hide;
        document.documentElement.dataset.heroNav = hide ? "hidden" : "shown";
      }

      const win = lerpRect(R0, { x: 0, y: 0, w: W, h: H }, E);
      paintLayer.current.style.clipPath = inset(win, W, H, 0);

      // The painting fills the window; on load it settles from 1.05×, 16px low.
      const L = expoOut(seg(t, 250, 2200));
      const pic = lerpRect(R0, cover, E);
      const k = 1 + 0.05 * (1 - L);
      const pcx = R0.x + R0.w / 2 + (cover.x + cover.w / 2 - (R0.x + R0.w / 2)) * E;
      const pcy = R0.y + R0.h / 2 + (cover.y + cover.h / 2 - (R0.y + R0.h / 2)) * E + 16 * (1 - L);
      const w = pic.w * k;
      const h = pic.h * k;
      img.current.style.transform = `translate3d(${pcx - w / 2 - cover.x}px, ${pcy - h / 2 - cover.y}px, 0) scale(${w / cover.w})`;
      img.current.style.opacity = String(expoOut(seg(t, 250, 1600)));

      // Sheet phase: drift up at a third of the sheet's speed and dim under it.
      paintLayer.current.style.transform = S > 0 ? `translate3d(0, ${-H * 0.35 * S}px, 0)` : "";
      if (dim.current) dim.current.style.opacity = String(0.4 * S);

      if (textLayer.current) {
        textLayer.current.style.transform = `translate3d(0, ${-90 * E}px, 0)`;
        textLayer.current.style.opacity = String(1 - clamp(E * 2.2));
      }
    },
    () => {
      const st = stage.current;
      const tl = textLayer.current;
      if (!st || !tl || !img.current) return;
      const R0 = paintingRect(tl, st);
      if (!R0) return;
      const W = st.offsetWidth;
      const H = st.offsetHeight;
      // Full-bleed cover, cropped to keep the immortal a little above centre,
      // and 3% past the edges so the scan's mat border never shows.
      const cw = Math.max(W, H * RATIO) * 1.03;
      const ch = cw / RATIO;
      const cy = clamp(H * 0.45 - ch * FIGURE.y, H - ch, 0);
      const cover = { x: (W - cw) / 2, y: cy, w: cw, h: ch };
      geo.current = { W, H, R0, cover };
      Object.assign(img.current.style, {
        left: `${cover.x}px`,
        top: `${cover.y}px`,
        width: `${cover.w}px`,
        height: `${cover.h}px`,
      });
    },
    { ease: 0.16, loadMs: 2500, pinTop: 0 },
  );

  return (
    <>
      <div ref={track} className="relative -mt-16" style={{ height: "calc(100svh * 2.9)" }}>
        <div ref={stage} className="sticky top-0 h-svh overflow-hidden">
          <div ref={textLayer} data-hero-scene className="absolute inset-0 pt-16 will-change-transform">
            {heroNode}
          </div>
          <div ref={paintLayer} aria-hidden className="absolute inset-0" style={{ clipPath: "inset(50%)" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              ref={img}
              src={hero.artwork.src}
              alt=""
              fetchPriority="high"
              className="absolute max-w-none origin-top-left will-change-transform"
              style={{ opacity: 0 }}
            />
            <div ref={dim} className="absolute inset-0 bg-ink" style={{ opacity: 0 }} />
          </div>
        </div>
      </div>
      {/* Overlaps the last screen of the pin, so it slides up over the
          painting as a sheet. */}
      <div
        className="relative z-10 overflow-hidden rounded-t-[24px] shadow-[0_-24px_60px_-28px_rgba(37,37,37,0.35)] [&>section]:border-t-0"
        style={{ marginTop: "-100svh" }}
      >
        {work}
      </div>
    </>
  );
}
