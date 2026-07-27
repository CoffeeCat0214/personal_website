"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import styles from "./SakuraPixelTransition.module.css";

type Particle = {
  fromX: number;
  fromY: number;
  driftX: number;
  driftY: number;
  targetX: number;
  targetY: number;
  size: number;
  rotation: number;
  color: string;
};

const SAMPLE_STEP = 5;
const MAX_PARTICLES = 260;

function mix(from: number, to: number, amount: number) {
  return from + (to - from) * amount;
}

export function SakuraPixelTransition({ children }: { children: ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    const heading = document.querySelector<HTMLElement>(
      '[data-transition-target="cremeai"]'
    );
    if (!container || !canvas || !heading) return;

    let frame = 0;
    let disposed = false;
    let started = false;
    let particles: Particle[] = [];
    let context: CanvasRenderingContext2D | null = null;
    let width = 0;
    let height = 0;
    let pixelRatio = 1;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const resize = () => {
      width = Math.max(1, container.clientWidth);
      height = Math.max(1, container.clientHeight);
      pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * pixelRatio);
      canvas.height = Math.floor(height * pixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context?.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    };

    const buildParticles = () => {
      if (!context) return;

      const computed = window.getComputedStyle(heading);
      const fontSize = Number.parseFloat(computed.fontSize) || 48;
      const font = `${computed.fontWeight} ${fontSize}px ${computed.fontFamily}`;
      const targetCanvas = document.createElement("canvas");
      const targetContext = targetCanvas.getContext("2d");
      if (!targetContext) return;

      targetContext.font = font;
      const label = heading.textContent?.trim() || "CrèmeAI";
      const measuredWidth = targetContext.measureText(label).width;
      const scale = Math.min(1, (width - 48) / Math.max(measuredWidth, 1));
      const targetFontSize = fontSize * scale;
      targetContext.font = `${computed.fontWeight} ${targetFontSize}px ${computed.fontFamily}`;
      const targetWidth = targetContext.measureText(label).width;
      targetCanvas.width = Math.ceil(targetWidth + SAMPLE_STEP * 2);
      targetCanvas.height = Math.ceil(targetFontSize * 1.25);
      targetContext.font = `${computed.fontWeight} ${targetFontSize}px ${computed.fontFamily}`;
      targetContext.fillStyle = "#ffffff";
      targetContext.textBaseline = "middle";
      targetContext.fillText(label, SAMPLE_STEP, targetCanvas.height / 2);

      const image = targetContext.getImageData(0, 0, targetCanvas.width, targetCanvas.height);
      const targetRect = heading.getBoundingClientRect();
      const stageRect = container.getBoundingClientRect();
      const targetOriginX = targetRect.left - stageRect.left + (targetRect.width - targetWidth) / 2;
      const targetOriginY = targetRect.top - stageRect.top + (targetRect.height - targetCanvas.height) / 2;
      const points: Array<{ x: number; y: number }> = [];
      for (let y = 0; y < targetCanvas.height; y += SAMPLE_STEP) {
        for (let x = 0; x < targetCanvas.width; x += SAMPLE_STEP) {
          if (image.data[(y * targetCanvas.width + x) * 4 + 3] > 90) {
            points.push({
              x: targetOriginX + x,
              y: targetOriginY + y,
            });
          }
        }
      }

      const stride = Math.max(1, Math.ceil(points.length / MAX_PARTICLES));
      const grind = document.documentElement.dataset.mode === "grind";
      particles = points.filter((_, index) => index % stride === 0).map((point, index) => ({
        fromX: Math.random() * width,
        fromY: -10 + Math.random() * height * 0.5,
        driftX: (Math.random() - 0.5) * width * 0.6,
        driftY: height * (0.2 + Math.random() * 0.28),
        targetX: point.x,
        targetY: point.y,
        size: grind ? 3 + (index % 3) : 5 + (index % 4),
        rotation: Math.random() * Math.PI,
        color: grind ? (index % 4 === 0 ? "#e8734a" : "#b8eb96") : (index % 4 === 0 ? "#e8734a" : "#f4c2da"),
      }));
    };

    const draw = (progress: number) => {
      if (!context) return;
      context.clearRect(0, 0, width, height);
      const petalPhase = Math.min(progress / 0.38, 1);
      const pixelPhase = Math.max(0, Math.min((progress - 0.28) / 0.72, 1));
      const grind = document.documentElement.dataset.mode === "grind";

      for (const particle of particles) {
        const driftX = particle.fromX + particle.driftX * petalPhase;
        const driftY = particle.fromY + particle.driftY * petalPhase;
        const x = mix(driftX, particle.targetX, pixelPhase);
        const y = mix(driftY, particle.targetY, pixelPhase);
        const size = mix(particle.size, grind ? 3 : 4, pixelPhase);
        context.save();
        context.translate(x, y);
        context.rotate(particle.rotation + (1 - pixelPhase) * 0.8);
        context.fillStyle = particle.color;
        context.globalAlpha = 0.86;
        if (!grind && pixelPhase < 0.7) {
          context.beginPath();
          context.ellipse(0, 0, size * 0.55, size, 0.35, 0, Math.PI * 2);
          context.fill();
        } else {
          context.fillRect(-size / 2, -size / 2, size, size);
        }
        context.restore();
      }
    };

    const start = async () => {
      if (started || disposed) return;
      started = true;
      await document.fonts?.ready;
      if (disposed) return;
      resize();
      context = canvas.getContext("2d");
      if (!context) return;
      buildParticles();
      container.dataset.state = "ready";

      if (reducedMotion) {
        container.dataset.state = "reduced";
        heading.classList.add(styles.reducedHeading);
        window.requestAnimationFrame(() => {
          if (!disposed) heading.classList.add(styles.reducedHeadingVisible);
        });
        return;
      }

      const startedAt = performance.now();
      const duration = document.documentElement.dataset.mode === "grind" ? 2400 : 3400;
      const render = (now: number) => {
        const progress = Math.min((now - startedAt) / duration, 1);
        draw(progress * progress * (3 - 2 * progress));
        if (progress < 1 && !disposed) frame = requestAnimationFrame(render);
        else {
          cancelAnimationFrame(frame);
          frame = 0;
          container.dataset.state = "complete";
        }
      };
      frame = requestAnimationFrame(render);
    };

    let observer: IntersectionObserver | null = null;
    if ("IntersectionObserver" in window) {
      observer = new IntersectionObserver((entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          observer?.disconnect();
          void start();
        }
      }, { rootMargin: "0px 0px -15% 0px", threshold: 0 });
    }

    const onResize = () => {
      resize();
      if (context) buildParticles();
    };

    window.addEventListener("resize", onResize);
    if (observer) observer.observe(container);
    else void start();

    return () => {
      disposed = true;
      observer?.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
      heading.classList.remove(styles.reducedHeading, styles.reducedHeadingVisible);
      context?.clearRect(0, 0, width, height);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={styles.transition}
      data-transition="sakura-pixel"
    >
      <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />
      <div className={styles.content}>{children}</div>
    </div>
  );
}
