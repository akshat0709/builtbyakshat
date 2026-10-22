import React from "react";

interface DoodleProps {
  className?: string;
  accent?: string;
  title?: string;
  decorative?: boolean;
}

export function CircuitChipDoodle({
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
      {/* Pins Left */}
      <line x1="16" y1="36" x2="28" y2="36" stroke="#1A1A1A" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="16" y1="50" x2="28" y2="50" stroke="#1A1A1A" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="16" y1="64" x2="28" y2="64" stroke="#1A1A1A" strokeWidth="2.5" strokeLinecap="round" />

      {/* Pins Right */}
      <line x1="72" y1="36" x2="84" y2="36" stroke="#1A1A1A" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="72" y1="50" x2="84" y2="50" stroke="#1A1A1A" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="72" y1="64" x2="84" y2="64" stroke="#1A1A1A" strokeWidth="2.5" strokeLinecap="round" />

      {/* Main IC Body */}
      <rect
        x="28"
        y="24"
        width="44"
        height="52"
        rx="6"
        fill={accent}
        stroke="#1A1A1A"
        strokeWidth="2.5"
      />

      {/* Pin 1 Index Notch */}
      <path
        d="M46 24 C46 28 54 28 54 24"
        stroke="#1A1A1A"
        strokeWidth="2"
        fill="#1A1A1A"
      />

      {/* Silicon Die Center */}
      <rect
        x="38"
        y="38"
        width="24"
        height="24"
        rx="2"
        fill="#FFFFFF"
        stroke="#1A1A1A"
        strokeWidth="2"
      />
      <circle cx="50" cy="50" r="4" fill="#FF4336" />
    </svg>
  );
}
