"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useBengaluruClock } from "@/lib/useBengaluruClock";

const SKILLS = [
  "Full-Stack Systems",
  "Realtime Dispatch",
  "Autonomous Robotics",
  "Locomotive Vision AI",
  "IoT & Embedded Security",
];

const STICKERS = [
  { label: "Now", text: "Full-Stack Intern @ Orange Taxi", bg: "bg-coral", rot: -2.5, x: "0%", y: "0%" },
  { label: "Study", text: "BMSCE · CS (IoT & Cyber) · '28", bg: "bg-mint", rot: 2, x: "24%", y: "31%" },
  { label: "CGPA", text: "8.97", bg: "bg-sky", rot: -1.5, x: "74%", y: "2%", big: true },
  { label: "2022", text: "National INSPIRE Award", bg: "bg-sunny", rot: 2.5, x: "0%", y: "62%" },
  { label: "Base", text: "Bengaluru, India", bg: "bg-lilac", rot: -2, x: "56%", y: "80%" },
];

const FLIP_MS = 720;
const DWELL_MS = 2600;

interface FlipCalendarHeroProps {
  onOpenContact?: () => void;
}

/** Shared face layout so the front, the back-facing next page and the flipping leaf line up exactly. */
function PageFace({ title, index }: { title: string; index: number }) {
  return (
    <div className="absolute inset-0 flex items-center justify-between gap-3 px-4 sm:px-6 pt-3">
      <span className="font-display font-black text-[1.35rem] leading-none sm:text-3xl md:text-4xl xl:text-5xl text-charcoal dark:text-stone-light whitespace-nowrap">
        {title}
      </span>
      <span className="shrink-0 font-mono text-[10px] sm:text-xs font-bold text-tomato dark:text-sunny tnum">
        {String(index + 1).padStart(2, "0")}/{String(SKILLS.length).padStart(2, "0")}
      </span>
    </div>
  );
}

export function FlipCalendarHero({ onOpenContact }: FlipCalendarHeroProps) {
  const reduce = useReducedMotion();
  const clock = useBengaluruClock();

  const [index, setIndex] = useState(0);
  const [flipping, setFlipping] = useState(false);
  const [paused, setPaused] = useState(false);
  const busy = useRef(false);

  const next = (index + 1) % SKILLS.length;

  const flip = useCallback(() => {
    if (busy.current) return;
    if (reduce) {
      setIndex((i) => (i + 1) % SKILLS.length);
      return;
    }
    busy.current = true;
    setFlipping(true);
  }, [reduce]);

  const onFlipDone = () => {
    setIndex((i) => (i + 1) % SKILLS.length);
    setFlipping(false);
    busy.current = false;
  };

  // Autoplay, paused on hover/focus, when the tab is hidden, and for reduced motion.
  useEffect(() => {
    if (paused || reduce) return;
    const id = setTimeout(() => {
      if (document.visibilityState === "visible") flip();
    }, DWELL_MS);
    return () => clearTimeout(id);
  }, [index, paused, reduce, flip]);

  const scrollToWorks = () => {
    document.getElementById("works")?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <section id="home" className="relative pt-10 sm:pt-14 pb-16 px-1 sm:px-2">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-center gap-2 mb-4"
      >
        <span className="w-2 h-2 rounded-full bg-tomato border border-ink" aria-hidden="true" />
        <span className="font-mono text-xs sm:text-sm font-bold uppercase tracking-wider text-ink/70 dark:text-cream/70">
          Full-Stack Developer &amp; Systems Builder
        </span>
      </motion.div>

      <div className="mb-10">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-black text-[2.6rem] sm:text-6xl md:text-7xl xl:text-[6.5rem] tracking-tight text-ink dark:text-cream leading-[1.02]"
        >
          Hi, I&apos;m{" "}
          <span className="relative inline-block whitespace-nowrap">
            <span
              aria-hidden="true"
              className="absolute -inset-x-2 bottom-[0.06em] h-[0.42em] -rotate-1 bg-sunny dark:bg-tomato border-2 border-ink dark:border-cream/70 rounded-md"
            />
            <span className="relative">Akshat Gupta</span>
          </span>
          <span className="text-tomato dark:text-sunny">.</span>
          <span className="sr-only"> I engineer {SKILLS.join(", ")}.</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-5 flex flex-col md:flex-row md:items-end gap-4 md:gap-6"
          aria-hidden="true"
        >
          <span className="font-display font-black text-3xl sm:text-5xl md:text-6xl xl:text-7xl text-cobalt dark:text-sky leading-none md:pb-3 shrink-0">
            I engineer
          </span>

          {/* ================= DESK EASEL FLIP CALENDAR ================= */}
          <button
            type="button"
            tabIndex={-1}
            onClick={flip}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            className="group relative block w-full max-w-[360px] sm:max-w-[480px] md:max-w-none md:w-[480px] xl:w-[600px] text-left cursor-pointer select-none"
            style={{ perspective: 1100 }}
          >
            {/* Easel back leg peeking out under the pad */}
            <span
              className="absolute left-[12%] right-[12%] -bottom-3 h-6 rounded-b-md bg-[#B9AA9B] dark:bg-[#3A3434] border-2 border-ink dark:border-cream/70"
              style={{ transform: "perspective(300px) rotateX(38deg)", transformOrigin: "top" }}
            />

            {/* Page-stack thickness */}
            <span className="absolute inset-x-1 top-[18px] -bottom-[6px] rounded-b-lg bg-cream-light dark:bg-[#2A2626] border-2 border-ink dark:border-cream/70" />
            <span className="absolute inset-x-0.5 top-[18px] -bottom-[3px] rounded-b-lg bg-paper dark:bg-[#2E2A2A] border-2 border-ink dark:border-cream/70" />

            {/* Pad */}
            <span className="relative block h-[84px] sm:h-[104px] md:h-[116px] xl:h-[132px] rounded-lg border-2 border-ink dark:border-cream/70 bg-paper dark:bg-ink-card shadow-hard-lg dark:shadow-hard-dark">
              {/* Header strip the rings bite into */}
              <span className="absolute inset-x-0 top-0 h-[14px] rounded-t-md bg-tomato border-b-2 border-ink dark:border-cream/70" />

              {/* Under page: the next card waiting to be revealed */}
              <PageFace title={SKILLS[flipping ? next : index]!} index={flipping ? next : index} />

              {/* The flipping leaf, hinged at the binding */}
              {flipping && (
                <motion.span
                  className="absolute inset-x-0 bottom-0 top-[14px]"
                  style={{ transformOrigin: "50% 0%", transformStyle: "preserve-3d" }}
                  initial={{ rotateX: 0 }}
                  animate={{ rotateX: -180 }}
                  transition={{ duration: FLIP_MS / 1000, ease: [0.45, 0.05, 0.25, 1] }}
                  onAnimationComplete={onFlipDone}
                >
                  {/* Front of the leaf: the current card */}
                  <span
                    className="absolute inset-0 rounded-b-md bg-paper dark:bg-ink-card"
                    style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
                  >
                    <span className="absolute inset-0 -top-[14px]">
                      <PageFace title={SKILLS[index]!} index={index} />
                    </span>
                    {/* Shade darkens as the page lifts off the pad */}
                    <motion.span
                      className="absolute inset-0 rounded-b-md bg-ink"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.22 }}
                      transition={{ duration: FLIP_MS / 2000 }}
                    />
                  </span>
                  {/* Back of the leaf: ruled paper */}
                  <span
                    className="absolute inset-0 rounded-b-md border-2 border-ink dark:border-cream/70 bg-cream-light dark:bg-[#2A2626]"
                    style={{
                      transform: "rotateX(180deg)",
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                      backgroundImage:
                        "repeating-linear-gradient(0deg, transparent 0 13px, rgba(26,26,26,0.12) 13px 14px)",
                    }}
                  />
                </motion.span>
              )}

              {/* Spiral binding: wire loops over the header strip */}
              <span className="absolute -top-[9px] inset-x-5 flex justify-between pointer-events-none">
                {Array.from({ length: 9 }).map((_, i) => (
                  <span key={i} className="relative w-[7px] h-[22px]">
                    <span className="absolute inset-0 rounded-full border-2 border-ink dark:border-cream bg-gradient-to-b from-[#d9d4cf] to-[#7d7873]" />
                    <span className="absolute left-1/2 -translate-x-1/2 bottom-[2px] w-[5px] h-[5px] rounded-full bg-ink dark:bg-ink-deep" />
                  </span>
                ))}
              </span>
            </span>

            <span className="absolute -bottom-7 right-1 font-mono text-[10px] font-bold uppercase tracking-wider text-ink/50 dark:text-cream/50 opacity-0 group-hover:opacity-100 transition-opacity">
              click to flip →
            </span>
          </button>
        </motion.div>
      </div>

      <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,440px)] gap-10 lg:gap-12 items-center mb-14">
        <div>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="font-body text-base sm:text-lg xl:text-xl text-ink/80 dark:text-cream/80 max-w-2xl leading-relaxed mb-8"
        >
          Full-stack developer and CS undergrad (IoT, Cybersecurity &amp; Blockchain) at BMSCE,
          Bengaluru. Currently building realtime dispatch at Orange Taxi; before that, a GPS-denied
          search-and-rescue rover and locomotive-cab computer vision.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center gap-4"
        >
          <button
            type="button"
            onClick={onOpenContact}
            className="group inline-flex items-center gap-3 px-6 py-3.5 rounded-full bg-ink text-cream dark:bg-cream dark:text-ink font-display font-bold text-sm sm:text-base border-2 border-ink dark:border-cream shadow-hard dark:shadow-hard-dark hover:-translate-y-0.5 hover:shadow-hard-lg active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all"
          >
            <span>Say hello</span>
            <span className="w-6 h-6 rounded-full bg-sunny text-ink inline-flex items-center justify-center font-bold text-xs border border-ink group-hover:translate-x-0.5 transition-transform">
              →
            </span>
          </button>

          <button
            type="button"
            onClick={scrollToWorks}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-cream-light dark:bg-ink-card text-ink dark:text-cream font-display font-bold text-sm sm:text-base border-2 border-ink dark:border-cream shadow-hard-sm dark:shadow-hard-dark-sm hover:bg-sunny/40 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
          >
            <span>Explore the doors</span>
            <span aria-hidden="true">↓</span>
          </button>
        </motion.div>
        </div>

        {/* Sticker board: real facts, slapped on like a laptop lid */}
        <motion.ul
          aria-label="Quick facts"
          initial="hidden"
          animate="shown"
          variants={{ shown: { transition: { staggerChildren: 0.08, delayChildren: 0.45 } } }}
          className="relative grid grid-cols-2 gap-3 lg:block lg:h-[290px]"
        >
          {STICKERS.map((st) => (
            <motion.li
              key={st.text}
              variants={{
                hidden: { opacity: 0, scale: 0.6, rotate: 0 },
                shown: { opacity: 1, scale: 1, rotate: st.rot },
              }}
              transition={{ type: "spring", stiffness: 260, damping: 16 }}
              whileHover={reduce ? undefined : { rotate: 0, scale: 1.06, zIndex: 10 }}
              drag={!reduce}
              dragSnapToOrigin
              dragElastic={0.4}
              className={`${st.bg} lg:absolute w-auto lg:whitespace-nowrap px-4 py-3 rounded-xl border-2 border-ink text-ink shadow-hard-lg cursor-grab active:cursor-grabbing select-none`}
              style={{ left: st.x, top: st.y } as React.CSSProperties}
            >
              <span className="block font-mono text-[10px] font-black uppercase tracking-widest opacity-70">{st.label}</span>
              <span className={`block font-display font-black leading-tight ${st.big ? "text-3xl" : "text-sm sm:text-base"}`}>
                {st.text}
              </span>
            </motion.li>
          ))}
        </motion.ul>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="pt-5 border-t-2 border-dashed border-ink/30 dark:border-cream/30 flex flex-wrap items-center justify-between gap-4 font-mono text-xs sm:text-sm text-ink/75 dark:text-cream/75"
      >
        <div className="inline-flex items-center gap-2" aria-label="Local time in Bengaluru">
          <span className="font-bold">BLR</span>
          <span className="inline-flex items-center gap-[2px] px-2 py-0.5 rounded-md bg-ink text-sunny dark:bg-cream dark:text-ink border-2 border-ink dark:border-cream tnum font-bold min-w-[118px] justify-center">
            {clock ? (
              <>
                <span>{clock.hh}</span>
                <span className="opacity-60">:</span>
                <span>{clock.mm}</span>
                <span className="opacity-60">:</span>
                <span>{clock.ss}</span>
                <span className="ml-1 text-[10px] uppercase">{clock.period}</span>
              </>
            ) : (
              <span>--:--:--</span>
            )}
          </span>
          <span className="hidden sm:inline">IST · Bengaluru, India</span>
        </div>
        <button
          type="button"
          onClick={scrollToWorks}
          className="hover:text-ink dark:hover:text-cream inline-flex items-center gap-1 font-bold underline underline-offset-4"
        >
          <span>Scroll to explore</span>
          <span aria-hidden="true">↓</span>
        </button>
      </motion.div>
    </section>
  );
}
