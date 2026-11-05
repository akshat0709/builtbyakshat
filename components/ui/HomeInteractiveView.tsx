"use client";

import React, { useState } from "react";
import { FlipCalendarHero } from "@/components/ui/FlipCalendarHero";
import { ProjectDoors, DoorProject } from "@/components/ui/ProjectDoors";
import { ProjectRoomModal } from "@/components/ui/ProjectRoomModal";
import { StoryTimeline } from "@/components/ui/StoryTimeline";
import { HomeTeaserTiles } from "@/components/ui/HomeTeaserTiles";
import { ContactModal } from "@/components/ui/ContactModal";

export function HomeInteractiveView() {
  const [selectedProject, setSelectedProject] = useState<DoorProject | null>(null);
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <div className="space-y-10 sm:space-y-14">
      {/* 1. 3D Desk Flip-Calendar Hero */}
      <FlipCalendarHero onOpenContact={() => setIsContactOpen(true)} />

      {/* 2. 3D Doors Works Wall ("Magic happens behind the doors") */}
      <ProjectDoors
        onSelectProject={(p) => setSelectedProject(p)}
        openDoorId={selectedProject?.id ?? null}
      />

      {/* 3. 'My Story' Odometer Timeline */}
      <StoryTimeline />

      {/* 4. Sub-page Navigation Tiles (Experience, Built, Lab) */}
      <HomeTeaserTiles />

      {/* 5. Project Room Modal (when door opens) */}
      <ProjectRoomModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* 6. Contact / Inquiry Modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </div>
  );
}
