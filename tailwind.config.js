/** @type {import('tailwindcss').config} */
export default {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Open Sans"', "sans-serif"],
        lato: ["Lato", "sans-serif"],
      },
      colors: {
        darkCyan: "#588b8bff",
        white: "#ffffff",
        apricot: apricot,
        tangerine: tangerine,
        jasper: jasper,
      },
    },
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
}
