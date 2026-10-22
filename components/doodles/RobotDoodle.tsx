import React from "react";

interface DoodleProps {
  className?: string;
  accent?: string;
  title?: string;
  decorative?: boolean;
}

export function RobotDoodle({
  className = "w-20 h-20",
  accent = "#179A94",
  title,
  decorative = true,
}: DoodleProps) {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden={decorative && !title ? "true" : undefined}
      role={title ? "img" : undefined}
      aria-label={title}
      focusable="false"
    >
      {title && <title>{title}</title>}
      {/* Sensor Mast & Antenna */}
      <line x1="60" y1="36" x2="60" y2="12" stroke="#1A1A1A" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="60" cy="10" r="5" fill="#FF4336" stroke="#1A1A1A" strokeWidth="2" />
      {/* Radio Wave arcs */}
      <path d="M68 6 C72 10 72 14 68 18" stroke="#1A1A1A" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M52 6 C48 10 48 14 52 18" stroke="#1A1A1A" strokeWidth="1.5" strokeLinecap="round" />

      {/* Sensor Head / LiDAR Turret */}
      <rect
        x="42"
        y="24"
        width="36"
        height="18"
        rx="4"
        fill="#FFFFFF"
        stroke="#1A1A1A"
        strokeWidth="2.5"
      />
      {/* Optical Lens */}
      <circle cx="54" cy="33" r="5" fill={accent} stroke="#1A1A1A" strokeWidth="2" />
      <circle cx="66" cy="33" r="3" fill="#1A1A1A" />

      {/* Neck joint */}
      <rect x="54" y="42" width="12" height="6" fill="#1A1A1A" />

      {/* Main Rugged Chassis */}
      <rect
        x="26"
        y="48"
        width="68"
        height="36"
        rx="6"
        fill={accent}
        stroke="#1A1A1A"
        strokeWidth="2.5"
      />

      {/* Telemetry Indicator Screen */}
      <rect
        x="36"
        y="55"
        width="28"
        height="14"
        rx="2"
        fill="#FFFFFF"
        stroke="#1A1A1A"
        strokeWidth="1.5"
      />
      {/* Signal waveform */}
      <path
        d="M39 62 H44 L47 57 L50 67 L53 60 L56 64 H61"
        stroke="#FF4336"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Hazardous Status Light */}
      <circle cx="78" cy="62" r="4" fill="#FFD13B" stroke="#1A1A1A" strokeWidth="1.5" />

      {/* Treads / Tank Track Base */}
      <rect
        x="18"
        y="84"
        width="84"
        height="18"
        rx="9"
        fill="#1A1A1A"
      />
      {/* Wheels inside tracks */}
      <circle cx="28" cy="93" r="5" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="1.5" />
      <circle cx="44" cy="93" r="5" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="1.5" />
      <circle cx="60" cy="93" r="5" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="1.5" />
      <circle cx="76" cy="93" r="5" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="1.5" />
      <circle cx="92" cy="93" r="5" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="1.5" />
    </svg>
  );
}
