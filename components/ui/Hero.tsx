import React from "react";
import { builderProfile } from "@/data/profile";
import { CopyLinkButton } from "@/components/ui/CopyLinkButton";

export function Hero() {
  return (
    <header className="pt-8 pb-12 md:pt-14 md:pb-16 border-b-ink border-b-2 border-dashed">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
        <div className="space-y-4 max-w-2xl">
          <div className="flex items-center gap-3">
            <div className="inline-block px-3 py-1 rounded-full bg-cream-light dark:bg-ink-card border-ink border-2 shadow-hard-sm dark:shadow-hard-dark-sm text-xs font-mono tracking-wide text-ink dark:text-cream">
              About the Builder
            </div>
            <CopyLinkButton className="print:hidden" />
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-ink dark:text-cream tracking-tight leading-[1.1]">
            {builderProfile.name}
          </h1>

          <p className="text-base sm:text-lg md:text-xl font-body text-ink/90 dark:text-cream/90 leading-relaxed font-normal">
            {builderProfile.tagline}
          </p>

          <p className="text-sm sm:text-base font-body text-ink/75 dark:text-cream/70 leading-relaxed pt-1">
            If you clicked a <span className="font-mono text-xs px-1.5 py-0.5 rounded bg-amber-100 dark:bg-ink-border border border-ink/40 dark:border-cream/30">Built by Akshat Gupta ↗</span> link
            on an application, tool, or hardware project, this page gives you a concise overview
            of who engineered it, what other systems I have shipped, and where I have worked.
          </p>
        </div>

        {/* Quick jump anchor navigation */}
        <nav
          aria-label="Page sections"
          className="flex flex-wrap md:flex-col gap-2 pt-2 md:pt-0 shrink-0 print:hidden"
        >
          <a
            href="#experience"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cream-light dark:bg-ink-card border-ink border-2 text-xs font-mono font-medium text-ink dark:text-cream hover:bg-sunny/40 dark:hover:bg-sunny/20 shadow-hard-sm dark:shadow-hard-dark-sm transition-colors focus-visible:ring-2 focus-visible:ring-ink dark:focus-visible:ring-cream focus-visible:outline-none"
          >
            <span>↓</span> Experience
          </a>
          <a
            href="#things-built"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cream-light dark:bg-ink-card border-ink border-2 text-xs font-mono font-medium text-ink dark:text-cream hover:bg-teal/30 dark:hover:bg-teal/20 shadow-hard-sm dark:shadow-hard-dark-sm transition-colors focus-visible:ring-2 focus-visible:ring-ink dark:focus-visible:ring-cream focus-visible:outline-none"
          >
            <span>↓</span> Things I&apos;ve Built
          </a>
          <a
            href="#skills"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cream-light dark:bg-ink-card border-ink border-2 text-xs font-mono font-medium text-ink dark:text-cream hover:bg-tomato/30 dark:hover:bg-tomato/20 shadow-hard-sm dark:shadow-hard-dark-sm transition-colors focus-visible:ring-2 focus-visible:ring-ink dark:focus-visible:ring-cream focus-visible:outline-none"
          >
            <span>↓</span> Skills
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cream-light dark:bg-ink-card border-ink border-2 text-xs font-mono font-medium text-ink dark:text-cream hover:bg-amber-100 dark:hover:bg-ink-border shadow-hard-sm dark:shadow-hard-dark-sm transition-colors focus-visible:ring-2 focus-visible:ring-ink dark:focus-visible:ring-cream focus-visible:outline-none"
          >
            <span>↓</span> Contact
          </a>
        </nav>
      </div>
    </header>
  );
}
