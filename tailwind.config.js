/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'custom-color': '#F2E9E1',
        'navbar-color': '#4682B4',
      }
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
