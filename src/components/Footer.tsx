import { site } from "@/content/site";
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`wrap ${styles.inner}`}>
        <span className={styles.mark}>{site.name}</span>
        <p className={styles.meta}>
          {site.location} · {new Date().getFullYear()}
        </p>
        {/* A colophon that describes the old palette is worse than no colophon:
            it is the one paragraph on the page claiming the design was
            deliberate. Five grounds now, not six colours. */}
        <small className={styles.colophon}>
          Set in Geist and Geist Mono, self-hosted. Five grounds, no rules and no
          box shadows — a section is a block of colour, and grouping comes from
          alignment rather than enclosure. Built with Next.js as a static export;
          the design system is plain CSS custom properties.
        </small>
      </div>
    </footer>
  );
}
