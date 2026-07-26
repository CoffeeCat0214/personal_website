import type { ReactNode } from "react";
import styles from "./ArrowLink.module.css";

/* External links open in place rather than in a new tab. Forcing target="_blank"
   takes a navigation decision away from the visitor and strands screen-reader
   users in a context they did not ask for; the back button is a better
   affordance than a tab they did not open. */
export function ArrowLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a className={styles.link} href={href}>
      {children}
      <span className={styles.arrow} aria-hidden="true">
        ↗
      </span>
    </a>
  );
}
