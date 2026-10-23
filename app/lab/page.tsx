"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { TaxiDoodle } from "@/components/doodles/TaxiDoodle";

// Lazy-load draggable physics sticker pile on lab only
const StickerPile = dynamic(
  () => import("@/components/ui/StickerPile").then((mod) => mod.StickerPile),
  {
    ssr: false,
    loading: () => (
      <div className="h-64 flex items-center justify-center font-mono text-xs text-ink/60 dark:text-cream/60">
        Loading sticker physics workbench...
      </div>
    ),
  }
);

export default function LabPage() {
  const [honkMessage, setHonkMessage] = useState<string | null>(null);

  const HONKS = [
    "HONK! ⚡ Electric cab clearing the way!",
    "BEEP BEEP! Supabase Realtime dispatch synced!",
    "HONK! Zero tailpipe emissions, 100% torque!",
    "PEEP! Dynamic UPI QR code generated on dashboard!",
  ];

  const handleTaxiClick = () => {
    const randomHonk = HONKS[Math.floor(Math.random() * HONKS.length)];
    setHonkMessage(randomHonk);
    setTimeout(() => {
      setHonkMessage(null);
    }, 2800);
  };

  return (
    <main id="main-content" className="py-6">
      <div className="mb-6">
        <span className="text-xs font-mono uppercase tracking-wider text-teal font-bold block mb-1">
          $ cd lab
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-ink dark:text-cream tracking-tight">
          The Engineer&apos;s Lab
        </h1>
        <p className="text-sm sm:text-base font-body text-ink/80 dark:text-cream/80 max-w-2xl mt-2 leading-relaxed">
          Interactive widgets, draggable sticker physics, and playful hardware easter eggs.
        </p>
      </div>

      <div className="space-y-8">
        {/* Interactive Taxi Toy Card */}
        <section
          aria-labelledby="toy-heading"
          className="bg-cream-light dark:bg-ink-card border-ink border-2 rounded-2xl p-6 sm:p-8 shadow-hard-lg dark:shadow-hard-dark-lg"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-sunny font-bold block mb-1">
                Toy 01
              </span>
              <h2
                id="toy-heading"
                className="text-xl sm:text-2xl font-display font-black text-ink dark:text-cream tracking-tight"
              >
                Honk the Electric Cab
              </h2>
              <p className="text-xs sm:text-sm font-body text-ink/75 dark:text-cream/70 mt-1">
                Click the taxi doodle to sound the horn (text speech bubble only, no disruptive audio).
              </p>
            </div>

            <div className="relative">
              {/* Speech bubble */}
              {honkMessage && (
                <div
                  role="status"
                  aria-live="polite"
                  className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1.5 rounded-full bg-sunny text-ink border-ink border-2 text-xs font-mono font-black shadow-hard animate-bounce"
                >
                  {honkMessage}
                </div>
              )}

              <button
                type="button"
                onClick={handleTaxiClick}
                className="p-4 rounded-2xl bg-paper dark:bg-ink-deep border-ink border-2 shadow-hard hover:rotate-2 hover:scale-105 active:scale-95 transition-all"
                aria-label="Click to honk the taxi horn"
              >
                <TaxiDoodle className="w-20 h-14" decorative />
              </button>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-paper dark:bg-ink-deep border-ink border text-xs font-mono text-ink/80 dark:text-cream/80 flex items-center justify-between">
            <span>🎮 Secret controller code:</span>
            <span className="font-bold text-teal">↑ ↑ ↓ ↓ ← → ← → B A</span>
          </div>
        </section>

        {/* Draggable Sticker Pile */}
        <section aria-labelledby="sticker-heading">
          <div className="mb-4">
            <span className="text-xs font-mono uppercase tracking-wider text-teal font-bold block mb-1">
              Toy 02
            </span>
            <h2
              id="sticker-heading"
              className="text-xl sm:text-2xl font-display font-black text-ink dark:text-cream tracking-tight"
            >
              Draggable Sticker Pile
            </h2>
            <p className="text-xs sm:text-sm font-body text-ink/75 dark:text-cream/70 mt-1">
              Drag, toss, and stack hardware badges across the tabletop canvas.
            </p>
          </div>

          <StickerPile />
        </section>
      </div>
    </main>
  );
}
