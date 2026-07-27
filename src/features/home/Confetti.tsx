"use client";

import { useEffect, useRef } from "react";
import styles from "./Confetti.module.css";

const COLORS = ["#1e2b16", "#e8734a", "#9a95dd", "#b8eb96", "#f4c2da"];
const PIECE_COUNT = 96;
const LIFETIME = 2400;

type Piece = {
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  rotationSpeed: number;
  velocityX: number;
  velocityY: number;
  gravity: number;
  drag: number;
  color: string;
  shape: "bar" | "diamond" | "square";
};

export function Confetti() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const context = canvas.getContext("2d");
    if (!context) return;

    let frame = 0;
    let pixelRatio = 1;
    const startedAt = performance.now();
    const pieces: Piece[] = [];

    const resize = () => {
      pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(window.innerWidth * pixelRatio);
      canvas.height = Math.floor(window.innerHeight * pixelRatio);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    for (let index = 0; index < PIECE_COUNT; index += 1) {
      pieces.push({
        x: window.innerWidth * (0.02 + Math.random() * 0.96),
        y: -40 - Math.random() * 180,
        width: 6 + Math.random() * 10,
        height: 10 + Math.random() * 16,
        rotation: Math.random() * Math.PI,
        rotationSpeed: (Math.random() - 0.5) * 0.24,
        velocityX: (Math.random() - 0.5) * 1.8,
        velocityY: 1.2 + Math.random() * 2.5,
        gravity: 0.035 + Math.random() * 0.025,
        drag: 0.995 + Math.random() * 0.002,
        color: COLORS[index % COLORS.length],
        shape: index % 5 === 0 ? "diamond" : index % 3 === 0 ? "square" : "bar",
      });
    }

    const render = (now: number) => {
      const elapsed = now - startedAt;
      context.clearRect(0, 0, window.innerWidth, window.innerHeight);

      for (const piece of pieces) {
        piece.velocityY += piece.gravity;
        piece.velocityX *= piece.drag;
        piece.x += piece.velocityX;
        piece.y += piece.velocityY;
        piece.rotation += piece.rotationSpeed;

        context.save();
        context.translate(piece.x, piece.y);
        context.rotate(piece.rotation);
        context.fillStyle = piece.color;
        if (piece.shape === "diamond") {
          context.beginPath();
          context.moveTo(0, -piece.height / 2);
          context.lineTo(piece.width / 2, 0);
          context.lineTo(0, piece.height / 2);
          context.lineTo(-piece.width / 2, 0);
          context.closePath();
          context.fill();
        } else if (piece.shape === "square") {
          const size = Math.min(piece.width, piece.height);
          context.fillRect(-size / 2, -size / 2, size, size);
        } else {
          context.fillRect(-piece.width / 2, -piece.height / 2, piece.width, piece.height);
        }
        context.restore();
      }

      if (elapsed < LIFETIME) {
        frame = requestAnimationFrame(render);
      } else {
        context.clearRect(0, 0, window.innerWidth, window.innerHeight);
      }
    };

    frame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.confetti} aria-hidden="true" />;
}
