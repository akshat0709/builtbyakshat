"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

const DISCIPLINES = [
  "Full-stack systems",
  "Realtime dispatch",
  "Autonomous robotics",
  "Locomotive vision AI",
  "IoT & embedded security",
];

interface VesperionHeroProps {
  onOpenContact?: () => void;
}

/**
 * Cinematic poster hero: a giant condensed wordmark with a lit object sitting
 * in front of it, warm ember atmosphere, and tiny mono captions in the corners.
 */
export function VesperionHero({ onOpenContact }: VesperionHeroProps) {
  const reduce = useReducedMotion();

  const scrollToWorks = () => {
    document.getElementById("works")?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden rounded-[28px] border border-white/[0.07] bg-[#0b0907] min-h-[620px] sm:min-h-[680px] lg:min-h-[760px] flex flex-col"
    >
      {/* Atmosphere: ember floor glow, smoke and vignette */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(120%_70%_at_50%_100%,rgba(255,110,40,0.55)_0%,rgba(140,48,14,0.35)_35%,transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(60%_45%_at_18%_30%,rgba(255,150,70,0.16)_0%,transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(50%_40%_at_85%_20%,rgba(255,120,50,0.12)_0%,transparent_70%)]" />
        <div className="absolute inset-0 vesper-grain opacity-[0.22] mix-blend-overlay" />
        <div className="absolute inset-0 bg-[radial-gradient(140%_100%_at_50%_45%,transparent_55%,rgba(0,0,0,0.75)_100%)]" />
        {/* Drifting embers */}
        {!reduce &&
          Array.from({ length: 18 }).map((_, i) => (
            <span
              key={i}
              className="vesper-ember"
              style={
                {
                  left: `${(i * 53) % 100}%`,
                  animationDelay: `${(i * 0.73) % 9}s`,
                  animationDuration: `${9 + ((i * 1.7) % 7)}s`,
                  "--drift": `${((i % 5) - 2) * 18}px`,
                } as React.CSSProperties
              }
            />
          ))}
      </div>

      {/* Top meta row */}
      <div className="relative z-20 flex items-start justify-between gap-6 px-5 sm:px-8 pt-5 sm:pt-7 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.18em] text-cream/70">
        <span className="inline-flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-sunny shadow-[0_0_10px_2px_rgba(255,138,61,0.8)]" />
          Akshat Gupta · Bengaluru
        </span>
        <span className="hidden md:block text-right">
          Full-stack developer
          <br />
          <span className="text-cream/40">Now @ Orange Taxi</span>
        </span>
      </div>

      {/* Wordmark + centrepiece */}
      <div className="relative flex-1 flex items-center justify-center px-2 sm:px-4">
        <motion.h1
          id="hero-title"
          initial={{ opacity: 0, y: 40, letterSpacing: "0.04em" }}
          animate={{ opacity: 1, y: 0, letterSpacing: "-0.01em" }}
          transition={{ duration: 1.1, ease: EASE }}
          className="relative z-0 w-full text-center font-poster uppercase leading-[0.8] text-[25vw] lg:text-[19rem] xl:text-[21rem] text-[#f4ece2] select-none [text-shadow:0_0_80px_rgba(255,120,40,0.25)]"
        >
          Akshat
          <span className="sr-only">
            {" "}
            Gupta, full-stack developer. I engineer {DISCIPLINES.join(", ")}.
          </span>
        </motion.h1>

        {/* The lit object sitting in front of the type */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute z-10 left-1/2 top-1/2 -translate-x-1/2 -translate-y-[38%] w-[24vw] sm:w-[34vw] max-w-[280px] aspect-square"
        >
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.25, ease: EASE }}
          className="h-full w-full"
        >
          <motion.div
            className="relative h-full w-full"
            animate={reduce ? undefined : { y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* Contact shadow */}
            <div className="absolute left-1/2 bottom-[-6%] h-[10%] w-[70%] -translate-x-1/2 rounded-[50%] bg-black/70 blur-xl" />
            {/* Orbit ring (back half) */}
            <div className="absolute inset-[-14%] rounded-full border border-sunny/30 [transform:rotateX(74deg)_rotateZ(-14deg)]" />
            {/* Sphere */}
            <div className="absolute inset-[8%] rounded-full bg-[radial-gradient(circle_at_32%_28%,#fff4e6_0%,#ffb27a_10%,#e2621f_32%,#6a2208_62%,#1a0904_85%)] shadow-[0_0_120px_20px_rgba(255,110,40,0.35),inset_-30px_-40px_80px_rgba(0,0,0,0.65)]" />
            {/* Rim light */}
            <div className="absolute inset-[8%] rounded-full bg-[radial-gradient(circle_at_78%_82%,rgba(255,190,120,0.55)_0%,transparent_32%)] mix-blend-screen" />
            {/* Surface lines */}
            <div className="absolute inset-[8%] rounded-full overflow-hidden opacity-40">
              <div className="absolute inset-0 bg-[repeating-linear-gradient(170deg,transparent_0_14px,rgba(0,0,0,0.35)_14px_15px)]" />
            </div>
            {/* Orbit ring (front half) with a satellite */}
            <div className="absolute inset-[-14%] [transform:rotateX(74deg)_rotateZ(-14deg)]">
              <div className="absolute inset-0 rounded-full border-b-2 border-sunny/70 [clip-path:inset(50%_0_0_0)]" />
              <motion.div
                className="absolute inset-0"
                animate={reduce ? undefined : { rotate: 360 }}
                transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
              >
                <span className="absolute left-1/2 -top-1 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-[#fff1e0] shadow-[0_0_14px_4px_rgba(255,160,90,0.9)]" />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
        </div>
      </div>

      {/* Bottom captions */}
      <div className="relative z-20 grid gap-6 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-end px-5 sm:px-8 pb-6 sm:pb-8">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
          className="max-w-[340px] font-mono text-[10px] sm:text-[11px] uppercase leading-relaxed tracking-[0.12em] text-cream/75"
        >
          {"// "}I&apos;m Akshat, a full-stack developer and CS undergrad at BMSCE. Building realtime
          dispatch at Orange Taxi; before that, a GPS-denied rescue rover and locomotive-cab vision.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: EASE }}
          className="flex flex-wrap items-center justify-start md:justify-center gap-3"
        >
          <button
            type="button"
            onClick={onOpenContact}
            className="group inline-flex items-center gap-3 rounded-full bg-[#f4ece2] pl-5 pr-1.5 py-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#120c08] transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sunny"
          >
            Book a call
            <span className="grid h-8 w-8 place-items-center rounded-full bg-sunny text-[#120c08] transition-transform group-hover:rotate-45">
              ↗
            </span>
          </button>
          <button
            type="button"
            onClick={scrollToWorks}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-cream/85 backdrop-blur transition hover:border-sunny/60 hover:text-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sunny"
          >
            Selected work ↓
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: EASE }}
          className="md:text-right font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.14em] text-cream/75"
        >
          <span className="text-sunny">{"//"}</span> Systems that
          <br />
          carry the story
        </motion.div>
      </div>

      {/* Discipline ticker */}
      <div className="relative z-20 border-t border-white/[0.07] overflow-hidden py-3" aria-hidden="true">
        <div className={`flex w-max gap-10 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-cream/45 ${reduce ? "" : "vesper-marquee"}`}>
          {[...DISCIPLINES, ...DISCIPLINES, ...DISCIPLINES, ...DISCIPLINES].map((d, i) => (
            <span key={i} className="inline-flex items-center gap-10">
              {d}
              <span className="text-sunny/70">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
