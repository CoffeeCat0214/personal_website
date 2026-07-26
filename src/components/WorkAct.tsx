import { tools } from "@/content/site";
import { Act } from "./Act";
import { CoffeeCatFigure } from "./figures/CoffeeCatFigure";
import { DiffFigure } from "./figures/DiffFigure";
import { ThreadFigure } from "./figures/ThreadFigure";
import { ArrowLink } from "./ArrowLink";
import caseStyles from "./Case.module.css";
import styles from "./Work.module.css";

const figures = {
  coffeecat: CoffeeCatFigure,
  diff: DiffFigure,
  thread: ThreadFigure,
};

/* Three shipped tools in one act.

   These used to be three separate acts with full Problem/Approach/Result
   narratives, back when the site was a portfolio and they were the point. They
   are supporting evidence now: they exist to show the studio can build and
   finish things, which takes a title, a paragraph and a link -- not eleven
   hundred words that would out-argue the flagship sitting above them.

   Each tool is an <article> because each is independently meaningful; the act's
   h2 names the group and each tool's h3 sits under it, so the heading order
   still describes the structure. */
export function WorkAct({ anchorId }: { anchorId?: string }) {
  return (
    <Act id="work" number="03" eyebrow="Also from the Lab" tone="sage" anchorId={anchorId}>
      <div className={caseStyles.head} data-reveal>
        <h2>Things the Lab has already finished.</h2>
      </div>

      <div className={styles.tools}>
        {tools.map((tool) => {
          const Figure = figures[tool.figure];

          return (
            <article className={styles.tool} key={tool.id}>
              <div className={styles.copy} data-reveal>
                <p className={caseStyles.beatLabel}>{tool.eyebrow}</p>
                <h3>{tool.title}</h3>
                <p className={styles.subtitle}>{tool.subtitle}</p>

                <ul className={styles.metrics}>
                  {tool.metrics.map((metric) => (
                    <li className={styles.metric} key={metric.label}>
                      <span className={styles.metricValue}>{metric.value}</span>
                      <span className={caseStyles.metricLabel}>{metric.label}</span>
                    </li>
                  ))}
                </ul>

                <div className={styles.footer}>
                  <ul className={caseStyles.tech}>
                    {tool.tech.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <ArrowLink href={tool.href}>{tool.name} on GitHub</ArrowLink>
                </div>
              </div>

              <div className={styles.figure} data-reveal>
                <Figure />
              </div>
            </article>
          );
        })}
      </div>
    </Act>
  );
}
