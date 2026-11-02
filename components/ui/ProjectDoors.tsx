"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface DoorProject {
  id: string;
  doorNumber: string;
  doorColor: string;
  doorColorDark: string;
  brassTitle: string;
  projectName: string;
  tagline: string;
  category: string;
  role: string;
  stack: string[];
  description: string;
  metrics: string[];
  liveUrl?: string;
  repoUrl?: string;
  badge?: string;
}

export const DOORS_DATA: DoorProject[] = [
  {
    id: "orange-taxi",
    doorNumber: "01",
    doorColor: "#22304A",
    doorColorDark: "#182236",
    brassTitle: "FULL-STACK WEB",
    projectName: "Orange Taxi: Electric Ride-Hailing PWA",
    tagline: "Pre-launch premium 100% electric cab service in Delhi NCR.",
    category: "Full-Stack Web & PWA",
    role: "Full-Stack Developer Intern",
    stack: ["React", "TypeScript", "TanStack Start", "Supabase Realtime", "PostgreSQL", "Tailwind CSS"],
    description:
      "Engineered the complete production dispatch system: real-time WebSocket ride requests, live driver geolocation streaming, in-ride instant chat, and an in-app dynamic UPI QR payment flow for cash handover reconciliation.",
    metrics: ["Sub-100ms dispatch latency", "100% PWA offline resilience", "Dynamic UPI QR flow"],
    liveUrl: "https://orange-taxi.com",
    badge: "Current: Internship",
  },
  {
    id: "autonomous-rescue-robot",
    doorNumber: "02",
    doorColor: "#4A3540",
    doorColorDark: "#37252F",
    brassTitle: "AUTONOMOUS ROBOTICS",
    projectName: "Autonomous Search & Rescue Robot",
    tagline: "Disaster reconnaissance in GPS-denied collapsed environments.",
    category: "IoT / Embedded Robotics",
    role: "Robotics & Embedded Engineer",
    stack: ["C/C++", "Microcontrollers", "LiDAR", "Sensor Fusion", "Path Planning", "Telemetry"],
    description:
      "Designed and fabricated an autonomous disaster-zone rover capable of obstacle avoidance, subterranean survivor telemetry transmission, and deterministic path exploration where GPS satellite signals are completely blocked.",
    metrics: ["GPS-denied navigation", "Multi-sensor fusion array", "Fail-safe autonomous logic"],
    repoUrl: "https://github.com/akshat0709/AutonomousSearchAndRescueRobot",
    badge: "Mid & Early 2026",
  },
  {
    id: "animal-detection",
    doorNumber: "03",
    doorColor: "#4E5A47",
    doorColorDark: "#394234",
    brassTitle: "COMPUTER VISION",
    projectName: "Animal Detection in Locomotive Tracks",
    tagline: "Real-time cab camera computer vision alerts to prevent collisions.",
    category: "AI & Computer Vision",
    role: "Computer Vision Developer",
    stack: ["Python", "OpenCV", "YOLO", "Edge Inference", "Real-Time Telemetry", "Video Pipeline"],
    description:
      "Engineered an automated visual surveillance pipeline that processes live camera feeds from locomotive cabs. Employs deep learning object detection with low-latency inference to alert train drivers and prevent fatal wildlife collisions on remote tracks.",
    metrics: ["Real-time cab stream processing", "High-recall wildlife inference", "Low-latency alert trigger"],
    repoUrl: "https://github.com/akshat0709/AnimalDetection",
    badge: "2025 Project",
  },
  {
    id: "assistive-wheelchair",
    doorNumber: "04",
    doorColor: "#8C4826",
    doorColorDark: "#6E381D",
    brassTitle: "ASSISTIVE TECH",
    projectName: "Smart Assistive Mobility Platform",
    tagline: "National Science Exhibition Award-winning assistive mobility.",
    category: "Hardware & Accessibility",
    role: "INSPIRE National Awardee",
    stack: ["Microcontrollers", "Ultrasonic Arrays", "Motor Drivers", "Assistive Sensors"],
    description:
      "Engineered a safety-critical smart assistive wheelchair system equipped with obstacle clearance sensing, emergency stopping, and intuitive navigational aids for individuals with restricted mobility. Awarded the prestigious INSPIRE Award by the Department of Science & Technology, Government of India.",
    metrics: ["INSPIRE Award (Rs 10,000)", "National Science Exhibition Winner", "Zero-collision collision mesh"],
    badge: "National Award Winner",
  },
  {
    id: "the-workshop",
    doorNumber: "05",
    doorColor: "#201F1D",
    doorColorDark: "#151413",
    brassTitle: "THE WORKSHOP",
    projectName: "Creative Lab & Interactive Experiments",
    tagline: "Verlet physics, interactive doodles, and reactive prototypes.",
    category: "Creative Engineering",
    role: "Creative Developer",
    stack: ["TypeScript", "Next.js", "Web Audio API", "Canvas Physics", "Framer Motion"],
    description:
      "A workshop of tactile engineering experiments: an authentic Verlet-rope ceiling switch, 3D mechanical desk flip calendars, draggable physics stickers, and custom audio synthesizers without external runtime bloat.",
    metrics: ["100% Canvas Verlet physics", "60 FPS GPU-accelerated motion", "Pure Web Audio synthesis"],
    badge: "Interactive Lab",
  },
];

interface ProjectDoorsProps {
  onSelectProject: (project: DoorProject) => void;
}

export function ProjectDoors({ onSelectProject }: ProjectDoorsProps) {
  const [activeDoor, setActiveDoor] = useState<string | null>(null);
  const [hoveredDoor, setHoveredDoor] = useState<string | null>(null);

  const handleDoorClick = (project: DoorProject) => {
    setActiveDoor(project.id);
    onSelectProject(project);
  };

  return (
    <section id="works" className="relative py-20 px-4 sm:px-6 md:px-10 max-w-7xl mx-auto overflow-hidden">
      {/* Section Header */}
      <div className="mb-14">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-3 py-1 rounded-full bg-sunny text-charcoal font-mono text-xs font-bold border border-charcoal shadow-hard-sm">
            02 / Works Wall
          </span>
          <span className="font-mono text-xs uppercase tracking-wider text-charcoal/60 dark:text-stone-light/60">
            One door per discipline
          </span>
        </div>

        <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-charcoal dark:text-stone-light tracking-tight">
          Magic happens <br className="hidden sm:inline" />
          behind the doors.
        </h2>
        <p className="font-body text-sm sm:text-base text-charcoal/75 dark:text-stone-light/75 max-w-xl mt-3 leading-relaxed">
          Hover a door to crack it open. Click to step inside the room and inspect the system architecture, code, and live platform.
        </p>
      </div>

      {/* The Architectural Doors Row */}
      <div className="relative pt-6 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-5 lg:gap-4 items-end">
          {DOORS_DATA.map((door) => {
            const isHovered = hoveredDoor === door.id;
            const isOpen = activeDoor === door.id;

            return (
              <div
                key={door.id}
                className="flex flex-col items-center group cursor-pointer"
                onMouseEnter={() => setHoveredDoor(door.id)}
                onMouseLeave={() => setHoveredDoor(null)}
                onClick={() => handleDoorClick(door)}
              >
                {/* Door Casing / Architrave Frame (Perspective Container) */}
                <div
                  className="relative w-full max-w-[220px] h-[340px] sm:h-[380px] p-2 bg-[#D1C7BF] dark:bg-[#282424] rounded-t-2xl border-2 border-charcoal dark:border-stone-line shadow-hard-lg flex flex-col justify-end perspective-1000 overflow-visible"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Recessed Room Interior (visible when door opens) */}
                  <div
                    className="absolute inset-2 top-3 rounded-t-xl overflow-hidden pointer-events-none flex flex-col justify-between p-3"
                    style={{
                      background: `radial-gradient(ellipse at 50% 20%, ${door.doorColor}99 0%, #0A0A0A 80%)`,
                    }}
                  >
                    {/* Room interior light atmosphere */}
                    <div className="text-center pt-4">
                      <span className="inline-block px-2 py-0.5 rounded bg-black/50 text-[10px] font-mono text-sunny border border-sunny/30 uppercase tracking-widest font-bold">
                        Room {door.doorNumber}
                      </span>
                      <p className="text-xs font-display font-bold text-white mt-2 leading-tight">
                        {door.projectName}
                      </p>
                    </div>

                    <div className="text-center pb-2">
                      <span className="inline-flex items-center gap-1 text-[11px] font-mono text-stone-light font-bold underline underline-offset-2">
                        Step Inside →
                      </span>
                    </div>
                  </div>

                  {/* 3D Hinged Door Leaf */}
                  <div
                    className={`relative w-full h-full rounded-t-xl border-2 border-charcoal/80 flex flex-col justify-between p-4 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] origin-left select-none ${
                      isOpen
                        ? "-rotate-y-[85deg]"
                        : isHovered
                        ? "-rotate-y-[22deg]"
                        : "rotate-y-0"
                    }`}
                    style={{
                      backgroundColor: door.doorColor,
                      boxShadow: isHovered
                        ? "inset 2px 0 8px rgba(255,255,255,0.2), 8px 4px 14px rgba(0,0,0,0.4)"
                        : "inset 0 1px 0 rgba(255,255,255,0.15), inset 0 -2px 0 rgba(0,0,0,0.3)",
                      transformStyle: "preserve-3d",
                    }}
                  >
                    {/* Top Door Number */}
                    <div className="flex justify-between items-center text-white/50 font-mono text-xs font-bold">
                      <span>No.</span>
                      <span>{door.doorNumber}</span>
                    </div>

                    {/* Engraved Brass Nameplate */}
                    <div className="brass-plate my-auto py-2 px-2.5 rounded border border-[#8C6418] text-center shadow-md">
                      <span className="font-mono text-[10px] sm:text-[11px] font-black tracking-wider uppercase block">
                        {door.brassTitle}
                      </span>
                    </div>

                    {/* Brass Lever Handle & Keyhole Lock */}
                    <div className="flex items-center justify-between pt-4">
                      <div className="w-1.5" />
                      <div className="flex flex-col items-center gap-1">
                        {/* Brass Lever */}
                        <div
                          className={`w-7 h-2 rounded-full bg-gradient-to-r from-[#F0D59A] via-[#D8A84E] to-[#996D1E] border border-black/40 shadow-md transition-transform duration-200 ${
                            isHovered ? "rotate-12" : "rotate-0"
                          }`}
                        />
                        {/* Brass Escutcheon Keyhole */}
                        <div className="w-3.5 h-5 rounded-full bg-[#D8A84E] border border-[#8C6418] flex items-center justify-center shadow-inner">
                          <div className="w-1 h-2 bg-[#261B07] rounded-sm" />
                        </div>
                      </div>
                    </div>

                    {/* Bottom Sill Light Leak Line */}
                    <div
                      className={`absolute bottom-0 left-0 right-0 h-1 bg-sunny transition-opacity duration-300 ${
                        isHovered || isOpen ? "opacity-100 shadow-[0_0_12px_#FFD13B]" : "opacity-30"
                      }`}
                    />
                  </div>
                </div>

                {/* Light Spill Pool on the Floor */}
                <div
                  className={`w-3/4 h-8 rounded-full bg-gradient-to-b from-sunny/60 via-sunny/20 to-transparent blur-md -mt-2 transition-all duration-500 pointer-events-none ${
                    isOpen
                      ? "opacity-100 scale-x-125 scale-y-150"
                      : isHovered
                      ? "opacity-75 scale-110"
                      : "opacity-15 scale-90"
                  }`}
                />

                {/* Door Label Beneath */}
                <div className="text-center mt-3">
                  <span className="font-display font-black text-xs sm:text-sm text-charcoal dark:text-stone-light block group-hover:text-teal transition-colors">
                    {door.projectName}
                  </span>
                  <span className="font-mono text-[11px] text-charcoal/60 dark:text-stone-light/60">
                    {door.category}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
