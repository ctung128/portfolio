"use client";

import { useRef, useState, type ReactNode } from "react";
import { HeroScene, expoOut, inOut, seg, useScene } from "@/components/home/HeroScene";
import "./hero-motion.css";

const STAGE = "sticky top-16 h-[calc(100svh-64px)] overflow-hidden";

/* ------------------------------------------------------------- B · Mist */

/** Load mist: x, y, w, h in % of the stage; fx/fy = how far it travels out
 * as it parts. They all clear completely, leaving the hero as it is. */
const BLOBS = [
  { x: -12, y: -6, w: 70, h: 64, fx: "-26vw", fy: "-8vh" },
  { x: 42, y: -14, w: 74, h: 66, fx: "24vw", fy: "-12vh" },
  { x: 50, y: 42, w: 70, h: 62, fx: "26vw", fy: "10vh" },
  { x: -18, y: 46, w: 68, h: 60, fx: "-24vw", fy: "12vh" },
  { x: 18, y: 18, w: 64, h: 60, fx: "0vw", fy: "-6vh" },
] as const;

/**
 * The live hero, untouched. Load: it sits in a bank of cream cloud (rimmed in
 * the painting's silk tone so it reads on the cream page) that parts outward
 * and clears. Scroll: the hero drifts up a little slower than the page while
 * a bank of mist rolls up from below, going solid in Selected work's cream,
 * so the section surfaces out of it with no edge.
 */
function Mist({ hero: heroNode, work }: { hero: ReactNode; work: ReactNode }) {
  const track = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const heroLayer = useRef<HTMLDivElement>(null);
  const bank = useRef<HTMLDivElement>(null);
  const fore = useRef<HTMLDivElement>(null);
  const H = useRef(0);

  useScene(
    track,
    stage,
    (p) => {
      const h = H.current;
      if (heroLayer.current) heroLayer.current.style.transform = p > 0 ? `translate3d(0, ${-p * h * 0.22}px, 0)` : "";
      // Bank top: just below the stage → 0.6 screens above it, where its
      // solid part covers everything.
      if (bank.current) bank.current.style.transform = `translate3d(0, ${h * 1.02 - seg(p, 0.04, 1) * h * 1.62}px, 0)`;
      if (fore.current) fore.current.style.transform = `translate3d(0, ${h * 1.1 - seg(p, 0, 0.8) * h * 1.9}px, 0)`;
    },
    () => {
      H.current = stage.current?.offsetHeight ?? 0;
    },
    { ease: 0.14 },
  );

  return (
    <>
      <div ref={track} className="relative" style={{ height: "calc((100svh - 64px) * 2.2)" }}>
        <div ref={stage} className={STAGE}>
          <div ref={heroLayer} className="absolute inset-0 will-change-transform">
            {heroNode}
          </div>

          {BLOBS.map((b, i) => (
            <div
              key={i}
              aria-hidden
              className="hm-clear pointer-events-none absolute"
              style={
                {
                  left: `${b.x}%`,
                  top: `${b.y}%`,
                  width: `${b.w}%`,
                  height: `${b.h}%`,
                  "--fx": b.fx,
                  "--fy": b.fy,
                  "--d": `${150 + i * 70}ms`,
                } as React.CSSProperties
              }
            >
              <div className="hm-cloud absolute inset-0" />
            </div>
          ))}
          <div aria-hidden className="hm-veil pointer-events-none absolute inset-0 bg-cream" />

          {/* Near wisps that overtake the bank, then the bank itself. */}
          <div ref={fore} aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-full will-change-transform" style={{ transform: "translate3d(0,110%,0)" }}>
            <div className="hm-cloud absolute" style={{ left: "-25%", top: 0, width: "90%", height: "28%" }} />
            <div className="hm-cloud absolute" style={{ left: "40%", top: "6%", width: "95%", height: "24%" }} />
          </div>
          <div ref={bank} aria-hidden className="hm-bank pointer-events-none absolute inset-x-0 top-0 h-[200%] will-change-transform" style={{ transform: "translate3d(0,102%,0)" }} />
        </div>
      </div>
      <div className="relative z-10 [&>section]:border-t-0" style={{ marginTop: "calc((-100svh + 64px) * 0.5)" }}>
        {work}
      </div>
    </>
  );
}

/* ------------------------------------------------- C · Bamboo blind */

const SLATS = 7;

/**
 * 竹帘, a bamboo blind. The hero is the live one, drawn once per slat and
 * clipped to a horizontal band of it, so at rest it is pixel-identical.
 * Load: each slat comes down into place from a few px above, top to bottom,
 * like a blind being let down. Scroll: the blind rolls up from the bottom:
 * each slat's content slides up out of its band, the lowest first, uncovering
 * Selected work already in place behind it (rising slightly from depth).
 * Only transforms move per frame.
 */
function Blind({ hero: heroNode, work }: { hero: ReactNode; work: ReactNode }) {
  const track = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const bands = useRef<(HTMLDivElement | null)[]>([]);
  const inner = useRef<(HTMLDivElement | null)[]>([]);
  const workWrap = useRef<HTMLDivElement>(null);
  const backing = useRef<HTMLDivElement>(null);
  const geo = useRef<{ bh: number; D: number } | null>(null);

  useScene(
    track,
    stage,
    (p, t) => {
      const g = geo.current;
      const st = stage.current;
      if (!g || !st) return;
      const { bh, D } = g;
      // Cream behind the slats while they come down, so the work stays hidden.
      if (backing.current) backing.current.style.display = t < 1800 ? "" : "none";
      // Work holds still behind the stage until the pin releases.
      const R = seg(p, 0.1, 0.9);
      if (workWrap.current)
        workWrap.current.style.transform = p < 1 ? `translate3d(0, ${-(1 - p) * D}px, 0) scale(${0.97 + 0.03 * inOut(R)})` : "";
      st.style.visibility = p >= 1 ? "hidden" : "visible";

      for (let i = 0; i < SLATS; i++) {
        const el = inner.current[i];
        if (!el) continue;
        // Load: top slat first, 70ms apart, from 18px above.
        const L = expoOut(seg(t, 120 + i * 70, 1200 + i * 70));
        // Scroll: bottom slat first; each one's lift overlaps the next.
        const k = SLATS - 1 - i;
        const U = inOut(seg(R, (k / SLATS) * 0.7, (k / SLATS) * 0.7 + 0.3));
        const y = -i * bh - 18 * (1 - L) - U * (bh + 2);
        el.style.transform = `translate3d(0, ${y}px, 0)`;
        el.style.opacity = String(L);
      }
    },
    () => {
      const st = stage.current;
      const tr = track.current;
      if (!st || !tr) return;
      const H = st.offsetHeight;
      const bh = Math.ceil(H / SLATS);
      geo.current = { bh, D: tr.offsetHeight - H };
      bands.current.forEach((b, i) => {
        if (!b) return;
        b.style.top = `${i * bh}px`;
        b.style.height = `${bh}px`;
      });
      // Each copy keeps only its own band, so a lifted slat uncovers the work
      // instead of the next slice of the hero.
      inner.current.forEach((el, i) => {
        if (el) el.style.clipPath = `inset(${i * bh}px 0 ${Math.max(0, H - (i + 1) * bh)}px 0)`;
      });
    },
    { loadMs: 1800 },
  );

  return (
    <>
      <div ref={track} className="relative z-20" style={{ height: "calc((100svh - 64px) * 2.2)" }}>
        <div ref={stage} className={STAGE}>
          <div ref={backing} aria-hidden className="absolute inset-0 bg-cream" />
          {Array.from({ length: SLATS }, (_, i) => (
            <div
              key={i}
              ref={(el) => {
                bands.current[i] = el;
              }}
              aria-hidden={i > 0 || undefined}
              className="absolute inset-x-0 overflow-hidden"
            >
              <div
                ref={(el) => {
                  inner.current[i] = el;
                }}
                className="h-[calc(100svh-64px)] bg-cream will-change-transform"
                style={{ opacity: 0 }}
              >
                {heroNode}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div ref={workWrap} className="relative z-0 origin-top" style={{ marginTop: "calc(-100svh + 64px)" }}>
        {work}
      </div>
    </>
  );
}

/* --------------------------------------------------------------- switcher */

const OPTIONS = [
  { id: "a", name: "Aperture" },
  { id: "b", name: "Mist" },
  { id: "c", name: "Bamboo blind" },
] as const;
type Id = (typeof OPTIONS)[number]["id"];

export function HeroMotionLab({ hero: heroNode, work }: { hero: ReactNode; work: ReactNode }) {
  const [pick, setPick] = useState<Id>("a");
  const [run, setRun] = useState(0);
  const replay = (id: Id) => {
    window.scrollTo({ top: 0, behavior: "instant" });
    setPick(id);
    setRun((r) => r + 1);
  };

  return (
    <>
      <div className="fixed bottom-5 left-1/2 z-50 flex -translate-x-1/2 gap-1 rounded-full border border-border bg-white/90 p-1 shadow-[0_6px_20px_-10px_rgba(37,37,37,0.3)] backdrop-blur">
        {OPTIONS.map((o) => (
          <button
            key={o.id}
            type="button"
            onClick={() => replay(o.id)}
            aria-pressed={pick === o.id}
            className="whitespace-nowrap rounded-full px-3.5 py-1.5 font-sans text-xs text-ink-soft transition-colors aria-pressed:bg-ink aria-pressed:text-cream sm:text-sm"
          >
            {o.id.toUpperCase()} · {o.name}
          </button>
        ))}
        <button type="button" onClick={() => replay(pick)} className="rounded-full px-3.5 py-1.5 font-sans text-xs text-matcha sm:text-sm">
          ↻ Replay
        </button>
      </div>
      <div key={`${pick}-${run}`}>
        {pick === "a" && <HeroScene hero={heroNode} work={work} />}
        {pick === "b" && <Mist hero={heroNode} work={work} />}
        {pick === "c" && <Blind hero={heroNode} work={work} />}
      </div>
    </>
  );
}
