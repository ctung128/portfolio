import { playProjects } from "@/content/site";
import { CaseStudyImage } from "@/components/case-study/CaseStudyImage";

export function PlayGallery() {
  return (
    <div className="mt-14 grid grid-cols-1 gap-10 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3">
      {playProjects.map((project) => (
        <a
          key={project.title}
          href={project.href}
          target="_blank"
          rel="noreferrer"
          className="group flex flex-col"
        >
          <div className="aspect-[4/3] overflow-hidden rounded-[12px]">
            <CaseStudyImage src={project.image.src} alt={project.image.alt} fill />
          </div>
          <div className="mt-4 flex items-baseline justify-between gap-3">
            <h2 className="font-serif text-xl text-ink group-hover:text-ink-soft">
              {project.title}
            </h2>
            <span aria-hidden className="font-sans text-sm text-ink-faint">
              ↗
            </span>
          </div>
          <p className="mt-1 font-sans text-xs uppercase tracking-wider text-ink-faint">
            {project.tag}
          </p>
          <p className="mt-2 font-sans text-sm leading-relaxed text-ink-soft">
            {project.description}
          </p>
        </a>
      ))}
    </div>
  );
}
