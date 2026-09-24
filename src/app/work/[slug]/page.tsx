import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { caseStudies, getCaseStudy } from "@/content/case-studies";
import { CaseStudyHeader } from "@/components/case-study/CaseStudyHeader";
import { CaseStudyHeroMockup } from "@/components/case-study/CaseStudyHeroMockup";
import { CaseStudyDuoHero } from "@/components/case-study/CaseStudyDuoHero";
import { BlockRenderer } from "@/components/case-study/BlockRenderer";
import {
  TableOfContents,
  MobileTableOfContents,
} from "@/components/case-study/TableOfContents";
import { LazyVideo } from "@/components/LazyVideo";

export function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = getCaseStudy(slug);
  if (!caseStudy) return {};
  return {
    title: `${caseStudy.title} — Carolyn Tung`,
    description: caseStudy.oneLiner,
  };
}

const backLink = (
  <Link href="/#work" className="font-sans text-base text-ink-faint hover:text-green">
    ← Back to work
  </Link>
);

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const caseStudy = getCaseStudy(slug);
  if (!caseStudy) notFound();

  const tocItems = caseStudy.sections.map((s) => ({ id: s.id, navLabel: s.navLabel }));

  return (
    <article className="mx-auto max-w-5xl px-6 pb-24 pt-8 sm:px-8 sm:pt-12">
      <div className="lg:hidden">
        {backLink}
        <div className="mt-6">
          <MobileTableOfContents items={tocItems} />
        </div>
      </div>

      <div className="grid gap-12 lg:grid-cols-[200px_minmax(0,1fr)]">
        <div className="hidden lg:block">
          <div className="sticky top-24 flex flex-col gap-8">
            {backLink}
            <TableOfContents items={tocItems} />
          </div>
        </div>

        <div className="w-full max-w-3xl">
          <CaseStudyHeader caseStudy={caseStudy}>
            {caseStudy.duoHero || caseStudy.heroMockup || caseStudy.coverVideo ? (
              <div className="mt-10">
                {caseStudy.duoHero ? (
                  <CaseStudyDuoHero
                    background={caseStudy.duoHero.background}
                    splash={caseStudy.duoHero.splash}
                    video={caseStudy.duoHero.video}
                    alt={caseStudy.duoHero.alt}
                    variant={caseStudy.duoHero.variant}
                  />
                ) : caseStudy.heroMockup ? (
                  <CaseStudyHeroMockup
                    video={caseStudy.heroMockup.video}
                    frames={caseStudy.heroMockup.frames}
                    background={caseStudy.heroMockup.background}
                    alt={caseStudy.heroMockup.alt}
                    variant={caseStudy.heroMockup.variant}
                  />
                ) : (
                  <div className="mb-20 aspect-video overflow-hidden rounded-[12px] border border-border">
                    <LazyVideo
                      className="h-full w-full object-cover"
                      src={caseStudy.coverVideo}
                      poster={caseStudy.coverImage.src}
                      aria-label={caseStudy.coverImage.alt}
                    />
                  </div>
                )}
              </div>
            ) : null}
          </CaseStudyHeader>
          <div className="space-y-20">
            {caseStudy.sections.map((section) => (
              <section key={section.id} id={section.id} className="space-y-5">
                {section.hideHeader ? (
                  <h2 className="sr-only">{section.heading ?? section.navLabel}</h2>
                ) : (
                  <>
                    <p className="font-sans text-xs uppercase tracking-widest text-ink-faint">
                      {section.eyebrow ?? section.navLabel}
                    </p>
                    {section.heading && (
                      <h2 className="font-serif text-2xl text-ink sm:text-3xl">
                        {section.heading}
                      </h2>
                    )}
                  </>
                )}
                <div className="space-y-5">
                  {section.blocks.map((block, i) => (
                    <BlockRenderer key={i} block={block} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
