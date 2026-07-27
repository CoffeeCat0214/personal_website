import { site } from "@/content";
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`wrap ${styles.inner}`}>
        <span className={styles.mark}>{site.name}</span>
        {/* The masthead is the person now, so "Built by <name>" here would be
            the third printing of the same name on one screen -- h1, this mark,
            and then the line below it. The role carries the attribution
            instead, and the place and year still do the colophon's job. */}
        <p className={styles.meta}>
          {site.kind} · {site.location} · {new Date().getFullYear()}
        </p>
        {/* A colophon that describes the old palette is worse than no colophon:
            it is the one paragraph on the page claiming the design was
            deliberate. Five grounds now, not six colours. */}
        {/* Kept honest as the build changes. This claimed the site had no
            runtime dependencies at all, which stopped being true the moment the
            motion layer landed -- and a colophon that describes a build the page
            no longer has is worse than none, because it is the one paragraph
            asserting the whole thing was deliberate. */}
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
