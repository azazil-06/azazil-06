import { motion } from "framer-motion";
import { EASE } from "../lib/motion";
import ScrambleText from "./ScrambleText";

/**
 * Hero: typography is the visual. "ARJUN" uses a slot-machine scramble
 * that flashes random glyphs then locks each letter left-to-right.
 * The effect re-triggers every time the section scrolls into view.
 */

export default function Hero() {
  return (
    <section
      id="top"
      className="relative z-10 mx-auto max-w-[1400px] px-6 pb-16 pt-28 md:px-10 md:pb-24 md:pt-36"
    >
      {/* Blueprint eyebrow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, ease: EASE }}
        className="mb-10 flex items-center justify-between border-b border-rule pb-3"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
          Portfolio / Rev. 2026
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-accent">
          Kerala, IN
        </span>
      </motion.div>

      <h1 className="flex font-display text-[22vw] font-semibold uppercase leading-[0.82] tracking-[-0.04em] md:text-[17vw]">
        <span className="text-accent">
          <ScrambleText text="A" scrambleDuration={800} staggerMs={150} />
        </span>
        <ScrambleText text="RJUN" scrambleDuration={950} staggerMs={150} />
      </h1>

      <div className="mt-8 grid grid-cols-4 gap-6 border-t border-rule pt-5 md:grid-cols-12">
        <p
          className="col-span-4 font-mono text-xs uppercase leading-relaxed tracking-[0.14em] md:col-span-6 md:text-sm"
        >
          <ScrambleText
            text="Developer & Maker — Building Games, Robots, IoT & Prototyping Full-Stack Tools."
            scrambleDuration={400}
            staggerMs={18}
          />
        </p>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: EASE, delay: 0.6 }}
          className="col-span-4 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground md:col-span-3 md:col-start-10 md:text-right"
        >
          Fig. 01 — Index
        </motion.p>
      </div>

      {/* Scroll cue */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.8 }}
        className="mt-16 inline-flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em]"
      >
        Scroll
        <motion.span
          aria-hidden="true"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="text-accent"
        >
          ↓
        </motion.span>
      </motion.a>
    </section>
  );
}
