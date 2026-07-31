"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { HOME_ROUTE, navSections, site } from "@/content";
import styles from "./Nav.module.css";

type Mode = "glam" | "grind";
const MODE_STORAGE_KEY = "kyrstin-portfolio-mode";

/* Below the compact navigation breakpoint the section links collapse into a real
   disclosure menu, which means owning the three things hand-rolled menus usually miss: report state to
   assistive tech, close on Escape, and return focus to the trigger when it
   does. */

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [mode, setMode] = useState<Mode>("glam");
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const stored = window.localStorage.getItem(MODE_STORAGE_KEY);
    if (stored === "glam" || stored === "grind") setMode(stored);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.mode = mode;
    window.localStorage.setItem(MODE_STORAGE_KEY, mode);
  }, [mode]);

  useEffect(() => {
    if (pathname !== HOME_ROUTE) {
      setActiveSection(null);
      return;
    }

    const sections = navSections
      .filter((section) => section.kind === "home-anchor")
      .map((section) => document.getElementById(section.href.split("#")[1]))
      .filter((section): section is HTMLElement => section instanceof HTMLElement);

    if (!sections.length || !("IntersectionObserver" in window)) return;

    const visible = new Set<HTMLElement>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target as HTMLElement);
          else visible.delete(entry.target as HTMLElement);
        }

        const current = sections.find((section) => visible.has(section));
        if (current) setActiveSection(current.id);
      },
      { rootMargin: "-25% 0px -60% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [pathname]);

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
        <Link className={styles.mark} href={`${HOME_ROUTE}#top`}>
          {site.name}
          <span className={styles.markRole}>{site.kind}</span>
        </Link>

        <div className={styles.modeSwitch} role="group" aria-label="Visual mode">
          <span className={styles.modeLabel}>Mode</span>
          {(["glam", "grind"] as const).map((option) => (
            <button
              key={option}
              type="button"
              className={styles.modeButton}
              aria-pressed={mode === option}
              onClick={() => setMode(option)}
            >
              {option === "glam" ? "Glam" : "Grind"}
            </button>
          ))}
        </div>

        {/* The breakpoint hides this whole landmark, not just its list. Hiding
            only the <ul> would leave an empty "Sections" navigation landmark
            announced on every phone. */}
        <nav className={styles.desktopNav} aria-label="Sections">
          <ul className={styles.links}>
            {navSections.map((section) => {
              const sectionId =
                section.kind === "home-anchor" ? section.href.split("#")[1] : null;

              return (
                <li key={section.href}>
                  <Link
                    href={section.href}
                    aria-current={
                      sectionId && activeSection === sectionId ? "location" : undefined
                    }
                    onClick={() => {
                      if (sectionId) setActiveSection(sectionId);
                    }}
                  >
                    {section.label}
                  </Link>
                </li>
              );
            })}
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
            {navSections.map((section) => {
              const sectionId =
                section.kind === "home-anchor" ? section.href.split("#")[1] : null;

              return (
                <li key={section.href}>
                  <Link
                    href={section.href}
                    aria-current={
                      sectionId && activeSection === sectionId ? "location" : undefined
                    }
                    onClick={() => {
                      if (sectionId) setActiveSection(sectionId);
                      close(false);
                    }}
                  >
                    {section.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className={styles.panelMode} role="group" aria-label="Visual mode">
            <span>Mode</span>
            {(["glam", "grind"] as const).map((option) => (
              <button
                key={option}
                type="button"
                aria-pressed={mode === option}
                onClick={() => setMode(option)}
              >
                {option === "glam" ? "Glam" : "Grind"}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
