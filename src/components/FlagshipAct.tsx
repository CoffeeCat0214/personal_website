import { flagship } from "@/content/site";
import { Act } from "./Act";
import caseStyles from "./Case.module.css";
import styles from "./Flagship.module.css";

/* The flagship act, and the only one that gets narrative depth.

   There is deliberately no figure here. Every other act on the page carries one
   -- the mug sprite, the diff, the Discord thread -- because those things exist
   and can be depicted honestly. The story world does not exist yet, and Misu
   has no mark: public/art carries one cat, and the name promises two. A
   placeholder illustration would be the one dishonest element on a page whose
   whole argument is about checking what you are shown.

   So the weight is carried typographically instead: the positioning line runs
   at near-display size on its own, which is what the reference site does with
   its statement bands. Sparse on purpose reads as confidence; sparse by
   accident reads as unfinished, and the difference is whether anything else on
   the surface is pretending. */
export function FlagshipAct({ anchorId }: { anchorId?: string }) {
  return (
    <Act
      id={flagship.id}
      number={flagship.number}
      eyebrow={flagship.eyebrow}
      tone={flagship.tone}
      anchorId={anchorId}
    >
      <div className={caseStyles.head} data-reveal>
        <h2>{flagship.title}</h2>
      </div>

      {/* The studio's standing description of the story world, given the space
          a claim of that size needs. The three beats below are what earn it.

          data-split rather than data-reveal="display": this is the one sentence
          on the page most worth reading line by line, and a per-line mask makes
          a reader take it that way instead of as a single block arriving. */}
      <p className={styles.positioning} data-split>
        {flagship.positioning}
      </p>

      <div className={caseStyles.beats}>
        {flagship.beats.map((beat) => (
          <div className={caseStyles.beat} key={beat.label} data-reveal>
            <p className={caseStyles.beatLabel}>{beat.label}</p>
            <div className={caseStyles.beatCopy}>
              <h3>{beat.heading}</h3>
              <p>{beat.body}</p>
            </div>
          </div>
        ))}
      </div>
    </Act>
  );
}
