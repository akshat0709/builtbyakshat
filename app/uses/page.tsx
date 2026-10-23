import React from "react";
import type { Metadata } from "next";
import { USES_DATA } from "@/data/uses";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Uses | Akshat Gupta",
  description:
    "The hardware, editor tools, languages, and runtime stack Akshat Gupta uses for daily systems engineering.",
  alternates: {
    canonical: "/uses",
  },
  openGraph: {
    title: "Uses | Akshat Gupta",
    description:
      "The hardware, editor tools, languages, and runtime stack Akshat Gupta uses for daily systems engineering.",
    url: absoluteUrl("/uses"),
  },
};

export default function UsesPage() {
  // Hide any items that are placeholders
  const validItems = USES_DATA.filter(
    (item) =>
      !item.name.includes("[PLACEHOLDER]") &&
      !item.description.includes("[PLACEHOLDER]")
  );

  const hardware = validItems.filter((i) => i.category === "hardware");
  const tools = validItems.filter((i) => i.category === "tools");
  const stack = validItems.filter((i) => i.category === "stack");

  return (
    <main id="main-content" className="py-6">
      <div className="mb-6">
        <span className="text-xs font-mono uppercase tracking-wider text-teal font-bold block mb-1">
          $ cd uses
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-ink dark:text-cream tracking-tight">
          Tools &amp; Workbench
        </h1>
        <p className="text-sm sm:text-base font-body text-ink/80 dark:text-cream/80 max-w-2xl mt-2 leading-relaxed">
          The software tools, editor configurations, and runtime engines I rely on to build production systems.
        </p>
      </div>

      <div className="space-y-8">
        {/* Editor & Daily Tools */}
        <section aria-labelledby="tools-heading">
          <div className="flex items-center gap-2 mb-4">
            <span className="px-2.5 py-0.5 rounded-full bg-sunny text-ink border border-ink text-xs font-mono font-bold">
              01
            </span>
            <h2
              id="tools-heading"
              className="text-xl sm:text-2xl font-display font-black text-ink dark:text-cream tracking-tight"
            >
              Editor &amp; Engineering Tools
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tools.map((item) => (
              <div
                key={item.name}
                className="p-5 rounded-2xl bg-cream-light dark:bg-ink-card border-ink border-2 shadow-hard hover:-translate-y-1 transition-transform"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-base sm:text-lg font-display font-black text-ink dark:text-cream">
                    {item.name}
                  </h3>
                  {item.url && (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-xs text-teal hover:underline inline-flex items-center gap-0.5"
                    >
                      <span>website</span>
                      <span aria-hidden="true">↗</span>
                    </a>
                  )}
                </div>
                <p className="text-xs sm:text-sm font-body text-ink/80 dark:text-cream/80 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Runtime Stack */}
        <section aria-labelledby="stack-heading">
          <div className="flex items-center gap-2 mb-4">
            <span className="px-2.5 py-0.5 rounded-full bg-teal text-white border border-ink text-xs font-mono font-bold">
              02
            </span>
            <h2
              id="stack-heading"
              className="text-xl sm:text-2xl font-display font-black text-ink dark:text-cream tracking-tight"
            >
              Software &amp; Framework Stack
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {stack.map((item) => (
              <div
                key={item.name}
                className="p-5 rounded-2xl bg-cream-light dark:bg-ink-card border-ink border-2 shadow-hard hover:-translate-y-1 transition-transform"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-base sm:text-lg font-display font-black text-ink dark:text-cream">
                    {item.name}
                  </h3>
                  {item.url && (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-xs text-teal hover:underline inline-flex items-center gap-0.5"
                    >
                      <span>docs</span>
                      <span aria-hidden="true">↗</span>
                    </a>
                  )}
                </div>
                <p className="text-xs sm:text-sm font-body text-ink/80 dark:text-cream/80 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Hardware (Only shown if non-placeholder items exist) */}
        {hardware.length > 0 && (
          <section aria-labelledby="hardware-heading">
            <div className="flex items-center gap-2 mb-4">
              <span className="px-2.5 py-0.5 rounded-full bg-tomato text-white border border-ink text-xs font-mono font-bold">
                03
              </span>
              <h2
                id="hardware-heading"
                className="text-xl sm:text-2xl font-display font-black text-ink dark:text-cream tracking-tight"
              >
                Hardware &amp; Test Bench
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {hardware.map((item) => (
                <div
                  key={item.name}
                  className="p-5 rounded-2xl bg-cream-light dark:bg-ink-card border-ink border-2 shadow-hard"
                >
                  <h3 className="text-base sm:text-lg font-display font-black text-ink dark:text-cream mb-2">
                    {item.name}
                  </h3>
                  <p className="text-xs sm:text-sm font-body text-ink/80 dark:text-cream/80 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
