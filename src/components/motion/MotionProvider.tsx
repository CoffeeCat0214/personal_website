"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { CustomEase } from "gsap/CustomEase";
import Lenis from "lenis";

/* The scroll-linked motion layer: smooth scroll, marquee bands, and line-masked
   copy reveals.

   Mounted once in the layout and driven entirely by data attributes, exactly
   like Reveal.tsx -- which is what keeps every act a server component under
   `output: 'export'`. Two small client components in the whole app, and no
   section has to opt into being one to animate.

   This ADDS to Reveal.tsx rather than replacing it. The plan called for GSAP to
   take over the generic [data-reveal] observer, and on inspection there is
   nothing to gain: that observer already batches, caps its stagger, and stays
   correct when JS fails or the motion preference flips mid-visit. Replacing
   working code with a dependency buys a regression risk and no capability. So
   ScrollTrigger only does what an IntersectionObserver cannot -- scrubbing,
   pinning, scroll velocity, and per-line masking -- and the two systems own
   disjoint attributes ([data-reveal] vs [data-split] / [data-runner]) so they
   can never animate the same element.

   Lenis rather than GSAP's own ScrollSmoother, even though ScrollSmoother is
   free now: ScrollSmoother transforms a wrapper element, and a transformed
   ancestor breaks `position: sticky`. Act.module.css puts the mark, the numeral
   and the eyebrow in a sticky rail beside every act -- that rail is the layout's
   signature. Lenis drives real scroll position, so sticky survives. */

gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase);

/* The site has exactly one easing curve, declared as --ease in tokens.css and
   used by every CSS transition on the page. Re-declaring it here rather than
   reaching for "power3.out" is the difference between motion that feels like one
   system and motion that feels like two libraries taking turns. */
const EASE = CustomEase.create("site", "M0,0 C0.51,0.01 0.2,1 1,1");

/* Pixels per second for the marquee at rest. Slow enough to read a phrase as it
   passes, which is the point of the band -- fast enough not to look stalled. */
const RUNNER_SPEED = 55;

/* Scroll velocity is divided down into a timeScale multiplier, then clamped.
   Uncapped, a flick on a trackpad sends the band past the point where the words
   resolve, and a marquee you cannot read is just noise moving. */
const RUNNER_VELOCITY_DIVISOR = 900;
const RUNNER_MAX_BOOST = 5;

export function MotionProvider() {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    /* The hard gate. Not "slower", not "shorter" -- nothing starts.

       Smooth scroll is the specific reason this is absolute rather than a
       reduced duration. It changes what the machine does with the user's own
       input: every wheel tick and every keypress becomes an eased animation
       instead of a jump. For someone with a vestibular disorder that is the
       trigger, and unlike a decorative reveal there is no way to look away from
       it. Nothing here hides content, so returning early leaves a complete,
       readable, statically-laid-out page. */
    if (reduceMotion.matches) return;

    const ctx = gsap.context(() => {
      const lenis = new Lenis({
        /* Driven from gsap.ticker below, so Lenis must not also run its own
           requestAnimationFrame loop -- two loops means two updates per frame
           and visible jitter. */
        autoRaf: false,
        /* Touch scrolling stays native. Momentum on a touchscreen is already
           handled by the OS and feels wrong when a library second-guesses it;
           the reference site makes the same call, branching its heavy effects
           off behind an isTouch class. */
        smoothWheel: true,
        syncTouch: false,
      });

      lenis.on("scroll", ScrollTrigger.update);

      const raf = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(raf);
      /* GSAP nudges duration when a frame runs long, which fights a scroll
         position that is itself being animated. */
      gsap.ticker.lagSmoothing(0);

      /* ---- Marquee bands ---------------------------------------------- */

      const tracks = gsap.utils.toArray<HTMLElement>("[data-runner]");

      for (const track of tracks) {
        const groups = track.children.length;
        if (groups < 2) continue;

        const groupWidth = track.getBoundingClientRect().width / groups;
        if (groupWidth === 0) continue;

        /* xPercent, not x. A percentage resolves against the element's own
           width, so one step is exactly one group at any viewport size and the
           loop stays seamless through a resize without being rebuilt. Only the
           duration is measured, and being slightly off after a resize costs a
           small speed change rather than a visible jump. */
        const loop = gsap.to(track, {
          xPercent: -100 / groups,
          duration: groupWidth / RUNNER_SPEED,
          ease: "none",
          repeat: -1,
        });

        ScrollTrigger.create({
          trigger: track,
          start: "top bottom",
          end: "bottom top",
          onUpdate: (self) => {
            const velocity = self.getVelocity();
            const boost = gsap.utils.clamp(
              -RUNNER_MAX_BOOST,
              RUNNER_MAX_BOOST,
              velocity / RUNNER_VELOCITY_DIVISOR
            );

            /* The sign is the effect. Scrolling up runs the band backwards, so
               the marquee reads as attached to the page rather than playing
               beside it. Math.sign keeps it moving at rest, where velocity is
               0 and the band would otherwise freeze. */
            const direction = velocity === 0 ? 1 : Math.sign(velocity);

            gsap.to(loop, {
              timeScale: direction * (1 + Math.abs(boost)),
              duration: 0.4,
              overwrite: true,
            });
          },
          /* Off-screen bands should not burn frames animating text nobody can
             see; there are two of them and they run forever. */
          onEnter: () => loop.play(),
          onEnterBack: () => loop.play(),
          onLeave: () => loop.pause(),
          onLeaveBack: () => loop.pause(),
        });
      }

      /* ---- Line-masked copy reveals ------------------------------------ */

      const splits: SplitText[] = [];

      /* Split after fonts settle. SplitText measures line boxes to decide where
         the breaks are; run it against a fallback face and every line wraps in
         the wrong place, then the real font swaps in and the masks sit across
         the middle of words. */
      document.fonts.ready.then(() => {
        /* ctx.add, not a bare callback. gsap.context only adopts animations
           created while its function is on the stack, so anything built in this
           async continuation would be invisible to ctx.revert() and would leak
           its ScrollTriggers across a StrictMode remount. Re-entering the
           context here puts them back under its ownership.

           isReverted guards the unmount-before-fonts-resolve race: without it
           this callback happily builds triggers into a context that has already
           been torn down. */
        if (ctx.isReverted) return;

        ctx.add(() => {
          const targets = gsap.utils.toArray<HTMLElement>("[data-split]");

          for (const el of targets) {
            const split = SplitText.create(el, {
            type: "lines",
            /* Wraps each line in its own overflow-clipped element, which is what
               makes this a mask rather than a fade -- the line rises out from
               behind a hard edge instead of appearing through it. */
            mask: "lines",
            linesClass: "split-line",
              /* Without this, a screen reader walks the shredded per-line spans
                 and reads the sentence as fragments. */
              /* "none", not "auto".

                 aria: "auto" copies the original text into an aria-label on the
                 container and hides the lines -- the right idea for a chars or
                 words split, where the fragments really do read as gibberish.
                 But the container here is a <p>, and aria-label is prohibited
                 on an element with no valid role: axe flags it and the label is
                 ignored, so the net effect is an invalid attribute and no
                 benefit. Caught by Lighthouse, not by reading it.

                 A lines split does not need the rescue anyway -- the text nodes
                 stay in the DOM in order inside inline spans, so assistive tech
                 reads the sentence normally. */
              aria: "none",
            });

            splits.push(split);

            gsap.from(split.lines, {
              yPercent: 110,
              duration: 0.9,
              ease: EASE,
              stagger: 0.08,
              scrollTrigger: {
                trigger: el,
                start: "top 85%",
                /* once, not toggleActions. These are headline statements; a
                   sentence that re-animates every time it re-enters the
                   viewport draws attention to the mechanism instead of the
                   words. */
                once: true,
              },
            });
          }

          /* Splitting changes element heights, so every trigger measured before
             this point is now measuring against stale positions. */
          ScrollTrigger.refresh();
        });
      });

      return () => {
        gsap.ticker.remove(raf);
        lenis.destroy();
        /* Explicit, rather than trusting the context to unwind it. A reverted
           SplitText has to put the original text nodes back; if that is skipped
           the DOM is left as a pile of per-line spans, and the next split runs
           against already-shredded markup. */
        for (const split of splits) split.revert();
      };
    });

    /* Turning the preference on mid-visit has to stop smooth scroll
       immediately -- it is the one effect here a user cannot escape by looking
       away, so waiting for a navigation is not good enough. revert() restores
       the split copy to plain text and kills every trigger. */
    const onPreferenceChange = () => {
      if (reduceMotion.matches) ctx.revert();
    };
    reduceMotion.addEventListener("change", onPreferenceChange);

    return () => {
      reduceMotion.removeEventListener("change", onPreferenceChange);
      /* Also covers React StrictMode's double-invoke in dev: without it the
         first Lenis instance keeps its ticker callback and both fight over
         scroll position. */
      ctx.revert();
    };
  }, []);

  return null;
}
