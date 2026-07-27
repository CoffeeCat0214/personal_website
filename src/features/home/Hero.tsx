import Link from "next/link";
import { hero, heroFacts, HOME_ROUTE, site } from "@/content";
import styles from "./Hero.module.css";

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
                <span className={styles.glamCopy}>Small tools for deep work.</span>
                <span className={styles.grindCopy}>Ship small. Think hard.</span>
              </h1>
            </div>
            <p className={styles.tagline} data-reveal>
              <span className={styles.glamCopy}>
                {site.kind} in {site.location}. Small tools. Clear intent.
              </span>
              <span className={styles.grindCopy}>
                {site.kind} / {site.location}. Useful software, kept close to the
                metal.
              </span>
            </p>
            <div className={styles.statement}>
              {hero.statement.map((line) => (
                <p key={line.slice(0, 32)} data-split>
                  {line}
                </p>
              ))}
            </div>
            <div className={styles.actions} data-reveal>
              <Link className="btn" href={`${HOME_ROUTE}#extension`}>
                View CoffeeCat
              </Link>
              <Link className="btn secondary" href={`${HOME_ROUTE}#cremeai`}>
                View CrèmeAI
              </Link>
            </div>
          </div>

          <figure className={styles.art} data-reveal>
            {/* eslint-disable-next-line @next/next/no-img-element -- the
                supplied portrait is a static-export LCP asset and already
                ships at the exact crop used by this composition. */}
            <img
              src="/art/hero-cat-cool.png"
              alt="Illustrated long-haired cat looking directly at the viewer"
              width={1024}
              height={1536}
              fetchPriority="high"
              decoding="async"
            />
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
