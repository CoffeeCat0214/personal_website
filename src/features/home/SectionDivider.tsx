import styles from "./SectionDivider.module.css";

/* Must stay in sync with the -20% travel in section-drift: the keyframe shifts
   the track by exactly one unit, which is 1/REPEATS of its width. */
const REPEATS = 5;

export function SectionDivider() {
  return (
    <div className={styles.divider} data-separator="projects" aria-hidden="true">
      <div className={styles.track}>
        {Array.from({ length: REPEATS }, (_, index) => (
          <span className={styles.unit} key={index}>
            <span>COFFEECAT</span>
            <b>→</b>
            <span>CRÈMEAI</span>
            <i>✦</i>
          </span>
        ))}
      </div>
    </div>
  );
}
