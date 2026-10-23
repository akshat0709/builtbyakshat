import React from "react";
import type { Metadata } from "next";
import { nowData } from "@/data/now";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Now | Akshat Gupta",
  description:
    "What Akshat Gupta is currently engineering, building, and learning right now.",
  alternates: {
    canonical: "/now",
  },
  openGraph: {
    title: "Now | Akshat Gupta",
    description:
      "What Akshat Gupta is currently engineering, building, and learning right now.",
    url: absoluteUrl("/now"),
  },
};

export default function NowPage() {
  return (
    <main id="main-content" className="py-6">
      <div className="mb-6">
        <span className="text-xs font-mono uppercase tracking-wider text-teal font-bold block mb-1">
          $ cd now
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-ink dark:text-cream tracking-tight">
          What I&apos;m Doing Now
        </h1>
        <p className="text-sm sm:text-base font-body text-ink/80 dark:text-cream/80 max-w-2xl mt-2 leading-relaxed">
          {nowData.headline} Inspired by Derek Sivers&apos; now page movement.
        </p>
      </div>

      <div className="space-y-6">
        {/* Currently Building */}
        <section
          aria-labelledby="building-heading"
          className="bg-cream-light dark:bg-ink-card border-ink border-2 rounded-2xl p-6 sm:p-8 shadow-hard-lg dark:shadow-hard-dark-lg"
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2.5 h-2.5 rounded-full bg-tomato animate-pulse" aria-hidden="true" />
            <h2
              id="building-heading"
              className="text-xl sm:text-2xl font-display font-black text-ink dark:text-cream tracking-tight"
            >
              Currently Building
            </h2>
          </div>

          <div className="space-y-4">
            {nowData.building.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-paper dark:bg-ink-deep border-ink border shadow-hard-sm"
              >
                <div className="flex items-baseline justify-between gap-2 mb-1">
                  <h3 className="font-display font-bold text-base text-ink dark:text-cream">
                    {item.title}
                  </h3>
                  {item.projectUrl && (
                    <a
                      href={item.projectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-xs text-teal hover:underline inline-flex items-center gap-0.5"
                    >
                      <span>live</span>
                      <span aria-hidden="true">↗</span>
                    </a>
                  )}
                </div>
                <p className="text-xs sm:text-sm font-body text-ink/75 dark:text-cream/70 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Currently Learning */}
        <section
          aria-labelledby="learning-heading"
          className="bg-cream-light dark:bg-ink-card border-ink border-2 rounded-2xl p-6 sm:p-8 shadow-hard dark:shadow-hard-dark"
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2.5 h-2.5 rounded-full bg-sunny" aria-hidden="true" />
            <h2
              id="learning-heading"
              className="text-xl sm:text-2xl font-display font-black text-ink dark:text-cream tracking-tight"
            >
              Currently Learning &amp; Researching
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {nowData.learning.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-paper dark:bg-ink-deep border-ink border shadow-hard-sm"
              >
                <h3 className="font-mono font-bold text-xs sm:text-sm text-teal mb-1">
                  {item.topic}
                </h3>
                <p className="text-xs sm:text-sm font-body text-ink/75 dark:text-cream/70 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Timestamp footer */}
        <div className="p-4 rounded-xl bg-paper dark:bg-ink-card border-ink border text-xs font-mono text-ink/60 dark:text-cream/60 flex items-center justify-between">
          <span>Status: Verified from Bengaluru workshop</span>
          <span className="font-bold text-ink dark:text-cream">
            Last updated: {nowData.lastUpdated}
          </span>
        </div>
      </div>
    </main>
  );
}
