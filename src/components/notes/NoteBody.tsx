import { formatNoteDate, splitSentences, type Note, type Reading } from "@/content/notes";
import { NoteAudio } from "./NoteAudio";

/** One note inside the Notes window: date, serif title (or an audio banner
 * carrying the title), prose, sign-off and an optional reading list. Rises in each time a note opens. */
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
        {note.audio?.sentenceStarts ? <ReadAlong paragraphs={note.paragraphs} /> : note.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
        {note.signoff && <p className="text-ink">{note.signoff}</p>}
      </div>

      {note.reading && (
        <section className="mt-10 border-t border-border pt-6">
          <h3 className="font-sans text-xs uppercase tracking-wider text-ink">{note.reading.heading}</h3>
          <ul className="mt-4 space-y-2 font-sans text-[15px] leading-snug text-ink-soft">
            {note.reading.items.map((item, i) => (
              <li key={i} className="flex gap-2.5">
                <span aria-hidden className="text-ink">
                  ✱
                </span>
                <ReadingLine item={item} />
              </li>
            ))}
          </ul>
        </section>
      )}
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

/** "Name", "Name, *Work*" or "*Work* (note)". */
function ReadingLine({ item }: { item: Reading }) {
  return (
    <span>
      {item.name}
      {item.name && item.work && ", "}
      {item.work && <em>{item.work}</em>}
      {item.note && <span className="text-ink-faint"> ({item.note})</span>}
    </span>
  );
}
