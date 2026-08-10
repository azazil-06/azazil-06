import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import Magnetic from "./Magnetic.jsx";
import DarkModeToggle from "./DarkModeToggle.jsx";
import LiveTime from "./LiveTime.jsx";
import { EASE } from "../lib/motion";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet.tsx";

/**
 * Fixed top navigation. Links are magnetic on hover and use an
 * accent underline that draws in from the left.
 */
const LINKS = [
  { label: "Stats", href: "#stats", num: "01" },
  { label: "About", href: "#about", num: "02" },
  { label: "Stack", href: "#stack", num: "03" },
  { label: "Work", href: "#work", num: "04" },
  { label: "Contact", href: "#contact", num: "05" },
];

function useActiveSection() {
  const [active, setActive] = useState("");

  useEffect(() => {
    const ids = LINKS.map((l) => l.href.slice(1));
    const observers = [];

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActive(`#${id}`);
          }
        },
        { rootMargin: "-40% 0px -55% 0px" },
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return active;
}

export default function Nav() {
  const activeHref = useActiveSection();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: EASE, delay: 0.2 }}
      className="fixed inset-x-0 top-0 z-50 border-b border-rule bg-background/85 backdrop-blur-sm"
    >
       <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-3 md:px-10">
        <div className="flex items-center gap-6">
          <a href="#top" className="flex items-center gap-2 font-display text-sm lowercase tracking-[0.3em]">
            <img src="/favicon.ico" alt="Logo" className="w-5 h-5 animate-pulse" />
            <span>Arjun<span className="text-accent">.dev</span></span>
          </a>
          <LiveTime />
        </div>
        
        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-8">
          {LINKS.map((l) => {
            const isActive = activeHref === l.href;
            return (
              <li key={l.href}>
                <Magnetic strength={0.3}>
                  <a href={l.href} className="group flex items-baseline gap-1.5">
                    <span className={`hidden font-mono text-[10px] md:inline ${isActive ? "text-accent" : "text-accent"}`}>{l.num}</span>
                    <span className={`relative font-mono text-[11px] uppercase tracking-[0.18em] ${isActive ? "text-accent" : ""}`}>
                      {l.label}
                      <span
                        className={`absolute -bottom-1 left-0 h-px w-full origin-left bg-accent transition-transform duration-300 ease-out ${
                          isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                        }`}
                      />
                    </span>
                  </a>
                </Magnetic>
              </li>
            );
          })}
          <li>
            <DarkModeToggle />
          </li>
        </ul>

        {/* Mobile Navigation */}
        <div className="flex items-center gap-4 md:hidden">
          <DarkModeToggle />
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <button className="p-2 -mr-2 text-foreground/80 hover:text-foreground transition-colors cursor-pointer" aria-label="Menu">
                <Menu className="w-5 h-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:w-80 border-rule">
              <div className="flex flex-col gap-8 mt-12">
                <a href="#top" className="flex items-center gap-2 font-display text-sm lowercase tracking-[0.3em]" onClick={() => setIsOpen(false)}>
                  <img src="/favicon.ico" alt="Logo" className="w-5 h-5 animate-pulse" />
                  <span>Arjun<span className="text-accent">.dev</span></span>
                </a>
                <ul className="flex flex-col gap-6">
                  {LINKS.map((l) => {
                    const isActive = activeHref === l.href;
                    return (
                      <li key={l.href}>
                        <a href={l.href} onClick={() => setIsOpen(false)} className="group flex items-baseline gap-4">
                          <span className={`font-mono text-[12px] ${isActive ? "text-accent" : "text-accent"}`}>{l.num}</span>
                          <span className={`font-mono text-lg uppercase tracking-[0.15em] ${isActive ? "text-accent" : ""}`}>
                            {l.label}
                          </span>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.nav>
  );
}
