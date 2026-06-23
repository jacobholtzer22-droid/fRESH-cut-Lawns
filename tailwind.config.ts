import type { Config } from "tailwindcss";

/**
 * Brand palette = "Fresh Cut".
 * A bright, modern, dependable system for a young, sharp lawn-care company.
 * The page lives on a clean, airy off-white (limestone); a deep near-black
 * forest green (evergreen) is the structural anchor — footer, scrolled header,
 * dark feature bands; and the logo's vivid mower orange (cedar) is the accent +
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
        evergreen: { DEFAULT: "#0C3D19", dark: "#082C12", deep: "#05200C", light: "#1C5A2E" },
        // Near-black with a faint green undertone — headings + body on light. Not pure black.
        ink: { DEFAULT: "#16201A", soft: "#3A453E" },
        // Fresh, airy off-white — the page base. Clean and bright, faint green tint.
        limestone: { DEFAULT: "#F5F6F1", dark: "#E7EBE0", deep: "#FBFCF9" },
        // Crisp white — cards, raised surfaces, and text on dark.
        bone: "#FFFFFF",
        // Neutral sage-grey — borders, captions, muted icons. (Too light for body text.)
        stone: { DEFAULT: "#7E877C", light: "#A8B0A4", dark: "#5F665C" },
        // The logo's mower orange, the single accent + primary CTA. Dark evergreen text on
        // the DEFAULT clears WCAG AA (~4.8:1); `light` is the bright pop used on dark.
        cedar: { DEFAULT: "#F5821F", dark: "#8A4200", light: "#FCA94F", deep: "#5A2D00" },
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
