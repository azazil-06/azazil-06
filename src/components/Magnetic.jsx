import { useRef, useState } from "react";
import { motion } from "framer-motion";

/**
 * Magnetic hover wrapper: the child shifts slightly toward the cursor.
 * Skipped entirely when the user prefers reduced motion or on touch/small screens.
 */
export default function Magnetic({ children, strength = 0.25, className = "" }) {
  const ref = useRef(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMove = (e) => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.innerWidth < 768) return; // cheaper motion on mobile
    const rect = ref.current.getBoundingClientRect();
    // Distance from element center, damped by `strength`.
    setOffset({
      x: (e.clientX - (rect.left + rect.width / 2)) * strength,
      y: (e.clientY - (rect.top + rect.height / 2)) * strength,
    });
  };

  return (
    <motion.div
      ref={ref}
      className={`inline-block ${className}`}
      onMouseMove={handleMove}
      onMouseLeave={() => setOffset({ x: 0, y: 0 })}
      animate={offset}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
