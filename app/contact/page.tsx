"use client";

import React, { useState } from "react";
import Image from "next/image";
import { builderProfile } from "@/data/profile";
import { PRODUCTS } from "@/data/products";
import { ChaiDoodle } from "@/components/doodles/ChaiDoodle";
import { Signature } from "@/components/ui/Signature";

export default function ContactPage() {
  const { contact, name, photo } = builderProfile;
  const [copied, setCopied] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState("orange-taxi");

  const productList = Object.values(PRODUCTS);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contact.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      window.location.href = `mailto:${contact.email}`;
    }
  };

  const currentProd = PRODUCTS[selectedProduct];
  const mailtoSubject = currentProd
    ? currentProd.feedbackSubject
    : "Saying hello · Software inquiry";

  const mailtoBody = currentProd
    ? `Hi Akshat,\n\nI checked out ${currentProd.name} and wanted to share feedback or ask a technical question:\n\n- Feedback/Question: \n- Steps or details: \n\nBest,\n`
    : `Hi Akshat,\n\nI was looking at software you built and wanted to get in touch.\n\nBest,\n`;

  const prefilledMailto = `mailto:${contact.email}?subject=${encodeURIComponent(
    mailtoSubject
  )}&body=${encodeURIComponent(mailtoBody)}`;

  return (
    <main id="main-content" className="py-6">
      <div className="mb-6">
        <span className="text-xs font-mono uppercase tracking-wider text-teal font-bold block mb-1">
          $ cd contact
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-ink dark:text-cream tracking-tight">
          Get in Touch
        </h1>
        <p className="text-sm sm:text-base font-body text-ink/80 dark:text-cream/80 max-w-2xl mt-2 leading-relaxed">
          I build real systems for real users. If you have product feedback, an issue report, or an engineering inquiry,
          reach out directly. I respond promptly to humans.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column: Direct channels & vCard */}
        <div className="md:col-span-2 space-y-6">
          {/* Main Direct Channels Card */}
          <section
            aria-labelledby="channels-heading"
            className="bg-cream-light dark:bg-ink-card border-ink border-2 rounded-2xl p-6 sm:p-8 shadow-hard-lg dark:shadow-hard-dark-lg"
          >
            <h2
              id="channels-heading"
              className="text-xl sm:text-2xl font-display font-black text-ink dark:text-cream tracking-tight mb-4"
            >
              Direct Channels
            </h2>

            <div className="flex flex-wrap items-center gap-3 mb-6">
              <button
                type="button"
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-paper dark:bg-ink-deep border-ink border-2 font-mono text-xs sm:text-sm font-bold text-ink dark:text-cream hover:bg-sunny shadow-hard-sm active:translate-x-0.5 active:translate-y-0.5 transition-transform"
                aria-label={`Copy email address ${contact.email}`}
              >
                <span>✉ {contact.email}</span>
                <span className="text-[10px] uppercase font-black text-teal">
                  {copied ? "Copied!" : "Copy"}
                </span>
              </button>

              <a
                href="/contact.vcf"
                download="Akshat_Gupta.vcf"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-sunny text-ink border-ink border-2 font-mono text-xs sm:text-sm font-bold shadow-hard-sm hover:bg-sunny/80 active:translate-x-0.5 active:translate-y-0.5 transition-transform"
              >
                <span>Save Contact (.vcf)</span>
                <span aria-hidden="true">📇</span>
              </a>
            </div>

            {/* Social profiles */}
            <div className="pt-4 border-t border-ink/15 dark:border-cream/15 flex flex-wrap items-center gap-3">
              <a
                href={contact.github.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-paper dark:bg-ink-deep border-ink border text-xs font-mono font-bold text-ink dark:text-cream hover:bg-sunny/30 shadow-hard-sm transition-transform"
              >
                <span>GitHub · @{contact.github.handle}</span>
                <span aria-hidden="true">↗</span>
              </a>

              <a
                href={contact.linkedin.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-paper dark:bg-ink-deep border-ink border text-xs font-mono font-bold text-ink dark:text-cream hover:bg-sunny/30 shadow-hard-sm transition-transform"
              >
                <span>LinkedIn · @{contact.linkedin.handle}</span>
                <span aria-hidden="true">↗</span>
              </a>
            </div>
          </section>

          {/* Prefilled Product Feedback Generator */}
          <section
            aria-labelledby="feedback-heading"
            className="bg-cream-light dark:bg-ink-card border-ink border-2 rounded-2xl p-6 sm:p-8 shadow-hard dark:shadow-hard-dark"
          >
            <h2
              id="feedback-heading"
              className="text-lg sm:text-xl font-display font-black text-ink dark:text-cream tracking-tight mb-3"
            >
              Product Feedback &amp; Issues
            </h2>

            <p className="text-xs sm:text-sm font-body text-ink/80 dark:text-cream/80 mb-4 leading-relaxed">
              Select which product you are using to generate a tailored email subject with telemetry fields:
            </p>

            <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
              <label htmlFor="product-feedback-select" className="sr-only">
                Select product
              </label>
              <select
                id="product-feedback-select"
                value={selectedProduct}
                onChange={(e) => setSelectedProduct(e.target.value)}
                className="p-2.5 rounded-xl bg-paper dark:bg-ink-deep border-ink border-2 text-xs font-mono font-bold text-ink dark:text-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
              >
                {productList.map((p) => (
                  <option key={p.slug} value={p.slug}>
                    {p.name}
                  </option>
                ))}
                <option value="general">General Software Question</option>
              </select>

              <a
                href={prefilledMailto}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full bg-teal text-white border-ink border-2 font-mono text-xs font-bold shadow-hard-sm hover:bg-teal/90 active:translate-x-0.5 active:translate-y-0.5 transition-transform"
              >
                <span>Open Pre-filled Email</span>
                <span aria-hidden="true">↗</span>
              </a>
            </div>
          </section>
        </div>

        {/* Right Column: Portrait polaroid + Signature sign-off */}
        <div className="flex flex-col justify-between space-y-6">
          {/* Optional Polaroid Frame: rendered ONLY if photo exists in profile */}
          {photo ? (
            <div className="p-4 pb-6 rounded-2xl bg-[#FFFDF7] dark:bg-ink-card border-ink border-2 shadow-hard rotate-[1.5deg] hover:rotate-0 transition-transform">
              <div className="relative aspect-[4/5] w-full rounded-xl overflow-hidden bg-paper dark:bg-ink-deep border border-ink mb-3">
                <Image
                  src={photo}
                  alt={`Portrait of ${name}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 300px"
                />
                <div className="absolute top-2 right-2 p-1 rounded-full bg-sunny border border-ink shadow-hard-sm">
                  <ChaiDoodle className="w-4 h-4" decorative />
                </div>
              </div>
              <div className="text-center font-mono text-xs font-bold text-ink dark:text-cream">
                Akshat Gupta · Bengaluru
              </div>
            </div>
          ) : null}

          {/* Sign-off Card with handwritten SVG signature */}
          <div className="p-6 rounded-2xl bg-paper dark:bg-ink-card border-ink border-2 shadow-hard flex flex-col items-start">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-ink/60 dark:text-cream/60 mb-2">
              Sign-Off
            </span>
            <p className="font-body text-xs text-ink/80 dark:text-cream/80 leading-relaxed mb-4">
              Building systems from Bengaluru, India.
            </p>
            <Signature className="w-48 h-16 text-ink dark:text-cream" />
            <span className="font-mono text-[11px] font-bold text-ink/50 dark:text-cream/50 mt-1">
              Akshat Gupta
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}
