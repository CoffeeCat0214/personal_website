import { Hero } from "@/components/Hero";
import { Act } from "@/components/Act";
import { FlagshipAct } from "@/components/FlagshipAct";
import { WorkAct } from "@/components/WorkAct";
import { MarkPanel } from "@/components/MarkPanel";
import { Runner } from "@/components/Runner";
import { Subscribe } from "@/components/Subscribe";
import { IndexList } from "@/components/IndexList";
import {
  background,
  founder,
  markPanels,
  runners,
  site,
  skills,
  subscribe,
  thesis,
} from "@/content/site";
import aboutStyles from "@/components/About.module.css";
import contactStyles from "@/components/Contact.module.css";

/* One page of numbered acts on five grounds.

   The order is an argument, not a catalogue: the thesis states the problem, the
   flagship is the response, the tools establish that the studio can finish
   things, and the founder act answers "why her" last -- because it is the
   question a reader only asks once they care about the first three.

   Ground sequence runs sage → lilac → forest → pink → orange → sage → pink →
   forest. No two adjacent bands share a ground, and the dark inversion lands on
   the thesis, early, where a visitor who bounces has still seen the page turn
   over once.

   Mark panels punctuate rather than divide. They are keyed by the section they
   precede, so the order here stays declarative and a panel cannot drift away
   from the act it introduces. */
export default function Home() {
  return (
    <>
      <Hero />

      <MarkPanel panel={markPanels.thesis} />

      {/* The heading carries data-split, not data-reveal, and its wrapper
          carries neither. The two motion systems own disjoint attributes on
          purpose -- a data-reveal ancestor holds its subtree at opacity 0 until
          it fires, which would leave the split lines animating inside something
          invisible and then popping in as a block. */}
      <Act id="thesis" number="01" eyebrow="Thesis" tone="forest">
        <div className="section-head">
          <h2 data-split>{thesis.heading}</h2>
        </div>
        <div className={aboutStyles.copy}>
          {thesis.body.map((paragraph) => (
            <p key={paragraph.slice(0, 32)} data-reveal>
              {paragraph}
            </p>
          ))}
        </div>
      </Act>

      <Runner runner={runners.flagship} />

      <FlagshipAct />

      <MarkPanel panel={markPanels.work} />

      <WorkAct />

      <Runner runner={runners.founder} />

      <Act id="founder" number="04" eyebrow="Founder" tone="pink">
        <div className={aboutStyles.copy} data-reveal>
          <h2>{founder.heading}</h2>
          {founder.body.map((paragraph) => (
            <p key={paragraph.slice(0, 32)}>{paragraph}</p>
          ))}
        </div>
        <IndexList entries={background} />
        <ul className={aboutStyles.skills} data-reveal>
          {skills.map((skill) => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>
      </Act>

      {/* Closing on the dark ground bookends the page against the thesis act and
          keeps the last thing a reader sees from being a second pink band. */}
      <Act id="subscribe" number="05" eyebrow="Subscribe" tone="forest">
        <div className="section-head" data-reveal>
          <h2>{subscribe.heading}</h2>
        </div>
        <div className={aboutStyles.copy} data-reveal>
          <p>{subscribe.body}</p>
        </div>
        <div data-reveal>
          <Subscribe />
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
            <dt className={contactStyles.key}>Based in</dt>
            <dd className={contactStyles.value}>{site.location}</dd>
          </div>
        </dl>
      </Act>
    </>
  );
}
