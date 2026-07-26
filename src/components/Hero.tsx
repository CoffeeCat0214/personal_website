import { site, skills } from "@/content/site";
import styles from "./Hero.module.css";

const facts = [
  { key: "Status", value: "Open to new roles", status: true },
  { key: "Based in", value: site.location },
  { key: "Core", value: skills.slice(0, 3).join(" · ") },
];

/* The name is the h1 and the only display-size type on the page. It rides --u,
   so it scales as part of the composition; everything from the tagline down
   stays in rem and honours the browser's font-size preference. */
export function Hero() {
  return (
    /* Sage is also :root's default, so the class changes nothing visually here
       -- but data-tone is what the scroll observer reads, and the hero has to
       report a ground like every other band or the nav starts the page with
       nothing to adopt. */
    <section id="top" className={`${styles.hero} tone-sage`} data-tone="sage">
      <div className="wrap">
        <div className={styles.top}>
          {/* Revealed per child rather than as one block. Reveal.tsx staggers
              within an intersecting batch, so splitting these makes the hero
              cascade -- name, then tagline, then controls -- instead of the
              whole column arriving as a single slab. */}
          <div className={styles.copy}>
            <div className={styles.name} data-reveal="display">
              <p className={styles.eyebrow}>{site.role}</p>
              <h1>{site.name}</h1>
            </div>
            <p className={styles.tagline} data-reveal>
              {site.tagline}
            </p>
            <div className={styles.actions} data-reveal>
              <a className="btn" href="#work">
                See the work
              </a>
              <a className="btn secondary" href={`mailto:${site.email}`}>
                Get in touch
              </a>
            </div>
          </div>

          {/* Decorative. It is a brand mark, not a portrait and not a diagram --
              it carries no fact the h1 and the tagline beside it do not already
              state, so an alt string here would only make a screen reader
              narrate a picture to no purpose. */}
          <div className={styles.art} data-reveal>
            {/* eslint-disable-next-line @next/next/no-img-element -- static
                export runs with images unoptimized, so next/image would add a
                wrapper and lazy-loading machinery around an already-sized 38KB
                asset. Eager and high priority: this is the LCP element.

                The only full-colour placement of the cat on the page; every
                other appearance is the masked silhouette in CatMark. Full
                colour is worth it exactly once, where there is nothing else
                competing for attention.

                Not `image-rendering: pixelated`, despite the pixel-art look.
                Run-length analysis of the source puts 1px runs an order of
                magnitude ahead of 2px, so this is a high-resolution
                illustration with a dither texture, not a low-res sprite --
                pixelated would only make its own antialiasing crunchy. The mug
                sprites in Figure.module.css are genuine low-res art and do keep
                it. */}
            <img
              src="/art/buddy.webp"
              srcSet="/art/buddy.webp 420w, /art/buddy@2x.webp 840w"
              sizes="(max-width: 900px) 52vw, 400px"
              alt=""
              width={420}
              height={539}
              fetchPriority="high"
              decoding="async"
            />
          </div>
        </div>

        <dl className={styles.facts} data-reveal>
          {facts.map((fact) => (
            <div className={styles.factCell} key={fact.key}>
              <dt className={styles.factKey}>{fact.key}</dt>
              <dd className={styles.factValue}>
                {fact.status ? (
                  <span className={styles.status}>{fact.value}</span>
                ) : (
                  fact.value
                )}
              </dd>
            </div>
          ))}
          <div className={styles.factCell}>
            <dt className={styles.factKey}>Elsewhere</dt>
            <dd className={styles.factValue}>
              <a href={site.github}>GitHub</a>
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
