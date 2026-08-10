import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading.jsx";
import { fadeUp, inView, staggerParent, EASE } from "../lib/motion";

/**
 * Skills: grouped stack lists, rendered as static wrap lists
 * with a staggered entrance and a smooth hover animation.
 */
const GROUPS = [
  { label: "Languages", items: ["JavaScript", "Python", "C#", "C++", "Java", "C", "Dart"] },
  { label: "Frontend", items: ["Vite+React", "Nextjs", "Tailwind CSS", "Flutter"] },
  {
    label: "Backend / AI",
    items: ["FastAPI", "Django", "Node.js", "Langchain", "n8n", "Relevance AI"],
  },
  { label: "Game / Creative", items: ["Unity Junior Developer", "Blender 3D Artist & Rigger", "Krita Artist"] },
  { label: "Hardware", items: ["Bipedal Robo", "Build Custom Library For Oled Displays"] },
];

const itemVariant = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE } },
};

function SkillList({ items }) {
  return (
    <motion.div
      variants={{ show: { transition: { staggerChildren: 0.05 } } }}
      className="flex flex-wrap gap-3 mt-4"
    >
      {items.map((item, i) => (
        <motion.span
          key={`${item}-${i}`}
          variants={itemVariant}
          whileHover={{ scale: 1.05, y: -2 }}
          className="inline-flex cursor-default items-center rounded-full border border-rule bg-ink-wash/50 px-4 py-2 font-sans text-sm font-medium tracking-tight text-foreground transition-colors hover:bg-rule md:text-base"
        >
          {item}
        </motion.span>
      ))}
    </motion.div>
  );
}

export default function Skills() {
  return (
    <motion.section
      id="stack"
      variants={staggerParent}
      initial="hidden"
      whileInView="show"
      viewport={inView}
      className="relative z-10 mx-auto max-w-[1400px] px-6 py-20 md:px-10 md:py-28"
    >
      <div className="grid grid-cols-4 gap-x-6 md:grid-cols-12">
        <SectionHeading numeral="02" title="Stack" tag="Fig. 03 — Tooling" />
      </div>

      <div className="border-t border-rule mt-8">
        {GROUPS.map((g) => (
          <motion.div key={g.label} variants={fadeUp} className="border-b border-rule py-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
              {g.label}
            </p>
            <SkillList items={g.items} />
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
