"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { navSections, site } from "@/content/site";
import styles from "./Nav.module.css";

/* The source design hides its nav links below 640px with no alternative, on the
   grounds that a hamburger for a six-section page is more machinery than the
   page is worth. That is a defensible call for a marketing page you scroll
   straight down. It is not defensible here: this page is read by people
   deciding whether to keep reading, on phones, and "the section numerals carry
   the structure once you are scrolling" assumes they already committed.

   So this adds a real disclosure menu -- which means owning the three things a
   disclosure has to do and that hand-rolled menus usually miss: report state to
   assistive tech, close on Escape, and return focus to the trigger when it
   does. */

export function Nav() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const close = useCallback((returnFocus: boolean) => {
    setOpen(false);
    // Without this, dismissing the menu drops focus to <body> and the next Tab
    // starts from the top of the document.
    if (returnFocus) toggleRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close(true);
    };

    // The viewport can cross the 640px breakpoint while the panel is open --
    // rotating a phone is enough. The panel would then be display:none while
    // `open` stayed true, leaving the toggle reporting aria-expanded="true" for
    // a menu nobody can see.
    const wide = window.matchMedia("(min-width: 641px)");
    const onWiden = () => {
      if (wide.matches) close(false);
    };

    document.addEventListener("keydown", onKeyDown);
    wide.addEventListener("change", onWiden);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      wide.removeEventListener("change", onWiden);
    };
  }, [open, close]);

  return (
    <header className={styles.nav}>
      <div className={`wrap ${styles.inner}`}>
        <a className={styles.mark} href="#top">
          {site.name}
          <span className={styles.markRole}>{site.kind}</span>
        </a>

        {/* The breakpoint hides this whole landmark, not just its list. Hiding
            only the <ul> would leave an empty "Sections" navigation landmark
            announced on every phone. */}
        <nav className={styles.desktopNav} aria-label="Sections">
          <ul className={styles.links}>
            {navSections.map((section) => (
              <li key={section.id}>
                <a href={`#${section.id}`}>{section.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <button
          ref={toggleRef}
          type="button"
          className={styles.toggle}
          aria-expanded={open}
          aria-controls="nav-panel"
          onClick={() => setOpen((v) => !v)}
        >
          <span className={`${styles.bars} ${open ? styles.barsOpen : ""}`} aria-hidden="true" />
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {/* Rendered unconditionally so aria-controls always resolves to a real
          element; visibility is CSS. A button pointing at an id that does not
          exist is a broken relationship, not an empty one. */}
      <div
        id="nav-panel"
        className={`${styles.panel} ${open ? styles.panelOpen : ""}`}
        hidden={!open}
      >
        {/* Deliberately not a second <nav>: two navigation landmarks both named
            "Sections" is worse than one. The disclosure relationship (button →
            aria-controls → this panel) is what gives the list its purpose. */}
        <div className="wrap">
          <ul>
            {navSections.map((section) => (
              <li key={section.id}>
                <a href={`#${section.id}`} onClick={() => close(false)}>
                  {section.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
}
