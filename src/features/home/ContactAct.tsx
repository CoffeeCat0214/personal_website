import { contact, site } from "@/content";
import type { HomeSection } from "@/content";
import { Act } from "@/components/ui/Act";
import aboutStyles from "./About.module.css";
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
      <div className="section-head">
        <h2 data-split>{contact.heading}</h2>
      </div>
      <div className={aboutStyles.copy} data-reveal>
        <p>{contact.body}</p>
      </div>
      <dl className={styles.channels} data-reveal>
        <div className={styles.row}>
          <dt className={styles.key}>Email</dt>
          <dd className={styles.value}>
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </dd>
        </div>
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
        <div className={styles.row}>
          <dt className={styles.key}>Based in</dt>
          <dd className={styles.value}>{site.location}</dd>
        </div>
      </dl>
    </Act>
  );
}
