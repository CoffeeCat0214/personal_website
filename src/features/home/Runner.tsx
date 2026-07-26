import type { Runner as RunnerData } from "@/content";
import styles from "./Runner.module.css";

/* A full-bleed marquee band -- the reference site's "Runners", which mark the
   seams between acts with a repeated statement rather than a rule.

   Stays a server component. The track is plain markup carrying data-runner, and
   MotionProvider finds it and drives it; nothing here needs to ship JS, which
   is the same division of labour Reveal.tsx already uses for [data-reveal].

   The phrases repeat REPEATS times because a marquee has to be wider than the
   viewport before translating it reads as continuous motion rather than a slide.
   Only the first copy is exposed to assistive tech: a screen reader announcing
   "Ask what is true / Ask how you know" eight times is noise, but announcing it
   zero times loses a real line of the page's argument. So the first pass is the
   accessible one and the rest are aria-hidden decoration. */

const REPEATS = 8;

export function Runner({ runner }: { runner: RunnerData }) {
  const phrase = (
    <>
      <span className={styles.phrase}>{runner.phrases[0]}</span>
      <span className={styles.slash} aria-hidden="true">
        /
      </span>
      <span className={styles.phrase}>{runner.phrases[1]}</span>
      <span className={styles.slash} aria-hidden="true">
        /
      </span>
    </>
  );

  return (
    /* data-tone so the sticky nav re-colours over this band like any other
       ground -- a runner that did not report its tone would leave the nav
       painted with whatever act preceded it. */
    <section
      id={runner.id}
      className={`tone-${runner.tone} ${styles.runner}`}
      data-tone={runner.tone}
    >
      <div className={styles.track} data-runner>
        <div className={styles.group}>{phrase}</div>
        {Array.from({ length: REPEATS - 1 }, (_, i) => (
          <div className={styles.group} key={i} aria-hidden="true">
            {phrase}
          </div>
        ))}
      </div>
    </section>
  );
}
