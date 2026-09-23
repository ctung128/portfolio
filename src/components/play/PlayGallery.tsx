"use client";

import { useCallback, useRef, useState } from "react";
import { playProjects } from "@/content/site";
import { CaseStudyImage } from "@/components/case-study/CaseStudyImage";

// Premium hover scale: a slow, ease-out-expo settle rather than a snappy
// linear zoom — the same curve used for the frame-sequence animation.
const HOVER_SCALE = "transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]";

const PLAYBACK_RATE = 1.25;

function setPlaybackRate(video: HTMLVideoElement | null) {
  if (video) video.playbackRate = PLAYBACK_RATE;
}

export function PlayGallery() {
  const [cursor, setCursor] = useState({ x: 0, y: 0, visible: false });
  const frame = useRef<number | null>(null);

  const handleMove = useCallback((e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    if (frame.current) cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      setCursor((prev) => ({ ...prev, x: clientX, y: clientY, visible: true }));
    });
  }, []);

  const handleLeave = useCallback(() => {
    setCursor((prev) => ({ ...prev, visible: false }));
  }, []);

  return (
    <div className="mt-14 grid grid-cols-1 gap-10 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3">
      <div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-50 flex items-center gap-1.5 whitespace-nowrap rounded-full bg-ink px-4 py-2 font-sans text-sm text-cream shadow-[0_8px_24px_rgba(0,0,0,0.18)] transition-[opacity,transform] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{
          transform: `translate(${cursor.x}px, ${cursor.y}px) translate(-50%, -50%) scale(${
            cursor.visible ? 1 : 0.8
          })`,
          opacity: cursor.visible ? 1 : 0,
        }}
      >
        See it live
        <span aria-hidden>↗</span>
      </div>
      {playProjects.map((project) => {
        const Wrapper = project.href ? "a" : "div";
        return (
          <Wrapper
            key={project.title}
            {...(project.href
              ? {
                  href: project.href,
                  target: "_blank",
                  rel: "noreferrer",
                  onMouseMove: handleMove,
                  onMouseLeave: handleLeave,
                }
              : {})}
            className={`flex flex-col ${project.href ? "group cursor-none" : ""}`}
          >
            <div
              className={`aspect-[4/3] overflow-hidden rounded-[12px] ${
                project.video ? "bg-[#FDFDFD]" : ""
              }`}
            >
              {project.video ? (
                <video
                  ref={setPlaybackRate}
                  className={`h-full w-full rounded-[12px] border border-border object-contain ${HOVER_SCALE}`}
                  src={project.video}
                  aria-label={project.image.alt}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  onLoadedMetadata={(e) => setPlaybackRate(e.currentTarget)}
                />
              ) : (
                <CaseStudyImage
                  src={project.image.src}
                  alt={project.image.alt}
                  objectPosition={project.image.position}
                  imageClassName={HOVER_SCALE}
                  fill
                />
              )}
            </div>
            <div className="mt-4 flex items-baseline justify-between gap-3">
              <h2
                className={`font-serif text-xl text-ink ${
                  project.href ? "group-hover:text-ink-soft" : ""
                }`}
              >
                {project.title}
              </h2>
              {project.href && (
                <span aria-hidden className="font-sans text-sm text-ink-faint">
                  ↗
                </span>
              )}
            </div>
            <p className="mt-1 font-sans text-xs uppercase tracking-wider text-ink-faint">
              {project.tag}
            </p>
          </Wrapper>
        );
      })}
    </div>
  );
}
