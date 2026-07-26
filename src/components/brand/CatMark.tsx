import styles from "./CatMark.module.css";

/* The recurring mark: the same cat, restated on every ground.

   This began as a CSS mask -- fill a box with --ink, punch the cat's alpha out
   of it, and let the mark adopt each act's colour with no per-tone exports.
   That is how the reference board does it, and it was wrong here. A logotype
   survives being reduced to its outline because the outline *is* the mark. This
   cat's identity is its face: the eyes, the stripes, the flat nose. As a flat
   silhouette it reads as a rounded lump with two bumps on top, at poster size
   as badly as at rail size.

   So the mark stays full-colour and the ginger does the work the ink was
   supposed to. It separates from every ground on the page because the artwork
   carries its own dark outline -- including orange, the one ground where a
   ginger cat had no business being legible.

   Decorative in every placement. The act numeral and heading beside it already
   name the section; a screen reader announcing "cat" once per act would be the
   same noise six times over. */
export function CatMark({
  variant = "rail",
}: {
  variant?: "rail" | "panel" | "tag";
}) {
  return (
    /* eslint-disable-next-line @next/next/no-img-element -- see Hero.tsx; static
       export runs unoptimized, so next/image adds machinery around an already
       sized asset. Lazy here, unlike the hero: none of these are the LCP
       element, and there are eight of them. */
    <img
      className={`${styles.mark} ${styles[variant]}`}
      src="/art/buddy.webp"
      alt=""
      width={420}
      height={539}
      loading="lazy"
      decoding="async"
    />
  );
}
