import { supportingProjects, work } from "@/content";
import type { HomeSection } from "@/content";
import { Figure } from "@/components/brand/figures/Figure";
import { Act } from "@/components/ui/Act";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { ProjectMetrics } from "@/features/projects/ProjectEvidence";
import { SystemPulse } from "./SystemPulse";
import { SakuraPixelTransition } from "./SakuraPixelTransition";
import caseStyles from "./Case.module.css";
import styles from "./Work.module.css";

/* One supporting project, in one act. CoffeeCat is the flagship above; CrèmeAI
   is the one additional project carried in the public index. CodeHuskAI stays
   in the catalog for old links but is intentionally not promoted here.

   Each tool is an <article> because it is independently meaningful; the act's
   h2 names the group and each tool's h3 sits under it, so the heading order
   still describes the structure.

   The anchor is the project name so the homepage CTA and case-study return link
   land on the same place. */
type WorkSection = Extract<HomeSection, { kind: "act"; act: "work" }>;

export function WorkAct({ section }: { section: WorkSection }) {
  return (
    <Act
      id={section.id}
      number={section.number}
      eyebrow={section.eyebrow}
      tone={section.tone}
    >
      <SakuraPixelTransition>
        <div className={styles.projectHead} data-reveal>
          <p className={caseStyles.beatLabel}>{work.heading}</p>
          <h2 data-transition-target="cremeai">CrèmeAI</h2>
        </div>
      </SakuraPixelTransition>

      <div className={styles.tools}>
        {supportingProjects.map((tool) => (
          <article className={styles.tool} key={tool.slug}>
            <div className={styles.copy} data-reveal>
              <p className={caseStyles.beatLabel}>{tool.eyebrow}</p>
              <h3>{tool.title}</h3>
              <p className={styles.subtitle}>{tool.summary}</p>

              <ProjectMetrics metrics={tool.metrics} reveal={false} />
              <SystemPulse />

              <div className={styles.links}>
                <ArrowLink href={`/work/${tool.slug}/`}>Read the case study</ArrowLink>
                <ArrowLink href={tool.repoHref}>{tool.name} on GitHub</ArrowLink>
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
