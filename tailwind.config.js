export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-lato)", "sans-serif"],
      },
      colors: {
        "custom-dark-cyan": "var(--custom-dark-cyan)",
        "custom-apricot": "var(--custom-apricot)", 
        "custom-tangerine": "var(--custom-tangerine)",
        "custom-jasper": "var(--custom-jasper)",
      },
    },
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
}