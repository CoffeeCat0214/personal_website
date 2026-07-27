"use client";

import { useEffect, useState } from "react";
import styles from "./FocusTimer.module.css";

const MODES = [15, 25, 50] as const;

export function FocusTimer() {
  const [duration, setDuration] = useState(25 * 60);
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;

    const timer = window.setInterval(() => {
      setSecondsLeft((seconds) => {
        if (seconds <= 1) {
          setRunning(false);
          return 0;
        }
        return seconds - 1;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [running]);

  const setMode = (minutes: number) => {
    const nextDuration = minutes * 60;
    setDuration(nextDuration);
    setSecondsLeft(nextDuration);
    setRunning(false);
  };

  const reset = () => {
    setSecondsLeft(duration);
    setRunning(false);
  };

  const minutes = Math.floor(secondsLeft / 60).toString().padStart(2, "0");
  const seconds = (secondsLeft % 60).toString().padStart(2, "0");
  const progress = ((duration - secondsLeft) / duration) * 100;
  const status = secondsLeft === 0 ? "Complete" : running ? "In focus" : secondsLeft < duration ? "Paused" : "Ready";

  return (
    <section className={styles.timer} aria-labelledby="focus-timer-title" data-reveal>
      <div className={styles.timerHeader}>
        <p className={styles.label}>Try it / local demo</p>
        <span className={styles.status}>{status}</span>
      </div>
      <div className={styles.readout}>
        <p id="focus-timer-title">A little focus, right here.</p>
        <time dateTime={`PT${secondsLeft}S`} aria-label={`${minutes} minutes ${seconds} seconds remaining`}>
          {minutes}:{seconds}
        </time>
      </div>
      <div className={styles.progress} aria-hidden="true">
        <span style={{ width: `${progress}%` }} />
      </div>
      <div className={styles.controls}>
        <div className={styles.modes} aria-label="Timer length">
          {MODES.map((mode) => (
            <button
              key={mode}
              type="button"
              className={duration === mode * 60 ? styles.modeActive : undefined}
              aria-pressed={duration === mode * 60}
              onClick={() => setMode(mode)}
            >
              {mode}m
            </button>
          ))}
        </div>
        <div className={styles.actions}>
          <button type="button" onClick={() => setRunning((value) => !value)}>
            {running ? "Pause" : secondsLeft === 0 ? "Restart" : "Start focus"}
          </button>
          <button type="button" className={styles.reset} onClick={reset}>Reset</button>
        </div>
      </div>
      <p className={styles.note}>No account. No request leaves this browser.</p>
    </section>
  );
}
