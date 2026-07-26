"use client";

import { useEffect } from "react";
import { startRevealObserver } from "./reveal-observer";
import { startToneObserver } from "./tone-observer";

export function Reveal() {
  useEffect(() => {
    return startToneObserver();
  }, []);

  useEffect(() => {
    return startRevealObserver();
  }, []);

  return null;
}
