import Link from "next/link";
import { caseStudies } from "@/content/case-studies";
import { CaseStudyImage } from "@/components/case-study/CaseStudyImage";
import { CaseStudyHeroMockup } from "@/components/case-study/CaseStudyHeroMockup";

// Premium hover scale: a slow, ease-out-expo settle rather than a snappy
// linear zoom — the same curve used for the frame-sequence animation.
const HOVER_SCALE =
  "transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]";

export function FeaturedWork() {
  return (
    <section id="work" className="border-y border-border bg-cream-subtle">
      <div className="mx-auto max-w-5xl px-6 py-16 sm:px-8 sm:py-24">
        <h2 className="font-serif text-3xl text-ink sm:text-4xl">Selected work</h2>
        <div className="mt-10 grid grid-cols-1 gap-16">
        {caseStudies.map((cs) => (
          <Link
            key={cs.slug}
            href={`/work/${cs.slug}`}
            className="group flex flex-col"
          >
            <div className="aspect-[16/9] overflow-hidden rounded-[12px]">
              {cs.heroMockup ? (
                <CaseStudyHeroMockup
                  video={cs.heroMockup.video}
                  frames={cs.heroMockup.frames}
                  background={cs.heroMockup.background}
                  alt={cs.heroMockup.alt}
                  className={`h-full w-full border border-border ${HOVER_SCALE}`}
                  phoneSizeClassName="h-[84%] w-auto"
                  variant={cs.heroMockup.variant}
                />
              ) : cs.coverVideo ? (
                <video
                  className={`h-full w-full rounded-[12px] border border-border object-cover ${HOVER_SCALE}`}
                  src={cs.coverVideo}
                  poster={cs.coverImage.src}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  aria-label={cs.coverImage.alt}
                />
              ) : (
                <CaseStudyImage
                  src={cs.coverImage.src}
                  alt={cs.coverImage.alt}
                  imageClassName={HOVER_SCALE}
                  fill
                />
              )}
            </div>
            <div className="mt-4 flex items-baseline justify-between gap-4">
              <h3 className="font-serif text-xl text-ink group-hover:text-ink-soft sm:text-2xl">
                {cs.title}
              </h3>
              <span className="inline-flex items-center gap-1.5 whitespace-nowrap font-sans text-sm text-ink-faint">
                {cs.year.startsWith("Shipped") && (
                  <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-[#628a00]" />
                )}
                {cs.year}
              </span>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {cs.tags.map((tag) => (
                <span
                  key={tag}
                  className={
                    tag === "Techstars"
                      ? "rounded-[12px] border border-[#39C463] bg-[#39C463]/10 px-2.5 py-1 font-sans text-xs text-[#1f8a45]"
                      : "rounded-[12px] border border-border px-2.5 py-1 font-sans text-xs text-ink-soft"
                  }
                >
                  {tag}
                </span>
              ))}
            </div>
          </Link>
        ))}
        </div>
      </div>
    </section>
  );
}
