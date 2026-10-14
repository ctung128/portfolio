"use client";

import Image from "next/image";
import { useEffect, useRef, useSyncExternalStore, type CSSProperties, type ReactNode } from "react";
import { hero, siteConfig } from "@/content/site";
import { ShippedLine } from "@/components/home/ShippedLine";
import { FIGURE, clamp, inOut, lerpRect, seg, type Rect } from "@/components/home/HeroScene";

const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

const ART_RATIO = 1438 / 1165;
/** The card crops just inside the scan's mat. */
const ART_ZOOM = 1.045;
/** The silk's own tone, sampled from the scan, and a paler wash of it. */
const SILK = "#c6b6a4";
const SILK_PALE = "#ece5da";

/** How many screens of scroll the stage stays pinned for. Selected work
 * starts sliding up as a sheet over the last SHEET_SCREENS of them. */
const PIN_SCREENS = 1.5;
const SHEET_SCREENS = 0.75;

const REDUCE = "(prefers-reduced-motion: reduce)";
const subscribeReduce = (cb: () => void) => {
  const mq = matchMedia(REDUCE);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};

/** `r` scaled by `k` about the point (fx, fy). */
const scaleAbout = (r: Rect, fx: number, fy: number, k: number): Rect => ({
  x: fx + (r.x - fx) * k,
  y: fy + (r.y - fy) * k,
  w: r.w * k,
  h: r.h * k,
});

/** Moves an element laid out at `base` so it covers `r`. */
const place = (el: HTMLElement, base: Rect, r: Rect) => {
  el.style.transform = `translate3d(${r.x - base.x}px, ${r.y - base.y}px, 0) scale(${r.w / base.w})`;
};

/** Mist puffs between the camera and the immortal: where they sit (as
 * fractions of the screen) and when in the dive they rush past. */
const MIST = [
  { x: 0.24, y: 0.7, size: 0.7, at: 0.15 },
  { x: 0.7, y: 0.75, size: 0.9, at: 0.45 },
];

/** Opacity, and out of the compositor entirely while invisible (stacked
 * full-screen layers are what make a dive like this stutter). */
const fade = (el: HTMLElement, o: number) => {
  el.style.opacity = String(o);
  el.style.visibility = o <= 0.001 ? "hidden" : "";
};

/**
 * The live hero's content as two soft white cards side by side (the
 * painting inset with concentric rounded corners, the copy beside it), then
 * scroll carries you into the painting:
 *
 * 1. Unframe: the copy card swings away and the painting breaks out of its
 *    card to full bleed; the header steps aside.
 * 2. Dive: the camera pushes in on the immortal while the clouds in front
 *    split left and right and rush past (nearer, faster), mist puffs fly by
 *    and the lower clouds sink into haze.
 * 3. Surface: everything melts into the silk, and Selected work slides up out
 *    of it as a sheet.
 *
 * The moving painting is a copy drawn by the scene; the card's own painting
 * holds its place (and alt text) and hides once the scene takes over. Only
 * transform, opacity and clip-path change per frame. Reduced motion: the
 * cards, then Selected work.
 */
export function CardHero({ work }: { work: ReactNode }) {
  const reduce = useSyncExternalStore(subscribeReduce, () => matchMedia(REDUCE).matches, () => false);
  if (reduce) {
    return (
      <>
        <Cards />
        {work}
      </>
    );
  }
  return <Dive work={work} />;
}

function Cards({
  figure,
  win,
  article,
}: {
  figure?: React.Ref<HTMLElement>;
  win?: React.Ref<HTMLDivElement>;
  article?: React.Ref<HTMLElement>;
}) {
  return (
    <section className="relative mx-auto flex min-h-[calc(100svh-64px)] max-w-5xl flex-col justify-start px-6 pb-10 pt-3 sm:justify-center sm:px-8 sm:py-10">
      <div className="grid grid-cols-1 items-stretch gap-5 sm:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] sm:gap-6">
        <figure ref={figure} className="hl-soft hl-rise rounded-[28px] p-2.5" style={d(150)}>
          <div ref={win} className="relative overflow-hidden rounded-[20px]" style={{ aspectRatio: String(ART_RATIO) }}>
            <Image
              src={hero.artwork.src}
              alt={hero.artwork.alt}
              fill
              unoptimized
              loading="eager"
              fetchPriority="high"
              className="object-cover"
              style={{ scale: String(ART_ZOOM) }}
            />
          </div>
        </figure>

        <article ref={article} className="hl-soft hl-rise flex flex-col rounded-[28px] p-7 sm:p-9" style={d(350)}>
          <p className="flex items-center justify-between font-sans text-[13px] text-ink-faint">
            <span>Product Design</span>
            <span>NYC</span>
          </p>
          {/* The logo left, 童雪玲 stacked at the card's right edge, sized so
              its first and last strokes meet the logo's top and baseline, and its right edge meets "NYC". */}
          <h1 className="mt-7 flex items-start justify-between gap-3">
            <Image src="/brand/logo.svg" alt={siteConfig.name} width={86} height={48} loading="eager" className="h-[64px] w-auto sm:h-[76px]" />
            <span lang="zh-Hans" aria-hidden className="hl-zh-stack flex flex-col font-zh leading-none text-ink">
              {[...hero.chineseName].map((ch, i) => (
                <span key={i} className="block">
                  {ch}
                </span>
              ))}
            </span>
          </h1>
          <p className="mt-5 text-pretty font-sans text-[16px] leading-relaxed text-ink-soft">{hero.tagline.replace("product designer", "designer")}</p>
          {/* Just shipped: under the tagline on phones, at the card's foot at sm+. */}
          <div className="mt-4 sm:mt-auto sm:pt-8">
            <ShippedLine sound />
          </div>
        </article>
      </div>
    </section>
  );
}

type Geo = {
  W: number;
  /** The stage's full height; on phones the stacked cards run taller than
   * the screen, so the stage pins once its bottom reaches the screen's. */
  SH: number;
  /** The screen's height, and where it sits in the stage once pinned. */
  H: number;
  y0: number;
  /** The card's window, the painting inside it, and the full-bleed cover. */
  win: Rect;
  pic: Rect;
  cover: Rect;
};

function Dive({ work }: { work: ReactNode }) {
  const track = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const figure = useRef<HTMLElement>(null);
  const win = useRef<HTMLDivElement>(null);
  const article = useRef<HTMLElement>(null);
  const scene = useRef<HTMLDivElement>(null);
  const back = useRef<HTMLImageElement>(null);
  const left = useRef<HTMLImageElement>(null);
  const right = useRef<HTMLImageElement>(null);
  const haze = useRef<HTMLDivElement>(null);
  const mist = useRef<(HTMLDivElement | null)[]>([]);
  const wash = useRef<HTMLDivElement>(null);
  const pale = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    let geo: Geo | null = null;
    let raf = 0;
    let shown = -1;
    let navHidden = false;
    let owned = false;

    const measure = () => {
      const st = stage.current!;
      const w = win.current!;
      const W = st.offsetWidth;
      const SH = st.offsetHeight;
      const H = innerHeight;
      const y0 = Math.max(0, SH - H);
      // Pin once the stage's bottom meets the screen's.
      st.style.top = `${Math.min(0, H - SH)}px`;
      track.current!.style.height = `${SH + PIN_SCREENS * H}px`;
      const s = st.getBoundingClientRect();
      const r = w.getBoundingClientRect();
      const winR = { x: r.left - s.left, y: r.top - s.top, w: r.width, h: r.height };
      const pic = scaleAbout(winR, winR.x + winR.w / 2, winR.y + winR.h / 2, ART_ZOOM);
      // Full bleed, the immortal a little above centre, 3% past the edges so
      // the mat never shows.
      const cw = Math.max(W, H * ART_RATIO) * 1.03;
      const ch = cw / ART_RATIO;
      const cy = clamp(H * 0.45 - ch * FIGURE.y, H - ch, 0);
      const cover = { x: (W - cw) / 2, y: y0 + cy, w: cw, h: ch };
      geo = { W, SH, H, y0, win: winR, pic, cover };
      for (const img of [back.current, left.current, right.current]) {
        Object.assign(img!.style, { left: `${cover.x}px`, top: `${cover.y}px`, width: `${cover.w}px`, height: `${cover.h}px` });
      }
    };

    const draw = (p: number) => {
      const g = geo;
      if (!g) return;
      const { W, SH, H, y0, cover } = g;
      const sheetFrom = 1 - SHEET_SCREENS / PIN_SCREENS;
      const U = inOut(seg(p, 0, 0.24));
      const D = seg(p, 0.12, sheetFrom + 0.1);
      const Di = inOut(D);
      const Dp = Math.pow(D, 1.5);

      // The scene takes over from the card's own painting the moment it moves.
      const own = p > 0.001;
      if (own !== owned) {
        owned = own;
        scene.current!.style.visibility = own ? "visible" : "hidden";
        win.current!.style.opacity = own ? "0" : "";
      }

      const hide = U > 0.9 && p < sheetFrom + (0.6 * SHEET_SCREENS) / PIN_SCREENS;
      if (hide !== navHidden) {
        navHidden = hide;
        if (hide) root.dataset.labNav = "hidden";
        else delete root.dataset.labNav;
      }

      // 1 · Unframe.
      const screen = { x: 0, y: y0, w: W, h: H };
      const clip = lerpRect(g.win, screen, U);
      const round = 20 * (1 - U);
      // No clip at all once full bleed: clip-path repaints every frame.
      scene.current!.style.clipPath =
        U >= 1 ? "none" : `inset(${clip.y}px ${W - clip.x - clip.w}px ${SH - clip.y - clip.h}px ${clip.x}px round ${round}px)`;
      // (Left alone at rest, so the cards' hover lift still works.)
      // Their hover transition would chase every frame (and lag), so it's off
      // while they move.
      const moving = U > 0;
      article.current!.style.transition = moving ? "none" : "";
      figure.current!.style.transition = moving ? "none" : "";
      article.current!.style.transform = U > 0 ? `translate3d(${W * 0.35 * U}px, ${-40 * U}px, 0) rotate(${7 * U}deg)` : "";
      article.current!.style.opacity = U > 0 ? String(1 - clamp(U * 1.6)) : "";
      figure.current!.style.transform = U > 0 ? `scale(${1 + 0.04 * U})` : "";
      figure.current!.style.opacity = U > 0 ? String(1 - U) : "";

      // 2 · Dive: push in on the immortal and draw him toward the middle.
      const base = lerpRect(g.pic, cover, U);
      const fx = base.x + base.w * FIGURE.x;
      const fy = base.y + base.h * FIGURE.y;
      const z = 1 + 1.7 * Di;
      const tx = (W / 2 - fx) * Di;
      const ty = (y0 + H * 0.42 - fy) * Di;
      const cam = (k: number) => {
        const r = scaleAbout(base, fx, fy, k);
        return { ...r, x: r.x + tx, y: r.y + ty };
      };
      place(back.current!, cover, cam(z));
      // The clouds in front split and rush past, nearer and faster.
      const zf = z * (1 + 2.4 * Dp);
      const L = cam(zf);
      const R = cam(zf);
      place(left.current!, cover, { ...L, x: L.x - W * 0.4 * Dp, y: L.y + H * 0.22 * Dp });
      place(right.current!, cover, { ...R, x: R.x + W * 0.4 * Dp, y: R.y + H * 0.22 * Dp });
      const fo = 1 - seg(D, 0.5, 0.85);
      fade(left.current!, fo);
      fade(right.current!, fo);
      // The lower clouds sink into haze behind them.
      fade(haze.current!, seg(D, 0.1, 0.55));
      mist.current.forEach((m, i) => {
        if (!m) return;
        const k = seg(D, MIST[i].at, MIST[i].at + 0.35);
        fade(m, Math.sin(Math.PI * k) * 0.85);
        m.style.transform = `translate(-50%, -50%) scale(${0.5 + 4 * k * k})`;
      });

      // 3 · Surface: into the silk, which pales as the sheet comes up.
      const w = seg(p, sheetFrom - 0.04, sheetFrom + 0.14);
      fade(wash.current!, w);
      fade(pale.current!, seg(p, sheetFrom + 0.1, sheetFrom + 0.35));
      // Fully washed: nothing underneath needs drawing.
      back.current!.style.visibility = w >= 1 ? "hidden" : "";
    };

    // Scroll maps straight to the dive, no smoothing: native scroll is
    // already smooth, and easing on top of it reads as lag.
    const tick = () => {
      raf = 0;
      const tr = track.current!;
      const st = stage.current!;
      const dist = tr.offsetHeight - st.offsetHeight;
      const top = parseFloat(st.style.top) || 0;
      const p = dist > 0 ? clamp((top - tr.getBoundingClientRect().top) / dist) : 0;
      if (p !== shown) draw((shown = p));
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const remeasure = () => {
      measure();
      shown = -1;
      kick();
    };
    remeasure();
    document.fonts?.ready.then(remeasure);
    const ro = new ResizeObserver(remeasure);
    ro.observe(stage.current!);
    addEventListener("resize", remeasure);
    addEventListener("scroll", kick, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      removeEventListener("resize", remeasure);
      removeEventListener("scroll", kick);
      delete root.dataset.labNav;
    };
  }, []);

  const img = "absolute max-w-none origin-top-left will-change-transform";
  return (
    <>
      <div ref={track} className="relative -mt-16" style={{ height: `calc(100svh * ${1 + PIN_SCREENS})` }}>
        <div ref={stage} className="sticky top-0 min-h-svh overflow-hidden pt-16">
          <Cards figure={figure} win={win} article={article} />

          <div ref={scene} aria-hidden className="pointer-events-none absolute inset-0" style={{ visibility: "hidden", background: SILK }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img ref={back} src={hero.artwork.src} alt="" className={`hl-cloud-back ${img}`} />
            <div
              ref={haze}
              className="absolute inset-0"
              style={{ opacity: 0, background: `linear-gradient(transparent 45%, ${SILK} 80%)` }}
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img ref={left} src={hero.artwork.src} alt="" className={`hl-cloud-l ${img}`} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img ref={right} src={hero.artwork.src} alt="" className={`hl-cloud-r ${img}`} />
            {MIST.map((m, i) => (
              <div
                key={i}
                ref={(el) => {
                  mist.current[i] = el;
                }}
                className="absolute aspect-square rounded-full will-change-transform"
                style={{
                  left: `${m.x * 100}%`,
                  top: `${m.y * 100}%`,
                  width: `${m.size * 100}vmax`,
                  opacity: 0,
                  background: `radial-gradient(closest-side, ${SILK_PALE}, ${SILK_PALE}cc 35%, transparent)`,
                }}
              />
            ))}
            <div ref={wash} className="absolute inset-0" style={{ opacity: 0, background: SILK }} />
            <div ref={pale} className="absolute inset-0" style={{ opacity: 0, background: SILK_PALE }} />
          </div>
        </div>
      </div>
      {/* Overlaps the end of the pin, so it slides up out of the silk as a
          sheet. */}
      <div
        className="relative z-10 overflow-hidden rounded-t-[24px] shadow-[0_-24px_60px_-28px_rgba(37,37,37,0.35)] [&>section]:border-t-0"
        style={{ marginTop: `calc(-100svh * ${SHEET_SCREENS})` }}
      >
        {work}
      </div>
    </>
  );
}
