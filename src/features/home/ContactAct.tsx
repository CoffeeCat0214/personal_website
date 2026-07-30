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
      {/* One row of two equal-height panels, which is the shape the About act
          directly above already uses: a copy panel and an object panel, same
          top, same bottom, nothing floating between them.

          What this replaces: a 555px nameplate slab stranded in a 1040px
          measure, ~90px of pink under it, then a desk whose right rail held two
          short cards and ~370px of nothing before "Based in" was pinned to the
          floor by `margin-top: auto`. Three framed boxes stacked at three
          different right edges, two of them near-empty. The hole in the rail was
          not a margin -- it was the layout admitting the two columns had nothing
          to do with each other's height.

          Stretching one panel against the window instead means the leftover
          height lands *inside* a surface, where `space-between` reads as
          composition, rather than between surfaces, where it reads as a gap. */}
      <div className={styles.desk} data-reveal>
        <div className={styles.card}>
          <div className={styles.intro}>
            <p className={styles.kicker}>Direct line / {section.number}</p>
            <h2 data-split>{contact.heading}</h2>
            <p className={styles.lede}>{contact.body}</p>
          </div>
          {/* An index inside the panel, not three more framed slabs: the panel
              is already the frame, and hairlines are the weight a list of
              secondary destinations should carry next to the address this act
              exists to hand over. */}
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
            {/* A fact, not a channel -- so it keeps the `<dl>` semantics and
                loses the link treatment. */}
            <div className={styles.row}>
              <dt className={styles.key}>Based in</dt>
              <dd className={`${styles.value} ${styles.valuePlain}`}>{site.location}</dd>
            </div>
          </dl>
        </div>
        <MailWindow email={site.email} />
      </div>
    </Act>
  );
}
