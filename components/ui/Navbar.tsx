"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

interface NavItem {
  cmd: string;
  label: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { cmd: "home", label: "Home", href: "/" },
  { cmd: "experience", label: "Experience", href: "/experience" },
  { cmd: "built", label: "Built", href: "/built" },
  { cmd: "toolbox", label: "Toolbox", href: "/toolbox" },
  { cmd: "lab", label: "Lab", href: "/lab" },
  { cmd: "now", label: "Now", href: "/now" },
  { cmd: "contact", label: "Contact", href: "/contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Handle escape key and focus trapping for mobile menu
  useEffect(() => {
    if (!mobileMenuOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <nav
      aria-label="Main navigation"
      className="pt-6 pb-4 mb-4 border-b-ink border-b-2 border-dashed print:hidden"
    >
      <div className="flex items-center justify-between gap-4">
        {/* Brand / Logo Terminal Identity */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cream-light dark:bg-ink-card border-ink border-2 shadow-hard-sm dark:shadow-hard-dark-sm font-mono text-xs font-black text-ink dark:text-cream hover:bg-sunny active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
        >
          <span className="w-2 h-2 rounded-full bg-tomato animate-pulse" aria-hidden="true" />
          <span>akshat.dev</span>
        </Link>

        {/* Desktop Command Navigation Pills */}
        <div className="hidden lg:flex items-center gap-1.5 font-mono text-xs">
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full border-2 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink ${
                  active
                    ? "bg-sunny text-ink border-ink font-bold shadow-hard-sm"
                    : "bg-cream-light dark:bg-ink-card border-ink text-ink dark:text-cream font-medium shadow-hard-sm hover:bg-sunny/40 dark:hover:bg-sunny/20 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
                }`}
              >
                <span className="text-[10px] font-bold">$ cd</span>
                <span>{item.cmd}</span>
              </Link>
            );
          })}
        </div>

        {/* Right Side: Theme Toggle & Mobile Menu Hamburger */}
        <div className="flex items-center gap-2.5">
          <ThemeToggle />

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            type="button"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={mobileMenuOpen ? "Close menu" : "Open navigation menu"}
            className="lg:hidden inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cream-light dark:bg-ink-card border-ink border-2 shadow-hard-sm font-mono text-xs font-bold text-ink dark:text-cream hover:bg-sunny active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
          >
            <span>{mobileMenuOpen ? "✕ close" : "☰ menu"}</span>
          </button>
        </div>
      </div>

      {/* Full-Screen Accessible Mobile Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu"
          ref={mobileMenuRef}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
          className="fixed inset-0 z-50 bg-cream/95 dark:bg-ink-deep/95 backdrop-blur-md p-6 flex flex-col justify-between"
        >
          <div className="flex items-center justify-between border-b-ink border-b-2 pb-4">
            <span className="font-mono text-xs font-bold text-ink dark:text-cream">
              $ menu --select
            </span>
            <button
              onClick={() => setMobileMenuOpen(false)}
              type="button"
              aria-label="Close menu"
              className="px-3.5 py-1.5 rounded-full bg-sunny border-ink border-2 text-xs font-mono font-bold text-ink shadow-hard-sm active:translate-x-0.5 active:translate-y-0.5"
            >
              ✕ [Esc]
            </button>
          </div>

          <div className="flex flex-col gap-3 my-auto">
            {NAV_ITEMS.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`flex items-center justify-between p-4 rounded-2xl border-ink border-2 font-mono text-lg font-bold shadow-hard ${
                    active
                      ? "bg-sunny text-ink"
                      : "bg-cream-light dark:bg-ink-card text-ink dark:text-cream"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="text-sm opacity-50">$ cd</span>
                    <span>{item.cmd}</span>
                  </span>
                  <span className="text-xs opacity-70 uppercase tracking-widest">
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </div>

          <div className="text-center font-mono text-xs text-ink/80 dark:text-cream/80 border-t border-ink/20 pt-4">
            Akshat Gupta · Workshop Door
          </div>
        </div>
      )}
    </nav>
  );
}
