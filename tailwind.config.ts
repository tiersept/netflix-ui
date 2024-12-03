import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontSize: {
        "slider-title-sm": [
          "0.75rem",
          {
            lineHeight: "1.2",
            letterSpacing: "-0.01em",
            fontWeight: "600",
          },
        ],
        "slider-title-base": [
          "1.4vw",
          {
            lineHeight: "1.2",
            letterSpacing: "-0.01em",
            fontWeight: "600",
          },
        ],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      padding: {
        "page-padding": "var(--page-padding)",
      },
    },
  },
  plugins: [],
} satisfies Config;
