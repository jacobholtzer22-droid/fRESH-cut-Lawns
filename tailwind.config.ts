import type { Config } from "tailwindcss";

/**
 * Brand palette = "Fresh Cut".
 * A bright, modern, dependable system for a young, sharp lawn-care company.
 * The page lives on a clean, airy off-white (limestone); a deep near-black
 * forest green (evergreen) is the structural anchor — footer, scrolled header,
 * dark feature bands; and a single fresh grass-green (cedar) is the accent +
 * CTA. White cards keep it crisp.
 *
 * NOTE: the token *names* (evergreen / cedar / limestone / bone / ink / stone)
 * are inherited from the shared template and intentionally NOT renamed — only
 * their values change, so no component has to. On THIS site, "cedar" is the
 * fresh grass-green accent (not a wood tone).
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./site.config.ts",
  ],
  theme: {
    extend: {
      colors: {
        // Deep near-black forest green — the structural anchor (footer, scrolled
        // header, dark bands, hero frame). Almost-black with a green soul.
        evergreen: { DEFAULT: "#15281C", dark: "#0F1D15", deep: "#0A140E", light: "#23422F" },
        // Near-black with a faint green undertone — headings + body on light. Not pure black.
        ink: { DEFAULT: "#16201A", soft: "#3A453E" },
        // Fresh, airy off-white — the page base. Clean and bright, faint green tint.
        limestone: { DEFAULT: "#F4F8F1", dark: "#E7EEE1", deep: "#FBFCFA" },
        // Crisp white — cards, raised surfaces, and text on dark.
        bone: "#FFFFFF",
        // Neutral sage-grey — borders, captions, muted icons. (Too light for body text.)
        stone: { DEFAULT: "#7E877C", light: "#A8B0A4", dark: "#5F665C" },
        // Fresh grass-green — the single accent + primary CTA. White text on the
        // DEFAULT clears WCAG AA (~4.85:1); `light` is the bright pop used on dark.
        cedar: { DEFAULT: "#1A8246", dark: "#136335", light: "#3FBE74", deep: "#0A3D20" },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        page: "1200px",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out both",
        "fade-in": "fade-in 0.5s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
