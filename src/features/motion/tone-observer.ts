const TONES = ["tone-sage", "tone-pink", "tone-forest", "tone-lilac", "tone-orange"];

export function startToneObserver() {
  const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-tone]"));
  if (!("IntersectionObserver" in window) || sections.length === 0) return () => {};

  const root = document.documentElement;
  const visible = new Set<Element>();

  const apply = () => {
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
      rootMargin: "-60px 0px -88% 0px",
      threshold: 0,
    }
  );

  for (const el of sections) observer.observe(el);

  return () => {
    observer.disconnect();
    root.classList.remove(...TONES);
  };
}
