import type { CaseStudyBlock } from "@/content/case-studies/types";
import { CaseStudyImage } from "./CaseStudyImage";
import { CaseStudyHeroMockup } from "./CaseStudyHeroMockup";

export function BlockRenderer({ block }: { block: CaseStudyBlock }) {
  switch (block.type) {
    case "paragraph":
      return (
        <p className="font-sans text-base leading-relaxed text-ink-soft sm:text-lg">
          {block.text}
        </p>
      );

    case "subheading":
      return (
        <h3
          className={`${block.spaced ? "mt-14!" : ""} ${
            block.style === "heading"
              ? "font-sans text-lg font-semibold text-ink sm:text-xl"
              : "font-sans text-sm font-semibold uppercase tracking-wider text-ink"
          }`}
        >
          {block.text}
        </h3>
      );

    case "quote":
      return (
        <blockquote className="border-l-2 border-green py-1 pl-5 font-serif text-xl italic leading-snug text-ink sm:text-2xl">
          &ldquo;{block.text}&rdquo;
          {block.attribution && (
            <footer className="mt-2 font-sans text-sm not-italic text-ink-faint">
              — {block.attribution}
            </footer>
          )}
        </blockquote>
      );

    case "stats":
      return (
        <div className="grid grid-cols-2 gap-6 border-y border-border py-6 sm:grid-cols-3">
          {block.items.map((stat) => (
            <div key={stat.label}>
              <div className="font-serif text-3xl text-green sm:text-4xl">{stat.value}</div>
              <div className="mt-1 font-sans text-sm text-ink-soft">{stat.label}</div>
            </div>
          ))}
        </div>
      );

    case "list":
      return block.ordered ? (
        <ol className="list-decimal space-y-2 pl-5 font-sans text-base leading-relaxed text-ink-soft sm:text-lg">
          {block.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ol>
      ) : (
        <ul className="list-disc space-y-2 pl-5 font-sans text-base leading-relaxed text-ink-soft sm:text-lg">
          {block.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      );

    case "insights":
      return (
        <div className="space-y-8">
          {block.items.map((item) => (
            <div key={item.label}>
              <p className="font-sans text-xs uppercase tracking-wider text-ink-faint">
                {item.label}
              </p>
              <div className="mt-2 flex items-start gap-3">
                <span aria-hidden className="mt-1 font-sans text-ink-faint">
                  →
                </span>
                <div>
                  <p className="font-serif text-xl italic leading-snug text-ink sm:text-2xl">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                  <p className="mt-2 font-sans text-sm leading-relaxed text-ink-soft sm:text-base">
                    {item.body}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      );

    case "image":
      return (
        <CaseStudyImage
          src={block.src}
          alt={block.alt}
          caption={block.caption}
          label={block.label}
          wide={block.wide}
          background={block.background}
          backgroundImageWidth={block.backgroundImageWidth}
          shadow={block.shadow}
        />
      );

    case "mockup":
      return (
        <CaseStudyHeroMockup
          video={block.video}
          frames={block.frames}
          scrollImage={block.scrollImage}
          background={block.background}
          alt={block.alt}
          label={block.label}
          variant={block.variant}
          className="rounded-[24px] border border-border py-16 sm:py-20"
          frameHoldMs={block.frameHoldMs}
          frameTransitionMs={block.frameTransitionMs}
          frameMotion={block.frameMotion}
        />
      );

    case "gallery":
      return (
        <div
          className={`grid grid-cols-2 gap-3 sm:gap-4 ${
            block.columns === 2 ? "" : "sm:grid-cols-3"
          }`}
        >
          {block.images.map((image) => (
            <CaseStudyImage key={image.src} src={image.src} alt={image.alt} />
          ))}
        </div>
      );

    case "comparison":
      return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {block.groups.map((group, i) => (
            <div
              key={group.label}
              className="rounded-[16px] border border-border bg-cream-subtle p-5 sm:p-6"
            >
              <p className="font-sans text-xs uppercase tracking-wider text-ink-faint">
                {i + 1} — {group.label}
              </p>
              <div className="mt-4 grid grid-cols-2 gap-3">
                {group.images.map((image) => (
                  <CaseStudyImage key={image.src} src={image.src} alt={image.alt} />
                ))}
              </div>
              {group.caption && (
                <p className="mt-4 font-sans text-sm leading-relaxed text-ink-soft">
                  {group.caption}
                </p>
              )}
            </div>
          ))}
        </div>
      );

    default:
      return null;
  }
}
