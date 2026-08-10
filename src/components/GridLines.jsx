import { motion } from "framer-motion";
import { EASE } from "../lib/motion";

/**
 * Fixed 1px modular grid overlay — a visible design element, not a debug tool.
 * 12 columns on desktop, 4 on mobile. Lines "draw in" downward on load.
 */
export default function GridLines() {
  const columns = 12;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0">
      <div className="mx-auto h-full max-w-[1400px] px-6 md:px-10">
        <div className="grid h-full grid-cols-4 md:grid-cols-12">
          {Array.from({ length: columns }).map((_, i) => (
            <motion.div
              key={i}
              className={`h-full border-l border-rule ${i >= 4 ? "hidden md:block" : ""}`}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              style={{ transformOrigin: "top" }}
              // Each line draws in slightly after the previous one.
              transition={{ duration: 0.5, ease: EASE, delay: 0.05 * i }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
