"use client";

import React, { useState } from "react";
import { builderProfile } from "@/data/profile";
import { TaxiDoodle } from "@/components/doodles/TaxiDoodle";
import { RobotDoodle } from "@/components/doodles/RobotDoodle";
import { TrainDoodle } from "@/components/doodles/TrainDoodle";
import { ProductStatus } from "@/data/products";

export function ThingsIveBuilt() {
  const { builtProjects, portfolioUrl } = builderProfile;
  const [peeledCards, setPeeledCards] = useState<Record<string, boolean>>({});

  const togglePeel = (id: string) => {
    setPeeledCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const renderDoodle = (type: "taxi" | "robot" | "train") => {
    switch (type) {
      case "taxi":
        return <TaxiDoodle className="w-24 h-16" decorative />;
      case "robot":
        return <RobotDoodle className="w-20 h-20" decorative />;
      case "train":
        return <TrainDoodle className="w-24 h-16" decorative />;
    }
  };

  const formatStatus = (status: ProductStatus) => {
    switch (status) {
      case "live":
        return "Live";
      case "pre-launch":
        return "Pre-launch";
      case "prototype":
        return "Prototype";
      default:
        return status;
    }
  };

  const getStatusBadgeStyle = (status: ProductStatus) => {
    switch (status) {
      case "live":
        return "bg-teal text-white border-ink";
      case "pre-launch":
        return "bg-sunny text-ink border-ink";
      case "prototype":
        return "bg-tomato text-white border-ink";
    }
  };

  const tilts = ["rotate-[-1.5deg]", "rotate-[1.5deg]", "rotate-[-1deg]"];

  return (
    <section
      id="things-built"
      aria-labelledby="built-heading"
      className="relative py-12 md:py-16 border-t-ink border-t-2 border-dashed overflow-hidden"
    >
      {/* Background oversized word */}
      <div
        className="absolute top-4 right-0 text-7xl sm:text-8xl md:text-9xl font-display font-black text-ink/[0.04] dark:text-cream/[0.04] select-none pointer-events-none tracking-tighter"
        aria-hidden="true"
      >
        BUILT.
      </div>

      <div className="flex items-center justify-between mb-10">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-tomato font-bold block mb-1">
            02 / Shipped Systems
          </span>
          <h2
            id="built-heading"
            className="text-2xl sm:text-3xl font-display font-black text-ink dark:text-cream tracking-tight"
          >
            Things I&apos;ve Built
          </h2>
        </div>
      </div>

      {/* 3 Tilted Polaroid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {builtProjects.map((project, idx) => {
          const isPeeled = !!peeledCards[project.id];
          const tiltClass = tilts[idx % tilts.length];

          return (
            <div
              key={project.id}
              className={`relative group bg-[#FFFDF7] dark:bg-ink-card border-ink border-2 rounded-2xl p-5 pb-7 shadow-hard-lg dark:shadow-hard-dark-lg ${tiltClass} hover:rotate-0 hover:-translate-y-2 transition-all duration-200 flex flex-col justify-between`}
            >
              {/* Top Polaroid Art Frame */}
              <div className="relative aspect-[4/3] w-full rounded-xl bg-cream/70 dark:bg-ink-deep border-ink border-2 flex items-center justify-center p-4 mb-4 shadow-inner overflow-hidden">
                {renderDoodle(project.doodle)}

                {/* Status Sticker pinned on photo */}
                <div
                  className={`absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-full border text-[11px] font-mono font-bold shadow-hard-sm ${getStatusBadgeStyle(
                    project.status
                  )}`}
                >
                  {formatStatus(project.status)}
                </div>

                {/* Polaroid corner pin tape */}
                <div
                  className="absolute -top-3 -left-3 w-10 h-4 bg-sunny/60 dark:bg-sunny/40 border border-ink/40 rotate-[-40deg] pointer-events-none"
                  aria-hidden="true"
                />
              </div>

              {/* Title & Description */}
              <div className="mb-4">
                <h3 className="text-lg sm:text-xl font-display font-black text-ink dark:text-cream leading-tight mb-2">
                  {project.title}
                </h3>
                <p className="text-xs sm:text-sm font-body text-ink/80 dark:text-cream/80 leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Peel-Corner Stack Reveal Section */}
              <div className="relative pt-3 border-t border-ink/15 dark:border-cream/15">
                {/* Peel toggle button */}
                <div className="flex items-center justify-between mb-2">
                  <button
                    onClick={() => togglePeel(project.id)}
                    type="button"
                    aria-expanded={isPeeled}
                    aria-label={`Toggle tech stack reveal for ${project.title}`}
                    className="group/peel inline-flex items-center gap-1.5 text-xs font-mono font-bold text-teal dark:text-teal hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ink"
                  >
                    <span>{isPeeled ? "Peel back stack ▲" : "Peel corner for stack ▾"}</span>
                  </button>

                  <span className="text-[10px] font-mono text-ink/40 dark:text-cream/40">
                    #{project.id}
                  </span>
                </div>

                {/* Stack reveal panel (visible on peel toggle or hover) */}
                <div
                  className={`transition-all duration-200 overflow-hidden ${
                    isPeeled
                      ? "max-h-36 opacity-100 mt-2 mb-3"
                      : "max-h-0 opacity-0 group-hover:max-h-36 group-hover:opacity-100 group-hover:mt-2 group-hover:mb-3"
                  }`}
                >
                  <div className="p-2.5 rounded-xl bg-sunny/15 dark:bg-sunny/10 border-ink border text-[11px] font-mono flex flex-wrap gap-1.5">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded bg-paper dark:bg-ink-deep border border-ink/40 text-ink dark:text-cream font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Verification / Project Links */}
                {project.verifyLinks && project.verifyLinks.length > 0 && (
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    {project.verifyLinks.map((verify) => (
                      <a
                        key={verify.url}
                        href={verify.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-paper dark:bg-ink-deep border-ink border text-[11px] font-mono font-bold text-ink dark:text-cream hover:bg-sunny shadow-hard-sm active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-transform focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ink"
                      >
                        <span>{verify.label}</span>
                        <span aria-hidden="true">↗</span>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Case studies sticker link */}
      <div className="mt-12 text-center sm:text-left">
        <a
          href={portfolioUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-sunny text-ink border-ink border-2 text-xs sm:text-sm font-mono font-black shadow-hard hover:-translate-y-1 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
        >
          <span>See full case studies on my portfolio</span>
          <span aria-hidden="true" className="text-base">→</span>
        </a>
      </div>
    </section>
  );
}
