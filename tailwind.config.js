/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      tablet: "910px",
      md: "768px",
      sm: "640px",
      lg: "1024px",
    },
    extend: {},
  },
  plugins: [],
};
