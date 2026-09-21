import type { CaseStudyBlock } from "@/content/case-studies/types";
import { CaseStudyImage } from "./CaseStudyImage";

export function BlockRenderer({ block }: { block: CaseStudyBlock }) {
  switch (block.type) {
    case "paragraph":
      return (
        <p className="font-sans text-base leading-relaxed text-ink-soft sm:text-lg">
          {block.text}
        </p>
      );

    case "subheading":
      return (
        <h3 className="font-sans text-sm font-semibold uppercase tracking-wider text-ink">
          {block.text}
        </h3>
      );

    case "quote":
      return (
        <blockquote className="border-l-2 border-green py-1 pl-5 font-serif text-xl italic leading-snug text-ink sm:text-2xl">
          &ldquo;{block.text}&rdquo;
          {block.attribution && (
            <footer className="mt-2 font-sans text-sm not-italic text-ink-faint">
              — {block.attribution}
            </footer>
          )}
        </blockquote>
      );

    case "stats":
      return (
        <div className="grid grid-cols-2 gap-6 border-y border-border py-6 sm:grid-cols-3">
          {block.items.map((stat) => (
            <div key={stat.label}>
              <div className="font-serif text-3xl text-green sm:text-4xl">{stat.value}</div>
              <div className="mt-1 font-sans text-sm text-ink-soft">{stat.label}</div>
            </div>
          ))}
        </div>
      );

    case "list":
      return block.ordered ? (
        <ol className="list-decimal space-y-2 pl-5 font-sans text-base leading-relaxed text-ink-soft sm:text-lg">
          {block.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ol>
      ) : (
        <ul className="list-disc space-y-2 pl-5 font-sans text-base leading-relaxed text-ink-soft sm:text-lg">
          {block.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      );

    case "image":
      return (
        <CaseStudyImage
          src={block.src}
          alt={block.alt}
          caption={block.caption}
          wide={block.wide}
        />
      );

    default:
      return null;
  }
}
