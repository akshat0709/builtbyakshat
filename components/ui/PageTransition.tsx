"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { easeOutCurve, durations } from "@/lib/motion";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();

  // The home page uses the full width; reading pages keep a comfortable measure.
  const width = pathname === "/" ? "w-full" : "w-full max-w-4xl mx-auto";

  if (shouldReduceMotion) {
    return <div className={width}>{children}</div>;
  }

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: durations.fast,
        ease: easeOutCurve,
      }}
      className={width}
    >
      {children}
    </motion.div>
  );
}
