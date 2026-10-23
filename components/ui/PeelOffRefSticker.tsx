"use client";

import React, { useState } from "react";
import { Product } from "@/data/products";
import { TaxiDoodle } from "@/components/doodles/TaxiDoodle";
import { RobotDoodle } from "@/components/doodles/RobotDoodle";
import { TrainDoodle } from "@/components/doodles/TrainDoodle";

interface PeelOffRefStickerProps {
  product: Product | null;
}

export function PeelOffRefSticker({ product }: PeelOffRefStickerProps) {
  const [noteOpen, setNoteOpen] = useState(false);

  if (!product) return null;

  const renderDoodle = (slug: string) => {
    switch (slug) {
      case "orange-taxi":
        return <TaxiDoodle className="w-16 h-12" decorative />;
      case "autonomous-rescue-robot":
        return <RobotDoodle className="w-14 h-14" decorative />;
      case "animal-detection":
        return <TrainDoodle className="w-16 h-12" decorative />;
      default:
        return null;
    }
  };

  const formatStatus = (status: Product["status"]) => {
    switch (status) {
      case "live":
        return "Live";
      case "pre-launch":
        return "Pre-launch";
      case "prototype":
        return "Prototype";
      default:
        return status;
    }
  };

  const getStatusBadgeStyle = (status: Product["status"]) => {
    switch (status) {
      case "live":
        return "bg-teal/25 text-teal dark:text-teal border-ink";
      case "pre-launch":
        return "bg-sunny text-ink border-ink";
      case "prototype":
        return "bg-tomato text-white border-ink";
    }
  };

  const hasRealBuilderNote =
    product.builderNote &&
    !product.builderNote.includes("[PLACEHOLDER]") &&
    product.builderNote.trim().length > 0;

  return (
    <aside
      aria-label={`Origin context: ${product.name}`}
      className="my-6 rotate-[1.5deg] hover:rotate-0 transition-transform duration-200"
    >
      <div className="relative bg-[#FFFDF0] dark:bg-ink-card border-ink border-2 rounded-2xl p-5 sm:p-7 shadow-hard-lg dark:shadow-hard-dark-lg">
        {/* Tape graphic top center */}
        <div
          className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-6 bg-sunny/60 dark:bg-sunny/30 border-ink border border-dashed rounded-sm rotate-[-2deg] pointer-events-none"
          aria-hidden="true"
        />

        {/* Header row with doodle & status chip */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-xl bg-paper dark:bg-ink-deep border-ink border shadow-hard-sm">
              {renderDoodle(product.slug)}
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-ink/80 dark:text-cream/80 block font-bold">
                Origin Sticker
              </span>
              <span className="text-xs sm:text-sm font-mono font-semibold text-ink dark:text-cream">
                You&apos;re here from <strong>{product.name}</strong>
              </span>
            </div>
          </div>

          <span
            className={`px-3 py-1 rounded-full border-2 text-xs font-mono font-bold shadow-hard-sm dark:shadow-hard-dark-sm ${getStatusBadgeStyle(
              product.status
            )}`}
          >
            {formatStatus(product.status)}
          </span>
        </div>

        {/* One-liner */}
        <p className="text-sm sm:text-base font-body text-ink/90 dark:text-cream/90 leading-relaxed mb-3">
          {product.oneLiner}
        </p>

        {/* Role & built with */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono mb-4">
          <span className="px-2 py-0.5 rounded-md bg-paper dark:bg-ink-deep border border-ink/40 text-ink dark:text-cream font-medium">
            Role: <strong>{product.role}</strong>
          </span>
          {product.builtWith.slice(0, 3).map((item, idx) => (
            <span
              key={idx}
              className="px-2 py-0.5 rounded-md bg-sunny/20 dark:bg-sunny/10 border border-ink/40 text-ink dark:text-cream text-[11px]"
              title={item.plainEnglish}
            >
              {item.tech}
            </span>
          ))}
        </div>

        {/* Actions & Optional Builder's Note Flip */}
        <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-ink/15 dark:border-cream/15">
          {product.productUrl && (
            <a
              href={product.productUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-teal text-white border-ink border-2 text-xs font-mono font-bold hover:bg-teal/90 shadow-hard-sm active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
            >
              <span>Visit {product.name}</span>
              <span aria-hidden="true">↗</span>
            </a>
          )}

          {hasRealBuilderNote && (
            <button
              onClick={() => setNoteOpen(!noteOpen)}
              type="button"
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-paper dark:bg-ink-deep border-ink border text-xs font-mono font-medium text-ink dark:text-cream hover:bg-cream shadow-hard-sm active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
            >
              <span>{noteOpen ? "Hide builder's note ▲" : "Builder's note ▼"}</span>
            </button>
          )}
        </div>

        {hasRealBuilderNote && noteOpen && (
          <div className="mt-3 p-3.5 rounded-xl bg-paper dark:bg-ink-deep border-ink border text-xs sm:text-sm font-body italic leading-relaxed text-ink/85 dark:text-cream/85">
            &ldquo;{product.builderNote}&rdquo;
          </div>
        )}
      </div>
    </aside>
  );
}
