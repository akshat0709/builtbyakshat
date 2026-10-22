"use client";

import React, { useEffect, useState } from "react";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("theme") as "light" | "dark" | null;
    if (stored) {
      setTheme(stored);
      if (stored === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const initial = prefersDark ? "dark" : "light";
      setTheme(initial);
      if (prefersDark) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

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
      onClick={toggleTheme}
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
