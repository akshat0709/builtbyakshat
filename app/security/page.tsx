import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { builderProfile } from "@/data/profile";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Security Policy | Akshat Gupta",
  description:
    "Vulnerability disclosure guidelines and responsible reporting instructions for systems built by Akshat Gupta.",
  alternates: {
    canonical: "/security",
  },
  openGraph: {
    title: "Security Policy | Akshat Gupta",
    description:
      "Vulnerability disclosure guidelines and responsible reporting instructions for systems built by Akshat Gupta.",
    url: absoluteUrl("/security"),
  },
};

export default function SecurityPage() {
  const email = builderProfile.contact.email;
  const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(
    "[Security Disclosure] Vulnerability Report"
  )}&body=${encodeURIComponent(
    `Hi Akshat,\n\nI discovered a potential security issue in one of your products.\n\n- Product / System: \n- Affected Component / URL: \n- Steps to reproduce:\n  1. \n  2. \n  3. \n- Potential Impact: \n- Additional details / Environment: \n\nBest,\n`
  )}`;

  return (
    <main id="main-content" className="py-6">
      <div className="mb-6">
        <span className="text-xs font-mono uppercase tracking-wider text-teal font-bold block mb-1">
          $ cd security
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-ink dark:text-cream tracking-tight">
          Security Policy
        </h1>
        <p className="text-sm sm:text-base font-body text-ink/80 dark:text-cream/80 max-w-2xl mt-2 leading-relaxed">
          I build real software and hardware systems. If you have discovered a potential security flaw in any of my projects,
          here is how to report it responsibly.
        </p>
      </div>

      <div className="space-y-6">
        {/* Main Disclosure Card */}
        <section
          aria-labelledby="reporting-heading"
          className="bg-cream-light dark:bg-ink-card border-ink border-2 rounded-2xl p-6 sm:p-8 shadow-hard-lg dark:shadow-hard-dark-lg"
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="px-2.5 py-1 rounded-full bg-tomato text-white border border-ink text-xs font-mono font-bold">
              RFC 9116
            </span>
            <span className="font-mono text-xs text-ink/60 dark:text-cream/60">
              Responsible Disclosure
            </span>
          </div>

          <h2
            id="reporting-heading"
            className="text-xl sm:text-2xl font-display font-black text-ink dark:text-cream tracking-tight mb-3"
          >
            How to Report a Vulnerability
          </h2>

          <p className="text-sm sm:text-base font-body text-ink/85 dark:text-cream/85 leading-relaxed mb-4">
            If you believe you have found a security vulnerability in Orange Taxi, the Autonomous Search and Rescue Robot,
            Animal Detection on Locomotive Tracks, or this website, please send an email directly to{" "}
            <a
              href={`mailto:${email}`}
              className="font-mono font-bold text-teal underline underline-offset-4 decoration-teal/50 hover:decoration-teal"
            >
              {email}
            </a>
            .
          </p>

          <div className="bg-paper dark:bg-ink-deep border-ink border rounded-xl p-4 sm:p-5 mb-6">
            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-ink dark:text-cream mb-2">
              Please include in your report:
            </h3>
            <ul className="list-disc list-inside space-y-1.5 font-body text-xs sm:text-sm text-ink/80 dark:text-cream/80">
              <li>
                <span className="font-semibold text-ink dark:text-cream">Product name:</span> Specify which system or repository is affected.
              </li>
              <li>
                <span className="font-semibold text-ink dark:text-cream">Steps to reproduce:</span> Clear, step-by-step instructions or proof-of-concept explanation.
              </li>
              <li>
                <span className="font-semibold text-ink dark:text-cream">Impact:</span> What an attacker could accomplish with this issue.
              </li>
              <li>
                <span className="font-semibold text-ink dark:text-cream">Environment:</span> Relevant browser, OS, device, or API endpoints.
              </li>
            </ul>
          </div>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <a
              href={mailtoLink}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sunny text-ink border-ink border-2 text-xs font-mono font-bold hover:bg-sunny/80 shadow-hard-sm active:translate-x-0.5 active:translate-y-0.5 transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
            >
              <span>Email Security Report</span>
              <span aria-hidden="true">✉</span>
            </a>

            <Link
              href="/.well-known/security.txt"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-paper dark:bg-ink-deep border-ink border-2 text-xs font-mono font-bold text-ink dark:text-cream hover:bg-sunny/30 shadow-hard-sm active:translate-x-0.5 active:translate-y-0.5 transition-transform"
            >
              <span>View .well-known/security.txt</span>
              <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </section>

        {/* Guidelines & Realistic Scope Card */}
        <section
          aria-labelledby="guidelines-heading"
          className="bg-cream-light dark:bg-ink-card border-ink border-2 rounded-2xl p-6 sm:p-8 shadow-hard dark:shadow-hard-dark"
        >
          <h2
            id="guidelines-heading"
            className="text-lg sm:text-xl font-display font-black text-ink dark:text-cream tracking-tight mb-3"
          >
            Guidelines &amp; Scope
          </h2>

          <div className="space-y-3 font-body text-xs sm:text-sm text-ink/80 dark:text-cream/80 leading-relaxed">
            <p>
              When conducting security research on my systems, please act in good faith:
            </p>
            <ul className="list-disc list-inside space-y-1 pl-1">
              <li>
                <strong className="text-ink dark:text-cream">Do not access other people&apos;s data.</strong> If you encounter personal records, stop and report the issue immediately.
              </li>
              <li>
                <strong className="text-ink dark:text-cream">Do not destroy, modify, or degrade</strong> production services or physical hardware.
              </li>
              <li>
                <strong className="text-ink dark:text-cream">Allow reasonable time</strong> to investigate and patch the issue before publicly discussing it.
              </li>
            </ul>

            <div className="mt-4 p-3.5 rounded-xl bg-sunny/20 dark:bg-sunny/10 border-ink border text-xs font-mono text-ink/90 dark:text-cream/90">
              <strong>Notice:</strong> This is an independent engineer&apos;s workshop and student portfolio.
              I do not operate a commercial bug bounty program, nor do I provide SLAs, financial rewards, or certifications.
              I appreciate legitimate responsible reports and review them personally.
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
