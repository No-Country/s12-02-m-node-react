/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        primary: {
          1: "#EFEFEF",
          2: "#5E697A",
          3: "#666666",
        },
      },
    },
  },
  plugins: [],
};
