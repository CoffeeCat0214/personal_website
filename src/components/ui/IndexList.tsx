import styles from "./IndexList.module.css";
import { ArrowLink } from "./ArrowLink";

export type IndexEntry = {
  role: string;
  team: string;
  period: string;
  context: string;
  body: string;
  href?: string;
  linkLabel?: string;
};

/* A real <dl>: each entry is a term (the role) and its details (the dates and
   description). Screen readers announce the pairing, which a stack of <div>s
   with visual columns does not. */
export function IndexList({ entries }: { entries: readonly IndexEntry[] }) {
  return (
    <dl className={styles.index}>
      {entries.map((entry) => (
        <div className={styles.row} key={`${entry.role}-${entry.period}`} data-reveal>
          <dt className={styles.term}>
            {entry.role}
            <span className={styles.termContext}>{entry.team}</span>
          </dt>
          <dd className={styles.period}>{entry.period}</dd>
          {[entry.context, entry.body]
            .filter(Boolean)
            .map((line) => (
              <dd className={styles.note} key={line}>
                {line}
              </dd>
            ))}
          {entry.href ? (
            <dd className={styles.linkNote}>
              <ArrowLink href={entry.href}>{entry.linkLabel ?? "Read case study"}</ArrowLink>
            </dd>
          ) : null}
        </div>
      ))}
    </dl>
  );
}
