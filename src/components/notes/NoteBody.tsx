import { Fragment } from "react";
import { formatNoteDate, splitSentences, type Note, type Reading } from "@/content/notes";
import { NoteAudio } from "./NoteAudio";

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
              <p>{p}</p>
              {note.figures
                ?.filter((f) => f.after === i)
                .map((f) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={f.src}
                    src={f.src}
                    alt={f.alt}
                    width={f.width}
                    height={f.height}
                    loading="lazy"
                    className="block h-auto max-w-full rounded-[8px] border border-border bg-white"
                  />
                ))}
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

/** Text with [words](https://…) turned into inline links that open in a new tab. */
function Linked({ text }: { text: string }) {
  return text.split(/(\[[^\]]+\]\([^)]+\))/).map((part, i) => {
    const m = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    return m ? (
      <a key={i} href={m[2]} target="_blank" rel="noreferrer" className="link-underline">
        {m[1]}
      </a>
    ) : (
      part
    );
  });
}
