import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.{js,ts}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // 2026 redesign palette (channel triples → opacity modifiers work)
        accent: "rgb(var(--accent) / <alpha-value>)",
        ink: "rgb(var(--ink) / <alpha-value>)",
        "ink-deep": "rgb(var(--ink-deep) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        moss: "rgb(var(--moss) / <alpha-value>)",
      },
      fontFamily: {
        // Bricolage Grotesque — display/headings
        display: ["var(--font-bricolage)", "system-ui", "sans-serif"],
        // Instrument Sans — body default
        sans: ["var(--font-instrument)", "system-ui", "sans-serif"],
        crimson: ["var(--font-crimson-pro)", "serif"],
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      animation: {
        "fade-in-up": "fadeInUp 1s ease-out forwards",
        "rise-in": "riseIn 0.9s cubic-bezier(0.16,1,0.3,1) both",
        "float-y": "floatY 6s ease-in-out infinite",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        riseIn: {
          "0%": { opacity: "0.001", transform: "translateY(26px)" },
          "100%": { opacity: "1", transform: "none" },
        },
        floatY: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-9px)" },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("tailwindcss-animate")],
}
export default config
