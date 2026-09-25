import type { CaseStudyBlock } from "@/content/case-studies/types";
import { BrowserFrame, CaseStudyImage, FLOAT_CLASS } from "./CaseStudyImage";
import { CaseStudyHeroMockup } from "./CaseStudyHeroMockup";
import { LazyVideo } from "@/components/LazyVideo";

function StatusChip({ status }: { status: "rejected" | "shipped" }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center rounded-full px-2.5 py-0.5 align-middle font-sans text-[11px] font-medium uppercase tracking-wider ${
        status === "shipped"
          ? "bg-ink text-cream"
          : "border border-border-strong text-ink-faint"
      }`}
    >
      {status === "shipped" ? "Shipped" : "Rejected"}
    </span>
  );
}

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

    case "subheading": {
      const heading = (
        <h3
          className={`${block.spaced && !block.kicker ? "mt-14!" : ""} ${
            block.style === "heading"
              ? "font-serif text-[22px] text-ink sm:text-[26px] lg:text-3xl"
              : block.style === "label"
                ? "font-sans text-xs uppercase tracking-widest text-ink-faint"
                : "font-sans text-sm font-semibold uppercase tracking-wider text-ink"
          } ${block.status ? "flex flex-wrap items-center gap-3" : ""}`}
        >
          {block.text}
          {block.status && <StatusChip status={block.status} />}
        </h3>
      );
      if (!block.kicker) return heading;
      return (
        <div className={block.spaced ? "mt-14!" : ""}>
          <p className="mb-2 font-sans text-xs uppercase tracking-widest text-ink-faint">
            {block.kicker}
          </p>
          {heading}
        </div>
      );
    }

    case "quote":
      return (
        <blockquote className="border-l-2 border-green py-1 pl-5 font-serif text-xl italic leading-snug text-ink sm:text-[22px] lg:text-2xl">
          &ldquo;{block.text}&rdquo;
          {block.attribution && (
            <footer className="mt-2 font-sans text-sm not-italic text-ink-faint">
              — {block.attribution}
            </footer>
          )}
        </blockquote>
      );

    case "callout":
      return (
        <div className="border-l-2 border-green py-1 pl-5">
          <p className="font-sans text-xs font-semibold uppercase tracking-wider text-ink">
            {block.label}
          </p>
          <p className="mt-3 font-serif text-xl leading-snug text-ink sm:text-[22px] lg:text-2xl">
            {block.text}
          </p>
        </div>
      );

    case "details":
      return (
        <dl className="grid grid-cols-2 gap-x-6 gap-y-6 pt-4 sm:grid-cols-3">
          {block.items.map((item) => (
            <div
              key={item.label}
              className={Array.isArray(item.value) ? "col-span-2 sm:col-span-1" : undefined}
            >
              <dt className="font-sans text-xs uppercase tracking-wider text-ink-faint">
                {item.label}
              </dt>
              <dd className="mt-1 space-y-1 font-sans text-sm text-ink">
                {Array.isArray(item.value)
                  ? item.value.map((line) => <div key={line}>{line}</div>)
                  : item.value}
              </dd>
            </div>
          ))}
        </dl>
      );

    case "stats":
      return (
        <div className="grid grid-cols-2 gap-6 border-y border-border py-6 sm:grid-cols-3">
          {block.items.map((stat) => (
            <div key={stat.label}>
              <div className="font-serif text-[28px] text-green sm:text-[32px] lg:text-4xl">{stat.value}</div>
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
      ) : block.marker === "arrow" ? (
        <ul className="space-y-2 font-sans text-base leading-relaxed text-ink-soft sm:text-lg">
          {block.items.map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <span aria-hidden className="text-ink-faint">
                →
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
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
                  {item.quote ? (
                    <>
                      <p className="font-serif text-xl italic leading-snug text-ink sm:text-[22px] lg:text-2xl">
                        &ldquo;{item.quote}&rdquo;
                      </p>
                      <p className="mt-2 font-sans text-sm leading-relaxed text-ink-soft sm:text-base">
                        {item.body}
                      </p>
                    </>
                  ) : (
                    <p className="font-sans text-base leading-relaxed text-ink-soft sm:text-lg">
                      {item.body}
                    </p>
                  )}
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
          <LazyVideo
            className="w-full rounded-[12px] border border-border"
            src={block.src}
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
          scrollFrames={block.scrollFrames}
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

    case "mockupRow":
      return (
        <div
          className="grid gap-1.5 sm:gap-3"
          // One column per card, with a narrow arrow column between each.
          style={{ gridTemplateColumns: block.items.map(() => "1fr").join(" auto ") }}
        >
          {block.items.map((item, i) => [
            i > 0 && (
              <div
                key={`arrow-${i}`}
                aria-hidden
                className="flex items-center font-sans text-lg text-ink-soft sm:text-2xl"
              >
                →
              </div>
            ),
            <figure key={item.label}>
              <CaseStudyHeroMockup
                label={item.label}
                // Same inset as the comparison-card labels (p-5 / sm:p-6).
                labelClassName="left-5 top-5 sm:left-6 sm:top-6"
                frames={item.frames}
                scrollFrames={item.scrollFrames}
                background={item.background ?? block.background}
                alt={item.alt}
                variant={block.variant}
                // Extra top padding keeps the phone clear of the in-card label.
                className="rounded-[24px] border border-border pb-8 pt-12 sm:pb-12 sm:pt-16"
                phoneSizeClassName="w-[118px] sm:w-[150px] md:w-[165px]"
              />
            </figure>,
          ])}
        </div>
      );

    case "featureRows":
      return (
        <div className="space-y-8 sm:space-y-6">
          {block.items.map((item) => (
            <div
              key={item.video}
              className="grid items-center gap-5 sm:grid-cols-[3fr_2fr] sm:gap-10"
            >
              <CaseStudyHeroMockup
                video={item.video}
                poster={item.poster}
                background={block.background}
                alt={item.alt}
                variant={block.variant}
                className="rounded-[24px] border border-border py-10 sm:py-12"
                phoneSizeClassName="w-[170px] sm:w-[180px] md:w-[190px]"
              />
              <div>
                <h3 className="font-serif text-xl leading-snug text-ink sm:text-[22px] lg:text-2xl">
                  {item.title}
                </h3>
                <p className="mt-2 font-sans text-base leading-relaxed text-ink-soft">
                  {item.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      );

    case "crossfade": {
      const cycle = (block.holdSeconds ?? 3) * 2;
      const [first, second] = block.images;
      const frames = (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            loading="lazy"
            decoding="async"
            src={first.src}
            alt={first.alt}
            className="crossfade-frame block w-full"
            style={{ animationDuration: `${cycle}s` }}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            loading="lazy"
            decoding="async"
            src={second.src}
            alt={second.alt}
            className="crossfade-frame absolute inset-0 h-full w-full object-cover"
            style={{ animationDuration: `${cycle}s`, animationDelay: `-${cycle / 2}s` }}
          />
        </>
      );
      if (block.background) {
        return (
          <figure
            className="flex items-center justify-center rounded-[24px] border border-border py-16 sm:py-20"
            style={{ backgroundColor: block.background }}
          >
            <BrowserFrame width={block.backgroundImageWidth ?? "88%"}>
              <div className="relative">{frames}</div>
            </BrowserFrame>
          </figure>
        );
      }
      return (
        <figure className="relative overflow-hidden rounded-[12px] border border-border">
          {frames}
        </figure>
      );
    }

    case "gallery":
      if (block.images.every((image) => image.aspect)) {
        return (
          <div className="flex gap-3 sm:gap-4">
            {block.images.map((image) => (
              <div key={image.src} style={{ flex: `${image.aspect} 1 0%` }}>
                <CaseStudyImage src={image.src} alt={image.alt} />
              </div>
            ))}
          </div>
        );
      }
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
              style={block.background ? { backgroundColor: block.background } : undefined}
            >
              <div className="flex items-center justify-between gap-3">
                <p className="font-sans text-xs uppercase tracking-wider text-ink-faint">
                  {block.numbered === false ? group.label : `${i + 1} — ${group.label}`}
                </p>
                {group.status && <StatusChip status={group.status} />}
              </div>
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
