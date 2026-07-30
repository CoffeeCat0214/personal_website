import { site } from "@/content";
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`wrap ${styles.inner}`}>
        <span className={styles.mark}>{site.name}</span>
        {/* The role, not "Built by <name>": the name is already the h1 and the
            mark above, and a third printing on one screen is not attribution. */}
        <p className={styles.meta}>
          {site.kind} · {site.location} · {new Date().getFullYear()}
        </p>
        {/* This paragraph is the one place the page claims its own design was
            deliberate, so it has to stay true as the build changes. If the type,
            the palette or the motion layer move, this moves with them. */}
        <small className={styles.colophon}>
          Set in Inter, Courier Prime and Geist Mono, self-hosted — a heavy
          grotesque for the big ideas, a typewriter voice for the build notes,
          and a mono utility face for the metadata. Built with Next.js as a
          static export; the colour blocks, cat stickers and small interactive
          demos are all plain CSS and React. Scroll motion is GSAP and Lenis,
          and none of it runs under prefers-reduced-motion.
        </small>
      </div>
    </footer>
  );
}
