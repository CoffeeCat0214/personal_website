"use client";

import { useState } from "react";
import styles from "./SystemPulse.module.css";

const NODES = [
  { label: "Discord", detail: "A message enters through the bot command surface." },
  { label: "Lambda", detail: "The handler stays stateless and gives each request a clean boundary." },
  { label: "DynamoDB", detail: "Cached responses keep repeat questions from doing extra work." },
  { label: "OpenAI", detail: "The model is the final step, not the whole architecture." },
] as const;

export function SystemPulse() {
  const [active, setActive] = useState(0);
  const node = NODES[active];

  return (
    <section className={styles.pulse} aria-labelledby="pulse-title">
      <div className={styles.header}>
        <p className={styles.label}>System pulse</p>
        <span>request path / 04</span>
      </div>
      <h4 id="pulse-title">Trace a message through the service.</h4>
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
        <span>Now inspecting</span> {node.detail}
      </p>
    </section>
  );
}
