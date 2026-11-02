"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Milestone {
  id: string;
  year: string;
  timeframe: string;
  headline: string;
  organization: string;
  role: string;
  location: string;
  summary: string;
  highlights: string[];
  color: string;
  badge: string;
  tabLabel: string;
}

const MILESTONES: Milestone[] = [
  {
    id: "orange-taxi-2026",
    year: "2026",
    timeframe: "Sep 2026 — Present",
    headline: "Orange Taxi: Electric Ride-Hailing Dispatch",
    organization: "Orange Taxi (Pre-Launch Electric Fleet)",
    role: "Full-Stack Developer Intern",
    location: "Delhi NCR · Remote",
    summary:
      "Designed and delivered the complete production software stack as a PWA for a premium 100% electric cab service. Implemented sub-100ms real-time dispatch, live driver coordinate telemetry via Supabase Realtime WebSocket channels, and an in-app dynamic UPI QR payment flow for driver cash handovers.",
    highlights: [
      "Supabase Realtime dispatch engine & in-ride chat",
      "Dynamic UPI QR payment handover reconciliation",
      "TanStack Start + React + PostgreSQL architecture",
    ],
    color: "#FFD13B", // sunny
    badge: "Current: Internship",
    tabLabel: "Now (Intern)",
  },
  {
    id: "rescue-robot-2026",
    year: "2026",
    timeframe: "Early — Mid 2026",
    headline: "Autonomous Search & Rescue Robot",
    organization: "Independent Robotics Engineering",
    role: "Robotics & Embedded Systems Developer",
    location: "Bengaluru, India",
    summary:
      "Engineered an autonomous disaster exploration rover capable of obstacle mapping and transmitting telemetry in subterranean and collapsed zones where GPS satellite signals are completely blocked.",
    highlights: [
      "LiDAR & multi-sensor fusion in GPS-denied environments",
      "Subterranean telemetry streaming & path planning logic",
      "Fail-safe decision state machine for disaster response",
    ],
    color: "#0A524D", // teal
    badge: "Mid & Early 2026",
    tabLabel: "Mid '26 (Rover)",
  },
  {
    id: "locomotive-2025",
    year: "2025",
    timeframe: "2025",
    headline: "Animal Detection in Locomotive Tracks",
    organization: "Railway Safety & Computer Vision Research",
    role: "Computer Vision Developer",
    location: "Bengaluru, India",
    summary:
      "Engineered an automated real-time computer vision system processing live video streams from locomotive cabs. Employs deep learning object detection with instant audio/visual telemetry to alert train drivers and prevent tragic track wildlife collisions.",
    highlights: [
      "Low-latency cab video stream inference pipeline",
      "Python, OpenCV & YOLO edge detection models",
      "Real-time locomotive cab alerts & collision prevention",
    ],
    color: "#C92A1D", // tomato
    badge: "2025 Project",
    tabLabel: "2025 (Vision)",
  },
  {
    id: "bmsce-2024",
    year: "2024",
    timeframe: "2024 — 2028",
    headline: "CS Undergrad at BMS College of Engineering",
    organization: "BMS College of Engineering",
    role: "B.E. Student (IoT, Cybersecurity & Blockchain)",
    location: "Bengaluru, India",
    summary:
      "Pursuing a Bachelor of Engineering with an exceptional 8.97 CGPA. Deep-diving into operating systems, distributed architectures, network cryptography, microcontroller assembly, and decentralized protocols while building production systems.",
    highlights: [
      "Academic Standing: CGPA 8.97 / 10",
      "Core focus: IoT, Cybersecurity & Blockchain (Class of '28)",
      "Autonomous systems and embedded robotics laboratory work",
    ],
    color: "#4A3540", // plum
    badge: "Academics & Honors",
    tabLabel: "2024 (BMSCE)",
  },
  {
    id: "inspire-2022",
    year: "2022",
    timeframe: "2022",
    headline: "National INSPIRE Award for Assistive Mobility",
    organization: "Department of Science & Technology, Govt. of India",
    role: "Hardware & Safety Designer",
    location: "New Delhi, India",
    summary:
      "Engineered an intelligent assistive smart wheelchair equipped with collision-prevention sensors and emergency automated braking for individuals with severe mobility impairments. Recognized nationally and granted the Rs 10,000 INSPIRE Award.",
    highlights: [
      "Awarded Rs 10,000 national merit grant",
      "Selected at the National Science Exhibition",
      "Ultrasonic safety mesh and intuitive navigation logic",
    ],
    color: "#8C4826", // terracotta
    badge: "National Award",
    tabLabel: "2022 (Award)",
  },
];

export function StoryTimeline() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeMilestone = MILESTONES[activeIndex] || MILESTONES[0];

  return (
    <section id="about" className="relative py-20 px-4 sm:px-6 md:px-10 max-w-6xl mx-auto overflow-hidden">
      {/* Section Header */}
      <div className="mb-12">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-3 py-1 rounded-full bg-stone-mid dark:bg-charcoal-light text-charcoal dark:text-stone-light font-mono text-xs font-bold border border-charcoal/20">
            03 / Timeline
          </span>
          <span className="font-mono text-xs uppercase tracking-wider text-charcoal/60 dark:text-stone-light/60">
            Engineering Journey
          </span>
        </div>

        <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-charcoal dark:text-stone-light tracking-tight">
          Let&apos;s go back in time.
        </h2>
        <p className="font-body text-sm sm:text-base text-charcoal/75 dark:text-stone-light/75 max-w-xl mt-3 leading-relaxed">
          From a national science exhibition award to locomotive computer vision and production electric cab dispatch.
        </p>
      </div>

      {/* Main Odometer Stage & Timeline Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Rolling Odometer & Year Navigation */}
        <div className="lg:col-span-5 bg-stone-light dark:bg-charcoal-light p-6 sm:p-8 rounded-2xl border-2 border-charcoal dark:border-stone-line shadow-hard">
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-charcoal/60 dark:text-stone-light/60 block mb-2">
            Selected Era
          </span>

          {/* ============ Mechanical Odometer Display ============ */}
          <div className="flex items-center gap-2 py-4 mb-6 border-y border-charcoal/15 dark:border-stone-line/20">
            <span className="font-mono text-5xl sm:text-7xl font-black text-charcoal dark:text-stone-light tracking-tighter tnum">
              {activeMilestone.year}
            </span>
            <div className="text-left pl-2">
              <span className="block font-mono text-xs font-bold text-teal dark:text-sunny uppercase">
                {activeMilestone.timeframe}
              </span>
              <span className="block font-mono text-[11px] text-charcoal/60 dark:text-stone-light/60">
                {activeMilestone.location}
              </span>
            </div>
          </div>

          {/* Quick Era Navigation Buttons */}
          <div className="space-y-2">
            <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-charcoal/50 dark:text-stone-light/50 block mb-1">
              Select Milestone
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2">
              {MILESTONES.map((m, idx) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  className={`p-3 rounded-xl border-2 font-mono text-left transition-all flex items-center justify-between ${
                    activeIndex === idx
                      ? "bg-charcoal text-stone-light dark:bg-stone-light dark:text-charcoal border-charcoal dark:border-stone-light shadow-hard-sm"
                      : "bg-paper dark:bg-charcoal border-charcoal/20 dark:border-stone-line/20 text-charcoal dark:text-stone-light hover:border-charcoal hover:bg-stone-light/50"
                  }`}
                >
                  <div>
                    <span className="block text-base font-black tnum">{m.year}</span>
                    <span className="block text-xs font-bold truncate opacity-90">{m.tabLabel}</span>
                  </div>
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-black/10 dark:bg-white/10">
                    {m.timeframe}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Active Milestone Card */}
        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeMilestone.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="p-6 sm:p-8 rounded-2xl bg-paper dark:bg-charcoal border-2 border-charcoal dark:border-stone-line shadow-hard-lg"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <span className="px-3 py-1 rounded-full bg-sunny text-charcoal border border-charcoal font-mono text-xs font-bold">
                  {activeMilestone.badge}
                </span>
                <span className="font-mono text-xs font-bold text-teal dark:text-sunny">
                  {activeMilestone.timeframe}
                </span>
              </div>

              <h3 className="font-display font-black text-2xl sm:text-3xl text-charcoal dark:text-stone-light tracking-tight mb-1">
                {activeMilestone.headline}
              </h3>
              <p className="font-mono text-xs sm:text-sm font-bold text-charcoal/70 dark:text-stone-light/70 mb-4">
                {activeMilestone.role} · {activeMilestone.organization}
              </p>

              <p className="font-body text-sm sm:text-base text-charcoal/85 dark:text-stone-light/85 leading-relaxed mb-6">
                {activeMilestone.summary}
              </p>

              <div className="space-y-2 pt-4 border-t border-charcoal/15 dark:border-stone-line/20">
                <h4 className="font-mono text-xs uppercase tracking-wider font-bold text-charcoal/60 dark:text-stone-light/60">
                  Key Milestones &amp; Responsibilities
                </h4>
                <ul className="space-y-2">
                  {activeMilestone.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2.5 font-body text-xs sm:text-sm text-charcoal/90 dark:text-stone-light/90">
                      <span className="text-teal font-black text-sm" aria-hidden="true">
                        ✓
                      </span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
