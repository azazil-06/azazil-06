import { useEffect, useState, useCallback } from "react";

const KONAMI = [
  "ArrowUp", "ArrowUp",
  "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight",
  "ArrowLeft", "ArrowRight",
  "b", "a",
];

export default function KonamiCode() {
  const [activated, setActivated] = useState(false);
  const [seq, setSeq] = useState([]);

  const checkSequence = useCallback((keys) => {
    const str = keys.join(",");
    const target = KONAMI.join(",");
    return str === target;
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      setSeq((prev) => {
        const next = [...prev, e.key].slice(-KONAMI.length);
        if (checkSequence(next)) {
          setActivated(true);
          setTimeout(() => setActivated(false), 3000);
          return [];
        }
        return next;
      });
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [checkSequence]);

  if (!activated) return null;

  return (
    <div
      className="fixed inset-0 z-[9998] flex items-center justify-center pointer-events-none"
      style={{ animation: "konami-flash 3s ease-out forwards" }}
    >
      <div className="text-center" style={{ animation: "konami-pop 0.5s cubic-bezier(0.22, 1, 0.36, 1)" }}>
        <p className="font-display text-4xl font-bold uppercase tracking-tight text-accent md:text-6xl">
          🎮 Achievement Unlocked!
        </p>
        <p className="mt-2 font-mono text-sm uppercase tracking-[0.2em] text-foreground">
          You found the secret code
        </p>
      </div>

      <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 60 }).map((_, i) => (
          <span
            key={i}
            className="absolute block"
            style={{
              left: "50%",
              top: "50%",
              width: `${3 + Math.random() * 5}px`,
              height: `${8 + Math.random() * 14}px`,
              backgroundColor: [
                "#e84545", "#4361ee", "#7c3aed", "#f97316",
                "#2dd4bf", "#ec4899", "#6366f1", "#ff6b6b",
              ][i % 8],
              transform: `rotate(${Math.random() * 360}deg)`,
              animation: `konami-particle ${1 + Math.random() * 1.5}s cubic-bezier(0.22, 1, 0.36, 1) forwards`,
              "--tx": `${(Math.random() - 0.5) * 800}px`,
              "--ty": `${(Math.random() - 0.5) * 600}px`,
              "--r": `${Math.random() * 720}deg`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
