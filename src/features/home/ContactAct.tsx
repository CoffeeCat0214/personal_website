import { contact, site } from "@/content";
import type { HomeSection } from "@/content";
import { Act } from "@/components/ui/Act";
import { MailWindow } from "./MailWindow";
import styles from "./Contact.module.css";

type ContactSection = Extract<HomeSection, { kind: "act"; act: "contact" }>;

export function ContactAct({ section }: { section: ContactSection }) {
  return (
    <Act
      id={section.id}
      number={section.number}
      eyebrow={section.eyebrow}
      tone={section.tone}
    >
      {/* The lede lives inside the nameplate rather than in a framed slab of its
          own. Four words do not need a 3px frame, a hard shadow and 100px of
          height -- as a separate box it read as a third heading between the
          heading and the content, and the act opened with three stacked
          containers before it said anything. */}
      <div className="section-head">
        <h2 data-split>{contact.heading}</h2>
        <p className={styles.lede}>{contact.body}</p>
      </div>
      {/* Email leaves the list and becomes an object. Four channels rendered as
          four identical slabs stated "Based in: New York" at the same volume as
          the one action this act exists for; promoting the primary channel by
          form is the only promotion left in a system where everything already
          carries a 3px frame. */}
      <div className={styles.desk} data-reveal>
        <MailWindow email={site.email} />
        <dl className={styles.channels}>
          <div className={styles.row}>
            <dt className={styles.key}>GitHub</dt>
            <dd className={styles.value}>
              <a href={site.github}>CoffeeCat0214</a>
            </dd>
          </div>
          <div className={styles.row}>
            <dt className={styles.key}>LinkedIn</dt>
            <dd className={styles.value}>
              <a href={site.linkedin}>kyrstin-mariko-kauchak</a>
            </dd>
          </div>
          {/* A fact, not a channel. GitHub and LinkedIn are places to go;
              "Based in" is something to know, and giving it the same frame as
              the two links made the column read as three equal destinations. */}
          <div className={`${styles.row} ${styles.rowPlain}`}>
            <dt className={styles.key}>Based in</dt>
            <dd className={styles.value}>{site.location}</dd>
          </div>
        </dl>
      </div>
    </Act>
  );
}
