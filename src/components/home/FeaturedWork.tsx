import Link from "next/link";
import { caseStudies } from "@/content/case-studies";
import { CaseStudyImage } from "@/components/case-study/CaseStudyImage";

export function FeaturedWork() {
  return (
    <section id="work" className="border-y border-border bg-cream-subtle">
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24">
        <h2 className="font-serif text-3xl text-ink sm:text-4xl">Selected work</h2>
        <div className="mt-10 grid grid-cols-1 gap-16">
        {caseStudies.map((cs) => (
          <Link
            key={cs.slug}
            href={`/work/${cs.slug}`}
            className="group flex flex-col"
          >
            <div className="aspect-[16/9] overflow-hidden rounded-[12px]">
              {cs.coverVideo ? (
                <video
                  className="h-full w-full rounded-[12px] border border-border object-cover"
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
                <CaseStudyImage src={cs.coverImage.src} alt={cs.coverImage.alt} fill />
              )}
            </div>
            <div className="mt-4 flex items-baseline justify-between gap-4">
              <h3 className="font-serif text-xl text-ink group-hover:text-ink-soft sm:text-2xl">
                {cs.title}
              </h3>
              <span className="whitespace-nowrap font-sans text-sm text-ink-faint">
                {cs.year}
              </span>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {cs.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-[12px] border border-border px-2.5 py-1 font-sans text-xs text-ink-soft"
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
