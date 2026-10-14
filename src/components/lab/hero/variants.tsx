"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { hero } from "@/content/site";
import { ShippedLine } from "@/components/home/ShippedLine";

const d = (ms: number, extra?: CSSProperties) => ({ "--d": `${ms}ms`, ...extra }) as CSSProperties;

/** 童雪玲 stacked by hand (Safari misplaces vertical-rl in this font). */
function VerticalName({ className = "" }: { className?: string }) {
  return (
    <span lang="zh-Hans" className={`flex flex-col items-center font-zh leading-none ${className}`}>
      {[...hero.chineseName].map((ch, i) => (
        <span key={i} className="block pb-[0.06em]">
          {ch}
        </span>
      ))}
    </span>
  );
}

/* --------------------------------------------------------- the mountains */

/** Laozi, Tao Te Ching 11, in my own plain rendering. */
const PASSAGE =
  "We shape clay into a vessel, yet it is the emptiness within that makes it useful. We cut doors and windows to make a room, yet it is the space inside that lets us live there. What is there gives form; what is not there gives use. ";

/** Each mountain is its ridge drawn again a line lower, and every copy is a
 * line of the passage, so the words build the mountain's body. Coordinates
 * are in a 1440×900 drawing. */
const MOUNTAINS = [
  { id: "far", lines: 6, d: "M-40 360 C 120 320, 220 210, 300 162 C 330 144, 370 144, 410 172 C 500 240, 600 360, 740 450 C 900 550, 1100 610, 1480 650" },
  { id: "mid", lines: 4, d: "M-40 660 C 40 600, 100 520, 150 495 C 180 482, 214 490, 250 520 C 350 610, 470 730, 600 960" },
  { id: "right", lines: 4, d: "M760 960 C 860 870, 960 780, 1050 742 C 1084 728, 1124 732, 1160 760 C 1250 840, 1360 885, 1480 905" },
] as const;
type MountainId = (typeof MOUNTAINS)[number]["id"];

const DROP = 64; // the drawing sits a header's height down
const LINE_GAP = 26;
const MOON = { x: 720, y: 150 + DROP, r: 40 };

const LINES = MOUNTAINS.flatMap((m, mi) =>
  Array.from({ length: m.lines }, (_, k) => ({
    mountain: m.id as MountainId,
    k,
    d: m.d,
    phase: -((k * 173 + mi * 311) % 640),
    opacity: Math.max(0.2, 1 - k * 0.15),
  })),
);

/**
 * How the 1440×900 drawing sits on a w×h stage. Landscape: scaled to cover,
 * like SVG's "slice". Portrait (phones, tall tablets): the name stacks over
 * the top, so the drawing is framed on the peak and the moon, with the moon
 * low enough to clear the name block.
 */
function view(w: number, h: number) {
  if (w / h >= 1.05) {
    const k = Math.max(w / 1440, h / 900);
    return { k, ox: (w - 1440 * k) / 2, oy: (h - 900 * k) / 2 };
  }
  const k = Math.min(0.85, (h / 900) * 0.78);
  return { k, ox: w / 2 - 560 * k, oy: h * 0.66 - MOON.y * k };
}

/**
 * Draws a mountain's text lines onto its canvas once: each character placed
 * and turned along its ridge (SVG geometry for the curve, canvas for the
 * glyphs). Moving a finished bitmap is free; live SVG text-on-path was being
 * re-rasterised on every scroll frame.
 */
function paintMountain(canvas: HTMLCanvasElement, id: MountainId, ink: string, family: string) {
  const w = canvas.clientWidth;
  const h = canvas.clientHeight;
  const dpr = Math.min(2, devicePixelRatio || 1);
  canvas.width = Math.round(w * dpr);
  canvas.height = Math.round(h * dpr);
  const ctx = canvas.getContext("2d")!;
  const { k, ox, oy } = view(w, h);
  ctx.setTransform(dpr * k, 0, 0, dpr * k, dpr * ox, dpr * oy);
  ctx.fillStyle = ink;
  ctx.textBaseline = "alphabetic";
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  svg.setAttribute("style", "position:absolute;width:0;height:0;visibility:hidden");
  svg.appendChild(path);
  document.body.appendChild(svg);
  // Keep glyphs at least ~10px on screen when the drawing is shown small;
  // the contour spacing grows with them so lines never collide.
  const grow = Math.max(1, 10 / (14 * k));
  const text = PASSAGE.repeat(2);
  for (const l of LINES.filter((x) => x.mountain === id)) {
    path.setAttribute("d", l.d);
    const total = path.getTotalLength();
    ctx.font = `${l.k === 0 ? "italic " : ""}${(l.k === 0 ? 15 : 14) * grow}px ${family}`;
    ctx.globalAlpha = l.opacity;
    const dy = DROP + l.k * LINE_GAP * grow;
    let at = l.phase;
    for (const ch of text) {
      const cw = ctx.measureText(ch).width;
      const mid = at + cw / 2;
      at += cw;
      if (mid < 0) continue;
      if (mid > total) break;
      const a = path.getPointAtLength(Math.max(0, mid - 1));
      const b = path.getPointAtLength(Math.min(total, mid + 1));
      const c = path.getPointAtLength(mid);
      ctx.save();
      ctx.translate(c.x, c.y + dy);
      ctx.rotate(Math.atan2(b.y - a.y, b.x - a.x));
      ctx.fillText(ch, -cw / 2, 0);
      ctx.restore();
    }
  }
  svg.remove();
}

/** A mountain layer: a canvas painted once, repainted on resize and when
 * the fonts load. */
function MountainLayer({ id, depth, delay }: { id: MountainId; depth: number; delay: number }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current!;
    let cancelled = false;
    const paint = () => {
      if (cancelled) return;
      const cs = getComputedStyle(c);
      paintMountain(c, id, cs.color, cs.fontFamily);
    };
    document.fonts.ready.then(paint);
    paint();
    const ro = new ResizeObserver(paint);
    ro.observe(c);
    return () => {
      cancelled = true;
      ro.disconnect();
    };
  }, [id]);
  return (
    <div aria-hidden data-layer={id} data-depth={depth} className="hl-L pointer-events-none">
      <canvas ref={ref} className="hl-rise absolute inset-0 h-full w-full font-serif text-[var(--s-ink)]" style={d(delay)} />
    </div>
  );
}

const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);
const clamp01 = (t: number) => Math.min(1, Math.max(0, t));

/**
 * The text-mountains hero, pinned for a screen of scroll while it hands over
 * to Selected work by going into the moon: the moon swells until it fills
 * the view while the mountains rush past (the nearer, the faster) and the
 * name lifts away; the header steps aside, the passage's opening line
 * surfaces inside the moon, then Selected work slides up over it as a sheet,
 * like the live site's aperture. Each frame sets transforms, opacity and the
 * moon's radius directly (no inherited CSS variables, which made every glyph
 * restyle).
 */
export function MountainHero({ work }: { work: ReactNode }) {
  const track = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = matchMedia("(pointer: fine)").matches;
    const st = stage.current!;
    const layers = [...st.querySelectorAll<HTMLElement>("[data-layer]")].map((el) => ({
      el,
      name: el.dataset.layer!,
      depth: Number(el.dataset.depth ?? 0),
    }));
    const views = [...st.querySelectorAll<SVGGElement>("[data-view]")];
    const moon = st.querySelector<SVGCircleElement>("[data-moon]")!;
    const text = st.querySelector<HTMLElement>("[data-text]")!;
    const inside = st.querySelector<HTMLElement>("[data-inside]")!;
    let raf = 0;
    let navHidden = false;
    let v = view(st.clientWidth, st.clientHeight);
    const ptr = { x: 0, y: 0, tx: 0, ty: 0 };
    /** How fast each layer rushes past. */
    const RUSH: Record<string, number> = { far: 1.6, mid: 3.2, right: 5.5 };

    const layout = () => {
      v = view(st.clientWidth, st.clientHeight);
      views.forEach((g) => g.setAttribute("transform", `translate(${v.ox} ${v.oy}) scale(${v.k})`));
    };

    const render = () => {
      raf = 0;
      const r = track.current!.getBoundingClientRect();
      const span = Math.max(1, r.height - innerHeight);
      const p = reduce ? 0 : clamp01(-r.top / span);
      ptr.x += (ptr.tx - ptr.x) * 0.12;
      ptr.y += (ptr.ty - ptr.y) * 0.12;
      const W = st.clientWidth;
      const H = st.clientHeight;
      const e = ease(clamp01(p / 0.62));
      const mx = v.ox + MOON.x * v.k;
      const my = v.oy + MOON.y * v.k;

      // The moon grows by radius, redrawn crisp each frame (scaling it as a
      // layer pixelated its edge), until it covers the farthest corner.
      const cover = Math.hypot(Math.max(mx, W - mx), Math.max(my, H - my)) / v.k + 20;
      moon.setAttribute("r", (MOON.r * Math.pow(cover / MOON.r, e)).toFixed(1));
      if (e > 0.01) moon.removeAttribute("filter");
      else moon.setAttribute("filter", "url(#hl-rough)");

      for (const L of layers) {
        let t = `translate3d(${-ptr.x * L.depth}px, ${-ptr.y * L.depth * 0.6}px, 0)`;
        let o = 1;
        if (L.name !== "moon") {
          L.el.style.transformOrigin = `${mx + 12}px ${my + 12}px`;
          t += ` scale(${1 + e * (RUSH[L.name] ?? 1)})`;
          o = clamp01(1 - e * (L.name === "far" ? 1.3 : 1.8));
        }
        L.el.style.transform = t;
        L.el.style.opacity = String(o);
      }

      text.style.transform = `translate3d(0, ${-0.28 * H * p}px, 0)`;
      text.style.opacity = String(clamp01(1 - p * 3.6));
      inside.style.opacity = String(clamp01((p - 0.42) * 6) * clamp01((0.86 - p) * 6));
      inside.style.transform = `translate3d(0, calc(-50% + ${(1 - clamp01((p - 0.42) * 3)) * 24}px), 0)`;

      const hideNav = p > 0.38 && p < 0.9;
      if (hideNav !== navHidden) {
        navHidden = hideNav;
        if (hideNav) document.documentElement.dataset.labNav = "hidden";
        else delete document.documentElement.dataset.labNav;
      }

      if (Math.abs(ptr.tx - ptr.x) > 0.001 || Math.abs(ptr.ty - ptr.y) > 0.001) raf = requestAnimationFrame(render);
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(render);
    };
    const onResize = () => {
      layout();
      kick();
    };
    const onPointer = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || reduce || !fine) return;
      ptr.tx = (e.clientX / innerWidth) * 2 - 1;
      ptr.ty = (e.clientY / innerHeight) * 2 - 1;
      kick();
    };
    layout();
    render();
    addEventListener("scroll", kick, { passive: true });
    addEventListener("resize", onResize);
    st.addEventListener("pointermove", onPointer);
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("scroll", kick);
      removeEventListener("resize", onResize);
      st.removeEventListener("pointermove", onPointer);
      delete document.documentElement.dataset.labNav;
    };
  }, []);

  return (
    <>
      <div ref={track} className="relative -mt-16 h-[200svh]">
        <div ref={stage} className="hl-ridge sticky top-0 h-[100svh] overflow-hidden bg-[var(--s-ground)] text-[var(--s-ink)]">
          <div aria-hidden className="hl-grain pointer-events-none absolute inset-0" />

          <div aria-hidden data-layer="moon" data-depth={4} className="hl-L pointer-events-none">
            <svg className="absolute inset-0 h-full w-full overflow-visible">
              <defs>
                <filter id="hl-rough">
                  <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="2" seed="4" />
                  <feDisplacementMap in="SourceGraphic" scale="6" />
                </filter>
              </defs>
              <g data-view>
                <g className="hl-rise" style={d(900)}>
                  <circle data-moon cx={MOON.x} cy={MOON.y} r={MOON.r} fill="var(--s-moon)" filter="url(#hl-rough)" className="hl-moon-disc" />
                </g>
              </g>
            </svg>
          </div>
          <MountainLayer id="far" depth={6} delay={300} />
          <MountainLayer id="mid" depth={9} delay={560} />
          <MountainLayer id="right" depth={12} delay={820} />

          <p
            aria-hidden
            data-inside
            className="pointer-events-none absolute inset-x-0 top-1/2 z-10 mx-auto max-w-[760px] px-8 text-center font-serif text-[26px] italic leading-snug text-[var(--s-ground)] opacity-0 sm:text-[40px]"
          >
            We shape clay into a vessel, yet it is the emptiness within that makes it useful.
          </p>

          {/* The block is as wide as the tagline's one line, so "Based in New
              York" can hang from its top-right corner: its right edge meets
              the end of "craft.", and it drops 0.13em of the name so its cap
              line meets 童's first full stroke. */}
          <div data-text className="absolute inset-x-0 top-0 z-10 mx-auto max-w-6xl px-6 pt-[calc(64px+5svh)] sm:px-10 sm:pt-[calc(64px+13svh)]">
            <div className="hl-plate relative z-0 flex flex-col gap-5 sm:ml-auto sm:w-max sm:gap-6">
              <p className="hl-rise absolute right-0 top-[7px] text-right font-sans text-[12px] uppercase leading-[1.4] tracking-[0.08em] text-[var(--s-soft)] sm:top-[11px]">
                Based in
                <br />
                New York
              </p>
              <h1 className="flex items-end gap-4 sm:gap-5">
                <VerticalName className="hl-name text-[52px] sm:text-[88px]" />
                <span className="hl-rise pb-2 font-serif text-[42px] leading-[0.92] sm:text-[64px]" style={d(650)}>
                  Carolyn
                  <br />
                  Tung
                </span>
              </h1>
              <div
                className="hl-rise font-sans text-[15px] leading-snug [--color-ink-faint:var(--s-soft)] [--color-ink-soft:var(--s-soft)] [--color-ink:var(--s-ink)]"
                style={d(850)}
              >
                <p className="text-pretty sm:whitespace-nowrap">{hero.tagline}</p>
                <div className="mt-3">
                  <ShippedLine />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 -mt-[50svh] overflow-hidden rounded-t-[24px] shadow-[0_-24px_60px_-28px_rgba(37,37,37,0.35)] [&>section]:border-t-0">
        {work}
      </div>
    </>
  );
}

