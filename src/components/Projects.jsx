import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading.jsx";
import { fadeUp, inView, staggerParent } from "../lib/motion";

/**
 * Projects: two hard-edged project rows. Hover reveals a clip-path wipe + drawn underline.
 */
const GROUPS = [
  {
    numeral: "03.1",
    title: "Selected Work",
    projects: [
      {
        n: "01",
        title: "NextCore",
        desc: "Edge-First Multi-Agent Clinical Intelligence & Emergency Decision-Support Platform",
        tags: ["Vite+React", "Node.js", "LanceDB","SQLite"],
        href: "https://github.com/azazil-06/NextCare.git",
      },
       {
      n: "02",
      title: "Bipedal Robo",
      desc: "Rocky — A BLE-Controlled Bipedal Robot",
      tags: ["Esp32","I2C Oled", "SG90","MT3608", "Arduino IDE (cpp)",],
      href: "https://github.com/azazil-06/Bipedal-Robot-esp32c3-.git",
    },
    {
      n: "03",
      title: "Adventure Game",
      desc: "An RPG game created using UNITY",
      tags: ["Unity","Blender","Krita", "C#"],
      href:"https://github.com/azazil-06/Adventure-Game.git",
    },
    {
      n:"04",
      title:"Aseprite Local Stable Diffusion for low spec devices",
      desc:"An extension for Aseprite that uses Stable Diffusion to generate pixel art",
      tags:["Python","Aseprite","Stable Diffusion"],
      href:"https://github.com/azazil-06/Aseprite-Local-Stable-Diffusion-for-low-spec-devices-Ongoing-.git",
    },
    {
      n:"05",
      title:"GestureLite",
      desc:"Gesture recognition based electrical switch",
      tags:["Python","OpenCV","MediaPipe","Arduino"],
      href:"https://github.com/azazil-06/Phalanx-Vectorized-Bio-Kinetic-Optoelectronic-Modulation-System.git",
    }
    
    ],
  },
];

function ProjectCard({ p }) {
  const Wrapper = p.href ? "a" : "div";
  const linkProps = p.href ? { href: p.href, target: "_blank", rel: "noopener noreferrer" } : {};

  return (
    <motion.article variants={fadeUp} className="border-b border-rule">
      <Wrapper
        {...linkProps}
        className="group relative block overflow-hidden py-6 md:py-8"
        aria-label={p.href ? `${p.title} — open GitHub repository in a new tab` : p.title}
      >
        {/* Border/fill reveal: a paper-tinted panel wipes in from the left on hover. */}
        <span
          aria-hidden="true"
          className="absolute inset-0 origin-left scale-x-0 bg-ink-wash transition-transform duration-300 ease-out group-hover:scale-x-100"
        />
        <div className="relative grid grid-cols-4 items-start gap-x-6 md:grid-cols-12">
          <span className="col-span-1 font-mono text-[10px] text-accent md:col-span-1">{p.n}</span>
          <div className="col-span-3 md:col-span-6">
            <h4 className="relative inline-block font-display text-xl uppercase tracking-tight md:text-3xl">
              {p.title}
              {/* Drawn underline */}
              <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-300 ease-out group-hover:scale-x-100" />
            </h4>
            <p className="mt-2 max-w-prose text-sm leading-relaxed text-muted-foreground">
              {p.desc}
            </p>
          </div>
          <ul className="col-span-4 mt-4 flex flex-wrap gap-x-3 gap-y-1 md:col-span-4 md:col-start-8 md:mt-0 md:justify-end">
            {p.tags.map((t) => (
              <li
                key={t}
                className="border border-rule px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em]"
              >
                {t}
              </li>
            ))}
            {p.href ? (
              <li className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent">
                GitHub ↗
              </li>
            ) : null}
          </ul>
        </div>
      </Wrapper>
    </motion.article>
  );
}

export default function Projects() {
  return (
    <section id="work" className="relative z-10 mx-auto max-w-[1400px] px-6 py-20 md:px-10 md:py-28">
      <motion.div
        variants={staggerParent}
        initial="hidden"
        whileInView="show"
        viewport={inView}
        className="grid grid-cols-4 gap-x-6 md:grid-cols-12"
      >
        <SectionHeading numeral="03" title="Selected Work" tag="Fig. 04 — Index of Builds" />
      </motion.div>

      {GROUPS.map((g) => (
        <motion.div
          key={g.numeral}
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="mt-12"
        >
          <motion.div
            variants={fadeUp}
            className="flex items-baseline gap-4 border-t border-ink pt-3"
          >
            <span className="font-mono text-xs text-accent">{g.numeral}</span>
            <h3 className="font-mono text-xs uppercase tracking-[0.24em]">{g.title}</h3>
          </motion.div>
          {g.projects.map((p) => (
            <ProjectCard key={p.n} p={p} />
          ))}
        </motion.div>
      ))}
    </section>
  );
}
