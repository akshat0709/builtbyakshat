"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { RobotDoodle } from "@/components/doodles/RobotDoodle";
import { PRODUCTS, Product } from "@/data/products";

export default function NotFound() {
  const [originProduct, setOriginProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const refMatch = window.location.search.match(/ref=([a-z0-9-]+)/i);
      const referrer = document.referrer;

      let detectedSlug: string | null = null;
      if (refMatch && refMatch[1]) {
        detectedSlug = refMatch[1].toLowerCase().replace(/^qr-/, "");
      } else if (referrer) {
        if (referrer.includes("orange-taxi")) detectedSlug = "orange-taxi";
        else if (referrer.includes("rescue") || referrer.includes("robot"))
          detectedSlug = "autonomous-rescue-robot";
        else if (referrer.includes("animal") || referrer.includes("detection"))
          detectedSlug = "animal-detection";
      }

      if (detectedSlug && PRODUCTS[detectedSlug]) {
        setOriginProduct(PRODUCTS[detectedSlug]);
      }
    }
  }, []);

  return (
    <main
      id="main-content"
      className="min-h-[75vh] flex flex-col items-center justify-center text-center py-20"
    >
      <div className="bg-cream-light dark:bg-ink-card border-ink border-2 rounded-2xl p-8 sm:p-12 shadow-hard dark:shadow-hard-dark max-w-lg">
        <div className="flex justify-center mb-6">
          <RobotDoodle className="w-20 h-20" decorative />
        </div>

        <span className="text-xs font-mono uppercase tracking-widest text-tomato font-bold block mb-2">
          404 / System Not Found
        </span>

        <h1 className="text-2xl sm:text-3xl font-display font-bold text-ink dark:text-cream mb-3">
          This system endpoint does not exist.
        </h1>

        <p className="text-sm font-body text-ink/75 dark:text-cream/70 mb-6 leading-relaxed">
          The link you followed may be outdated, or the requested route was relocated.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          {originProduct && (
            <Link
              href={`/?ref=${originProduct.slug}`}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal text-white border-ink border-2 text-xs font-mono font-bold hover:bg-teal/90 shadow-hard-sm transition-transform active:translate-x-0.5 active:translate-y-0.5 focus-visible:ring-2 focus-visible:ring-ink focus-visible:outline-none"
            >
              <span>← Back to {originProduct.name}</span>
            </Link>
          )}

          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-sunny border-ink border-2 text-xs font-mono font-bold text-ink hover:bg-sunny/80 shadow-hard-sm transition-transform active:translate-x-0.5 active:translate-y-0.5 focus-visible:ring-2 focus-visible:ring-ink focus-visible:outline-none"
          >
            <span>Return to Builder Profile</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
