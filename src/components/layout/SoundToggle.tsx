"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { NOTE_AUDIO_PLAY } from "@/components/notes/NoteAudio";

/**
 * "Sound [off] / [on]" toggle after isablyns.vercel.app, playing a few tracks
 * from my "monk" playlist (public/audio/, in playlist order) on a loop.
 * Nothing downloads until the first tap; pausing fades out and keeps the
 * spot, so the next tap fades back in where it left off. Lives in the
 * header, which persists across client navigations, so the music keeps
 * going from page to page.
 */

const TRACKS = [
  "01-merry-christmas-mr-lawrence",
  "02-marginalia-163",
  "03-reflections",
  "04-marginalia-192",
  "05-mori-no-mezame",
  "06-path-of-the-wind",
  "07-landscape-with-a-fairy",
].map((name) => `/audio/${name}.mp3`);

const VOLUME = 0.6;
const FADE_MS = 600;

function NoteIcon({ playing }: { playing: boolean }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="currentColor"
      aria-hidden
      className={`size-3.5 shrink-0 origin-bottom transition-opacity duration-200 ${
        playing ? "animate-[note-bob_1.1s_ease-in-out_infinite] motion-reduce:animate-none" : "opacity-40"
      }`}
    >
      {/* Two beamed eighth notes. */}
      <path d="M5.5 3.2 14 1.2v9.3a2.1 2.1 0 1 1-1.2-1.9V4.4L6.7 5.8v6.7a2.1 2.1 0 1 1-1.2-1.9z" />
    </svg>
  );
}

export function SoundToggle() {
  const audio = useRef<HTMLAudioElement | null>(null);
  const track = useRef(0);
  const fade = useRef<number | null>(null);
  const [on, setOn] = useState(false);

  /** Ramps volume to `to`, then calls `done`. A timer rather than
   *  requestAnimationFrame, which stalls in background tabs. (iOS ignores
   *  volume, so there it simply starts/stops.) */
  const rampTo = useCallback((to: number, done?: () => void) => {
    const a = audio.current!;
    if (fade.current) clearInterval(fade.current);
    const from = a.volume;
    const start = performance.now();
    fade.current = window.setInterval(() => {
      const t = Math.min(1, (performance.now() - start) / FADE_MS);
      a.volume = from + (to - from) * t;
      if (t === 1) {
        clearInterval(fade.current!);
        fade.current = null;
        done?.();
      }
    }, 30);
  }, []);

  const getAudio = useCallback(() => {
    if (!audio.current) {
      const a = new Audio(TRACKS[0]);
      a.preload = "auto";
      a.volume = 0;
      a.addEventListener("ended", () => {
        track.current = (track.current + 1) % TRACKS.length;
        a.src = TRACKS[track.current];
        a.play().catch(() => setOn(false));
      });
      audio.current = a;
    }
    return audio.current;
  }, []);

  const toggle = useCallback(() => {
    const a = getAudio();
    if (on) {
      setOn(false);
      rampTo(0, () => a.pause());
    } else {
      setOn(true);
      a.play()
        .then(() => rampTo(VOLUME))
        .catch(() => setOn(false));
    }
  }, [on, getAudio, rampTo]);

  // A note's read-aloud starting fades the music out.
  useEffect(() => {
    const stop = () => {
      if (!on || !audio.current) return;
      const a = audio.current;
      setOn(false);
      rampTo(0, () => a.pause());
    };
    window.addEventListener(NOTE_AUDIO_PLAY, stop);
    return () => window.removeEventListener(NOTE_AUDIO_PLAY, stop);
  }, [on, rampTo]);

  useEffect(
    () => () => {
      if (fade.current) clearInterval(fade.current);
      audio.current?.pause();
    },
    [],
  );

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={on}
      aria-label={on ? "Turn background music off" : "Turn background music on"}
      className="hidden h-7 sm:inline-flex items-center gap-[7px] whitespace-nowrap rounded-[4px] bg-[#f1f3f0] px-2.5 font-sans text-[11px] uppercase leading-none tracking-[0.06em] text-ink transition-opacity duration-150 select-none active:opacity-45 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
    >
      <NoteIcon playing={on} />
      <span aria-hidden>
        <span className="hidden sm:inline">Sound </span>[{on ? "on" : "off"}]
      </span>
    </button>
  );
}
