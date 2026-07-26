"use client";

import { useState } from "react";
import { subscribe } from "@/content/site";
import styles from "./Subscribe.module.css";

/* The conversion surface.

   Audience growth is the studio's stated goal, and for a children's media
   venture the subscriber count is also the traction number a partner
   underwrites -- so this is infrastructure, not a footer widget, and it gets
   real states rather than an optimistic "thanks!".

   Buttondown, posted to directly from the browser. The site is a static export
   on S3 with no server to receive a form, and the embed-subscribe endpoint
   answers with `access-control-allow-origin: *`, so the response is actually
   readable and success and failure can be told apart. That last part is why
   this is not a `mode: "no-cors"` fetch: no-cors returns an opaque response
   where `ok` is always false and status is always 0, which means every outcome
   looks identical and the form has to lie about at least one of them.

   Progressive enhancement, not JS-only. The <form> carries a real action and
   method, so with JS broken or still loading it submits natively and lands on
   Buttondown's own confirmation page. The handler below only preempts that. */

const BUTTONDOWN_USER = process.env.NEXT_PUBLIC_BUTTONDOWN_USER;

type Status = "idle" | "submitting" | "success" | "error";

export function Subscribe() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  /* No newsletter configured yet, so no form. An input that posts nowhere is
     worse than no input: it collects addresses into a 404 and the visitor
     believes they subscribed. The act's copy and the direct channels still
     render around this, so the section is not left empty.

     Set NEXT_PUBLIC_BUTTONDOWN_USER at build time to switch it on. */
  if (!BUTTONDOWN_USER) return null;

  const endpoint = `https://buttondown.com/api/emails/embed-subscribe/${BUTTONDOWN_USER}`;

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const email = new FormData(form).get("email");

    if (typeof email !== "string" || !email) return;

    setStatus("submitting");
    setMessage("");

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ email }),
      });

      if (!response.ok) throw new Error(String(response.status));

      setStatus("success");
      setMessage("Check your inbox to confirm.");
      form.reset();
    } catch {
      /* Deliberately does not echo the error. A visitor cannot act on a 422,
         and the recovery path is the same whatever went wrong -- so give them
         one that always works instead of a status code. */
      setStatus("error");
      setMessage("That did not go through. Email hello directly and I'll add you.");
    }
  };

  return (
    <form className={styles.form} action={endpoint} method="post" onSubmit={onSubmit}>
      <div className={styles.field}>
        {/* A visible label, not a placeholder standing in for one. Placeholder
            text disappears the moment someone starts typing, which is exactly
            when a person who was interrupted needs to know what the field
            was. */}
        <label className={styles.label} htmlFor="subscribe-email">
          Email address
        </label>
        <input
          className={styles.input}
          id="subscribe-email"
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          required
          placeholder={subscribe.placeholder}
          disabled={status === "submitting"}
          aria-describedby="subscribe-status"
        />
      </div>

      <button className="btn" type="submit" disabled={status === "submitting"}>
        {status === "submitting" ? "Sending…" : subscribe.cta}
      </button>

      {/* Always in the DOM, never conditionally mounted. A live region that is
          inserted at the same moment its text appears is frequently missed --
          the region has to exist and be watched before the change happens for
          the announcement to fire reliably. */}
      <p
        className={`${styles.status} ${status === "error" ? styles.statusError : ""}`}
        id="subscribe-status"
        role="status"
        aria-live="polite"
      >
        {message}
      </p>
    </form>
  );
}
