import { FigureFrame } from "./FigureFrame";
import styles from "./Figure.module.css";

const messages: { from: "user" | "bot"; text: string }[] = [
  { from: "user", text: "what's the cache hit rate looking like today?" },
  { from: "bot", text: "Cache window checked — a cached answer is ready." },
  { from: "user", text: "any throttled requests?" },
];

export function ThreadFigure() {
  return (
    <FigureFrame
      label="An illustrative Discord conversation with CremeAI: a cache question receives a compact answer before the user asks about throttling."
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
