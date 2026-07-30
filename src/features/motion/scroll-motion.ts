import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase);

const EASE = CustomEase.create("site", "M0,0 C0.51,0.01 0.2,1 1,1");
const RUNNER_SPEED = 55;
const RUNNER_VELOCITY_DIVISOR = 900;
const RUNNER_MAX_BOOST = 5;

function attachSmoothScroll() {
  const lenis = new Lenis({
    autoRaf: false,
    smoothWheel: true,
    syncTouch: false,
    /* Lenis owns the scroll position once it mounts, so the browser's native
       hash handling stops working: an in-page link updates the URL and Lenis
       animates back to its own target. Without this, every nav link and every
       hero CTA silently does nothing. */
    anchors: true,
  });

  lenis.on("scroll", ScrollTrigger.update);

  const raf = (time: number) => lenis.raf(time * 1000);
  gsap.ticker.add(raf);
  gsap.ticker.lagSmoothing(0);

  /* The deep-link case, which `anchors` does not cover: the browser performs its
     native jump before Lenis mounts, and Lenis then initialises at scroll 0 and
     pulls the page back to the top. Someone sent /home/#cremeai would land on
     the hero. Re-issuing the jump after mount is what makes a shared link work.

     Deferred a frame because SplitText and the reveal observer are still
     measuring; scrolling before layout settles lands at the wrong offset. */
  const hash = window.location.hash;
  if (hash.length > 1) {
    requestAnimationFrame(() => {
      const target = document.querySelector(hash);
      if (target) lenis.scrollTo(target as HTMLElement, { immediate: true });
    });
  }

  return () => {
    gsap.ticker.remove(raf);
    lenis.destroy();
  };
}

function attachMarquees() {
  const tracks = gsap.utils.toArray<HTMLElement>("[data-runner]");

  for (const track of tracks) {
    const groups = track.children.length;
    if (groups < 2) continue;

    const groupWidth = track.getBoundingClientRect().width / groups;
    if (groupWidth === 0) continue;

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
        const direction = velocity === 0 ? 1 : Math.sign(velocity);

        gsap.to(loop, {
          timeScale: direction * (1 + Math.abs(boost)),
          duration: 0.4,
          overwrite: true,
        });
      },
      onEnter: () => loop.play(),
      onEnterBack: () => loop.play(),
      onLeave: () => loop.pause(),
      onLeaveBack: () => loop.pause(),
    });
  }
}

function attachSplitText(getContext: () => gsap.Context | undefined, splits: SplitText[]) {
  document.fonts.ready.then(() => {
    const ctx = getContext();
    if (!ctx || ctx.isReverted) return;

    ctx.add(() => {
      const targets = gsap.utils.toArray<HTMLElement>("[data-split]");

      for (const el of targets) {
        const split = SplitText.create(el, {
          type: "lines",
          mask: "lines",
          linesClass: "split-line",
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
            once: true,
          },
        });
      }

      ScrollTrigger.refresh();
    });
  });
}

export function startScrollMotion() {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (reduceMotion.matches) return () => {};

  const contextRef: { current?: gsap.Context } = {};
  const ctx = gsap.context(() => {
    const cleanupSmoothScroll = attachSmoothScroll();
    const splits: SplitText[] = [];

    attachMarquees();
    attachSplitText(() => contextRef.current, splits);

    return () => {
      cleanupSmoothScroll();
      for (const split of splits) split.revert();
    };
  });
  contextRef.current = ctx;

  const onPreferenceChange = () => {
    if (reduceMotion.matches) ctx?.revert();
  };
  reduceMotion.addEventListener("change", onPreferenceChange);

  return () => {
    reduceMotion.removeEventListener("change", onPreferenceChange);
    ctx?.revert();
  };
}
