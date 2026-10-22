"use client";

import { useEffect, useRef } from "react";
import { track } from "@vercel/analytics";

interface AnalyticsTrackerProps {
  refSlug?: string;
}

/**
 * Fires a lightweight privacy-friendly custom event "ref_visit"
 * with the validated ref slug (or "none"). No cookies, no personal data.
 */
export function AnalyticsTracker({ refSlug }: AnalyticsTrackerProps) {
  const firedRef = useRef(false);

  useEffect(() => {
    if (firedRef.current) return;
    firedRef.current = true;

    try {
      track("ref_visit", {
        ref: refSlug || "none",
      });
    } catch {
      // Non-blocking fallback for local or adblocked environments
    }
  }, [refSlug]);

  return null;
}
