import React from "react";
import { builderProfile } from "@/data/profile";

export function SkillsIndex() {
  const { skills } = builderProfile;

  return (
    <section id="skills" aria-labelledby="skills-heading" className="py-12 md:py-16 border-t-ink border-t-2 border-dashed">
      <div className="mb-8">
        <span className="text-xs font-mono uppercase tracking-wider text-teal font-bold block mb-1">
          03 / Technical Competencies
        </span>
        <h2
          id="skills-heading"
          className="text-2xl sm:text-3xl font-display font-bold text-ink dark:text-cream tracking-tight"
        >
          Skills
        </h2>
        <p className="text-sm font-body text-ink/75 dark:text-cream/75 mt-1">
          Grouped technical toolset and environments I write code and build hardware with.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {skills.map((group) => (
          <div
            key={group.category}
            className="bg-cream-light dark:bg-ink-card border-ink border-2 rounded-2xl p-6 shadow-hard dark:shadow-hard-dark flex flex-col justify-between"
          >
            <div>
              <div className="inline-block px-2.5 py-0.5 rounded-full bg-paper dark:bg-ink-deep border border-ink/40 dark:border-cream/30 text-xs font-mono font-semibold text-ink dark:text-cream mb-4">
                {group.category}
              </div>
              <ul className="flex flex-wrap gap-2" aria-label={`Skills for ${group.category}`}>
                {group.skills.map((skill) => (
                  <li
                    key={skill}
                    className="px-3 py-1.5 rounded-lg bg-paper dark:bg-ink-deep border-ink border text-xs sm:text-sm font-mono text-ink dark:text-cream font-medium"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
