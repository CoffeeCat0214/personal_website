import { getProjectBySlug } from "@/content";
import type { HomeSection } from "@/content";
import { Figure } from "@/components/brand/figures/Figure";
import { Act } from "@/components/ui/Act";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { ProjectMetrics } from "@/features/projects/ProjectEvidence";
import { SystemPulse } from "./SystemPulse";
import caseStyles from "./Case.module.css";
import styles from "./Work.module.css";

type CremeAISection = Extract<HomeSection, { kind: "act"; act: "cremeai" }>;

export function CremeAIAct({ section }: { section: CremeAISection }) {
  const project = getProjectBySlug("cremeai");

  if (!project) return null;

  const preview = "preview" in project ? project.preview : undefined;
  const repoHref = "repoHref" in project ? project.repoHref : undefined;

  return (
    <Act
      id={section.id}
      number={section.number}
      eyebrow={section.eyebrow}
      tone={section.tone}
    >
      <div className={styles.projectHead} data-reveal>
        <p className={caseStyles.beatLabel}>{project.eyebrow}</p>
        <h2>{preview?.title ?? project.title}</h2>
      </div>

      <div className={styles.tools}>
        <article className={styles.tool}>
          <div className={styles.copy} data-reveal>
            <p className={caseStyles.beatLabel}>{project.eyebrow}</p>
            <h3>{preview?.title ?? project.title}</h3>
            <p className={styles.subtitle}>{preview?.summary ?? project.summary}</p>

            <ProjectMetrics metrics={project.metrics} reveal={false} />
            <SystemPulse />

            <div className={styles.links}>
              <ArrowLink href={`/work/${project.slug}/`}>Case study</ArrowLink>
              {repoHref ? <ArrowLink href={repoHref}>GitHub</ArrowLink> : null}
            </div>
          </div>

          <div className={styles.figure} data-reveal>
            <Figure name={project.figure} />
          </div>
        </article>
      </div>
    </Act>
  );
}
