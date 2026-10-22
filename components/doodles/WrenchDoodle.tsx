import React from "react";

interface DoodleProps {
  className?: string;
  accent?: string;
  title?: string;
  decorative?: boolean;
}

export function WrenchDoodle({
  className = "w-16 h-16",
  accent = "#179A94",
  title,
  decorative = true,
}: DoodleProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden={decorative && !title ? "true" : undefined}
      role={title ? "img" : undefined}
      aria-label={title}
      focusable="false"
    >
      {title && <title>{title}</title>}
      {/* Wrench Jaw Top */}
      <path
        d="M26 30 C20 38 20 48 26 56 L38 52 C34 46 34 38 38 34 L26 30 Z"
        fill={accent}
        stroke="#1A1A1A"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      {/* Handle */}
      <path
        d="M34 48 L72 82 C74 84 78 84 80 82 C82 80 82 76 80 74 L42 40 Z"
        fill={accent}
        stroke="#1A1A1A"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      {/* Bottom Closed Eye Ring */}
      <circle cx="76" cy="78" r="8" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="2.5" />
      <circle cx="76" cy="78" r="3.5" fill="#1A1A1A" />
      {/* Mechanical highlight notch */}
      <line x1="42" y1="46" x2="68" y2="70" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
