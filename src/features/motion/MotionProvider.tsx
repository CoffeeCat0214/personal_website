"use client";

import { useEffect } from "react";
import { startScrollMotion } from "./scroll-motion";

export function MotionProvider() {
  useEffect(() => {
    return startScrollMotion();
  }, []);

  return null;
}
