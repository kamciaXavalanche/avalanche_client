/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryColor: "#e9d0ba",
        secondaryColor: "#bf2bc2",
        accentColor: "#9f97e8",
        textColor: "#080808",
        backgroundColor: "#f0f0f2",
        borderColor: "#c9c8c3",
        hoverColor: "#3d2ae8",
      },
      fontFamily: {
        beautyFont: ["Montserrat", "sans-serif"],
      },
    },
  },
  plugins: [],
};
