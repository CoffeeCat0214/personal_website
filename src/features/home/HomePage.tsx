import { homeSections } from "@/content";
import type { HomeSection } from "@/content";
import { AboutAct } from "./AboutAct";
import { ContactAct } from "./ContactAct";
import { FlagshipAct } from "./FlagshipAct";
import { Hero } from "./Hero";
import { MarkPanel } from "./MarkPanel";
import { Runner } from "./Runner";
import { WorkAct } from "./WorkAct";
import { Confetti } from "./Confetti";

function assertNever(section: never): never {
  throw new Error(`Unhandled home section: ${JSON.stringify(section)}`);
}

function renderSection(section: HomeSection) {
  switch (section.kind) {
    case "hero":
      return <Hero key={section.id} />;
    case "runner":
      return <Runner key={section.runner.id} runner={section.runner} />;
    case "panel":
      return <MarkPanel key={section.panel.id} panel={section.panel} />;
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
  return (
    <>
      <Confetti />
      {homeSections.map(renderSection)}
    </>
  );
}
