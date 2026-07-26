import type { ReactNode } from "react";
import styles from "./Figure.module.css";

/* The whole composite is one role="img" with a written description. Every
   inner part is decoration -- announcing "3 dots, 4 skeleton bars, a mug" would
   be noise, and leaving it unlabelled would be a silent hole. One accurate
   sentence replaces the lot. */
export function FigureFrame({
  label,
  chrome,
  children,
}: {
  label: string;
  chrome: string;
  children: ReactNode;
}) {
  return (
    <figure className={styles.figure} role="img" aria-label={label}>
      <div className={styles.bar} aria-hidden="true">
        <span className={styles.dot} />
        <span className={styles.dot} />
        <span className={styles.dot} />
        <span className={styles.barLabel}>{chrome}</span>
      </div>
      <div className={styles.stage} aria-hidden="true">
        {children}
      </div>
    </figure>
  );
}
