/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0A0A0A",
        secondary: "#111111",
        purple: "#7C3AED",
        accent: "#8B5CF6",
        highlight: "#C4B5FD",
        white: "#FFFFFF",
        grayText: "#A3A3A3"
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      }
    },
  },
  plugins: [],
}
