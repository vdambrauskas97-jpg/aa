/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Chrome (header, hero, footer)
        navy: {
          700: "#27394C",
          800: "#1D2C3C",
          900: "#16222F",
          950: "#101B27",
        },
        // Single brand accent (red-orange, bid.cars-family)
        accent: {
          50: "#FDF1EC",
          100: "#FADDD2",
          400: "#F05A38",
          500: "#D9502C",
          600: "#C93F1E",
          700: "#A93318",
        },
        // Content surfaces + text
        surface: "#F4F6F8",
        line: "#E3E8ED",
        ink: {
          DEFAULT: "#16222F",
          soft: "#5B6B7B",
          faint: "#8595A5",
        },
        // Semantic
        sold: "#0F7A43",
        live: "#1259A8",
        copart: { text: "#0B5CAD", bg: "#E8F1FA" },
        iaai: { text: "#9A2730", bg: "#FAECED" },
      },
      fontFamily: {
        sans: [
          "Geist Variable",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
        mono: [
          "Geist Mono Variable",
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Consolas",
          "monospace",
        ],
      },
      maxWidth: {
        shell: "76rem",
      },
      boxShadow: {
        card: "0 1px 2px rgba(22, 34, 47, 0.06)",
        lift: "0 6px 20px rgba(22, 34, 47, 0.10)",
      },
    },
  },
  plugins: [],
};
