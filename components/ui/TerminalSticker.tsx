"use client";

import React, { useState, useEffect } from "react";
import { useReducedMotion } from "framer-motion";

export function TerminalSticker() {
  const fullText = "$ whoami → akshat, builds real systems";
  const shouldReduceMotion = useReducedMotion();
  const [displayedText, setDisplayedText] = useState(shouldReduceMotion ? fullText : "");
  const [isTypingDone, setIsTypingDone] = useState(shouldReduceMotion);

  useEffect(() => {
    if (shouldReduceMotion) {
      setDisplayedText(fullText);
      setIsTypingDone(true);
      return;
    }

    let currentIndex = 0;
    const interval = setInterval(() => {
      currentIndex++;
      setDisplayedText(fullText.slice(0, currentIndex));
      if (currentIndex >= fullText.length) {
        clearInterval(interval);
        setIsTypingDone(true);
      }
    }, 45);

    return () => clearInterval(interval);
  }, [shouldReduceMotion]);

  return (
    <div
      role="region"
      aria-label="Terminal identity line"
      className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-paper dark:bg-ink-deep border-ink border-2 shadow-hard-sm dark:shadow-hard-dark-sm font-mono text-xs sm:text-sm text-ink dark:text-cream select-none rotate-[-1deg] hover:rotate-0 transition-transform"
    >
      <span className="w-2.5 h-2.5 rounded-full bg-tomato shrink-0" aria-hidden="true" />
      <span className="font-semibold">{displayedText}</span>
      {!isTypingDone && (
        <span className="w-2 h-4 bg-ink dark:bg-cream animate-pulse" aria-hidden="true" />
      )}
    </div>
  );
}
