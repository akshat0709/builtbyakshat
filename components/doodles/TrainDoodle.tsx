import React from "react";

interface DoodleProps {
  className?: string;
  accent?: string;
  title?: string;
  decorative?: boolean;
}

export function TrainDoodle({
  className = "w-24 h-16",
  accent = "#FF4336",
  title,
  decorative = true,
}: DoodleProps) {
  return (
    <svg
      viewBox="0 0 150 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden={decorative && !title ? "true" : undefined}
      role={title ? "img" : undefined}
      aria-label={title}
      focusable="false"
    >
      {title && <title>{title}</title>}
      {/* Locomotive Cabin Body */}
      <path
        d="M20 74 V30 C20 28 22 26 25 26 H88 V42 H114 C120 42 126 48 128 54 L132 74 H20 Z"
        fill={accent}
        stroke="#1A1A1A"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />

      {/* Driver Window */}
      <rect
        x="32"
        y="34"
        width="20"
        height="18"
        rx="2"
        fill="#FFFFFF"
        stroke="#1A1A1A"
        strokeWidth="2"
      />

      {/* Side Vent Slits */}
      <line x1="62" y1="50" x2="80" y2="50" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" />
      <line x1="62" y1="56" x2="80" y2="56" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" />
      <line x1="62" y1="62" x2="80" y2="62" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" />

      {/* Front Headlight & Detection Cone */}
      <path
        d="M132 60 L146 54 L146 70 Z"
        fill="#FFD13B"
        fillOpacity="0.4"
        stroke="#1A1A1A"
        strokeWidth="1.5"
        strokeDasharray="2 2"
      />
      <circle cx="131" cy="62" r="4" fill="#FFD13B" stroke="#1A1A1A" strokeWidth="2" />

      {/* Cowcatcher / Front Guard */}
      <polygon
        points="132,74 142,74 136,66"
        fill="#1A1A1A"
      />

      {/* Exhaust Pipe & Steam */}
      <rect x="94" y="22" width="10" height="20" fill="#1A1A1A" />
      <circle cx="99" cy="14" r="5" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="1.5" />
      <circle cx="106" cy="8" r="4" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="1.5" />

      {/* Heavy Steel Wheels */}
      <circle cx="38" cy="76" r="10" fill="#1A1A1A" />
      <circle cx="38" cy="76" r="4" fill="#FFFFFF" />
      <circle cx="66" cy="76" r="10" fill="#1A1A1A" />
      <circle cx="66" cy="76" r="4" fill="#FFFFFF" />
      <circle cx="94" cy="76" r="10" fill="#1A1A1A" />
      <circle cx="94" cy="76" r="4" fill="#FFFFFF" />
      <circle cx="120" cy="76" r="10" fill="#1A1A1A" />
      <circle cx="120" cy="76" r="4" fill="#FFFFFF" />

      {/* Connecting Rod */}
      <line x1="38" y1="76" x2="94" y2="76" stroke="#FFFFFF" strokeWidth="2" />

      {/* Rail Tracks */}
      <line x1="6" y1="88" x2="144" y2="88" stroke="#1A1A1A" strokeWidth="3" strokeLinecap="round" />
      {/* Ties */}
      <line x1="16" y1="88" x2="16" y2="94" stroke="#1A1A1A" strokeWidth="2" />
      <line x1="36" y1="88" x2="36" y2="94" stroke="#1A1A1A" strokeWidth="2" />
      <line x1="56" y1="88" x2="56" y2="94" stroke="#1A1A1A" strokeWidth="2" />
      <line x1="76" y1="88" x2="76" y2="94" stroke="#1A1A1A" strokeWidth="2" />
      <line x1="96" y1="88" x2="96" y2="94" stroke="#1A1A1A" strokeWidth="2" />
      <line x1="116" y1="88" x2="116" y2="94" stroke="#1A1A1A" strokeWidth="2" />
      <line x1="136" y1="88" x2="136" y2="94" stroke="#1A1A1A" strokeWidth="2" />
    </svg>
  );
}
