"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import { ProductMedia } from "@/data/products";

interface MediaGalleryProps {
  media?: ProductMedia;
  productName: string;
}

export function MediaGallery({ media, productName }: MediaGalleryProps) {
  const shouldReduceMotion = useReducedMotion();
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const lightboxRef = useRef<HTMLDivElement>(null);
  const lastActiveTriggerRef = useRef<HTMLButtonElement | null>(null);

  const screenshots = media?.screenshots || [];
  const demoVideo = media?.demoVideo;

  const hasMedia = screenshots.length > 0 || !!demoVideo;

  // Handle video playback
  const toggleVideo = () => {
    if (!videoRef.current) return;
    if (isPlayingVideo) {
      videoRef.current.pause();
      setIsPlayingVideo(false);
    } else {
      videoRef.current.play();
      setIsPlayingVideo(true);
    }
  };

  // Autopause video if reduced motion is preferred
  useEffect(() => {
    if (shouldReduceMotion && videoRef.current && isPlayingVideo) {
      videoRef.current.pause();
      setIsPlayingVideo(false);
    }
  }, [shouldReduceMotion, isPlayingVideo]);

  // Open Lightbox
  const openLightbox = (index: number, trigger: HTMLButtonElement) => {
    lastActiveTriggerRef.current = trigger;
    setActiveLightboxIndex(index);
  };

  // Close Lightbox and restore focus
  const closeLightbox = () => {
    setActiveLightboxIndex(null);
    if (lastActiveTriggerRef.current) {
      lastActiveTriggerRef.current.focus();
    }
  };

  // Handle keyboard events (Esc, Left/Right arrow, Tab focus trap) in Lightbox
  useEffect(() => {
    if (activeLightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeLightbox();
        return;
      }
      if (e.key === "ArrowLeft") {
        setActiveLightboxIndex((prev) =>
          prev !== null ? (prev - 1 + screenshots.length) % screenshots.length : 0
        );
        return;
      }
      if (e.key === "ArrowRight") {
        setActiveLightboxIndex((prev) =>
          prev !== null ? (prev + 1) % screenshots.length : 0
        );
        return;
      }

      // Simple focus trap
      if (e.key === "Tab" && lightboxRef.current) {
        const focusable = lightboxRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length > 0) {
          const first = focusable[0];
          const last = focusable[focusable.length - 1];

          if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
          } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeLightboxIndex, screenshots.length]);

  if (!hasMedia) {
    return null;
  }

  return (
    <section aria-labelledby="media-gallery-heading" className="my-8 pt-6 border-t border-ink/15 dark:border-cream/15">
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-teal font-bold block mb-1">
            Visual Proof &amp; Telemetry
          </span>
          <h2
            id="media-gallery-heading"
            className="text-xl sm:text-2xl font-display font-black text-ink dark:text-cream tracking-tight"
          >
            Interface &amp; Field Media
          </h2>
        </div>
      </div>

      <div className="space-y-6">
        {/* Optional Demo Video */}
        {demoVideo && (
          <div className="relative rounded-2xl bg-paper dark:bg-ink-deep border-ink border-2 p-3 sm:p-4 shadow-hard-lg overflow-hidden">
            <div className="relative aspect-video rounded-xl overflow-hidden bg-ink-card border border-ink">
              <video
                ref={videoRef}
                src={demoVideo.src}
                poster={demoVideo.poster || media?.poster}
                muted
                playsInline
                loop
                preload="none"
                className="w-full h-full object-cover"
                onPlay={() => setIsPlayingVideo(true)}
                onPause={() => setIsPlayingVideo(false)}
              />

              {/* Play / Pause Overlay Button */}
              <button
                type="button"
                onClick={toggleVideo}
                aria-label={isPlayingVideo ? "Pause demonstration video" : "Play demonstration video"}
                className="absolute bottom-3 left-3 px-3.5 py-1.5 rounded-full bg-cream/90 dark:bg-ink-deep/90 border-ink border-2 text-xs font-mono font-bold text-ink dark:text-cream shadow-hard-sm hover:bg-sunny active:translate-x-0.5 active:translate-y-0.5 transition-all"
              >
                <span>{isPlayingVideo ? "⏸ Pause Demo" : "▶ Play Demo (10-20s)"}</span>
              </button>
            </div>
            <div className="mt-2 text-xs font-mono text-ink/70 dark:text-cream/70 flex items-center justify-between">
              <span>Muted, looping field demonstration</span>
              {shouldReduceMotion && (
                <span className="text-tomato font-bold">Auto-paused (prefers-reduced-motion)</span>
              )}
            </div>
          </div>
        )}

        {/* Screenshots Grid */}
        {screenshots.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {screenshots.map((item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={(e) => openLightbox(idx, e.currentTarget)}
                aria-label={`Open screenshot ${idx + 1} of ${screenshots.length}: ${item.alt}`}
                className="group relative text-left bg-cream-light dark:bg-ink-card border-ink border-2 rounded-2xl p-2.5 shadow-hard hover:shadow-hard-lg dark:shadow-hard-dark hover:-translate-y-1 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
              >
                <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-paper dark:bg-ink-deep border border-ink">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    loading="lazy"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                  <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-cream/90 dark:bg-ink-deep/90 border border-ink text-[10px] font-mono font-bold text-ink dark:text-cream shadow-hard-sm">
                    🔍 Expand
                  </div>
                </div>
                {item.caption && (
                  <p className="mt-2 px-1 text-xs font-mono text-ink/80 dark:text-cream/80 truncate">
                    {item.caption}
                  </p>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Accessible Lightbox Modal */}
      {activeLightboxIndex !== null && (
        <div
          ref={lightboxRef}
          role="dialog"
          aria-modal="true"
          aria-label={`${productName} Screenshot Lightbox`}
          className="fixed inset-0 z-50 bg-ink-deep/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
          onClick={closeLightbox}
        >
          <div
            className="relative max-w-4xl w-full bg-cream dark:bg-ink-card border-ink border-2 rounded-2xl p-4 sm:p-6 shadow-hard-lg dark:shadow-hard-dark-lg flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Toolbar */}
            <div className="w-full flex items-center justify-between pb-3 mb-3 border-b border-ink/20 dark:border-cream/20">
              <span className="font-mono text-xs font-bold text-ink dark:text-cream">
                {activeLightboxIndex + 1} / {screenshots.length} · {screenshots[activeLightboxIndex]?.alt}
              </span>
              <button
                type="button"
                onClick={closeLightbox}
                aria-label="Close image lightbox"
                className="px-3 py-1 rounded-full bg-sunny text-ink border-ink border-2 text-xs font-mono font-bold shadow-hard-sm active:translate-x-0.5 active:translate-y-0.5"
              >
                ✕ [Esc]
              </button>
            </div>

            {/* Main Lightbox Image */}
            <div className="relative w-full aspect-[16/10] max-h-[70vh] rounded-xl overflow-hidden bg-paper dark:bg-ink-deep border-ink border">
              <Image
                src={screenshots[activeLightboxIndex].src}
                alt={screenshots[activeLightboxIndex].alt}
                fill
                priority
                className="object-contain"
                sizes="(max-width: 1200px) 100vw, 1200px"
              />
            </div>

            {/* Bottom Navigation */}
            <div className="w-full flex items-center justify-between pt-3 mt-3 border-t border-ink/15 dark:border-cream/15 font-mono text-xs">
              <button
                type="button"
                onClick={() =>
                  setActiveLightboxIndex(
                    (activeLightboxIndex - 1 + screenshots.length) % screenshots.length
                  )
                }
                aria-label="Previous screenshot"
                className="px-3.5 py-1.5 rounded-full bg-paper dark:bg-ink-deep border-ink border-2 font-bold text-ink dark:text-cream shadow-hard-sm hover:bg-sunny active:translate-x-0.5 active:translate-y-0.5"
              >
                ← Previous
              </button>

              <span className="hidden sm:inline text-ink/80 dark:text-cream/80">
                Use ← → arrow keys to navigate
              </span>

              <button
                type="button"
                onClick={() =>
                  setActiveLightboxIndex((activeLightboxIndex + 1) % screenshots.length)
                }
                aria-label="Next screenshot"
                className="px-3.5 py-1.5 rounded-full bg-paper dark:bg-ink-deep border-ink border-2 font-bold text-ink dark:text-cream shadow-hard-sm hover:bg-sunny active:translate-x-0.5 active:translate-y-0.5"
              >
                Next →
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
