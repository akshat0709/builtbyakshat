import React from "react";

interface DoodleProps {
  className?: string;
  accent?: string;
  title?: string;
  decorative?: boolean;
}

export function LightbulbDoodle({
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
      {/* Light rays */}
      <line x1="50" y1="8" x2="50" y2="16" stroke="#1A1A1A" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="22" y1="22" x2="28" y2="28" stroke="#1A1A1A" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="78" y1="22" x2="72" y2="28" stroke="#1A1A1A" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="12" y1="46" x2="20" y2="46" stroke="#1A1A1A" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="88" y1="46" x2="80" y2="46" stroke="#1A1A1A" strokeWidth="2.5" strokeLinecap="round" />

      {/* Glass Bulb Dome */}
      <path
        d="M32 58 C26 50 26 36 34 26 C42 16 58 16 66 26 C74 36 74 50 68 58 L62 70 H38 Z"
        fill={accent}
        stroke="#1A1A1A"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />

      {/* Filament inside */}
      <path
        d="M44 54 L44 40 L50 46 L56 40 L56 54"
        stroke="#1A1A1A"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Screw Thread Base */}
      <rect x="40" y="70" width="20" height="5" rx="1.5" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="2" />
      <rect x="42" y="75" width="16" height="5" rx="1.5" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="2" />
      <path d="M45 80 H55 L52 86 H48 Z" fill="#1A1A1A" />
    </svg>
  );
}
