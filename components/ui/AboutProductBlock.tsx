import React from "react";
import { Product } from "@/data/products";

interface AboutProductBlockProps {
  product: Product | null;
}

export function AboutProductBlock({ product }: AboutProductBlockProps) {
  if (!product) {
    return null;
  }

  // Display status as stored (Live / Pre-launch / Prototype)
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
        return "bg-sunny/40 text-ink dark:text-cream border-ink";
      case "prototype":
        return "bg-tomato/25 text-tomato dark:text-tomato border-ink";
    }
  };

  const hasRealBuilderNote =
    product.builderNote &&
    !product.builderNote.includes("[PLACEHOLDER]") &&
    product.builderNote.trim().length > 0;

  return (
    <section
      aria-label={`About ${product.name}`}
      className="my-8 animate-fadeIn"
    >
      <div className="bg-cream-light dark:bg-ink-card border-ink border-2 rounded-2xl p-6 sm:p-8 shadow-hard-lg dark:shadow-hard-dark-lg">
        {/* Top header: Context chip + Status chip */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-paper dark:bg-ink-deep border-ink border text-xs font-mono font-medium text-ink/80 dark:text-cream/80">
            <span className="w-2 h-2 rounded-full bg-tomato animate-pulse" aria-hidden="true" />
            <span>You&apos;re viewing software built by Akshat</span>
          </div>

          <div
            className={`px-3 py-1 rounded-full border-2 text-xs font-mono font-bold shadow-hard-sm dark:shadow-hard-dark-sm ${getStatusBadgeStyle(
              product.status
            )}`}
          >
            {formatStatus(product.status)}
          </div>
        </div>

        {/* Product Name & One-Liner */}
        <h2 className="text-2xl sm:text-3xl font-display font-black text-ink dark:text-cream tracking-tight mb-2">
          {product.name}
        </h2>

        <p className="text-base sm:text-lg font-body text-ink/90 dark:text-cream/90 leading-relaxed mb-4">
          {product.oneLiner}
        </p>

        {/* Role */}
        <div className="mb-6 inline-flex items-center gap-2 text-xs sm:text-sm font-mono text-ink/80 dark:text-cream/80 bg-paper dark:bg-ink-deep px-3 py-1.5 rounded-lg border-ink border">
          <span className="font-bold text-ink dark:text-cream">My Role:</span>
          <span>{product.role}</span>
        </div>

        {/* Built with rows */}
        <div className="space-y-3 pt-4 border-t border-ink/15 dark:border-cream/15 mb-6">
          <span className="text-xs font-mono uppercase tracking-wider text-ink/80 dark:text-cream/80 font-bold block mb-2">
            Built with
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {product.builtWith.map((item, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-paper dark:bg-ink-deep border-ink border text-xs sm:text-sm font-body leading-snug"
              >
                <span className="font-mono font-bold text-ink dark:text-cream block mb-0.5">
                  {item.tech}
                </span>
                <span className="text-ink/75 dark:text-cream/70 text-xs">
                  {item.plainEnglish}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Button */}
        {product.productUrl && (
          <div className="pt-2">
            <a
              href={product.productUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-teal text-white border-ink border-2 text-xs font-mono font-bold hover:bg-teal/90 shadow-hard-sm dark:shadow-hard-dark-sm transition-transform active:translate-x-0.5 active:translate-y-0.5 focus-visible:ring-2 focus-visible:ring-ink dark:focus-visible:ring-cream focus-visible:outline-none"
            >
              <span>Visit {product.name}</span>
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        )}

        {/* Builder's note (hidden if placeholder) */}
        {hasRealBuilderNote && (
          <div className="mt-6 pt-5 border-t border-ink/15 dark:border-cream/15">
            <span className="text-xs font-mono uppercase tracking-wider text-teal font-bold block mb-1">
              Builder&apos;s note
            </span>
            <p className="text-sm font-body text-ink/85 dark:text-cream/85 leading-relaxed italic bg-paper dark:bg-ink-deep p-4 rounded-xl border-ink border">
              &ldquo;{product.builderNote}&rdquo;
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
