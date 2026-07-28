import { about, background, skillGroups } from "@/content";
import type { HomeSection } from "@/content";
import { Act } from "@/components/ui/Act";
import { IndexList } from "@/components/ui/IndexList";
import { CatMark } from "@/components/brand/CatMark";
import styles from "./About.module.css";

type AboutSection = Extract<HomeSection, { kind: "act"; act: "about" }>;

export function AboutAct({ section }: { section: AboutSection }) {
  const [experience, focus, cats, motto] = about.body;

  return (
    <Act
      id={section.id}
      number={section.number}
      eyebrow={section.eyebrow}
      tone={section.tone}
    >
      <div className={styles.intro} data-reveal>
        <div className={styles.introCopy}>
          <p className={styles.kicker}>Profile notes / 03</p>
          <h2 data-split>{about.heading}</h2>
          <div className={styles.story}>
            <p>{experience}</p>
            <p>{focus}</p>
          </div>
        </div>
        <aside className={styles.stamp} aria-label="Studio note">
          <div className={styles.stampMeta}>
            <span>Studio note</span>
            <span>NY / 2026</span>
          </div>
          <div className={styles.stampArt}>
            <CatMark variant="panel" />
          </div>
          <p className={styles.stampCaption}>{cats}</p>
        </aside>
      </div>
      <div className={styles.motto} data-reveal>
        <span className={styles.mottoLabel}>Working rule</span>
        <p>{motto}</p>
      </div>
      <section className={styles.indexSection} aria-labelledby="background-heading">
        <div className={styles.sectionHeader}>
          <div>
            <p className={styles.kicker}>Selected context</p>
            <h3 id="background-heading">Where the work comes from.</h3>
          </div>
          <span className={styles.sectionIndex}>01—02</span>
        </div>
        <IndexList entries={background} />
      </section>
      <section className={styles.capabilities} aria-labelledby="capabilities-heading" data-reveal>
        <div className={styles.capabilityIntro}>
          <p className={styles.kicker}>Capability index</p>
          <h3 id="capabilities-heading">The working set.</h3>
          <p>Tools and practices that keep the systems useful after the demo.</p>
        </div>
        <div className={styles.skillGroups}>
          {skillGroups.map((group) => (
            <div className={styles.group} key={group.label}>
              <p className={styles.groupLabel}>{group.label}</p>
              <ul>
                {group.skills.map((skill) => (
                  <li key={skill}>
                    <span aria-hidden="true">+</span>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </Act>
  );
}
