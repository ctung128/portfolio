"use client";

import { useEffect, useRef, useState } from "react";
import { hero, playProjects, recommendations, type RecommendationItem } from "@/content/site";
import { ShippedLine } from "@/components/home/ShippedLine";
import { SidequestArrow } from "@/components/about/SidequestArrow";
import "./color-lab.css";

/* Round 2 of the colour + motion lab: one direction. The site keeps its own
   colours; what's new is motion (taped About cards that drop in tilted,
   spring to rest and straighten on hover; spinning ✱ bullets; hopping
   books) and, on About only, an optional matcha card fill. */

/** Marks itself in view once (data-in), which plays its reveal. */
function Reveal({
  i = 0,
  tilt = 5,
  className = "",
  children,
}: {
  i?: number;
  tilt?: number;
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.setAttribute("data-in", "");
        io.disconnect();
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={`cl-reveal ${className}`}
      style={{ "--i": i, "--from-tilt": `${tilt}deg` } as React.CSSProperties}
    >
      {children}
    </div>
  );
}

/** A taped card pinned at `tilt`; straightens and lifts on hover. */
function Card({
  tone,
  tilt = 0,
  tape = false,
  className = "",
  children,
}: {
  tone?: string;
  tilt?: number;
  tape?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      data-tone={tone}
      className={`cl-card ${className}`}
      style={
        { "--tilt": `${tilt}deg`, "--tape-tilt": `${tilt >= 0 ? -3 : 3}deg` } as React.CSSProperties
      }
    >
      {tape ? <span aria-hidden className="cl-tape" /> : null}
      {children}
    </div>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="mb-4 font-sans text-xs uppercase tracking-wider text-ink-faint">{children}</p>;
}

const TILTS = [-3, 2, -1.5, 2.5, -2, 1.5];

function Sidequests({ items }: { items: RecommendationItem[] }) {
  const [active, setActive] = useState<number | null>(null);
  return (
    <div
      className="mt-4 grid grid-cols-1 min-[420px]:grid-cols-[minmax(0,1fr)_132px] min-[420px]:gap-5 sm:grid-cols-[minmax(0,1fr)_148px]"
      onMouseLeave={() => setActive(null)}
    >
      <ul className="space-y-3">
        {items.map((item, i) => (
          <li key={item.title} className="cl-row flex gap-3">
            <span aria-hidden className="cl-star mt-0.5 shrink-0 text-sm">
              ✱
            </span>
            <p className="font-sans text-[15px] leading-relaxed text-ink-soft">
              <button
                type="button"
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(active === i ? null : i)}
                aria-pressed={active === i}
                className="link-underline text-left"
              >
                {item.title}
              </button>
            </p>
          </li>
        ))}
      </ul>
      {/* Same idle slot as the live About page: on hover it tilts, turns
          matcha, spins its ✱ and redraws the arrow. */}
      <div className="group relative hidden self-center min-[420px]:block" style={{ aspectRatio: "3 / 4" }}>
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-2 rounded-[8px] border border-dashed border-border-strong text-center transition-[opacity,rotate,scale,border-color,background-color] duration-300 ease-[cubic-bezier(0.22,0.8,0.3,1)] group-hover:-rotate-2 group-hover:scale-[1.03] group-hover:border-matcha group-hover:bg-matcha/5 motion-reduce:group-hover:rotate-0 motion-reduce:group-hover:scale-100"
          style={{ opacity: active === null ? 1 : 0 }}
        >
          <SidequestArrow />
          <span
            aria-hidden
            className="inline-block text-matcha group-hover:animate-[asterisk-spin_1.6s_linear_infinite] motion-reduce:!animate-none"
          >
            ✱
          </span>
          <span className="px-3 font-sans text-xs text-matcha">hover a sidequest</span>
        </div>
        {items.map((item, i) =>
          item.photo ? (
            <div
              key={item.title}
              aria-hidden={active !== i}
              className="cl-print absolute left-1/2 top-1/2 rounded-[6px] border border-border bg-white p-1.5 shadow-[0_1px_2px_rgba(37,37,37,0.06),0_8px_24px_-12px_rgba(37,37,37,0.25)]"
              style={{
                width: item.photo.ratio > 1 ? "118%" : "100%",
                opacity: active === i ? 1 : 0,
                visibility: active === i ? "visible" : "hidden",
                transform: `translate(-50%, -50%) translateY(${active === i ? 0 : 14}px) scale(${active === i ? 1 : 0.94}) rotate(${TILTS[i % TILTS.length]}deg)`,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.photo.src}
                alt={item.title}
                loading="lazy"
                className="block h-auto w-full rounded-[3px] object-cover"
                style={{ aspectRatio: String(item.photo.ratio) }}
              />
            </div>
          ) : null,
        )}
      </div>
    </div>
  );
}

const WORK = [
  { title: "SplitEV", src: "/case-studies/splitev/cover.webp", year: "Shipped 2025" },
  { title: "MySupplementals", src: "/case-studies/mysupplementals/cover.webp", year: "Shipped 2026" },
];

const SHELF = [
  "book-of-tea",
  "wabi-sabi",
  "in-praise-of-shadows",
  "kafka-on-the-shore",
  "siddhartha",
  "strange-weather-in-tokyo",
  "brilliant-friend",
  "pure-colour",
  "rebecca",
  "subplot",
  "whale",
  "temporary",
];

/** Lift for image tiles outside the About cards (no fill, no tape). */
const LIFT =
  "transition-[translate,box-shadow] duration-500 [transition-timing-function:var(--spring)] hover:-translate-y-1.5 hover:shadow-[0_2px_4px_rgba(37,37,37,0.06),0_28px_48px_-22px_rgba(37,37,37,0.38)] motion-reduce:hover:translate-y-0";

export function ColorLab() {
  const [aboutTone, setAboutTone] = useState<"white" | "matcha">("white");
  const play = [playProjects[0], playProjects[2], playProjects[6], playProjects[3]];
  const tone = aboutTone === "matcha" ? "matcha" : undefined;

  return (
    <div className="cl mx-auto max-w-5xl space-y-20 px-6 pb-24 pt-12 sm:space-y-28 sm:px-8 sm:pt-16">
      <section className="max-w-2xl">
        <p className="font-sans text-xs uppercase tracking-wider text-ink-faint">Lab · round 2</p>
        <h1 className="mt-2 font-serif text-[30px] text-ink sm:text-4xl">Motion, original colours</h1>
        <p className="mt-4 font-sans text-base leading-relaxed text-ink-soft">
          No doodles, and the site keeps its own colours. Cards drop in tilted as you scroll and
          spring to rest; the taped About cards straighten and lift on hover. Bullets spin, books hop.
          Matcha is offered on the About cards only.
        </p>
      </section>

      {/* About */}
      <section>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <p className="font-sans text-xs uppercase tracking-wider text-ink-faint">About · cards</p>
          <div className="flex gap-1 rounded-full border border-border bg-white p-1">
            {(["white", "matcha"] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setAboutTone(t)}
                aria-pressed={aboutTone === t}
                className="flex items-center gap-1.5 rounded-full px-3 py-1 font-sans text-xs capitalize text-ink-soft transition-colors aria-pressed:bg-ink aria-pressed:text-cream"
              >
                <span
                  className="h-3 w-3 rounded-full border border-black/10"
                  style={{ background: t === "matcha" ? "#edf3e4" : "var(--color-cream-subtle)" }}
                />
                {t}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8">
          <Reveal i={0} tilt={-6}>
            <Card tone={tone} tilt={-1.2} tape className="h-full p-6 sm:p-8">
              <h3 className="font-serif text-xl lg:text-2xl">Listening</h3>
              <ul className="mt-4 space-y-3">
                {recommendations.listening.map((item) => (
                  <li key={item.title} className="cl-row flex gap-3">
                    <span aria-hidden className="cl-star mt-0.5 shrink-0 text-sm">
                      ✱
                    </span>
                    <p className="font-sans text-[15px] leading-relaxed text-ink-soft">
                      <span className="font-medium text-ink">{item.title}</span> {item.detail}
                    </p>
                  </li>
                ))}
              </ul>
            </Card>
          </Reveal>
          <Reveal i={1} tilt={6}>
            <Card tone={tone} tilt={1.4} tape className="h-full p-6 sm:p-8">
              <h3 className="font-serif text-xl lg:text-2xl">Sidequesting</h3>
              <Sidequests items={recommendations.learning} />
            </Card>
          </Reveal>
        </div>
      </section>

      {/* Home hero, as it is now with a regular-weight tagline */}
      <section>
        <Eyebrow>Home · hero (tagline regular weight, same size as the shipped line)</Eyebrow>
        <div className="flex flex-col rounded-[12px] border border-border sm:flex-row">
          <div className="flex items-center border-b border-border p-4 sm:w-[55%] sm:border-b-0 sm:border-r">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={hero.artwork.src} alt={hero.artwork.alt} className="block h-auto w-full" />
          </div>
          <div className="flex flex-1 flex-col">
            <div className="flex-1 p-5">
              <p className="text-pretty font-sans text-[15px] font-normal leading-snug text-ink">{hero.tagline}</p>
              <div className="mt-3">
                <ShippedLine />
              </div>
            </div>
            <div className="border-t border-border p-5 font-sans text-[15px] leading-relaxed">
              <p className="font-semibold text-ink">{hero.subheadBold}</p>
              <p className="text-ink-soft">{hero.location}</p>
              <p className="mt-6 border-t border-border pt-3 text-[13px] text-ink-faint">{hero.artwork.caption}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Selected work */}
      <section className="-mx-6 border-y border-border bg-cream-subtle px-6 py-12 sm:-mx-8 sm:px-8 sm:py-16">
        <h2 className="font-serif text-[26px] text-ink sm:text-[30px] lg:text-4xl">Selected work</h2>
        <div className="mt-8 grid gap-10 sm:grid-cols-2">
          {WORK.map((w, n) => (
            <Reveal key={w.title} i={n} tilt={n ? 4 : -4}>
              <div className="group">
                <div className={`aspect-[16/9] overflow-hidden rounded-[12px] border border-border ${LIFT}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={w.src}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
                  />
                </div>
                <div className="mt-4 flex items-baseline justify-between gap-4">
                  <h3 className="font-serif text-xl text-ink group-hover:text-ink-soft">{w.title}</h3>
                  <span className="font-sans text-sm text-ink-faint">{w.year}</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Play */}
      <section>
        <Eyebrow>Play · tiles</Eyebrow>
        <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2">
          {play.map((p, n) => (
            <Reveal key={p.title} i={n % 2} tilt={TILTS[n] * 1.5}>
              <div className="group">
                <div className={`aspect-[4/3] overflow-hidden rounded-[12px] border border-border ${LIFT}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.image.src}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                    style={{ objectPosition: p.image.position }}
                  />
                </div>
                <p className="mt-3 font-sans text-[15px] font-medium text-ink">{p.title}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Library */}
      <section>
        <div className="mb-4 flex items-baseline justify-between gap-3">
          <p className="font-sans text-xs uppercase tracking-wider text-ink-faint">Library · shelf</p>
          <p className="font-sans text-xs text-ink-faint">Tap a book to open it</p>
        </div>
        <div className="grid grid-cols-4 gap-1 rounded-[12px] sm:grid-cols-6 sm:gap-1.5">
          {SHELF.map((b, n) => (
            <Reveal key={b} i={n % 6} tilt={n % 2 ? 6 : -6}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/library/covers/${b}.webp`}
                alt=""
                className="cl-book block aspect-[2/3] w-full rounded-[6px] object-cover"
              />
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
