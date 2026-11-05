"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

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
    projectName: "Orange Taxi: Electric Ride-Hailing",
    tagline: "Dispatch engine for a pre-launch, all-electric cab service in Delhi NCR.",
    category: "Full-Stack Web & PWA",
    role: "Full-Stack Developer Intern (Sep 2026 — Present)",
    stack: ["Next.js", "TypeScript", "Supabase Realtime", "Nitro", "PostgreSQL", "Tailwind CSS"],
    description:
      "Building the ride dispatch engine: realtime ride requests and driver location streaming over Supabase Realtime channels, Nitro server routes for dispatch logic, in-ride chat, and an in-app UPI QR flow for reconciling driver cash handovers.",
    metrics: ["Realtime dispatch over Supabase channels", "Nitro backend for dispatch logic", "In-app UPI QR handover flow"],
    liveUrl: "https://orange-taxi.com",
    badge: "Now: Internship",
  },
  {
    id: "autonomous-rescue-robot",
    doorNumber: "02",
    doorColor: "#4A3540",
    doorColorDark: "#37252F",
    brassTitle: "AUTONOMOUS ROBOTICS",
    projectName: "Autonomous Search & Rescue Robot",
    tagline: "A disaster-zone rover built to explore where GPS can't reach.",
    category: "IoT / Embedded Robotics",
    role: "Robotics & Embedded Developer",
    stack: ["C/C++", "Microcontrollers", "LiDAR", "Sensor Fusion", "Path Planning", "Telemetry"],
    description:
      "An autonomous rover for collapsed and subterranean disaster zones: obstacle avoidance, sensor-fused navigation without GPS, and telemetry back to responders.",
    metrics: ["GPS-denied navigation", "Multi-sensor fusion", "Fail-safe autonomy state machine"],
    repoUrl: "https://github.com/akshat0709/AutonomousSearchAndRescueRobot",
    badge: "Early — Mid 2026",
  },
  {
    id: "animal-detection",
    doorNumber: "03",
    doorColor: "#4E5A47",
    doorColorDark: "#394234",
    brassTitle: "COMPUTER VISION",
    projectName: "Animal Detection in Locomotive Tracks",
    tagline: "Real-time inference on locomotive cab video to warn drivers of animals on the track.",
    category: "AI & Computer Vision",
    role: "Computer Vision Developer",
    stack: ["Python", "OpenCV", "YOLO", "Edge Inference", "Video Pipeline"],
    description:
      "A vision pipeline that runs object detection on live video from the locomotive cab and raises an alert for the driver when an animal is detected on or near the track.",
    metrics: ["Live cab video inference", "Object detection with YOLO", "Driver alert trigger"],
    repoUrl: "https://github.com/akshat0709/AnimalDetection",
    badge: "2025",
  },
  {
    id: "assistive-wheelchair",
    doorNumber: "04",
    doorColor: "#8C4826",
    doorColorDark: "#6E381D",
    brassTitle: "ASSISTIVE TECH",
    projectName: "Assistive Smart Wheelchair",
    tagline: "The project behind the 2022 National INSPIRE Award.",
    category: "Hardware & Accessibility",
    role: "INSPIRE Awardee",
    stack: ["Microcontrollers", "Ultrasonic Sensors", "Motor Drivers"],
    description:
      "A smart wheelchair with ultrasonic obstacle sensing and automatic emergency stopping for people with limited mobility. Recognised with the National INSPIRE Award (Rs 10,000) from the Department of Science & Technology, Government of India.",
    metrics: ["National INSPIRE Award (2022)", "Rs 10,000 DST prize", "Obstacle sensing + auto stop"],
    badge: "2022 · Award",
  },
  {
    id: "the-workshop",
    doorNumber: "05",
    doorColor: "#201F1D",
    doorColorDark: "#151413",
    brassTitle: "THE WORKSHOP",
    projectName: "This Site: Interactive Workshop",
    tagline: "Verlet physics, flip calendars, and other tactile experiments.",
    category: "Creative Engineering",
    role: "Designer & Developer",
    stack: ["TypeScript", "Next.js", "Web Audio API", "Canvas", "Framer Motion"],
    description:
      "The site you're on: a Verlet-rope pull switch with synthesized clicks, a desk flip calendar, these doors, and a rolling odometer, all without external audio or 3D libraries.",
    metrics: ["Canvas Verlet rope", "Web Audio synthesis", "Zero 3D dependencies"],
    repoUrl: "https://github.com/akshat0709/builtbyakshat",
    badge: "Lab",
  },
];

const OPEN_DELAY_MS = 460;

interface ProjectDoorsProps {
  onSelectProject: (project: DoorProject) => void;
  /** Id of the project whose room is currently open (null when the room modal is closed). */
  openDoorId?: string | null;
}

function Door({
  door,
  state,
  onActivate,
  buttonRef,
}: {
  door: DoorProject;
  state: "closed" | "ajar" | "open";
  onActivate: () => void;
  buttonRef: (el: HTMLButtonElement | null) => void;
}) {
  const [hover, setHover] = useState(false);
  const visual = state === "open" ? "open" : hover || state === "ajar" ? "ajar" : "closed";
  const angle = visual === "open" ? -104 : visual === "ajar" ? -26 : 0;
  const light = visual === "open" ? 1 : visual === "ajar" ? 0.55 : 0;

  return (
    <div className="flex flex-col items-center">
      <button
        ref={buttonRef}
        type="button"
        onClick={onActivate}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onFocus={() => setHover(true)}
        onBlur={() => setHover(false)}
        aria-label={`Door ${door.doorNumber}: ${door.projectName}. Open the room.`}
        className="group relative w-full max-w-[210px] focus-visible:outline-none"
      >
        {/* Architrave / casing */}
        <span
          className="relative block h-[300px] sm:h-[330px] xl:h-[360px] p-[10px] pb-0 rounded-t-[18px] bg-[#D8CCBF] dark:bg-[#2E2929] border-2 border-ink dark:border-cream/80 shadow-hard-lg dark:shadow-hard-dark group-focus-visible:ring-4 group-focus-visible:ring-sunny"
          style={{ perspective: 900 }}
        >
          {/* Casing moulding line */}
          <span className="absolute inset-[5px] bottom-0 rounded-t-[14px] border-2 border-ink/25 dark:border-cream/20 pointer-events-none" />

          {/* Room interior behind the leaf */}
          <span
            className="absolute inset-[10px] bottom-0 rounded-t-[10px] overflow-hidden border-2 border-ink dark:border-cream/80"
            style={{ background: "#141210" }}
          >
            {/* Lit back wall: stepped (hard-edged) pool of light, no blur */}
            <motion.span
              className="absolute inset-0"
              animate={{ opacity: light }}
              transition={{ duration: 0.35 }}
              style={{
                background: `radial-gradient(circle at 50% 22%, #FFE7A3 0 18%, #FFD13B 18% 34%, ${door.doorColor} 34% 62%, #141210 62%)`,
              }}
            />
            {/* Floor plane */}
            <span
              className="absolute inset-x-0 bottom-0 h-[26%] border-t-2 border-ink/60"
              style={{ background: "linear-gradient(#2A2420, #1A1613)" }}
            />
            {/* Hanging bulb */}
            <span className="absolute left-1/2 top-0 -translate-x-1/2 flex flex-col items-center">
              <span className="w-[2px] h-6 bg-ink/80" />
              <span
                className="w-3.5 h-3.5 rounded-full border-2 border-ink transition-colors duration-300"
                style={{ background: light > 0 ? "#FFF6E5" : "#5A5148" }}
              />
            </span>
            {/* Room caption */}
            <motion.span
              className="absolute inset-x-2 bottom-[30%] text-center"
              animate={{ opacity: light, y: light ? 0 : 6 }}
              transition={{ duration: 0.3, delay: light ? 0.12 : 0 }}
            >
              <span className="inline-block px-1.5 py-0.5 rounded bg-ink text-sunny font-mono text-[9px] font-black uppercase tracking-widest border border-sunny/60">
                Room {door.doorNumber}
              </span>
              <span className="block mt-1.5 font-mono text-[10px] font-bold text-ink">Step inside →</span>
            </motion.span>
          </span>

          {/* Hinged leaf */}
          <motion.span
            className="absolute inset-[10px] bottom-0 block"
            style={{ transformOrigin: "0% 50%", transformStyle: "preserve-3d" }}
            animate={{ rotateY: angle }}
            transition={{ type: "spring", stiffness: 120, damping: visual === "open" ? 18 : 14, mass: 0.9 }}
          >
            {/* Front face */}
            <span
              className="absolute inset-0 rounded-t-[10px] border-2 border-ink dark:border-cream/80 flex flex-col items-center px-3 pt-3 pb-4"
              style={{ backgroundColor: door.doorColor, backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
            >
              {/* Number plate */}
              <span className="self-stretch flex justify-between font-mono text-[10px] font-bold text-cream/60">
                <span>No.</span>
                <span>{door.doorNumber}</span>
              </span>

              {/* Raised panels */}
              <span className="mt-2 w-full h-[34%] rounded-[6px] border-2 border-ink/50 shadow-[inset_2px_2px_0_rgba(255,255,255,0.12),inset_-2px_-2px_0_rgba(0,0,0,0.25)]" />

              {/* Brass nameplate */}
              <span className="brass-plate my-3 w-full py-1.5 px-1 rounded-[4px] border-2 border-ink text-center">
                <span className="font-mono text-[9px] sm:text-[10px] font-black tracking-wider uppercase block leading-tight">
                  {door.brassTitle}
                </span>
              </span>

              <span className="w-full flex-1 rounded-[6px] border-2 border-ink/50 shadow-[inset_2px_2px_0_rgba(255,255,255,0.12),inset_-2px_-2px_0_rgba(0,0,0,0.25)]" />

              {/* Lever handle + keyhole escutcheon, on the latch side */}
              <span className="absolute right-2.5 top-[56%] flex flex-col items-end gap-1">
                <motion.span
                  className="block w-7 h-[7px] rounded-full bg-[#D8A84E] border-2 border-ink"
                  style={{ transformOrigin: "100% 50%" }}
                  animate={{ rotate: visual === "closed" ? 0 : 28 }}
                  transition={{ type: "spring", stiffness: 400, damping: 14 }}
                />
                <span className="mr-[3px] w-3 h-[18px] rounded-full bg-[#D8A84E] border-2 border-ink flex items-center justify-center">
                  <span className="block w-[3px] h-[7px] rounded-b-full bg-ink" />
                </span>
              </span>

              {/* Hinges */}
              <span className="absolute -left-[3px] top-8 w-[6px] h-4 bg-[#B8852B] border border-ink" />
              <span className="absolute -left-[3px] bottom-10 w-[6px] h-4 bg-[#B8852B] border border-ink" />

              {/* Light leaking under a closed door */}
              <span
                className="absolute -bottom-[2px] left-1 right-1 h-[3px] bg-sunny transition-opacity duration-300"
                style={{ opacity: visual === "closed" ? 0.35 : 1 }}
              />
            </span>

            {/* Back face (seen when swung open) */}
            <span
              className="absolute inset-0 rounded-t-[10px] border-2 border-ink dark:border-cream/80"
              style={{
                backgroundColor: door.doorColorDark,
                transform: "rotateY(180deg)",
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
              }}
            />
          </motion.span>
        </span>

        {/* Threshold + floor light spill: a flat, hard-edged trapezoid */}
        <span className="relative block h-[30px]">
          <span className="absolute inset-x-0 top-0 h-[6px] bg-[#B9AA9B] dark:bg-[#3A3434] border-2 border-t-0 border-ink dark:border-cream/80" />
          <motion.span
            className="absolute left-[10px] right-[10px] top-[6px] h-[24px] bg-sunny"
            style={{ clipPath: "polygon(0 0, 100% 0, 118% 100%, -18% 100%)", transformOrigin: "50% 0%" }}
            animate={{ opacity: light * 0.75, scaleY: 0.4 + light * 0.6 }}
            transition={{ duration: 0.35 }}
          />
        </span>
      </button>

      <span className="text-center mt-2 px-1">
        <span className="font-display font-black text-xs sm:text-sm text-cream block leading-tight">
          {door.projectName}
        </span>
        <span className="font-mono text-[11px] text-cream/55">{door.category}</span>
      </span>
    </div>
  );
}

export function ProjectDoors({ onSelectProject, openDoorId = null }: ProjectDoorsProps) {
  const reduce = useReducedMotion();
  const [opening, setOpening] = useState<string | null>(null);
  const buttons = useRef<Record<string, HTMLButtonElement | null>>({});
  const lastOpened = useRef<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // When the room closes, swing the door shut and hand focus back to it.
  useEffect(() => {
    if (openDoorId === null && lastOpened.current && !opening) {
      buttons.current[lastOpened.current]?.focus({ preventScroll: true });
      lastOpened.current = null;
    }
  }, [openDoorId, opening]);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const activate = (door: DoorProject) => {
    if (opening) return;
    lastOpened.current = door.id;
    if (reduce) {
      onSelectProject(door);
      return;
    }
    // Let the door swing open before the room appears.
    setOpening(door.id);
    timer.current = setTimeout(() => {
      setOpening(null);
      onSelectProject(door);
    }, OPEN_DELAY_MS);
  };

  return (
    <section
      id="works"
      className="relative scroll-mt-6 overflow-hidden rounded-[28px] border-2 border-ink dark:border-cream/30 bg-forest dark:bg-forest-deep shadow-hard-lg dark:shadow-none px-5 sm:px-10 lg:px-14 pt-14 sm:pt-20 pb-0"
      style={{
        backgroundImage:
          "repeating-linear-gradient(90deg, rgba(255,246,229,0.035) 0 28px, transparent 28px 56px)",
      }}
    >
      <div className="mb-12 lg:flex lg:items-end lg:justify-between lg:gap-10">
        <div>
        <div className="flex items-center gap-2 mb-2">
          <span className="px-3 py-1 rounded-full bg-sunny text-ink font-mono text-xs font-bold border-2 border-ink shadow-hard-sm">
            02 / Works Wall
          </span>
          <span className="font-mono text-xs uppercase tracking-wider text-cream/60">
            One door per discipline
          </span>
        </div>
        <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl xl:text-7xl text-cream tracking-tight leading-[1.02]">
          Magic happens <br className="hidden sm:inline" />
          behind the <span className="text-sunny">doors.</span>
        </h2>
        </div>
        <p className="font-body text-sm sm:text-base text-cream/70 max-w-sm mt-4 lg:mt-0 leading-relaxed">
          Hover a door to crack it open. Click to step inside the room.
        </p>
      </div>

      {/* Wall with a skirting board running under the doors */}
      <div className="relative">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-4 xl:gap-x-8 gap-y-10 items-start justify-items-center">
          {DOORS_DATA.map((door) => (
            <Door
              key={door.id}
              door={door}
              state={openDoorId === door.id ? "open" : opening === door.id ? "open" : "closed"}
              onActivate={() => activate(door)}
              buttonRef={(el) => {
                buttons.current[door.id] = el;
              }}
            />
          ))}
        </div>
      </div>

      {/* Skirting board + floor */}
      <div className="relative mt-12 -mx-5 sm:-mx-10 lg:-mx-14">
        <div className="h-3 bg-[#D8CCBF] dark:bg-[#2E2929] border-y-2 border-ink" />
        <div
          className="h-14 sm:h-20 bg-[#6B4A33] dark:bg-[#3A281C]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, rgba(0,0,0,0.18) 0 2px, transparent 2px 120px), repeating-linear-gradient(0deg, rgba(255,255,255,0.05) 0 1px, transparent 1px 9px)",
          }}
        />
      </div>
    </section>
  );
}
