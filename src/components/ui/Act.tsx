import type { ReactNode } from "react";
import type { ContentTone } from "@/content";
import { CatMark } from "@/components/brand/CatMark";
import styles from "./Act.module.css";

type ActProps = {
  id: string;
  /** Section numeral, rendered as "(01)". */
  number: string;
  /** Small uppercase label under the numeral. */
  eyebrow: string;
  /** The act's ground. Re-points the whole palette for this subtree. */
  tone: ContentTone;
  /** A second id targeting this act, for a nav link that names a group. */
  anchorId?: string;
  children: ReactNode;
};

export function Act({ id, number, eyebrow, tone, anchorId, children }: ActProps) {
  return (
    /* data-tone is read by the scroll observer in Reveal.tsx, which mirrors it
       onto <html> so the fixed nav can adopt the ground it is currently over.
       The class does the colour; the attribute only reports it. */
    <section id={id} className={`${styles.act} tone-${tone}`} data-tone={tone}>
      {/* An element can only carry one id, so a second target for the same act
          needs its own node. Empty and unstyled, it inherits the document's
          scroll-padding-top like any other anchor. */}
      {anchorId ? <span id={anchorId} /> : null}
      <div className={`wrap ${styles.grid}`}>
        <div className={styles.label} data-reveal>
          <CatMark />
          <span className={styles.num}>({number})</span>
          <p className={styles.eyebrow}>{eyebrow}</p>
        </div>
        <div className={styles.body}>{children}</div>
      </div>
    </section>
  );
}
