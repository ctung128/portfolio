import { about, education, portrait, recommendations } from "@/content/site";
import { Portrait } from "./Portrait";

const recommendationGroups: {
  label: string;
  items: { title: string; detail?: string; href?: string }[];
  boldTitles?: boolean;
}[] = [
  { label: "Reading", items: recommendations.reading, boldTitles: true },
  { label: "Listening", items: recommendations.listening, boldTitles: true },
  { label: "Sidequesting", items: recommendations.learning },
  { label: "Recommending", items: recommendations.recommending, boldTitles: true },
];

export function AboutSection() {
  return (
    <section id="about">
      <div className="mx-auto max-w-5xl px-6 py-16 sm:px-8 sm:py-24">
        <div className="grid gap-8 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] sm:items-center sm:gap-14">
          <Portrait src={portrait.src} alt={portrait.alt} />

          <div>
            <h2 className="font-serif text-3xl text-ink sm:text-4xl">About</h2>
            <div className="mt-6 space-y-4">
              {about.paragraphs.map((p, i) => (
                <p key={i} className="font-sans text-base leading-relaxed text-ink-soft">
                  {p}
                </p>
              ))}
            </div>
            <div className="mt-8 border-t border-border pt-6">
              <p className="font-sans text-xs uppercase tracking-wider text-ink-faint">
                Education
              </p>
              <p className="mt-2 font-sans text-base text-ink">{education.degree}</p>
              <p className="font-sans text-sm text-ink-soft">{education.school}</p>
            </div>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:mt-16 sm:grid-cols-2 sm:gap-8">
          {recommendationGroups.map((group) => (
            <div
              key={group.label}
              className="rounded-[12px] border border-border bg-cream-subtle p-8 sm:p-10"
            >
              <h3 className="font-serif text-3xl text-ink">{group.label}</h3>
              <ul className="mt-6 space-y-4">
                {group.items.map((item) => (
                  <li key={item.title} className="flex gap-3">
                    <span aria-hidden className="mt-1 shrink-0 text-base text-ink">
                      ✱
                    </span>
                    <p className="font-sans text-base leading-relaxed text-ink-soft">
                      {item.href ? (
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noreferrer"
                          className={`hover:text-ink-soft ${
                            group.boldTitles ? "font-medium text-ink" : "text-ink"
                          }`}
                        >
                          {item.title} <span aria-hidden className="text-ink-faint">↗</span>
                        </a>
                      ) : (
                        <span className={group.boldTitles ? "font-medium text-ink" : "text-ink"}>
                          {item.title}
                        </span>
                      )}
                      {item.detail ? ` ${item.detail}` : null}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
