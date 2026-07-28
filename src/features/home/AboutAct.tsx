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
      {/* Two blocks, not four.

          This act used to run: a framed intro pair, then a "Working rule"
          motto, then a "Selected context" index, then a "Capability index" of
          fourteen skills in four columns. Only the first of those was framed --
          everything after it was headings and lists sitting on bare purple with
          hairlines, so the act opened confidently and then dissolved into raw
          text on the ground.

          The two survivors both carry a surface. The motto folds into the copy
          panel it was already paraphrasing, and the skills collapse into one
          strip at the foot of the record. Same claims, two objects. */}
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
          {/* The motto, which had its own full-width section and its own label.
              It is a closing line, not a chapter -- and the GLAM/GRIND marquee
              band plus the nav's MODE toggle already state the philosophy as a
              property of the page. Sitting it at the foot of this panel mirrors
              the stamp's caption opposite, so both panels close the same way. */}
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
      {/* The résumé, as one object: heading, the entries, and the working set
          on the same surface. Previously these were two sections separated by a
          3px rule, each with its own kicker and its own h3 -- two nameplates for
          what a reader experiences as one question, "what has she done". */}
      <section className={styles.record} aria-labelledby="background-heading" data-reveal>
        <div className={styles.recordHead}>
          <div>
            <p className={styles.kicker}>Selected context</p>
            <h3 id="background-heading">Where the work comes from.</h3>
          </div>
          <span className={styles.sectionIndex}>01—02</span>
        </div>
        <IndexList entries={background} />
        {/* Fourteen keywords, one line, no heading of its own.

            As a four-column grid under a third-level heading and an explanatory
            sentence, this was three pieces of chrome around a word list -- and
            the list mostly restated the entry above it, which already names
            Spark, AWS, microservices, observability and test-driven delivery in
            prose. The keywords still earn their place for anyone scanning for
            them; the section around them did not. */}
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
