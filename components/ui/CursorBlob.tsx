"use client";

import React, { useEffect, useState } from "react";
import { motion, useSpring, useReducedMotion } from "framer-motion";

export function CursorBlob() {
  const [cursorText, setCursorText] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);
  const shouldReduceMotion = useReducedMotion();

  // Unified spring config
  const springConfig = { damping: 28, stiffness: 350, mass: 0.5 };
  const cursorX = useSpring(-100, springConfig);
  const cursorY = useSpring(-100, springConfig);

  useEffect(() => {
    if (shouldReduceMotion) return;

    // Detect touch-only screen
    const isTouch =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia("(pointer: coarse)").matches;

    if (isTouch) {
      setIsTouchDevice(true);
      return;
    }
    setIsTouchDevice(false);

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactiveEl = target.closest(
        "[data-cursor-label], a, button, [role='button'], [role='switch']"
      ) as HTMLElement | null;

      if (interactiveEl) {
        setIsHovered(true);
        const customText = interactiveEl.getAttribute("data-cursor-label");
        if (customText) {
          setCursorText(customText);
        } else if (
          interactiveEl.tagName.toLowerCase() === "a" ||
          interactiveEl.getAttribute("role") === "link"
        ) {
          setCursorText("open");
        } else if (interactiveEl.tagName.toLowerCase() === "button") {
          const textContent = interactiveEl.textContent?.toLowerCase() || "";
          if (textContent.includes("copy")) {
            setCursorText("copy");
          } else {
            setCursorText("press");
          }
        } else {
          setCursorText("");
        }
      } else {
        setIsHovered(false);
        setCursorText("");
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseover", handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY, isVisible, shouldReduceMotion]);

  if (isTouchDevice || shouldReduceMotion || !isVisible) {
    return null;
  }

  return (
    <motion.div
      aria-hidden="true"
      style={{
        translateX: cursorX,
        translateY: cursorY,
        top: 0,
        left: 0,
      }}
      className="fixed pointer-events-none z-50 flex items-center justify-center -translate-x-1/2 -translate-y-1/2"
    >
      <motion.div
        animate={{
          scale: isHovered ? 1.6 : 1,
          width: cursorText ? 52 : 18,
          height: cursorText ? 26 : 18,
          borderRadius: cursorText ? "9999px" : "50%",
        }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
        className="bg-sunny border-ink border text-ink flex items-center justify-center font-mono text-[9px] font-bold shadow-hard-sm uppercase tracking-tighter"
      >
        {cursorText}
      </motion.div>
    </motion.div>
  );
}
