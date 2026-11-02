"use client";

import React, { useEffect, useRef, useState } from "react";

// Web Audio API synthesized mechanical switch click (no external audio files needed)
function playSwitchClick(isDark: boolean) {
  try {
    const AudioContext = window.AudioContext || (window as unknown as { webkitAudioContext: typeof window.AudioContext }).webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(isDark ? 800 : 1200, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(isDark ? 200 : 350, ctx.currentTime + 0.04);

    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.045);
  } catch {
    // AudioContext may be blocked before first user gesture
  }
}

export function PullCord() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const [isDark, setIsDark] = useState<boolean>(false);
  const [isPulling, setIsPulling] = useState<boolean>(false);

  // Sync initial theme on mount
  useEffect(() => {
    const isDarkTheme =
      document.documentElement.classList.contains("dark") ||
      localStorage.getItem("portfolio-theme") === "dark" ||
      (!("portfolio-theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);

    setIsDark(isDarkTheme);
    if (isDarkTheme) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = (triggerAudio = true) => {
    const nextDark = !document.documentElement.classList.contains("dark");
    setIsDark(nextDark);

    if (triggerAudio) {
      playSwitchClick(nextDark);
      if (typeof navigator !== "undefined" && navigator.vibrate) {
        try {
          navigator.vibrate(14);
        } catch {}
      }
    }

    const applyTheme = () => {
      if (nextDark) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("portfolio-theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("portfolio-theme", "light");
      }
    };

    if (typeof document !== "undefined" && "startViewTransition" in document) {
      (document as unknown as { startViewTransition: (cb: () => void) => void }).startViewTransition(applyTheme);
    } else {
      applyTheme();
    }
  };

  // Verlet physics rope loop
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const N = 24; // segments
    const G = 4500; // gravity px/s²
    const ITER = 14; // constraint resolution passes

    let dpr = 1;
    let W = 160;
    let H = 340;
    let L = 160;
    let EXT_MAX = 56;
    let HIDDEN = 50;
    let seg = 8;
    let ax = 80;
    let thick = 3.2;

    interface Point {
      x: number;
      y: number;
      px: number;
      py: number;
      w: number;
    }

    let pts: Point[] = [];
    let ext = 0;
    let extV = 0;
    let armed = true;
    let grab = -1;
    let target: { x: number; y: number } | null = null;
    let t = 0;
    let rafId = 0;
    let lastTime = performance.now();

    function layout() {
      if (!canvas || !container) return;
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      if (vw >= 1024) {
        L = Math.min(220, Math.max(160, vh * 0.25));
        EXT_MAX = 64;
        thick = 3.5;
      } else {
        L = Math.min(170, Math.max(130, vh * 0.18));
        EXT_MAX = 48;
        thick = 3.0;
      }

      HIDDEN = EXT_MAX + 16;
      W = 160;
      H = Math.round(L + EXT_MAX + 100);

      container.style.height = `${H}px`;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);

      ax = W / 2;
      const total = L + HIDDEN;
      seg = total / N;

      pts = [];
      for (let i = 0; i <= N; i++) {
        const x = ax;
        const y = -HIDDEN + i * seg;
        pts.push({ x, y, px: x, py: y, w: i === 0 ? 0 : i === N ? 0.3 : 1 });
      }
    }

    layout();
    window.addEventListener("resize", layout);

    function stepPhysics(dt: number) {
      t += dt;

      // Spring physics on the ceiling anchor when not pulled
      if (grab < 0) {
        const K = 740;
        const C = 22;
        extV += (-K * ext - C * extV) * dt;
        ext += extV * dt;
      }

      // Switch trigger threshold
      if (ext > EXT_MAX * 0.78 && armed) {
        armed = false;
        toggleTheme(true);
      }
      if (ext < EXT_MAX * 0.25) {
        armed = true;
      }

      // Pin anchor
      const anchor = pts[0];
      if (anchor) {
        anchor.x = anchor.px = ax;
        anchor.y = anchor.py = -HIDDEN + ext;
      }

      // Gentle ambient breeze
      const wind = Math.sin(t * 0.7) * 8 + Math.sin(t * 1.8 + 1.2) * 4;
      const damp = grab >= 0 ? 0.99 : 0.985;

      for (let i = 1; i <= N; i++) {
        if (i === grab) continue;
        const p = pts[i];
        if (!p) continue;
        const vx = (p.x - p.px) * damp;
        const vy = (p.y - p.py) * damp;
        p.px = p.x;
        p.y = p.y;
        p.x += vx + wind * dt * dt * (i / N);
        p.y += vy + G * dt * dt;
      }

      if (grab >= 0 && target && pts[grab]) {
        const g = pts[grab];
        g.px = g.x;
        g.py = g.y;
        g.x = target.x;
        g.y = target.y;
      }

      // Distance constraints
      for (let k = 0; k < ITER; k++) {
        for (let i = 0; i < N; i++) {
          const p1 = pts[i];
          const p2 = pts[i + 1];
          if (!p1 || !p2) continue;

          const dx = p2.x - p1.x;
          const dy = p2.y - p1.y;
          const dist = Math.hypot(dx, dy) || 0.001;
          const diff = (dist - seg) / dist;

          const w1 = p1.w;
          const w2 = p2.w;
          const wTotal = w1 + w2;
          if (wTotal === 0) continue;

          if (i !== 0 && i !== grab) {
            p1.x += dx * diff * (w1 / wTotal);
            p1.y += dy * diff * (w1 / wTotal);
          }
          if (i + 1 !== grab) {
            p2.x -= dx * diff * (w2 / wTotal);
            p2.y -= dy * diff * (w2 / wTotal);
          }
        }
      }
    }

    function render() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.scale(dpr, dpr);

      if (pts.length < 2) {
        ctx.restore();
        return;
      }

      const isDarkMode = document.documentElement.classList.contains("dark");
      const ropeColor = isDarkMode ? "#B5A8A8" : "#4A3F3F";
      const knotColor = isDarkMode ? "#E8E4E0" : "#1A1818";
      const knobColor = isDarkMode ? "#FFD13B" : "#1A1818";
      const shadowColor = isDarkMode ? "rgba(0,0,0,0.5)" : "rgba(0,0,0,0.2)";

      // Draw drop shadow
      ctx.beginPath();
      ctx.strokeStyle = shadowColor;
      ctx.lineWidth = thick + 1;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      const startPt = pts[0];
      if (startPt) {
        ctx.moveTo(startPt.x + 2, startPt.y + 3);
        for (let i = 1; i <= N; i++) {
          const p = pts[i];
          if (p) ctx.lineTo(p.x + 2, p.y + 3);
        }
        ctx.stroke();
      }

      // Draw braided rope cord
      ctx.beginPath();
      ctx.strokeStyle = ropeColor;
      ctx.lineWidth = thick;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      if (startPt) {
        ctx.moveTo(startPt.x, startPt.y);
        for (let i = 1; i <= N; i++) {
          const p = pts[i];
          if (p) ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();
      }

      // Draw decorative brass collar & wooden knob at the end of the rope
      const last = pts[N];
      if (last) {
        // Brass collar
        ctx.beginPath();
        ctx.fillStyle = "#D8A84E";
        ctx.arc(last.x, last.y - 12, 3.5, 0, Math.PI * 2);
        ctx.fill();

        // Acorn / teardrop knob
        ctx.beginPath();
        ctx.fillStyle = knobColor;
        ctx.shadowColor = shadowColor;
        ctx.shadowBlur = 4;
        ctx.shadowOffsetY = 2;

        ctx.ellipse(last.x, last.y, 6.5, 11, 0, 0, Math.PI * 2);
        ctx.fill();

        // Highlight ring on the knob
        ctx.shadowColor = "transparent";
        ctx.beginPath();
        ctx.strokeStyle = isDarkMode ? "#1A1818" : "#FFD13B";
        ctx.lineWidth = 1.5;
        ctx.arc(last.x, last.y, 3, 0, Math.PI * 2);
        ctx.stroke();

        // Keep invisible hit button anchored directly over the knob for accessibility
        if (buttonRef.current) {
          buttonRef.current.style.transform = `translate(${last.x - 22}px, ${last.y - 22}px)`;
        }
      }

      ctx.restore();
    }

    function loop(now: number) {
      const dt = Math.min((now - lastTime) / 1000, 0.033);
      lastTime = now;
      stepPhysics(dt);
      render();
      rafId = requestAnimationFrame(loop);
    }
    rafId = requestAnimationFrame(loop);

    // Pointer event listeners on canvas to grab & swing
    function handlePointerDown(e: PointerEvent) {
      const rect = canvas?.getBoundingClientRect();
      if (!rect) return;
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Find nearest point within radius
      let best = -1;
      let minD = 40;
      for (let i = Math.floor(N * 0.4); i <= N; i++) {
        const p = pts[i];
        if (!p) continue;
        const d = Math.hypot(p.x - x, p.y - y);
        if (d < minD) {
          minD = d;
          best = i;
        }
      }

      if (best >= 0) {
        grab = best;
        target = { x, y };
        setIsPulling(true);
        canvas?.setPointerCapture(e.pointerId);
      }
    }

    function handlePointerMove(e: PointerEvent) {
      if (grab >= 0 && target) {
        const rect = canvas?.getBoundingClientRect();
        if (!rect) return;
        target.x = e.clientX - rect.left;
        target.y = e.clientY - rect.top;

        // When dragged downwards past standard length, pull the anchor extension
        const dy = target.y - (L - 10);
        if (dy > 0) {
          ext = Math.min(EXT_MAX, dy * 0.8);
          extV = 0;
        }
      }
    }

    function handlePointerUp(e: PointerEvent) {
      if (grab >= 0) {
        grab = -1;
        target = null;
        setIsPulling(false);
        try {
          canvas?.releasePointerCapture(e.pointerId);
        } catch {}
      }
    }

    canvas.addEventListener("pointerdown", handlePointerDown);
    canvas.addEventListener("pointermove", handlePointerMove);
    canvas.addEventListener("pointerup", handlePointerUp);
    canvas.addEventListener("pointercancel", handlePointerUp);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", layout);
      if (canvas) {
        canvas.removeEventListener("pointerdown", handlePointerDown);
        canvas.removeEventListener("pointermove", handlePointerMove);
        canvas.removeEventListener("pointerup", handlePointerUp);
        canvas.removeEventListener("pointercancel", handlePointerUp);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed top-0 right-4 sm:right-10 md:right-14 z-50 pointer-events-none select-none w-40"
      style={{ height: 320 }}
      aria-label="Light / Dark Switch Cord"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full pointer-events-auto cursor-grab active:cursor-grabbing touch-none"
        title="Pull cord to toggle dark / light mode"
      />

      {/* Accessible button overlaid over the physical knob */}
      <button
        ref={buttonRef}
        type="button"
        role="switch"
        aria-checked={isDark}
        aria-label="Toggle dark mode (pull the cord)"
        onClick={() => toggleTheme(true)}
        className="absolute top-0 left-0 w-11 h-11 rounded-full pointer-events-auto opacity-0 focus-visible:opacity-100 focus-visible:bg-sunny/80 focus-visible:ring-2 focus-visible:ring-ink focus-visible:outline-none transition-opacity"
      >
        <span className="sr-only">Toggle Dark Mode</span>
      </button>

      {/* Subtle indicator pill when pulling */}
      {isPulling && (
        <div className="absolute top-2 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-charcoal text-stone-light text-[10px] font-mono font-bold whitespace-nowrap shadow-hard-sm pointer-events-none animate-bounce">
          Release to switch
        </div>
      )}
    </div>
  );
}
