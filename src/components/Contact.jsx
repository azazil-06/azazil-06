import { motion } from "framer-motion";
import Magnetic from "./Magnetic.jsx";
import { fadeUp, inView, lineReveal, staggerParent } from "../lib/motion";

/**
 * Contact / footer: large closing typographic statement, magnetic links,
 * and small-print credit. Email and phone are placeholders to fill in.
 */
const LINES = ["LET'S BUILD", "SOMETHING"];

const LINKS = [
  { label: "GitHub", value: "See my projects?", href: "https://github.com/azazil-06" },
  { label: "LinkedIn", value: "Let's connect?", href: "https://www.linkedin.com/in/arjun-prasad-9139a1327/" },

  {
    label: "email",
    value: "Send me a message?",
    href: "https://mail.google.com/mail/?view=cm&fs=1&to=arjunprasadsa@gmail.com&su=Hi%20Arjun%20:)",
    target: "_blank",
    rel: "noopener noreferrer"
  },

  { label: "Instagram", value: "Follow Me?", href: "https://www.instagram.com/_arjuneyy?igsh=cjg5M250dmhuaTIz" },
];

export default function Contact() {
  return (
    <motion.footer
      id="contact"
      variants={staggerParent}
      initial="hidden"
      whileInView="show"
      viewport={inView}
      className="relative z-10 mx-auto max-w-[1400px] border-t border-ink px-6 py-20 md:px-10 md:py-28"
    >
      <motion.span
        variants={fadeUp}
        className="mb-8 block font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground"
      >
        04 / Contact — Fig. 05
      </motion.span>

      <h2 className="font-display text-[13vw] font-semibold uppercase leading-[0.85] tracking-[-0.04em] md:text-[11vw]">
        {LINES.map((line) => (
          <span key={line} className="block overflow-hidden">
            <motion.span variants={lineReveal} className={`block ${line === "SOMETHING" ? "text-accent" : ""}`}>
              {line}
            </motion.span>
          </span>
        ))}
      </h2>

      <motion.ul
        variants={staggerParent}
        className="mt-14 grid grid-cols-4 border-t border-rule md:grid-cols-12"
      >
        {LINKS.map((l) => (
          <motion.li
            key={l.label}
            variants={fadeUp}
            className="col-span-4 border-b border-rule py-4 md:col-span-3 md:border-r md:last:border-r-0"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
              {l.label}
            </p>
            {l.href ? (
              <Magnetic strength={0.2}>
                <a
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative mt-1 inline-block font-display text-base uppercase tracking-tight md:text-lg"
                >
                  {l.value}
                  <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-300 ease-out group-hover:scale-x-100" />
                </a>
              </Magnetic>
            ) : (
              <p className="mt-1 font-display text-base uppercase tracking-tight text-accent md:text-lg">
                {l.value}
              </p>
            )}
          </motion.li>
        ))}
      </motion.ul>

      <motion.div
        variants={fadeUp}
        className="mt-10 flex flex-col gap-1 font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground md:flex-row md:items-center md:justify-between"
      >
        <p>© {new Date().getFullYear()} Arjun. All rights reserved.</p>
        <p>Designed &amp; built by Arjun</p>
      </motion.div>
    </motion.footer>
  );
}
