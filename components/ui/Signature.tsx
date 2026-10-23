import React from "react";

export function Signature({ className = "w-44 h-16" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 220 80"
      fill="none"
      className={className}
      aria-label="Akshat Gupta handwritten signature"
      role="img"
    >
      {/* Hand-drawn cursive signature path */}
      <path
        d="M 20 52 C 28 32, 38 18, 48 48 C 50 54, 52 56, 56 46 C 60 36, 68 28, 72 44 C 74 48, 80 42, 86 44 C 92 46, 96 38, 102 45 C 108 52, 114 42, 120 46"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-ink dark:text-cream"
      />
      {/* Capital A crossbar */}
      <path
        d="M 24 44 C 36 42, 48 43, 60 41"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        className="text-ink dark:text-cream"
      />
      {/* Surname G and tail flourish */}
      <path
        d="M 132 40 C 126 34, 138 24, 146 32 C 154 40, 142 58, 136 68 C 132 74, 142 76, 154 66 C 166 56, 180 46, 195 44"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-ink dark:text-cream"
      />
      {/* Underline accent line with ink bleed */}
      <path
        d="M 32 66 C 70 63, 140 64, 202 58"
        stroke="#FFCE47"
        strokeWidth="3"
        strokeLinecap="round"
        className="opacity-80"
      />
    </svg>
  );
}
