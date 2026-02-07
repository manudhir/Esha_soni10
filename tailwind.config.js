/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      dark: "#0E0E0E",
      text: "#EAEAEA",
      muted: "#9A9A9A",
      gold: "#C9A24D",
      black: '#000000',
      white: '#ffffff',
    },
    fontFamily: {
      serif: ["Playfair Display", "serif"],
      sans: ["Inter", "sans-serif"],
    },
    extend: {
      fontSize: {
        base: ["1rem", { lineHeight: "1.7" }],
      },
    },
  },
  plugins: [],
};
