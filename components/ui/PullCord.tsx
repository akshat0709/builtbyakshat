"use client";

import React, { useEffect, useRef, useState } from "react";
import { getTheme, hapticTick, onThemeChange, playSwitchClick, toggleTheme } from "@/lib/theme";

/**
 * Hanging ceiling pull-cord light switch.
 *
 * - Verlet rope (position-based, N segments, iterative distance constraints).
 * - The ceiling anchor sits on a damped spring: pulling the cord past ~78% of
 *   the travel trips the switch (click + haptic), then it snaps back up.
 * - The canvas never takes pointer events itself. A window-level hit test
 *   decides whether a press landed on the cord, so the navbar controls that
 *   sit underneath the canvas stay clickable.
 */

interface Point {
  x: number;
  y: number;
  px: number;
  py: number;
  /** inverse mass: 0 = pinned */
  w: number;
}

const N = 22;
const GRAVITY = 2600; // px/s²
const ITERATIONS = 16;
const GRAB_RADIUS = 30;

export function PullCord() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const tugRef = useRef<() => void>(() => {});

  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(getTheme() === "dark");
    return onThemeChange((t) => setIsDark(t === "dark"));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let dpr = 1;
    let W = 120;
    let H = 320;
    let L = 160; // visible rest length
    let EXT_MAX = 56; // how far the anchor can be pulled down
    let HIDDEN = 72; // rope length hidden above the viewport
    let seg = 8;
    let ax = 60;
    let thick = 3;

    let pts: Point[] = [];
    let ext = 0;
    let extV = 0;
    let armed = true;
    let grab = -1;
    let target: { x: number; y: number } | null = null;
    let t = 0;
    let raf = 0;
    let last = performance.now();
    let hoverCursor = false;

    function layout() {
      if (!canvas || !container) return;
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const wide = vw >= 1024;

      L = wide ? Math.min(210, Math.max(150, vh * 0.24)) : Math.min(150, Math.max(110, vh * 0.16));
      EXT_MAX = wide ? 64 : 48;
      thick = wide ? 3.4 : 3;
      HIDDEN = EXT_MAX + 18;
      W = 120;
      H = Math.round(L + EXT_MAX + 60);

      container.style.height = `${H}px`;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);

      ax = W / 2;
      seg = (L + HIDDEN) / N;
      pts = [];
      for (let i = 0; i <= N; i++) {
        const y = -HIDDEN + i * seg;
        // The knob end is heavier (smaller inverse mass) so it swings like a weight.
        pts.push({ x: ax, y, px: ax, py: y, w: i === 0 ? 0 : i === N ? 0.35 : 1 });
      }
    }

    layout();
    window.addEventListener("resize", layout);

    function trip() {
      armed = false;
      const next = getTheme() === "dark" ? "light" : "dark";
      playSwitchClick(next === "dark");
      hapticTick(14);
      toggleTheme();
    }

    // Keyboard / button activation: play the click and give the cord a visible tug.
    tugRef.current = () => {
      extV = EXT_MAX * 14; // impulse; spring brings it back without re-tripping
      armed = false;
    };

    function step(dt: number) {
      t += dt;

      if (grab < 0) {
        // Damped spring pulls the anchor back up to the ceiling.
        const K = 520;
        const C = 20;
        extV += (-K * ext - C * extV) * dt;
        ext += extV * dt;
        if (ext < 0) {
          ext = 0;
          extV = Math.max(0, extV);
        }
        if (ext > EXT_MAX) {
          ext = EXT_MAX;
          extV = Math.min(0, extV);
        }
      }

      if (grab >= 0 && armed && ext > EXT_MAX * 0.78) trip();
      if (ext < EXT_MAX * 0.2) armed = true;

      const anchor = pts[0];
      if (anchor) {
        anchor.x = anchor.px = ax;
        anchor.y = anchor.py = -HIDDEN + ext;
      }

      const wind = reducedMotion ? 0 : Math.sin(t * 0.7) * 10 + Math.sin(t * 1.9 + 1.2) * 5;
      const damp = grab >= 0 ? 0.985 : 0.992;

      for (let i = 1; i <= N; i++) {
        if (i === grab) continue;
        const p = pts[i];
        if (!p) continue;
        const vx = (p.x - p.px) * damp;
        const vy = (p.y - p.py) * damp;
        p.px = p.x;
        p.py = p.y;
        p.x += vx + wind * dt * dt * (i / N);
        p.y += vy + GRAVITY * dt * dt;
      }

      if (grab >= 0 && target) {
        const g = pts[grab];
        if (g) {
          g.px = g.x;
          g.py = g.y;
          g.x = target.x;
          g.y = target.y;
        }
      }

      for (let k = 0; k < ITERATIONS; k++) {
        for (let i = 0; i < N; i++) {
          const a = pts[i];
          const b = pts[i + 1];
          if (!a || !b) continue;
          const wa = i === grab ? 0 : a.w;
          const wb = i + 1 === grab ? 0 : b.w;
          const wsum = wa + wb;
          if (wsum === 0) continue;
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const dist = Math.hypot(dx, dy) || 0.0001;
          const diff = (dist - seg) / dist;
          a.x += dx * diff * (wa / wsum);
          a.y += dy * diff * (wa / wsum);
          b.x -= dx * diff * (wb / wsum);
          b.y -= dy * diff * (wb / wsum);
        }
      }
    }

    function render() {
      if (!ctx || !canvas || pts.length < 2) return;
      const dark = document.documentElement.classList.contains("dark");
      const ink = dark ? "#FFF6E5" : "#1A1A1A";
      const rope = dark ? "#CFC6BE" : "#3A3232";
      const braid = dark ? "#8D847D" : "#8A7B70";
      const shadow = dark ? "rgba(0,0,0,0.55)" : "rgba(26,26,26,0.18)";

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      const path = (ox: number, oy: number) => {
        ctx.beginPath();
        const p0 = pts[0]!;
        ctx.moveTo(p0.x + ox, p0.y + oy);
        for (let i = 1; i < N; i++) {
          const p = pts[i]!;
          const q = pts[i + 1]!;
          ctx.quadraticCurveTo(p.x + ox, p.y + oy, (p.x + q.x) / 2 + ox, (p.y + q.y) / 2 + oy);
        }
        const end = pts[N]!;
        ctx.lineTo(end.x + ox, end.y + oy);
      };

      // Hard offset shadow (no blur).
      path(3, 3);
      ctx.strokeStyle = shadow;
      ctx.lineWidth = thick;
      ctx.stroke();

      // Cord.
      path(0, 0);
      ctx.strokeStyle = rope;
      ctx.lineWidth = thick;
      ctx.stroke();

      // Braid twist.
      path(0, 0);
      ctx.setLineDash([2.5, 3.5]);
      ctx.strokeStyle = braid;
      ctx.lineWidth = thick * 0.45;
      ctx.stroke();
      ctx.setLineDash([]);

      const end = pts[N]!;
      const prev = pts[N - 1]!;
      const angle = Math.atan2(end.y - prev.y, end.x - prev.x) - Math.PI / 2;

      ctx.save();
      ctx.translate(end.x, end.y);
      ctx.rotate(angle);

      // Knob hard shadow.
      ctx.fillStyle = shadow;
      ctx.beginPath();
      ctx.ellipse(3, 15, 7.5, 12, 0, 0, Math.PI * 2);
      ctx.fill();

      // Brass ferrule.
      ctx.fillStyle = "#D8A84E";
      ctx.strokeStyle = ink;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.roundRect(-4, -2, 8, 6, 1.5);
      ctx.fill();
      ctx.stroke();

      // Turned-wood knob with a 2px ink outline.
      ctx.fillStyle = dark ? "#FFD13B" : "#C9894B";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.ellipse(0, 12, 7.5, 12, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Grain line.
      ctx.strokeStyle = dark ? "rgba(26,26,26,0.35)" : "rgba(26,26,26,0.3)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(-3, 6);
      ctx.quadraticCurveTo(-1, 12, -3, 19);
      ctx.stroke();
      ctx.restore();

      // Keep the accessible button glued to the knob.
      if (buttonRef.current) {
        buttonRef.current.style.transform = `translate(${end.x - 22}px, ${end.y - 10}px)`;
      }
    }

    function loop(now: number) {
      const dt = Math.min((now - last) / 1000, 1 / 30);
      last = now;
      // Two substeps keep the rope stable at low frame rates.
      step(dt / 2);
      step(dt / 2);
      render();
      raf = requestAnimationFrame(loop);
    }
    raf = requestAnimationFrame(loop);

    const local = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top };
    };

    function nearest(x: number, y: number) {
      let best = -1;
      let bestD = GRAB_RADIUS;
      for (let i = Math.floor(N * 0.35); i <= N; i++) {
        const p = pts[i];
        if (!p) continue;
        // Knob centre sits ~12px below the last point.
        const py = i === N ? p.y + 12 : p.y;
        const d = Math.hypot(p.x - x, py - y);
        if (d < bestD) {
          bestD = d;
          best = i;
        }
      }
      return best;
    }

    function onDown(e: PointerEvent) {
      if (e.button !== 0) return;
      const { x, y } = local(e);
      if (x < -GRAB_RADIUS || x > W + GRAB_RADIUS || y > H) return;
      const idx = nearest(x, y);
      if (idx < 0) return;
      e.preventDefault();
      e.stopPropagation();
      grab = idx;
      target = { x, y };
      document.documentElement.style.cursor = "grabbing";
    }

    function onMove(e: PointerEvent) {
      const { x, y } = local(e);
      if (grab >= 0 && target) {
        target.x = x;
        target.y = y;
        // Dragging below the rest length pulls the anchor down the ceiling slot.
        const restY = L + (grab - N) * seg;
        const dy = y - restY;
        ext = Math.max(0, Math.min(EXT_MAX, dy * 0.9));
        extV = 0;
        return;
      }
      if (e.pointerType !== "mouse") return;
      const over = x >= 0 && x <= W && y >= 0 && y <= H && nearest(x, y) >= 0;
      if (over !== hoverCursor) {
        hoverCursor = over;
        document.documentElement.style.cursor = over ? "grab" : "";
      }
    }

    function onUp() {
      if (grab < 0) return;
      grab = -1;
      target = null;
      document.documentElement.style.cursor = hoverCursor ? "grab" : "";
    }

    // The canvas is pointer-transparent, so stop the page scrolling while a finger holds the cord.
    function onTouchMove(e: TouchEvent) {
      if (grab >= 0) e.preventDefault();
    }

    window.addEventListener("pointerdown", onDown, { capture: true, passive: false });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", layout);
      window.removeEventListener("pointerdown", onDown, { capture: true });
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
      document.documentElement.style.cursor = "";
    };
  }, []);

  const onButton = () => {
    const next = getTheme() === "dark" ? "light" : "dark";
    playSwitchClick(next === "dark");
    hapticTick(14);
    tugRef.current();
    toggleTheme();
  };

  return (
    <div
      ref={containerRef}
      className="fixed top-0 right-0 sm:right-1 z-40 w-[120px] pointer-events-none select-none print:hidden"
      style={{ height: 320 }}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full pointer-events-none touch-none"
        aria-hidden="true"
      />
      <button
        ref={buttonRef}
        type="button"
        role="switch"
        aria-checked={isDark}
        aria-label="Pull cord light switch: toggle dark mode"
        title="Pull the cord to switch the lights"
        onClick={onButton}
        className="absolute top-0 left-0 w-11 h-11 rounded-full pointer-events-none opacity-0 focus-visible:pointer-events-auto focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink dark:focus-visible:ring-cream focus-visible:ring-offset-2 focus-visible:ring-offset-sunny"
      >
        <span className="sr-only">Toggle dark mode</span>
      </button>
    </div>
  );
}
