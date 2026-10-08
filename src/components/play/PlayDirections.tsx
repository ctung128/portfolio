"use client";

import Link from "next/link";
import { useState } from "react";
import { playPage, playProjects, type PlayProject } from "@/content/site";
import { LazyVideo } from "@/components/LazyVideo";
import { ARROW_NE } from "@/lib/glyphs";

// Temporary: three takes on dinmukhamed.me/craft's layout (sticky left
// column, two-up grid of 4:3 tiles, an "open" chip on the clickable ones).
// Keep the picked one, delete the rest and the switcher in app/play/page.tsx.

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

/** The whole card is the link when the project has one (the reference's
 *  stretched-link pattern), so the chip itself stays decorative. */
function Card({
  project,
  className,
  children,
  id,
}: {
  project: PlayProject;
  className: string;
  children: React.ReactNode;
  id?: string;
}) {
  return project.href ? (
    <a id={id} href={project.href} target="_blank" rel="noreferrer" className={`group ${className}`}>
      {children}
    </a>
  ) : (
    <div id={id} className={className}>
      {children}
    </div>
  );
}

function Aside({ children }: { children?: React.ReactNode }) {
  return (
    <aside className="md:sticky md:top-28 md:h-fit md:w-[220px] md:shrink-0">
      <h1 className="font-serif text-[28px] leading-tight text-ink md:text-[30px]">
        {playPage.headline.trim()}
      </h1>
      <p className="mt-3 font-sans text-[15px] leading-relaxed text-ink-soft">
        {playPage.description}
      </p>
      {children}
    </aside>
  );
}

function Shell({ aside, children }: { aside: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-10 md:flex-row md:gap-14">
      {aside}
      <div className="grid flex-1 grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2">{children}</div>
    </div>
  );
}

/* ── A · Faithful ──────────────────────────────────────────────────────
   Closest to the reference: each cover sits matted inside a pale sunk tile,
   a cream "open" pill with the expand glyph, a bold sans caption. */

export function DirectionA() {
  return (
    <Shell
      aside={
        <Aside>
          <Link href="/" className="link-underline mt-5 inline-block font-sans text-sm">
            return
          </Link>
        </Aside>
      }
    >
      {playProjects.map((p) => (
        <Card key={p.title} project={p} className="flex flex-col gap-3">
          <div
            className={`relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-xl bg-[#f1f3f0] ring-1 ring-transparent transition-shadow duration-150 group-hover:ring-border-strong`}
          >
            {p.href && (
              <span className="pointer-events-none absolute right-3 top-3 z-10 inline-flex items-center gap-1.5 rounded-full bg-cream px-2.5 py-1.5 font-sans text-xs text-ink-faint ring-1 ring-border transition-colors duration-150 group-hover:text-ink">
                <ExpandIcon />
                open
              </span>
            )}
            <Cover
              project={p}
              className={`h-[74%] w-[80%] rounded-[8px] object-cover shadow-[0_1px_2px_rgba(37,37,37,0.06),0_12px_28px_-14px_rgba(37,37,37,0.3)] transition-transform duration-500 ${EASE} group-hover:scale-[1.03]`}
            />
          </div>
          <div>
            <h2 className="font-sans text-[15px] font-semibold leading-snug text-ink">{p.title}</h2>
            <p className="mt-1 font-sans text-[11px] uppercase tracking-wider text-ink-faint">
              {p.tag}
            </p>
          </div>
        </Card>
      ))}
    </Shell>
  );
}

/* ── B · Catalogue ─────────────────────────────────────────────────────
   Leans on the homepage's museum-catalogue (図録) framing: the sticky column
   doubles as a numbered index, covers run full bleed, captions read like
   plate labels, and the chip is a hairline-ruled tag. */

export function DirectionB() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <Shell
      aside={
        <Aside>
          <ol className="mt-8 hidden border-t border-border pt-4 md:block">
            {playProjects.map((p, i) => (
              <li key={p.title}>
                <a
                  href={`#plate-${i + 1}`}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  className={`flex gap-3 py-1 font-sans text-[13px] leading-snug transition-colors ${
                    hovered === i ? "text-matcha" : "text-ink-soft hover:text-ink"
                  }`}
                >
                  <span className="w-5 shrink-0 tabular-nums text-ink-faint">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="truncate">{p.title}</span>
                  {p.href && <span className="ml-auto shrink-0 text-ink-faint">{ARROW_NE}</span>}
                </a>
              </li>
            ))}
          </ol>
        </Aside>
      }
    >
      {playProjects.map((p, i) => (
        <Card
          key={p.title}
          id={`plate-${i + 1}`}
          project={p}
          className="flex scroll-mt-28 flex-col"
        >
          <div
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            className={`relative aspect-[4/3] overflow-hidden rounded-[12px] border transition-colors duration-200 ${
              hovered === i ? "border-ink-faint" : "border-border"
            }`}
          >
            {p.href && (
              <span className="pointer-events-none absolute right-3 top-3 z-10 inline-flex items-center gap-1 border border-ink/15 bg-cream/95 px-2 py-1 font-sans text-[10px] uppercase tracking-[0.12em] text-ink-soft backdrop-blur-sm transition-colors duration-150 group-hover:border-matcha group-hover:text-matcha">
                open <span aria-hidden>{ARROW_NE}</span>
              </span>
            )}
            <Cover
              project={p}
              className={`h-full w-full object-cover transition-transform duration-500 ${EASE} group-hover:scale-[1.04]`}
            />
          </div>
          <div className="mt-3 flex gap-3 border-t border-border pt-3">
            <span className="w-6 shrink-0 font-sans text-xs tabular-nums text-ink-faint">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <h2 className="font-serif text-xl leading-snug text-ink">{p.title}</h2>
              <p className="mt-1 font-sans text-[11px] uppercase tracking-wider text-ink-faint">
                {p.tag}
              </p>
            </div>
          </div>
        </Card>
      ))}
    </Shell>
  );
}

/* ── C · Open first ────────────────────────────────────────────────────
   The sticky column carries an All / Open filter, so visitors can jump to
   things they can actually use. The chip is a solid ink pill that slides
   open on hover to show where it goes. */

export function DirectionC() {
  const [filter, setFilter] = useState<"all" | "open">("all");
  const openCount = playProjects.filter((p) => p.href).length;
  const shown = filter === "open" ? playProjects.filter((p) => p.href) : playProjects;

  return (
    <Shell
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
                ["open", `Open ${openCount}`],
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
      {shown.map((p) => (
        <Card key={p.title} project={p} className="flex flex-col gap-3">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[14px] bg-[#f1f3f0]">
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
            <h2 className="font-sans text-[15px] font-medium leading-snug text-ink">{p.title}</h2>
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
