"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { hero } from "@/content/site";
import { PreviewLink } from "@/components/about/PreviewLink";

const WORDS = ["zero", "one", "two", "three", "four", "five", "six"];

/** Whole calendar days from `iso` (YYYY-MM-DD) to today, in the viewer's time zone. */
function daysSince(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  const then = new Date(y, m - 1, d);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return Math.round((today.getTime() - then.getTime()) / 86_400_000);
}

function relativeDay(days: number) {
  if (days <= 0) return "today";
  if (days === 1) return "yesterday";
  if (days < 7) return `${WORDS[days]} days ago`;
  if (days < 14) return "last week";
  if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
  if (days < 60) return "last month";
  return `${Math.floor(days / 30)} months ago`;
}

const noopSubscribe = () => () => {};

/** Days since shipping, counted on the client. The server (and the first
 * hydration pass) gets null and renders "recently", so the static HTML never
 * bakes in a stale date. */
function useDaysSinceShipped() {
  return useSyncExternalStore(
    noopSubscribe,
    () => daysSince(hero.shipped.date),
    () => null,
  );
}

const TYPING_SRC = "/audio/sfx/typing.mp3";
const TYPING_VOLUME = 0.6;

/** Soft keyboard clicks while the line types in, faded out as it finishes.
 * Browsers only allow sound after the visitor has interacted with the page,
 * so on a first, untouched visit this stays silent. */
function typingSound() {
  let ctx: AudioContext | null = null;
  let gain: GainNode | null = null;
  let stopped = false;
  const bytes = fetch(TYPING_SRC).then((r) => r.arrayBuffer());
  return {
    async start() {
      const activation = (navigator as Navigator & { userActivation?: { hasBeenActive: boolean } }).userActivation;
      if (!activation?.hasBeenActive) return;
      ctx = new AudioContext();
      const buffer = await ctx.decodeAudioData((await bytes).slice(0));
      if (stopped) return;
      const source = ctx.createBufferSource();
      gain = ctx.createGain();
      gain.gain.value = TYPING_VOLUME;
      source.buffer = buffer;
      source.connect(gain).connect(ctx.destination);
      source.start();
    },
    stop(fadeS = 0.25) {
      stopped = true;
      if (!ctx || !gain) return;
      const now = ctx.currentTime;
      gain.gain.setValueAtTime(gain.gain.value, now);
      gain.gain.linearRampToValueAtTime(0, now + fadeS);
      const c = ctx;
      window.setTimeout(() => c.close(), fadeS * 1000 + 50);
    },
  };
}

/** The live dot (pulsing matcha ring) plus the line typing itself in once and
 * leaving a blinking caret: "recently updated" on arrival and at rest. With
 * `sound`, soft keyboard clicks play while it types. */
export function ShippedLine({ className = "text-[15px]", sound = false }: { className?: string; sound?: boolean }) {
  const days = useDaysSinceShipped();
  const when = days === null ? "recently" : relativeDay(days);
  const { name, href, preview } = hero.shipped;

  const lead = "Just shipped ";
  // Non-breaking spaces keep the date phrase together when the line wraps.
  const tail = ` ${when.replaceAll(" ", "\u00a0")}`;
  const total = lead.length + 1 + tail.length; // the product (name + mark) is one step
  const [n, setN] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const done = window.setTimeout(() => setN(total), 0);
      return () => window.clearTimeout(done);
    }
    let i = 0;
    let timer = 0;
    const keys = sound ? typingSound() : null;
    const tick = () => {
      if (i === 0) keys?.start().catch(() => {});
      i += 1;
      setN(i);
      if (i < total) timer = window.setTimeout(tick, i === lead.length ? 260 : 45);
      else keys?.stop();
    };
    timer = window.setTimeout(tick, 700);
    return () => {
      window.clearTimeout(timer);
      keys?.stop(0.05);
    };
  }, [total, lead.length, sound]);

  return (
    <p className={`relative pl-4 font-sans leading-snug text-ink-soft ${className}`}>
      <span>
        <span aria-hidden className="shipped-dot" />
        <span className="shipped-lead font-faux-medium">{lead.slice(0, n)}</span>
        {n > lead.length && (
          <>
            <PreviewLink href={href} preview={preview}>
              {name}
            </PreviewLink>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/pebble-mark.webp" alt="" width={18} height={18} className="shipped-mark" />
          </>
        )}
        {n > lead.length + 1 && tail.slice(0, n - lead.length - 1)}
        <span className="shipped-caret" />
      </span>
    </p>
  );
}
