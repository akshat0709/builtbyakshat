import React from "react";

interface DoodleProps {
  className?: string;
  accent?: string;
  title?: string;
  decorative?: boolean;
}

export function TaxiDoodle({
  className = "w-24 h-16",
  accent = "#FFD13B",
  title,
  decorative = true,
}: DoodleProps) {
  return (
    <svg
      viewBox="0 0 160 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden={decorative && !title ? "true" : undefined}
      role={title ? "img" : undefined}
      aria-label={title}
      focusable="false"
    >
      {title && <title>{title}</title>}
      {/* Roof Light Sign */}
      <rect
        x="68"
        y="12"
        width="24"
        height="10"
        rx="2"
        fill={accent}
        stroke="#1A1A1A"
        strokeWidth="2.5"
      />
      <text
        x="72"
        y="20"
        fontSize="6"
        fontWeight="800"
        fill="#1A1A1A"
        fontFamily="sans-serif"
      >
        EV
      </text>

      {/* Main Cabin Roof */}
      <path
        d="M38 46 L58 22 H102 L124 46 Z"
        fill="#FFFFFF"
        stroke="#1A1A1A"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />

      {/* Windows */}
      <path
        d="M60 26 H76 V42 H45 Z"
        fill={accent}
        fillOpacity="0.4"
        stroke="#1A1A1A"
        strokeWidth="2"
      />
      <path
        d="M82 26 H100 L116 42 H82 Z"
        fill={accent}
        fillOpacity="0.4"
        stroke="#1A1A1A"
        strokeWidth="2"
      />

      {/* Main Car Body */}
      <path
        d="M16 46 H144 C148 46 152 50 152 55 L150 72 C150 74 148 76 145 76 H132 C132 66 122 66 122 76 H46 C46 66 36 66 36 76 H16 C12 76 10 73 10 69 L12 52 C12 48 14 46 16 46 Z"
        fill={accent}
        stroke="#1A1A1A"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />

      {/* Headlight */}
      <path
        d="M148 52 L151 58 H146 Z"
        fill="#FFFFFF"
        stroke="#1A1A1A"
        strokeWidth="1.5"
      />

      {/* Wheels */}
      <circle cx="41" cy="76" r="13" fill="#1A1A1A" />
      <circle cx="41" cy="76" r="6" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="2" />

      <circle cx="127" cy="76" r="13" fill="#1A1A1A" />
      <circle cx="127" cy="76" r="6" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="2" />

      {/* Electric Bolt Graphic on Door */}
      <path
        d="M82 50 L77 59 H85 L80 70"
        stroke="#1A1A1A"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Speed Lines */}
      <line x1="2" y1="56" x2="8" y2="56" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" />
      <line x1="4" y1="64" x2="7" y2="64" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
