import Link from "next/link";
import type { Project } from "@/content";
import { HOME_ROUTE } from "@/content";
import { Figure } from "@/components/brand/figures/Figure";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { ProjectFooter, ProjectMetrics, ProjectQuestion } from "./ProjectEvidence";
import styles from "./ProjectPage.module.css";

export function ProjectPage({ project }: { project: Project }) {
  return (
    <div data-project-tone={project.tone}>
      <section className={`tone-${project.tone} ${styles.hero}`} data-tone={project.tone}>
        <div className={`wrap ${styles.heroGrid}`}>
          <div className={styles.copy}>
            <p className={styles.eyebrow}>{project.eyebrow}</p>
            <h1>{project.name}</h1>
            <p className={styles.title}>{project.title}</p>
            <p className={styles.summary}>{project.summary}</p>
            <ProjectMetrics metrics={project.metrics} />
            <ProjectQuestion tests={project.tests} />
            <div className={styles.actions} data-reveal>
              <a className="btn" href={project.repoHref}>
                View repository
              </a>
              <Link className="btn secondary" href={`${HOME_ROUTE}#cremeai`}>
                Back to work
              </Link>
            </div>
          </div>
          <div className={styles.figure} data-reveal>
            <Figure name={project.figure} />
          </div>
        </div>
      </section>

      <section className={`tone-${project.tone} ${styles.case}`} data-tone={project.tone}>
        <div className={`wrap ${styles.caseGrid}`}>
          <div className={styles.rail} data-reveal>
            <span className={styles.label}>Case study</span>
          </div>
          <div className={styles.body}>
            {project.caseStudy.map((section) => (
              <section className={styles.section} key={section.label} data-reveal>
                <p className={styles.label}>{section.label}</p>
                <div className={styles.sectionCopy}>
                  <h2>{section.heading}</h2>
                  {section.body.map((paragraph) => (
                    <p key={paragraph.slice(0, 32)}>{paragraph}</p>
                  ))}
                </div>
              </section>
            ))}
            <ProjectFooter tech={project.tech}>
              <ArrowLink href={project.repoHref}>{project.name} on GitHub</ArrowLink>
            </ProjectFooter>
          </div>
        </div>
      </section>
    </div>
  );
}
