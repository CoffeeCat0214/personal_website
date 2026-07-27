"use client";

import { useState } from "react";
import styles from "./SystemPulse.module.css";

const NODES = [
  { label: "Discord", detail: "A command enters." },
  { label: "Lambda", detail: "A clean handler runs." },
  { label: "DynamoDB", detail: "Cached answers skip repeat work." },
  { label: "OpenAI", detail: "The model comes last." },
] as const;

export function SystemPulse() {
  const [active, setActive] = useState(0);
  const node = NODES[active];

  return (
    <section className={styles.pulse} aria-labelledby="pulse-title">
      <div className={styles.header}>
        <p className={styles.label}>Request path</p>
        <span>04 steps</span>
      </div>
      <h4 id="pulse-title">Follow one message.</h4>
      <ol className={styles.nodes}>
        {NODES.map((item, index) => (
          <li key={item.label}>
            <button
              type="button"
              className={active === index ? styles.active : undefined}
              aria-pressed={active === index}
              onClick={() => setActive(index)}
            >
              <span className={styles.index}>0{index + 1}</span>
              <span>{item.label}</span>
            </button>
          </li>
        ))}
      </ol>
      <p className={styles.detail} aria-live="polite">
        <span>Now</span> {node.detail}
      </p>
    </section>
  );
}
