import React from "react";
import { builderProfile } from "@/data/profile";
import { CircuitChipDoodle } from "@/components/doodles/CircuitChipDoodle";
import { WrenchDoodle } from "@/components/doodles/WrenchDoodle";

export function SkillsIndex() {
  const { skills } = builderProfile;

  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="relative py-12 md:py-16 border-t-ink border-t-2 border-dashed overflow-hidden"
    >
      {/* Background oversized word */}
      <div
        className="absolute top-4 right-0 text-7xl sm:text-8xl md:text-9xl font-display font-black text-ink/[0.04] dark:text-cream/[0.04] select-none pointer-events-none tracking-tighter"
        aria-hidden="true"
      >
        SKILLS.
      </div>

      <div className="flex items-center justify-between mb-8">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-teal font-bold block mb-1">
            03 / Workshop Tooling
          </span>
          <h2
            id="skills-heading"
            className="text-2xl sm:text-3xl font-display font-black text-ink dark:text-cream tracking-tight"
          >
            Technical Competencies
          </h2>
          <p className="text-xs sm:text-sm font-body text-ink/75 dark:text-cream/75 mt-1">
            Toolsets and engineering environments I use to ship production web apps and embedded systems.
          </p>
        </div>

        <div className="hidden sm:flex items-center gap-2" aria-hidden="true">
          <CircuitChipDoodle className="w-12 h-12" decorative />
          <WrenchDoodle className="w-12 h-12" decorative />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {skills.map((group, idx) => {
          const accents = [
            "bg-sunny/30 text-ink dark:text-cream border-ink",
            "bg-teal/25 text-teal dark:text-teal border-ink",
            "bg-tomato/25 text-tomato dark:text-tomato border-ink",
          ];
          const accentStyle = accents[idx % accents.length];

          return (
            <div
              key={group.category}
              className="bg-cream-light dark:bg-ink-card border-ink border-2 rounded-2xl p-6 shadow-hard-lg dark:shadow-hard-dark-lg flex flex-col justify-between rotate-[-0.5deg] hover:rotate-0 hover:-translate-y-1 transition-all duration-200"
            >
              <div>
                <div
                  className={`inline-block px-3 py-1 rounded-full border text-xs font-mono font-bold shadow-hard-sm dark:shadow-hard-dark-sm mb-4 ${accentStyle}`}
                >
                  {group.category}
                </div>
                <ul className="flex flex-wrap gap-2" aria-label={`Skills for ${group.category}`}>
                  {group.skills.map((skill) => (
                    <li
                      key={skill}
                      className="px-3 py-1.5 rounded-lg bg-paper dark:bg-ink-deep border-ink border text-xs sm:text-sm font-mono text-ink dark:text-cream font-medium shadow-hard-sm hover:animate-wobble cursor-default select-none"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
