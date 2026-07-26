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
  });

  lenis.on("scroll", ScrollTrigger.update);

  const raf = (time: number) => lenis.raf(time * 1000);
  gsap.ticker.add(raf);
  gsap.ticker.lagSmoothing(0);

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
