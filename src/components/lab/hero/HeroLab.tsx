"use client";

import { useEffect, useState, type ReactNode } from "react";
import { MountainHero } from "./variants";
import { CardHero } from "@/components/home/CardHero";
import "./hero-lab.css";

type Kind = "mountains" | "card";
/** Mountains is parked: kept (MountainHero in variants.tsx) but off the bar. */
const SHOWN: Kind[] = ["card"];

/**
 * /lab/hero: hero directions over the real Selected work. Card is the
 * painting and copy as two soft cards, diving into the painting on scroll;
 * Mountains (parked) goes "into the moon". The bar switches between them
 * and replays the load-in.
 */
export function HeroLab({ work }: { work: ReactNode }) {
  const [kind, setKind] = useState<Kind>("card");
  const [run, setRun] = useState(0);

  // Header: clear at the very top of the page, the usual translucent cream
  // once scrolled.
  useEffect(() => {
    const root = document.documentElement;
    root.dataset.lab = "";
    const onScroll = () => {
      if (scrollY > 8) root.dataset.labScrolled = "";
      else delete root.dataset.labScrolled;
    };
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
    return () => {
      removeEventListener("scroll", onScroll);
      delete root.dataset.lab;
      delete root.dataset.labScrolled;
    };
  }, []);

  const show = (k: Kind) => {
    window.scrollTo({ top: 0, behavior: "instant" });
    setKind(k);
    setRun((r) => r + 1);
  };

  return (
    <>
      {kind === "mountains" ? <MountainHero key={run} work={work} /> : <CardHero key={run} work={work} />}
      <div className="fixed bottom-5 left-1/2 z-50 flex max-w-[calc(100vw-32px)] -translate-x-1/2 items-center gap-1 overflow-x-auto rounded-full border border-border bg-cream/90 p-1 shadow-[0_6px_20px_-10px_rgba(37,37,37,0.3)] backdrop-blur">
        {SHOWN.map((k) => (
          <button
            key={k}
            type="button"
            onClick={() => show(k)}
            aria-pressed={kind === k}
            className="whitespace-nowrap rounded-full px-3.5 py-1.5 font-sans text-xs text-ink-soft transition-colors aria-pressed:bg-ink aria-pressed:text-cream sm:text-sm"
          >
            {k === "mountains" ? "Mountains" : "Card"}
          </button>
        ))}
        <span aria-hidden className="mx-1 h-5 w-px shrink-0 bg-border" />
        <button type="button" onClick={() => show(kind)} className="whitespace-nowrap rounded-full px-3.5 py-1.5 font-sans text-xs text-matcha sm:text-sm">
          ↻ Replay
        </button>
      </div>
    </>
  );
}
