"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const SKILLS = [
  { title: "Full-Stack Systems", number: "01 / 05" },
  { title: "Electric Cab Dispatch", number: "02 / 05" },
  { title: "Autonomous Robotics", number: "03 / 05" },
  { title: "Locomotive Vision AI", number: "04 / 05" },
  { title: "IoT & Embedded Security", number: "05 / 05" },
];

interface FlipCalendarHeroProps {
  onOpenContact?: () => void;
}

export function FlipCalendarHero({ onOpenContact }: FlipCalendarHeroProps) {
  const [index, setIndex] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);

  useEffect(() => {
    // Autoplay page flip every 2.4s
    const timer = setInterval(() => {
      setIsFlipping(true);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % SKILLS.length);
        setIsFlipping(false);
      }, 550);
    }, 2400);

    return () => clearInterval(timer);
  }, []);

  const current = SKILLS[index] || SKILLS[0];
  const next = SKILLS[(index + 1) % SKILLS.length] || SKILLS[0];

  const scrollToWorks = () => {
    const el = document.getElementById("works");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="relative pt-12 sm:pt-16 pb-16 px-4 sm:px-6 md:px-10 max-w-6xl mx-auto overflow-hidden">
      {/* Top eyebrow badge */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-center gap-2 mb-4"
      >
        <span className="w-2 h-2 rounded-full bg-teal animate-pulse" />
        <span className="font-mono text-xs sm:text-sm font-bold uppercase tracking-wider text-charcoal/70 dark:text-stone-light/70">
          Full-Stack Developer &amp; Systems Builder
        </span>
      </motion.div>

      {/* Main typographic statement */}
      <div className="space-y-1 sm:space-y-2 mb-8">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-charcoal dark:text-stone-light leading-[1.02]"
        >
          Hi, I&apos;m Akshat Gupta.
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-baseline gap-3 text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-black text-charcoal/80 dark:text-stone-light/80"
        >
          <span>I engineer</span>

          {/* ================= 3D DESK FLIP CALENDAR ================= */}
          <div
            className="relative inline-flex flex-col items-center perspective-1000 align-middle my-1"
            aria-live="polite"
            aria-label={`Current focus: ${current.title}`}
          >
            {/* Spiral Ring Binding Holes at Top */}
            <div className="flex items-center gap-2 sm:gap-3 mb-[-6px] z-20">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="w-2 sm:w-2.5 h-4 sm:h-5 rounded-full bg-gradient-to-b from-[#555] via-[#888] to-[#222] shadow-sm border border-black/30"
                />
              ))}
            </div>

            {/* Calendar Stand & Card Stack */}
            <div className="relative w-auto min-w-[280px] sm:min-w-[420px] md:min-w-[520px] h-[72px] sm:h-[94px] md:h-[108px] bg-paper dark:bg-charcoal-light border-2 border-charcoal dark:border-stone-line rounded-xl shadow-hard sm:shadow-hard-lg flex items-center px-4 sm:px-6 justify-between select-none overflow-hidden">
              {/* Underlying Card (Next Page ready to be revealed) */}
              <div className="absolute inset-0 flex items-center justify-between px-4 sm:px-6 bg-paper dark:bg-charcoal-light">
                <span className="font-display font-black text-2xl sm:text-4xl md:text-5xl text-charcoal dark:text-stone-light truncate">
                  {next.title}
                </span>
                <span className="font-mono text-xs sm:text-sm font-bold text-charcoal/50 dark:text-stone-light/50 tnum ml-2">
                  {next.number}
                </span>
              </div>

              {/* Flipping Top Card (3D fold along top edge) */}
              <div
                className={`absolute inset-0 flex items-center justify-between px-4 sm:px-6 bg-stone-light dark:bg-[#201D1D] border-b border-charcoal/20 transition-all duration-500 ease-[cubic-bezier(0.5,0.05,0.2,1)] origin-top ${
                  isFlipping
                    ? "-rotate-x-90 opacity-0 shadow-2xl"
                    : "rotate-x-0 opacity-100 shadow-none"
                }`}
                style={{ transformStyle: "preserve-3d" }}
              >
                <span className="font-display font-black text-2xl sm:text-4xl md:text-5xl text-charcoal dark:text-stone-light truncate">
                  {current.title}
                </span>
                <span className="font-mono text-xs sm:text-sm font-bold text-teal dark:text-sunny tnum ml-2">
                  {current.number}
                </span>
              </div>

              {/* Center subtle crease */}
              <div className="absolute top-0 bottom-0 left-0 right-0 pointer-events-none bg-gradient-to-b from-black/5 via-transparent to-black/10 dark:from-white/5 dark:to-black/30" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Narrative Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="font-body text-base sm:text-lg md:text-xl text-charcoal/80 dark:text-stone-light/80 max-w-2xl leading-relaxed mb-8"
      >
        Full-stack developer and CS undergrad (IoT, Cybersecurity &amp; Blockchain) at BMSCE,
        Bengaluru. Building real systems: from a live electric cab dispatch platform on Supabase to
        autonomous GPS-denied rescue rovers.
      </motion.p>

      {/* Pill CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-wrap items-center gap-4 mb-14"
      >
        <button
          type="button"
          onClick={onOpenContact}
          className="group relative inline-flex items-center gap-3 px-6 py-3.5 rounded-full bg-charcoal text-stone-light dark:bg-stone-light dark:text-charcoal font-display font-bold text-sm sm:text-base border-2 border-charcoal dark:border-stone-light shadow-hard hover:shadow-hard-lg hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-hard-sm transition-all"
        >
          <span>Start a conversation</span>
          <span className="w-6 h-6 rounded-full bg-stone-light text-charcoal dark:bg-charcoal dark:text-stone-light inline-flex items-center justify-center font-bold text-xs group-hover:translate-x-0.5 transition-transform">
            →
          </span>
        </button>

        <button
          type="button"
          onClick={scrollToWorks}
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-transparent text-charcoal dark:text-stone-light font-display font-bold text-sm sm:text-base border-2 border-charcoal/40 dark:border-stone-line hover:border-charcoal dark:hover:border-stone-light hover:bg-black/5 dark:hover:bg-white/5 active:translate-y-0.5 transition-all"
        >
          <span>Explore the doors</span>
          <span aria-hidden="true">↓</span>
        </button>
      </motion.div>

      {/* Hero Bottom Bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="pt-6 border-t border-charcoal/15 dark:border-stone-line/20 flex flex-wrap items-center justify-between gap-4 font-mono text-xs sm:text-sm text-charcoal/70 dark:text-stone-light/70"
      >
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-teal animate-pulse" />
          <span>Available for early roles &amp; software builds</span>
        </div>
        <div className="hidden sm:block">Bengaluru, India · Worldwide Remote</div>
        <button
          type="button"
          onClick={scrollToWorks}
          className="hover:text-charcoal dark:hover:text-stone-light inline-flex items-center gap-1 font-bold underline underline-offset-4"
        >
          <span>Scroll to explore</span>
          <span aria-hidden="true">↓</span>
        </button>
      </motion.div>
    </section>
  );
}
