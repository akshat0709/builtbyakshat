import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "media",
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
    },
  },
  plugins: [],
};

export default config;
