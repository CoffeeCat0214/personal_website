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
  const message = body.trim();
  const query =
    `subject=${encodeURIComponent(subject)}` +
    (message ? `&body=${encodeURIComponent(message)}` : "");

  return `mailto:${email}?${query}`;
}
