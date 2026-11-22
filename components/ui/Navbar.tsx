"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useBengaluruClock } from "@/lib/useBengaluruClock";

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

  const clock = useBengaluruClock();

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
      className="sticky top-0 z-40 -mx-4 sm:-mx-8 lg:-mx-24 px-4 sm:px-8 lg:px-24 pt-5 pb-4 mb-6 bg-gradient-to-b from-ink-deep via-ink-deep/85 to-transparent print:hidden"
    >
      <div className="flex items-center justify-between gap-4 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.18em]">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-cream hover:text-sunny transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sunny rounded"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-sunny shadow-[0_0_10px_2px_rgba(255,138,61,0.75)]" aria-hidden="true" />
          <span className="font-bold">Akshat Gupta</span>
        </Link>

        <div className="hidden lg:flex items-center gap-7">
          {NAV_ITEMS.filter((i) => i.href !== "/contact").map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`relative py-1 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sunny rounded ${
                  active ? "text-cream" : "text-cream/55 hover:text-cream"
                }`}
              >
                {item.label}
                {active && (
                  <span className="absolute -bottom-1 left-0 right-0 h-px bg-sunny" aria-hidden="true" />
                )}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-4">
          {clock && (
            <span title="Local time in Bengaluru (IST)" className="hidden sm:inline tnum text-cream/45">
              BLR {clock.hh}:{clock.mm} {clock.period}
            </span>
          )}
          <Link
            href="/contact"
            className="hidden lg:inline-flex items-center gap-2 text-cream hover:text-sunny transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sunny rounded"
          >
            <span className="text-sunny">{"//"}</span> Book me
            <span className="grid h-5 w-5 place-items-center rounded-full border border-cream/40 text-[9px]" aria-hidden="true">
              ↗
            </span>
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            type="button"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={mobileMenuOpen ? "Close menu" : "Open navigation menu"}
            className="lg:hidden inline-flex items-center gap-2 rounded-full border border-white/15 px-3.5 py-1.5 text-cream hover:border-sunny/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sunny"
          >
            {mobileMenuOpen ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div
          id="mobile-menu"
          ref={mobileMenuRef}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
          className="fixed inset-0 z-50 bg-ink-deep/97 backdrop-blur-md p-6 flex flex-col justify-between"
        >
          <div className="flex items-center justify-between border-b border-white/10 pb-4 font-mono text-[11px] uppercase tracking-[0.18em]">
            <span className="text-cream/60">{"// Index"}</span>
            <button
              onClick={() => setMobileMenuOpen(false)}
              type="button"
              aria-label="Close menu"
              className="rounded-full border border-white/15 px-3.5 py-1.5 text-cream"
            >
              Close
            </button>
          </div>

          <div className="flex flex-col my-auto">
            {NAV_ITEMS.map((item, i) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`flex items-baseline justify-between border-b border-white/[0.07] py-3 font-poster uppercase text-5xl leading-none ${
                    active ? "text-sunny" : "text-cream"
                  }`}
                >
                  <span>{item.label}</span>
                  <span className="font-mono text-[10px] tracking-[0.2em] text-cream/40">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </Link>
              );
            })}
          </div>

          <div className="text-center font-mono text-[10px] uppercase tracking-[0.18em] text-cream/50">
            Akshat Gupta · Bengaluru
          </div>
        </div>
      )}
    </nav>
  );
}
