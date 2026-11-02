"use client";

import React, { useEffect, useState } from "react";
import { getTheme, onThemeChange, toggleTheme, type Theme } from "@/lib/theme";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const [theme, setThemeState] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // The layout's inline script has already applied the stored theme before paint.
    setThemeState(getTheme());
    setMounted(true);
    return onThemeChange(setThemeState);
  }, []);

  if (!mounted) {
    return (
      <div
        className={`w-14 h-8 rounded-full border-ink border-2 bg-cream-light opacity-50 ${className}`}
        aria-hidden="true"
      />
    );
  }

  return (
    <button
      onClick={() => toggleTheme()}
      type="button"
      role="switch"
      aria-checked={theme === "dark"}
      aria-label="Toggle light and dark color theme"
      className={`relative inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cream-light dark:bg-ink-card border-ink border-2 text-xs font-mono font-bold text-ink dark:text-cream shadow-hard-sm dark:shadow-hard-dark-sm hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink dark:focus-visible:ring-cream ${className}`}
    >
      {theme === "light" ? (
        <>
          <span className="w-3.5 h-3.5 rounded-full bg-sunny border border-ink flex items-center justify-center text-[10px]" aria-hidden="true">
            ☼
          </span>
          <span>light</span>
        </>
      ) : (
        <>
          <span className="w-3.5 h-3.5 rounded-full bg-teal text-white flex items-center justify-center text-[10px]" aria-hidden="true">
            ☾
          </span>
          <span>dark</span>
        </>
      )}
    </button>
  );
}
