"use client";

import { useEffect, useRef, useState } from "react";

/** Fired when a note's audio starts, so the header's background music fades out. */
export const NOTE_AUDIO_PLAY = "note-audio:play";

// Deep teal from the cover's own blue-green, eased out so the scrim has no visible edge.
const SCRIM = "linear-gradient(90deg,rgba(16,38,52,0.6) 0.0%,rgba(16,38,52,0.444) 7.0%,rgba(16,38,52,0.324) 14.0%,rgba(16,38,52,0.228) 21.0%,rgba(16,38,52,0.15) 28.0%,rgba(16,38,52,0.09) 35.0%,rgba(16,38,52,0.048) 42.0%,rgba(16,38,52,0.018) 49.0%,rgba(16,38,52,0.0) 56.0%)";
// Faint grain keeps the soft gradient from banding.
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

const R = 32;
const C = 2 * Math.PI * R;

const fmt = (t: number) => `${Math.floor(t / 60)}:${String(Math.floor(t % 60)).padStart(2, "0")}`;

/**
 * Banner player after Substack's podcast header: the cover sharp on the right,
 * a blurred, tinted copy of it on the left behind the serif title, then a
 * round play button with a progress ring and the clip length.
 */
export function NoteAudio({
  title,
  description,
  src,
  cover,
  duration,
  sentenceStarts,
}: {
  title: string;
  description: string;
  src: string;
  cover: string;
  /** Seconds, shown until the file's own metadata loads. */
  duration: number;
  /** Seconds each read-along sentence starts at (see `ReadAlong` in NoteBody). */
  sentenceStarts?: number[];
}) {
  const audio = useRef<HTMLAudioElement>(null);
  const root = useRef<HTMLElement>(null);
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [length, setLength] = useState(duration);

  useEffect(() => () => audio.current?.pause(), []);

  // Read-along: each frame, mark the note's sentences read / current / unread
  // from the playhead, and keep the current one in the middle of the screen.
  useEffect(() => {
    if (!sentenceStarts || !started) return;
    const spans = [...(root.current?.closest("article")?.querySelectorAll<HTMLElement>("[data-sentence]") ?? [])];
    let raf = 0;
    let last = -2;
    const tick = () => {
      const t = audio.current!.currentTime;
      const cur = sentenceStarts.findLastIndex((s) => s <= t);
      if (cur !== last) {
        last = cur;
        spans.forEach((el, i) => (el.dataset.state = i < cur ? "read" : i === cur ? "current" : "unread"));
        const r = spans[cur]?.getBoundingClientRect();
        if (r && (r.top < innerHeight * 0.16 || r.bottom > innerHeight * 0.62))
          scrollBy({ top: r.top - innerHeight * 0.3, behavior: "smooth" });
      }
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => {
      cancelAnimationFrame(raf);
      spans.forEach((el) => delete el.dataset.state);
    };
  }, [sentenceStarts, started]);

  const toggle = () => {
    const a = audio.current!;
    if (a.paused) a.play().catch(() => setPlaying(false));
    else a.pause();
  };

  const bg = { backgroundImage: `url(${cover})` };

  return (
    <section
      ref={root}
      aria-label={`${title} audio`}
      className="relative isolate overflow-hidden rounded-[8px] text-white"
    >
      <div aria-hidden style={bg} className="absolute inset-0 -z-30 bg-cover bg-right" />
      {/* Blurred copy fades out toward the right; on phones it fills in behind the text under the sharp strip. */}
      <div
        aria-hidden
        style={bg}
        className="absolute -inset-10 -z-20 bg-cover bg-right blur-[28px] saturate-[1.15] sm:[mask-image:linear-gradient(90deg,#000_0%,#000_32%,transparent_54%)]"
      />
      <div aria-hidden style={{ "--scrim": SCRIM } as React.CSSProperties} className="absolute inset-0 -z-10 bg-[rgba(16,38,52,.4)] sm:bg-(image:--scrim)" />
      <div
        aria-hidden
        style={{ backgroundImage: GRAIN }}
        className="pointer-events-none absolute inset-0 opacity-[.07] mix-blend-overlay"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 rounded-[8px] ring-1 ring-white/10 ring-inset" />
      {/* Phones: the whole cover, sharp, across the top, melting into the blur below. */}
      <div
        aria-hidden
        style={bg}
        className="aspect-[2.56] bg-cover bg-center [mask-image:linear-gradient(180deg,#000_55%,transparent)] sm:hidden"
      />

      <div className="px-6 pt-2 pb-8 sm:max-w-[62%] sm:px-[8%] sm:py-10">
        <h2 className="font-serif text-[26px] leading-tight sm:text-[30px] lg:text-4xl">{title}</h2>
        <p className="mt-2 font-sans text-[15px] leading-relaxed text-white/85 sm:text-base">{description}</p>

        <div className="mt-6 flex items-center gap-4">
          <button
            type="button"
            onClick={toggle}
            aria-label={playing ? "Pause" : "Play"}
            className="relative grid size-[52px] shrink-0 cursor-pointer place-items-center rounded-full bg-[#13262f] shadow-[0_4px_14px_rgba(10,28,38,.28)] transition-transform duration-150 hover:scale-[1.04] focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-white"
          >
            <svg
              viewBox="0 0 68 68"
              aria-hidden
              className={`pointer-events-none absolute -inset-[5px] size-[calc(100%+10px)] -rotate-90 transition-opacity duration-200 ${started ? "opacity-100" : "opacity-0"}`}
            >
              <circle cx="34" cy="34" r={R} fill="none" strokeWidth="2" className="stroke-white/20" />
              <circle
                cx="34"
                cy="34"
                r={R}
                fill="none"
                strokeWidth="2"
                strokeLinecap="round"
                className="stroke-white"
                strokeDasharray={C}
                strokeDashoffset={C * (1 - progress)}
              />
            </svg>
            <svg viewBox="0 0 24 24" aria-hidden className="size-5" fill="currentColor">
              {playing ? (
                <>
                  <rect x="6" y="4" width="4" height="16" rx="1.2" />
                  <rect x="14" y="4" width="4" height="16" rx="1.2" />
                </>
              ) : (
                <path d="M7 4.5v15a1 1 0 0 0 1.5.86l12.5-7.5a1 1 0 0 0 0-1.72L8.5 3.64A1 1 0 0 0 7 4.5z" />
              )}
            </svg>
          </button>

          <p className="flex items-center gap-2 font-sans text-xs uppercase tracking-wider tabular-nums text-white/85">
            <svg
              viewBox="0 0 24 24"
              aria-hidden
              className="size-4 shrink-0"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
              <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
            </svg>
            {fmt(length)}
          </p>
        </div>
      </div>

      <audio
        ref={audio}
        src={src}
        preload="metadata"
        onLoadedMetadata={(e) => isFinite(e.currentTarget.duration) && setLength(e.currentTarget.duration)}
        onPlay={() => {
          setPlaying(true);
          setStarted(true);
          window.dispatchEvent(new Event(NOTE_AUDIO_PLAY));
        }}
        onPause={() => setPlaying(false)}
        onTimeUpdate={(e) => {
          const a = e.currentTarget;
          if (a.duration) setProgress(a.currentTime / a.duration);
        }}
        onEnded={(e) => {
          setStarted(false);
          setProgress(0);
          e.currentTarget.currentTime = 0;
        }}
      />
    </section>
  );
}
