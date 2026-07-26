import { FigureFrame } from "./FigureFrame";
import styles from "./Figure.module.css";

const messages: { from: "user" | "bot"; text: string }[] = [
  { from: "user", text: "what's the cache hit rate looking like today?" },
  { from: "bot", text: "94.2% over the last hour — 1,840 hits, 113 misses. Median response 240ms." },
  { from: "user", text: "any throttled requests?" },
];

export function ThreadFigure() {
  return (
    <FigureFrame
      label="A Discord conversation with CremeAI: a question about cache hit rate answered with hit, miss and latency figures."
      chrome="cremeai — #general"
    >
      <div className={styles.panel}>
        {messages.map((message, i) => (
          <span
            className={`${styles.bubble} ${
              message.from === "user" ? styles.fromUser : styles.fromBot
            }`}
            key={i}
          >
            {message.text}
          </span>
        ))}
        <span className={`${styles.bubble} ${styles.fromBot}`}>
          <span className={styles.typing}>
            <span />
            <span />
            <span />
          </span>
        </span>
      </div>
    </FigureFrame>
  );
}
