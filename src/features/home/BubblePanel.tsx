"use client";

import { useState } from "react";
import styles from "./BubblePanel.module.css";

const REPEATS = 5;

export function BubblePanel() {
  const [paused, setPaused] = useState(false);

  return (
    <div className={styles.panel} data-separator="bubble">
      <div className={`${styles.track} ${paused ? styles.paused : ""}`} aria-hidden="true">
        {Array.from({ length: REPEATS }, (_, index) => (
          <span className={styles.unit} key={index}>
            EVEN IN THE AGE <b>OF AI.</b>
          </span>
        ))}
      </div>
      <button
        className={styles.toggle}
        type="button"
        aria-pressed={paused}
        aria-label={paused ? "Resume section marker" : "Pause section marker"}
        onClick={() => setPaused((value) => !value)}
      >
        {paused ? "Play" : "Pause"}
      </button>
    </div>
  );
}
