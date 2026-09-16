/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        primary: "#2563EB",
        secondary: "#14B8A6",
        dark: "#0F172A",
        light: "#F8FAFC",
      },
      boxShadow: {
        card: "0 10px 30px rgba(37,99,235,0.15)",
      },
      borderRadius: {
        xl2: "20px",
      },
    },
  },
  plugins: [],
};