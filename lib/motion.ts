/**
 * Unified motion design tokens.
 * Reused across all interactive animations.
 */

// One spring config
export const springTransition = {
  type: "spring" as const,
  stiffness: 300,
  damping: 24,
  mass: 0.5,
};

// Gentle spring for physics/magnetic buttons
export const gentleSpring = {
  type: "spring" as const,
  stiffness: 220,
  damping: 18,
  mass: 0.3,
};

// One ease-out curve
export const easeOutCurve = [0.21, 0.47, 0.32, 0.98] as const;

// 3 duration tokens
export const durations = {
  fast: 0.15,
  normal: 0.3,
  slow: 0.5,
} as const;

// Standard scroll reveal variant
export const scrollRevealVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: durations.normal,
      ease: easeOutCurve,
    },
  },
};
