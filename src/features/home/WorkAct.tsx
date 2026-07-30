import { supportingProjects, work } from "@/content";
import type { HomeSection } from "@/content";
import { Figure } from "@/components/brand/figures/Figure";
import { Act } from "@/components/ui/Act";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { ProjectMetrics } from "@/features/projects/ProjectEvidence";
import { SystemPulse } from "./SystemPulse";
import caseStyles from "./Case.module.css";
import styles from "./Work.module.css";

/* The supporting projects, in one act. CoffeeCat is the flagship above;
   CodeHuskAI stays in the catalog for old links but is not promoted here.

   Each tool is an <article> because it is independently meaningful: the act's h2
   names the group and each tool's h3 sits under it, so the heading order
   describes the structure. */
type WorkSection = Extract<HomeSection, { kind: "act"; act: "work" }>;

export function WorkAct({ section }: { section: WorkSection }) {
  return (
    <Act
      id={section.id}
      number={section.number}
      eyebrow={section.eyebrow}
      tone={section.tone}
    >
      <div className={styles.projectHead} data-reveal>
        <p className={caseStyles.beatLabel}>{work.heading}</p>
        <h2>{work.title}</h2>
      </div>

      <div className={styles.tools}>
        {supportingProjects.map((tool) => (
          <article className={styles.tool} key={tool.slug}>
            <div className={styles.copy} data-reveal>
              <p className={caseStyles.beatLabel}>{tool.eyebrow}</p>
              <h3>{tool.preview?.title ?? tool.title}</h3>
              <p className={styles.subtitle}>{tool.preview?.summary ?? tool.summary}</p>

              <ProjectMetrics metrics={tool.metrics} reveal={false} />
              <SystemPulse />

              <div className={styles.links}>
                <ArrowLink href={`/work/${tool.slug}/`}>Case study</ArrowLink>
                <ArrowLink href={tool.repoHref}>GitHub</ArrowLink>
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
