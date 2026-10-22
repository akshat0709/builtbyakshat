"use client";

import React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { builderProfile } from "@/data/profile";
import { TerminalSticker } from "@/components/ui/TerminalSticker";
import { CopyLinkButton } from "@/components/ui/CopyLinkButton";
import { PeelOffRefSticker } from "@/components/ui/PeelOffRefSticker";
import { Product } from "@/data/products";
import { springTransition } from "@/lib/motion";

interface HeroProps {
  currentProduct?: Product | null;
}

export function Hero({ currentProduct }: HeroProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <header className="relative pt-6 pb-10 md:pt-10 md:pb-12 border-b-ink border-b-2 border-dashed">
      {/* Background oversized word */}
      <div
        className="absolute top-2 right-0 text-7xl sm:text-8xl md:text-9xl font-display font-black text-ink/[0.04] dark:text-cream/[0.04] select-none pointer-events-none tracking-tighter"
        aria-hidden="true"
      >
        WORKSHOP.
      </div>

      {/* Top action row: terminal sticker & copy link */}
      <div className="flex items-center justify-between gap-3 mb-6">
        <TerminalSticker />

        <div className="flex items-center gap-2 print:hidden">
          <CopyLinkButton />
        </div>
      </div>

      {/* Peel-off sticker if coming from a specific product */}
      {currentProduct && <PeelOffRefSticker product={currentProduct} />}

      {/* Main hero copy */}
      <div className="space-y-4 max-w-2xl mt-4">
        {/* Big display name with springy drop-in */}
        <motion.h1
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: -24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={springTransition}
          className="text-4xl sm:text-5xl md:text-6xl font-display font-black text-ink dark:text-cream tracking-tight leading-[1.05]"
        >
          {builderProfile.name}
        </motion.h1>

        {/* Tagline with highlighter marks */}
        <p className="text-xl sm:text-2xl font-display font-bold text-ink dark:text-cream leading-snug">
          I build things that move:{" "}
          <mark className="bg-sunny px-1.5 py-0.5 rounded -rotate-1 inline-block text-ink">
            cabs
          </mark>
          ,{" "}
          <mark className="bg-teal px-1.5 py-0.5 rounded rotate-1 inline-block text-white">
            robots
          </mark>
          ,{" "}
          <mark className="bg-tomato px-1.5 py-0.5 rounded -rotate-2 inline-block text-white">
            trains
          </mark>
          .
        </p>

        {/* Warmer conversational intro */}
        <p className="text-sm sm:text-base font-body text-ink/80 dark:text-cream/80 leading-relaxed pt-1">
          {builderProfile.intro}
        </p>
      </div>

      {/* Terminal Command Navigation Pills */}
      <nav
        aria-label="Section navigation"
        className="flex flex-wrap items-center gap-2.5 pt-8 print:hidden"
      >
        <span className="text-xs font-mono text-ink/50 dark:text-cream/50 select-none mr-1 font-bold">
          JUMP:
        </span>
        <Link
          href="/experience"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cream-light dark:bg-ink-card border-ink border-2 text-xs font-mono font-bold text-ink dark:text-cream hover:bg-sunny shadow-hard-sm dark:shadow-hard-dark-sm active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
        >
          <span>$ cd</span> <span>experience</span>
        </Link>
        <Link
          href="/built"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cream-light dark:bg-ink-card border-ink border-2 text-xs font-mono font-bold text-ink dark:text-cream hover:bg-teal hover:text-white shadow-hard-sm dark:shadow-hard-dark-sm active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
        >
          <span>$ cd</span> <span>built</span>
        </Link>
        <Link
          href="/toolbox"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cream-light dark:bg-ink-card border-ink border-2 text-xs font-mono font-bold text-ink dark:text-cream hover:bg-tomato hover:text-white shadow-hard-sm dark:shadow-hard-dark-sm active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
        >
          <span>$ cd</span> <span>toolbox</span>
        </Link>
        <Link
          href="/lab"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cream-light dark:bg-ink-card border-ink border-2 text-xs font-mono font-bold text-ink dark:text-cream hover:bg-sunny/80 shadow-hard-sm dark:shadow-hard-dark-sm active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
        >
          <span>$ cd</span> <span>lab</span>
        </Link>
      </nav>
    </header>
  );
}
