import type { Project } from "@/content/site";
import { Act } from "./Act";
import { CoffeeCatFigure } from "./figures/CoffeeCatFigure";
import { DiffFigure } from "./figures/DiffFigure";
import { ThreadFigure } from "./figures/ThreadFigure";
import { ArrowLink } from "./ArrowLink";
import styles from "./ProjectAct.module.css";

const figures = {
  coffeecat: CoffeeCatFigure,
  diff: DiffFigure,
  thread: ThreadFigure,
};

export function ProjectAct({
  project,
  anchorId,
}: {
  project: Project;
  anchorId?: string;
}) {
  const Figure = figures[project.figure];

  return (
    <Act
      id={project.id}
      number={project.number}
      eyebrow={project.eyebrow}
      tone={project.tone}
      anchorId={anchorId}
    >
      <div className={styles.head} data-reveal>
        <h2>{project.title}</h2>
        <p className={styles.subtitle}>{project.subtitle}</p>
      </div>

      <div className={styles.showcase} data-reveal>
        <Figure />
        <ul className={styles.metrics}>
          {project.metrics.map((metric) => (
            <li className={styles.metric} key={metric.label}>
              <span className={styles.metricValue}>{metric.value}</span>
              <span className={styles.metricLabel}>{metric.label}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.beats}>
        {project.beats.map((beat) => (
          <div className={styles.beat} key={beat.label} data-reveal>
            <p className={styles.beatLabel}>{beat.label}</p>
            <div className={styles.beatCopy}>
              <h3>{beat.heading}</h3>
              <p>{beat.body}</p>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.footer} data-reveal>
        <ul className={styles.tech}>
          {project.tech.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        {/* The previous site stored this URL on both projects and rendered it on
            neither. */}
        <ArrowLink href={project.href}>
          {project.name} on GitHub
        </ArrowLink>
      </div>
    </Act>
  );
}
