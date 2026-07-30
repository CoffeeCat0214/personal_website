import Link from "next/link";
import { hero, heroFacts, HOME_ROUTE } from "@/content";
import styles from "./Hero.module.css";

/* Both voices render; .glamCopy and .grindCopy show one and hide the other off
   the [data-mode] attribute the nav writes onto <html>. Shipping both in the HTML
   is what lets the toggle be instant and CSS-only -- and it means the copy lives
   in the content module, not here. */

export function Hero() {
  return (
    <section id="top" className={`${styles.hero} tone-pink`} data-tone="pink">
      <div className="wrap">
        <div className={styles.heroGrid}>
          <div className={styles.copy}>
            <div className={styles.heroStamp} aria-hidden="true">
              <span className={styles.spark}>✦</span>
              <span className={styles.sticker}>made<br />to ship</span>
            </div>
            <div className={styles.name} data-reveal="display">
              <p className={styles.eyebrow}>Kyrstin Kauchak / 2026</p>
              <h1>
                <span className={styles.glamCopy}>{hero.glam.headline}</span>
                <span className={styles.grindCopy}>{hero.grind.headline}</span>
              </h1>
            </div>
            <p className={styles.tagline} data-reveal>
              <span className={styles.glamCopy}>{hero.glam.tagline}</span>
              <span className={styles.grindCopy}>{hero.grind.tagline}</span>
            </p>
            <div className={styles.statement}>
              {hero.statement.map((line) => (
                <p key={line.slice(0, 32)} data-split>
                  {line}
                </p>
              ))}
            </div>
            {/* The two CTAs carry a rhinestone treatment: a specular band that
                crosses the face on a loop, then two ✦ flares that pop just after
                it passes. The flares live on a wrapper rather than on the control
                because the shine needs `overflow: hidden` to clip to the rounded
                rect, and that same clip would eat any flare sitting proud of the
                edge -- which is the only placement that reads as bling rather
                than as an icon inside a button.

                Decorative, so aria-hidden: the accessible name stays the words. */}
            <div className={styles.actions} data-reveal>
              <span className={styles.bling}>
                <Link className={`btn ${styles.shimmer}`} href={`${HOME_ROUTE}#extension`}>
                  View CoffeeCat
                </Link>
                <span className={`${styles.flare} ${styles.flareA}`} aria-hidden="true">✦</span>
                <span className={`${styles.flare} ${styles.flareB}`} aria-hidden="true">✦</span>
              </span>
              <span className={styles.bling}>
                <Link
                  className={`btn secondary ${styles.shimmer}`}
                  href={`${HOME_ROUTE}#cremeai`}
                >
                  View CrèmeAI
                </Link>
                <span className={`${styles.flare} ${styles.flareA}`} aria-hidden="true">✦</span>
                <span className={`${styles.flare} ${styles.flareB}`} aria-hidden="true">✦</span>
              </span>
            </div>
          </div>

          <figure className={styles.art} data-reveal>
            {/* eslint-disable-next-line @next/next/no-img-element -- the
                supplied portrait is a static-export LCP asset and already
                ships at the exact crop used by this composition. */}
            <img
              src="/art/hero-cat-cutout.png"
              alt="Illustrated long-haired cat looking directly at the viewer"
              width={1024}
              height={1536}
              fetchPriority="high"
              decoding="async"
            />
            <span className={styles.artSticker} aria-hidden="true">✦ CAT / BUILT IN NYC</span>
            <figcaption>
              <span>01 / studio cat</span>
              <span>good ideas / better coffee</span>
            </figcaption>
          </figure>
        </div>

        <dl className={styles.facts} data-reveal>
          {heroFacts.map((fact) => (
            <div className={styles.factCell} key={fact.key}>
              <dt className={styles.factKey}>{fact.key}</dt>
              <dd className={styles.factValue}>
                {fact.status ? <span className={styles.status}>{fact.value}</span> : fact.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
