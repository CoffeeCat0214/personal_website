"use client";

import Link from "next/link";
import { useCallback, useState } from "react";
import { featuredProject, HOME_ROUTE, site, tldr } from "@/content";
import styles from "./Gate.module.css";

/* Optical kerning for the display label, and the reason it needs code rather
   than a CSS declaration.

   Every glyph in a monospaced face occupies a cell of the same width, so a
   narrow glyph gets the difference back as sidebearing. At 350px the semicolon
   in "TL;DR" therefore sat in roughly a character of air on each side and the
   word read as three objects: "TL", ";", "DR". Letter-spacing cannot fix that --
   it moves every cell equally, so closing the semicolon's gaps means crushing
   the letters that do not need it.

   Pulling only the punctuation in does fix it. The split is on the character
   itself rather than a hardcoded index, so a label without one falls through
   untouched, and the DOM still contains the exact string: spans do not interrupt
   a text run, so the accessible name stays "TL;DR".

   Two constants rather than one regex: `.test()` on a /g regex advances its
   own lastIndex between calls, so reusing the split pattern to classify the
   pieces would match on odd calls and miss on even ones. A Set has no state. */
const PUNCT = new Set([";", ":", ".", ","]);
const PUNCT_SPLIT = /([;:.,])/;

function kern(label: string, className: string) {
  return label
    .split(PUNCT_SPLIT)
    .filter(Boolean)
    .map((part, index) =>
      PUNCT.has(part) ? (
        <span key={index} className={className}>
          {part}
        </span>
      ) : (
        part
      )
    );
}

/* The entry gate: one screen, one idea, and the cat. The whole of "/".

   Set as a front page rather than a stack. Four bands -- masthead, display,
   columns, footer -- each running the full measure, divided by hairlines and one
   colour cut. That structure is doing a specific job: a single centred column on
   a flat ground has no way to use the right half of a wide window, and every
   earlier pass at this screen either left that half empty or narrowed the text
   to justify the emptiness. Bands fill the width by construction.

   The gate keeps its complete server-rendered document and adds only the small
   client layer needed for the note cards' visited state. It held a scroll lock
   while it was the first section of the long page -- freezing the document so a
   trackpad flick could not skip it. Becoming its own route deleted that problem
   rather than solving it: there is nothing below the gate to scroll to, so
   leaving is a navigation the visitor chooses.

   The typing of the label is CSS, not JavaScript, and that is not a stylistic
   preference. This route ships as a static document; a typewriter driven by an
   effect would leave the site's first word blank until hydration, and blank on
   any visit where the bundle fails. A `steps()` animation over a monospaced
   width has no such state -- the markup contains the finished word, and the
   animation only reveals what is already there.

   No [data-split] or [data-reveal] here, unlike the acts. Both hold their
   content at opacity 0 until an observer or a font-load promise fires, and on
   the page that is the whole first impression a held beat before the words
   arrive reads as something that failed to load rather than as an entrance. */

export function Gate() {
  const [visitedNotes, setVisitedNotes] = useState<Set<number>>(new Set());

  const visitNote = useCallback((index: number) => {
    setVisitedNotes((current) => {
      if (current.has(index)) return current;

      const next = new Set(current);
      next.add(index);
      return next;
    });
  }, []);

  const notesComplete = visitedNotes.size === tldr.items.length;

  return (
    <section
      id="top"
      className={`${styles.gate} tone-sage${notesComplete ? ` ${styles.notesComplete}` : ""}`}
      data-tone="sage"
    >
      <header className={`${styles.rail} ${styles.masthead}`}>
        <p className={styles.name}>{site.name}</p>
        <p className={styles.meta}>
          <span>{site.location}</span>
          <span aria-hidden="true" className={styles.sep}>
            /
          </span>
          <span>{site.kind}</span>
        </p>
      </header>

      <div className={`${styles.rail} ${styles.display}`}>
        <div className={styles.displayCopy}>
          {/* Deliberately separate from the <h1>. It is a structural marker
              rather than part of the sentence -- folding it in would make the
              page's accessible name "TL;DR (Building a meaningful life)" and
              disagree with the JSON-LD description. Its size here is a visual
              decision, not a semantic promotion. */}
          <p className={styles.label}>{kern(tldr.label, styles.punct)}</p>
          <span className={`${styles.labelSpark} ${styles.labelSparkA}`} aria-hidden="true">✦</span>
          <span className={`${styles.labelSpark} ${styles.labelSparkB}`} aria-hidden="true">✦</span>
          <span className={`${styles.labelSpark} ${styles.labelSparkC}`} aria-hidden="true">✦</span>
          <h1 className={styles.heading}>{tldr.heading}</h1>
        </div>

        {/* 420w/840w are the actual asset widths. The CSS drives this by height
            and lets width follow, because height is the axis the cat competes
            with the type for -- a width cap that looks right on a 1440x900
            laptop eats half a 1470x667 window, which is the shape a maximised
            browser on a 13" actually is. `sizes` states the widest it can get
            (400px of height at the asset's 420:539 ratio is 312px) rather than
            trying to restate a dvh expression the attribute cannot describe.

            fetchPriority high: this is the LCP element of the site's entry
            point. */}
        {/* eslint-disable-next-line @next/next/no-img-element -- same reason as
            Hero.tsx: the export runs with images unoptimized, so next/image
            would wrap an already-sized 38KB asset in a loader and lazy-loading
            machinery it cannot benefit from. */}
        <img
          className={styles.cat}
          src="/art/buddy.webp"
          srcSet="/art/buddy.webp 420w, /art/buddy@2x.webp 840w"
          sizes="312px"
          width={420}
          height={539}
          alt=""
          fetchPriority="high"
          decoding="async"
        />
      </div>

      {/* An ordered list because she numbered it, and because the order is the
          argument: what she builds, who she is, why it looks like this. Set as
          three columns rather than three stacked rows -- the same reason a front
          page sets its standfirst in columns, and the reason this band can hold
          the full width without padding the type out to reach it.

          Each column is a small window rather than a ruled text column. Three
          paragraphs separated by hairlines is the correct editorial answer and it
          was the wrong one here: on a full-bleed ground a hairline is the only
          thing standing between the type and the colour, so the band read as
          three sentences printed on green rather than as three objects the page
          put there. Giving each one a surface, a border and a displaced shadow is
          what makes it an object.

          The chrome is not new vocabulary -- it is the project figures' frame
          (Figure.module.css) at card scale: --r-panel, a 3px ink border, a
          zero-blur displacement, and a title bar with hairline furniture. That
          file's radius comment is the licence for the radius here too: these
          depict a screen, which is the one thing in this system allowed to be
          round.

          The bar is aria-hidden and loses nothing by it. The numeral still comes
          from a CSS counter rather than the markup, so it was never in the
          accessibility tree; the ordinal a screen reader announces comes from the
          <ol>, which is the whole reason this is one. */}
      <ol className={`${styles.rail} ${styles.items}`}>
        {tldr.items.map((runs, index) => (
          <li
            key={index}
            className={`${styles.item}${visitedNotes.has(index) ? ` ${styles.itemVisited}` : ""}`}
          >
            <button
              type="button"
              className={styles.itemButton}
              aria-pressed={visitedNotes.has(index)}
              onFocus={() => visitNote(index)}
              onClick={() => visitNote(index)}
            >
              <div className={styles.itemBar} aria-hidden="true">
                <span className={styles.itemIndex} />
              </div>
              <span className={styles.cardSticker} aria-hidden="true">
                <span className={styles.cardStickerStar}>✦</span>
                <span>cat note</span>
              </span>
              <p className={styles.itemBody}>
                {runs.map((run, runIndex) =>
                  run.emphasis ? (
                    <strong key={runIndex} className={styles.emphasis}>
                      {run.text}
                    </strong>
                  ) : (
                    <span key={runIndex}>{run.text}</span>
                  )
                )}
              </p>
              <span className={styles.itemSpark} aria-hidden="true">✦</span>
            </button>
          </li>
        ))}
      </ol>

      {/* The way out returns to the dark green anchor established by TL;DR. The
          two rounded surfaces stay pink, so the footer still belongs to this
          page rather than becoming a second button system. */}
      <div className={`${styles.footer} tone-forest`} data-tone="forest">
        {/* A dock on a desktop, which is the whole idea of this band now.

            The dark ground is intentionally quiet: the large pink oval floats
            on it with its own hairline and footprint. There is no extra pattern
            competing with the button or the cat.

            The way out is the one saturated object on the screen after the cat --
            pink on pink, dark ink label -- with a lilac displacement instead of
            orange. */}
        <div className={`${styles.rail} ${styles.dock}`}>
          {/* next/link, so the site is prefetched while the visitor is still
              reading. The gate is a page someone sits on for a few seconds,
              which is exactly the budget needed to have /home/ ready before they
              ask for it -- the one advantage a separate route has over a scroll,
              spent on hiding its one cost.

              The label names the destination rather than making the visitor
              infer whether this scrolls or navigates. It lands on the first
              project act, so the way out is also a direct invitation to see the
              work. The sparkle treatment is decorative; the accessible name is
              the action. */}
          <span className={styles.enterBling}>
            <Link
              className={`${styles.enter} ${styles.shimmer}`}
              href={`${HOME_ROUTE}#${featuredProject.homeAnchorId}`}
            >
              <span className={styles.enterSpark} aria-hidden="true">✦</span>
              <span>View my work</span>
              <span className={styles.arrow} aria-hidden="true">↗</span>
            </Link>
            <span
              className={`${styles.enterFlare} ${styles.enterFlareA}`}
              aria-hidden="true"
            >
              ✦
            </span>
            <span
              className={`${styles.enterFlare} ${styles.enterFlareB}`}
              aria-hidden="true"
            >
              ✦
            </span>
            <span
              className={`${styles.completionParticle} ${styles.completionParticleA}`}
              aria-hidden="true"
            />
            <span
              className={`${styles.completionParticle} ${styles.completionParticleB}`}
              aria-hidden="true"
            />
            <span
              className={`${styles.completionParticle} ${styles.completionParticleC}`}
              aria-hidden="true"
            />
          </span>

          <p className={styles.closer}>{tldr.closer}</p>
        </div>
      </div>
    </section>
  );
}
