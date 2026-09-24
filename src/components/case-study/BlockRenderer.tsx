import type { CaseStudyBlock } from "@/content/case-studies/types";
import { CaseStudyImage, FLOAT_CLASS } from "./CaseStudyImage";
import { CaseStudyHeroMockup } from "./CaseStudyHeroMockup";

export function BlockRenderer({ block }: { block: CaseStudyBlock }) {
  switch (block.type) {
    case "paragraph": {
      const at = block.link ? block.text.indexOf(block.link.text) : -1;
      return (
        <p className="font-sans text-base leading-relaxed text-ink-soft sm:text-lg">
          {block.link && at >= 0 ? (
            <>
              {block.text.slice(0, at)}
              <a
                href={block.link.href}
                target="_blank"
                rel="noreferrer"
                className="text-ink underline decoration-border-strong underline-offset-4 transition-colors hover:decoration-ink"
              >
                {block.link.text}
              </a>
              {block.text.slice(at + block.link.text.length)}
            </>
          ) : (
            block.text
          )}
        </p>
      );
    }

    case "subheading":
      return (
        <h3
          className={`${block.spaced ? "mt-14!" : ""} ${
            block.style === "heading"
              ? "font-serif text-2xl text-ink sm:text-3xl"
              : block.style === "label"
                ? "font-sans text-xs uppercase tracking-widest text-ink-faint"
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
          frame={block.frame}
        />
      );

    case "video":
      return (
        <figure>
          <video
            className="w-full rounded-[12px] border border-border"
            src={block.src}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label={block.alt}
          />
          {block.caption && (
            <figcaption className="mt-3 font-sans text-sm text-ink-soft">{block.caption}</figcaption>
          )}
        </figure>
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
              {block.float ? (
                <div className="mt-4 flex flex-col items-center justify-center gap-4 px-2 py-4">
                  {group.images.map((image) => (
                    <CaseStudyImage
                      key={image.src}
                      src={image.src}
                      alt={image.alt}
                      imageClassName={FLOAT_CLASS}
                    />
                  ))}
                </div>
              ) : (
                <div className="mt-4 grid grid-cols-2 gap-3">
                  {group.images.map((image) => (
                    <CaseStudyImage key={image.src} src={image.src} alt={image.alt} />
                  ))}
                </div>
              )}
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
