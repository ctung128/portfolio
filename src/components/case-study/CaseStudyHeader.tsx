import type { CaseStudy } from "@/content/case-studies/types";

export function CaseStudyHeader({ caseStudy }: { caseStudy: CaseStudy }) {
  return (
    <header className="pb-12">
      <p className="font-sans text-sm uppercase tracking-widest text-ink-faint">
        {caseStudy.industry}
      </p>
      <h1 className="mt-4 font-serif text-4xl leading-tight text-ink sm:text-5xl">
        {caseStudy.title}
      </h1>
      <p className="mt-4 max-w-2xl font-sans text-lg leading-relaxed text-ink-soft">
        {caseStudy.oneLiner}
      </p>

      <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-6 border-y border-border py-6 sm:grid-cols-4">
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
          <dd className="mt-1 font-sans text-sm text-ink">{caseStudy.skills.join(", ")}</dd>
        </div>
      </dl>
    </header>
  );
}
