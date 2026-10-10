import { about, education, portrait, recommendations, type RecommendationItem } from "@/content/site";
import { Portrait } from "@/components/home/Portrait";
import { PhotoSlotList } from "./PhotoSlotList";
import { SocialLinks } from "./SocialLinks";
import { PreviewLink } from "./PreviewLink";
import { AboutCard } from "./AboutCard";
import { ARROW_NE } from "@/lib/glyphs";

const recommendationGroups: {
  label: string;
  items: RecommendationItem[];
  boldTitles?: boolean;
}[] = [
  { label: "Listening", items: recommendations.listening, boldTitles: true },
  { label: "Sidequesting", items: recommendations.learning },
];

export function AboutSection() {
  // Alternate the prints' tilt across every preview link, in reading order.
  let previewCount = 0;

  return (
    <section>
      <div className="mx-auto max-w-5xl px-6 py-16 sm:px-8 sm:pb-24 sm:pt-12">
        <div className="grid gap-8 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] sm:items-center sm:gap-14">
          <div className="intro-portrait relative" style={{ "--n": 0 } as React.CSSProperties}>
            <Portrait src={portrait.src} alt={portrait.alt} />
          </div>

          <div>
            <h1 style={{ "--n": 1 } as React.CSSProperties} className="intro-item font-serif text-[26px] text-ink sm:text-[30px] lg:text-4xl">About</h1>
            <div className="mt-3 space-y-4 lg:mt-6">
              {about.paragraphs.map((p, i) => (
                <p
                  key={i}
                  style={{ "--n": i + 2 } as React.CSSProperties}
                  className="intro-item font-sans text-base leading-relaxed text-ink-soft"
                >
                  {typeof p === "string"
                    ? p
                    : p.map((seg, j) =>
                        typeof seg === "string" ? (
                          seg
                        ) : "highlight" in seg ? (
                          <span key={j} className="font-normal">
                            {seg.text}
                          </span>
                        ) : (
                          <PreviewLink
                            key={j}
                            href={seg.href}
                            preview={seg.preview}
                            tilt={seg.preview && previewCount++ % 2 ? 2 : -2}
                          >
                            {seg.text}
                          </PreviewLink>
                        ),
                      )}
                </p>
              ))}
            </div>
            <div
              style={{ "--n": about.paragraphs.length + 2 } as React.CSSProperties}
              className="intro-item mt-8 border-t border-border pt-6"
            >
              <p className="font-sans text-xs uppercase tracking-wider text-ink-faint">
                Education
              </p>
              <p className="mt-2 font-sans text-base text-ink">{education.degree}</p>
              <p className="font-sans text-sm text-ink-soft">{education.school}</p>
              <SocialLinks />
            </div>
          </div>
        </div>

        {/* Tight spacing above so the taped cards' tops show above the fold on a laptop. */}
        <div className="mt-12 grid grid-cols-1 gap-12 sm:grid-cols-2 sm:gap-8">
          {recommendationGroups.map((group, g) => (
            <AboutCard key={group.label} index={g} tilt={g % 2 ? 1.4 : -1.2}>
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="font-serif text-xl text-ink lg:text-2xl">{group.label}</h3>
                {/* Phones lose the dashed photo slot's prompt, so it moves up here. */}
                {group.items.some((item) => item.photo) && (
                  <span className="flex items-center gap-1.5 font-sans text-xs text-matcha min-[420px]:hidden">
                    <span aria-hidden>✱</span>
                    click a sidequest
                  </span>
                )}
              </div>
              {group.items.some((item) => item.photo) ? (
                <PhotoSlotList items={group.items} />
              ) : (
                <ul className="mt-4 space-y-3">
                  {group.items.map((item) => (
                    <li key={item.title} className="about-row flex gap-3">
                      <span aria-hidden className="about-star mt-0.5 shrink-0 text-sm text-ink">
                        ✱
                      </span>
                      <p className="font-sans text-[15px] leading-relaxed text-ink-soft">
                        {item.href ? (
                          <a
                            href={item.href}
                            target="_blank"
                            rel="noreferrer"
                            className={`hover:text-ink-soft ${
                              group.boldTitles ? "font-normal text-ink" : "text-ink"
                            }`}
                          >
                            {item.title} <span aria-hidden className="text-ink-faint">{ARROW_NE}</span>
                          </a>
                        ) : (
                          <span className={group.boldTitles ? "font-normal text-ink" : "text-ink"}>
                            {item.title}
                          </span>
                        )}
                        {item.detail ? ` ${item.detail}` : null}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </AboutCard>
          ))}
        </div>
      </div>
    </section>
  );
}
