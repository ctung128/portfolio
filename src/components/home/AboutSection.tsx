import { about, education, portrait, recommendations } from "@/content/site";
import { Portrait } from "./Portrait";

const recommendationGroups: { label: string; items: string[] }[] = [
  { label: "Reading", items: recommendations.reading },
  { label: "Listening", items: recommendations.listening },
  { label: "Learning", items: recommendations.learning },
  { label: "Recommending", items: recommendations.films },
];

export function AboutSection() {
  return (
    <section id="about" className="border-t border-border bg-cream-subtle">
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="grid gap-12 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] sm:gap-16">
          <div>
            <div className="flex items-center gap-4">
              <Portrait src={portrait.src} alt={portrait.alt} />
              <h2 className="font-serif text-3xl text-ink sm:text-4xl">About</h2>
            </div>
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

          <div className="grid grid-cols-2 gap-x-8 gap-y-10">
            {recommendationGroups.map((group) => (
              <div key={group.label}>
                <p className="font-sans text-xs uppercase tracking-wider text-ink-faint">
                  {group.label}
                </p>
                <ul className="mt-3 space-y-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="font-sans text-sm leading-snug text-ink-soft"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
