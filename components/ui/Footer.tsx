"use client";

import React, { useState } from "react";
import Link from "next/link";
import { builderProfile } from "@/data/profile";
import { nowData } from "@/data/now";
import { ChaiDoodle } from "@/components/doodles/ChaiDoodle";
import { EasterEggBurst } from "@/components/ui/EasterEggBurst";

export function Footer() {
  const { contact, name } = builderProfile;
  const [doodleClickCount, setDoodleClickCount] = useState(0);

  const handleDoodleClick = () => {
    setDoodleClickCount((prev) => prev + 1);
  };

  return (
    <footer
      aria-label="Site footer"
      className="mt-16 pt-8 pb-16 border-t-ink border-t-2 border-dashed print:hidden"
    >
      <EasterEggBurst
        clickTriggerCount={doodleClickCount}
        onResetTrigger={() => setDoodleClickCount(0)}
      />

      {/* "Currently building" Ticker Strip */}
      <div className="mb-6 p-4 rounded-2xl bg-sunny/20 dark:bg-sunny/10 border-ink border-2 shadow-hard-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-mono text-xs">
          <div className="flex items-center gap-2 text-ink dark:text-cream font-bold">
            <span
              className="w-2.5 h-2.5 rounded-full bg-tomato animate-pulse"
              aria-hidden="true"
            />
            <span className="uppercase tracking-wider">CURRENTLY BUILDING:</span>
          </div>

          <div className="flex items-center gap-2 text-ink/90 dark:text-cream/90 flex-wrap">
            <span>{nowData.building[0]?.title}</span>
            <span className="text-teal font-black" aria-hidden="true">
              ·
            </span>
            <span>{nowData.building[1]?.title}</span>
            <Link
              href="/now"
              className="ml-2 font-bold text-teal hover:underline inline-flex items-center gap-1"
            >
              <span>what else?</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Workshop Bottom Card */}
      <div className="bg-cream-light dark:bg-ink-card border-ink border-2 rounded-2xl p-6 sm:p-8 shadow-hard-lg dark:shadow-hard-dark-lg">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-6">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-teal font-bold block mb-1">
              Workshop Door
            </span>
            <h2 className="text-xl sm:text-2xl font-display font-black text-ink dark:text-cream tracking-tight">
              Built by {name}
            </h2>
            <p className="text-sm font-body text-ink/75 dark:text-cream/70 mt-1 max-w-md">
              Full-stack developer and CS undergrad (IoT, Cybersecurity &amp; Blockchain) at BMSCE, Bengaluru.
              I build things that move: cabs, robots, trains.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
            <Link
              href="/contact"
              className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full bg-sunny text-ink border-ink border-2 font-bold shadow-hard-sm hover:bg-sunny/80 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-transform"
            >
              <span>Get in touch</span>
              <span aria-hidden="true">→</span>
            </Link>
            <Link
              href="/now"
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-paper dark:bg-ink-deep text-ink dark:text-cream border-ink border-2 font-bold shadow-hard-sm hover:bg-sunny/30 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-transform"
            >
              <span>$ cd now</span>
            </Link>
          </div>
        </div>

        {/* Links Strip */}
        <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-ink/15 dark:border-cream/15">
          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-paper dark:bg-ink-deep border-ink border text-xs font-mono font-bold text-ink dark:text-cream hover:bg-sunny/30 shadow-hard-sm transition-transform"
          >
            <span>✉ {contact.email}</span>
          </Link>

          <a
            href={contact.github.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-paper dark:bg-ink-deep border-ink border text-xs font-mono font-bold text-ink dark:text-cream hover:bg-sunny/30 shadow-hard-sm transition-transform"
          >
            <span>GitHub</span>
            <span aria-hidden="true">↗</span>
          </a>

          <a
            href={contact.linkedin.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-paper dark:bg-ink-deep border-ink border text-xs font-mono font-bold text-ink dark:text-cream hover:bg-sunny/30 shadow-hard-sm transition-transform"
          >
            <span>LinkedIn</span>
            <span aria-hidden="true">↗</span>
          </a>

          <a
            href={builderProfile.portfolioUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-paper dark:bg-ink-deep border-ink border text-xs font-mono font-bold text-ink dark:text-cream hover:bg-sunny/30 shadow-hard-sm transition-transform"
          >
            <span>Portfolio</span>
            <span aria-hidden="true">↗</span>
          </a>

          <Link
            href="/security"
            className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-paper dark:bg-ink-deep border-ink border text-xs font-mono font-bold text-ink dark:text-cream hover:bg-sunny/30 shadow-hard-sm transition-transform"
          >
            <span>Security</span>
          </Link>

          <Link
            href="/colophon"
            className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-paper dark:bg-ink-deep border-ink border text-xs font-mono font-bold text-ink dark:text-cream hover:bg-sunny/30 shadow-hard-sm transition-transform"
          >
            <span>Colophon</span>
          </Link>

          <Link
            href="/uses"
            className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-paper dark:bg-ink-deep border-ink border text-xs font-mono font-bold text-ink dark:text-cream hover:bg-sunny/30 shadow-hard-sm transition-transform"
          >
            <span>Uses</span>
          </Link>
        </div>

        {/* Footer bottom bar with interactive Chai doodle */}
        <div className="mt-8 pt-4 border-t border-ink/10 dark:border-cream/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-ink/60 dark:text-cream/50">
          <div>
            © {new Date().getFullYear()} {name} · No tracking, pure engineering
          </div>

          <div className="flex items-center gap-2">
            <span>Tap chai for luck:</span>
            <button
              onClick={handleDoodleClick}
              type="button"
              className="p-1.5 rounded-xl bg-paper dark:bg-ink-deep border-ink border shadow-hard-sm hover:rotate-6 active:scale-95 transition-transform"
              title="Click 5 times for a secret easter egg!"
              aria-label="Interactive chai cup doodle: tap 5 times to trigger secret burst"
            >
              <ChaiDoodle className="w-5 h-5" decorative />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
