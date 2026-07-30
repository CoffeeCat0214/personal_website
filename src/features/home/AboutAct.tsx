import { about, background, skills } from "@/content";
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
      {/* Two blocks, both carrying a surface. Headings and lists sitting on the
          bare ground read as raw text rather than as composition, so everything
          in this act belongs to either the intro panel or the record panel. */}
      <div className={styles.intro} data-reveal>
        <div className={styles.introCopy}>
          <div className={styles.introHead}>
            <p className={styles.kicker}>Profile notes / 03</p>
            <h2 data-split>{about.heading}</h2>
          </div>
          <div className={styles.story}>
            <p>{experience}</p>
            <p>{focus}</p>
          </div>
          {/* A closing line, not a chapter: the nav's Mode toggle already states
              the philosophy as a property of the page. Sitting it at the foot of
              this panel mirrors the stamp's caption opposite. */}
          <p className={styles.creed}>{motto}</p>
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
      {/* The résumé as one object: heading, entries and working set on the same
          surface, because a reader experiences them as one question. */}
      <section className={styles.record} aria-labelledby="background-heading" data-reveal>
        <div className={styles.recordHead}>
          <div>
            <p className={styles.kicker}>Selected context</p>
            <h3 id="background-heading">Where the work comes from.</h3>
          </div>
          <span className={styles.sectionIndex}>01—02</span>
        </div>
        <IndexList entries={background} />
        {/* Keywords in one strip, with a kicker rather than a heading of its
            own. The entry above already names Spark, AWS, microservices and
            observability in prose; this exists for people scanning for the
            words, which does not justify a section around it. */}
        <div className={styles.workingSet}>
          <p className={styles.kicker}>Working set</p>
          <ul className={styles.skillLine}>
            {skills.map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
        </div>
      </section>
    </Act>
  );
}
