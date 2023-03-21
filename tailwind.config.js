/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{html,js,ts,jsx,tsx}",
    "./node_modules/tw-elements/dist/js/**/*.js",
  ],
  theme: {
    screens: {
      sm: "576px",
      // => @media (min-width: 576px) { ... }

      md: "960px",
      // => @media (min-width: 960px) { ... }

      lg: "1180px",
      // => @media (min-width: 1440px) { ... }
    },
    extend: {
      colors: {
        blue: "#0075F2",
        bluelight: "#3a8eff",
        bluelighter: "#0050c9",
        bluelightest: "#0031a0",
        bluedark: "#0c2d91",
        bluedarker: "#080f48",
        orange: "#FF4A1C",
        white: "#F2FDFF",
        black: "#00171F",
      },
    },
  },
  // plugins: [require("tw-elements/dist/plugin")],
};
