import React from "react";

interface DoodleProps {
  className?: string;
  accent?: string;
  title?: string;
  decorative?: boolean;
}

export function ChaiDoodle({
  className = "w-16 h-16",
  accent = "#FFD13B",
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
      {/* Steam lines */}
      <path
        d="M38 24 C36 18 42 14 38 8"
        stroke="#1A1A1A"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M48 20 C46 14 52 10 48 4"
        stroke="#1A1A1A"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M58 24 C56 18 62 14 58 8"
        stroke="#1A1A1A"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Chai Glass / Cutting Cup */}
      <polygon
        points="28,32 72,32 64,80 36,80"
        fill={accent}
        stroke="#1A1A1A"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />

      {/* Liquid Level */}
      <path
        d="M31 44 Q50 48 69 44 L64 78 H36 Z"
        fill="#FF4336"
        stroke="#1A1A1A"
        strokeWidth="1.5"
      />

      {/* Flutes / Ridges on Glass */}
      <line x1="42" y1="36" x2="44" y2="76" stroke="#1A1A1A" strokeWidth="1.5" strokeOpacity="0.4" />
      <line x1="50" y1="36" x2="50" y2="76" stroke="#1A1A1A" strokeWidth="1.5" strokeOpacity="0.4" />
      <line x1="58" y1="36" x2="56" y2="76" stroke="#1A1A1A" strokeWidth="1.5" strokeOpacity="0.4" />
    </svg>
  );
}
