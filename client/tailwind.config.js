/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react");

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.175, 0.885, 0.32, 1.475)",
      },
      colors: {
        primary: {
          1: "#EFEFEF",
          2: "#5E697A",
          3: "#666666",
          4: "#03193B",
          5: "#828D9E",
          6: "#E5E4E4",
        },
        secondary: {
          1: "#0E1445",
          2: "#4285F4",
          3: "#93c8ed",
        },
      },
      keyframes: {
        loadIn: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
      },
      animation: {
        loadIn: "loadIn 7s linear",
      },
      theme: {
        extend: {},
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
