import { FigureFrame } from "./FigureFrame";
import styles from "./Figure.module.css";

/* A typographic composition, not a screenshot. Real screenshots of a CLI tool
   age badly and carry text too small to read at this size; a set diff shows the
   same idea legibly and weighs nothing. */
const lines: { gutter: string; text: string; tone?: "removed" | "added" | "muted" }[] = [
  { gutter: "  ", text: "def process(records, cfg):", tone: "muted" },
  { gutter: "- ", text: "    conn = db.connect(cfg.url)", tone: "removed" },
  { gutter: "- ", text: "    for r in records:", tone: "removed" },
  { gutter: "- ", text: "        conn.write(r)", tone: "removed" },
  { gutter: "+ ", text: "    with db.connect(cfg.url) as conn:", tone: "added" },
  { gutter: "+ ", text: "        conn.write_many(records)", tone: "added" },
  { gutter: "  ", text: "", tone: "muted" },
  { gutter: "  ", text: "· leaked connection on exception", tone: "muted" },
  { gutter: "  ", text: "· N writes → 1 batched write", tone: "muted" },
  { gutter: "  ", text: "· 14 call sites unchanged", tone: "muted" },
];

export function DiffFigure() {
  return (
    <FigureFrame
      label="A code diff produced by CodeHuskAI: a leaked database connection replaced with a context manager and a batched write, with a note that fourteen call sites are unaffected."
      chrome="codehusk — suggested patch"
    >
      <div className={styles.panel}>
        {lines.map((line, i) => (
          <span className={styles.line} key={i}>
            <span className={styles.gutter}>{line.gutter}</span>
            <span className={line.tone ? styles[line.tone] : undefined}>
              {line.text || " "}
            </span>
          </span>
        ))}
      </div>
    </FigureFrame>
  );
}
