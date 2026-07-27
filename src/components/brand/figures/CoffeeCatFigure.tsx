import { FigureFrame } from "./FigureFrame";
import styles from "./Figure.module.css";

/* The mug is the extension's own generated sprite set, not a lookalike drawn in
   CSS -- four layers sharing one square canvas and origin, stacked back to
   front. Using the real artwork is what keeps this figure from drifting away
   from the product it depicts. */
const layers = ["mug-back", "mug-fill", "mug-front"];

export function CoffeeCatFigure() {
  return (
    <FigureFrame
      label="The CoffeeCat extension running over a web page: a pixel coffee mug filling as a focus session progresses."
      chrome="coffeecat — focus session"
    >
      <div className={styles.feedLines}>
        <span />
        <span />
        <span />
      </div>
      <div className={styles.mug}>
        {layers.map((layer) => (
          /* eslint-disable-next-line @next/next/no-img-element -- next/image
             adds a wrapper and lazy-loading machinery for a 20KB decorative
             sprite already sized by its container; images are unoptimized
             under static export anyway.

             loading="lazy" is not just a hint here: without it React hoists
             these four sprites into <link rel="preload" as="image"> and puts
             ~120KB of decoration on the critical path ahead of the font. The
             container reserves its box with aspect-ratio, so deferring them
             costs no layout shift. */
          <img
            key={layer}
            className={`${styles.mugLayer} ${layer === "mug-fill" ? styles.fill : ""}`}
            src={`/art/mug/${layer}.png`}
            alt=""
            loading="lazy"
            decoding="async"
          />
        ))}
        {/* Last, so it sits above the rim rather than behind it. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className={`${styles.mugLayer} ${styles.steam}`}
          src="/art/mug/mug-steam.png"
          alt=""
          loading="lazy"
          decoding="async"
        />
      </div>
    </FigureFrame>
  );
}
