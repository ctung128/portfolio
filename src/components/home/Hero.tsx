"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { hero, personalPhotos, siteConfig } from "@/content/site";
import { PersonalCarousel } from "./PersonalCarousel";

const TITLE_MAX = 40;
const TITLE_MIN = 13;
const SUBHEAD_MAX = 18;
const SUBHEAD_MIN = 11;

function fitToContainer(
  container: HTMLElement,
  text: HTMLElement,
  max: number,
  min: number
) {
  const width = container.clientWidth;
  let size = max;
  text.style.fontSize = `${size}px`;
  while (text.scrollWidth > width && size > min) {
    size -= 0.5;
    text.style.fontSize = `${size}px`;
  }
  return size;
}

export function Hero() {
  const titleContainerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subheadContainerRef = useRef<HTMLDivElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const [titleSize, setTitleSize] = useState(TITLE_MAX);
  const [subheadSize, setSubheadSize] = useState(SUBHEAD_MAX);

  useLayoutEffect(() => {
    const fit = () => {
      const titleContainer = titleContainerRef.current;
      const title = titleRef.current;
      if (titleContainer && title) {
        setTitleSize(fitToContainer(titleContainer, title, TITLE_MAX, TITLE_MIN));
      }

      const subheadContainer = subheadContainerRef.current;
      const subhead = subheadRef.current;
      if (subheadContainer && subhead) {
        setSubheadSize(fitToContainer(subheadContainer, subhead, SUBHEAD_MAX, SUBHEAD_MIN));
      }
    };

    fit();
    const ro = new ResizeObserver(fit);
    if (titleContainerRef.current) ro.observe(titleContainerRef.current);
    return () => ro.disconnect();
  }, []);

  return (
    <section className="mx-auto max-w-5xl px-4 pb-16 pt-16 sm:px-6 sm:pb-20 sm:pt-20">
      <div ref={titleContainerRef} className="w-full min-w-0">
        <h1
          ref={titleRef}
          className="block whitespace-nowrap font-serif leading-[1.15] text-ink"
          style={{ fontSize: titleSize }}
        >
          {hero.headline}
        </h1>
      </div>

      <div ref={subheadContainerRef} className="mt-5 w-full min-w-0">
        <p
          ref={subheadRef}
          className="block whitespace-nowrap font-sans leading-relaxed"
          style={{ fontSize: subheadSize }}
        >
          <span className="font-semibold text-ink">{hero.subheadBold}</span>{" "}
          <span className="text-ink-faint">{hero.subheadMuted}</span>
        </p>
      </div>

      <a
        href={siteConfig.calendly}
        target="_blank"
        rel="noreferrer"
        className="btn-slide mt-7 inline-flex items-center gap-1.5 rounded-[12px] bg-ink px-5 py-2.5 font-sans text-sm text-cream"
      >
        <span className="btn-slide-viewport"><span>Reach out</span></span>
        <span className="btn-slide-viewport" aria-hidden><span>↗</span></span>
      </a>

      <PersonalCarousel photos={personalPhotos} />
    </section>
  );
}
