"use client";

import { createPortal } from "react-dom";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [projectTopic, setProjectTopic] = useState("Orange Taxi / Full-Stack PWA");
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);

  const myEmail = "akshat070906@gmail.com";

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(myEmail);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard can be blocked; the address is still visible to select by hand.
    }
  };

  const quickActions = [
    { label: "Email", hint: "Open mail app", href: `mailto:${myEmail}`, icon: "✉" },
    { label: "GitHub", hint: "akshat0709", href: "https://github.com/akshat0709", icon: "⌥", external: true },
    { label: "Save contact", hint: ".vcf card", href: "/contact.vcf", icon: "⤓", download: true },
  ];

  const mailtoSubject = encodeURIComponent(`[${projectTopic}] Project Inquiry from ${name || "Visitor"}`);
  const mailtoBody = encodeURIComponent(
    `Hi Akshat,\n\n${message || "I came across something you built and wanted to say hello."}\n\n— ${name || "Visitor"}\n${email || ""}`
  );
  const mailtoUrl = `mailto:${myEmail}?subject=${mailtoSubject}&body=${mailtoBody}`;

  if (typeof document === "undefined") return null;

  // Portal to <body>: PageTransition applies a transform, which would otherwise
  // turn this fixed overlay into one positioned relative to the page wrapper.
  return createPortal(
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex justify-end"
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-modal-title"
      >
        {/* Scrim backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-ink/70"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ x: "105%" }}
          animate={{ x: 0 }}
          exit={{ x: "105%" }}
          transition={{ type: "spring", stiffness: 320, damping: 32 }}
          className="relative z-10 h-full w-full max-w-md overflow-y-auto bg-paper dark:bg-charcoal border-l-2 border-ink dark:border-stone-line shadow-[-8px_0px_0px_#1A1A1A] dark:shadow-[-8px_0px_0px_#FFF6E5]"
        >
          {/* Header */}
          <div className="p-6 bg-stone-light dark:bg-charcoal-light border-b-2 border-charcoal dark:border-stone-line flex items-center justify-between">
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-teal dark:text-sunny font-bold block mb-1">
                Direct Contact
              </span>
              <h3
                id="contact-modal-title"
                className="font-display font-black text-2xl text-charcoal dark:text-stone-light tracking-tight"
              >
                Say hello
              </h3>
            </div>

            <button
              type="button"
              onClick={onClose}
              autoFocus
              className="w-9 h-9 rounded-full bg-paper dark:bg-charcoal border-2 border-charcoal dark:border-stone-line font-mono text-xs font-bold text-charcoal dark:text-stone-light flex items-center justify-center hover:bg-sunny transition-colors shadow-hard-sm"
              aria-label="Close dialog"
            >
              ✕
            </button>
          </div>

          {/* Form Body */}
          <div className="p-6 sm:p-8 space-y-4">
            {/* Quick actions */}
            <div className="grid grid-cols-3 gap-2.5">
              {quickActions.map((a) => (
                <a
                  key={a.label}
                  href={a.href}
                  {...(a.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  {...(a.download ? { download: "akshat-gupta.vcf" } : {})}
                  className="flex flex-col items-start gap-1 p-3 rounded-xl bg-cream-light dark:bg-ink-card border-2 border-ink dark:border-stone-line shadow-hard-sm dark:shadow-hard-dark-sm hover:bg-sunny/50 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
                >
                  <span aria-hidden="true" className="font-mono text-lg leading-none">{a.icon}</span>
                  <span className="font-display font-bold text-sm text-ink dark:text-cream">{a.label}</span>
                  <span className="font-mono text-[10px] text-ink/60 dark:text-cream/60">{a.hint}</span>
                </a>
              ))}
            </div>

            {/* Quick Copy Button */}
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-stone-light/60 dark:bg-charcoal-light border border-charcoal/20 dark:border-stone-line/20">
              <span className="font-mono text-xs text-charcoal dark:text-stone-light font-bold truncate">
                ✉ {myEmail}
              </span>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="px-3 py-1 rounded-full bg-sunny text-charcoal border-2 border-ink font-mono text-xs font-bold active:translate-y-px transition-colors"
                aria-live="polite"
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>

            <p className="pt-2 font-mono text-[11px] font-bold uppercase tracking-wider text-ink/50 dark:text-cream/50">
              Or write a note
            </p>

            <div>
              <label htmlFor="contact-name" className="block font-mono text-xs font-bold text-charcoal/70 dark:text-stone-light/70 uppercase mb-1">
                Your Name
              </label>
              <input
                id="contact-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Alex Sharma"
                className="w-full px-3.5 py-2.5 rounded-xl bg-paper dark:bg-charcoal-light border-2 border-charcoal dark:border-stone-line text-sm text-charcoal dark:text-stone-light focus:outline-none focus:ring-2 focus:ring-teal"
              />
            </div>

            <div>
              <label htmlFor="contact-email" className="block font-mono text-xs font-bold text-charcoal/70 dark:text-stone-light/70 uppercase mb-1">
                Your Email
              </label>
              <input
                id="contact-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="alex@company.com"
                className="w-full px-3.5 py-2.5 rounded-xl bg-paper dark:bg-charcoal-light border-2 border-charcoal dark:border-stone-line text-sm text-charcoal dark:text-stone-light focus:outline-none focus:ring-2 focus:ring-teal"
              />
            </div>

            <div>
              <label htmlFor="contact-topic" className="block font-mono text-xs font-bold text-charcoal/70 dark:text-stone-light/70 uppercase mb-1">
                Subject Focus
              </label>
              <select
                id="contact-topic"
                value={projectTopic}
                onChange={(e) => setProjectTopic(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-paper dark:bg-charcoal-light border-2 border-charcoal dark:border-stone-line text-sm text-charcoal dark:text-stone-light focus:outline-none focus:ring-2 focus:ring-teal font-mono"
              >
                <option value="Orange Taxi / Full-Stack PWA">Orange Taxi / Full-Stack PWA</option>
                <option value="Autonomous Robotics & Firmware">Autonomous Robotics & Firmware</option>
                <option value="Computer Vision & AI Telemetry">Computer Vision & AI Telemetry</option>
                <option value="Something you built">Something you built</option>
              </select>
            </div>

            <div>
              <label htmlFor="contact-message" className="block font-mono text-xs font-bold text-charcoal/70 dark:text-stone-light/70 uppercase mb-1">
                Message / Brief
              </label>
              <textarea
                id="contact-message"
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell me about what you are building..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-paper dark:bg-charcoal-light border-2 border-charcoal dark:border-stone-line text-sm text-charcoal dark:text-stone-light focus:outline-none focus:ring-2 focus:ring-teal"
              />
            </div>

            {/* Submit Action */}
            <div className="pt-2">
              <a
                href={mailtoUrl}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-charcoal text-stone-light dark:bg-stone-light dark:text-charcoal font-display font-bold text-sm border-2 border-charcoal dark:border-stone-light shadow-hard hover:shadow-hard-lg hover:-translate-y-0.5 active:translate-y-0.5 transition-all text-center"
              >
                <span>Open Pre-filled Email</span>
                <span aria-hidden="true">↗</span>
              </a>
              <p className="text-center font-mono text-[11px] text-charcoal/60 dark:text-stone-light/60 mt-2">
                Replies within 24 hours · Bengaluru, India
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>,
    document.body
  );
}
