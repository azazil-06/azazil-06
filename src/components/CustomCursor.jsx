import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [label, setLabel] = useState("");
  // Start visible true, let mousemove naturally track
  const [visible, setVisible] = useState(true);

  // Use framer-motion values for smooth tracking
  const mouseX = useMotionValue(typeof window !== "undefined" ? window.innerWidth / 2 : 0);
  const mouseY = useMotionValue(typeof window !== "undefined" ? window.innerHeight / 2 : 0);

  // Smooth springs for the outer ring
  const ringX = useSpring(mouseX, { stiffness: 150, damping: 25, mass: 0.5 });
  const ringY = useSpring(mouseY, { stiffness: 150, damping: 25, mass: 0.5 });

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.innerWidth < 768) return;

    // Hide default cursor
    document.documentElement.style.cursor = "none";

    const onMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const onLeave = (e) => {
      if (
        e.clientY <= 0 ||
        e.clientX <= 0 ||
        e.clientX >= window.innerWidth ||
        e.clientY >= window.innerHeight
      ) {
        setVisible(false);
      }
    };
    
    const onEnter = () => setVisible(true);

    const onOver = (e) => {
      const el = e.target.closest("a, button, [role='button'], .cursor-pointer, .group");
      if (el) {
        setIsHovering(true);
        const ariaLabel = el.getAttribute("aria-label") || "";
        if (ariaLabel.includes("GitHub") || el.closest("[class*='project']")) {
          setLabel("View");
        } else {
          setLabel("");
        }
      }
    };

    const onOut = (e) => {
      const el = e.target.closest("a, button, [role='button'], .cursor-pointer, .group");
      if (el) {
        setIsHovering(false);
        setLabel("");
      }
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    return () => {
      document.documentElement.style.cursor = "";
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
    };
  }, [visible, mouseX, mouseY]);

  if (typeof window !== "undefined" && window.innerWidth < 768) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0"
      style={{ zIndex: 9999, opacity: visible ? 1 : 0, transition: "opacity 0.2s" }}
    >
      {/* Inner Dot */}
      <motion.div
        style={{
          position: "fixed",
          top: -3,
          left: -3,
          x: mouseX,
          y: mouseY,
          width: isHovering ? 4 : 6,
          height: isHovering ? 4 : 6,
          borderRadius: "50%",
          backgroundColor: "var(--accent)",
        }}
        animate={{
          width: isHovering ? 4 : 6,
          height: isHovering ? 4 : 6,
          top: isHovering ? -2 : -3,
          left: isHovering ? -2 : -3,
        }}
        transition={{ type: "tween", duration: 0.2 }}
      />
      {/* Outer Ring */}
      <motion.div
        style={{
          position: "fixed",
          top: -18,
          left: -18,
          x: ringX,
          y: ringY,
          width: 36,
          height: 36,
          borderRadius: "50%",
          border: "1.5px solid var(--ink)",
          opacity: label ? 0 : 0.5,
        }}
        animate={{
          scale: isHovering ? 2.2 : 1,
          opacity: label ? 0 : 0.5,
        }}
        transition={{ type: "tween", duration: 0.2 }}
      />
      {/* Label (e.g., "View") */}
      {label && (
        <motion.div
          style={{
            position: "fixed",
            top: -36,
            left: -36,
            x: ringX,
            y: ringY,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 72,
            height: 72,
            borderRadius: "50%",
            backgroundColor: "var(--ink)",
            color: "var(--background)",
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.12em",
          }}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {label}
        </motion.div>
      )}
    </div>
  );
}
