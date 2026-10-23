import React from "react";
import type { Metadata } from "next";
import { ThingsIveBuilt } from "@/components/ui/ThingsIveBuilt";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Things I've Built | Akshat Gupta",
  description:
    "Index of software and hardware systems built by Akshat Gupta: Orange Taxi (electric ride-hailing PWA), Autonomous Rescue Robot (GPS-denied path planning), and Animal Detection on Locomotive Tracks.",
  alternates: {
    canonical: "/built",
  },
  openGraph: {
    title: "Things I've Built | Akshat Gupta",
    description:
      "Index of software and hardware systems built by Akshat Gupta: Orange Taxi, Autonomous Rescue Robot, and Animal Detection on Locomotive Tracks.",
    url: absoluteUrl("/built"),
  },
};

export default function BuiltPage() {
  return (
    <main id="main-content" className="py-6">
      <div className="mb-6">
        <span className="text-xs font-mono uppercase tracking-wider text-teal font-bold block mb-1">
          $ cd built
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-ink dark:text-cream tracking-tight">
          Things I&apos;ve Built
        </h1>
        <p className="text-sm sm:text-base font-body text-ink/80 dark:text-cream/80 max-w-2xl mt-2 leading-relaxed">
          From full-stack electric cab dispatch platforms to autonomous robots navigating GPS-denied zones.
          Click any card for technical specs and architecture decisions.
        </p>
      </div>

      <ThingsIveBuilt />
    </main>
  );
}
