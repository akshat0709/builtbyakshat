"use client";

import React, { useRef } from "react";
import { motion, useSpring, useReducedMotion } from "framer-motion";

interface MagneticButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  ariaLabel?: string;
}

export function MagneticButton({
  children,
  href,
  onClick,
  className = "",
  ariaLabel,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const x = useSpring(0, { stiffness: 260, damping: 20, mass: 0.2 });
  const y = useSpring(0, { stiffness: 260, damping: 20, mass: 0.2 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || !ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    // Gentle pull: max 8px
    x.set((clientX - centerX) * 0.2);
    y.set((clientY - centerY) * 0.2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const content = (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={shouldReduceMotion ? {} : { x, y }}
      className="inline-block"
    >
      {href ? (
        <a
          href={href}
          aria-label={ariaLabel}
          className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-tomato text-white border-ink border-2 font-mono text-xs sm:text-sm font-bold shadow-hard hover:bg-tomato/90 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink dark:focus-visible:ring-cream ${className}`}
        >
          {children}
        </a>
      ) : (
        <button
          onClick={onClick}
          type="button"
          aria-label={ariaLabel}
          className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-tomato text-white border-ink border-2 font-mono text-xs sm:text-sm font-bold shadow-hard hover:bg-tomato/90 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink dark:focus-visible:ring-cream ${className}`}
        >
          {children}
        </button>
      )}
    </motion.div>
  );

  return content;
}
