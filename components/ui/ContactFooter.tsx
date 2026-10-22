"use client";

import React, { useState } from "react";
import { builderProfile } from "@/data/profile";
import { Product } from "@/data/products";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ChaiDoodle } from "@/components/doodles/ChaiDoodle";
import { EasterEggBurst } from "@/components/ui/EasterEggBurst";

interface ContactFooterProps {
  currentProduct?: Product | null;
}

export function ContactFooter({ currentProduct }: ContactFooterProps) {
  const { contact, name, currentlyBuilding } = builderProfile;
  const [copied, setCopied] = useState(false);
  const [doodleClickCount, setDoodleClickCount] = useState(0);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contact.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      window.location.href = `mailto:${contact.email}`;
    }
  };

  const handleDoodleClick = () => {
    setDoodleClickCount((prev) => prev + 1);
  };

  const issueMailto = currentProduct
    ? `mailto:${contact.email}?subject=${encodeURIComponent(
        currentProduct.feedbackSubject
      )}&body=${encodeURIComponent(
        `Hi Akshat,\n\nI noticed an issue / wanted to share feedback regarding ${currentProduct.name}:\n\n- Feedback/Bug: \n- Steps to reproduce: \n- Browser/Environment: \n\nBest,\n`
      )}`
    : null;

  const sayHelloMailto = `mailto:${contact.email}?subject=${encodeURIComponent(
    "Saying hello"
  )}&body=${encodeURIComponent("Hi Akshat,\n\nI checked out software you built and wanted to say hello.\n\n")}`;

  return (
    <footer
      id="contact"
      aria-labelledby="contact-heading"
      className="pt-12 pb-16 border-t-ink border-t-2 border-dashed print:hidden"
    >
      <EasterEggBurst
        clickTriggerCount={doodleClickCount}
        onResetTrigger={() => setDoodleClickCount(0)}
      />

      {/* "Currently building" Ticker Strip */}
      <div className="mb-6 p-4 rounded-2xl bg-sunny/20 dark:bg-sunny/10 border-ink border-2 shadow-hard-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-mono text-xs">
          <div className="flex items-center gap-2 text-ink dark:text-cream font-bold">
            <span className="w-2.5 h-2.5 rounded-full bg-tomato animate-pulse" aria-hidden="true" />
            <span>CURRENTLY BUILDING:</span>
          </div>

          <div className="flex items-center gap-1.5 text-ink/90 dark:text-cream/90 flex-wrap">
            <span>{currentlyBuilding[0]}</span>
            <span className="text-teal font-black" aria-hidden="true">
              ·
            </span>
            <span>{currentlyBuilding[1]}</span>
            {/* Blinking caret stops after 10s */}
            <span className="inline-block w-2 h-4 bg-ink dark:bg-cream animate-blink ml-1" aria-hidden="true" />
          </div>
        </div>
      </div>

      <div className="bg-cream-light dark:bg-ink-card border-ink border-2 rounded-2xl p-6 sm:p-8 shadow-hard-lg dark:shadow-hard-dark-lg">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-6">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-teal font-bold block mb-1">
              05 / Workshop Door
            </span>
            <h2
              id="contact-heading"
              className="text-2xl sm:text-3xl font-display font-black text-ink dark:text-cream tracking-tight"
            >
              Get in Touch
            </h2>
            <p className="text-sm font-body text-ink/75 dark:text-cream/70 mt-1 max-w-md">
              Have an issue, a systems engineering question, or want to collaborate? I reply promptly to real humans.
            </p>
          </div>

          {/* Magnetic Main Contact Action Button */}
          <div className="flex flex-col sm:items-end gap-2">
            {currentProduct ? (
              <MagneticButton
                href={issueMailto!}
                ariaLabel={`Found an issue in ${currentProduct.name}? Tell me`}
              >
                <span>Found an issue in {currentProduct.name}? Tell me</span>
                <span aria-hidden="true">↗</span>
              </MagneticButton>
            ) : (
              <MagneticButton href={sayHelloMailto} ariaLabel="Say hello to Akshat">
                <span>Say hello</span>
                <span aria-hidden="true">↗</span>
              </MagneticButton>
            )}
          </div>
        </div>

        {/* Action buttons strip with hard-shadow press */}
        <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-ink/15 dark:border-cream/15">
          <button
            onClick={handleCopyEmail}
            type="button"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-paper dark:bg-ink-deep border-ink border-2 text-xs font-mono font-bold text-ink dark:text-cream hover:bg-sunny/40 shadow-hard-sm active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
            aria-label={`Copy email address ${contact.email}`}
          >
            <span>✉ {contact.email}</span>
            <span className="text-[10px] uppercase font-black text-teal">
              {copied ? "Copied!" : "Copy"}
            </span>
          </button>

          <a
            href={contact.github.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-paper dark:bg-ink-deep border-ink border-2 text-xs font-mono font-bold text-ink dark:text-cream hover:bg-sunny/30 shadow-hard-sm active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
          >
            <span>GitHub</span>
            <span aria-hidden="true">↗</span>
          </a>

          <a
            href={contact.linkedin.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-paper dark:bg-ink-deep border-ink border-2 text-xs font-mono font-bold text-ink dark:text-cream hover:bg-sunny/30 shadow-hard-sm active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
          >
            <span>LinkedIn</span>
            <span aria-hidden="true">↗</span>
          </a>
        </div>

        {/* Footer bottom bar with interactive Chai doodle */}
        <div className="mt-8 pt-4 border-t border-ink/10 dark:border-cream/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-ink/60 dark:text-cream/50">
          <div>
            Built by {name} · Indie-zine / workshop aesthetic
          </div>

          <div className="flex items-center gap-2">
            <span>Tap chai for luck:</span>
            <button
              onClick={handleDoodleClick}
              type="button"
              className="p-1.5 rounded-xl bg-paper dark:bg-ink-deep border-ink border shadow-hard-sm hover:rotate-6 active:scale-95 transition-transform"
              title="Click 5 times for a secret easter egg!"
              aria-label="Interactive chai cup doodle: tap 5 times to trigger secret burst"
            >
              <ChaiDoodle className="w-6 h-6" decorative />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
