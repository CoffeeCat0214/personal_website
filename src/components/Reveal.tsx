"use client";

import { useEffect } from "react";

/* Scroll reveal, ported from CoffeeCat/site/script.js.

   Mounted once in the layout; it scans for [data-reveal] rather than wrapping
   anything. That is deliberate. The alternative -- a <Reveal> wrapper component
   -- would force every section that wants to animate to become a client
   component, which under `output: 'export'` means shipping JS for content that
   is entirely static. Here exactly one small client component exists and every
   act stays a server component that just marks itself with an attribute.

   Two properties are load-bearing and easy to lose in a port:

   1. The hidden state is applied from here, never from CSS. As a static rule,
      `[data-reveal] { opacity: 0 }` hands anyone whose JS fails a blank page.
      Applied from script, the markup is visible by default and only ever hidden
      by code that is already running and can therefore also un-hide it.

   2. The stagger is measured within the intersecting batch, not against a
      global clock. A section that scrolls into view as a unit should cascade;
      a single element arriving on its own should not sit waiting for a queue. */

/* Every ground class defined in tokens.css. Listed rather than derived so that
   removing them is a single splice and cannot leave a stale class behind. */
const TONES = ["tone-sage", "tone-pink", "tone-forest", "tone-lilac", "tone-orange"];

const STAGGER_MS = 60;

/* The source design staggers without a cap, which is fine at its ~20 reveal
   targets. This page has 34, and on a tall display or a fast scroll a whole act
   can intersect at once -- an uncapped cascade then runs past a second, so the
   last row fades in well after the reader's eye has already reached it. Motion
   that finishes behind the reader is worse than no motion. Capping the step
   holds any single batch to under half a second. */
const MAX_STAGGER_STEPS = 8;

export function Reveal() {
  /* Adaptive nav ground.

     The nav is translucent and sticky, so it always sits over some act's
     colour. Mirroring the current act's tone class onto <html> makes the nav
     adopt that ground through plain inheritance -- every rule in
     Nav.module.css already reads --paper / --ink / --ink-3, so this feature
     needed no CSS of its own. Acts override the inherited values for their own
     subtree because each carries its own tone class, so only chrome outside a
     section (the nav, the footer) follows along.

     Deliberately NOT gated on prefers-reduced-motion, unlike the reveal below.
     This is a legibility mechanism, not an effect: a nav still painted sage
     while sitting over the forest act is a contrast failure, and someone who
     asked for less motion did not ask for less contrast. base.css already
     collapses the transition duration under that preference, which is the part
     that actually moves. */
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-tone]"));
    if (!("IntersectionObserver" in window) || sections.length === 0) return;

    const root = document.documentElement;
    const visible = new Set<Element>();

    const apply = () => {
      // Last in document order wins. At a boundary two bands intersect the
      // strip at once, and the later one is the one arriving under the nav.
      let current: HTMLElement | undefined;
      for (const el of sections) if (visible.has(el)) current = el;
      if (!current?.dataset.tone) return;
      root.classList.remove(...TONES);
      root.classList.add(`tone-${current.dataset.tone}`);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target);
          else visible.delete(entry.target);
        }
        apply();
      },
      {
        /* A thin strip immediately below the nav, so the tone flips when a
           ground reaches the bar rather than when it enters the viewport.
           The bottom inset is a percentage on purpose: percentages resolve
           against the root box, so this tracks viewport resizes and phone
           rotation without the observer ever being rebuilt. */
        rootMargin: "-60px 0px -88% 0px",
        threshold: 0,
      }
    );

    for (const el of sections) observer.observe(el);

    return () => {
      observer.disconnect();
      root.classList.remove(...TONES);
    };
  }, []);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const targets = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));

    if (!("IntersectionObserver" in window) || reduceMotion.matches || targets.length === 0) {
      return;
    }

    for (const el of targets) {
      el.classList.add("is-hidden");
    }

    const show = (el: HTMLElement) => {
      el.classList.remove("is-hidden");
      el.classList.add("is-revealed");
    };

    const timers: number[] = [];

    const observer = new IntersectionObserver(
      (entries, self) => {
        let step = 0;

        for (const entry of entries) {
          if (!entry.isIntersecting) continue;

          // Unobserve immediately -- this fires once per element, and leaving
          // the observer live means re-entering the viewport re-runs it.
          self.unobserve(entry.target);
          timers.push(
            window.setTimeout(
              show,
              Math.min(step, MAX_STAGGER_STEPS) * STAGGER_MS,
              entry.target as HTMLElement
            )
          );
          step += 1;
        }
      },
      // The bottom inset holds the reveal until the element is properly on
      // screen rather than clipping the viewport edge.
      { rootMargin: "0px 0px -8% 0px", threshold: 0.1 }
    );

    for (const el of targets) {
      observer.observe(el);
    }

    // Turning on reduced motion mid-visit must not strand whatever has not been
    // revealed yet at opacity 0.
    const onPreferenceChange = () => {
      if (!reduceMotion.matches) return;

      observer.disconnect();
      for (const el of targets) {
        el.classList.remove("is-hidden");
      }
    };

    reduceMotion.addEventListener("change", onPreferenceChange);

    // React StrictMode double-invokes effects in dev. Without this teardown the
    // first observer keeps running against elements the second one also owns,
    // and pending timers fire against unmounted state.
    return () => {
      observer.disconnect();
      reduceMotion.removeEventListener("change", onPreferenceChange);
      for (const id of timers) window.clearTimeout(id);
      for (const el of targets) el.classList.remove("is-hidden");
    };
  }, []);

  return null;
}
