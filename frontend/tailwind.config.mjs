/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        green: {
          1: "#4B5945",
          2: "#66785F",
          3: "#91AC8F",
          4: "#B2C9AD",
          5: "#F0FBEE",
        },
        grey: {
          1: "#C5C5C5",
        },
        red: {
          1: "#B14345",
        },
        blue: {
          1: "#2218AE",
        },
      },
    },
  },
  plugins: [],
};
