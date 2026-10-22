import React from "react";
import { builderProfile } from "@/data/profile";
import { TaxiDoodle } from "@/components/doodles/TaxiDoodle";
import { RobotDoodle } from "@/components/doodles/RobotDoodle";
import { TrainDoodle } from "@/components/doodles/TrainDoodle";

export function ThingsIveBuilt() {
  const { builtProjects, portfolioUrl } = builderProfile;

  const renderDoodle = (type: "taxi" | "robot" | "train") => {
    switch (type) {
      case "taxi":
        return <TaxiDoodle className="w-16 h-12" decorative />;
      case "robot":
        return <RobotDoodle className="w-14 h-14" decorative />;
      case "train":
        return <TrainDoodle className="w-16 h-12" decorative />;
    }
  };

  return (
    <section id="things-built" aria-labelledby="built-heading" className="py-12 md:py-16 border-t-ink border-t-2 border-dashed">
      <div className="flex items-center justify-between mb-8">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-tomato font-bold block mb-1">
            02 / Systems Shipped
          </span>
          <h2
            id="built-heading"
            className="text-2xl sm:text-3xl font-display font-bold text-ink dark:text-cream tracking-tight"
          >
            Things I&apos;ve Built
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {builtProjects.map((project) => {
          const isPlaceholder = project.link.includes("[") && project.link.includes("]");

          return (
            <article
              key={project.id}
              className="group flex flex-col justify-between bg-cream-light dark:bg-ink-card border-ink border-2 rounded-2xl p-5 md:p-6 shadow-hard dark:shadow-hard-dark hover:-translate-y-1 transition-transform duration-200"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="p-2 rounded-xl bg-paper dark:bg-ink-deep border-ink border-2 shadow-hard-sm dark:shadow-hard-dark-sm">
                    {renderDoodle(project.doodle)}
                  </div>
                  <span className="text-xs font-mono text-ink/50 dark:text-cream/50 font-bold">
                    #{project.id}
                  </span>
                </div>

                <h3 className="text-lg font-display font-bold text-ink dark:text-cream mb-2 leading-snug">
                  {project.title}
                </h3>

                <p className="text-sm font-body text-ink/80 dark:text-cream/80 leading-relaxed mb-4">
                  {project.description}
                </p>
              </div>

              <div>
                {/* Stack tags */}
                <div className="flex flex-wrap gap-1.5 mb-5" aria-label="Technologies">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded-full bg-paper dark:bg-ink-deep border border-ink/40 dark:border-cream/30 text-[11px] font-mono text-ink/85 dark:text-cream/85"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Link */}
                {isPlaceholder ? (
                  <span
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-paper dark:bg-ink-deep border-ink/40 border text-xs font-mono text-ink/60 dark:text-cream/60 cursor-not-allowed"
                    title={`Placeholder link: ${project.link}`}
                  >
                    <span>Source [Placeholder]</span>
                  </span>
                ) : (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-paper dark:bg-ink-deep border-ink border-2 text-xs font-mono font-semibold text-ink dark:text-cream hover:bg-sunny/30 dark:hover:bg-sunny/20 shadow-hard-sm dark:shadow-hard-dark-sm transition-colors focus-visible:ring-2 focus-visible:ring-ink dark:focus-visible:ring-cream focus-visible:outline-none"
                  >
                    <span>View project</span>
                    <span aria-hidden="true">↗</span>
                  </a>
                )}
              </div>
            </article>
          );
        })}
      </div>

      {/* Full portfolio case studies link */}
      <div className="mt-8 pt-4 text-center sm:text-left">
        <a
          href={portfolioUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cream-light dark:bg-ink-card border-ink border-2 text-xs sm:text-sm font-mono font-bold text-ink dark:text-cream hover:bg-sunny/40 dark:hover:bg-sunny/20 shadow-hard-sm dark:shadow-hard-dark-sm transition-transform active:translate-x-0.5 active:translate-y-0.5 focus-visible:ring-2 focus-visible:ring-ink dark:focus-visible:ring-cream focus-visible:outline-none"
        >
          <span>See full case studies on my portfolio</span>
          <span aria-hidden="true">→</span>
        </a>
      </div>
    </section>
  );
}
