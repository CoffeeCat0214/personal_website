import type { MarkPanel as MarkPanelData } from "@/content/site";
import { CatMark } from "./CatMark";
import styles from "./MarkPanel.module.css";

/* A full-bleed colour field carrying the mark and one display-size line.

   These exist for two reasons at once. They give the page the rhythm the
   reference board has -- dense editorial act, then a panel that is only colour
   and shape -- and they are the only place lilac and orange can appear, because
   neither ground has the contrast headroom for small text (5.46:1 and 4.94:1;
   see tokens.css). The layout constraint and the design intent happen to be the
   same constraint, which is why this reads as a decision rather than a
   workaround.

   Not aria-hidden. Only the mark inside it is decorative -- the line is a real
   signpost between two runs of dense acts, and it is the kind of orientation
   text a screen-reader user benefits from more than a sighted one, not less.

   data-tone is what the nav reads to re-colour itself on scroll. */
export function MarkPanel({ panel }: { panel: MarkPanelData }) {
  return (
    <section
      id={panel.id}
      className={`tone-${panel.tone} ${styles.panel}`}
      data-tone={panel.tone}
    >
      <div className={`wrap ${styles.inner}`}>
        <p className={styles.line} data-reveal="display">
          {panel.line}
        </p>
        <div className={styles.mark} data-reveal="mark">
          <CatMark variant="panel" />
        </div>
      </div>
    </section>
  );
}
