/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "mint-500": "oklch(0.72 0.11 178)",
        "theme-yellow": "#f5e0c5",
        "theme-green": "#caecdc",
        "theme-purple": "#d3d3f9",
        "theme-red": "#edc7c6",
        "theme-header": "#f9f8f4",
        "theme-footer": "dea055",
      },
    },
  },
  plugins: [],
};
