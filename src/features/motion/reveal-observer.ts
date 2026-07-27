const STAGGER_MS = 60;
const MAX_STAGGER_STEPS = 8;

export function startRevealObserver() {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const targets = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));

  if (!("IntersectionObserver" in window) || reduceMotion.matches || targets.length === 0) {
    return () => {};
  }

  for (const el of targets) {
    el.classList.add("is-hidden");
  }

  const show = (el: HTMLElement) => {
    el.classList.remove("is-hidden");
    el.classList.add("is-revealed");
  };

  const timers: number[] = [];
  // A layout shift, a slow font, or an embedded browser can occasionally delay
  // an initial IntersectionObserver notification. Never leave a static-export
  // page with its runtime-only hidden state in that case.
  const visibilityFallback = window.setTimeout(() => {
    for (const el of targets) show(el);
  }, 1600);
  const observer = new IntersectionObserver(
    (entries, self) => {
      let step = 0;

      for (const entry of entries) {
        if (!entry.isIntersecting) continue;

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
    { rootMargin: "0px 0px -8% 0px", threshold: 0.1 }
  );

  for (const el of targets) {
    observer.observe(el);
  }

  const onPreferenceChange = () => {
    if (!reduceMotion.matches) return;

    observer.disconnect();
    for (const el of targets) {
      el.classList.remove("is-hidden");
    }
  };

  reduceMotion.addEventListener("change", onPreferenceChange);

  return () => {
    observer.disconnect();
    window.clearTimeout(visibilityFallback);
    reduceMotion.removeEventListener("change", onPreferenceChange);
    for (const id of timers) window.clearTimeout(id);
    for (const el of targets) el.classList.remove("is-hidden");
  };
}
