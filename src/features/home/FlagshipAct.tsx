import { featuredProject } from "@/content";
import type { HomeSection } from "@/content";
import { Figure } from "@/components/brand/figures/Figure";
import { Act } from "@/components/ui/Act";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { ProjectFooter, ProjectMetrics, ProjectQuestion } from "@/features/projects/ProjectEvidence";
import caseStyles from "./Case.module.css";
import styles from "./Flagship.module.css";

/* The flagship act, and the only one that gets narrative depth.

   It carried no figure, metrics or link while it argued for an unbuilt story
   world -- there was nothing to depict and nothing to install. A shipped
   extension gets the same evidence a tool does, plus the three beats. */
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
      <div className={caseStyles.head} data-reveal>
        <h2>{project.title}</h2>
      </div>

      {/* data-split, not data-reveal: four short sentences that should arrive
          one line at a time. The wrapper carries neither attribute -- a
          data-reveal ancestor holds its subtree at opacity 0 until it fires,
          which would animate the split lines inside something invisible. */}
      <div className={styles.statement}>
        <p className={styles.positioning} data-split>
          {project.positioning ?? project.summary}
        </p>
        <div className={styles.figure} data-reveal>
          <Figure name={project.figure} />
        </div>
      </div>

      <ProjectMetrics metrics={project.metrics} />
      <ProjectQuestion tests={project.tests} />

      <div className={caseStyles.beats}>
        {project.caseStudy.map((beat) => (
          <div className={caseStyles.beat} key={beat.label} data-reveal>
            <p className={caseStyles.beatLabel}>{beat.label}</p>
            <div className={caseStyles.beatCopy}>
              <h3>{beat.heading}</h3>
              {beat.body.map((paragraph) => (
                <p key={paragraph.slice(0, 32)}>{paragraph}</p>
              ))}
            </div>
          </div>
        ))}
      </div>

      <ProjectFooter tech={project.tech}>
        <ArrowLink href={`/work/${project.slug}/`}>Read the case study</ArrowLink>
        <ArrowLink href={project.repoHref}>{project.name} on GitHub</ArrowLink>
      </ProjectFooter>
    </Act>
  );
}
