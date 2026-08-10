import { motion } from "framer-motion";
import { fadeUp } from "../lib/motion";

/**
 * Oversized section numeral + label used as a grid anchor for every section.
 */
export default function SectionHeading({ numeral, title, tag }) {
  return (
    <motion.header
      variants={fadeUp}
      className="col-span-4 mb-10 grid grid-cols-4 items-end gap-x-6 border-t border-rule pt-4 md:col-span-12 md:grid-cols-12"
    >
      <div className="col-span-1 md:col-span-2">
        <span className="block font-display text-5xl leading-none text-accent md:text-7xl">
          {numeral}
        </span>
      </div>
      <div className="col-span-3 md:col-span-7">
        <h2 className="font-display text-2xl uppercase tracking-tight md:text-4xl">{title}</h2>
      </div>
      {tag ? (
        <div className="col-span-4 md:col-span-3 md:text-right">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            {tag}
          </span>
        </div>
      ) : null}
    </motion.header>
  );
}
