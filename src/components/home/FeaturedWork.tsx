import Link from "next/link";
import { caseStudies } from "@/content/case-studies";
import { CaseStudyImage } from "@/components/case-study/CaseStudyImage";

export function FeaturedWork() {
  return (
    <section id="work" className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24">
      <h2 className="font-serif text-3xl text-ink sm:text-4xl">Selected work</h2>
      <div className="mt-10 grid gap-10 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-14">
        {caseStudies.map((cs) => (
          <Link
            key={cs.slug}
            href={`/work/${cs.slug}`}
            className="group flex flex-col"
          >
            <div className="overflow-hidden rounded-[12px]">
              <CaseStudyImage src={cs.coverImage.src} alt={cs.coverImage.alt} />
            </div>
            <div className="mt-4 flex items-baseline justify-between gap-4">
              <h3 className="font-serif text-xl text-ink group-hover:text-green sm:text-2xl">
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
    </section>
  );
}
