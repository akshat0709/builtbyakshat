import React from "react";
import { builderProfile } from "@/data/profile";
import { TaxiDoodle } from "@/components/doodles/TaxiDoodle";
import { ProductStatus } from "@/data/products";

export function ExperienceTimeline() {
  const { experience } = builderProfile;

  const formatStatus = (status: ProductStatus) => {
    switch (status) {
      case "live":
        return "Live";
      case "pre-launch":
        return "Pre-launch";
      case "prototype":
        return "Prototype";
      default:
        return status;
    }
  };

  const getStatusBadgeStyle = (status: ProductStatus) => {
    switch (status) {
      case "live":
        return "bg-teal/25 text-teal dark:text-teal border-ink";
      case "pre-launch":
        return "bg-sunny/40 text-ink dark:text-cream border-ink";
      case "prototype":
        return "bg-tomato/25 text-tomato dark:text-tomato border-ink";
    }
  };

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

            {/* Header: Role, Company, Status, Period */}
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-3">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h3 className="text-xl sm:text-2xl font-display font-bold text-ink dark:text-cream">
                    {item.role}
                  </h3>
                  {/* Status chip driven by product status */}
                  <span
                    className={`px-2.5 py-0.5 rounded-full border text-[11px] font-mono font-bold shadow-hard-sm dark:shadow-hard-dark-sm ${getStatusBadgeStyle(
                      item.status
                    )}`}
                  >
                    {formatStatus(item.status)}
                  </span>
                </div>
                <div className="text-sm font-mono font-medium text-ink/80 dark:text-cream/80">
                  {item.company}
                </div>
              </div>
              <div className="self-start sm:self-auto px-3 py-1 rounded-full bg-sunny/30 dark:bg-sunny/20 border-ink border-2 text-xs font-mono font-semibold text-ink dark:text-cream shadow-hard-sm dark:shadow-hard-dark-sm">
                {item.startDate} - {item.endDate}
              </div>
            </div>

            {/* Detailed description */}
            <p className="text-sm sm:text-base font-body text-ink/90 dark:text-cream/90 leading-relaxed my-4">
              {item.description}
            </p>

            {/* Stack Tags */}
            <div className="flex flex-wrap gap-1.5 mb-5" aria-label="Technologies used">
              {item.stack.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-0.5 rounded-full bg-paper dark:bg-ink-deep border-ink border text-xs font-mono text-ink dark:text-cream font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Verification links strip */}
            {item.verifyLinks && item.verifyLinks.length > 0 && (
              <div className="pt-3 border-t border-ink/15 dark:border-cream/15 flex flex-wrap items-center gap-3">
                <span className="text-xs font-mono text-ink/60 dark:text-cream/60 font-semibold">
                  Verify:
                </span>
                {item.verifyLinks.map((verify) => (
                  <a
                    key={verify.url}
                    href={verify.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-mono font-medium text-ink dark:text-cream hover:text-teal underline underline-offset-4 decoration-ink/40 hover:decoration-teal transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ink"
                  >
                    <span>{verify.label}</span>
                    <span aria-hidden="true" className="text-[10px]">↗</span>
                  </a>
                ))}
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
