import Link from "next/link";
import { hero, site } from "@/content";
import styles from "./Hero.module.css";

/* The status line answers the first question a visitor has: is any of this real
   yet. It read "In development" for an unbuilt story world.

   Three cells, not four. The fourth was "Elsewhere -> GitHub", which is the
   third link to the same profile above the fold once the nav and the contact
   act are counted -- and it was the only cell answering a question nobody has
   yet at the top of the page. Dropping it widens the remaining three rather
   than leaving a gap, because the row is a fractional grid. */
const facts = [
  { key: "Flagship", value: "Shipped", status: true },
  { key: "Built by", value: site.founder },
  { key: "Based in", value: site.location },
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
              <p className={styles.eyebrow}>{site.kind}</p>
              <h1>{site.name}</h1>
            </div>
            <p className={styles.tagline} data-reveal>
              {site.tagline}
            </p>

            {/* The positioning, and the only copy on the page set between body
                and heading size.

                data-split, not data-reveal, and the wrapper deliberately
                carries neither: a data-reveal ancestor holds its subtree at
                opacity 0 until it fires, which would run the line masks inside
                something invisible. Same constraint FlagshipAct.tsx documents.

                The two sentences are separate <p> elements rather than one
                two-sentence paragraph so each gets its own trigger and its own
                stagger -- the second lands after the first has settled, which
                is the difference between a statement arriving and a block of
                text sliding. */}
            <div className={styles.statement}>
              {hero.statement.map((line) => (
                <p key={line.slice(0, 32)} data-split>
                  {line}
                </p>
              ))}
            </div>

            {/* The primary action is the work. It used to point at a thesis, on
                the theory that the argument mattered more than the software --
                only true when there is no software. Contact stays secondary:
                nobody gets in touch before they know what for. */}
            <div className={styles.actions} data-reveal>
              <Link className="btn" href="/#extension">
                See the extension
              </Link>
              <Link className="btn secondary" href="/#contact">
                Get in touch
              </Link>
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
        </dl>
      </div>
    </section>
  );
}
