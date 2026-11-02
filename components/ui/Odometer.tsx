"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

const DIGIT_H = 1.2; // em, height of one numeral cell on the drum
const NUMERALS = Array.from({ length: 10 }, (_, i) => i);

function Drum({ digit, index, count }: { digit: number; index: number; count: number }) {
  const reduce = useReducedMotion();
  return (
    <span
      className="relative inline-block overflow-hidden rounded-[6px] border-2 border-ink dark:border-cream/80 bg-[#F7F1E6] dark:bg-[#1B1918]"
      style={{ width: "0.82em", height: `${DIGIT_H}em` }}
    >
      <motion.span
        className="absolute inset-x-0 top-0 flex flex-col"
        initial={false}
        animate={{ y: `${-digit * DIGIT_H}em` }}
        transition={
          reduce
            ? { duration: 0 }
            : {
                type: "spring",
                stiffness: 70,
                damping: 13,
                mass: 1,
                // Rightmost drum moves first, like a real counter carrying over.
                delay: (count - 1 - index) * 0.06,
              }
        }
      >
        {NUMERALS.map((n) => (
          <span
            key={n}
            className="flex items-center justify-center font-mono font-black text-ink dark:text-cream tnum"
            style={{ height: `${DIGIT_H}em`, lineHeight: 1 }}
          >
            {n}
          </span>
        ))}
      </motion.span>

      {/* Cylinder shading: stepped bands, not a blur, so it stays brutalist. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(26,26,26,0.38) 0 9%, rgba(26,26,26,0.16) 9% 20%, transparent 20% 80%, rgba(26,26,26,0.16) 80% 91%, rgba(26,26,26,0.38) 91%)",
        }}
      />
      {/* Window centre line */}
      <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-1/2 h-px bg-ink/25 dark:bg-cream/20" />
    </span>
  );
}

/**
 * Mechanical rolling counter. Each digit sits on its own 0–9 drum, so going
 * from 2022 to 2026 visibly rolls the last drum through 3, 4 and 5.
 */
export function Odometer({ value, className = "" }: { value: string; className?: string }) {
  const digits = value.replace(/\D/g, "").split("").map(Number);
  return (
    <span
      role="img"
      aria-label={value}
      className={`inline-flex items-center gap-[0.08em] p-[0.12em] rounded-[10px] bg-ink dark:bg-cream/90 border-2 border-ink shadow-hard dark:shadow-hard-dark ${className}`}
    >
      {digits.map((d, i) => (
        <Drum key={i} digit={d} index={i} count={digits.length} />
      ))}
    </span>
  );
}
