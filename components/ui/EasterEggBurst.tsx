"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { TaxiDoodle } from "@/components/doodles/TaxiDoodle";
import { RobotDoodle } from "@/components/doodles/RobotDoodle";
import { TrainDoodle } from "@/components/doodles/TrainDoodle";
import { WheelchairDoodle } from "@/components/doodles/WheelchairDoodle";
import { ChaiDoodle } from "@/components/doodles/ChaiDoodle";
import { WrenchDoodle } from "@/components/doodles/WrenchDoodle";

interface FallingDoodle {
  id: number;
  component: React.ReactNode;
  leftPercent: number;
  delay: number;
  rotation: number;
}

export function EasterEggBurst({
  clickTriggerCount = 0,
  onResetTrigger,
}: {
  clickTriggerCount?: number;
  onResetTrigger?: () => void;
}) {
  const [triggered, setTriggered] = useState(false);
  const [doodles, setDoodles] = useState<FallingDoodle[]>([]);
  const shouldReduceMotion = useReducedMotion();

  const fireEasterEgg = useCallback(() => {
    if (triggered) return;
    setTriggered(true);

    const components = [
      <TaxiDoodle key="t" className="w-12 h-9" decorative />,
      <RobotDoodle key="r" className="w-10 h-10" decorative />,
      <TrainDoodle key="tr" className="w-12 h-9" decorative />,
      <WheelchairDoodle key="w" className="w-10 h-10" decorative />,
      <ChaiDoodle key="c" className="w-10 h-10" decorative />,
      <WrenchDoodle key="wr" className="w-10 h-10" decorative />,
    ];

    const burstList: FallingDoodle[] = Array.from({ length: 14 }).map((_, i) => ({
      id: i,
      component: components[i % components.length],
      leftPercent: 5 + (i * 90) / 14 + (Math.random() * 8 - 4),
      delay: Math.random() * 0.4,
      rotation: Math.random() * 40 - 20,
    }));

    setDoodles(burstList);
    if (onResetTrigger) onResetTrigger();
  }, [triggered, onResetTrigger]);

  // Konami code detection: Up, Up, Down, Down, Left, Right, Left, Right, b, a
  useEffect(() => {
    const konamiCode = [
      "ArrowUp",
      "ArrowUp",
      "ArrowDown",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      "ArrowLeft",
      "ArrowRight",
      "b",
      "a",
    ];
    let cursor = 0;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === konamiCode[cursor].toLowerCase()) {
        cursor++;
        if (cursor === konamiCode.length) {
          cursor = 0;
          fireEasterEgg();
        }
      } else {
        cursor = 0;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [fireEasterEgg]);

  // Click 5 times trigger
  useEffect(() => {
    if (clickTriggerCount >= 5 && !triggered) {
      fireEasterEgg();
    }
  }, [clickTriggerCount, triggered, fireEasterEgg]);

  if (!triggered) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {/* Playful toast message */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 pointer-events-auto">
        <div className="px-4 py-2 rounded-full bg-sunny text-ink border-ink border-2 shadow-hard font-mono text-xs sm:text-sm font-black flex items-center gap-2 animate-bounce">
          <span>🎮 Secret unlocked: Workshop doors are wide open!</span>
          <button
            onClick={() => setTriggered(false)}
            type="button"
            className="w-5 h-5 rounded-full bg-paper border border-ink flex items-center justify-center text-xs ml-1 hover:bg-cream"
            aria-label="Dismiss secret note"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Falling Doodles */}
      {!shouldReduceMotion &&
        doodles.map((d) => (
          <motion.div
            key={d.id}
            initial={{ y: -80, opacity: 1, rotate: d.rotation }}
            animate={{ y: "105vh", rotate: d.rotation + 180 }}
            transition={{
              duration: 2.4,
              delay: d.delay,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            style={{ left: `${d.leftPercent}%` }}
            className="absolute top-0 p-2 rounded-xl bg-paper border-ink border-2 shadow-hard"
          >
            {d.component}
          </motion.div>
        ))}
    </div>
  );
}
