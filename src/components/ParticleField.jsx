import { useRef, useEffect } from "react";

/**
 * ParticleField — a full-page canvas of tiny confetti-like particles
 * that drift gently and get repelled by the mouse cursor.
 *
 * • Fixed behind all content (z-index 0, pointer-events none).
 * • Particles drift slowly, then spring back to their home position.
 * • On mouse proximity they push away with a smooth falloff.
 * • Skipped on mobile / prefers-reduced-motion for perf.
 */

const PARTICLE_COUNT = 220;
const PARTICLE_SIZE = 2.8;
const REPEL_RADIUS = 140;
const REPEL_STRENGTH = 70;
const RETURN_SPEED = 0.05;
const DRIFT_SPEED = 0.14;

export default function ParticleField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Skip on small screens or reduced-motion preference
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.innerWidth < 768) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let w = 0;
    let h = 0;
    let animId;
    const mouse = { x: -9999, y: -9999 };

    // Read color tokens from CSS vars
    const style = getComputedStyle(document.documentElement);
    const ink = style.getPropertyValue("--ink")?.trim() || "#1a1a1a";
    const accent = style.getPropertyValue("--accent")?.trim() || "#c94c2b";
    const palette = [accent, ink, "#f5c542", "#5ac8fa", "#8b5cf6"];

    // ── Resize handler ──
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      w = window.innerWidth;
      h = document.documentElement.scrollHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    // Re-measure height when DOM changes (sections load, etc.)
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(document.documentElement);

    // ── Create confetti-like particles ──
    const particles = Array.from({ length: PARTICLE_COUNT }, () => {
      const homeX = Math.random() * w;
      const homeY = Math.random() * h;
      return {
        homeX,
        homeY,
        x: homeX,
        y: homeY,
        driftPhase: Math.random() * Math.PI * 2,
        driftAmplitude: 10 + Math.random() * 14,
        opacity: 0.16 + Math.random() * 0.24,
        size: PARTICLE_SIZE + Math.random() * 2.6,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        color: palette[Math.floor(Math.random() * palette.length)],
        shape: Math.random() < 0.5 ? "rect" : Math.random() < 0.8 ? "circle" : "triangle",
      };
    });

    // ── Mouse tracking (relative to page, not viewport) ──
    const onMouseMove = (e) => {
      mouse.x = e.pageX;
      mouse.y = e.pageY;
    };
    const onMouseLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };
    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);

    // ── Animation loop ──
    let time = 0;
    const loop = () => {
      time += 0.01;
      ctx.clearRect(0, 0, w, h);

      for (const particle of particles) {
        // Gentle drift around home
        const driftX = Math.sin(time + particle.driftPhase) * DRIFT_SPEED * particle.driftAmplitude;
        const driftY = Math.cos(time * 0.7 + particle.driftPhase) * DRIFT_SPEED * particle.driftAmplitude;
        const targetX = particle.homeX + driftX;
        const targetY = particle.homeY + driftY;

        // Mouse repulsion
        const dx = particle.x - mouse.x;
        const dy = particle.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        let repelX = 0;
        let repelY = 0;

        if (dist < REPEL_RADIUS && dist > 0) {
          const force = (1 - dist / REPEL_RADIUS) * REPEL_STRENGTH;
          repelX = (dx / dist) * force;
          repelY = (dy / dist) * force;
        }

        // Ease toward target + repulsion offset
        particle.x += (targetX + repelX - particle.x) * RETURN_SPEED;
        particle.y += (targetY + repelY - particle.y) * RETURN_SPEED;
        particle.rotation += particle.rotationSpeed;

        ctx.save();
        ctx.translate(particle.x, particle.y);
        ctx.rotate(particle.rotation);
        ctx.globalAlpha = particle.opacity;
        ctx.fillStyle = particle.color;

        if (particle.shape === "circle") {
          ctx.beginPath();
          ctx.arc(0, 0, particle.size, 0, Math.PI * 2);
          ctx.fill();
        } else if (particle.shape === "triangle") {
          ctx.beginPath();
          ctx.moveTo(0, -particle.size);
          ctx.lineTo(particle.size, particle.size);
          ctx.lineTo(-particle.size, particle.size);
          ctx.closePath();
          ctx.fill();
        } else {
          ctx.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size);
        }

        ctx.restore();
      }

      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0"
      style={{ position: "absolute", top: 0, left: 0 }}
    />
  );
}
