"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PRODUCTS } from "@/data/products";
import { SITE_URL } from "@/lib/site";

const PRODUCT_OPTIONS = [
  { slug: "orange-taxi", label: "Orange Taxi (Pre-launch)" },
  { slug: "autonomous-rescue-robot", label: "Autonomous Rescue Robot (Prototype)" },
  { slug: "animal-detection", label: "Animal Detection in Locomotive Tracks (Prototype)" },
  { slug: "generic", label: "Generic Developer Badge" },
];

export default function EmbedPage() {
  const [selectedSlug, setSelectedSlug] = useState("orange-taxi");
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [size, setSize] = useState<"sm" | "md">("md");
  const [copiedFormat, setCopiedFormat] = useState<string | null>(null);

  const baseUrl = SITE_URL;
  const badgeUrl = `${baseUrl}/badge/${selectedSlug}?theme=${theme}&size=${size}`;
  const targetUrl =
    selectedSlug === "generic"
      ? baseUrl
      : `${baseUrl}/built/${selectedSlug}?utm_source=${selectedSlug}`;

  const htmlSnippet = `<a href="${targetUrl}" target="_blank" rel="noopener">\n  <img src="${badgeUrl}" alt="Built by Akshat Gupta" />\n</a>`;
  const markdownSnippet = `[![Built by Akshat Gupta](${badgeUrl})](${targetUrl})`;
  const reactSnippet = `<a\n  href="${targetUrl}"\n  target="_blank"\n  rel="noopener"\n  className="inline-block transition-transform hover:-translate-y-0.5"\n>\n  <img\n    src="${badgeUrl}"\n    alt="Built by Akshat Gupta"\n  />\n</a>`;

  const copyToClipboard = async (text: string, format: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedFormat(format);
      setTimeout(() => setCopiedFormat(null), 1800);
    } catch {
      // fallback
    }
  };

  return (
    <main id="main-content" className="py-6">
      <div className="mb-6">
        <span className="text-xs font-mono uppercase tracking-wider text-teal font-bold block mb-1">
          $ cd embed
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-ink dark:text-cream tracking-tight">
          Embeddable &ldquo;Built by&rdquo; Badges
        </h1>
        <p className="text-sm sm:text-base font-body text-ink/80 dark:text-cream/80 max-w-2xl mt-2 leading-relaxed">
          Add an ink-and-cream status badge to footers, documentation, or GitHub repositories of software I build.
          Each badge links visitors to the canonical case study.
        </p>
      </div>

      {/* Controls & Live Preview Card */}
      <section
        aria-labelledby="badge-configurator-heading"
        className="bg-cream-light dark:bg-ink-card border-ink border-2 rounded-2xl p-6 sm:p-8 shadow-hard-lg dark:shadow-hard-dark-lg mb-8"
      >
        <h2
          id="badge-configurator-heading"
          className="text-lg sm:text-xl font-display font-black text-ink dark:text-cream tracking-tight mb-4"
        >
          Badge Configurator
        </h2>

        {/* Options Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          {/* Product Selector */}
          <div>
            <label
              htmlFor="product-select"
              className="block font-mono text-xs font-bold uppercase tracking-wider text-ink/70 dark:text-cream/70 mb-1.5"
            >
              Product
            </label>
            <select
              id="product-select"
              value={selectedSlug}
              onChange={(e) => setSelectedSlug(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-paper dark:bg-ink-deep border-ink border-2 text-xs font-mono font-bold text-ink dark:text-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
            >
              {PRODUCT_OPTIONS.map((opt) => (
                <option key={opt.slug} value={opt.slug}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Theme Selector */}
          <div>
            <span className="block font-mono text-xs font-bold uppercase tracking-wider text-ink/70 dark:text-cream/70 mb-1.5">
              Theme
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setTheme("light")}
                className={`flex-1 py-2 rounded-xl border-ink border-2 font-mono text-xs font-bold transition-transform active:translate-x-0.5 active:translate-y-0.5 ${
                  theme === "light"
                    ? "bg-sunny text-ink shadow-hard-sm"
                    : "bg-paper dark:bg-ink-deep text-ink dark:text-cream"
                }`}
              >
                Light
              </button>
              <button
                type="button"
                onClick={() => setTheme("dark")}
                className={`flex-1 py-2 rounded-xl border-ink border-2 font-mono text-xs font-bold transition-transform active:translate-x-0.5 active:translate-y-0.5 ${
                  theme === "dark"
                    ? "bg-sunny text-ink shadow-hard-sm"
                    : "bg-paper dark:bg-ink-deep text-ink dark:text-cream"
                }`}
              >
                Dark
              </button>
            </div>
          </div>

          {/* Size Selector */}
          <div>
            <span className="block font-mono text-xs font-bold uppercase tracking-wider text-ink/70 dark:text-cream/70 mb-1.5">
              Size
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setSize("md")}
                className={`flex-1 py-2 rounded-xl border-ink border-2 font-mono text-xs font-bold transition-transform active:translate-x-0.5 active:translate-y-0.5 ${
                  size === "md"
                    ? "bg-sunny text-ink shadow-hard-sm"
                    : "bg-paper dark:bg-ink-deep text-ink dark:text-cream"
                }`}
              >
                Medium (md)
              </button>
              <button
                type="button"
                onClick={() => setSize("sm")}
                className={`flex-1 py-2 rounded-xl border-ink border-2 font-mono text-xs font-bold transition-transform active:translate-x-0.5 active:translate-y-0.5 ${
                  size === "sm"
                    ? "bg-sunny text-ink shadow-hard-sm"
                    : "bg-paper dark:bg-ink-deep text-ink dark:text-cream"
                }`}
              >
                Small (sm)
              </button>
            </div>
          </div>
        </div>

        {/* Live Preview Display */}
        <div className="p-6 rounded-2xl bg-paper dark:bg-ink-deep border-ink border-2 shadow-hard-sm flex flex-col items-center justify-center gap-3">
          <span className="text-[11px] font-mono text-ink/80 dark:text-cream/80 uppercase tracking-widest">
            Live Preview
          </span>
          <div className="p-4 rounded-xl flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/badge/${selectedSlug}?theme=${theme}&size=${size}`}
              alt="Built by Akshat Gupta badge live preview"
              className="max-w-full h-auto"
            />
          </div>
          <span className="text-xs font-mono text-ink/80 dark:text-cream/80">
            Target:{" "}
            <Link href={targetUrl} className="underline text-teal">
              {targetUrl}
            </Link>
          </span>
        </div>
      </section>

      {/* Snippets Strip */}
      <div className="space-y-6">
        {/* Markdown Snippet */}
        <div className="bg-cream-light dark:bg-ink-card border-ink border-2 rounded-2xl p-5 shadow-hard">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-mono text-xs font-bold text-ink dark:text-cream uppercase tracking-wider">
              Markdown (GitHub README.md)
            </h3>
            <button
              type="button"
              onClick={() => copyToClipboard(markdownSnippet, "markdown")}
              className="px-3 py-1 rounded-full bg-sunny text-ink border-ink border text-xs font-mono font-bold shadow-hard-sm active:translate-x-0.5 active:translate-y-0.5 transition-transform"
            >
              {copiedFormat === "markdown" ? "Copied!" : "Copy Markdown"}
            </button>
          </div>
          <pre className="p-3 rounded-xl bg-paper dark:bg-ink-deep border-ink border text-xs font-mono text-ink dark:text-cream overflow-x-auto">
            {markdownSnippet}
          </pre>
        </div>

        {/* HTML Snippet */}
        <div className="bg-cream-light dark:bg-ink-card border-ink border-2 rounded-2xl p-5 shadow-hard">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-mono text-xs font-bold text-ink dark:text-cream uppercase tracking-wider">
              HTML (Web Footers &amp; Landing Pages)
            </h3>
            <button
              type="button"
              onClick={() => copyToClipboard(htmlSnippet, "html")}
              className="px-3 py-1 rounded-full bg-sunny text-ink border-ink border text-xs font-mono font-bold shadow-hard-sm active:translate-x-0.5 active:translate-y-0.5 transition-transform"
            >
              {copiedFormat === "html" ? "Copied!" : "Copy HTML"}
            </button>
          </div>
          <pre className="p-3 rounded-xl bg-paper dark:bg-ink-deep border-ink border text-xs font-mono text-ink dark:text-cream overflow-x-auto whitespace-pre">
            {htmlSnippet}
          </pre>
        </div>

        {/* React Snippet */}
        <div className="bg-cream-light dark:bg-ink-card border-ink border-2 rounded-2xl p-5 shadow-hard">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-mono text-xs font-bold text-ink dark:text-cream uppercase tracking-wider">
              React + Tailwind Component
            </h3>
            <button
              type="button"
              onClick={() => copyToClipboard(reactSnippet, "react")}
              className="px-3 py-1 rounded-full bg-sunny text-ink border-ink border text-xs font-mono font-bold shadow-hard-sm active:translate-x-0.5 active:translate-y-0.5 transition-transform"
            >
              {copiedFormat === "react" ? "Copied!" : "Copy React"}
            </button>
          </div>
          <pre className="p-3 rounded-xl bg-paper dark:bg-ink-deep border-ink border text-xs font-mono text-ink dark:text-cream overflow-x-auto whitespace-pre">
            {reactSnippet}
          </pre>
        </div>
      </div>
    </main>
  );
}
