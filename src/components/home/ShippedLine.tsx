"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { hero } from "@/content/site";

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

/** The live dot (pulsing matcha ring) plus the line typing itself in once and
 * leaving a blinking caret: "recently updated" on arrival and at rest. */
export function ShippedLine({ className = "text-[15px]" }: { className?: string }) {
  const days = useDaysSinceShipped();
  const when = days === null ? "recently" : relativeDay(days);
  const { name, href } = hero.shipped;

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
    const tick = () => {
      i += 1;
      setN(i);
      if (i < total) timer = window.setTimeout(tick, i === lead.length ? 260 : 45);
    };
    timer = window.setTimeout(tick, 700);
    return () => window.clearTimeout(timer);
  }, [total, lead.length]);

  return (
    <p className={`relative pl-4 font-sans leading-snug text-ink-soft ${className}`}>
      <span>
        <span aria-hidden className="shipped-dot" />
        <span className="shipped-lead">{lead.slice(0, n)}</span>
        {n > lead.length && (
          <>
            <a href={href} target="_blank" rel="noreferrer" className="link-underline">
              {name}
            </a>
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
