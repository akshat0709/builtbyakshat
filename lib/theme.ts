"use client";

/**
 * Single source of truth for the light/dark theme.
 *
 * The inline script in app/layout.tsx reads the same storage key before paint,
 * so every switch on the site (pull cord, navbar toggle) must write through here.
 */

export type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "theme";
export const THEME_EVENT = "bba:themechange";

export function getTheme(): Theme {
  if (typeof document === "undefined") return "light";
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

function writeTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Storage can be blocked (private mode); the class still applies for this visit.
  }
  window.dispatchEvent(new CustomEvent<Theme>(THEME_EVENT, { detail: theme }));
}

export function setTheme(theme: Theme) {
  if (typeof document === "undefined") return;
  const doc = document as Document & { startViewTransition?: (cb: () => void) => unknown };
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (doc.startViewTransition && !reduced) {
    doc.startViewTransition(() => writeTheme(theme));
  } else {
    writeTheme(theme);
  }
}

export function toggleTheme(): Theme {
  const next: Theme = getTheme() === "dark" ? "light" : "dark";
  setTheme(next);
  return next;
}

/** Subscribe to theme changes from any switch. Returns an unsubscribe function. */
export function onThemeChange(cb: (theme: Theme) => void): () => void {
  const handler = (e: Event) => cb((e as CustomEvent<Theme>).detail);
  window.addEventListener(THEME_EVENT, handler);
  return () => window.removeEventListener(THEME_EVENT, handler);
}

/* ------------------------------------------------------------------ */
/* Synthesized mechanical pull-switch click (Web Audio, no assets).    */
/* ------------------------------------------------------------------ */

let audioCtx: AudioContext | null = null;

function getAudio(): AudioContext | null {
  if (typeof window === "undefined") return null;
  const Ctor =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!Ctor) return null;
  if (!audioCtx) audioCtx = new Ctor();
  if (audioCtx.state === "suspended") void audioCtx.resume();
  return audioCtx;
}

/**
 * Two-part click: a short band-passed noise "tick" (the spring snapping)
 * followed by a low body "thunk". Turning on is brighter than turning off,
 * like a real ceiling pull switch.
 */
export function playSwitchClick(turningDark: boolean) {
  try {
    const ctx = getAudio();
    if (!ctx) return;
    const t0 = ctx.currentTime;

    // 1) Snap: 12ms of decaying white noise through a band-pass.
    const len = Math.floor(ctx.sampleRate * 0.012);
    const buf = ctx.createBuffer(1, len, ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < len; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 3);
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buf;
    const band = ctx.createBiquadFilter();
    band.type = "bandpass";
    band.frequency.value = turningDark ? 2600 : 3400;
    band.Q.value = 1.4;
    const snapGain = ctx.createGain();
    snapGain.gain.value = 0.55;
    noise.connect(band).connect(snapGain).connect(ctx.destination);
    noise.start(t0);

    // 2) Thunk: a fast pitch-dropping sine for the switch body.
    const osc = ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.setValueAtTime(turningDark ? 180 : 240, t0 + 0.004);
    osc.frequency.exponentialRampToValueAtTime(60, t0 + 0.07);
    const body = ctx.createGain();
    body.gain.setValueAtTime(0.0001, t0);
    body.gain.exponentialRampToValueAtTime(0.28, t0 + 0.008);
    body.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.08);
    osc.connect(body).connect(ctx.destination);
    osc.start(t0);
    osc.stop(t0 + 0.09);
  } catch {
    // Audio is a garnish; never let it break the switch.
  }
}

export function hapticTick(ms = 12) {
  try {
    if (typeof navigator !== "undefined" && "vibrate" in navigator) navigator.vibrate(ms);
  } catch {
    // ignore
  }
}
