import { specializationPillars } from "@/content/site";

export function SpecializationPillars() {
  return (
    <section className="border-y border-border bg-cream-subtle">
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="grid gap-10 sm:grid-cols-3 sm:gap-8">
          {specializationPillars.map((pillar, i) => (
            <div key={pillar.title}>
              <span className="font-serif text-2xl text-green">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h2 className="mt-3 font-serif text-xl text-ink sm:text-2xl">{pillar.title}</h2>
              <p className="mt-3 font-sans text-sm leading-relaxed text-ink-soft">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
