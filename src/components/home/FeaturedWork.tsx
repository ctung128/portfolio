import Link from "next/link";
import { caseStudies } from "@/content/case-studies";
import { CaseStudyImage } from "@/components/case-study/CaseStudyImage";
import { CaseStudyHeroMockup } from "@/components/case-study/CaseStudyHeroMockup";
import { LazyVideo } from "@/components/LazyVideo";

// Premium hover scale: a slow, ease-out-expo settle rather than a snappy
// linear zoom — the same curve used for the frame-sequence animation.
const HOVER_SCALE =
  "transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]";

export function FeaturedWork() {
  return (
    <section id="work" className="border-y border-border bg-cream-subtle">
      <div className="mx-auto max-w-5xl px-6 py-16 sm:px-8 sm:py-24">
        <h2 className="font-serif text-[26px] text-ink sm:text-[30px] lg:text-4xl">Selected work</h2>
        <div className="mt-10 grid grid-cols-1 gap-16">
        {caseStudies.map((cs) => (
          <div key={cs.slug} className="group flex flex-col">
          <Link href={`/work/${cs.slug}`} className="flex flex-col">
            <div className="aspect-[16/9] overflow-hidden rounded-[12px]">
              {cs.heroMockup ? (
                <CaseStudyHeroMockup
                  video={cs.heroMockup.video}
                  poster={cs.heroMockup.poster}
                  frames={cs.heroMockup.frames}
                  background={cs.heroMockup.background}
                  alt={cs.heroMockup.alt}
                  className={`h-full w-full border border-border ${HOVER_SCALE}`}
                  phoneSizeClassName="h-[84%] w-auto"
                  variant={cs.heroMockup.variant}
                />
              ) : cs.coverVideo ? (
                <LazyVideo
                  className={`h-full w-full rounded-[12px] border border-border object-cover ${HOVER_SCALE}`}
                  src={cs.coverVideo}
                  poster={cs.coverImage.src}
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
              <h3 className="font-serif text-xl text-ink group-hover:text-ink-soft sm:text-[22px] lg:text-2xl">
                {cs.title}
              </h3>
              <span className="inline-flex items-center gap-1.5 whitespace-nowrap font-sans text-sm text-ink-faint">
                {cs.year.startsWith("Shipped") && (
                  <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-[#39C463]" />
                )}
                {cs.year}
              </span>
            </div>
          </Link>
            {/* Outside the card link so the live-site chip can be its own link. */}
            <div className="mt-3 flex flex-wrap items-center gap-2">
              {cs.tags.map((tag) =>
                tag === "Techstars" ? (
                  <span
                    key={tag}
                    className="inline-flex h-[26px] items-center overflow-hidden rounded-full"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/case-studies/splitev/techstars-pill.png"
                      alt="Techstars"
                      className="h-full w-auto object-cover"
                    />
                  </span>
                ) : (
                  <span
                    key={tag}
                    className="rounded-[12px] border border-border px-2.5 py-1 font-sans text-xs text-ink-soft"
                  >
                    {tag}
                  </span>
                )
              )}
              {cs.badge && (
                <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[#39C463]/40 bg-[#39C463]/20 px-2.5 py-1 font-sans text-xs font-medium text-[#1f8a45] shadow-[0_1px_3px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.6)] backdrop-blur-md backdrop-saturate-150">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#39C463]" />
                  {cs.badge}
                </span>
              )}
              {cs.liveUrl && (
                <a
                  href={cs.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-slide inline-flex items-center gap-1 rounded-[12px] bg-ink px-2.5 py-1 font-sans text-xs font-medium text-cream"
                >
                  <span className="btn-slide-viewport"><span>See it live</span></span>
                  <span className="btn-slide-viewport" aria-hidden><span>↗</span></span>
                </a>
              )}
            </div>
          </div>
        ))}
        </div>
      </div>
    </section>
  );
}
