import React from "react";
import { builderProfile } from "@/data/profile";
import { WheelchairDoodle } from "@/components/doodles/WheelchairDoodle";
import { LightbulbDoodle } from "@/components/doodles/LightbulbDoodle";

export function EducationRecognition() {
  const { education, recognition } = builderProfile;

  return (
    <section
      id="education-recognition"
      aria-labelledby="edu-heading"
      className="relative py-12 md:py-16 border-t-ink border-t-2 border-dashed overflow-hidden"
    >
      {/* Background oversized word */}
      <div
        className="absolute top-4 right-0 text-7xl sm:text-8xl md:text-9xl font-display font-black text-ink/[0.04] dark:text-cream/[0.04] select-none pointer-events-none tracking-tighter"
        aria-hidden="true"
      >
        HONORS.
      </div>

      <div className="flex items-center justify-between mb-8">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-teal font-bold block mb-1">
            04 / Rigor & Honors
          </span>
          <h2
            id="edu-heading"
            className="text-2xl sm:text-3xl font-display font-black text-ink dark:text-cream tracking-tight"
          >
            Education & Recognition
          </h2>
        </div>

        <div className="hidden sm:block" aria-hidden="true">
          <LightbulbDoodle className="w-12 h-12" decorative />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Education Box */}
        <div className="bg-cream-light dark:bg-ink-card border-ink border-2 rounded-2xl p-6 md:p-8 shadow-hard-lg dark:shadow-hard-dark-lg flex flex-col justify-between rotate-[-0.5deg] hover:rotate-0 hover:-translate-y-1 transition-all duration-200">
          <div>
            <div className="inline-block px-3 py-1 rounded-full bg-paper dark:bg-ink-deep border border-ink text-xs font-mono font-bold text-ink dark:text-cream mb-4 shadow-hard-sm">
              Academic Degree
            </div>
            <h3 className="text-xl sm:text-2xl font-display font-black text-ink dark:text-cream mb-1">
              {education.institution}
            </h3>
            <p className="text-sm sm:text-base font-body text-ink/85 dark:text-cream/85 font-medium mb-3">
              {education.degree}
            </p>
          </div>

          <div className="pt-4 border-t border-ink/15 dark:border-cream/15 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
            <span className="px-3 py-1 rounded-full bg-paper dark:bg-ink-deep border border-ink text-ink/80 dark:text-cream/80 font-bold">
              {education.period}
            </span>
            <span className="px-3 py-1 rounded-full bg-sunny text-ink border-ink border-2 font-black shadow-hard-sm">
              {education.grade}
            </span>
          </div>
        </div>

        {/* Recognition Box */}
        <div className="bg-cream-light dark:bg-ink-card border-ink border-2 rounded-2xl p-6 md:p-8 shadow-hard-lg dark:shadow-hard-dark-lg rotate-[0.5deg] hover:rotate-0 hover:-translate-y-1 transition-all duration-200">
          <div className="flex items-center justify-between mb-4">
            <div className="inline-block px-3 py-1 rounded-full bg-paper dark:bg-ink-deep border border-ink text-xs font-mono font-bold text-ink dark:text-cream shadow-hard-sm">
              Science Exhibitions & Awards
            </div>
            <div className="hidden sm:block">
              <WheelchairDoodle className="w-12 h-12" decorative />
            </div>
          </div>

          <ul className="space-y-3.5" aria-label="Recognition achievements">
            {recognition.map((item, idx) => (
              <li
                key={idx}
                className="flex items-start gap-3 p-3 rounded-xl bg-paper dark:bg-ink-deep border-ink border shadow-hard-sm"
              >
                <span
                  className="mt-1 w-2 h-2 rounded-full bg-teal shrink-0"
                  aria-hidden="true"
                />
                <div>
                  <h4 className="text-sm sm:text-base font-display font-bold text-ink dark:text-cream leading-snug">
                    {item.title}
                  </h4>
                  <p className="text-xs sm:text-sm font-body text-ink/75 dark:text-cream/70 mt-0.5">
                    {item.context}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
