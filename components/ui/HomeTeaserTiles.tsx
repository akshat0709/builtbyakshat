"use client";

import React from "react";
import Link from "next/link";
import { TaxiDoodle } from "@/components/doodles/TaxiDoodle";
import { RobotDoodle } from "@/components/doodles/RobotDoodle";
import { WrenchDoodle } from "@/components/doodles/WrenchDoodle";

export function HomeTeaserTiles() {
  return (
    <section aria-labelledby="teasers-heading" className="py-10">
      <div className="flex items-center justify-between mb-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-teal font-bold block mb-1">
            Explore the Workshop
          </span>
          <h2
            id="teasers-heading"
            className="text-2xl sm:text-3xl font-display font-black text-ink dark:text-cream tracking-tight"
          >
            Where do you want to start?
          </h2>
        </div>
        <span className="hidden sm:inline-block font-mono text-xs text-ink/80 dark:text-cream/80">
          3 primary wings
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Tile 1: Experience */}
        <Link
          href="/experience"
          className="group relative flex flex-col justify-between p-6 rounded-2xl bg-cream-light dark:bg-ink-card border-ink border-2 shadow-hard hover:shadow-hard-lg dark:shadow-hard-dark hover:-translate-y-1 transition-all duration-200"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="px-2.5 py-1 rounded-full bg-sunny text-ink border border-ink text-[11px] font-mono font-bold">
                01 / TIMELINE
              </span>
              <div className="w-10 h-10 group-hover:scale-110 transition-transform">
                <TaxiDoodle className="w-full h-full" decorative />
              </div>
            </div>

            <h3 className="text-xl font-display font-black text-ink dark:text-cream group-hover:text-teal transition-colors">
              Experience
            </h3>
            <p className="text-xs sm:text-sm font-body text-ink/75 dark:text-cream/70 mt-2 leading-relaxed">
              Full-Stack Intern at Orange Taxi: real-time dispatch, dynamic UPI QR payments, and production telemetry.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-ink/10 dark:border-cream/10 flex items-center justify-between font-mono text-xs font-bold text-teal">
            <span>$ cd experience</span>
            <span className="group-hover:translate-x-1 transition-transform" aria-hidden="true">
              →
            </span>
          </div>
        </Link>

        {/* Tile 2: Built */}
        <Link
          href="/built"
          className="group relative flex flex-col justify-between p-6 rounded-2xl bg-cream-light dark:bg-ink-card border-ink border-2 shadow-hard hover:shadow-hard-lg dark:shadow-hard-dark hover:-translate-y-1 transition-all duration-200"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="px-2.5 py-1 rounded-full bg-teal text-white border border-ink text-[11px] font-mono font-bold">
                02 / SHIPPED
              </span>
              <div className="w-10 h-10 group-hover:scale-110 transition-transform">
                <RobotDoodle className="w-full h-full" decorative />
              </div>
            </div>

            <h3 className="text-xl font-display font-black text-ink dark:text-cream group-hover:text-teal transition-colors">
              Things I&apos;ve Built
            </h3>
            <p className="text-xs sm:text-sm font-body text-ink/75 dark:text-cream/70 mt-2 leading-relaxed">
              Tilted polaroids of Orange Taxi, Autonomous Search and Rescue Robot, and Locomotive Animal Detection.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-ink/10 dark:border-cream/10 flex items-center justify-between font-mono text-xs font-bold text-teal">
            <span>$ cd built</span>
            <span className="group-hover:translate-x-1 transition-transform" aria-hidden="true">
              →
            </span>
          </div>
        </Link>

        {/* Tile 3: Lab */}
        <Link
          href="/lab"
          className="group relative flex flex-col justify-between p-6 rounded-2xl bg-cream-light dark:bg-ink-card border-ink border-2 shadow-hard hover:shadow-hard-lg dark:shadow-hard-dark hover:-translate-y-1 transition-all duration-200"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="px-2.5 py-1 rounded-full bg-tomato text-white border border-ink text-[11px] font-mono font-bold">
                03 / PLAYGROUND
              </span>
              <div className="w-10 h-10 group-hover:scale-110 transition-transform">
                <WrenchDoodle className="w-full h-full" decorative />
              </div>
            </div>

            <h3 className="text-xl font-display font-black text-ink dark:text-cream group-hover:text-tomato transition-colors">
              The Lab
            </h3>
            <p className="text-xs sm:text-sm font-body text-ink/75 dark:text-cream/70 mt-2 leading-relaxed">
              Draggable sticker pile, interactive toys, honking taxi, and hidden easter egg triggers.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-ink/10 dark:border-cream/10 flex items-center justify-between font-mono text-xs font-bold text-tomato">
            <span>$ cd lab</span>
            <span className="group-hover:translate-x-1 transition-transform" aria-hidden="true">
              →
            </span>
          </div>
        </Link>
      </div>

      {/* Quick Workbench Banner */}
      <div className="mt-8 p-5 rounded-2xl bg-paper dark:bg-ink-card border-ink border-2 shadow-hard-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="font-mono text-xs text-ink/80 dark:text-cream/80">
          <span className="font-bold text-teal">Looking for technical specs?</span> Check out the{" "}
          <Link href="/toolbox" className="underline font-bold hover:text-sunny">
            Toolbox Workbench
          </Link>{" "}
          or see what I&apos;m learning on{" "}
          <Link href="/now" className="underline font-bold hover:text-sunny">
            /now
          </Link>
          .
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/toolbox"
            className="px-3 py-1.5 rounded-full bg-sunny text-ink border-ink border font-mono text-xs font-bold shadow-hard-sm hover:bg-sunny/80 active:translate-x-0.5 active:translate-y-0.5"
          >
            $ cd toolbox
          </Link>
          <Link
            href="/contact"
            className="px-3 py-1.5 rounded-full bg-cream-light dark:bg-ink-deep text-ink dark:text-cream border-ink border font-mono text-xs font-bold shadow-hard-sm hover:bg-sunny/30 active:translate-x-0.5 active:translate-y-0.5"
          >
            $ cd contact
          </Link>
        </div>
      </div>
    </section>
  );
}
