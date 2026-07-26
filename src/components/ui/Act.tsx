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
      <div className="wrap">
        {/* A header bar across the full measure, not a column beside it.

            This was a 200px sticky rail holding a ~120px label, which meant a
            quarter of the page width sat blank for the whole height of every
            act -- a 1500px column of nothing next to every spec table and index
            on the site. The rail's job was to give a long section a sense of
            place; the nav already does that by adopting each act's ground as you
            scroll into it, so the rail was paying a width tax for a second copy
            of an orientation cue that already existed.

            Turning it into a bar returns that width to the content and puts the
            act's identity on the same left edge as everything under it. */}
        <div className={styles.bar} data-reveal>
          <span className={styles.num}>({number})</span>
          <p className={styles.eyebrow}>{eyebrow}</p>
          <CatMark variant="tag" />
        </div>
        <div className={styles.body}>{children}</div>
      </div>
    </section>
  );
}
