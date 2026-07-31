import { FigureFrame } from "./FigureFrame";
import styles from "./Figure.module.css";

const lines = [
  { gutter: "01", text: "raw events", tone: "muted" },
  { gutter: "→", text: "Spark ETL", tone: "added" },
  { gutter: "→", text: "serving APIs", tone: "added" },
  { gutter: "·", text: "observe each boundary", tone: "muted" },
] as const;

export function PipelineFigure() {
  return (
    <FigureFrame
      label="An illustrative production data path from raw events through Spark ETL to serving APIs, with observability at each boundary."
      chrome="adtech — production path"
    >
      <div className={styles.panel}>
        {lines.map((line) => (
          <span className={styles.line} key={line.gutter + line.text}>
            <span className={styles.gutter}>{line.gutter}</span>
            <span className={styles[line.tone]}>{line.text}</span>
          </span>
        ))}
      </div>
    </FigureFrame>
  );
}
