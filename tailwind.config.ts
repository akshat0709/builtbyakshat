import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#FFF6E5",
        ink: "#1A1A1A",
        "ink-deep": "#121212",
        "ink-card": "#1E1E1E",
        "ink-border": "#333333",
        tomato: "#FF4336",
        sunny: "#FFD13B",
        teal: "#179A94",
        "cream-light": "#FFFDF9",
        paper: "#FFFFFF",
      },
      fontFamily: {
        display: ["var(--font-display)", "Space Grotesk", "sans-serif"],
        body: ["var(--font-body)", "Plus Jakarta Sans", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "monospace"],
      },
      boxShadow: {
        hard: "3px 3px 0px #1A1A1A",
        "hard-sm": "2px 2px 0px #1A1A1A",
        "hard-lg": "5px 5px 0px #1A1A1A",
        "hard-dark": "3px 3px 0px #FFF6E5",
        "hard-dark-sm": "2px 2px 0px #FFF6E5",
        "hard-dark-lg": "5px 5px 0px #FFF6E5",
      },
      borderWidth: {
        ink: "2px",
      },
      keyframes: {
        wobble: {
          "0%, 100%": { transform: "rotate(-2deg)" },
          "50%": { transform: "rotate(2deg)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
      },
      animation: {
        wobble: "wobble 0.3s ease-in-out infinite",
        blink: "blink 1s steps(1) 10", // stops after 10 seconds
      },
    },
  },
  plugins: [],
};

export default config;
