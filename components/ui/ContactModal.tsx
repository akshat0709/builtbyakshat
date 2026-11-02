"use client";

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

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(myEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const mailtoSubject = encodeURIComponent(`[${projectTopic}] Project Inquiry from ${name || "Visitor"}`);
  const mailtoBody = encodeURIComponent(
    `Hi Akshat,\n\n${message || "I checked out your portfolio and wanted to connect about a software build or role."}\n\n— ${name || "Visitor"}\n${email || ""}`
  );
  const mailtoUrl = `mailto:${myEmail}?subject=${mailtoSubject}&body=${mailtoBody}`;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto"
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
          className="fixed inset-0 bg-black/75 backdrop-blur-sm"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-lg bg-paper dark:bg-charcoal border-2 border-charcoal dark:border-stone-line rounded-2xl shadow-hard-xl dark:shadow-[8px_8px_0px_#FFF6E5] overflow-hidden z-10 my-auto"
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
                Start a Conversation
              </h3>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-paper dark:bg-charcoal border-2 border-charcoal dark:border-stone-line font-mono text-xs font-bold text-charcoal dark:text-stone-light flex items-center justify-center hover:bg-sunny transition-colors shadow-hard-sm"
              aria-label="Close dialog"
            >
              ✕
            </button>
          </div>

          {/* Form Body */}
          <div className="p-6 sm:p-8 space-y-4">
            {/* Quick Copy Button */}
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-stone-light/60 dark:bg-charcoal-light border border-charcoal/20 dark:border-stone-line/20">
              <span className="font-mono text-xs text-charcoal dark:text-stone-light font-bold truncate">
                ✉ {myEmail}
              </span>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="px-3 py-1 rounded-full bg-sunny text-charcoal border border-charcoal font-mono text-xs font-bold hover:bg-sunny/80 transition-colors shadow-sm"
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>

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
                <option value="General Engineering & Early Roles">General Engineering & Early Roles</option>
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
    </AnimatePresence>
  );
}
