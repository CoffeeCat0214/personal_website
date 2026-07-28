import assert from "node:assert/strict";
import test from "node:test";
import { composeMailto } from "../src/lib/mailto";

const EMAIL = "kauchakmk@gmail.com";
const SUBJECT = "Hello from your site";

test("spaces are percent-encoded, never plus-encoded", () => {
  const url = composeMailto(EMAIL, SUBJECT, "two words");

  /* The failure this guards: URLSearchParams and native form submission both
     use application/x-www-form-urlencoded, and a mail client that reads a "+"
     literally puts plus signs through the subject line. */
  assert.ok(!url.includes("+"), `plus-encoding leaked into: ${url}`);
  assert.match(url, /subject=Hello%20from%20your%20site/);
  assert.match(url, /body=two%20words/);
});

test("query separators inside the message cannot break out of the body", () => {
  const url = composeMailto(EMAIL, SUBJECT, "cats & dogs?to=someone@else.com");

  assert.match(url, /body=cats%20%26%20dogs%3Fto%3Dsomeone%40else\.com$/);
  /* Exactly one "?" -- the one that opens the query. */
  assert.equal(url.split("?").length - 1, 1);
  /* Exactly one "&" -- the one between subject and body. */
  assert.equal(url.split("&").length - 1, 1);
});

test("newlines survive as line breaks", () => {
  const url = composeMailto(EMAIL, SUBJECT, "line one\nline two");

  assert.match(url, /body=line%20one%0Aline%20two/);
});

test("an empty message omits body entirely rather than sending body=", () => {
  for (const empty of ["", "   ", "\n\t "]) {
    const url = composeMailto(EMAIL, SUBJECT, empty);

    assert.equal(url, `mailto:${EMAIL}?subject=Hello%20from%20your%20site`);
  }
});

test("a cleared subject is omitted, never sent as an empty header", () => {
  /* The subject is a visitor-editable field, so it can arrive blank. `subject=`
     is not the same request as no subject at all -- it asks the mail client for
     an empty Subject header rather than for none. */
  for (const empty of ["", "   ", "\n\t "]) {
    assert.equal(composeMailto(EMAIL, empty, "hi"), `mailto:${EMAIL}?body=hi`);
  }
});

test("both fields empty leaves a bare mailto with no query at all", () => {
  assert.equal(composeMailto(EMAIL, "", ""), `mailto:${EMAIL}`);
});

test("a subject the visitor typed is percent-encoded like any other", () => {
  const url = composeMailto(EMAIL, "cats & dogs?", "hi");

  assert.match(url, /^mailto:[^?]+\?subject=cats%20%26%20dogs%3F&body=hi$/);
});

test("the address is always the mailto target", () => {
  assert.ok(composeMailto(EMAIL, SUBJECT, "hi").startsWith(`mailto:${EMAIL}?`));
});
