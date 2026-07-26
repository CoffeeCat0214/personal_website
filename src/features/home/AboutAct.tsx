import { about, background, skills } from "@/content";
import type { HomeSection } from "@/content";
import { Act } from "@/components/ui/Act";
import { IndexList } from "@/components/ui/IndexList";
import styles from "./About.module.css";

type AboutSection = Extract<HomeSection, { kind: "act"; act: "about" }>;

export function AboutAct({ section }: { section: AboutSection }) {
  return (
    <Act
      id={section.id}
      number={section.number}
      eyebrow={section.eyebrow}
      tone={section.tone}
    >
      <div className="section-head">
        <h2 data-split>{about.heading}</h2>
      </div>
      <div className={styles.copy} data-reveal>
        {about.body.map((paragraph) => (
          <p key={paragraph.slice(0, 32)}>{paragraph}</p>
        ))}
      </div>
      <IndexList entries={background} />
      <ul className={styles.skills} data-reveal>
        {skills.map((skill) => (
          <li key={skill}>{skill}</li>
        ))}
      </ul>
    </Act>
  );
}
