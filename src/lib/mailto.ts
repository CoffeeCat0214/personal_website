/* Building a mailto: URL, in one place and under test.

   This exists as its own module rather than inline in the component for one
   reason: the encoding rule is easy to get wrong and impossible to observe from
   the outside. `location.assign` cannot be stubbed in Chrome, and a mailto:
   navigation is an external-protocol handoff that never appears in the network
   log -- so a browser test can prove the click was handled but never prove the
   URL was right. A pure function can be asserted directly.

   The rule: RFC 6068 says the query is percent-encoded, so a space is %20.
   `URLSearchParams` and native form submission both use
   application/x-www-form-urlencoded, which spells a space as "+" -- and a mail
   client that reads that literally puts plus signs through the subject line.
   encodeURIComponent is the correct tool here and URLSearchParams is not. */
export function composeMailto(email: string, subject: string, body: string): string {
  /* Both fields are visitor-editable now, so both can arrive empty, and an
     empty one is omitted rather than sent as `subject=`. A mail client handed
     `subject=` does not fall back to its own blank-subject handling -- it sets
     an empty subject header, which is why a cleared field would otherwise
     produce a draft that cannot be given a subject by typing in the client's
     own field on some builds. Omit means "not specified"; empty means
     "specified as nothing", and only the first is true here. */
  const params = [];
  const line = subject.trim();
  const message = body.trim();

  if (line) params.push(`subject=${encodeURIComponent(line)}`);
  if (message) params.push(`body=${encodeURIComponent(message)}`);

  return params.length ? `mailto:${email}?${params.join("&")}` : `mailto:${email}`;
}

/* Gmail is the explicit web fallback for visitors whose browser has no
   registered mailto: handler. Keep the same RFC-style percent encoding as the
   mailto composer; Gmail accepts `%20` cleanly and this avoids the literal `+`
   spaces produced by URLSearchParams. */
export function composeGmail(email: string, subject: string, body: string): string {
  const params = [`view=cm`, `fs=1`, `to=${encodeURIComponent(email)}`];
  const line = subject.trim();
  const message = body.trim();

  if (line) params.push(`su=${encodeURIComponent(line)}`);
  if (message) params.push(`body=${encodeURIComponent(message)}`);

  return `https://mail.google.com/mail/?${params.join("&")}`;
}
