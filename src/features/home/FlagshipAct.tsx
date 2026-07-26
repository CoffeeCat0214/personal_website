import { flagship } from "@/content";
import type { HomeSection } from "@/content";
import { Figure } from "@/components/brand/figures/Figure";
import { Act } from "@/components/ui/Act";
import { ArrowLink } from "@/components/ui/ArrowLink";
import caseStyles from "./Case.module.css";
import styles from "./Flagship.module.css";

/* The flagship act, and the only one that gets narrative depth.

   It carried no figure, metrics or link while it argued for an unbuilt story
   world -- there was nothing to depict and nothing to install. A shipped
   extension gets the same evidence a tool does, plus the three beats. */
type FlagshipSection = Extract<HomeSection, { kind: "act"; act: "flagship" }>;

export function FlagshipAct({ section }: { section: FlagshipSection }) {
  return (
    <Act
      id={section.id}
      number={section.number}
      eyebrow={section.eyebrow}
      tone={section.tone}
    >
      <div className={caseStyles.head} data-reveal>
        <h2>{flagship.title}</h2>
      </div>

      {/* data-split, not data-reveal: four short sentences that should arrive
          one line at a time. The wrapper carries neither attribute -- a
          data-reveal ancestor holds its subtree at opacity 0 until it fires,
          which would animate the split lines inside something invisible. */}
      <div className={styles.statement}>
        <p className={styles.positioning} data-split>
          {flagship.positioning}
        </p>
        <div className={styles.figure} data-reveal>
          <Figure name={flagship.figure} />
        </div>
      </div>

      <ul className={caseStyles.metrics} data-reveal>
        {flagship.metrics.map((metric) => (
          <li className={caseStyles.metric} key={metric.label}>
            <span className={caseStyles.metricValue}>{metric.value}</span>
            <span className={caseStyles.metricLabel}>{metric.label}</span>
          </li>
        ))}
      </ul>

      {/* Under the metrics, not above them. The three zeros are what the
          project did; this is what the project was for. Stating the question
          before the evidence would make the evidence read as its defence. */}
      <p className={caseStyles.tests} data-reveal>
        <span className={caseStyles.testsKey}>Testing</span> {flagship.tests}
      </p>

      <div className={caseStyles.beats}>
        {flagship.beats.map((beat) => (
          <div className={caseStyles.beat} key={beat.label} data-reveal>
            <p className={caseStyles.beatLabel}>{beat.label}</p>
            <div className={caseStyles.beatCopy}>
              <h3>{beat.heading}</h3>
              <p>{beat.body}</p>
            </div>
          </div>
        ))}
      </div>

      <div className={caseStyles.footer} data-reveal>
        <ul className={caseStyles.tech}>
          {flagship.tech.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <ArrowLink href={flagship.href}>{flagship.name} on GitHub</ArrowLink>
      </div>
    </Act>
  );
}
