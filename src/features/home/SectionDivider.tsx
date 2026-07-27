"use client";

import { useState } from "react";
import styles from "./SectionDivider.module.css";

/* Must stay in sync with the -20% travel in section-drift: the keyframe shifts
   the track by exactly one unit, which is 1/REPEATS of its width. */
const REPEATS = 5;

export function SectionDivider() {
  const [paused, setPaused] = useState(false);

  return (
    <div className={styles.divider} data-separator="projects">
      <div className={`${styles.track} ${paused ? styles.paused : ""}`} aria-hidden="true">
        {Array.from({ length: REPEATS }, (_, index) => (
          <span className={styles.unit} key={index}>
            <span>COFFEECAT</span>
            <b>→</b>
            <span>CRÈMEAI</span>
            <i>✦</i>
          </span>
        ))}
      </div>
      <button
        className={styles.toggle}
        type="button"
        aria-pressed={paused}
        aria-label={paused ? "Resume project marker" : "Pause project marker"}
        onClick={() => setPaused((value) => !value)}
      >
        {paused ? "Play" : "Pause"}
      </button>
    </div>
  );
}
