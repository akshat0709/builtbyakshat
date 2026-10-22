import React from "react";
import Link from "next/link";
import { RobotDoodle } from "@/components/doodles/RobotDoodle";

export default function NotFound() {
  return (
    <main
      id="main-content"
      className="min-h-[75vh] flex flex-col items-center justify-center text-center py-20"
    >
      <div className="bg-cream-light dark:bg-ink-card border-ink border-2 rounded-2xl p-8 sm:p-12 shadow-hard dark:shadow-hard-dark max-w-lg">
        <div className="flex justify-center mb-6">
          <RobotDoodle className="w-20 h-20" decorative />
        </div>

        <span className="text-xs font-mono uppercase tracking-widest text-tomato font-bold block mb-2">
          404 / Page Not Found
        </span>

        <h1 className="text-2xl sm:text-3xl font-display font-bold text-ink dark:text-cream mb-3">
          This system endpoint does not exist.
        </h1>

        <p className="text-sm font-body text-ink/75 dark:text-cream/70 mb-6 leading-relaxed">
          The link you followed may be broken or the ref identifier was moved.
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-sunny border-ink border-2 text-xs font-mono font-bold text-ink hover:bg-sunny/80 shadow-hard-sm transition-transform active:translate-x-0.5 active:translate-y-0.5 focus-visible:ring-2 focus-visible:ring-ink focus-visible:outline-none"
        >
          <span>← Back to Builder Profile</span>
        </Link>
      </div>
    </main>
  );
}
