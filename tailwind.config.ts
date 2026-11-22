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
        cream: "#F1E9DE",
        stone: {
          light: "#EEEAE6",
          DEFAULT: "#E8E4E0",
          mid: "#DED8D4",
          line: "#D5CDCA",
        },
        charcoal: {
          light: "#252121",
          DEFAULT: "#1A1818",
          dark: "#121111",
          border: "#302A2A",
        },
        ink: "#1A1A1A",
        "ink-deep": "#0A0807",
        "ink-card": "#15110E",
        "ink-border": "#2B241F",
        tomato: "#FF5A1F",
        sunny: "#FF8A3D",
        // Premium tints (stickers, tiles) and deep slabs (section backgrounds).
        sky: "#C3D9F3",
        mint: "#C4E4D2",
        lilac: "#DCD3F7",
        coral: "#F6C0AC",
        cobalt: "#2840B8",
        "cobalt-deep": "#100C09",
        forest: "#0E3B37",
        "forest-deep": "#100C09",
        teal: "#E0874F",
        "cream-light": "#FFFDF9",
        paper: "#FFFFFF",
        door: {
          web: "#22304A",
          robot: "#4A3540",
          vision: "#4E5A47",
          assist: "#8C4826",
          lab: "#201F1D",
        },
      },
      fontFamily: {
        poster: ["var(--font-poster)", "Anton", "Impact", "sans-serif"],
        display: ["var(--font-display)", "Space Grotesk", "sans-serif"],
        body: ["var(--font-body)", "Plus Jakarta Sans", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "monospace"],
      },
      boxShadow: {
        hard: "3px 3px 0px #1A1A1A",
        "hard-sm": "2px 2px 0px #1A1A1A",
        "hard-lg": "5px 5px 0px #1A1A1A",
        "hard-dark": "0 1px 0 rgba(255,255,255,0.05) inset, 0 18px 40px -22px rgba(255,110,40,0.45)",
        "hard-dark-sm": "0 1px 0 rgba(255,255,255,0.05) inset, 0 10px 24px -16px rgba(255,110,40,0.4)",
        "hard-dark-lg": "0 1px 0 rgba(255,255,255,0.06) inset, 0 30px 60px -28px rgba(255,110,40,0.5)",
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
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
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
