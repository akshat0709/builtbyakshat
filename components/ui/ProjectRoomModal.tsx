"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { DoorProject } from "./ProjectDoors";

interface ProjectRoomModalProps {
  project: DoorProject | null;
  onClose: () => void;
}

export function ProjectRoomModal({ project, onClose }: ProjectRoomModalProps) {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (project) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="room-title"
      >
        {/* Scrim backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 24 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-2xl bg-paper dark:bg-charcoal border-2 border-charcoal dark:border-stone-line rounded-2xl shadow-hard-xl dark:shadow-[8px_8px_0px_#FFF6E5] overflow-hidden z-10 my-auto"
        >
          {/* Header Bar styled with the Door's signature color */}
          <div
            className="p-5 sm:p-6 border-b-2 border-charcoal dark:border-stone-line text-white flex items-center justify-between"
            style={{ backgroundColor: project.doorColor }}
          >
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-0.5 rounded-full bg-black/40 border border-white/20 font-mono text-xs font-bold uppercase tracking-wider text-sunny">
                Room {project.doorNumber}
              </span>
              <span className="font-mono text-xs font-bold text-white/80">
                {project.category}
              </span>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 border border-white/30 text-white font-mono text-sm font-bold flex items-center justify-center transition-colors"
              aria-label="Close project room"
            >
              ✕
            </button>
          </div>

          {/* Modal Content */}
          <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
            {/* Title & Tagline */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                {project.badge && (
                  <span className="px-2.5 py-0.5 rounded-full bg-sunny text-charcoal border border-charcoal font-mono text-[10px] font-bold">
                    {project.badge}
                  </span>
                )}
                <span className="font-mono text-xs font-bold text-teal dark:text-sunny">
                  Role: {project.role}
                </span>
              </div>
              <h3
                id="room-title"
                className="font-display font-black text-2xl sm:text-3xl text-charcoal dark:text-stone-light tracking-tight"
              >
                {project.projectName}
              </h3>
              <p className="font-body text-sm sm:text-base text-charcoal/80 dark:text-stone-light/80 mt-1 leading-relaxed">
                {project.tagline}
              </p>
            </div>

            {/* Description */}
            <div className="p-4 rounded-xl bg-stone-light dark:bg-charcoal-light border border-charcoal/20 dark:border-stone-line/20">
              <h4 className="font-mono text-xs uppercase tracking-wider font-bold text-charcoal/60 dark:text-stone-light/60 mb-2">
                System Deep-Dive
              </h4>
              <p className="font-body text-xs sm:text-sm text-charcoal/90 dark:text-stone-light/90 leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Metrics & Highlights */}
            <div>
              <h4 className="font-mono text-xs uppercase tracking-wider font-bold text-charcoal/60 dark:text-stone-light/60 mb-3">
                Key Engineering Highlights
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {project.metrics.map((m, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-lg bg-paper dark:bg-charcoal-light border border-charcoal/30 dark:border-stone-line/30 shadow-hard-sm"
                  >
                    <span className="font-mono text-[10px] font-bold text-teal block">
                      0{i + 1}
                    </span>
                    <span className="font-body text-xs font-bold text-charcoal dark:text-stone-light">
                      {m}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack Chips */}
            <div>
              <h4 className="font-mono text-xs uppercase tracking-wider font-bold text-charcoal/60 dark:text-stone-light/60 mb-3">
                Technologies Used
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-full bg-paper dark:bg-charcoal-light border border-charcoal/40 dark:border-stone-line/40 font-mono text-xs font-bold text-charcoal dark:text-stone-light shadow-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* External Links */}
            <div className="pt-4 border-t border-charcoal/15 dark:border-stone-line/20 flex flex-wrap items-center gap-3">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-teal text-white border-2 border-charcoal font-mono text-xs font-bold shadow-hard-sm hover:shadow-hard transition-all hover:-translate-y-0.5"
                >
                  <span>Launch Live Platform</span>
                  <span aria-hidden="true">↗</span>
                </a>
              )}
              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-paper dark:bg-charcoal-light text-charcoal dark:text-stone-light border-2 border-charcoal dark:border-stone-line font-mono text-xs font-bold shadow-hard-sm hover:shadow-hard transition-all hover:-translate-y-0.5"
                >
                  <span>Inspect GitHub Repository</span>
                  <span aria-hidden="true">↗</span>
                </a>
              )}
              <button
                type="button"
                onClick={onClose}
                className="ml-auto px-4 py-2 text-xs font-mono font-bold text-charcoal/70 dark:text-stone-light/70 hover:underline"
              >
                Close Room (Esc)
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
