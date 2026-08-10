import { useRef, useEffect, useCallback, useState } from "react";

/**
 * DinoGame — a Chrome-style T-Rex runner drawn on a <canvas>.
 *
 * Controls: Space / ArrowUp / tap to jump.
 * Renders pixel-art dino, cacti, ground, and clouds using raw canvas calls.
 * Styled to match the portfolio's Swiss design tokens.
 */

// ── Pixel-art sprite data (drawn procedurally) ──────────────────────────
const DINO_W = 40;
const DINO_H = 44;
const GROUND_Y_OFFSET = 60; // px above canvas bottom

const GRAVITY = 0.6;
const JUMP_FORCE = -12;
const BASE_SPEED = 5;
const SPEED_INCREMENT = 0.001;

function drawDino(ctx, x, y, frame, color) {
  ctx.fillStyle = color;
  // Body
  ctx.fillRect(x + 8, y, 24, 28);
  // Head
  ctx.fillRect(x + 18, y - 16, 22, 20);
  // Eye (knockout)
  ctx.save();
  ctx.globalCompositeOperation = "destination-out";
  ctx.fillRect(x + 32, y - 12, 4, 4);
  ctx.restore();
  // Mouth
  ctx.fillRect(x + 34, y - 2, 6, 3);
  // Tail
  ctx.fillRect(x, y + 4, 10, 8);
  // Legs (alternate per frame)
  if (frame % 2 === 0) {
    ctx.fillRect(x + 12, y + 28, 6, 16);
    ctx.fillRect(x + 24, y + 28, 6, 12);
  } else {
    ctx.fillRect(x + 12, y + 28, 6, 12);
    ctx.fillRect(x + 24, y + 28, 6, 16);
  }
  // Arms
  ctx.fillRect(x + 6, y + 10, 4, 10);
}

function drawCactus(ctx, x, groundY, h, color) {
  ctx.fillStyle = color;
  const w = 14;
  ctx.fillRect(x, groundY - h, w, h);
  // Left arm
  ctx.fillRect(x - 8, groundY - h + 12, 8, 6);
  ctx.fillRect(x - 8, groundY - h + 12, 4, 18);
  // Right arm
  ctx.fillRect(x + w, groundY - h + 20, 8, 6);
  ctx.fillRect(x + w + 4, groundY - h + 10, 4, 16);
}

function drawCloud(ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, 36, 6);
  ctx.fillRect(x + 4, y - 4, 28, 4);
  ctx.fillRect(x + 10, y - 8, 16, 4);
}

export default function DinoGame() {
  const canvasRef = useRef(null);
  const stateRef = useRef(null);
  const animRef = useRef(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [started, setStarted] = useState(false);

  const resetState = useCallback((canvas) => {
    const groundY = canvas.height - GROUND_Y_OFFSET;
    return {
      dino: { x: 60, y: groundY - DINO_H, vy: 0, grounded: true, frame: 0 },
      cacti: [],
      clouds: [
        { x: 200, y: 30 },
        { x: 460, y: 50 },
        { x: 700, y: 20 },
      ],
      groundOffset: 0,
      speed: BASE_SPEED,
      score: 0,
      frameCount: 0,
      nextCactus: 120,
      gameOver: false,
      groundY,
    };
  }, []);

  const startGame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    stateRef.current = resetState(canvas);
    setScore(0);
    setGameOver(false);
    setStarted(true);
  }, [resetState]);

  // ── Game loop ───────────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    // Read CSS custom props for colors
    const style = getComputedStyle(document.documentElement);
    const ink = style.getPropertyValue("--ink")?.trim() || "#1a1a1a";
    const rule = style.getPropertyValue("--rule")?.trim() || "rgba(26,26,26,0.14)";
    const mutedFg =
      style.getPropertyValue("--muted-foreground")?.trim() || "#666";
    const bg = style.getPropertyValue("--background")?.trim() || "#f5f5f0";

    // Initialize state for the idle dino frame
    if (!stateRef.current) {
      stateRef.current = resetState(canvas);
    }

    const loop = () => {
      const s = stateRef.current;
      if (!s) return;
      const { groundY } = s;

      // ── Clear ──
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // ── Ground ──
      ctx.strokeStyle = ink;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, groundY);
      ctx.lineTo(canvas.width, groundY);
      ctx.stroke();

      // Ground hash marks
      ctx.strokeStyle = rule;
      for (let i = 0; i < canvas.width + 20; i += 24) {
        const gx = ((i - s.groundOffset) % (canvas.width + 20) + (canvas.width + 20)) % (canvas.width + 20) - 10;
        ctx.beginPath();
        ctx.moveTo(gx, groundY + 4);
        ctx.lineTo(gx + 6, groundY + 4);
        ctx.stroke();
      }

      // ── Clouds ──
      s.clouds.forEach((c) => drawCloud(ctx, c.x, c.y, rule));

      // ── Dino ──
      drawDino(ctx, s.dino.x, s.dino.y, s.dino.frame, ink);

      // ── Cacti ──
      s.cacti.forEach((c) => drawCactus(ctx, c.x, groundY, c.h, ink));

      if (!started || s.gameOver) {
        animRef.current = requestAnimationFrame(loop);
        return;
      }

      // ── Update ──
      s.frameCount++;
      s.speed = BASE_SPEED + s.frameCount * SPEED_INCREMENT;
      s.groundOffset = (s.groundOffset + s.speed) % (canvas.width + 20);

      // Dino physics
      if (!s.dino.grounded) {
        s.dino.vy += GRAVITY;
        s.dino.y += s.dino.vy;
        if (s.dino.y >= groundY - DINO_H) {
          s.dino.y = groundY - DINO_H;
          s.dino.vy = 0;
          s.dino.grounded = true;
        }
      }

      // Animate legs
      if (s.dino.grounded && s.frameCount % 6 === 0) {
        s.dino.frame++;
      }

      // Clouds
      s.clouds.forEach((c) => {
        c.x -= s.speed * 0.3;
        if (c.x < -50) {
          c.x = canvas.width + Math.random() * 200;
          c.y = 15 + Math.random() * 50;
        }
      });

      // Spawn cacti
      s.nextCactus--;
      if (s.nextCactus <= 0) {
        s.cacti.push({
          x: canvas.width + 10,
          h: 28 + Math.random() * 24,
        });
        s.nextCactus = 80 + Math.floor(Math.random() * 100);
      }

      // Move cacti
      s.cacti.forEach((c) => (c.x -= s.speed));
      s.cacti = s.cacti.filter((c) => c.x > -30);

      // Collision
      const d = s.dino;
      for (const c of s.cacti) {
        if (
          d.x + DINO_W - 8 > c.x &&
          d.x + 8 < c.x + 14 &&
          d.y + DINO_H > groundY - c.h
        ) {
          s.gameOver = true;
          setGameOver(true);
          break;
        }
      }

      // Score
      if (!s.gameOver) {
        s.score++;
        if (s.score % 3 === 0) setScore(Math.floor(s.score / 3));
      }

      animRef.current = requestAnimationFrame(loop);
    };

    animRef.current = requestAnimationFrame(loop);

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [started, resetState]);

  // ── Input handling ──────────────────────────────────────────────────
  useEffect(() => {
    const jump = () => {
      const s = stateRef.current;
      if (!s) return;
      if (s.gameOver) {
        startGame();
        return;
      }
      if (!started) {
        startGame();
        return;
      }
      if (s.dino.grounded) {
        s.dino.vy = JUMP_FORCE;
        s.dino.grounded = false;
      }
    };

    const onKey = (e) => {
      if (e.code === "Space" || e.code === "ArrowUp") {
        e.preventDefault();
        jump();
      }
    };

    window.addEventListener("keydown", onKey);
    const canvas = canvasRef.current;
    if (canvas) canvas.addEventListener("pointerdown", jump);

    return () => {
      window.removeEventListener("keydown", onKey);
      if (canvas) canvas.removeEventListener("pointerdown", jump);
    };
  }, [started, startGame]);

  return (
    <section className="relative z-10 mx-auto max-w-[1400px] border-t border-rule px-6 py-16 md:px-10 md:py-20">
      <span className="mb-6 block font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
        Easter Egg — Take a break
      </span>

      <div className="relative overflow-hidden rounded-none border border-rule bg-[var(--background)]">
        <canvas
          ref={canvasRef}
          width={800}
          height={200}
          className="w-full"
          style={{ imageRendering: "pixelated", cursor: "pointer" }}
        />

        {/* Overlay messages */}
        {!started && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--ink)]">
              Press Space or Tap to Start
            </span>
          </div>
        )}
        {gameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-[var(--background)]/80">
            <span className="font-display text-2xl font-semibold uppercase tracking-tight text-[var(--ink)]">
              Game Over
            </span>
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Press Space or Tap to Restart
            </span>
          </div>
        )}
      </div>

      <div className="mt-3 flex justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          ↑ / Space to Jump
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ink)]">
          Score: {String(score).padStart(5, "0")}
        </span>
      </div>
    </section>
  );
}
