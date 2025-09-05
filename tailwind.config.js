/** @type {import('tailwindcss').Config} */
export default {
  // content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // override font-sans to use Lato everywhere
        sans: ["var(--font-lato)", "sans-serif"],
      },
      colors: {
        darkCyan: "#588b8bff",
        white: "#ffffff",
        apricot: "#ffd5c2ff",
        tangerine: "#f28f3bff",
        jasper: "#c8553dff",
      },
    },
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
}
