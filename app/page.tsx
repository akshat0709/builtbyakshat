import React from "react";
import { Hero } from "@/components/ui/Hero";
import { AboutProductBlock } from "@/components/ui/AboutProductBlock";
import { ExperienceTimeline } from "@/components/ui/ExperienceTimeline";
import { ThingsIveBuilt } from "@/components/ui/ThingsIveBuilt";
import { SkillsIndex } from "@/components/ui/SkillsIndex";
import { EducationRecognition } from "@/components/ui/EducationRecognition";
import { ContactFooter } from "@/components/ui/ContactFooter";
import { Reveal } from "@/components/ui/Reveal";
import { getProductByRef } from "@/data/products";

interface PageProps {
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default function HomePage({ searchParams }: PageProps) {
  const ref = typeof searchParams?.ref === "string" ? searchParams.ref : undefined;
  const currentProduct = getProductByRef(ref);

  return (
    <main id="main-content" className="min-h-screen">
      <Hero />

      {currentProduct && (
        <Reveal delay={0.04}>
          <AboutProductBlock product={currentProduct} />
        </Reveal>
      )}

      <Reveal delay={0.06}>
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

      <Reveal delay={0.14}>
        <ContactFooter currentProduct={currentProduct} />
      </Reveal>
    </main>
  );
}
