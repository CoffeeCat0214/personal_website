import type { ReactNode } from "react";
import type { Metric } from "@/content";
import styles from "./ProjectEvidence.module.css";

type Revealable = {
  reveal?: boolean;
};

const revealAttribute = (reveal: boolean) => (reveal ? "" : undefined);

export function ProjectMetrics({
  metrics,
  reveal = true,
}: {
  metrics: readonly Metric[];
} & Revealable) {
  return (
    <ul className={styles.metrics} data-reveal={revealAttribute(reveal)}>
      {metrics.map((metric) => (
        <li className={styles.metric} key={metric.label}>
          <span className={styles.metricValue}>{metric.value}</span>
          <span className={styles.metricLabel}>{metric.label}</span>
        </li>
      ))}
    </ul>
  );
}

export function ProjectQuestion({ tests, reveal = true }: { tests: string } & Revealable) {
  return (
    <p className={styles.question} data-reveal={revealAttribute(reveal)}>
      <span className={styles.questionKey}>Testing</span> {tests}
    </p>
  );
}

export function ProjectTechList({ items }: { items: readonly string[] }) {
  return (
    <ul className={styles.tech}>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export function ProjectFooter({
  tech,
  children,
  reveal = true,
}: {
  tech: readonly string[];
  children: ReactNode;
} & Revealable) {
  return (
    <div className={styles.footer} data-reveal={revealAttribute(reveal)}>
      <ProjectTechList items={tech} />
      {children}
    </div>
  );
}
