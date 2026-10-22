import React from "react";
import { builderProfile } from "@/data/profile";
import { TaxiDoodle } from "@/components/doodles/TaxiDoodle";

export function ExperienceTimeline() {
  const { experience } = builderProfile;

  return (
    <section id="experience" aria-labelledby="experience-heading" className="py-12 md:py-16">
      <div className="flex items-center justify-between mb-8">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-teal dark:text-teal font-bold block mb-1">
            01 / Background
          </span>
          <h2
            id="experience-heading"
            className="text-2xl sm:text-3xl font-display font-bold text-ink dark:text-cream tracking-tight"
          >
            Experience
          </h2>
        </div>
        <div className="hidden sm:block">
          <TaxiDoodle className="w-20 h-14" decorative />
        </div>
      </div>

      <div className="relative pl-6 md:pl-8 border-l-ink border-l-2 space-y-10">
        {experience.map((item, index) => (
          <article
            key={`${item.company}-${index}`}
            className="relative bg-cream-light dark:bg-ink-card border-ink border-2 rounded-2xl p-6 md:p-8 shadow-hard dark:shadow-hard-dark"
          >
            {/* Timeline pin */}
            <div
              className="absolute -left-[31px] md:-left-[39px] top-6 w-4 h-4 rounded-full bg-tomato border-ink border-2 shadow-hard-sm dark:shadow-hard-dark-sm"
              aria-hidden="true"
            />

            {/* Header: Role, Company, Period */}
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-3">
              <div>
                <h3 className="text-xl sm:text-2xl font-display font-bold text-ink dark:text-cream">
                  {item.role}
                </h3>
                <div className="text-sm font-mono font-medium text-ink/80 dark:text-cream/80 mt-0.5">
                  {item.company}
                </div>
              </div>
              <div className="self-start sm:self-auto px-3 py-1 rounded-full bg-sunny/30 dark:bg-sunny/20 border-ink border-2 text-xs font-mono font-semibold text-ink dark:text-cream shadow-hard-sm dark:shadow-hard-dark-sm">
                {item.period}
              </div>
            </div>

            {/* Detailed description */}
            <p className="text-sm sm:text-base font-body text-ink/90 dark:text-cream/90 leading-relaxed my-4">
              {item.description}
            </p>

            {/* Stack Tags & Link */}
            <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-ink/15 dark:border-cream/15">
              <div className="flex flex-wrap gap-1.5" aria-label="Technologies used">
                {item.stack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-0.5 rounded-full bg-paper dark:bg-ink-deep border-ink border text-xs font-mono text-ink dark:text-cream font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {item.link && (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-teal text-white border-ink border-2 text-xs font-mono font-semibold hover:bg-teal/90 shadow-hard-sm dark:shadow-hard-dark-sm transition-transform active:translate-x-0.5 active:translate-y-0.5 focus-visible:ring-2 focus-visible:ring-ink dark:focus-visible:ring-cream focus-visible:outline-none self-start sm:self-auto shrink-0"
                >
                  <span>Visit {item.company}</span>
                  <span aria-hidden="true">↗</span>
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
