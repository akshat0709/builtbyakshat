import React from "react";

export interface BuiltByBadgeProps {
  /**
   * Base site URL of the "Built by Akshat" site.
   * Defaults to NEXT_PUBLIC_BUILT_BY_URL or production domain.
   */
  siteUrl?: string;
  /**
   * Optional slug or ref if you ever wish to pass one.
   */
  refSlug?: string;
  /**
   * Additional Tailwind classes.
   */
  className?: string;
}

/**
 * Universal footer badge to link back to the "About the Builder" page from any software.
 */
export function BuiltByBadge({
  siteUrl = process.env.NEXT_PUBLIC_BUILT_BY_URL || "https://builtby.akshatgupta.dev",
  refSlug,
  className = "",
}: BuiltByBadgeProps) {
  const targetUrl = refSlug ? `${siteUrl}/?ref=${encodeURIComponent(refSlug)}` : siteUrl;

  return (
    <a
      href={targetUrl}
      target="_blank"
      rel="noopener"
      className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF6E5] text-[#1A1A1A] border-2 border-[#1A1A1A] shadow-[2px_2px_0px_#1A1A1A] hover:shadow-[3px_3px_0px_#1A1A1A] hover:-translate-y-0.5 active:translate-x-0 active:translate-y-0 font-mono text-xs font-semibold tracking-tight transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A1A1A] ${className}`}
      aria-label="Learn about the builder, Akshat Gupta"
    >
      <span className="w-1.5 h-1.5 rounded-full bg-[#FF4336]" aria-hidden="true" />
      <span>Built by Akshat Gupta</span>
      <span aria-hidden="true" className="text-[11px]">↗</span>
    </a>
  );
}

export default BuiltByBadge;
