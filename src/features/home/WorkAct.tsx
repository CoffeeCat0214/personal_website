import { supportingProjects } from "@/content";
import type { HomeSection } from "@/content";
import { Figure } from "@/components/brand/figures/Figure";
import { Act } from "@/components/ui/Act";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { ProjectFooter, ProjectMetrics, ProjectQuestion } from "@/features/projects/ProjectEvidence";
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
        {supportingProjects.map((tool) => (
          <article className={styles.tool} key={tool.slug}>
            <div className={styles.copy} data-reveal>
              <p className={caseStyles.beatLabel}>{tool.eyebrow}</p>
              <h3>{tool.title}</h3>
              <p className={styles.subtitle}>{tool.summary}</p>

              <ProjectQuestion tests={tool.tests} reveal={false} />
              <ProjectMetrics metrics={tool.metrics} reveal={false} />

              <ProjectFooter tech={tool.tech} reveal={false}>
                <ArrowLink href={`/work/${tool.slug}/`}>Read the case study</ArrowLink>
                <ArrowLink href={tool.repoHref}>{tool.name} on GitHub</ArrowLink>
              </ProjectFooter>
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
