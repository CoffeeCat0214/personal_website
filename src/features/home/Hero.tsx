import Link from "next/link";
import { hero, heroFacts, HOME_ROUTE, site } from "@/content";
import styles from "./Hero.module.css";

/*
THESIS: Cutealism for serious software — a bright, sticker-covered studio wall
instead of a polite portfolio hero.
OWN-WORLD: Bubblegum pink, ink-purple, lemon yellow, courier labels, hard outlines,
and a transparent pixel-cat portrait treated like a physical sticker.
STORY: Kyrstin makes small, inspectable systems; the visitor sees the flagship tool,
then chooses a project to inspect.
FIRST VIEWPORT: Copy and actions left; the cat sticker sits in a compact framed
stage right, with the primary CoffeeCat action under the thesis.
FORM: Asymmetric editorial grid, staged as a playful noticeboard; the full-page
colour cuts and moving type band carry the scroll.
*/

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
