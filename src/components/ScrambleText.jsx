import { useRef, useState, useEffect, useCallback } from "react";

/**
 * ScrambleText — smooth "slot machine" text reveal.
 *
 * Characters swap at a readable pace (shuffleSpeed), then lock
 * left-to-right.  Uses rAF for smooth timing without layout thrash.
 *
 * Props:
 *   text            – the target string
 *   className       – forwarded to the wrapping <span>
 *   scrambleDuration – ms the scramble runs before the first char locks
 *   staggerMs       – ms between each successive character locking
 *   shuffleSpeed    – ms between random character swaps (higher = slower shuffle)
 */

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

export default function ScrambleText({
  text,
  className = "",
  scrambleDuration = 600,
  staggerMs = 80,
  shuffleSpeed = 70,
}) {
  const containerRef = useRef(null);
  const [display, setDisplay] = useState(text);
  const animRef = useRef(null);

  const randomChar = useCallback(
    () => CHARS[Math.floor(Math.random() * CHARS.length)],
    [],
  );

  const runScramble = useCallback(() => {
    if (animRef.current) cancelAnimationFrame(animRef.current);

    const target = text.split("");
    const len = target.length;
    const startTime = performance.now();
    let lastShuffle = 0;

    // Each character locks after: scrambleDuration + (index * staggerMs)
    const lockTimes = target.map((_, i) => scrambleDuration + i * staggerMs);
    const totalDuration = lockTimes[len - 1] + 60;

    // Pre-generate an initial random frame
    let currentRandom = target.map((ch) =>
      ch === " " || ch === "—" ? ch : randomChar(),
    );

    const tick = (now) => {
      const elapsed = now - startTime;

      // Only swap random chars every `shuffleSpeed` ms
      if (now - lastShuffle >= shuffleSpeed) {
        lastShuffle = now;
        currentRandom = target.map((ch) =>
          ch === " " || ch === "—" ? ch : randomChar(),
        );
      }

      // Build display: locked chars use target, others use currentRandom
      const chars = [];
      let allLocked = true;

      for (let i = 0; i < len; i++) {
        if (target[i] === " " || target[i] === "—") {
          chars.push(target[i]);
        } else if (elapsed >= lockTimes[i]) {
          chars.push(target[i]);
        } else {
          allLocked = false;
          chars.push(currentRandom[i]);
        }
      }

      setDisplay(chars.join(""));

      if (elapsed < totalDuration && !allLocked) {
        animRef.current = requestAnimationFrame(tick);
      } else {
        setDisplay(text);
        animRef.current = null;
      }
    };

    animRef.current = requestAnimationFrame(tick);
  }, [text, scrambleDuration, staggerMs, shuffleSpeed, randomChar]);

  /* ── Intersection Observer: re-trigger on every scroll-in ── */
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          runScramble();
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [runScramble]);

  return (
    <span ref={containerRef} className={className} aria-label={text}>
      {display}
    </span>
  );
}
