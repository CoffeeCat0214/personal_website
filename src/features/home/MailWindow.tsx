"use client";

import { useEffect, useRef, useState } from "react";
import { composeMailto } from "@/lib/mailto";
import styles from "./MailWindow.module.css";

/* The contact act's one concentrated kawaii moment: the address arrives as a
   Y2K desktop window you can actually type into rather than as a row in a table.

   Why a window and not a prettier row: the act has exactly one action worth
   doing, and a `<dl>` row states it at the same volume as "Based in". Giving
   the primary channel an object -- title bar, fields, status line -- promotes it
   by form instead of by another size step, which is the only promotion left in
   a system that already runs 3px frames on everything.

   The retro chrome is decorative and says so: the three title-bar squares are
   aria-hidden, take no pointer affordance, and never move. Fake controls that
   invite a click are the failure mode of every OS-pastiche component. */

const IDLE = "Channel open";
const COPIED = "Copied to clipboard";
/* Short enough to hold one line inside a 390px window once the label tier's
   uppercase and +0.1em tracking are applied -- the longest of the three states
   is the one that sets the status bar's width budget. */
const BLOCKED = "Copy blocked — select it above";

/* Prefilled so an arriving message is filterable instead of landing with an
   empty subject. The visitor still sees it in their own mail client and can
   change it before sending, so this is a starting point, not a claim. */
const SUBJECT = "Hello from your site";

/* A mailto: URL has no spec'd length limit, but real mail clients truncate
   somewhere north of ~2000 characters and they do it silently. 1000 characters
   of prose encodes to roughly 1150, which leaves headroom under every client's
   floor -- and a first message longer than that wants to be written in the mail
   app anyway. */
const MAX = 1000;

/* The 7x6 pixel heart: the seal on the envelope and the mark in the title and
   status bars. Authored as integer rects with crispEdges rather than a path, so
   the staircase is real pixel art at any size rather than an antialiased curve
   pretending to be one.
       . # # . # # .
       # # # # # # #
       # # # # # # #
       . # # # # # .
       . . # # # . .
       . . . # . . .
   Six rows, not four. A 5x4 heart is the smaller classic and it is what most
   pixel sets ship, but at the 12px this renders at the two lobes and the point
   collapse into a plus sign -- the shape only survives once the lobes have two
   columns each to be lobes with. */
function heartRects(x: number, y: number) {
  return [
    { x: x + 1, y, w: 2, h: 1 },
    { x: x + 4, y, w: 2, h: 1 },
    { x, y: y + 1, w: 7, h: 2 },
    { x: x + 1, y: y + 3, w: 5, h: 1 },
    { x: x + 2, y: y + 4, w: 3, h: 1 },
    { x: x + 3, y: y + 5, w: 1, h: 1 },
  ];
}

function PixelHeart({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 7 6" aria-hidden="true" focusable="false">
      {heartRects(0, 0).map((r, i) => (
        <rect key={i} x={r.x} y={r.y} width={r.w} height={r.h} shapeRendering="crispEdges" />
      ))}
    </svg>
  );
}

function PixelEnvelope({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 22 15" aria-hidden="true" focusable="false">
      <rect
        className={styles.envelopeBody}
        x="0.5"
        y="2.5"
        width="21"
        height="12"
        shapeRendering="crispEdges"
      />
      {/* The fold. crispEdges turns the two diagonals into a staircase, which is
          the whole point -- a smoothed diagonal here would read as clip art. */}
      <path
        className={styles.envelopeFold}
        d="M0.5 2.5 L11 10 L21.5 2.5"
        shapeRendering="crispEdges"
      />
      {/* The seal nests inside the V rather than swallowing it. At y=6 the fold
          lines sit at x 5.4 and 16.6, so a 7-wide heart starting at 7.5 leaves
          both wings of the fold visible above it and still covers the vertex at
          (11,10) on its way down -- which is what makes the shape read as a
          sealed envelope instead of a box with a heart on it. */}
      {heartRects(7.5, 6).map((r, i) => (
        <rect
          key={i}
          className={styles.envelopeSeal}
          x={r.x}
          y={r.y}
          width={r.w}
          height={r.h}
          shapeRendering="crispEdges"
        />
      ))}
    </svg>
  );
}

export function MailWindow({ email }: { email: string }) {
  const [message, setMessage] = useState("");
  const [copyState, setCopyState] = useState<string | null>(null);
  /* The copy button is the one control here that cannot work without JS, so it
     is not rendered until the client has mounted. Under static export a button
     printed into the HTML that never gains a handler is a dead control for
     anyone whose script fails. Everything else in this window -- the address,
     the textarea, Compose -- works with no script at all. */
  const [mounted, setMounted] = useState(false);
  const resetTimer = useRef<number | undefined>(undefined);

  useEffect(() => setMounted(true), []);
  useEffect(() => () => window.clearTimeout(resetTimer.current), []);

  const copy = async () => {
    window.clearTimeout(resetTimer.current);
    try {
      await navigator.clipboard.writeText(email);
      setCopyState(COPIED);
    } catch {
      setCopyState(BLOCKED);
    }
    resetTimer.current = window.setTimeout(() => setCopyState(null), 2600);
  };

  /* Two submission paths, and both are live.

     Without JS the browser submits the form natively: for a `mailto:` action
     with method="get", the HTML spec replaces the URL's query with the
     serialized form data, so the hidden subject and the textarea both survive.
     That path is application/x-www-form-urlencoded, which spells a space as
     "+" -- most clients still read it as a space, and the visitor reviews the
     draft in their own mail app before sending either way.

     With JS we build the URL in composeMailto instead, which percent-encodes
     per RFC 6068. Same control, no second button, no dead affordance. */
  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    window.location.assign(composeMailto(email, SUBJECT, message));
  };

  const status = copyState ?? (message.length > 0 ? `Draft · ${message.length}/${MAX}` : IDLE);

  return (
    <div className={styles.window}>
      <div className={styles.titleBar}>
        <PixelHeart className={styles.titleHeart} />
        <span className={styles.title}>say_hello.exe</span>
        <span className={styles.chrome} aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
      </div>

      <form className={styles.body} action={`mailto:${email}`} method="get" onSubmit={submit}>
        <input type="hidden" name="subject" value={SUBJECT} />

        <div className={styles.group}>
          <p className={styles.fieldLabel} id="mail-window-to">
            To
          </p>
          <div className={styles.field}>
            <PixelEnvelope className={styles.envelope} />
            <a className={styles.address} href={`mailto:${email}`} aria-describedby="mail-window-to">
              {email}
            </a>
            <span className={styles.caret} aria-hidden="true" />
          </div>
        </div>

        <div className={styles.group}>
          <label className={styles.fieldLabel} htmlFor="mail-window-body">
            Message
          </label>
          {/* Body copy, not data -- so it is set in the reading face. The
              address above it stays mono because an address is a string you
              check character by character. */}
          <textarea
            id="mail-window-body"
            name="body"
            className={styles.message}
            rows={4}
            maxLength={MAX}
            placeholder="Say anything. A question, a project, a cat photo."
            value={message}
            onChange={(event) => setMessage(event.target.value)}
          />
        </div>

        <div className={styles.actions}>
          <button type="submit" className={styles.compose}>
            Compose <span aria-hidden="true">↗</span>
          </button>
          {mounted ? (
            <button type="button" className={styles.copy} onClick={copy}>
              Copy address
            </button>
          ) : null}
        </div>

        <p className={styles.hint}>Opens in your mail app. Nothing is sent from this page.</p>
      </form>

      {/* The status line doubles as the live region for the copy result, so the
          confirmation lands where a desktop app would put it instead of in a
          toast that covers something else. */}
      <p className={styles.status} aria-live="polite">
        <span className={styles.dot} aria-hidden="true" />
        {status}
        <PixelHeart className={styles.statusHeart} />
      </p>
    </div>
  );
}
