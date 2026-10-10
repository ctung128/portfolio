"use client";

import { useEffect, useRef, useState } from "react";
import { playPage, playProjects, type PlayProject } from "@/content/site";
import { LazyVideo } from "@/components/LazyVideo";

// Layout after dinmukhamed.me/craft: a sticky left column, a two-up grid of
// 4:3 tiles, and an "open" chip on the projects you can visit.

const EASE = "ease-[cubic-bezier(0.22,1,0.36,1)]";

function hostOf(href: string) {
  return new URL(href).hostname.replace(/^www\./, "");
}

function ExpandIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className="h-3 w-3"
    >
      <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
    </svg>
  );
}

function Cover({ project, className }: { project: PlayProject; className: string }) {
  return project.video ? (
    <LazyVideo className={className} src={project.video} aria-label={project.image.alt} />
  ) : (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={project.image.src}
      alt={project.image.alt}
      loading="lazy"
      className={className}
      style={{ objectPosition: project.image.position }}
    />
  );
}

/** The whole card is the link when the project has one, so the chip itself
 *  stays decorative. */
function Card({
  project,
  className,
  style,
  children,
}: {
  project: PlayProject;
  className: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}) {
  return project.href ? (
    <a href={project.href} target="_blank" rel="noreferrer" className={`group ${className}`} style={style}>
      {children}
    </a>
  ) : (
    <div className={className} style={style}>
      {children}
    </div>
  );
}

function Aside({ children }: { children?: React.ReactNode }) {
  return (
    <aside className="md:sticky md:top-28 md:h-fit md:w-[220px] md:shrink-0">
      <h1 style={{ "--n": 0 } as React.CSSProperties} className="intro-item font-serif text-[26px] text-ink sm:text-[30px] lg:text-4xl">
        {playPage.headline}
      </h1>
      <p
        style={{ "--n": 1 } as React.CSSProperties}
        className="intro-item mt-3 font-sans text-[15px] leading-relaxed text-ink-soft"
      >
        {playPage.description}
      </p>
      <div style={{ "--n": 2 } as React.CSSProperties} className="intro-item">
        {children}
      </div>
    </aside>
  );
}

function Shell({
  aside,
  gridRef,
  children,
}: {
  aside: React.ReactNode;
  gridRef: React.Ref<HTMLDivElement>;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-10 md:flex-row md:gap-14">
      {aside}
      <div ref={gridRef} className="grid flex-1 grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2">
        {children}
      </div>
    </div>
  );
}

/** The sticky column carries an All / View live filter, so visitors can jump
 *  to things they can actually use. The chip is a solid ink pill that slides
 *  open on hover to show where it goes. */

export function PlayGallery() {
  const [filter, setFilter] = useState<"all" | "open">("all");
  const openCount = playProjects.filter((p) => p.href).length;
  const shown = filter === "open" ? playProjects.filter((p) => p.href) : playProjects;
  const gridRef = useTileReveal(filter);

  return (
    <Shell
      gridRef={gridRef}
      aside={
        <Aside>
          <div
            role="radiogroup"
            aria-label="Filter projects"
            className="mt-6 inline-flex rounded-full bg-[#f1f3f0] p-1 font-sans text-xs"
          >
            {(
              [
                ["all", `All ${playProjects.length}`],
                ["open", `View live ${openCount}`],
              ] as const
            ).map(([k, label]) => (
              <button
                key={k}
                role="radio"
                aria-checked={filter === k}
                onClick={() => setFilter(k)}
                className={`rounded-full px-3 py-1.5 transition-colors ${
                  filter === k ? "bg-cream text-ink shadow-[0_1px_2px_rgba(37,37,37,0.12)]" : "text-ink-soft hover:text-ink"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </Aside>
      }
    >
      {shown.map((p, i) => (
        <Card
          key={p.title}
          project={p}
          className="play-tile flex flex-col gap-3"
          style={
            {
              "--col": i % 2,
              "--from-tilt": `${i % 2 ? 5 : -5}deg`,
              "--hop-tilt": `${i % 2 ? 1.5 : -1.5}deg`,
            } as React.CSSProperties
          }
        >
          <div className="play-cover relative aspect-[4/3] overflow-hidden rounded-[14px] bg-[#f1f3f0]">
            {p.href && (
              <span className="pointer-events-none absolute right-3 top-3 z-10 inline-flex items-center rounded-full bg-ink py-1.5 pl-2.5 pr-3 font-sans text-xs text-cream shadow-[0_6px_16px_-6px_rgba(0,0,0,0.35)]">
                <ExpandIcon />
                <span className="ml-1.5">open</span>
                <span
                  className={`grid grid-cols-[0fr] transition-[grid-template-columns] duration-300 ${EASE} group-hover:grid-cols-[1fr]`}
                >
                  <span className="overflow-hidden whitespace-nowrap text-cream/60">
                    &nbsp;{hostOf(p.href)}
                  </span>
                </span>
              </span>
            )}
            <Cover
              project={p}
              className={`h-full w-full object-cover transition-transform duration-500 ${EASE} group-hover:scale-[1.04]`}
            />
          </div>
          <div className="flex items-baseline justify-between gap-3">
            <h2 className="font-sans text-[15px] font-normal leading-snug text-ink">{p.title}</h2>
            {p.href && (
              <span className="mt-0.5 h-1.5 w-1.5 shrink-0 self-center rounded-full bg-matcha" aria-hidden />
            )}
          </div>
          <p className="-mt-2 font-sans text-[11px] uppercase tracking-wider text-ink-faint">{p.tag}</p>
        </Card>
      ))}
    </Shell>
  );
}

/** Each tile drops in tilted the first time it scrolls into view, staggered
 * across the row, and springs to rest (`.play-tile` in globals.css). Re-runs
 * when the filter brings tiles back so new ones get observed too. */
function useTileReveal(filter: string) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const grid = ref.current;
    if (!grid) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.setAttribute("data-in", "");
          io.unobserve(e.target);
        }
      },
      { rootMargin: "0px 0px 60px 0px" },
    );
    for (const tile of grid.children) if (!tile.hasAttribute("data-in")) io.observe(tile);
    return () => io.disconnect();
  }, [filter]);
  return ref;
}
