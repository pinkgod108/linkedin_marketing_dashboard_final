import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        maroon: {
          DEFAULT: "#7A1F2B",
          light: "#9A3240",
          dark: "#5C1620",
        },
        sienna: {
          DEFAULT: "#B15C2E",
          light: "#C97A4D",
          dark: "#8C4522",
        },
        cream: {
          DEFAULT: "#FBF4E6",
          light: "#FFFBF3",
          dark: "#F2E6CF",
        },
        mustard: {
          DEFAULT: "#E0A526",
          light: "#EFC15C",
          dark: "#B9840F",
        },
        neutral: {
          50: "#FBF9F6",
          100: "#F3EEE6",
          200: "#E7DFD1",
          700: "#5C544A",
          800: "#3D362E",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "sans-serif",
        ],
      },
      boxShadow: {
        soft: "0 4px 16px rgba(122, 31, 43, 0.08)",
        card: "0 6px 20px rgba(61, 54, 46, 0.08)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
    },
  },
  plugins: [],
};

export default config;
