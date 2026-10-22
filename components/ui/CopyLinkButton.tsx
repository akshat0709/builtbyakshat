"use client";

import React, { useState } from "react";

export function CopyLinkButton({ className = "" }: { className?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      if (typeof window !== "undefined") {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      }
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  return (
    <div className={`relative inline-flex items-center ${className}`}>
      <button
        onClick={handleCopy}
        type="button"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cream-light dark:bg-ink-card border-ink border-2 text-xs font-mono font-medium text-ink dark:text-cream hover:bg-sunny/40 dark:hover:bg-sunny/20 shadow-hard-sm dark:shadow-hard-dark-sm transition-transform active:translate-x-0.5 active:translate-y-0.5 focus-visible:ring-2 focus-visible:ring-ink dark:focus-visible:ring-cream focus-visible:outline-none"
        aria-label="Copy link to this profile"
      >
        <span aria-hidden="true">🔗</span>
        <span>Copy link</span>
      </button>

      {/* Fade-only copied sticker */}
      <div
        role="status"
        aria-live="polite"
        className={`absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-md bg-sunny text-ink border-ink border text-[11px] font-mono font-bold shadow-hard-sm pointer-events-none transition-opacity duration-200 ease-in-out ${
          copied ? "opacity-100" : "opacity-0"
        }`}
      >
        copied!
      </div>
    </div>
  );
}
