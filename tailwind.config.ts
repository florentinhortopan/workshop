import type { Config } from "tailwindcss"

/**
 * IDA visual language — zinc neutrals + indigo action color,
 * Inter for text, Playfair Display for display headings.
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: [
          "var(--font-display)",
          "ui-serif",
          "Georgia",
          "Cambria",
          "Times New Roman",
          "Times",
          "serif",
        ],
      },
      backgroundColor: {
        page: "rgba(var(--bg-page))",
        surface: "rgba(var(--bg-surface))",
        sunken: "rgba(var(--bg-sunken))",
        action: {
          DEFAULT: "rgba(var(--bg-action))",
          hover: "rgba(var(--bg-action-hover))",
          soft: "rgba(var(--bg-action), 0.16)",
          "soft-hover": "rgba(var(--bg-action), 0.24)",
        },
        warn: "rgba(var(--bg-warn))",
        danger: "rgba(var(--bg-danger))",
        ok: "rgba(var(--bg-ok))",
        disabled: "rgba(var(--bg-sunken), 0.7)",
      },
      colors: {
        ink: "rgba(var(--ink))",
        muted: "rgba(var(--muted))",
        action: {
          DEFAULT: "rgba(var(--action))",
          on: "rgba(var(--action-on))",
        },
        warn: "rgba(var(--warn-ink))",
        danger: "rgba(var(--danger-ink))",
        ok: "rgba(var(--ok-ink))",
        disabled: "rgba(var(--muted), 0.75)",
      },
      borderColor: {
        DEFAULT: "rgba(var(--border))",
        strong: "rgba(var(--border), 1)",
        action: "rgba(var(--action))",
        warn: "rgba(var(--warn-border))",
        danger: "rgba(var(--danger-border))",
        disabled: "rgba(var(--border), 0.6)",
      },
      boxShadow: {
        soft: "0 6px 18px -8px rgba(0,0,0,0.55)",
        diffuse: "0 16px 36px -18px rgba(0,0,0,0.7)",
      },
      borderRadius: {
        xs: "4px",
        sm: "8px",
        md: "12px",
        lg: "16px",
        xl: "20px",
      },
    },
  },
  plugins: [],
}

export default config
