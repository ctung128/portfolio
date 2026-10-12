import { Fragment } from "react";
import { formatNoteDate, splitSentences, type Note, type Reading } from "@/content/notes";
import { LazyVideo } from "@/components/LazyVideo";
import { NoteAudio } from "./NoteAudio";
import { StickerFigure } from "./StickerFigure";

/** One note inside the Notes window: date, serif title (or an audio banner
 * carrying the title), prose, sign-off and optional reading lists. Rises in each time a note opens. */
export function NoteBody({ note }: { note: Note }) {
  return (
    <article style={{ "--n": 0 } as React.CSSProperties} className="intro-item max-w-[620px]">
      {note.audio ? (
        <>
          <NoteAudio title={note.title} {...note.audio} />
          <p className="mt-6 font-sans text-[11px] uppercase tracking-wider text-ink-faint">{formatNoteDate(note.date)}</p>
        </>
      ) : (
        <>
          <p className="font-sans text-[11px] uppercase tracking-wider text-ink-faint">{formatNoteDate(note.date)}</p>
          <h2 className="mt-2 font-serif text-[26px] leading-tight text-ink sm:text-[30px] lg:text-4xl">{note.title}</h2>
        </>
      )}

      <div className={`${note.audio ? "mt-3" : "mt-6"} space-y-5 font-sans text-[15px] leading-relaxed text-ink-soft sm:text-base`}>
        {note.audio?.sentenceStarts ? (
          <ReadAlong paragraphs={note.paragraphs} />
        ) : (
          note.paragraphs.map((p, i) => (
            <Fragment key={i}>
              <Block text={p} />
              <Figures figures={note.figures?.filter((f) => f.after === i) ?? []} />
            </Fragment>
          ))
        )}
        {note.signoff && <p className="text-ink">{note.signoff}</p>}
      </div>

      {note.reading?.map((list, i) => (
        <section key={list.heading} className={i === 0 ? "mt-10 border-t border-border pt-6" : "mt-8"}>
          <h3 className="font-sans text-xs uppercase tracking-wider text-ink">
            {list.heading}
            {list.credit && (
              <span className="text-ink-faint">
                {" — "}
                {list.credit.name}
                {list.credit.name && list.credit.work && ", "}
                {list.credit.work && <em>{list.credit.work}</em>}
                {list.credit.year && ` (${list.credit.year})`}
              </span>
            )}
          </h3>
          <ul className="mt-4 space-y-2 font-sans text-[15px] leading-snug text-ink-soft">
            {list.items.map((item, j) => (
              <li key={j} className="flex gap-2.5">
                <span aria-hidden className="text-ink">
                  ✱
                </span>
                <ReadingLine item={item} />
              </li>
            ))}
          </ul>
        </section>
      ))}
    </article>
  );
}

/** Paragraphs as numbered sentence spans; `NoteAudio` marks each read / current / unread as it plays. */
function ReadAlong({ paragraphs }: { paragraphs: string[] }) {
  let n = 0;
  return paragraphs.map((p, i) => (
    <p key={i}>
      {splitSentences(p).map((sentence, j) => (
        <span key={j}>
          {j > 0 && " "}
          <span data-sentence={n++} className="note-sentence">
            {sentence}
          </span>
        </span>
      ))}
    </p>
  ));
}

/** "Name", "*Work* — Name" or "*Work* (note)". */
function ReadingLine({ item }: { item: Reading }) {
  return (
    <span>
      {item.work && <em>{item.work}</em>}
      {item.name && item.work && " — "}
      {item.name && <Linked text={item.name} />}
      {item.note && (
        <span className="text-ink-faint">
          {" ("}
          <Linked text={item.note} />)
        </span>
      )}
    </span>
  );
}

/** A paragraph, a "## " section heading, or a list of "- " lines. */
function Block({ text }: { text: string }) {
  if (text.startsWith("## ")) {
    return <h3 className="!mt-10 font-serif text-[22px] leading-snug text-ink sm:text-2xl">{text.slice(3)}</h3>;
  }
  if (text.startsWith("- ")) {
    return (
      <ul className="space-y-2">
        {text.split("\n").map((line, i) => (
          <li key={i} className="flex gap-2.5">
            <span aria-hidden className="text-ink">
              ✱
            </span>
            <span>
              <Linked text={line.slice(2)} />
            </span>
          </li>
        ))}
      </ul>
    );
  }
  return (
    <p>
      <Linked text={text} />
    </p>
  );
}

type NoteFigure = NonNullable<Note["figures"]>[number];
type ImageFigure = Extract<NoteFigure, { src: string }>;

/** Width ÷ height of what you see: a sticker's transparent padding doesn't count. */
const visibleAspect = (f: ImageFigure) => {
  const pad = f.sticker?.pad ?? 0;
  return (f.width - 2 * pad) / (f.height - 2 * pad);
};

/**
 * Two or more images after one paragraph sit in a row at a shared height; anything else stacks.
 * Image credits follow in one small line.
 */
function Figures({ figures }: { figures: NoteFigure[] }) {
  if (figures.length === 0) return null;
  const images = figures.filter((f): f is ImageFigure => !("video" in f));
  const credits = images.flatMap((f) => (f.credit ? [f.credit] : []));
  const row = images.length >= 2 && images.length === figures.length;
  return (
    <div>
      {row ? (
        <div className="flex items-start gap-3">
          {images.map((f) => (
            // Each image's share of the row is its aspect ratio, so all of them end up the same height.
            // A sticker's doodles may overlap its neighbour's edge, so it sits above it.
            // Shares are by visible aspect ratio (a sticker's padding left out), so top and bottom edges line up.
            <div key={f.src} style={{ flex: visibleAspect(f) }} className={`min-w-0 ${f.sticker ? "relative z-10" : ""}`}>
              <Figure figure={f} fill />
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-5">
          {figures.map((f) => (
            <Figure key={"video" in f ? f.video : f.src} figure={f} />
          ))}
        </div>
      )}
      {credits.length > 0 && (
        <p className="mt-2 text-xs text-ink-faint">
          {credits.length > 1 ? "Images" : "Image"}:{" "}
          {credits.map((c, i) => (
            <Fragment key={c.href}>
              {i > 0 && ", "}
              <a href={c.href} target="_blank" rel="noreferrer" className="link-underline">
                {c.label}
              </a>
            </Fragment>
          ))}
        </p>
      )}
    </div>
  );
}

/** A screenshot or a screen recording; a video still to be added shows as a dashed slot in dev only. */
function Figure({ figure: f, fill = false }: { figure: NoteFigure; fill?: boolean }) {
  const frame = "block h-auto max-w-full rounded-[8px] border border-border bg-white";
  if (!("video" in f) && f.sticker) {
    return <StickerFigure src={f.src} alt={f.alt} width={f.width} height={f.height} pad={f.sticker.pad} />;
  }
  if (!("video" in f)) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={f.src} alt={f.alt} width={f.width} height={f.height} loading="lazy" className={`${frame} ${fill ? "w-full" : ""}`} />
    );
  }
  if (f.pending) {
    if (process.env.NODE_ENV !== "development") return null;
    return (
      <div className="flex aspect-video items-center justify-center rounded-[8px] border border-dashed border-border px-6 text-center text-sm text-ink-faint">
        Video to come: {f.alt}
      </div>
    );
  }
  return <LazyVideo src={f.video} poster={f.poster} aria-label={f.alt} loop muted playsInline className={`${frame} w-full`} />;
}

/** Text with [words](https://…) turned into inline links that open in a new tab, and **words** set in ink. */
function Linked({ text }: { text: string }) {
  return text.split(/(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*)/).map((part, i) => {
    const m = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (m) {
      return (
        <a key={i} href={m[2]} target="_blank" rel="noreferrer" className="link-underline">
          {m[1]}
        </a>
      );
    }
    const b = part.match(/^\*\*([^*]+)\*\*$/);
    return b ? (
      <span key={i} className="text-ink">
        {b[1]}
      </span>
    ) : (
      part
    );
  });
}
