import { about, education, portrait, recommendations } from "@/content/site";
import { Portrait } from "./Portrait";

const recommendationGroups: {
  label: string;
  items: { title: string; detail?: string }[];
}[] = [
  { label: "Reading", items: recommendations.reading },
  { label: "Listening", items: recommendations.listening },
  { label: "Learning", items: recommendations.learning },
  { label: "Recommending", items: recommendations.recommending },
];

export function AboutSection() {
  return (
    <section id="about" className="border-t border-border bg-cream-subtle">
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="max-w-2xl">
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

        <div className="mt-12 grid grid-cols-1 gap-6 sm:mt-16 sm:grid-cols-2 sm:gap-8">
          {recommendationGroups.map((group) => (
            <div
              key={group.label}
              className="rounded-[12px] bg-[#F7F7F7] p-8 sm:p-10"
              style={{ boxShadow: "0 4px 4px 4px rgba(107, 87, 46, 0.08)" }}
            >
              <h3 className="font-serif text-3xl text-ink">{group.label}</h3>
              <ul className="mt-6 space-y-4">
                {group.items.map((item) => (
                  <li key={item.title} className="flex gap-3">
                    <span aria-hidden className="mt-1 shrink-0 text-base text-ink">
                      ✱
                    </span>
                    <p className="font-sans text-base leading-relaxed text-ink-soft">
                      <span className="font-semibold text-ink">{item.title}</span>
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
