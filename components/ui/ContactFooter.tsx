"use client";

import React, { useState } from "react";
import { builderProfile } from "@/data/profile";
import { Product } from "@/data/products";

interface ContactFooterProps {
  currentProduct?: Product | null;
}

export function ContactFooter({ currentProduct }: ContactFooterProps) {
  const { contact, name } = builderProfile;
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contact.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback: window location
      window.location.href = `mailto:${contact.email}`;
    }
  };

  return (
    <footer id="contact" aria-labelledby="contact-heading" className="pt-12 pb-16 border-t-ink border-t-2 border-dashed">
      <div className="bg-cream-light dark:bg-ink-card border-ink border-2 rounded-2xl p-6 sm:p-8 shadow-hard dark:shadow-hard-dark">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-teal font-bold block mb-1">
              05 / Get in Touch
            </span>
            <h2
              id="contact-heading"
              className="text-xl sm:text-2xl font-display font-bold text-ink dark:text-cream tracking-tight"
            >
              Contact
            </h2>
            <p className="text-sm font-body text-ink/75 dark:text-cream/70 mt-1 max-w-md">
              Have a question about a system I built, technical architecture, or collaboration? Reach out directly.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleCopyEmail}
              type="button"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-paper dark:bg-ink-deep border-ink border-2 text-xs font-mono font-medium text-ink dark:text-cream hover:bg-sunny/30 dark:hover:bg-sunny/20 shadow-hard-sm dark:shadow-hard-dark-sm transition-transform active:translate-x-0.5 active:translate-y-0.5 focus-visible:ring-2 focus-visible:ring-ink dark:focus-visible:ring-cream focus-visible:outline-none"
              aria-label={`Copy email address ${contact.email}`}
            >
              <span>✉ {contact.email}</span>
              <span className="text-[10px] uppercase font-bold text-teal dark:text-teal">
                {copied ? "Copied!" : "Copy"}
              </span>
            </button>

            <a
              href={`mailto:${contact.email}`}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-tomato text-white border-ink border-2 text-xs font-mono font-bold hover:bg-tomato/90 shadow-hard-sm dark:shadow-hard-dark-sm transition-transform active:translate-x-0.5 active:translate-y-0.5 focus-visible:ring-2 focus-visible:ring-ink dark:focus-visible:ring-cream focus-visible:outline-none"
            >
              <span>Mail</span>
              <span aria-hidden="true">↗</span>
            </a>

            <a
              href={contact.github.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-paper dark:bg-ink-deep border-ink border-2 text-xs font-mono font-medium text-ink dark:text-cream hover:bg-cream-light dark:hover:bg-ink-border shadow-hard-sm dark:shadow-hard-dark-sm transition-colors focus-visible:ring-2 focus-visible:ring-ink dark:focus-visible:ring-cream focus-visible:outline-none"
            >
              <span>GitHub</span>
              <span aria-hidden="true">↗</span>
            </a>

            <a
              href={contact.linkedin.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-paper dark:bg-ink-deep border-ink border-2 text-xs font-mono font-medium text-ink dark:text-cream hover:bg-cream-light dark:hover:bg-ink-border shadow-hard-sm dark:shadow-hard-dark-sm transition-colors focus-visible:ring-2 focus-visible:ring-ink dark:focus-visible:ring-cream focus-visible:outline-none"
            >
              <span>LinkedIn</span>
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>

        <div className="mt-8 pt-4 border-t border-ink/10 dark:border-cream/10 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-mono text-ink/60 dark:text-cream/50">
          <div>
            Built by {name} · Indie editorial / zine aesthetic
          </div>
          <div>
            No cookies · No tracking · Lightweight Next.js
          </div>
        </div>
      </div>
    </footer>
  );
}
