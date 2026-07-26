import { Fragment } from "react";
import { Hero } from "@/components/Hero";
import { Act } from "@/components/Act";
import { ProjectAct } from "@/components/ProjectAct";
import { MarkPanel } from "@/components/MarkPanel";
import { IndexList } from "@/components/IndexList";
import {
  about,
  education,
  experience,
  markPanels,
  projects,
  site,
  skills,
} from "@/content/site";
import aboutStyles from "@/components/About.module.css";
import contactStyles from "@/components/Contact.module.css";

/* One page of numbered acts on five grounds.

   The projects lead because that is what the page is for; CoffeeCat is first
   and runs the dark ground, so the inversion lands early where a visitor who
   bounces still sees it.

   Mark panels punctuate rather than divide. They are keyed by the section they
   precede, so the order here stays declarative and a panel cannot drift away
   from the act it introduces. */
export default function Home() {
  return (
    <>
      <Hero />

      {projects.map((project, i) => (
        <Fragment key={project.id}>
          {markPanels[project.id] ? <MarkPanel panel={markPanels[project.id]} /> : null}
          {/* The nav's "Work" link targets the first project act, while each
              project keeps its own id so a single case study stays linkable. */}
          <ProjectAct project={project} anchorId={i === 0 ? "work" : undefined} />
        </Fragment>
      ))}

      <MarkPanel panel={markPanels.experience} />

      <Act id="experience" number="04" eyebrow="Experience" tone="pink">
        <div className="section-head" data-reveal>
          <h2>Data platforms built for traffic.</h2>
        </div>
        <IndexList entries={experience} />
        <div className={aboutStyles.group}>
          <p className={aboutStyles.groupLabel}>Education</p>
          <IndexList entries={education} />
        </div>
      </Act>

      <Act id="about" number="05" eyebrow="About" tone="sage">
        <div className={aboutStyles.copy} data-reveal>
          <h2>{about.heading}</h2>
          {about.body.map((paragraph) => (
            <p key={paragraph.slice(0, 32)}>{paragraph}</p>
          ))}
        </div>
        <ul className={aboutStyles.skills} data-reveal>
          {skills.map((skill) => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>
      </Act>

      {/* Closing on the dark ground bookends the page against CoffeeCat's act
          and keeps the last thing a reader sees from being a third sage band. */}
      <Act id="contact" number="06" eyebrow="Contact" tone="forest">
        <div className="section-head" data-reveal>
          <h2>Let&rsquo;s build reliable systems.</h2>
        </div>
        <dl className={contactStyles.channels} data-reveal>
          <div className={contactStyles.row}>
            <dt className={contactStyles.key}>Email</dt>
            <dd className={contactStyles.value}>
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </dd>
          </div>
          <div className={contactStyles.row}>
            <dt className={contactStyles.key}>GitHub</dt>
            <dd className={contactStyles.value}>
              <a href={site.github}>CoffeeCat0214</a>
            </dd>
          </div>
          <div className={contactStyles.row}>
            <dt className={contactStyles.key}>LinkedIn</dt>
            <dd className={contactStyles.value}>
              <a href={site.linkedin}>kyrstin-mariko-kauchak</a>
            </dd>
          </div>
          <div className={contactStyles.row}>
            <dt className={contactStyles.key}>Location</dt>
            <dd className={contactStyles.value}>{site.location}</dd>
          </div>
        </dl>
      </Act>
    </>
  );
}
