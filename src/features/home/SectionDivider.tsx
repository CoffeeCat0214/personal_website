import styles from "./SectionDivider.module.css";

const REPEATS = 6;

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
