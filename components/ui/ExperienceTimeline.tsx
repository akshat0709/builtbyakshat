"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { builderProfile } from "@/data/profile";
import { TaxiDoodle } from "@/components/doodles/TaxiDoodle";
import { ProductStatus } from "@/data/products";

export function ExperienceTimeline() {
  const { experience } = builderProfile;
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [openNotes, setOpenNotes] = useState<Record<number, boolean>>({});

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  // Taxi drives smoothly down the timeline line based on user scroll
  const taxiTopPercent = useTransform(scrollYProgress, [0, 1], ["0%", "88%"]);

  const toggleNote = (index: number) => {
    setOpenNotes((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const formatStatus = (status: ProductStatus) => {
    switch (status) {
      case "live":
        return "Live";
      case "pre-launch":
        return "Pre-launch";
      case "prototype":
        return "Prototype";
      default:
        return status;
    }
  };

  const getStatusBadgeStyle = (status: ProductStatus) => {
    switch (status) {
      case "live":
        return "bg-teal text-white border-ink";
      case "pre-launch":
        return "bg-sunny text-ink border-ink";
      case "prototype":
        return "bg-tomato text-white border-ink";
    }
  };

  return (
    <section
      id="experience"
      ref={containerRef}
      aria-labelledby="experience-heading"
      className="relative py-12 md:py-16 overflow-hidden"
    >
      {/* Background oversized word */}
      <div
        className="absolute top-4 right-0 text-7xl sm:text-8xl md:text-9xl font-display font-black text-ink/[0.04] dark:text-cream/[0.04] select-none pointer-events-none tracking-tighter"
        aria-hidden="true"
      >
        EXPERIENCE.
      </div>

      <div className="flex items-center justify-between mb-10">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-teal font-bold block mb-1">
            01 / Proven Systems
          </span>
          <h2
            id="experience-heading"
            className="text-2xl sm:text-3xl font-display font-black text-ink dark:text-cream tracking-tight"
          >
            Work Experience
          </h2>
        </div>
      </div>

      {/* Main timeline container with thick ink line */}
      <div className="relative pl-7 sm:pl-10 border-l-[3.5px] border-ink dark:border-cream/40 space-y-12">
        {/* Driving Taxi Doodle: drives down the line as user scrolls */}
        <motion.div
          style={shouldReduceMotion ? { top: "0%" } : { top: taxiTopPercent }}
          className="absolute -left-[30px] sm:-left-[35px] z-10 pointer-events-none select-none transition-none"
          aria-hidden="true"
        >
          <div className="p-1 rounded-full bg-cream-light dark:bg-ink-deep border-ink border shadow-hard-sm">
            <TaxiDoodle className="w-12 h-8 sm:w-14 sm:h-9" decorative />
          </div>
        </motion.div>

        {experience.map((item, index) => {
          const hasRealNote =
            item.builderNote &&
            !item.builderNote.includes("[PLACEHOLDER]") &&
            item.builderNote.trim().length > 0;
          const isNoteOpen = !!openNotes[index];

          return (
            <article
              key={`${item.company}-${index}`}
              className="relative group bg-cream-light dark:bg-ink-card border-ink border-2 rounded-2xl p-6 sm:p-8 shadow-hard-lg dark:shadow-hard-dark-lg rotate-[-0.5deg] hover:rotate-0 hover:-translate-y-1.5 transition-all duration-200"
            >
              {/* Header: Role, Company, Status, Period */}
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 mb-3">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h3 className="text-xl sm:text-2xl font-display font-black text-ink dark:text-cream">
                      {item.role}
                    </h3>
                    <span
                      className={`px-3 py-0.5 rounded-full border text-xs font-mono font-bold shadow-hard-sm dark:shadow-hard-dark-sm ${getStatusBadgeStyle(
                        item.status
                      )}`}
                    >
                      {formatStatus(item.status)}
                    </span>
                  </div>
                  <div className="text-sm font-mono font-bold text-ink/80 dark:text-cream/80">
                    {item.company}
                  </div>
                </div>

                <div className="self-start sm:self-auto px-3 py-1 rounded-full bg-sunny text-ink border-ink border-2 text-xs font-mono font-bold shadow-hard-sm dark:shadow-hard-dark-sm">
                  {item.startDate} — {item.endDate}
                </div>
              </div>

              {/* Description */}
              <p className="text-sm sm:text-base font-body text-ink/90 dark:text-cream/90 leading-relaxed my-4">
                {item.description}
              </p>

              {/* Stack tags with wobble on hover */}
              <div className="pt-2 mb-5">
                <span className="text-xs font-mono uppercase tracking-wider text-ink/80 dark:text-cream/80 font-bold block mb-2">
                  Stack
                </span>
                <div className="flex flex-wrap gap-2" aria-label="Technologies used">
                  {item.stack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-lg bg-paper dark:bg-ink-deep border-ink border text-xs font-mono text-ink dark:text-cream font-medium shadow-hard-sm dark:shadow-hard-dark-sm hover:animate-wobble cursor-default select-none"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom bar: builder's note sticker flip + verify links */}
              <div className="pt-4 border-t border-ink/15 dark:border-cream/15 flex flex-wrap items-center justify-between gap-4">
                {/* Verification Links */}
                {item.verifyLinks && item.verifyLinks.length > 0 && (
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-xs font-mono text-ink/80 dark:text-cream/80 font-bold">
                      Verify:
                    </span>
                    {item.verifyLinks.map((verify) => (
                      <a
                        key={verify.url}
                        href={verify.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-mono font-semibold text-ink dark:text-cream hover:text-teal underline underline-offset-4 decoration-ink/40 hover:decoration-teal transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ink"
                      >
                        <span>{verify.label}</span>
                        <span aria-hidden="true" className="text-[10px]">↗</span>
                      </a>
                    ))}
                  </div>
                )}

                {/* Quiet Builder's Note Sticker Button (hidden if placeholder) */}
                {hasRealNote && (
                  <button
                    onClick={() => toggleNote(index)}
                    type="button"
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sunny/30 dark:bg-sunny/20 border-ink border text-xs font-mono font-bold text-ink dark:text-cream hover:bg-sunny shadow-hard-sm active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
                  >
                    <span>✍ {isNoteOpen ? "Close note ▲" : "Builder's note ▼"}</span>
                  </button>
                )}
              </div>

              {/* Flipped open builder's note card */}
              {hasRealNote && isNoteOpen && (
                <div className="mt-4 p-4 rounded-xl bg-[#FFFDE8] dark:bg-ink-deep border-ink border-2 shadow-hard-sm text-xs sm:text-sm font-body italic leading-relaxed text-ink/90 dark:text-cream/90 rotate-[-1deg]">
                  <span className="font-mono text-xs font-bold text-teal block not-italic mb-1">
                    First-Person Decision Note:
                  </span>
                  &ldquo;{item.builderNote}&rdquo;
                </div>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}
