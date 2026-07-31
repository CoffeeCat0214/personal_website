import { featuredProject } from "@/content";
import type { HomeSection } from "@/content";
import { Figure } from "@/components/brand/figures/Figure";
import { Act } from "@/components/ui/Act";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { ProjectFooter, ProjectMetrics } from "@/features/projects/ProjectEvidence";
import { FocusTimer } from "./FocusTimer";
import caseStyles from "./Case.module.css";
import styles from "./Flagship.module.css";

/* The flagship project gets the first interactive demo and the strongest visual
   lead. Detailed narrative remains on its case-study route. */
type FlagshipSection = Extract<HomeSection, { kind: "act"; act: "flagship" }>;

export function FlagshipAct({ section }: { section: FlagshipSection }) {
  const project = featuredProject;

  return (
    <Act
      id={section.id}
      number={section.number}
      eyebrow={section.eyebrow}
      tone={section.tone}
    >
      <div className={styles.projectHead} data-reveal>
        <p className={caseStyles.beatLabel}>{project.eyebrow}</p>
        <h2>{project.title}</h2>
      </div>

      <div className={styles.showcase}>
        <div className={styles.claim}>
          <p className={styles.positioning} data-split>
            {project.positioning}
          </p>
          <ProjectMetrics metrics={project.metrics} />
          <FocusTimer />
        </div>
        <div className={styles.figure} data-reveal>
          <Figure name={project.figure} />
        </div>
      </div>

      <ProjectFooter tech={project.tech}>
        <ArrowLink href={`/work/${project.slug}/`}>Case study</ArrowLink>
        {project.repoHref ? <ArrowLink href={project.repoHref}>GitHub</ArrowLink> : null}
      </ProjectFooter>
    </Act>
  );
}
