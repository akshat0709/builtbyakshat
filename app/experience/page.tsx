import React from "react";
import type { Metadata } from "next";
import { ExperienceTimeline } from "@/components/ui/ExperienceTimeline";
import { EducationRecognition } from "@/components/ui/EducationRecognition";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Experience | Akshat Gupta",
  description:
    "Engineering work experience timeline of Akshat Gupta: Full-Stack Developer Intern at Orange Taxi, real-time dispatch, dynamic UPI QR payments, and academic honors.",
  alternates: {
    canonical: "/experience",
  },
  openGraph: {
    title: "Experience | Akshat Gupta",
    description:
      "Engineering work experience timeline of Akshat Gupta: Full-Stack Developer Intern at Orange Taxi, real-time dispatch, dynamic UPI QR payments, and academic honors.",
    url: absoluteUrl("/experience"),
  },
};

export default function ExperiencePage() {
  return (
    <main id="main-content" className="py-6">
      <div className="mb-6">
        <span className="text-xs font-mono uppercase tracking-wider text-teal font-bold block mb-1">
          $ cd experience
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-ink dark:text-cream tracking-tight">
          Systems in Production
        </h1>
        <p className="text-sm sm:text-base font-body text-ink/80 dark:text-cream/80 max-w-2xl mt-2 leading-relaxed">
          I build and deploy real systems that move vehicles and process transactions under real-world constraints.
          Here is what I have built in production and where I have studied.
        </p>
      </div>

      <ExperienceTimeline />
      <EducationRecognition />
    </main>
  );
}
