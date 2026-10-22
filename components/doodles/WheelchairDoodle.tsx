import React from "react";

interface DoodleProps {
  className?: string;
  accent?: string;
  title?: string;
  decorative?: boolean;
}

export function WheelchairDoodle({
  className = "w-20 h-20",
  accent = "#FFD13B",
  title,
  decorative = true,
}: DoodleProps) {
  return (
    <svg
      viewBox="0 0 110 110"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden={decorative && !title ? "true" : undefined}
      role={title ? "img" : undefined}
      aria-label={title}
      focusable="false"
    >
      {title && <title>{title}</title>}
      {/* Voice wave indicator near headrest */}
      <path d="M78 20 C84 24 84 32 78 36" stroke="#179A94" strokeWidth="2" strokeLinecap="round" />
      <path d="M84 14 C92 20 92 38 84 44" stroke="#179A94" strokeWidth="2" strokeLinecap="round" />

      {/* Headrest */}
      <rect x="58" y="24" width="8" height="12" rx="2" fill="#1A1A1A" />

      {/* Seat Backrest */}
      <path
        d="M62 36 L56 68 H76"
        stroke="#1A1A1A"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Seat Cushion */}
      <rect
        x="52"
        y="64"
        width="28"
        height="8"
        rx="2"
        fill={accent}
        stroke="#1A1A1A"
        strokeWidth="2"
      />

      {/* Armrest with Microphone / Voice Controller Unit */}
      <path
        d="M60 52 H74 V56"
        stroke="#1A1A1A"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Mic sensor node */}
      <circle cx="74" cy="50" r="3.5" fill="#FF4336" stroke="#1A1A1A" strokeWidth="1.5" />

      {/* Footrest Extension */}
      <path
        d="M76 68 L78 86 H86"
        stroke="#1A1A1A"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Main Drive Wheel */}
      <circle
        cx="44"
        cy="76"
        r="22"
        fill="none"
        stroke="#1A1A1A"
        strokeWidth="3.5"
      />
      <circle
        cx="44"
        cy="76"
        r="16"
        fill="none"
        stroke="#1A1A1A"
        strokeWidth="2"
      />
      {/* Wheel Spokes */}
      <line x1="44" y1="54" x2="44" y2="98" stroke="#1A1A1A" strokeWidth="2" />
      <line x1="22" y1="76" x2="66" y2="76" stroke="#1A1A1A" strokeWidth="2" />
      {/* Central Hub Motor */}
      <circle cx="44" cy="76" r="6" fill={accent} stroke="#1A1A1A" strokeWidth="2" />

      {/* Front Caster Wheel */}
      <circle cx="82" cy="94" r="6" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="2.5" />
      <circle cx="82" cy="94" r="2" fill="#1A1A1A" />
    </svg>
  );
}
