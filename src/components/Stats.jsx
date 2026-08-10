import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { fadeUp, staggerParent } from "../lib/motion";

/**
 * Small stats strip with numerals that count up when scrolled into view.
 */
const STATS = [
  { value: 2, label: "Featured Projects", suffix: "" },
  { value: 6, label: "Languages Used", suffix: "" },
  { value: 4, label: "Focus Areas", suffix: "" },
  { value: 2026, label: "Revision", suffix: "" },
];

function Counter({ to }) {
  const ref = useRef(null);
  const visible = useInView(ref, { once: true, amount: 0.5 });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!visible) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(to);
      return;
    }
    // Simple rAF ramp over ~500ms with an easeOut curve.
    const start = performance.now();
    const duration = 500;
    let frame;
    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1);
      setValue(Math.round(to * (1 - Math.pow(1 - t, 3))));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [visible, to]);

  return (
    <span ref={ref} className="font-display text-4xl leading-none md:text-6xl">
      {value}
    </span>
  );
}

export default function Stats() {
  return (
    <motion.div
      variants={staggerParent}
      className="col-span-4 mt-16 grid grid-cols-4 gap-y-8 border-b border-t border-rule py-8 md:col-span-12 md:grid-cols-12"
    >
      {STATS.map((s) => (
        <motion.div key={s.label} variants={fadeUp} className="col-span-2 md:col-span-3">
          <Counter to={s.value} />
          <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            {s.label}
          </p>
        </motion.div>
      ))}
    </motion.div>
  );
}
