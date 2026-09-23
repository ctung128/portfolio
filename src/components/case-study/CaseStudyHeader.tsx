import type { ReactNode } from "react";
import type { CaseStudy } from "@/content/case-studies/types";

export function CaseStudyHeader({
  caseStudy,
  children,
}: {
  caseStudy: CaseStudy;
  /** Cover image/mockup, rendered between the description and the metadata
   * grid. */
  children?: ReactNode;
}) {
  return (
    <header className="pb-12">
      <p className="font-sans text-sm uppercase tracking-widest text-ink-faint">
        {caseStudy.industry}
      </p>
      <h1 className="mt-4 font-serif text-4xl leading-tight text-ink">{caseStudy.title}</h1>
      <p className="mt-4 max-w-2xl font-sans text-lg leading-relaxed text-ink-soft">
        {caseStudy.oneLiner}
      </p>

      {children}

      <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-4">
        <div>
          <dt className="font-sans text-xs uppercase tracking-wider text-ink-faint">Role</dt>
          <dd className="mt-1 font-sans text-sm text-ink">{caseStudy.role}</dd>
        </div>
        <div>
          <dt className="font-sans text-xs uppercase tracking-wider text-ink-faint">
            Timeline
          </dt>
          <dd className="mt-1 font-sans text-sm text-ink">{caseStudy.timeline}</dd>
        </div>
        <div className="col-span-2 sm:col-span-1">
          <dt className="font-sans text-xs uppercase tracking-wider text-ink-faint">Team</dt>
          <dd className="mt-1 space-y-1 font-sans text-sm text-ink">
            {caseStudy.team.map((member) => (
              <div key={member}>{member}</div>
            ))}
          </dd>
        </div>
        <div className="col-span-2 sm:col-span-1">
          <dt className="font-sans text-xs uppercase tracking-wider text-ink-faint">Skills</dt>
          <dd className="mt-2 flex flex-wrap gap-2">
            {caseStudy.skills.map((skill) => (
              <span
                key={skill}
                className="rounded-[12px] bg-border px-3 py-1.5 font-sans text-sm text-ink"
              >
                {skill}
              </span>
            ))}
          </dd>
        </div>
      </dl>
    </header>
  );
}
