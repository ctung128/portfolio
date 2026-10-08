"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { clamp, easeIn, seg, useScrollScene } from "./scene";
import { InkDrawing } from "./InkDrawing";
import { drift, head, puff, ribbon, swirl, tower, type CloudArt } from "./cloudArt";

/** Clouds start rising here… */
const START = 0.15;
/** …by here they cover the stage, so the hero can go… */
const SWAP = 0.55;
/** …and by here they've lifted clear, a little before Selected work settles,
 * so the underside never drifts across its first card. */
const END = 0.9;

type Placed = { art: CloudArt; x: number; y: number; w: number; flip?: boolean; paper?: boolean; mist?: number };
type Layout = {
  W: number;
  H: number;
  /** Height of the cloud field. */
  F: number;
  /** Top of the paper sea (hidden under the surface clouds). */
  U: number;
  /** Bottom of the sea, where it has faded out under the ribbons. */
  B: number;
  /** Height of that fade. */
  fade: number;
  items: Placed[];
};

/**
 * Where everything sits in the cloud field, in px. Few, large masses with
 * room between them. Back to front:
 * - lead-in: a small puff and a drifting cloud over the hero, misting out at their base;
 * - the sea surface: the tall pavilion cloud mass and the scholar's cloud head
 *   side by side across the full width, their lower edges sunk into the sea;
 * - one swirling bank inside the sea;
 * - the underside: two ribbons over the sea's faded bottom edge.
 */
function layout(W: number, H: number): Layout {
  const s = clamp(W / 1440, 0.5, 1.15) * 1.35;
  const U = H * 0.62;
  const B = H * 1.55;
  const at = (art: CloudArt, w: number, x: number, y: number, flip = false, paper = true): Placed => ({
    art,
    w,
    x,
    y,
    flip,
    paper,
  });
  const h = (art: CloudArt, w: number) => (w * art.h) / art.w;
  // Sink a surface cloud deep into the sea: the sea starts 65% down it, well
  // above its faded, cut-off base.
  const surface = (art: CloudArt, w: number, x: number) => at(art, w, x, U - 0.65 * h(art, w));

  const towerW = tower.w * s * 0.78;
  const headW = head.w * s * 1.05;
  const underW = Math.max(ribbon.w * s, W * 0.9);
  return {
    W,
    H,
    F: H * 1.66,
    U,
    B,
    fade: H * 0.16,
    items: [
      // Lead-in clouds: paper that thins to mist toward their base.
      { ...at(puff, puff.w * s, W * 0.08, H * 0.06), mist: 0.45 },
      { ...at(drift, drift.w * s, W * 0.52, 0), mist: 0.45 },
      surface(tower, towerW, -W * 0.08),
      // Its cut-off right edge (and fade) hangs off the screen.
      surface(head, headW, W - headW * 0.85),
      // Below the surface the sea lightens toward cream, so these are ink and
      // wash only (a silk fill would show as a darker patch).
      at(swirl, swirl.w * s * 0.85, W * 0.5 - (swirl.w * s * 0.85) / 2, U + H * 0.24, false, false),
      // Each ribbon's cut-off end hangs off screen: the right one's right
      // end, the mirrored left one's left end.
      at(ribbon, underW, W - underW * 0.85, B - H * 0.26, false, false),
      at(ribbon, underW, -underW * 0.15, B - H * 0.15, true, false),
    ],
  };
}

/**
 * Direction A, traced. Scrolling zooms into the painting's cloud while clouds
 * traced from the reference drawings rise and ink themselves in, in a warm
 * umber ink on silk paper taken from the painting, with a soft inner wash. They pile into a paper sea that
 * hides the swap, and its ribbon underside lifts off Selected work.
 */
export function TracedClouds({ hero, work }: { hero: ReactNode; work: ReactNode }) {
  const track = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const heroLayer = useRef<HTMLDivElement>(null);
  const field = useRef<HTMLDivElement>(null);
  const clouds = useRef<(HTMLDivElement | null)[]>([]);
  const grain = useRef<HTMLDivElement>(null);
  const [lay, setLay] = useState<Layout | null>(null);
  // Place the freshly laid-out field for the current scroll position.
  useEffect(() => {
    if (lay) window.dispatchEvent(new Event("scroll"));
  }, [lay]);

  useScrollScene(
    track,
    stage,
    (p) => {
      const layer = heroLayer.current;
      if (layer) {
        layer.style.transform = `scale(${1 + 7 * easeIn(seg(p, 0.02, SWAP))})`;
        layer.style.visibility = p > SWAP ? "hidden" : "visible";
      }
      const H = stage.current?.offsetHeight ?? 0;
      if (!lay || !field.current) return;
      const top = H - seg(p, START, END) * (H + lay.F);
      field.current.style.transform = `translate3d(0, ${top}px, 0)`;
      // Silk grain over the scene while the clouds are up.
      if (grain.current) grain.current.style.opacity = String(Math.min(seg(p, START, 0.4), 1 - seg(p, 0.75, 0.95)));
      // Each cloud inks itself in as it comes up into view, and resets when
      // you scroll back above the start.
      lay.items.forEach((it, i) => {
        const el = clouds.current[i];
        if (!el) return;
        const on = p > START && top + it.y < H * 0.95;
        if (on !== el.hasAttribute("data-play")) el.toggleAttribute("data-play", on);
      });
    },
    () => {
      const s = stage.current;
      const layer = heroLayer.current;
      if (!s || !layer) return;
      const W = s.offsetWidth;
      const H = s.offsetHeight;
      if (!lay || lay.W !== W || lay.H !== H) setLay(layout(W, H));

      // Zoom toward the cloud under the immortal (the visible copy of the painting).
      const saved = layer.style.transform;
      layer.style.transform = "none";
      const img = [...layer.querySelectorAll("img")].find(
        (el) => el.src.includes("/personal/hero") && el.offsetWidth > 0,
      );
      if (img) {
        const a = img.getBoundingClientRect();
        const b = layer.getBoundingClientRect();
        layer.style.transformOrigin = `${a.left - b.left + a.width * 0.5}px ${a.top - b.top + a.height * 0.62}px`;
      }
      layer.style.transform = saved;
    },
    0.2,
  );

  return (
    <>
      <div ref={track} className="relative" style={{ height: "calc(100svh - 64px + 160svh)" }}>
        <div ref={stage} className="sticky top-16 z-10 h-[calc(100svh-64px)] overflow-hidden">
          <div ref={heroLayer} className="absolute inset-0 bg-cream will-change-transform">
            {hero}
          </div>
          {lay && (
            <div
              ref={field}
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 will-change-transform"
              style={{ height: lay.F, transform: "translate3d(0, 100vh, 0)" }}
            >
              {/* The sea: silk paper from under the surface clouds, lightening to
                  the Selected work section's cream, then a soft bottom edge. */}
              <div
                className="absolute inset-x-0"
                style={{
                  top: lay.U,
                  height: lay.B - lay.U,
                  background: `linear-gradient(to bottom, var(--cloud-paper) 30%, var(--color-cream-subtle) calc(100% - ${lay.fade}px), transparent)`,
                }}
              />
              {lay.items.map((it, i) => (
                <div
                  key={i}
                  ref={(el) => {
                    clouds.current[i] = el;
                  }}
                  className="absolute"
                  style={{ left: it.x, top: it.y, width: it.w, transform: it.flip ? "scaleX(-1)" : undefined }}
                >
                  <InkDrawing art={it.art} paper={it.paper} mist={it.mist} sweep={0.45 + it.art.w / 1600} className="block h-auto w-full" />
                </div>
              ))}
            </div>
          )}
          <div
            ref={grain}
            aria-hidden
            className="cloud-grain pointer-events-none absolute inset-0"
            style={{ opacity: 0 }}
          />
        </div>
      </div>
      {/* Slides up under the stage during the end of the pin, landing about
          halfway up as the clouds clear, so normal scrolling takes over. It
          trails the clouds by enough that their eased motion never drifts
          across its heading. */}
      <div className="relative z-0" style={{ marginTop: "calc((-100svh + 64px) * 0.55)" }}>
        {work}
      </div>
    </>
  );
}
