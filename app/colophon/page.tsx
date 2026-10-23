import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Colophon | Akshat Gupta",
  description:
    "Design engineering colophon for builtby.akshatgupta.dev: architecture, typography, color palette tokens, motion physics, and hosting.",
  alternates: {
    canonical: "/colophon",
  },
  openGraph: {
    title: "Colophon | Akshat Gupta",
    description:
      "Design engineering colophon for builtby.akshatgupta.dev: typography, color palette tokens, motion physics, and architecture.",
    url: absoluteUrl("/colophon"),
  },
};

const COLOR_SWATCHES = [
  {
    name: "Cream",
    hex: "#FFF6E5",
    token: "bg-cream",
    border: "#1A1A1A",
    description: "Light mode canvas tone. Warm parchment that avoids clinical white glare.",
  },
  {
    name: "Ink",
    hex: "#1A1A1A",
    token: "bg-ink",
    textLight: true,
    border: "#1A1A1A",
    description: "Deep charcoal ink for 2px borders, typography, and hard offset shadows.",
  },
  {
    name: "Sunny",
    hex: "#FFD13B",
    token: "bg-sunny",
    border: "#1A1A1A",
    description: "Flat solar yellow accent for primary tags, badges, and active pills.",
  },
  {
    name: "Teal",
    hex: "#0A524D",
    token: "bg-teal",
    textLight: true,
    border: "#1A1A1A",
    description: "Deep pine teal accent for live production status and links.",
  },
  {
    name: "Tomato",
    hex: "#C92A1D",
    token: "bg-tomato",
    textLight: true,
    border: "#1A1A1A",
    description: "Flat crimson tomato for prototype status and tactile warnings.",
  },
  {
    name: "Ink Deep",
    hex: "#0D0D0D",
    token: "bg-ink-deep",
    textLight: true,
    border: "#FFF6E5",
    description: "Dark mode background canvas with low contrast eye comfort.",
  },
];

export default function ColophonPage() {
  return (
    <main id="main-content" className="py-6">
      <div className="mb-6">
        <span className="text-xs font-mono uppercase tracking-wider text-teal font-bold block mb-1">
          $ cd colophon
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-ink dark:text-cream tracking-tight">
          Site Colophon
        </h1>
        <p className="text-sm sm:text-base font-body text-ink/80 dark:text-cream/80 max-w-2xl mt-2 leading-relaxed">
          How this website was designed and built. Notes on typography, color tokens, spring physics, and infrastructure.
        </p>
      </div>

      <div className="space-y-8">
        {/* Core Architecture */}
        <section
          aria-labelledby="arch-heading"
          className="bg-cream-light dark:bg-ink-card border-ink border-2 rounded-2xl p-6 sm:p-8 shadow-hard-lg dark:shadow-hard-dark-lg"
        >
          <h2
            id="arch-heading"
            className="text-xl sm:text-2xl font-display font-black text-ink dark:text-cream tracking-tight mb-3"
          >
            Engineering &amp; Framework
          </h2>
          <p className="text-sm sm:text-base font-body text-ink/85 dark:text-cream/85 leading-relaxed mb-4">
            This site is engineered with <strong>Next.js 14 App Router</strong> and <strong>TypeScript</strong>.
            Pages are statically generated (SSG) at build time with edge routes for dynamic Open Graph card rendering
            and SVG embed badge generation.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
            <div className="p-3 rounded-xl bg-paper dark:bg-ink-deep border-ink border">
              <span className="font-bold text-teal block mb-1">Runtime</span>
              <span>Next.js 14 · React 18</span>
            </div>
            <div className="p-3 rounded-xl bg-paper dark:bg-ink-deep border-ink border">
              <span className="font-bold text-teal block mb-1">Styling</span>
              <span>Tailwind CSS · Custom Tokens</span>
            </div>
            <div className="p-3 rounded-xl bg-paper dark:bg-ink-deep border-ink border">
              <span className="font-bold text-teal block mb-1">Animation</span>
              <span>Framer Motion 11</span>
            </div>
          </div>
        </section>

        {/* Color Palette Swatches */}
        <section aria-labelledby="palette-heading">
          <div className="flex items-center gap-2 mb-4">
            <span className="px-2.5 py-0.5 rounded-full bg-sunny text-ink border border-ink text-xs font-mono font-bold">
              Tokens
            </span>
            <h2
              id="palette-heading"
              className="text-xl sm:text-2xl font-display font-black text-ink dark:text-cream tracking-tight"
            >
              Color System
            </h2>
          </div>

          <p className="text-sm font-body text-ink/80 dark:text-cream/80 mb-5 leading-relaxed">
            Flat, deliberate accents anchored by 2px ink borders and hard offset drop shadows.
            No fuzzy gradients, no artificial blurs, and no glowing borders.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {COLOR_SWATCHES.map((swatch) => (
              <div
                key={swatch.name}
                className="p-4 rounded-2xl bg-cream-light dark:bg-ink-card border-ink border-2 shadow-hard flex flex-col justify-between"
              >
                <div>
                  <div
                    className="h-16 w-full rounded-xl border-ink border-2 mb-3 shadow-hard-sm flex items-center justify-center font-mono text-xs font-bold"
                    style={{ backgroundColor: swatch.hex, color: swatch.textLight ? "#FFFFFF" : "#1A1A1A" }}
                  >
                    {swatch.hex}
                  </div>
                  <h3 className="font-display font-black text-base text-ink dark:text-cream">
                    {swatch.name}
                  </h3>
                  <p className="text-xs font-body text-ink/90 dark:text-cream/90 mt-1 leading-relaxed">
                    {swatch.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Typography */}
        <section
          aria-labelledby="type-heading"
          className="bg-cream-light dark:bg-ink-card border-ink border-2 rounded-2xl p-6 sm:p-8 shadow-hard dark:shadow-hard-dark"
        >
          <h2
            id="type-heading"
            className="text-xl sm:text-2xl font-display font-black text-ink dark:text-cream tracking-tight mb-4"
          >
            Typography
          </h2>

          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-paper dark:bg-ink-deep border-ink border">
              <span className="font-mono text-xs font-bold text-teal block mb-1">
                Display · Space Grotesk
              </span>
              <p className="font-display text-2xl sm:text-3xl font-black text-ink dark:text-cream tracking-tight">
                Akshat Gupta · Workshop Door
              </p>
              <p className="text-xs font-body text-ink/90 dark:text-cream/90 mt-1">
                Selected for chunky mechanical quirks, angular terminals, and confident weight.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-paper dark:bg-ink-deep border-ink border">
              <span className="font-mono text-xs font-bold text-teal block mb-1">
                Body · Plus Jakarta Sans
              </span>
              <p className="font-body text-base text-ink dark:text-cream leading-relaxed">
                I build real systems, from a live ride-hailing dispatch platform to an autonomous rescue robot.
              </p>
              <p className="text-xs font-body text-ink/90 dark:text-cream/90 mt-1">
                Selected for geometric clarity, generous open counters, and reading comfort across mobile viewports.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-paper dark:bg-ink-deep border-ink border">
              <span className="font-mono text-xs font-bold text-teal block mb-1">
                Terminal &amp; Badges · JetBrains Mono
              </span>
              <p className="font-mono text-sm text-ink dark:text-cream font-bold">
                $ cd built · Built with plain-English labels
              </p>
              <p className="text-xs font-body text-ink/90 dark:text-cream/90 mt-1">
                Selected for developer ergonomics, distinctive operator symbols, and uniform tabular figures.
              </p>
            </div>
          </div>
        </section>

        {/* Motion Tokens */}
        <section
          aria-labelledby="motion-heading"
          className="bg-cream-light dark:bg-ink-card border-ink border-2 rounded-2xl p-6 sm:p-8 shadow-hard dark:shadow-hard-dark"
        >
          <h2
            id="motion-heading"
            className="text-xl sm:text-2xl font-display font-black text-ink dark:text-cream tracking-tight mb-3"
          >
            Motion Physics &amp; Accessibility
          </h2>

          <p className="text-sm font-body text-ink/80 dark:text-cream/80 leading-relaxed mb-4">
            Transitions are governed by a single spring configuration:{" "}
            <code className="font-mono text-xs bg-paper dark:bg-ink-deep px-2 py-0.5 rounded border border-ink">
              stiffness: 350, damping: 28, mass: 0.5
            </code>
            . This creates a tactile, physical snap with zero rubbery overshooting that causes cognitive fatigue.
          </p>

          <p className="text-sm font-body text-ink/80 dark:text-cream/80 leading-relaxed">
            <strong>Accessibility First:</strong> Every interactive component queries{" "}
            <code className="font-mono text-xs bg-paper dark:bg-ink-deep px-1.5 py-0.5 rounded border border-ink">
              useReducedMotion()
            </code>
            . If a visitor has reduced motion enabled in their operating system, animations, transitions, and the cursor blob
            collapse immediately to static states.
          </p>
        </section>

        {/* Repository & Open Source */}
        <section className="p-6 rounded-2xl bg-paper dark:bg-ink-card border-ink border-2 shadow-hard flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-display font-black text-lg text-ink dark:text-cream">
              Source Code
            </h3>
            <p className="text-xs sm:text-sm font-body text-ink/80 dark:text-cream/80 mt-0.5">
              Review commits, architecture, and tests in the GitHub repository.
            </p>
          </div>

          <a
            href="https://github.com/akshat0709/builtbyakshat"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-sunny text-ink border-ink border-2 font-mono text-xs font-bold shadow-hard-sm hover:bg-sunny/80 active:translate-x-0.5 active:translate-y-0.5 transition-transform"
          >
            <span>GitHub Repository</span>
            <span aria-hidden="true">↗</span>
          </a>
        </section>
      </div>
    </main>
  );
}
