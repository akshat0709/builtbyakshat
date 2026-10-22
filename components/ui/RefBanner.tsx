"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { getProjectNameFromRef } from "@/data/refs";

function RefBannerInner() {
  const searchParams = useSearchParams();
  const rawRef = searchParams.get("ref");
  const projectName = getProjectNameFromRef(rawRef);

  if (!projectName) {
    return null;
  }

  return (
    <div
      role="status"
      aria-live="polite"
      className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sunny/20 dark:bg-sunny/10 border-ink border-2 shadow-hard-sm dark:shadow-hard-dark-sm text-xs md:text-sm font-mono text-ink dark:text-cream mb-6 animate-fadeIn"
    >
      <span className="w-2 h-2 rounded-full bg-tomato animate-pulse" aria-hidden="true" />
      <span>
        You&apos;re here from <strong className="font-semibold">{projectName}</strong>.
      </span>
    </div>
  );
}

export function RefBanner() {
  return (
    <Suspense fallback={null}>
      <RefBannerInner />
    </Suspense>
  );
}
