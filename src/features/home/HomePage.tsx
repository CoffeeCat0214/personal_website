import { Fragment } from "react";
import { homeSections } from "@/content";
import type { HomeSection } from "@/content";
import { FlagshipAct } from "./FlagshipAct";
import { Hero } from "./Hero";
import { WorkAct } from "./WorkAct";
import { AboutAct } from "./AboutAct";
import { ContactAct } from "./ContactAct";
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
    case "act":
      switch (section.act) {
        case "flagship":
          return <FlagshipAct key={section.id} section={section} />;
        case "work":
          return <WorkAct key={section.id} section={section} />;
        case "about":
          return <AboutAct key={section.id} section={section} />;
        case "contact":
          return <ContactAct key={section.id} section={section} />;
        default:
          return assertNever(section);
      }
    default:
      return assertNever(section);
  }
}

export function HomePage() {
  const heroSection = homeSections[0];
  const postHeroSections = homeSections.slice(1);

  return (
    <div className={styles.homeShell}>
      <Confetti />
      {renderSection(heroSection)}
      <div className={styles.postHero}>
        {postHeroSections.map((section) => (
          <Fragment key={section.id}>
            {section.kind === "act" && section.act === "flagship" ? <BubblePanel /> : null}
            {section.kind === "act" && section.act === "work" ? <SectionDivider /> : null}
            {renderSection(section)}
          </Fragment>
        ))}
      </div>
    </div>
  );
}
