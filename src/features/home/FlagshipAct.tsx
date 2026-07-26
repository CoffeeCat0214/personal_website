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
      {/* The metrics sit inside this row rather than under it, and that is an
          argument rather than a layout tweak. The positioning line claims no
          backend, no analytics, no host permissions; the metrics are 0 network
          calls, 0 dependencies, 0 accounts. They are the same statement made
          twice, once in prose and once in evidence, so separating them left the
          claim unsupported and the numbers unexplained -- and left ~450px of
          empty ground beside a tall figure, because a 24ch line cannot fill a
          row that an illustration is setting the height of. */}
      <div className={styles.statement}>
        <div className={styles.claim}>
          <p className={styles.positioning} data-split>
            {project.positioning ?? project.summary}
          </p>
          <ProjectMetrics metrics={project.metrics} />
        </div>
        <div className={styles.figure} data-reveal>
          <Figure name={project.figure} />
        </div>
      </div>

      <ProjectQuestion tests={project.tests} />

      <div className={caseStyles.beats}>
        {project.caseStudy.map((beat) => (
          <div className={caseStyles.beat} key={beat.label} data-reveal>
            <p className={caseStyles.beatLabel}>{beat.label}</p>
            {/* Heading and body are siblings, not nested, so the row can set
                them as two columns of a spec table. Nested, the body inherited
                the heading's column and capped at 62ch, which left the right
                third of every row empty across the whole act. */}
            <h3 className={caseStyles.beatHeading}>{beat.heading}</h3>
            <div className={caseStyles.beatCopy}>
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
