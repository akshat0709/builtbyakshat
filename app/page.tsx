import React from "react";
import { Hero } from "@/components/ui/Hero";
import { ExperienceTimeline } from "@/components/ui/ExperienceTimeline";
import { ThingsIveBuilt } from "@/components/ui/ThingsIveBuilt";
import { SkillsIndex } from "@/components/ui/SkillsIndex";
import { EducationRecognition } from "@/components/ui/EducationRecognition";
import { ContactFooter } from "@/components/ui/ContactFooter";
import { Reveal } from "@/components/ui/Reveal";

export default function HomePage() {
  return (
    <main id="main-content" className="min-h-screen">
      <Hero />

      <Reveal delay={0.05}>
        <ExperienceTimeline />
      </Reveal>

      <Reveal delay={0.08}>
        <ThingsIveBuilt />
      </Reveal>

      <Reveal delay={0.1}>
        <SkillsIndex />
      </Reveal>

      <Reveal delay={0.12}>
        <EducationRecognition />
      </Reveal>

      <Reveal delay={0.15}>
        <ContactFooter />
      </Reveal>
    </main>
  );
}
