import React from "react";
import { builderProfile } from "@/data/profile";
import { WheelchairDoodle } from "@/components/doodles/WheelchairDoodle";

export function EducationRecognition() {
  const { education, recognition } = builderProfile;

  return (
    <section id="education-recognition" aria-labelledby="edu-heading" className="py-12 md:py-16 border-t-ink border-t-2 border-dashed">
      <div className="mb-8">
        <span className="text-xs font-mono uppercase tracking-wider text-sunny font-bold block mb-1">
          04 / Education & Honors
        </span>
        <h2
          id="edu-heading"
          className="text-2xl sm:text-3xl font-display font-bold text-ink dark:text-cream tracking-tight"
        >
          Education & Recognition
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Education Box */}
        <div className="bg-cream-light dark:bg-ink-card border-ink border-2 rounded-2xl p-6 md:p-8 shadow-hard dark:shadow-hard-dark flex flex-col justify-between">
          <div>
            <div className="inline-block px-2.5 py-0.5 rounded-full bg-paper dark:bg-ink-deep border border-ink/40 dark:border-cream/30 text-xs font-mono font-semibold text-ink dark:text-cream mb-4">
              Academic Background
            </div>
            <h3 className="text-xl sm:text-2xl font-display font-bold text-ink dark:text-cream mb-1">
              {education.institution}
            </h3>
            <p className="text-sm sm:text-base font-body text-ink/85 dark:text-cream/85 font-medium mb-3">
              {education.degree}
            </p>
          </div>

          <div className="pt-4 border-t border-ink/15 dark:border-cream/15 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
            <span className="px-3 py-1 rounded-full bg-paper dark:bg-ink-deep border border-ink/40 dark:border-cream/30 text-ink/80 dark:text-cream/80 font-medium">
              {education.period}
            </span>
            <span className="px-3 py-1 rounded-full bg-sunny/30 dark:bg-sunny/20 border-ink border-2 text-ink dark:text-cream font-bold shadow-hard-sm dark:shadow-hard-dark-sm">
              {education.grade}
            </span>
          </div>
        </div>

        {/* Recognition Box */}
        <div className="bg-cream-light dark:bg-ink-card border-ink border-2 rounded-2xl p-6 md:p-8 shadow-hard dark:shadow-hard-dark">
          <div className="flex items-center justify-between mb-4">
            <div className="inline-block px-2.5 py-0.5 rounded-full bg-paper dark:bg-ink-deep border border-ink/40 dark:border-cream/30 text-xs font-mono font-semibold text-ink dark:text-cream">
              Awards & Exhibitions
            </div>
            <div className="hidden sm:block">
              <WheelchairDoodle className="w-12 h-12" decorative />
            </div>
          </div>

          <ul className="space-y-4" aria-label="Recognition achievements">
            {recognition.map((item, idx) => (
              <li
                key={idx}
                className="flex items-start gap-3 p-3 rounded-xl bg-paper dark:bg-ink-deep border-ink border"
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
