import { Fragment } from "react";
import { homeSections } from "@/content";
import type { HomeSection } from "@/content";
import { FlagshipAct } from "./FlagshipAct";
import { Hero } from "./Hero";
import { WorkAct } from "./WorkAct";
import { Confetti } from "./Confetti";
import { SectionDivider } from "./SectionDivider";
import { BubblePanel } from "./BubblePanel";
import styles from "./HomePage.module.css";

function assertNever(section: never): never {
  throw new Error(`Unhandled home section: ${JSON.stringify(section)}`);
}

function renderSection(section: HomeSection) {
  switch (section.kind) {
    case "hero":
      return <Hero key={section.id} />;
    case "runner":
    case "panel":
      return null;
    case "act":
      switch (section.act) {
        case "flagship":
          return <FlagshipAct key={section.id} section={section} />;
        case "work":
          return <WorkAct key={section.id} section={section} />;
        case "about":
        case "contact":
          return null;
        default:
          return assertNever(section);
      }
    default:
      return assertNever(section);
  }
}

export function HomePage() {
  return (
    <div className={styles.homeShell}>
      <Confetti />
      {homeSections.map((section) => (
        <Fragment key={section.id}>
          {section.kind === "act" && section.act === "flagship" ? <BubblePanel /> : null}
          {section.kind === "act" && section.act === "work" ? <SectionDivider /> : null}
          {renderSection(section)}
        </Fragment>
      ))}
    </div>
  );
}
