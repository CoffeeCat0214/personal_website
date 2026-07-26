import styles from "./SkipLink.module.css";

export function SkipLink() {
  return (
    <a className={styles.link} href="#main">
      Skip to content
    </a>
  );
}
