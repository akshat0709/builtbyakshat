"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { TaxiDoodle } from "@/components/doodles/TaxiDoodle";
import { RobotDoodle } from "@/components/doodles/RobotDoodle";
import { TrainDoodle } from "@/components/doodles/TrainDoodle";
import { WheelchairDoodle } from "@/components/doodles/WheelchairDoodle";
import { ChaiDoodle } from "@/components/doodles/ChaiDoodle";
import { WrenchDoodle } from "@/components/doodles/WrenchDoodle";

interface InteractiveSticker {
  id: string;
  label: string;
  sublabel: string;
  doodle: React.ReactNode;
  bg: string;
  textColor: string;
  initialX: number;
  initialY: number;
  rotate: number;
}

export function StickerPile() {
  const constraintsRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [positions, setPositions] = useState<Record<string, { x: number; y: number }>>({});

  const stickers: InteractiveSticker[] = [
    {
      id: "taxi",
      label: "Orange Taxi",
      sublabel: "Pre-launch PWA",
      doodle: <TaxiDoodle className="w-10 h-7" decorative />,
      bg: "#FFD13B",
      textColor: "#1A1A1A",
      initialX: 20,
      initialY: 20,
      rotate: -3,
    },
    {
      id: "robot",
      label: "Rescue Robot",
      sublabel: "GPS-Denied Telemetry",
      doodle: <RobotDoodle className="w-9 h-9" decorative />,
      bg: "#179A94",
      textColor: "#FFFFFF",
      initialX: 180,
      initialY: 35,
      rotate: 3,
    },
    {
      id: "train",
      label: "Locomotive CV",
      sublabel: "YOLO Animal Detection",
      doodle: <TrainDoodle className="w-10 h-7" decorative />,
      bg: "#FF4336",
      textColor: "#FFFFFF",
      initialX: 50,
      initialY: 105,
      rotate: -2,
    },
    {
      id: "wheelchair",
      label: "INSPIRE Award",
      sublabel: "Voice Wheelchair",
      doodle: <WheelchairDoodle className="w-8 h-8" decorative />,
      bg: "#FFFDF0",
      textColor: "#1A1A1A",
      initialX: 220,
      initialY: 110,
      rotate: 4,
    },
    {
      id: "chai",
      label: "Cutting Chai",
      sublabel: "Workshop Fuel",
      doodle: <ChaiDoodle className="w-8 h-8" decorative />,
      bg: "#FFD13B",
      textColor: "#1A1A1A",
      initialX: 120,
      initialY: 65,
      rotate: -1,
    },
    {
      id: "wrench",
      label: "Real Systems",
      sublabel: "Hard-tested Code",
      doodle: <WrenchDoodle className="w-8 h-8" decorative />,
      bg: "#FFFFFF",
      textColor: "#1A1A1A",
      initialX: 290,
      initialY: 70,
      rotate: 2,
    },
  ];

  useEffect(() => {
    const initialPos: Record<string, { x: number; y: number }> = {};
    stickers.forEach((s) => {
      initialPos[s.id] = { x: s.initialX, y: s.initialY };
    });
    setPositions(initialPos);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleKeyDown = (id: string, e: React.KeyboardEvent) => {
    const step = 15;
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setPositions((prev) => ({
        ...prev,
        [id]: { x: (prev[id]?.x || 0) - step, y: prev[id]?.y || 0 },
      }));
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      setPositions((prev) => ({
        ...prev,
        [id]: { x: (prev[id]?.x || 0) + step, y: prev[id]?.y || 0 },
      }));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setPositions((prev) => ({
        ...prev,
        [id]: { x: prev[id]?.x || 0, y: (prev[id]?.y || 0) - step },
      }));
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setPositions((prev) => ({
        ...prev,
        [id]: { x: prev[id]?.x || 0, y: (prev[id]?.y || 0) + step },
      }));
    }
  };

  return (
    <div className="my-10">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-mono uppercase tracking-wider text-ink/80 dark:text-cream/80 font-bold block">
          Workshop Sticker Pile (Drag &amp; Toss)
        </span>
        <span className="text-[11px] font-mono text-ink/80 dark:text-cream/80 hidden sm:inline">
          Use mouse or arrow keys to nudge
        </span>
      </div>

      <div
        ref={constraintsRef}
        className="relative w-full h-[240px] sm:h-[220px] rounded-2xl bg-cream-light/60 dark:bg-ink-deep/60 border-ink border-2 border-dashed overflow-hidden p-4 select-none"
        aria-label="Interactive draggable stickers"
      >
        {shouldReduceMotion ? (
          // Static arranged collage for prefers-reduced-motion
          <div className="flex flex-wrap gap-3 items-center justify-center h-full">
            {stickers.map((s) => (
              <div
                key={s.id}
                style={{ backgroundColor: s.bg, color: s.textColor }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border-ink border-2 shadow-hard-sm"
              >
                {s.doodle}
                <div>
                  <div className="font-display font-bold text-xs leading-none">
                    {s.label}
                  </div>
                  <div className="font-mono text-[10px] opacity-80 mt-0.5">
                    {s.sublabel}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          stickers.map((s) => {
            const pos = positions[s.id] || { x: s.initialX, y: s.initialY };

            return (
              <motion.div
                key={s.id}
                drag
                dragConstraints={constraintsRef}
                dragElastic={0.2}
                whileDrag={{ scale: 1.08, zIndex: 40 }}
                tabIndex={0}
                onKeyDown={(e) => handleKeyDown(s.id, e)}
                data-cursor-label="drag"
                animate={{
                  x: pos.x,
                  y: pos.y,
                  rotate: s.rotate,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                style={{
                  backgroundColor: s.bg,
                  color: s.textColor,
                  position: "absolute",
                  left: 0,
                  top: 0,
                }}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border-ink border-2 shadow-hard hover:shadow-hard-lg cursor-grab active:cursor-grabbing focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink z-10 touch-none"
                aria-label={`${s.label} sticker: ${s.sublabel}`}
              >
                <div className="shrink-0">{s.doodle}</div>
                <div>
                  <div className="font-display font-black text-xs leading-tight">
                    {s.label}
                  </div>
                  <div className="font-mono text-[10px] opacity-85 leading-tight">
                    {s.sublabel}
                  </div>
                </div>
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
}
