import styles from "./BubblePanel.module.css";

const REPEATS = 5;

export function BubblePanel() {
  return (
    <div className={styles.panel} data-separator="bubble" aria-hidden="true">
      <div className={styles.track}>
        {Array.from({ length: REPEATS }, (_, index) => (
          <span className={styles.unit} key={index}>
            EVEN IN THE AGE <b>OF AI.</b>
          </span>
        ))}
      </div>
    </div>
  );
}
