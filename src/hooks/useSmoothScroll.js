import { useEffect } from "react";

/**
 * Enables native smooth scrolling on the document (Lenis stand-in).
 * Disabled automatically when the user prefers reduced motion.
 */
export default function useSmoothScroll() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const root = document.documentElement;
    const prev = root.style.scrollBehavior;
    root.style.scrollBehavior = "smooth";
    return () => {
      root.style.scrollBehavior = prev;
    };
  }, []);
}
