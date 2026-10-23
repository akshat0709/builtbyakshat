import React from "react";
import type { Metadata } from "next";
import { TOOLBOX_DRAWERS } from "@/data/toolbox";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Toolbox | Akshat Gupta",
  description:
    "The engineering workbench: programming languages, web backends, security, and hardware sensor tools used by Akshat Gupta.",
  alternates: {
    canonical: "/toolbox",
  },
  openGraph: {
    title: "Toolbox | Akshat Gupta",
    description:
      "The engineering workbench: programming languages, web backends, security, and hardware sensor tools used by Akshat Gupta.",
    url: absoluteUrl("/toolbox"),
  },
};

export default function ToolboxPage() {
  return (
    <main id="main-content" className="py-6">
      <div className="mb-6">
        <span className="text-xs font-mono uppercase tracking-wider text-teal font-bold block mb-1">
          $ cd toolbox
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-ink dark:text-cream tracking-tight">
          Skills Workbench
        </h1>
        <p className="text-sm sm:text-base font-body text-ink/80 dark:text-cream/80 max-w-2xl mt-2 leading-relaxed">
          Grouped index of engineering capabilities across low-level firmware, distributed real-time web backends,
          and network security. Hover any tag for a plain-language summary.
        </p>
      </div>

      <div className="space-y-8">
        {TOOLBOX_DRAWERS.map((drawer) => (
          <section
            key={drawer.id}
            aria-labelledby={`drawer-${drawer.id}-heading`}
            className="bg-cream-light dark:bg-ink-card border-ink border-2 rounded-2xl p-6 sm:p-8 shadow-hard-lg dark:shadow-hard-dark-lg"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-sunny text-ink border border-ink text-xs font-mono font-bold">
                {drawer.id.toUpperCase()}
              </span>
              <h2
                id={`drawer-${drawer.id}-heading`}
                className="text-xl sm:text-2xl font-display font-black text-ink dark:text-cream tracking-tight"
              >
                {drawer.title}
              </h2>
            </div>

            <p className="text-xs sm:text-sm font-body text-ink/75 dark:text-cream/70 mb-5 leading-relaxed">
              {drawer.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {drawer.tools.map((tool) => (
                <div
                  key={tool.name}
                  className="group relative p-3.5 rounded-xl bg-paper dark:bg-ink-deep border-ink border shadow-hard-sm hover:shadow-hard hover:-translate-y-1 transition-all duration-150 cursor-default"
                >
                  <span className="font-mono font-bold text-xs sm:text-sm text-ink dark:text-cream block mb-1">
                    {tool.name}
                  </span>
                  <span className="text-xs font-body text-ink/75 dark:text-cream/70 leading-snug block">
                    {tool.oneLiner}
                  </span>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
