"use client";

import { useState } from "react";
import { composeGmail } from "@/lib/mailto";
import styles from "./MailWindow.module.css";

/* The contact act's one concentrated kawaii moment: the address arrives as a
   Y2K desktop window you can actually type into rather than as a row in a table.

   Why a window and not a prettier row: the act has exactly one action worth
   doing, and a `<dl>` row states it at the same volume as "Based in". Giving
   the primary channel an object -- title bar, fields, status line -- promotes it
   by form instead of by another size step, which is the only promotion left in
   a system that already runs 3px frames on everything.

   The retro chrome is decorative, and the window has one action: open a Gmail
   draft. Decorative controls and duplicate handoff paths only make a simple
   contact task harder to parse. */

const IDLE = "Channel open";

/* Prefilled, and visible. It used to be a `<input type="hidden">`: the window
   put a TO row and a MESSAGE well on screen, called itself a mail composer, and
   then attached a subject line nobody could read or change. That is the thing
   about this window that did not make sense -- not the styling of any one row,
   but a composer showing two of the three fields every mail client shows and
   silently filling the third.

   Editable rather than fixed, because a subject is the visitor's sentence, not
   the site's. The default is only a starting point so a message sent without
   touching it still arrives filterable. */
const SUBJECT = "Hello Kyrstin";

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

  const status = message.length > 0 ? `Draft · ${message.length}/${MAX}` : IDLE;
  const gmailHref = composeGmail(email, subject, message);

  return (
    <div className={styles.window}>
      <div className={styles.titleBar}>
        <PixelEnvelope className={styles.titleIcon} />
        <span className={styles.title}>say_hello.exe</span>
        <span className={styles.chrome}>EMAIL DRAFT</span>
      </div>

      <div
        className={styles.body}
        aria-describedby="mail-window-hint"
      >
        {/* The recipient is information, not another action. */}
        <div className={styles.group}>
          <p className={styles.fieldLabel} id="mail-window-to">
            To
          </p>
          <div className={styles.field}>
            <span className={styles.address} aria-describedby="mail-window-to">
              {email}
            </span>
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
            placeholder="Tell me what you're working on."
            value={message}
            onChange={(event) => setMessage(event.target.value)}
          />
        </div>

        <div className={styles.actions}>
          <a
            className={styles.compose}
            href={gmailHref}
            target="_blank"
            rel="noreferrer"
          >
            Open Gmail draft <span aria-hidden="true">↗</span>
          </a>
          <p className={styles.hint} id="mail-window-hint">
            <span>Opens Gmail with your draft ready to edit.</span>
            <span>Nothing is sent until you click Send.</span>
          </p>
        </div>
      </div>

      {/* The status line gives quiet feedback while the visitor writes. */}
      <p className={styles.status}>
        <span className={styles.dot} aria-hidden="true" />
        {status}
        <PixelHeart className={styles.statusHeart} />
      </p>
    </div>
  );
}
