import { tools } from "@/content";
import type { HomeSection } from "@/content";
import { Figure } from "@/components/brand/figures/Figure";
import { Act } from "@/components/ui/Act";
import { ArrowLink } from "@/components/ui/ArrowLink";
import caseStyles from "./Case.module.css";
import styles from "./Work.module.css";

/* The two AI projects, in one act. These were three until the extension was
   promoted. Keeping them in one act stops them competing with it for attention.

   Each tool is an <article> because each is independently meaningful; the act's
   h2 names the group and each tool's h3 sits under it, so the heading order
   still describes the structure.

   The id stays "work" while the label reads "Experiments". The anchor is a URL
   people may already have; renaming it to match the copy would break those for
   a word only the nav shows. */
type WorkSection = Extract<HomeSection, { kind: "act"; act: "work" }>;

export function WorkAct({ section }: { section: WorkSection }) {
  return (
    <Act
      id={section.id}
      number={section.number}
      eyebrow={section.eyebrow}
      tone={section.tone}
    >
      <div className={caseStyles.head} data-reveal>
        <h2>Two more experiments, shipped.</h2>
      </div>

      <div className={styles.tools}>
        {tools.map((tool) => (
          <article className={styles.tool} key={tool.id}>
            <div className={styles.copy} data-reveal>
              <p className={caseStyles.beatLabel}>{tool.eyebrow}</p>
              <h3>{tool.title}</h3>
              <p className={styles.subtitle}>{tool.subtitle}</p>

              <p className={caseStyles.tests}>
                <span className={caseStyles.testsKey}>Testing</span> {tool.tests}
              </p>

              <ul className={caseStyles.metrics}>
                {tool.metrics.map((metric) => (
                  <li className={caseStyles.metric} key={metric.label}>
                    <span className={caseStyles.metricValue}>{metric.value}</span>
                    <span className={caseStyles.metricLabel}>{metric.label}</span>
                  </li>
                ))}
              </ul>

              <div className={caseStyles.footer}>
                <ul className={caseStyles.tech}>
                  {tool.tech.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <ArrowLink href={tool.href}>{tool.name} on GitHub</ArrowLink>
              </div>
            </div>

            <div className={styles.figure} data-reveal>
              <Figure name={tool.figure} />
            </div>
          </article>
        ))}
      </div>
    </Act>
  );
}
