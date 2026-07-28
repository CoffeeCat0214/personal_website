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
const COPIED = "Address copied";
/* Short enough to hold one line inside a 390px window once the label tier's
   uppercase and +0.1em tracking are applied -- the longest of the three states
   is the one that sets the status bar's width budget. */
const BLOCKED = "Copy blocked — select it above";

/* Prefilled, and visible. It used to be a `<input type="hidden">`: the window
   put a TO row and a MESSAGE well on screen, called itself a mail composer, and
   then attached a subject line nobody could read or change. That is the thing
   about this window that did not make sense -- not the styling of any one row,
   but a composer showing two of the three fields every mail client shows and
   silently filling the third.

   Editable rather than fixed, because a subject is the visitor's sentence, not
   the site's. The default is only a starting point so a message sent without
   touching it still arrives filterable. */
const SUBJECT = "Hello from your site";

/* Long enough for a real subject, short enough that it cannot quietly become
   the message. Mail clients truncate the header in list view somewhere around
   70-80 characters anyway. */
const SUBJECT_MAX = 90;

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

/* The window's app icon, and the only place it appears.

   It used to sit inline in the TO row at 46px: a pale, thinly-outlined
   rectangle immediately under a label reading "TO" and immediately above a
   framed message well. Every signal in that position says "input" -- pale fill,
   visible frame, roughly field height, sitting where a field goes -- so the row
   read as three boxes in a line with no way to tell which one you were meant to
   type in. Nothing about it was wrong as drawing; it was wrong as *placement*.

   In the title bar the same drawing is unambiguous, because that is where an
   application's icon lives and nothing in a title bar accepts typing. The
   kawaii moment survives at full strength and the form below it goes back to
   having exactly one thing per row. */
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
  const [subject, setSubject] = useState(SUBJECT);
  const [message, setMessage] = useState("");
  /* The press counter is not decoration. A live region announces on DOM
     mutation, not on state assignment -- so pressing Copy twice inside the 2.6s
     hold set `copyState` to the string it already held, React skipped the text
     node, no mutation fired, and a screen reader said nothing at all for the
     second press. The visible bar has the same problem and the same fix. Every
     press gets a distinct seq, which is what makes the render differ. */
  const [copyState, setCopyState] = useState<{ text: string; seq: number } | null>(null);
  const presses = useRef(0);
  /* The copy button is the one control here that cannot work without JS, so it
     is not rendered until the client has mounted. Under static export a button
     printed into the HTML that never gains a handler is a dead control for
     anyone whose script fails. Everything else in this window -- the address,
     the textarea, the submit -- works with no script at all. */
  const [mounted, setMounted] = useState(false);
  const resetTimer = useRef<number | undefined>(undefined);

  useEffect(() => setMounted(true), []);
  useEffect(() => () => window.clearTimeout(resetTimer.current), []);

  const copy = async () => {
    window.clearTimeout(resetTimer.current);
    presses.current += 1;
    const seq = presses.current;
    try {
      await navigator.clipboard.writeText(email);
      setCopyState({ text: COPIED, seq });
    } catch {
      setCopyState({ text: BLOCKED, seq });
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
     per RFC 6068. Same control, no second button, no dead affordance.

     What neither path can do is tell you it failed. Navigating to a scheme with
     no registered handler -- Chrome on a machine that has never been given a
     default mail client, a locked-down work desktop, anyone living in webmail
     without the protocol handler installed -- is a silent no-op. No error, no
     navigation, nothing.

     There was briefly a "Copy message" button below the textarea to recover
     from that, and it was the wrong instinct. When the handoff no-ops the
     message is not lost: it is still sitting in a `<textarea>`, which is the
     most copyable element on the page -- click, select all, copy, all native.
     A button for it duplicated something the platform already gives away, and
     it cost a second copy control in a window that only has room for one idea
     per row. The address is the opposite case and is why the one remaining copy
     button is up there: static text inside a link, where a drag-select catches
     the surrounding whitespace and a double-click stops at the "@". Copy
     controls are for values you cannot easily select, not for the ones you can.

     Both fields survive with no JS at all. React serialises the controlled
     `value` into the SSR markup, so the subject arrives prefilled and natively
     editable, and the browser's own form submission serialises subject and body
     into the mailto: query. The only thing script adds to this window is Copy
     -- which is why Copy is the only thing gated on having it. */
  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    window.location.assign(composeMailto(email, subject, message));
  };

  const status =
    copyState?.text ?? (message.length > 0 ? `Draft · ${message.length}/${MAX}` : IDLE);

  /* The address stays a link, and once JS is up it carries the draft rather
     than pointing at a bare `mailto:`. A visitor who has typed three paragraphs
     and then clicks the address -- the most conventional target on the row --
     should not be handed an empty compose window. Before mount it is the plain
     address, which is both the correct no-JS behaviour and identical to what
     the server rendered, so hydration has nothing to reconcile. */
  const href = mounted ? composeMailto(email, subject, message) : `mailto:${email}`;

  return (
    <div className={styles.window}>
      <div className={styles.titleBar}>
        <PixelEnvelope className={styles.titleIcon} />
        <span className={styles.title}>say_hello.exe</span>
        <span className={styles.chrome} aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
      </div>

      {/* Three rows in the order every mail client puts them, and one rule for
          how each is dressed: a value you cannot change is plain text on the
          paper; a value you can change sits in a framed, one-step-darker well.
          That is the whole grammar of this form, it is visible at a glance, and
          it is what the window was missing -- previously the only editable
          thing was also the only framed thing, but the unframed row above it
          still carried an icon shaped like a field. */}
      <form className={styles.body} action={`mailto:${email}`} method="get" onSubmit={submit}>
        {/* The To row is a fixed value, so it is dressed as one: a plain strip
            with a rule under the address and a copy control on the right end.

            It used to be an inset well with a 2px frame, a one-step-darker fill
            and a blinking terminal caret parked after the address -- every
            signal a text input gives, on a field nobody can type in. The caret
            was the worst of it: it said "you are mid-entry here" about the one
            line of this window that is not editable, directly above the one that
            is. Matching the message well's treatment made the lie symmetrical.

            Copy lives here rather than down in the action row because it acts on
            this address, not on the draft. In the old row it sat beside the
            submit as an equal option, which framed the window as "pick one of
            two things to do with your message" -- and then one of the two
            ignored the message entirely. */}
        <div className={styles.group}>
          <p className={styles.fieldLabel} id="mail-window-to">
            To
          </p>
          <div className={styles.field}>
            <a className={styles.address} href={href} aria-describedby="mail-window-to">
              {email}
            </a>
            {mounted ? (
              <button
                type="button"
                className={styles.copy}
                onClick={copy}
                /* The visible label changes to confirm at the point of action;
                   the accessible name stays fixed so a screen reader is not told
                   the button became a different control. The result itself is
                   announced by the status line's live region. */
                aria-label={`Copy ${email}`}
                data-state={copyState?.text === COPIED ? "done" : undefined}
              >
                {copyState?.text === COPIED ? "Copied" : "Copy"}
              </button>
            ) : null}
          </div>
        </div>

        <div className={styles.group}>
          <label className={styles.fieldLabel} htmlFor="mail-window-subject">
            Subject
          </label>
          <input
            id="mail-window-subject"
            name="subject"
            type="text"
            className={styles.subject}
            maxLength={SUBJECT_MAX}
            /* Not a browser-fillable field -- there is no "subject" the visitor
               has stored anywhere, and an autofill dropdown over a prefilled
               value is pure noise. */
            autoComplete="off"
            value={subject}
            onChange={(event) => setSubject(event.target.value)}
          />
        </div>

        {/* The row that takes the window's spare height: `.body` puts this group
            on the flexible track, so if the panel opposite ever grows taller the
            surplus lands inside the writing area rather than above the status
            bar. A mail window whose message box is the part that grows is also
            just how a mail window behaves. */}
        <div className={`${styles.group} ${styles.messageGroup}`}>
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

        {/* "Open draft in mail app", not "Compose" and not "Open in mail app".

            "Compose" names the gesture the *mail app* performs after this button
            hands the draft over. "Open in mail app" fixed that but named only the
            destination, which reads as "launch my mail client" -- a blank compose
            window. Someone who has just typed two hundred words needs the label
            to say their words are what travels, and "draft" is the word that
            carries it. */}
        <div className={styles.actions}>
          <button type="submit" className={styles.compose}>
            Open draft in mail app <span aria-hidden="true">↗</span>
          </button>
          {/* Two blocks, not one paragraph left to wrap. The two sentences
              together measure just over the window's inner width at every size
              this act is seen at, so free wrapping broke them mid-clause --
              "…in your own mail / app." -- and `text-wrap: balance` only made
              the two ragged halves equal, not sensible. Each sentence is short
              enough to hold its own line unaided, so giving each one a line is
              both the honest markup and the only break that never lands
              somewhere embarrassing. */}
          <p className={styles.hint}>
            <span>Your draft opens in your own mail app.</span>
            <span>Nothing is sent from this page.</span>
          </p>
        </div>
      </form>

      {/* The status line carries three different things -- the idle state, a
          live character count, and the copy result -- and only the last of them
          is an announcement.

          It used to be one node with `aria-live="polite"` on it, which meant the
          counter was inside the live region: every keystroke re-rendered it and
          queued "Draft · 1/1000", "Draft · 2/1000", … at a screen reader. That
          made the textarea unusable with AT while nominally being an
          accessibility feature. The visible bar keeps all three states and no
          longer announces; a hidden region beside it announces the copy result
          only, which is the one event a person needs told rather than shown. */}
      <p className={styles.status}>
        <span className={styles.dot} aria-hidden="true" />
        {status}
        <PixelHeart className={styles.statusHeart} />
      </p>
      {/* The trailing space is the mutation, and it is load-bearing. Two
          presses of Copy produce the same sentence; a live region that receives
          the same sentence twice announces it once, because it is watching the
          DOM rather than the state. Alternating one trailing space per press
          changes the text node without changing a single spoken word. */}
      <span className={styles.announce} aria-live="polite">
        {copyState ? `${copyState.text}${copyState.seq % 2 ? " " : ""}` : ""}
      </span>
    </div>
  );
}
