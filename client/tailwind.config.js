/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.175, 0.885, 0.32, 1.475)',
      },
      colors: {
        primary: {
          1: "#EFEFEF",
          2: "#5E697A",
          3: "#666666",
        },
        secondary: {
          1: "#0E1445",
          2: "#4285F4",
          3: "#93c8ed",
        }
      },
    },
  },
  plugins: [],
};
