import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading.jsx";
import Stats from "./Stats.jsx";
import { fadeUp, inView, staggerParent } from "../lib/motion";

/**
 * About: short bio plus a grid-list of focus areas.
 */
const FOCUS = ["Game Dev", "Robotics & Hardware", "Creative AI Tooling", "Full-Stack Development"];

export default function About() {
  return (
    <motion.section
      id="about"
      variants={staggerParent}
      initial="hidden"
      whileInView="show"
      viewport={inView}
      className="relative z-10 mx-auto grid max-w-[1400px] grid-cols-4 gap-x-6 px-6 py-20 md:grid-cols-12 md:px-10 md:py-28"
    >
      <SectionHeading numeral="01" title="About" tag="Fig. 02 — Profile" />

      <motion.p
        variants={fadeUp}
        className="col-span-4 text-lg leading-snug md:col-span-6 md:col-start-3 md:text-2xl"
      >
        Developer and maker from Kerala, India — building games, robots, creative AI tooling and
        full-stack projects.
      </motion.p>

      <motion.p
        variants={fadeUp}
        className="col-span-4 mt-6 max-w-prose text-sm leading-relaxed text-muted-foreground md:col-span-5 md:col-start-3 md:text-base"
      >
        I work across the stack: from low-level hardware and game mechanics to AI-integrated web
        apps. The interesting part is making constrained systems feel responsive and honest.
      </motion.p>

      <motion.ul
        variants={staggerParent}
        className="col-span-4 mt-12 grid grid-cols-4 border-t border-rule md:col-span-12 md:grid-cols-12"
      >
        {FOCUS.map((item, i) => (
          <motion.li
            key={item}
            variants={fadeUp}
            className="col-span-4 flex items-baseline gap-4 border-b border-rule py-5 md:col-span-3 md:border-r md:last:border-r-0"
          >
            <span className="font-mono text-[10px] text-accent">0{i + 1}</span>
            <span className="font-display text-base uppercase tracking-tight md:text-lg">
              {item}
            </span>
          </motion.li>
        ))}
      </motion.ul>

      <Stats />
    </motion.section>
  );
}
